import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

/**
 * Middleware is UX-only: it redirects unauthenticated visitors to /login
 * on gated routes and keeps the Supabase session cookie fresh. It is NOT
 * the authorization layer. Real authz happens in server components /
 * route handlers via requireApprovedInvestor / requireBorrower /
 * requireAdmin, which re-validate the JWT against the auth server.
 *
 * Also: defense-in-depth headers on gated routes.
 */
const GATED_PREFIXES = ['/listings', '/portfolio', '/loans', '/admin', '/dashboard']

export async function middleware(req: NextRequest) {
  // Strip CVE-2025-29927 header on inbound requests as belt-and-braces.
  if (req.headers.get('x-middleware-subrequest')) {
    const stripped = new Headers(req.headers)
    stripped.delete('x-middleware-subrequest')
    return NextResponse.rewrite(req.url, { request: { headers: stripped } })
  }

  const res = NextResponse.next({ request: { headers: req.headers } })

  const URL = process.env.NEXT_PUBLIC_SUPABASE_URL
  const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!URL || !ANON) return res

  const supabase = createServerClient(URL, ANON, {
    cookies: {
      getAll: () => req.cookies.getAll(),
      setAll: (toSet) =>
        toSet.forEach(({ name, value, options }) =>
          res.cookies.set(name, value, options),
        ),
    },
  })

  // Refresh session if present.
  const { data: { user } } = await supabase.auth.getUser()

  const path = req.nextUrl.pathname
  const isGated = GATED_PREFIXES.some((p) => path === p || path.startsWith(p + '/'))

  if (isGated && !user) {
    const next = encodeURIComponent(req.nextUrl.pathname + req.nextUrl.search)
    return NextResponse.redirect(new URL(`/login?next=${next}`, req.url))
  }

  if (isGated) {
    res.headers.set('Cache-Control', 'private, no-store, max-age=0')
    res.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }
  return res
}

export const config = {
  matcher: [
    // Match everything except static assets / images / fonts / api hot paths
    // we want to bypass entirely.
    '/((?!_next/static|_next/image|favicon.ico|opengraph-image|.*\\.(?:svg|png|jpg|jpeg|webp|avif|ico|css|js|woff2?)$).*)',
  ],
}
