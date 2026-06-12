import 'server-only'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

/**
 * Cookie-bound Supabase client for Server Components and Route Handlers.
 * Uses the anon key; RLS is the gate. Always pair with getUser() for
 * authorization — middleware is UX only.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies()
  return createServerClient(URL, ANON, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(toSet) {
        try {
          toSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          )
        } catch {
          // Server Components cannot set cookies; safe to ignore here —
          // session refresh runs in middleware where set is allowed.
        }
      },
    },
  })
}

/**
 * Service-role client. NEVER import this from a Client Component or any
 * module reachable from the browser bundle. Server-only modules only,
 * used for admin-side operations (e.g. seed scripts, approval RPCs).
 */
export function createSupabaseServiceClient() {
  const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!KEY) throw new Error('SUPABASE_SERVICE_ROLE_KEY missing')
  // Late import so this file stays importable in environments that
  // don't have the service key present (e.g. type-checking).
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createClient } = require('@supabase/supabase-js')
  return createClient(URL, KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

/**
 * Authoritative authorization helper. Use in every server component
 * and route handler that touches gated data. Returns the user only
 * after re-validating the JWT against the auth server.
 */
export async function requireApprovedInvestor() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { redirectTo: '/login' as const }
  const { data: profile } = await supabase
    .from('profiles')
    .select('approval_status, role')
    .eq('user_id', user.id)
    .single()
  if (!profile) return { redirectTo: '/login' as const }
  if (profile.approval_status !== 'approved')
    return { redirectTo: '/dashboard/pending' as const }
  if (profile.role !== 'investor' && profile.role !== 'both')
    return { redirectTo: '/dashboard' as const }
  return { user, profile, supabase }
}

export async function requireBorrower() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { redirectTo: '/login' as const }
  const { data: profile } = await supabase
    .from('profiles')
    .select('approval_status, role')
    .eq('user_id', user.id)
    .single()
  if (!profile || profile.approval_status !== 'approved')
    return { redirectTo: '/dashboard/pending' as const }
  if (profile.role !== 'borrower' && profile.role !== 'both')
    return { redirectTo: '/dashboard' as const }
  return { user, profile, supabase }
}

export async function requireAdmin() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { redirectTo: '/login' as const }
  const { data: adminRow } = await supabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', user.id)
    .maybeSingle()
  if (!adminRow) return { redirectTo: '/dashboard' as const }
  return { user, supabase }
}
