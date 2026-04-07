-- Seed healthcare providers
INSERT INTO providers (name, type, district, address, phone, lat, lng, is_verified, description) VALUES
('Dr. Anisha Doorgakant', 'gynaecologist', 'port_louis', '12 Rue Edith Cavell, Port Louis', '+230 213 4567', -20.1609, 57.5012, true, 'Specialises in high-risk pregnancies. 15 years experience.'),
('Dr. Ravi Doorgakant', 'gynaecologist', 'curepipe', '34 Royal Road, Curepipe', '+230 674 5678', -20.3167, 57.5167, true, 'Gynaecologist and obstetrician. Speaks English, French, and Hindi.'),
('Dr. Marie-Claire Ah-Ping', 'gynaecologist', 'rose_hill', '8 Rue St Jean, Rose Hill', '+230 465 8901', -20.2333, 57.4667, true, 'Women''s health specialist. Available weekends.'),
('Dr. Sanjay Doobary', 'gynaecologist', 'vacoas', 'Phoenix Medical Centre, Vacoas', '+230 696 2345', -20.2833, 57.4833, false, 'General gynaecology and prenatal care.'),
('Dr. Fatima Joomun', 'gynaecologist', 'flacq', '15 Avenue des Flamboyants, Flacq', '+230 413 6789', -20.1833, 57.7167, true, 'Prenatal and postnatal specialist.'),
('Marie-Jose Lafleur', 'midwife', 'port_louis', '22 Rue Desforges, Port Louis', '+230 5912 3456', -20.1625, 57.4980, true, 'Certified midwife with 20 years experience. Home births available.'),
('Priya Doorgakant', 'midwife', 'curepipe', '45 Avenue Tulipes, Curepipe', '+230 5823 4567', -20.3180, 57.5200, false, 'Specialises in natural births and prenatal yoga.'),
('Nathalie Perrier', 'lactation', 'rose_hill', '6 Rue du Commerce, Rose Hill', '+230 5745 6789', -20.2350, 57.4690, true, 'IBCLC certified lactation consultant.'),
('Sarita Doorgakant', 'counsellor', 'port_louis', 'C-Care Clinic, Port Louis', '+230 5634 7890', -20.1610, 57.5050, true, 'Postpartum depression specialist. Trilingual support.'),
('Studio Lumiere', 'photographer', 'curepipe', '18 Rue Bernardin de St Pierre, Curepipe', '+230 5956 8901', -20.3160, 57.5180, true, 'Maternity and newborn photography. Packages from Rs 8,000.'),
('Zen Mama Spa', 'massage', 'vacoas', '3 Royal Road, Vacoas', '+230 5867 9012', -20.2840, 57.4850, false, 'Prenatal and postnatal massage therapy.');

-- Seed sponsors
INSERT INTO sponsors (name, logo_url, website, package, category, is_active) VALUES
('CityPharm', '/sponsors/citypharm.svg', 'https://citypharm.mu', 'premium', 'pharmacy', true),
('Apollo Bramwell Hospital', '/sponsors/apollo.svg', 'https://apollobramwell.mu', 'standard', 'clinic', true),
('Babyland', '/sponsors/babyland.svg', 'https://babyland.mu', 'standard', 'baby_shop', true),
('Swan Insurance', '/sponsors/swan.svg', 'https://swan.mu', 'basic', 'insurance', true);

-- Seed blog posts
INSERT INTO blog_posts (slug, title, excerpt, content, author, reviewer, category, read_time, published_at) VALUES
('gynecologue-maurice-comment-choisir', 'Comment choisir son gynecologue a Maurice', 'Guide complet pour trouver le bon gynecologue pres de chez vous a Maurice.', 'Choisir un gynecologue est une decision importante...', 'Manman Moris', 'Dr. Anisha Doorgakant', 'healthcare', 7, now() - interval '3 days'),
('droits-maternite-maurice-2024', 'Vos droits de maternite a Maurice en 2024', 'Tout ce que vous devez savoir sur le conge maternite et vos droits.', 'Le Workers Rights Act 2019 protege les femmes enceintes...', 'Manman Moris', 'Legal Team', 'rights', 5, now() - interval '7 days'),
('craving-grossesse-que-manger', 'Cravings de grossesse: que manger a Maurice?', 'Les meilleures options locales pour satisfaire vos envies de grossesse.', 'Les cravings sont normales pendant la grossesse...', 'Manman Moris', 'Dr. Fatima Joomun', 'nutrition', 6, now() - interval '14 days'),
('premier-trimestre-guide-complet', 'Guide complet du premier trimestre', 'Tout savoir sur les 12 premieres semaines de votre grossesse.', 'Le premier trimestre est une periode cruciale...', 'Manman Moris', 'Dr. Marie-Claire Ah-Ping', 'pregnancy', 8, now() - interval '21 days'),
('allaitement-conseils-maurice', 'Allaitement: conseils pratiques pour les mamans mauriciennes', 'Guide pratique pour un allaitement reussi a Maurice.', 'L allaitement est un moment precieux...', 'Manman Moris', 'Nathalie Perrier IBCLC', 'postpartum', 6, now() - interval '28 days');

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
