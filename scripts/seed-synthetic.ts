/**
 * Phase 0 synthetic seed driver.
 *
 * - Creates synthetic auth.users via Supabase Admin API (the only way
 *   to get real user IDs that the profiles trigger picks up).
 * - Sets approval_status / role / TMO refs on the resulting profiles.
 * - Runs supabase/seed/synthetic.sql to populate accounts, listings,
 *   loans, transactions, documents, and access requests.
 *
 * Requires:
 *   SUPABASE_URL              (e.g. http://localhost:54321 in local dev,
 *                              https://db.capital-df.com in self-host)
 *   SUPABASE_SERVICE_ROLE_KEY (NEVER NEXT_PUBLIC_, NEVER committed)
 *
 * Run: pnpm tsx scripts/seed-synthetic.ts
 */
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const url = process.env.SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !serviceKey) {
  console.error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required')
  process.exit(1)
}

const admin = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

type SyntheticUser = {
  email: string
  full_name: string
  role: 'investor' | 'borrower' | 'both'
  approval: 'pending' | 'approved' | 'rejected'
  tmo_borrower_ref?: string
  is_admin?: boolean
}

const USERS: SyntheticUser[] = [
  // Admins (two — Francisco + Frank stand-ins for the demo).
  { email: 'admin-francisco@example.invalid', full_name: 'Sample Admin Francisco', role: 'investor', approval: 'approved', is_admin: true },
  { email: 'admin-frank@example.invalid',     full_name: 'Sample Admin Frank',     role: 'investor', approval: 'approved', is_admin: true },

  // Investors
  ...['A','B','C','D','E','F','G','H'].map((l): SyntheticUser => ({
    email: `investor-${l.toLowerCase()}@example.invalid`,
    full_name: `Sample Investor ${l}`,
    role: 'investor',
    approval: 'approved',
  })),

  // One pending applicant (so the admin queue isn't empty).
  { email: 'investor-pending@example.invalid', full_name: 'Sample Investor Pending', role: 'investor', approval: 'pending' },

  // Borrowers
  { email: 'borrower-1@example.invalid', full_name: 'Sample Borrower 1', role: 'borrower', approval: 'approved', tmo_borrower_ref: 'SYN-BR-1' },
  { email: 'borrower-2@example.invalid', full_name: 'Sample Borrower 2', role: 'borrower', approval: 'approved', tmo_borrower_ref: 'SYN-BR-2' },
  { email: 'borrower-3@example.invalid', full_name: 'Sample Borrower 3', role: 'borrower', approval: 'approved', tmo_borrower_ref: 'SYN-BR-3' },

  // Hybrid (both investor + borrower) — the cross-visibility test case.
  { email: 'hybrid-1@example.invalid', full_name: 'Sample Hybrid 1', role: 'both', approval: 'approved', tmo_borrower_ref: 'SYN-BR-HY1' },
]

async function upsertUser(u: SyntheticUser): Promise<string> {
  // Try to find existing first; otherwise create.
  const { data: existing } = await admin.auth.admin.listUsers({ perPage: 200 })
  const match = existing?.users.find(x => x.email === u.email)
  let id = match?.id
  if (!id) {
    const { data, error } = await admin.auth.admin.createUser({
      email: u.email,
      email_confirm: true,
      password: 'phase0-sandbox-' + u.email,    // not for real auth; magic link in practice
    })
    if (error) throw error
    id = data.user.id
  }
  // Trigger has already (or will shortly) created the profile row;
  // upsert the rest of the fields.
  const { error: pErr } = await admin
    .from('profiles')
    .upsert({
      user_id: id,
      full_name: u.full_name,
      email: u.email,
      role: u.role,
      approval_status: u.approval,
      ca_resident: true,
      accredited: u.role !== 'borrower',
      tmo_borrower_ref: u.tmo_borrower_ref ?? null,
    }, { onConflict: 'user_id' })
  if (pErr) throw pErr
  if (u.is_admin) {
    await admin.from('admin_users').upsert({ user_id: id })
  }
  return id
}

async function main() {
  console.log('Phase 0 synthetic seed — starting')
  for (const u of USERS) {
    const id = await upsertUser(u)
    console.log(`  ${u.email} → ${id}`)
  }

  const sql = readFileSync(join(process.cwd(), 'supabase/seed/synthetic.sql'), 'utf8')
  // execute via RPC if available; otherwise the user runs psql.
  const { error } = await admin.rpc('exec_sql' as never, { sql } as never)
  if (error) {
    console.warn('No `exec_sql` RPC available — please run supabase/seed/synthetic.sql via psql.')
    console.warn('Reason:', error.message)
  } else {
    console.log('Seed SQL applied.')
  }
  console.log('Done. Synthetic banner will render once any synthetic row exists.')
}

main().catch(e => { console.error(e); process.exit(1) })
