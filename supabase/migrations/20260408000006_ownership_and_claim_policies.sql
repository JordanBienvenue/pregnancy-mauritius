-- Phase 1 — security & data-integrity fixes.

-- ─────────────────────────────────────────────────────────────────────
-- 1. Donation claim hardening.
-- The old policy `Users can claim available donations` used USING only
-- (auth.uid() is not null and is_available = true) with NO WITH CHECK, so
-- any authenticated user could update ANY available donation to ANY values —
-- including setting claimed_by to a different user (claim hijack). Replace
-- with a claim policy that can only target still-available rows and forces
-- the post-update row to be claimed by the actor and marked unavailable.
-- ─────────────────────────────────────────────────────────────────────
drop policy if exists "Users can claim available donations" on donations;

create policy "Users can claim available donations" on donations for update
  using (is_available = true and auth.uid() is not null)
  with check (claimed_by = auth.uid() and is_available = false);

-- ─────────────────────────────────────────────────────────────────────
-- 2. Forum author edit/delete (foundation for the Phase 2 UI).
-- Authors can edit and delete their own posts and replies. edited_at lets
-- the UI show an "edited" marker.
-- ─────────────────────────────────────────────────────────────────────
alter table forum_posts   add column if not exists edited_at timestamptz;
alter table forum_replies add column if not exists edited_at timestamptz;

create policy "Users can update own forum posts" on forum_posts for update
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can delete own forum posts" on forum_posts for delete
  using (auth.uid() = user_id);

create policy "Users can update own forum replies" on forum_replies for update
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can delete own forum replies" on forum_replies for delete
  using (auth.uid() = user_id);
