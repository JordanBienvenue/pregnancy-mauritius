# Manman Moris — Platform Audit & Implementation (Progress + Memory)

Branch: `feat/platform-audit-implementation` · Status: **all tests green** (127 unit + 60+ e2e).

This document is both a **progress log** and a **memory/context note** for anyone (human or agent) picking up this work.

---

## What this branch delivers

A full product audit followed by a phased implementation, then a Reddit-style
forum redesign and a sweep of mobile-UX fixes. The app is a mobile-first,
multilingual (cr/fr/en — **cr & fr are the defaults**) pregnancy-support
platform on Next.js 16 (App Router, `proxy.ts`), Supabase, Tailwind + shadcn/ui.

### Phases (each tested + committed)
- **Phase 0 — Test foundation.** 6 seeded users (admin/mod/editor/user/mama2/solo, pw `test123456`) via a DRY CTE insert; `openAs(browser,email)` + role login helpers for N-user realtime tests.
- **Phase 1 — Security & data integrity.** Fixed a **donation-claim hijack** (RLS now `WITH CHECK (claimed_by = auth.uid())`, race-safe); added forum author update/delete policies + `edited_at`.
- **Phase 2 — Standard forum.** Author edit/delete, reply likes (realtime), search (title+content), load-more pagination, Markdown + image uploads (Supabase Storage). Fixed `like_count`/`reply_count` to be trigger-maintained (client updates were RLS-blocked).
- **Phase 3 — Mobile-first.** Auth-aware bottom tab bar (<lg).
- **Phase 4 — Live homepage.** Surfaces recent discussions (realtime), donations, verified providers, solo-mother initiative.
- **Phase 5 — Dashboard data.** Postpartum dashboard now computes PPD score / baby age / next vaccine from real data (was hardcoded).
- **Phase 6 — Notifications.** `notifications` table + realtime bell; reply notifies the right author.

### Reddit-style forum redesign
- **Composer**: full-screen on mobile (X / Post bar, community pill, big title, optional body, image + markdown, anonymous).
- **Discussion**: nested/threaded comments (`parent_reply_id`, recursive `CommentNode`, indent + collapse, per-comment reply), **upvote-only** (ArrowBigUp + count, reusing like data — no downvotes), and reply notifications target the parent comment's author.

### Mobile UX fixes (with regression coverage)
- Removed horizontal scroll on: tracker filter row, food-guide tabs, marketplace tabs (clipped), forum category controls (French overflow).
- Compacted the oversized forum-index category cards.

### Bug fixes
- **Donations fetch** `PGRST201`: `donations` has two FKs to `profiles` (`donor_id` + `claimed_by`); disambiguated the embed to `profiles!donor_id`. Cards now render item photos; added a "Baby stroller" donation with a dummy photo.
- **NotificationBell** realtime: split user-resolution and subscription into two effects to stop "callbacks after subscribe()" (was raising the Next dev overlay).

---

## How to run / verify

```bash
supabase db reset --local        # applies all migrations + seed (test users + content)
npm run test                     # vitest unit (127)
npx playwright test --project=chromium --workers=1   # e2e (multi-user, realtime)
```

Test users (all `test123456`): `admin@`, `mod@`, `editor@`, `user@`, `mama2@`, `solo@` `test.com`.

---

## Key decisions & conventions (MEMORY — read before changing UI/data)

1. **No horizontal scroll on mobile, ever.** The defaults are **fr/cr**, whose labels are longer than en, so overflow appears there first. `e2e/mobile/no-horizontal-scroll.spec.ts` checks every route × fr/cr/en at 390px. New button/tab/filter rows must `flex-wrap` (or be a start-aligned `overflow-x-auto` strip). Decorative blur blobs must sit inside an `overflow-hidden` parent.
2. **Counts are trigger-maintained**, never client-updated: `forum_posts.like_count`, `forum_posts.reply_count`, `forum_replies.like_count` (SECURITY DEFINER triggers). Clients only toggle their own like row / insert replies — direct count UPDATEs are blocked by RLS.
3. **Realtime**: subscribe with the channel created **synchronously** in an effect (not inside an async `getUser().then`), and `removeChannel` on cleanup. Tables in the `supabase_realtime` publication: `forum_posts`, `forum_replies`, `forum_reply_likes` (via forum_replies), `notifications`.
4. **Voting is upvote-only** (supportive community); reuses the existing like tables. No downvotes.
5. **`donations` has two FKs to `profiles`** — always disambiguate embeds (`profiles!donor_id(...)`).
6. **Migrations** must have unique, ordered timestamps (a duplicate-version bug was fixed early; keep them unique). Latest: `20260408000010_nested_replies.sql`.

---

## Deferred / follow-ups (not in this branch)
- Migrate directory / blog / emergency pages to Supabase (homepage already reads them live; tables seeded).
- Profile avatar upload (Storage); wire remaining dead profile buttons.
- Tracker current-week from `due_date`; marketplace booking date capture + checkout.
- Production SMTP / email verification; full API-route + RLS unit harness.
- Per-comment image upload in nested reply boxes (only the main composer has it).
