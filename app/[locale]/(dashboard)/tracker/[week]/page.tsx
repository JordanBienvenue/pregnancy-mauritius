"use client";

import { use } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import {
  Baby,
  Heart,
  Stethoscope,
  Lightbulb,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Ruler,
  Scale,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/animated-section";

// ── Full week-by-week detail data ─────────────────────────────────────
type WeekDetail = {
  week: number;
  fruit: string;
  emoji: string;
  size: string;
  weight: string;
  trimester: number;
  development: string[];
  symptoms: string[];
  tips: string[];
  localTip: string;
  checkup: boolean;
};

const allWeeks: WeekDetail[] = [
  {
    week: 1, fruit: "Grain de vanille", emoji: "🫘", size: "< 1 mm", weight: "—", trimester: 1,
    development: ["The egg is fertilised and begins dividing", "A tiny cluster of cells called a blastocyst forms", "The blastocyst travels down the fallopian tube"],
    symptoms: ["No noticeable pregnancy symptoms yet", "Light spotting possible (implantation)", "Mild cramping similar to period pain"],
    tips: ["Start taking folic acid (400 mcg daily)", "Avoid alcohol and smoking", "Eat a balanced diet with local fruits and vegetables"],
    localTip: "Visit your nearest Area Health Centre to confirm pregnancy. The Ministry of Health provides free prenatal care.",
    checkup: false,
  },
  {
    week: 2, fruit: "Grain de poivre", emoji: "🫘", size: "< 1 mm", weight: "—", trimester: 1,
    development: ["The blastocyst implants in the uterine wall", "The amniotic sac begins to form", "The placenta starts developing"],
    symptoms: ["Possible implantation bleeding", "Breast tenderness may begin", "Slight fatigue"],
    tips: ["Continue folic acid supplements", "Stay hydrated — drink plenty of water", "Get enough rest"],
    localTip: "You can find folic acid supplements at CityPharm, Courts Mammouth, or your local pharmacie.",
    checkup: false,
  },
  {
    week: 3, fruit: "Grain de sésame", emoji: "🌱", size: "1 mm", weight: "—", trimester: 1,
    development: ["Three layers of cells form (ectoderm, mesoderm, endoderm)", "These will become all baby's organs and tissues", "The neural tube begins forming"],
    symptoms: ["Missed period or very light bleeding", "Breast changes — fuller, more tender", "Possible nausea starting"],
    tips: ["Take a home pregnancy test", "Schedule your first prenatal visit", "Start a pregnancy journal"],
    localTip: "Pregnancy tests are available at every pharmacy in Mauritius, from Rs 150.",
    checkup: false,
  },
  {
    week: 4, fruit: "Grain de moutarde", emoji: "🌱", size: "2 mm", weight: "—", trimester: 1,
    development: ["The heart begins to beat", "Arm and leg buds start forming", "The brain, spinal cord, and nervous system form"],
    symptoms: ["Morning sickness may start", "Fatigue and drowsiness", "Frequent urination begins"],
    tips: ["Book your first scan at a clinic", "Keep small snacks handy for nausea", "Rest when you need to"],
    localTip: "For private care, City Clinic, Wellkin Hospital, and C-Care offer excellent early pregnancy scans.",
    checkup: true,
  },
  {
    week: 5, fruit: "Ti pima", emoji: "🟢", size: "5 mm", weight: "—", trimester: 1,
    development: ["Tiny arm and leg buds are visible", "The heart is now pumping blood", "Facial features begin forming — nose, mouth, ears"],
    symptoms: ["Morning sickness intensifies", "Food aversions or cravings begin", "Bloating and constipation"],
    tips: ["Ginger tea can help with nausea", "Eat small, frequent meals throughout the day", "Avoid strong smells that trigger nausea"],
    localTip: "Ginger tea from the local marché is a tried-and-true Mauritian remedy for morning sickness.",
    checkup: false,
  },
  {
    week: 6, fruit: "Grain grenade", emoji: "🔴", size: "8 mm", weight: "—", trimester: 1,
    development: ["The nose, mouth, and ears take shape", "Paddle-like hands begin forming", "The heart beats about 150 times per minute"],
    symptoms: ["Strong morning sickness", "Heightened sense of smell", "Mood swings and emotional changes"],
    tips: ["Stay hydrated even if vomiting", "Take vitamins at night if they upset your stomach", "Talk to your partner about your feelings"],
    localTip: "If morning sickness is severe, don't hesitate to visit Dr Joomye or any gynaecologist for anti-nausea medication.",
    checkup: false,
  },
  {
    week: 7, fruit: "Ti raisin", emoji: "🍇", size: "1.3 cm", weight: "—", trimester: 1,
    development: ["The brain is growing rapidly", "Hands and feet are forming", "The liver starts producing red blood cells"],
    symptoms: ["Continued nausea", "Skin changes — acne or glow", "Excess saliva (ptyalism)"],
    tips: ["Eat protein-rich foods: eggs, lentils, dal", "Wear comfortable, loose clothing", "Rest when tired — listen to your body"],
    localTip: "Mauritian dal (lentilles) is an excellent, affordable source of protein and folic acid during early pregnancy.",
    checkup: false,
  },
  {
    week: 8, fruit: "Framboise", emoji: "🫐", size: "1.6 cm", weight: "1 g", trimester: 1,
    development: ["Fingers and toes start forming", "Baby begins making tiny movements", "Eyelids are forming and ears take shape"],
    symptoms: ["Fatigue peaks around this week", "Uterus expanding — mild cramps", "Increased vaginal discharge"],
    tips: ["Your first ultrasound may happen this week", "Start planning your prenatal visit schedule", "Consider gentle exercise like walking"],
    localTip: "The government hospital in Victoria (SSRN) offers free first-trimester dating scans.",
    checkup: true,
  },
  {
    week: 9, fruit: "Cerise", emoji: "🍒", size: "2.3 cm", weight: "2 g", trimester: 1,
    development: ["All essential organs have formed", "Tiny muscles begin to develop", "Baby's heart is fully formed with four chambers"],
    symptoms: ["Waistline may start thickening", "Heartburn may begin", "Vivid dreams are common"],
    tips: ["Avoid raw or undercooked foods", "Limit caffeine to 200mg per day", "Start thinking about birth preferences"],
    localTip: "Avoid vindaye poisson cru (raw fish) and undercooked seafood from the marché during pregnancy.",
    checkup: false,
  },
  {
    week: 10, fruit: "Kumquat", emoji: "🍊", size: "3 cm", weight: "4 g", trimester: 1,
    development: ["Tiny fingernails begin to form", "Teeth start developing under the gums", "Baby can bend elbows"],
    symptoms: ["Round ligament pain may start", "Visible veins on chest and belly", "Emotional sensitivity continues"],
    tips: ["Invest in a good maternity bra", "Moisturise your belly to prevent stretch marks", "Stay physically active with gentle exercise"],
    localTip: "Coconut oil (l'huile coco) from the Mauritian market is perfect for keeping your belly skin supple.",
    checkup: false,
  },
  {
    week: 11, fruit: "Ti fig", emoji: "🟡", size: "4 cm", weight: "7 g", trimester: 1,
    development: ["Baby can open and close fists", "Tooth buds are forming", "Baby begins to hiccup"],
    symptoms: ["Nausea may start to ease", "Hair and nails may grow faster", "Bloating and gas continue"],
    tips: ["The nuchal translucency scan is done weeks 11-14", "Drink plenty of water", "Continue prenatal vitamins"],
    localTip: "Ask your gynae about the nuchal scan — all major private clinics in Mauritius offer it.",
    checkup: true,
  },
  {
    week: 12, fruit: "Prune", emoji: "🟣", size: "5.4 cm", weight: "14 g", trimester: 1,
    development: ["Reflexes develop — baby can squint and suck thumb", "Kidneys start producing urine", "The intestines are fully inside the abdomen"],
    symptoms: ["Morning sickness usually starts easing", "Energy levels begin to improve", "Darker skin patches may appear"],
    tips: ["You may want to share the news!", "Start considering a birth plan", "End of first trimester — celebrate this milestone"],
    localTip: "In Mauritius, many families wait until 12 weeks to announce — ti mam inn fini pase premie trimèss!",
    checkup: true,
  },
  {
    week: 13, fruit: "Citron vert", emoji: "🍋", size: "7.4 cm", weight: "23 g", trimester: 2,
    development: ["Vocal cords are forming", "Fingerprints are developing", "Baby can now swallow amniotic fluid"],
    symptoms: ["Energy returning — 'honeymoon trimester' begins", "Appetite increases", "Skin changes — linea nigra may appear"],
    tips: ["Welcome to trimester 2!", "Great time to start gentle exercise", "Eat iron-rich foods — spinach, brèdes, red meat"],
    localTip: "Brèdes (local leafy greens) like brède mouroum and brède songe are rich in iron and folic acid.",
    checkup: false,
  },
  {
    week: 14, fruit: "Petit limon", emoji: "🍋", size: "8.7 cm", weight: "43 g", trimester: 2,
    development: ["Baby can make facial expressions", "The roof of the mouth forms", "Lanugo (fine hair) covers baby's body"],
    symptoms: ["Feeling more energetic", "Baby bump starts to show", "Less nausea, more appetite"],
    tips: ["Start shopping for maternity clothes", "Stay active — walking, swimming, yoga", "Consider prenatal classes"],
    localTip: "Look for maternity wear at Jumbo or online on Facebook Marketplace Mauritius — great second-hand finds!",
    checkup: false,
  },
  {
    week: 15, fruit: "Pomme d'amour", emoji: "🍎", size: "10 cm", weight: "70 g", trimester: 2,
    development: ["Bones are hardening (ossifying)", "Baby can sense light through eyelids", "Taste buds are forming"],
    symptoms: ["Nasal congestion (pregnancy rhinitis)", "Increased blood volume — rosy cheeks", "Possible nosebleeds"],
    tips: ["Drink enough water to support increased blood volume", "Use a humidifier at night for congestion", "Keep up gentle exercise"],
    localTip: "The warm Mauritian climate means staying hydrated is extra important. Keep a water bottle with you at all times.",
    checkup: false,
  },
  {
    week: 16, fruit: "Avocat", emoji: "🥑", size: "11.6 cm", weight: "100 g", trimester: 2,
    development: ["Baby can hear sounds from outside!", "Facial muscles allow different expressions", "Toenails start growing"],
    symptoms: ["Round ligament pain with movement", "Back pain may begin", "Possible constipation"],
    tips: ["Start talking and singing to your baby", "Pregnancy pillow can help with sleep", "Eat fibre-rich foods for constipation"],
    localTip: "Play some local sega music for baby — studies show babies remember sounds from the womb!",
    checkup: true,
  },
  {
    week: 17, fruit: "Grenadine", emoji: "🫒", size: "13 cm", weight: "140 g", trimester: 2,
    development: ["Fat begins to form under baby's skin", "Sweat glands develop", "The umbilical cord grows stronger"],
    symptoms: ["Increased appetite and cravings", "Stretch marks may appear", "Leg cramps, especially at night"],
    tips: ["Eat calcium-rich foods for baby's bones", "Stretch before bed to prevent leg cramps", "Consider maternity photography"],
    localTip: "Mauritian milk and yoghurt from Innodis are great calcium sources. Also try local fromage blanc.",
    checkup: false,
  },
  {
    week: 18, fruit: "Patisson", emoji: "🫑", size: "14 cm", weight: "190 g", trimester: 2,
    development: ["You may start feeling baby move (quickening)!", "Ears are in their final position", "Myelin coats the nerves"],
    symptoms: ["Dizziness from low blood pressure", "Backaches become more common", "Swelling in feet and ankles"],
    tips: ["Note when you feel baby move — your gynae will ask!", "Wear supportive shoes", "The anomaly scan is coming up (week 20)"],
    localTip: "For comfortable shoes, visit Bata or look for cushioned sandals — your feet will thank you in the Mauritian heat.",
    checkup: false,
  },
  {
    week: 19, fruit: "Mangue ti-carotte", emoji: "🥭", size: "15 cm", weight: "240 g", trimester: 2,
    development: ["Vernix caseosa covers baby's skin", "Sensory development accelerates", "Baby develops a regular sleep-wake cycle"],
    symptoms: ["Hip pain as ligaments loosen", "Skin changes — dark patches (melasma)", "Shortness of breath"],
    tips: ["Use sunscreen — pregnancy hormones increase sun sensitivity", "Sleep on your left side for best blood flow", "Stay active but listen to your body"],
    localTip: "Apply SPF 50 sunscreen — the tropical Mauritian sun can worsen melasma (masque de grossesse) significantly.",
    checkup: false,
  },
  {
    week: 20, fruit: "Banane", emoji: "🍌", size: "16.5 cm", weight: "300 g", trimester: 2,
    development: ["Halfway there! Baby swallows amniotic fluid", "Baby can taste the food you eat through the amniotic fluid", "The uterus reaches your navel"],
    symptoms: ["Baby bump is now clearly visible", "Increased vaginal discharge", "Heartburn and indigestion"],
    tips: ["Anomaly scan (morphology scan) this week!", "You may learn the gender if you want to", "Celebrate the halfway mark"],
    localTip: "The 20-week scan is a major milestone. All clinics in Mauritius (Wellkin, C-Care, City Clinic) offer detailed anomaly scans.",
    checkup: true,
  },
  {
    week: 21, fruit: "Carotte", emoji: "🥕", size: "27 cm", weight: "360 g", trimester: 2,
    development: ["Baby's movements become more coordinated", "Bone marrow produces blood cells", "Eyebrows and eyelids fully formed"],
    symptoms: ["Varicose veins may appear", "Spider veins on legs", "Braxton Hicks contractions may start"],
    tips: ["Elevate your legs to reduce swelling", "Avoid standing for long periods", "Start thinking about baby names!"],
    localTip: "Popular Mauritian baby names: Priya, Anaya, Aarav, Liam, Kylian, Jade — check the latest Civil Status records for trends!",
    checkup: false,
  },
  {
    week: 22, fruit: "Ti papaye", emoji: "🟠", size: "28 cm", weight: "430 g", trimester: 2,
    development: ["Eyebrows and eyelids fully formed", "Baby develops grip strength", "Touch sense is very developed"],
    symptoms: ["Stretch marks becoming more visible", "Increased libido is normal", "Swollen gums when brushing"],
    tips: ["Keep moisturising your belly", "Visit the dentist — pregnancy affects oral health", "Stay hydrated in the tropical heat"],
    localTip: "Visit your dentist — dental care during pregnancy is important, and most dental clinics in Port Louis offer prenatal checkups.",
    checkup: false,
  },
  {
    week: 23, fruit: "Gros mangue", emoji: "🥭", size: "29 cm", weight: "500 g", trimester: 2,
    development: ["Baby can hear your heartbeat clearly", "Lung development progresses", "Baby responds to sounds"],
    symptoms: ["Ankles and feet swelling more", "Difficulty sleeping", "Increased appetite"],
    tips: ["Read aloud to your baby", "Use pillows for comfortable sleeping positions", "Eat iron-rich foods to prevent anaemia"],
    localTip: "Brède mouroum (moringa leaves) is a local superfood packed with iron. Add it to bouillon or dal.",
    checkup: false,
  },
  {
    week: 24, fruit: "Maïs doux", emoji: "🌽", size: "30 cm", weight: "600 g", trimester: 2,
    development: ["Lungs develop surfactant for breathing", "Baby's face is fully formed", "Inner ear developing — baby has sense of balance"],
    symptoms: ["Linea nigra darkens", "Carpal tunnel syndrome in wrists", "Trouble sleeping on your back"],
    tips: ["Glucose tolerance test (GDM screening) this week", "Count baby kicks — aim for 10 in 2 hours", "Start preparing the baby's room"],
    localTip: "The glucose test is standard at 24-28 weeks. Gestational diabetes is common in Mauritius — don't skip this test!",
    checkup: true,
  },
  {
    week: 25, fruit: "Chou-fleur", emoji: "🥦", size: "35 cm", weight: "660 g", trimester: 2,
    development: ["Baby responds to your touch through the belly", "Hair begins to grow on baby's head", "Nostrils begin to open"],
    symptoms: ["Haemorrhoids may develop", "Trouble catching your breath", "Frequent Braxton Hicks"],
    tips: ["Eat high-fibre foods to prevent haemorrhoids", "Practice breathing exercises", "Start thinking about childcare"],
    localTip: "Look into crèches early — popular ones like Petits Pas, Papillon, and Little Stars fill up quickly.",
    checkup: false,
  },
  {
    week: 26, fruit: "Laitue", emoji: "🥬", size: "36 cm", weight: "760 g", trimester: 2,
    development: ["Eyes open for the first time — baby can blink!", "Brain wave activity increases", "Immune system develops"],
    symptoms: ["Difficulty bending over", "Pelvic pressure increases", "Trouble concentrating (pregnancy brain)"],
    tips: ["Start your birth plan", "Research your delivery options", "Last weeks of trimester 2 — you're doing great!"],
    localTip: "Decide between public (SSRN, Jeetoo, Flacq) and private (Wellkin, C-Care, City Clinic) for delivery. Both are excellent choices.",
    checkup: false,
  },
  {
    week: 27, fruit: "Brocoli", emoji: "🥦", size: "37 cm", weight: "875 g", trimester: 3,
    development: ["Baby has regular sleep and wake cycles", "Lungs continue maturing", "Baby can hiccup — you might feel it!"],
    symptoms: ["Third trimester begins — tiredness returns", "Restless legs syndrome", "Swelling in hands and feet"],
    tips: ["Welcome to the third trimester!", "Start prenatal classes if you haven't yet", "Pack a hospital bag essentials list"],
    localTip: "Start thinking about what to pack for the hospital. Mauritian hospitals may provide basics, but bring your own toiletries and baby clothes.",
    checkup: true,
  },
  {
    week: 28, fruit: "Aubergine", emoji: "🍆", size: "38 cm", weight: "1 kg", trimester: 3,
    development: ["Baby can dream! REM sleep begins", "Eyelashes have grown", "Baby turns head towards light"],
    symptoms: ["Shortness of breath worsens", "Heartburn intensifies", "Leaking colostrum from breasts"],
    tips: ["Rhesus negative? You may need an Anti-D injection", "Visit your doctor every 2 weeks from now", "Practice relaxation techniques"],
    localTip: "Your prenatal visits increase to fortnightly now. Government hospitals provide all tests free of charge.",
    checkup: true,
  },
  {
    week: 29, fruit: "Giraumon", emoji: "🎃", size: "39 cm", weight: "1.15 kg", trimester: 3,
    development: ["Bones fully developed but still soft", "Baby is very active", "Muscles and lungs continue to mature"],
    symptoms: ["Increased back pain", "Difficulty sleeping", "Frequent need to urinate"],
    tips: ["Do pelvic floor exercises daily", "Use warm (not hot) compresses for back pain", "Start counting kicks daily"],
    localTip: "Giraumon (pumpkin) is a Mauritian staple — and a great source of vitamin A! Add it to your cari or bouillon.",
    checkup: false,
  },
  {
    week: 30, fruit: "Bon coco vert", emoji: "🥥", size: "40 cm", weight: "1.3 kg", trimester: 3,
    development: ["Baby gains weight rapidly", "Brain grows larger and develops folds", "Red blood cells form in bone marrow"],
    symptoms: ["Heartburn at its worst", "Fatigue and tiredness", "Mood swings return"],
    tips: ["Eat small, frequent meals for heartburn", "Rest often — nap if possible", "Finalise your birth plan"],
    localTip: "Dlo coco (coconut water) from the roadside vendors is perfectly hydrating and helps with heartburn naturally.",
    checkup: false,
  },
  {
    week: 31, fruit: "Noix de coco", emoji: "🥥", size: "41 cm", weight: "1.5 kg", trimester: 3,
    development: ["All five senses are working", "Baby can process information", "Fat layer thickens for temperature regulation"],
    symptoms: ["Leaking urine when sneezing or laughing", "Braxton Hicks more frequent", "Trouble finding a comfortable position"],
    tips: ["Continue pelvic floor exercises", "Wear a panty liner if needed", "Prepare a list of emergency contacts"],
    localTip: "Save 114 (SAMU) on speed dial and keep your hospital bag ready. Know the fastest route to your chosen hospital.",
    checkup: false,
  },
  {
    week: 32, fruit: "Jicama", emoji: "🫒", size: "42 cm", weight: "1.7 kg", trimester: 3,
    development: ["Baby practises breathing movements", "Skin becomes less wrinkled", "Baby may be in head-down position"],
    symptoms: ["Rib pain from baby's kicks", "Shortness of breath", "Heartburn continues"],
    tips: ["Monitor baby's movement patterns", "Start washing baby clothes and preparing the nursery", "Discuss pain relief options with your doctor"],
    localTip: "Wash baby clothes with fragrance-free detergent. You can find gentle baby detergent at Jumbo or Intermart.",
    checkup: true,
  },
  {
    week: 33, fruit: "Ananas", emoji: "🍍", size: "44 cm", weight: "1.9 kg", trimester: 3,
    development: ["Bones hardening, except skull (for delivery)", "Baby can detect light vs. dark", "Immune system strengthens"],
    symptoms: ["Difficulty walking — waddle appears", "Increased pelvic pressure", "Insomnia from discomfort"],
    tips: ["Take warm baths to relieve aches", "Ask about Group B Strep testing", "Pre-register at your chosen hospital"],
    localTip: "Fun fact: despite the myth, eating ananas (pineapple) in moderation is safe during pregnancy!",
    checkup: false,
  },
  {
    week: 34, fruit: "Melon miel", emoji: "🍈", size: "45 cm", weight: "2.1 kg", trimester: 3,
    development: ["Nervous system is maturing", "Vernix caseosa thickens", "Lungs are almost fully mature"],
    symptoms: ["Extreme fatigue", "Nesting instinct kicks in", "Frequent Braxton Hicks"],
    tips: ["Channel your nesting energy into hospital bag packing", "Install the car seat", "Have your partner learn the route to hospital"],
    localTip: "Car seats are mandatory! Find good deals at Babyland in Quatre Bornes or Babies 'R' Us Bagatelle.",
    checkup: false,
  },
  {
    week: 35, fruit: "Melon brodé", emoji: "🍈", size: "46 cm", weight: "2.4 kg", trimester: 3,
    development: ["Most babies move into head-down position", "Baby gains about 250g per week now", "Kidneys are fully developed"],
    symptoms: ["Pelvic pain intensifies", "Very frequent bathroom trips", "Difficulty sleeping"],
    tips: ["Group B Strep test usually done this week", "Finalise your birth support team", "Review your birth plan with your doctor"],
    localTip: "Ask your gynae about the Group B Strep test — it's a simple swab test offered at all Mauritian clinics.",
    checkup: true,
  },
  {
    week: 36, fruit: "Papaye", emoji: "🧡", size: "47 cm", weight: "2.6 kg", trimester: 3,
    development: ["Baby drops lower into the pelvis (lightening)", "Skull bones remain flexible for birth", "Liver and kidneys fully functioning"],
    symptoms: ["Easier to breathe as baby drops", "Increased pelvic pressure", "Mucus plug may begin loosening"],
    tips: ["Weekly doctor visits start now", "Hospital bag should be packed and ready", "Rest as much as possible"],
    localTip: "Papaye mûre (ripe papaya) is safe to eat and full of vitamins. It's the unripe (vert) papaya that should be avoided.",
    checkup: true,
  },
  {
    week: 37, fruit: "Lalos (gombo)", emoji: "🟢", size: "48 cm", weight: "2.9 kg", trimester: 3,
    development: ["Baby is now considered early term!", "Lung surfactant production is adequate", "Baby continues gaining fat"],
    symptoms: ["Lightning crotch pain", "Nesting instinct very strong", "Loose stools as body prepares"],
    tips: ["Know the signs of labour", "Keep your phone charged at all times", "Rest and enjoy these final weeks"],
    localTip: "Early term! If labour starts now, baby will likely be fine. Make sure you know the route to your hospital — traffic in Port Louis can be unpredictable!",
    checkup: true,
  },
  {
    week: 38, fruit: "Poireau", emoji: "🥒", size: "49 cm", weight: "3 kg", trimester: 3,
    development: ["All organs are fully mature", "Baby practices breathing, sucking, and gripping", "Meconium builds up in intestines"],
    symptoms: ["Cervix begins to efface and dilate", "Increased discharge (bloody show possible)", "Strong Braxton Hicks contractions"],
    tips: ["Know the difference between Braxton Hicks and real labour", "Eat dates — studies show they may ease labour", "Stay calm and positive"],
    localTip: "Dates (dattes) from the Indian grocery stores are affordable and studies suggest eating 6 per day from week 36 may help with labour.",
    checkup: true,
  },
  {
    week: 39, fruit: "Pastèque", emoji: "🍉", size: "50 cm", weight: "3.2 kg", trimester: 3,
    development: ["Baby is full term!", "Antibodies pass from mother to baby", "Baby's brain and lungs continue to mature"],
    symptoms: ["Water may break anytime", "Strong, regular contractions may begin", "Extreme nesting and anticipation"],
    tips: ["Rest and conserve energy for labour", "Time your contractions: 5-1-1 rule", "Stay close to home"],
    localTip: "The 5-1-1 rule: contractions 5 minutes apart, lasting 1 minute, for 1 hour = head to the hospital!",
    checkup: true,
  },
  {
    week: 40, fruit: "Jacque (Ti-Jacques)", emoji: "🍈", size: "51 cm", weight: "3.4 kg", trimester: 3,
    development: ["Due date week! Baby is perfectly developed", "Baby's head will mould during delivery", "Ready to meet the world"],
    symptoms: ["Strong contractions if labour begins", "Water breaking — a gush or slow leak", "Intense pelvic pressure"],
    tips: ["Due date is an estimate — only 5% of babies arrive on their due date", "Trust your body and your medical team", "Soon you will hold your baby!"],
    localTip: "Congratulations, mama! Whether at SSRN Hospital, Wellkin, or City Clinic — you and your baby are in good hands. Bienveni dan lemonn, ti baba!",
    checkup: true,
  },
];

const trimesterLabels: Record<number, string> = {
  1: "trimester1",
  2: "trimester2",
  3: "trimester3",
};

const trimesterGradients: Record<number, string> = {
  1: "from-pink-50 to-pink-100/50",
  2: "from-amber-50 to-amber-100/50",
  3: "from-teal-50 to-teal-100/50",
};

const trimesterAccents: Record<number, string> = {
  1: "text-pink-600 bg-pink-100",
  2: "text-amber-600 bg-amber-100",
  3: "text-teal-600 bg-teal-100",
};

type PageProps = {
  params: Promise<{ locale: string; week: string }>;
};

export default function WeekDetailPage({ params }: PageProps) {
  const { locale, week: weekParam } = use(params);
  const t = useTranslations("tracker");
  const tc = useTranslations("common");

  const weekNum = Math.max(1, Math.min(40, parseInt(weekParam) || 1));
  const data = allWeeks.find((w) => w.week === weekNum) || allWeeks[0];
  const progress = Math.round((weekNum / 40) * 100);

  const prevWeek = weekNum > 1 ? weekNum - 1 : null;
  const nextWeek = weekNum < 40 ? weekNum + 1 : null;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${trimesterGradients[data.trimester]}`}>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-1/4 h-52 w-52 rounded-full bg-primary/6 blur-3xl" />
          <div className="absolute bottom-10 right-1/4 h-64 w-64 rounded-full bg-secondary/6 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
          {/* Back button */}
          <AnimatedSection>
            <Link
              href={`/${locale}/tracker`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {tc("back")}
            </Link>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row">
              {/* Fruit emoji */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
                className="relative"
              >
                <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-white/60 shadow-lg backdrop-blur-sm sm:h-36 sm:w-36">
                  <motion.span
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="text-7xl sm:text-8xl"
                  >
                    {data.emoji}
                  </motion.span>
                </div>
                <Badge className={`absolute -bottom-2 left-1/2 -translate-x-1/2 ${trimesterAccents[data.trimester]}`}>
                  {t(trimesterLabels[data.trimester])}
                </Badge>
              </motion.div>

              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {t("week")} {weekNum}
                </h1>
                <p className="mt-1 text-lg font-medium text-primary">
                  {t("babySize")} {data.fruit}
                </p>

                {/* Stats */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                  <div className="flex items-center gap-1.5 rounded-full bg-white/60 px-3 py-1.5 text-sm shadow-sm backdrop-blur-sm">
                    <Ruler className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="font-medium">{data.size}</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-white/60 px-3 py-1.5 text-sm shadow-sm backdrop-blur-sm">
                    <Scale className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="font-medium">{data.weight}</span>
                  </div>
                  {data.checkup && (
                    <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm text-primary shadow-sm">
                      <Stethoscope className="h-3.5 w-3.5" />
                      <span className="font-medium">{t("checkupDue")}</span>
                    </div>
                  )}
                </div>

                {/* Progress */}
                <div className="mt-5">
                  <Progress value={progress}>
                    <ProgressLabel>{t("progress")}</ProgressLabel>
                    <ProgressValue>
                      {() => `${progress}%`}
                    </ProgressValue>
                  </Progress>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <StaggerContainer className="grid gap-6 md:grid-cols-2">
            {/* Development */}
            <StaggerItem>
              <Card className="h-full border-pink-200/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-100 text-pink-600">
                      <Baby className="h-4 w-4" />
                    </div>
                    {t("development")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {data.development.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="flex gap-3 text-sm"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pink-100 text-xs font-bold text-pink-600">
                          {i + 1}
                        </span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </StaggerItem>

            {/* Symptoms */}
            <StaggerItem>
              <Card className="h-full border-amber-200/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                      <Heart className="h-4 w-4" />
                    </div>
                    {t("symptoms")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {data.symptoms.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="flex gap-3 text-sm"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-600">
                          {i + 1}
                        </span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </StaggerItem>

            {/* Tips */}
            <StaggerItem>
              <Card className="h-full border-teal-200/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-100 text-teal-600">
                      <Lightbulb className="h-4 w-4" />
                    </div>
                    {t("tips")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {data.tips.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        className="flex gap-3 text-sm"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-600">
                          {i + 1}
                        </span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </StaggerItem>

            {/* Local Mauritius tip */}
            <StaggerItem>
              <Card className="h-full border-primary/20 bg-gradient-to-br from-brand-pink-light/30 to-brand-teal-light/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <MapPin className="h-4 w-4" />
                    </div>
                    {t("localTip")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-sm leading-relaxed"
                  >
                    {data.localTip}
                  </motion.p>
                </CardContent>
              </Card>
            </StaggerItem>
          </StaggerContainer>

          {/* Checkup alert */}
          {data.checkup && (
            <AnimatedSection delay={0.3}>
              <Card className="mt-6 border-primary/30 bg-primary/5">
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Stethoscope className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">{t("checkupDue")}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t("checkupRecommended", { week: weekNum })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          )}

          {/* Navigation */}
          <AnimatedSection delay={0.35}>
            <div className="mt-8 flex items-center justify-between">
              {prevWeek ? (
                <Button
                  variant="outline"
                  className="gap-1.5"
                  render={<Link href={`/${locale}/tracker/${prevWeek}`} />}
                >
                  <ChevronLeft className="h-4 w-4" />
                  {t("week")} {prevWeek}
                </Button>
              ) : (
                <div />
              )}
              <Button
                variant="ghost"
                render={<Link href={`/${locale}/tracker`} />}
              >
                {t("allWeeks")}
              </Button>
              {nextWeek ? (
                <Button
                  variant="outline"
                  className="gap-1.5"
                  render={<Link href={`/${locale}/tracker/${nextWeek}`} />}
                >
                  {t("week")} {nextWeek}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <div />
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
