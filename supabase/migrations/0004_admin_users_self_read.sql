-- Allow the app to verify whether the current authenticated user is an admin
-- without exposing the admin allowlist. This keeps admin membership uid-keyed
-- and lets requireAdmin() check only `user_id = auth.uid()`.

set search_path = public;

create policy "admin_users self read"
  on admin_users for select to authenticated
  using (user_id = auth.uid());
