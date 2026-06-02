-- Seed healthcare providers (verified via UK Gov, Medical Council of Mauritius, MedPages)
INSERT INTO providers (name, type, district, address, phone, lat, lng, is_verified, description) VALUES
('Dr. Zeenat Aumeerally', 'gynaecologist', 'rose_hill', 'Clinic du Bon Pasteur, Rose Hill', '+230 467 8053', -20.2333, 57.4667, true, 'Gynaecologist and obstetrician. Registered with Medical Council of Mauritius. Source: UK Gov verified list.'),
('Dr. Haroon Beebeejaun', 'gynaecologist', 'beau_bassin', 'Victor Hugo Street, Beau Bassin', '+230 467 6400', -20.2283, 57.4583, true, 'Consultant obstetrician and gynaecologist. Source: UK Gov verified list.'),
('Dr. Guy Gnany', 'gynaecologist', 'floreal', 'Monoptica Building, Floreal', '+230 697 1221', -20.3000, 57.4950, true, 'Gynaecologist and obstetrician. Source: UK Gov verified list.'),
('Dr. Brigitte Ng Kuet Leong', 'gynaecologist', 'quatre_bornes', 'St Esprit Clinic, Quatre Bornes', '+230 424 5471', -20.2633, 57.4783, true, 'Gynaecologist at St Esprit Clinic. Source: UK Gov verified list.'),
('Dr. Oomar Cassam Moollan', 'gynaecologist', 'port_louis', 'Port Louis', '', -20.1609, 57.5012, true, 'Obstetrician and gynaecologist. Registered with Medical Council of Mauritius.'),
('Dr. Tapash Kumar Saha', 'gynaecologist', 'port_louis', 'Port Louis', '', -20.1625, 57.4980, true, 'Obstetrician and gynaecologist. Registered with Medical Council of Mauritius.'),
('Dr. Salickram Dassaye', 'gynaecologist', 'port_louis', 'Port Louis', '', -20.1610, 57.5050, true, 'Obstetrician and gynaecologist. Registered with Medical Council of Mauritius.'),
('Dr. Paramasiven Motay', 'counsellor', 'moka', 'C-Care Wellkin, Royal Road, Moka', '+230 453 8719', -20.2167, 57.4950, true, 'Psychiatrist at C-Care Wellkin Hospital. Source: UK Gov verified list.');

-- No sponsors yet (awaiting confirmed partnerships)

-- Seed blog posts
INSERT INTO blog_posts (slug, title, excerpt, content, author, reviewer, category, read_time, published_at) VALUES
('gynecologue-maurice-comment-choisir', 'Comment choisir son gynecologue a Maurice', 'Guide complet pour trouver le bon gynecologue pres de chez vous a Maurice.', 'Choisir un gynecologue est une decision importante. Consultez la liste des specialistes enregistres au Medical Council of Mauritius (medicalcouncilmu.org).', 'Manman Moris', 'Medical Council of Mauritius', 'healthcare', 7, now() - interval '3 days'),
('droits-maternite-maurice-2024', 'Vos droits de maternite a Maurice en 2026', 'Tout ce que vous devez savoir sur le conge maternite et vos droits.', 'Le Workers Rights Act 2019 (amende en 2024) accorde 16 semaines de conge maternite avec plein salaire. Au moins 8 semaines doivent etre prises apres l accouchement. Source: labour.govmu.org', 'Manman Moris', 'Workers Rights Act 2019', 'rights', 5, now() - interval '7 days'),
('craving-grossesse-que-manger', 'Cravings de grossesse: que manger a Maurice?', 'Les meilleures options locales pour satisfaire vos envies de grossesse.', 'Les cravings sont normales pendant la grossesse. Limitez la cafeine a 200mg par jour (ACOG). Evitez la papaye verte (papaine). Les dal puri, bredes et lentilles sont d excellents choix.', 'Manman Moris', 'ACOG Guidelines', 'nutrition', 6, now() - interval '14 days'),
('premier-trimestre-guide-complet', 'Guide complet du premier trimestre', 'Tout savoir sur les 12 premieres semaines de votre grossesse.', 'Le premier trimestre est une periode cruciale. Commencez l acide folique (400mcg par jour, recommandation WHO/ACOG). Consultez votre gynecologue des que possible.', 'Manman Moris', 'WHO/ACOG Guidelines', 'pregnancy', 8, now() - interval '21 days'),
('allaitement-conseils-maurice', 'Allaitement: conseils pratiques pour les mamans mauriciennes', 'Guide pratique pour un allaitement reussi a Maurice.', 'L allaitement est un moment precieux. Le Workers Rights Act 2019 vous accorde des pauses regulieres pour allaiter pendant 6 mois apres l accouchement.', 'Manman Moris', 'WHO/Workers Rights Act', 'postpartum', 6, now() - interval '28 days');

-- Seed marketplace items
INSERT INTO marketplace_items (name, description, price, category, seller_name, image_url) VALUES
('Gender Reveal Balloon Box', 'Beautiful blue and pink balloon box for your gender reveal party. Includes 50 balloons.', 1500, 'gender_reveal', 'Party Island MU', '/marketplace/balloon-box.jpg'),
('Gender Reveal Confetti Poppers (Pack of 4)', 'Surprise confetti poppers in blue or pink. Biodegradable confetti.', 800, 'gender_reveal', 'Party Island MU', '/marketplace/confetti.jpg'),
('Newborn Gift Hamper - Deluxe', 'Curated gift hamper with onesies, blankets, soft toys, and bath products.', 3500, 'baby_gifts', 'Babyland', '/marketplace/gift-hamper.jpg'),
('Organic Baby Blanket', 'Handmade organic cotton baby blanket. Made in Mauritius.', 1200, 'baby_gifts', 'Ti Kreol Craft', '/marketplace/blanket.jpg'),
('Maternity Photoshoot - Standard Package', '1-hour outdoor session, 20 edited photos, 2 outfit changes.', 8000, 'photography', 'Studio Lumiere', '/marketplace/photoshoot.jpg'),
('Newborn Photoshoot - Home Package', 'At-home newborn session within 14 days of birth. 15 edited photos.', 12000, 'photography', 'Studio Lumiere', '/marketplace/newborn-photo.jpg'),
('Maternity Dress - Floral Wrap', 'Comfortable floral wrap dress. One size fits all. Machine washable.', 950, 'maternity_wear', 'MamaStyle MU', '/marketplace/dress.jpg'),
('Breast Pump Rental - Monthly', 'Hospital-grade electric breast pump rental. Medela Symphony.', 1500, 'feeding', 'Babyland', '/marketplace/pump.jpg');

-- Seed forum posts
INSERT INTO forum_posts (id, category, title, content, is_anonymous, is_pinned, reply_count, created_at) VALUES
('a0000000-0000-0000-0000-000000000001', 'pregnancy', 'Ki gyneko zot rekomande dan Curepipe?', 'Bonzour tou dimounn! Mo pe rod enn bon gyneko dan Curepipe. Ki zot exp avek Dr Doorgakant? Li bon? Mersi davans!', false, false, 3, now() - interval '2 days'),
('a0000000-0000-0000-0000-000000000002', 'pregnancy', 'Craving mangue vert — normal?', 'Mo 14 semenn ek mo pa kapav aret manz mangue vert avek sel ek pima. Ki zot ti craving pandan grosses?', false, false, 5, now() - interval '5 days'),
('a0000000-0000-0000-0000-000000000003', 'postpartum', 'PPD — mo lexperyans ek konsey', 'Mo ti ena PPD apre mo premie tibaba. Mo anvi partaz mo lexperyans pou ed lot mama ki pe traverse sa.', true, true, 8, now() - interval '1 day'),
('a0000000-0000-0000-0000-000000000004', 'solo_mothers', 'Resours pou mama solo dan Port Louis', 'Eski ena bann asosyasion ou group sipor pou mama solo dan Port Louis? Mo pe santi mwa izole parfwa.', true, false, 4, now() - interval '3 days'),
('a0000000-0000-0000-0000-000000000005', 'general', 'Tips pou prepare sak lopital', 'Pou bann mama ki pre pou akouse — ki zot finn met dan zot sak lopital? Partaz zot list!', false, true, 12, now() - interval '10 days');

-- Seed donations
INSERT INTO donations (item_name, description, condition, category, district, is_available) VALUES
('Baby clothes 0-3 months (bundle)', '15 onesies, 5 pants, 3 hats. Mixed boy/girl colours. All washed and clean.', 'good', 'clothing', 'port_louis', true),
('Graco stroller', 'Graco FastAction fold stroller. Used for 6 months. Minor scratches but fully functional.', 'good', 'equipment', 'curepipe', true),
('Breast pump - Medela Swing', 'Electric breast pump. New replacement parts included. Original box.', 'like_new', 'feeding', 'rose_hill', true),
('Maternity jeans size M', 'Two pairs of maternity jeans, H&M brand. Size medium. Worn 3 times each.', 'like_new', 'maternity', 'vacoas', true),
('Baby cot with mattress', 'Wooden baby cot. Adjustable height. Includes new mattress. Used for one child.', 'good', 'equipment', 'flacq', true),
('Nursing pillow', 'Boppy nursing pillow with 2 covers. Great for breastfeeding support.', 'good', 'feeding', 'port_louis', true);

-- A donation with a photo (demonstrates image rendering).
INSERT INTO donations (item_name, description, condition, category, district, is_available, images) VALUES
('Baby stroller', 'Lightweight 3-wheel baby stroller, foldable, with sun canopy. Gently used, great condition.', 'like_new', 'equipment', 'quatre_bornes', true, ARRAY['/donations/stroller.svg']);

-- ───────────────────────────────────────────────────────────────
-- Dev-only test users (so login works after `supabase db reset`).
-- All passwords: test123456. profiles rows are auto-created by the
-- handle_new_user trigger; we set roles / flags afterwards.
--   admin@test.com   → admin
--   mod@test.com     → moderator
--   editor@test.com  → editor
--   user@test.com    → user
--   mama2@test.com   → user
--   solo@test.com    → user (is_solo_mother)
-- Token columns are set to '' inline: GoTrue scans them as non-nullable
-- strings and NULL triggers "Database error querying schema" on login.
-- ───────────────────────────────────────────────────────────────
WITH seed_users(id, email, full_name) AS (
  VALUES
    ('00000000-0000-0000-0000-0000000000a1', 'admin@test.com',  'Test Admin'),
    ('00000000-0000-0000-0000-0000000000b2', 'user@test.com',   'Test User'),
    ('00000000-0000-0000-0000-0000000000c3', 'mod@test.com',    'Test Moderator'),
    ('00000000-0000-0000-0000-0000000000d4', 'editor@test.com', 'Test Editor'),
    ('00000000-0000-0000-0000-0000000000e5', 'mama2@test.com',  'Mama Deux'),
    ('00000000-0000-0000-0000-0000000000f6', 'solo@test.com',   'Solo Mama')
)
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
  confirmation_token, recovery_token, email_change, email_change_token_new,
  email_change_token_current, phone_change, phone_change_token, reauthentication_token
)
SELECT
  '00000000-0000-0000-0000-000000000000', u.id::uuid, 'authenticated', 'authenticated',
  u.email, extensions.crypt('test123456', extensions.gen_salt('bf')), now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  jsonb_build_object('full_name', u.full_name), now(), now(),
  '', '', '', '', '', '', '', ''
FROM seed_users u
ON CONFLICT (id) DO NOTHING;

INSERT INTO auth.identities (
  provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at
)
SELECT
  u.id::text, u.id,
  jsonb_build_object('sub', u.id::text, 'email', u.email,
                     'email_verified', true, 'phone_verified', false),
  'email', now(), now(), now()
FROM auth.users u
WHERE u.email IN ('admin@test.com', 'user@test.com', 'mod@test.com',
                  'editor@test.com', 'mama2@test.com', 'solo@test.com')
ON CONFLICT DO NOTHING;

-- Roles & flags (profiles auto-created by trigger above).
UPDATE profiles SET role = 'admin'     WHERE id = '00000000-0000-0000-0000-0000000000a1';
UPDATE profiles SET role = 'moderator' WHERE id = '00000000-0000-0000-0000-0000000000c3';
UPDATE profiles SET role = 'editor'    WHERE id = '00000000-0000-0000-0000-0000000000d4';
UPDATE profiles SET is_solo_mother = true WHERE id = '00000000-0000-0000-0000-0000000000f6';
