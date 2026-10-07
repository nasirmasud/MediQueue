/**
 * Curated demo content for the home page sections.
 *
 * Values reproduce `code.html`. Where the prototype makes a claim the app does
 * not implement, the copy is softened — see the "copy" note on each entry and
 * the copy-pass checklist in plan.md Phase 1.
 */

export const TRUST_METRICS = [
  {
    icon: "groups",
    iconTone: "primary",
    value: "50+",
    label: "Verified Doctors",
    copy: "Top Prof scorers and post-graduate residents across Bangladesh.",
  },
  {
    icon: "verified_user",
    iconTone: "tertiary",
    value: "100%",
    label: "Verified Mentors",
    copy: "Every listing is manually vetted before it reaches the marketplace.",
  },
  {
    icon: "hourglass_top",
    iconTone: "secondary",
    value: "1.5k+",
    label: "Hours Mentored",
    copy: "Dedicated clinical simulations, dissection reviews and viva mock cards.",
  },
  {
    icon: "cloud_sync",
    iconTone: "tint",
    value: "24/7",
    label: "Flexible Access",
    copy: "Book sessions around your ward shifts, send-ups and exam weeks.",
  },
];

export const COLLEGES = [
  { acronym: "DMC", name: "Dhaka Medical" },
  { acronym: "CMC", name: "Chittagong Medical" },
  { acronym: "SSMC", name: "Sir Salimullah" },
  { acronym: "SOMC", name: "Sylhet Osmani" },
  { acronym: "RMC", name: "Rajshahi Medical" },
  { acronym: "MMC", name: "Mymensingh Medical" },
];

export const SUBJECT_TRACKS = [
  {
    icon: "vital_signs",
    iconTone: "primary",
    stage: "1st Prof",
    featured: false,
    title: "Anatomy & Histology",
    copy: "Gross dissection reviews, embryology models, viscera viva cards, and high-yield histological slide identification.",
    tutorCount: 18,
    subject: "Anatomy",
  },
  {
    icon: "ecg_heart",
    iconTone: "tertiary",
    stage: "1st Prof",
    featured: false,
    title: "Physiology",
    copy: "Cardiovascular loops, renal clearance, endocrine cascades, Guyton-based viva reasoning, and haematology practicals.",
    tutorCount: 14,
    subject: "Physiology",
  },
  {
    icon: "science",
    iconTone: "secondary",
    stage: "1st Prof",
    featured: false,
    title: "Biochemistry & Genetics",
    copy: "Metabolic pathway integration, inborn errors, clinical enzyme panels, and urine bench examination drills.",
    tutorCount: 9,
    subject: "Biochemistry",
  },
  {
    icon: "biotech",
    iconTone: "primary",
    stage: "2nd Prof",
    featured: false,
    title: "Pathology & Micro",
    copy: "Robbins systemic mechanisms, neoplasia viva questions, microbiology culture identification, and parasitology jars.",
    tutorCount: 12,
    subject: "Pathology",
  },
  {
    icon: "medication",
    iconTone: "tertiary",
    stage: "2nd Prof",
    featured: false,
    title: "Pharmacology & Rx",
    copy: "Autonomic pharmacology charts, antimicrobial regimens, clinical prescription writing, and adverse reaction tables.",
    tutorCount: 11,
    subject: "Pharmacology",
  },
  {
    icon: "stethoscope",
    iconTone: "secondary",
    stage: "Final Prof",
    featured: true,
    title: "Bedside OSCE & Clinical Viva",
    copy: "Short and long case methodology (Medicine, Surgery, Gynae), instrument drills, and rapid-fire X-ray / CT interpretation.",
    tutorCount: 15,
    subject: "General Medicine",
  },
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    icon: "travel_explore",
    iconTone: "primary",
    title: "Find Your Specialist",
    copy: "Filter verified doctors by university Prof syllabus, clinical ward subject, or college preference (DMC, CMC, SSMC).",
  },
  {
    step: "02",
    icon: "event_available",
    iconTone: "tertiary",
    title: "Select Date & Secure Book",
    copy: "Inspect real-time calendar availability without conflicts, then request your session in a few taps.",
  },
  {
    step: "03",
    icon: "cast_for_education",
    iconTone: "secondary",
    title: "Start Live Mentorship",
    copy: "Join the HD virtual clinical room with live anatomical slide viewers, an ECG whiteboard, and downloadable card summaries.",
  },
];

export const COLLEGE_RAIL_FOOTER =
  "All mentors hold verified BMDC registration numbers and undergo academic record background checks before listing.";

export const PROF_TRACKS = [
  {
    badge: "1st Prof Intensive",
    badgeTone: "primary",
    popular: false,
    title: "Anatomy & Physio Crash",
    copy: "Complete coverage of thorax, abdomen, head-neck dissection, brainstem slices, Guyton cardiovascular & renal loops.",
    features: [
      "12 Card Revision Viva Sessions",
      "Viscera Demonstration & High-Yield Qs",
      "Haematology Practical Simulation",
    ],
    price: 6500,
    priceUnit: "/ 8-Week Cohort",
  },
  {
    badge: "2nd & 3rd Prof Sprint",
    badgeTone: "secondary",
    popular: true,
    title: "Pathology & Pharma Mastery",
    copy: "Robbins systemic pathology drills, micro slide identification, autonomic pharmacology, and antibiotic resistance cards.",
    features: [
      "16 Robbins Case-Based Viva Drills",
      "Prescription Writing & Adverse Effects",
      "Microbiology Culture & Parasitology OSPE",
    ],
    price: 8000,
    priceUnit: "/ 6-Week Track",
  },
  {
    badge: "Final Prof Sprint",
    badgeTone: "tertiary",
    popular: false,
    title: "Bedside OSCE Boot Camp",
    copy: "Long case and short case examinations in Medicine, Surgery, and Gynae & Obs with senior medical registrars.",
    features: [
      "Cardiovascular & Respiratory Long Cases",
      "Surgical Instruments & X-Ray Spotting",
      "Obstetric Mannequin Drill Guidance",
    ],
    price: 9500,
    priceUnit: "/ 4-Week Sprint",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "My Anatomy viscera viva was terrifying until I took 4 mock sessions with a CMC registrar. She asked the exact embryological questions my external examiner asked!",
    name: "Sayeed Kabir",
    meta: "3rd Year, Shaheed Suhrawardy",
    image: "/images/students/sayeed-kabir.jpg",
  },
  {
    quote:
      "Being able to book a DMC physiology mentor for 1-on-1 loops before 1st Prof saved my year. Knowing the tutor is actually verified made all the difference.",
    name: "Nadia Mahjabin",
    meta: "2nd Year, Dhaka Medical College",
    image: "/images/students/nadia-mahjabin.jpg",
  },
  {
    quote:
      "Final Prof medicine long cases require structured reasoning. The clinical case simulations directly matched my actual ward bedside patients.",
    name: "Tanvir Hossain",
    meta: "Final Year, SSMC",
    image: "/images/students/tanvir-hossain.jpg",
  },
];

export const WHY_FEATURES = [
  {
    icon: "verified",
    iconTone: "tertiary",
    title: "Strict Identity & BMDC Verification",
    copy: "Every mentor's college credentials and registration status are pre-vetted.",
  },
  {
    icon: "calendar_month",
    iconTone: "primary",
    title: "Real-Time Dynamic Slot Booking",
    copy: "No WhatsApp scheduling back-and-forth. Pick verified open slots instantly.",
  },
  {
    icon: "schedule",
    iconTone: "secondary",
    title: "Zero Double-Booking",
    copy: "Slot counts update the moment a session is confirmed, so your booking always holds.",
  },
];

/** Rows that make an unbacked claim are omitted; see plan.md Phase 1 copy pass. */
export const COMPARISON_ROWS = [
  { label: "Verified Doctor Profiles (BMDC)", ours: true, theirs: false },
  { label: "1-on-1 Personalized Viva Feedback", ours: true, theirs: false },
  { label: "Real-Time Slot Availability", ours: true, theirs: false },
  { label: "Curated Exam-Focused Tracks", ours: true, theirs: false },
  { label: "Structured Booking Workflow", ours: true, theirs: false },
];

export const TOOLKITS = [
  {
    icon: "menu_book",
    iconTone: "primary",
    title: "Anatomy Viva Card Sheet",
    copy: "Top 120 frequently asked questions on viscera, nerve roots, and osteology.",
    action: "Download PDF",
  },
  {
    icon: "view_carousel",
    iconTone: "tertiary",
    title: "Pathology Slide Deck",
    copy: "Annotated microscope slides: granulomas, Reed-Sternberg, and carcinoma.",
    action: "Download Slides",
  },
  {
    icon: "table_chart",
    iconTone: "secondary",
    title: "Pharma Drug Class Matrix",
    copy: "Clean high-yield mechanism-of-action tables and antidote cheat sheets.",
    action: "Download Matrix",
  },
  {
    icon: "monitor_heart",
    iconTone: "primary",
    title: "ECG Rapid Diagnosis Guide",
    copy: "Step-by-step interpretation of arrhythmias, infarcts, and blockages.",
    action: "Download Guide",
  },
];

export const FAQS = [
  {
    question: "How does MediQueue verify tutor qualifications?",
    answer:
      "Every tutor must provide their active BMDC (Bangladesh Medical and Dental Council) registration number, collegiate institutional ID, and Prof transcript prior to approval by our medical board.",
  },
  {
    question: "Which payment methods are supported?",
    answer:
      "We support all domestic mobile financial services including bKash, Nagad, and Rocket, as well as Visa and Mastercard debit/credit cards.",
  },
  {
    question: "Can I request custom viva mock cards?",
    answer:
      "Yes. When booking a session, you can attach specific past Prof question sets, card names, or specimen queries in your session notes so your mentor prepares a bespoke clinical scenario.",
  },
  {
    question: "How is my booking confirmed?",
    answer:
      "Once you confirm a slot it is held for you immediately and appears under My Booked Sessions. Your mentor is notified and you will see the session status there.",
  },
  {
    question: "Can I book offline in-person ward tutorials?",
    answer:
      "Tutors marked with 'Offline Mode' or 'Both Mode' provide physical sessions at designated study centers or library premises in Dhaka, Chittagong, Rajshahi, and Sylhet.",
  },
  {
    question: "What if I need to cancel?",
    answer:
      "You can cancel an upcoming session from My Booked Sessions. Cancelled slots return to the mentor's available count straight away.",
  },
];

export const TUTOR_RECRUIT = {
  eyebrow: "For Registrars, Residents & Honors Scorer Doctors",
  title: "Are you a Doctor? Teach clinical acumen on MediQueue.",
  copy: "Share what you know with upcoming MBBS batches. Set your own hourly fees, define your weekly availability, and manage your own listing.",
  primaryCta: "Apply as a Medical Tutor",
  secondaryCta: "Tutor Guidelines",
  href: "/add-tutor",
};

export const FINAL_CTA = {
  eyebrow: "Join medical aspirants across Bangladesh",
  title: "Ready to Master Your Next Prof Exam?",
  copy: "Don't leave your viva or clinical OSCE to chance. Connect with experienced doctor mentors from DMC, CMC & SSMC today.",
  primaryCta: "Book a Mentor Today",
  secondaryCta: "Browse All Mentors",
  primaryHref: "#tutors-directory",
  secondaryHref: "/tutors",
  trustPoints: ["BMDC Verified", "Instant Booking", "Flexible Slots"],
};

/**
 * Section 7 — Live Clinical Classroom Console.
 * `isDemo` is intentional and must survive until Phase 12: there is no
 * `/classroom-sessions` endpoint, so this is a presentation, not a live feed.
 */
export const CLASSROOM_DEMO = {
  isDemo: true,
  eyebrow: "Real-time Simulation",
  title: "Live Clinical Classroom Console",
  copy: "See how interactive sessions unfold with synchronized multi-lead ECGs, specimen zoom, and examiner queries.",
  host: "Dr. Ariful (DMC Cardiology)",
  caseTitle: "Case #12: STEMI Card Drill",
  lead: "LEAD II (ST-ELEVATION)",
  vitals: "HR: 104 BPM | SPO2: 96%",
  svgPath:
    "M0,40 L60,40 L70,30 L80,50 L90,40 L120,40 L130,40 L135,10 L145,70 L155,20 L165,40 L200,40 L210,35 L230,35 L240,40 L300,40 L310,30 L320,50 L330,40 L360,40 L365,10 L375,70 L385,20 L395,40 L440,40 L450,35 L470,35 L500,40",
  paperSpeed: "Standard 25mm/s",
  finding: "Pathological Q Waves Detected",
  promptLabel: "Viva Question from Mentor:",
  prompt:
    "A 56-year-old diabetic male arrives with crushing substernal chest pressure for 2 hours. Looking at the ST elevation in leads II, III, and aVF, which coronary branch is occluded?",
  feed: [
    {
      who: "Dr. Ariful (Mentor)",
      tone: "primary",
      body: "Focus on the inferior leads. Remember the Right Coronary Artery supply.",
    },
    {
      who: "Sayeed (Student, SSMC)",
      tone: "secondary",
      body: "Right Coronary Artery (RCA) giving off Posterior Descending Artery.",
    },
    {
      who: "Mentor Verification",
      tone: "tertiary",
      body: "Correct! Now state three immediate clinical management steps.",
    },
  ],
  primaryAction: "Download Annotated Card PDF (Case #12)",
  secondaryAction: "Raise Hand for Viva Question",
};
