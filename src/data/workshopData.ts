import {
  AnchorType,
  BacklinkProfileSnapshot,
  PlanWeekTask,
  PollOptionId,
  WorkshopState,
} from '../types/workshop';

export const WORKSHOP_META = {
  title: 'Dominate Search Engine Rankings',
  subtitle: 'Backlink Building for Beginners',
  date: 'Saturday, 28 November 2026',
  time: '11:00 AM to 12:30 PM IST',
  platform: 'Microsoft Teams',
  speaker: 'Rishan',
  speakerRole: 'SEO Trainer, Elysium Academy',
  website: 'www.elysiumacademy.org',
  email: 'bm@elysiumgroups.com',
  phone: '+91 96777 61442',
  address: '230, Church Road, Anna Nagar, Madurai 625 020',
};

export const AGENDA_ITEMS = [
  { time: '11:00 – 11:05', session: 'Opening', topic: 'Welcome and warm-up poll', duration: '5 min', target: 'overview' as const },
  { time: '11:05 – 11:25', session: 'Module 1', topic: 'Backlinks and link quality', duration: '20 min', target: 'module1' as const },
  { time: '11:25 – 11:45', session: 'Module 2', topic: 'Referring domains and anchor text', duration: '20 min', target: 'module2' as const },
  { time: '11:45 – 11:50', session: 'Break', topic: 'Short break & brand kit prep', duration: '5 min', target: 'module3' as const },
  { time: '11:50 – 12:10', session: 'Module 3', topic: 'Opportunities and submissions', duration: '20 min', target: 'module3' as const },
  { time: '12:10 – 12:22', session: 'Module 4', topic: 'Competitor analysis and 30-day plan', duration: '12 min', target: 'module4' as const },
  { time: '12:22 – 12:30', session: 'Closing', topic: 'Q&A, assessment, and e-certificate', duration: '8 min', target: 'certificate' as const },
];

export const WELCOME_ETIQUETTE = [
  {
    title: 'Use your full name',
    description: 'It is used for attendance and your certificate.',
  },
  {
    title: 'Stay on mute',
    description: 'Unmute only when the trainer invites you.',
  },
  {
    title: 'Ask in chat',
    description: 'Type questions and exercise answers at any time.',
  },
  {
    title: 'Raise hand',
    description: 'Use it when you want to speak during Q&A.',
  },
];

export const TAKEAWAY_ITEMS = [
  {
    number: '01',
    title: 'Backlink Tracker',
    description: 'A filled sheet with your first submissions and opportunities.',
    targetView: 'tracker' as const,
  },
  {
    number: '02',
    title: '30-Day Plan',
    description: 'A one-page backlink plan for a website of your choice.',
    targetView: 'plan' as const,
  },
  {
    number: '03',
    title: 'Quality Checklist',
    description: 'Five points to judge any link before pursuing or keeping it.',
    targetView: 'modules' as const,
  },
  {
    number: '04',
    title: 'E-Certificate',
    description: 'Certificate of participation from Elysium Academy.',
    targetView: 'certificate' as const,
  },
];

export const WARMUP_POLL_OPTIONS: {
  id: PollOptionId;
  label: string;
  baseVotes: number;
}[] = [
  { id: 'yes_regularly', label: 'Yes, I check backlinks regularly for a website', baseVotes: 9 },
  { id: 'once_or_twice', label: 'I tried a backlink tool once or twice', baseVotes: 18 },
  { id: 'heard_never', label: 'I have heard of backlinks, but never checked them', baseVotes: 31 },
  { id: 'first_time', label: 'No, today is my first time learning about backlinks', baseVotes: 24 },
];

export const QUALITY_CHECKLIST = [
  {
    id: 1,
    check: '1. Relevance',
    quality: 'Same or related topic',
    lowQuality: 'Unrelated topic',
    explanation: 'A link from a tech education blog to a coding academy sends a clear topical signal; a link from an auto-parts blog does not.',
  },
  {
    id: 2,
    check: '2. Trust',
    quality: 'Real site, real visitors',
    lowQuality: 'Thin or copied content',
    explanation: 'Sites with genuine editorial review, active readership, and original articles carry real authority.',
  },
  {
    id: 3,
    check: '3. Placement',
    quality: 'Inside useful content',
    lowQuality: 'Footers and link lists',
    explanation: 'Contextual links inside the main article body carry far more weight than links buried in sidebars, footers, or crowded link pages.',
  },
  {
    id: 4,
    check: '4. Anchor text',
    quality: 'Natural or brand words',
    lowQuality: 'Same keyword repeated',
    explanation: 'Natural phrasing or brand names look organic; repeating the exact commercial keyword signals manipulation.',
  },
  {
    id: 5,
    check: '5. How it was earned',
    quality: 'Earned or listed',
    lowQuality: 'Bought or automated',
    explanation: 'Editorial mentions and genuine platform profiles endure algorithm updates, whereas paid link farms and automated blasts risk penalties.',
  },
];

export interface LinkScenario {
  id: string;
  number: number;
  title: string;
  sourceSite: string;
  sourceTopic: string;
  targetSite: string;
  placement: string;
  anchorText: string;
  acquisition: string;
  snippetHtml: {
    before: string;
    anchor: string;
    after: string;
  };
  correctVerdict: 'Q' | 'L';
  trainerFeedback: string;
  keyChecklistPoints: string[];
  suggestedReasons: string[];
}

export const EXERCISE_1_SCENARIOS: LinkScenario[] = [
  {
    id: 'scen-1',
    number: 1,
    title: 'Regional Tech News Feature',
    sourceSite: 'tamilnaduedutech.in',
    sourceTopic: 'Education & Career News (18,000 monthly readers)',
    targetSite: 'www.elysiumacademy.org',
    placement: 'Inside paragraph 3 of an article on digital skills in Madurai',
    anchorText: 'Elysium Academy',
    acquisition: 'Editorial mention after a student showcase press note',
    snippetHtml: {
      before: 'Graduates looking for hands-on SEO and cloud certifications in southern Tamil Nadu increasingly attend practical bootcamps such as ',
      anchor: 'Elysium Academy',
      after: ' in Anna Nagar before applying for agency roles.',
    },
    correctVerdict: 'Q',
    trainerFeedback: 'Quality (Q). Passes all 5 points: relevant education topic, trusted local news readership, contextual body placement, natural branded anchor, and editorially earned.',
    keyChecklistPoints: ['Relevance', 'Trust', 'Placement', 'Anchor text', 'Earned'],
    suggestedReasons: [
      'Relevant education news site with natural branded anchor inside article body',
      'Trusted site with real readers and editorial placement',
    ],
  },
  {
    id: 'scen-2',
    number: 2,
    title: 'Global Free Links Footer Swap',
    sourceSite: 'best-plumbing-deals-247.info',
    sourceTopic: 'Plumbing & Home Repair Coupons (thin spun posts)',
    targetSite: 'www.elysiumacademy.org',
    placement: 'Sitewide footer under "Partner Links" alongside 65 other URLs',
    anchorText: 'best digital marketing course in Madurai cheap',
    acquisition: 'Paid ₹500 in a bulk directory package',
    snippetHtml: {
      before: 'Quick Links: Cheap Flights | Locksmith 24x7 | ',
      anchor: 'best digital marketing course in Madurai cheap',
      after: ' | Buy Sofa Online | Car Loan Fast',
    },
    correctVerdict: 'L',
    trainerFeedback: 'Low-Quality (L). Fails every check: completely unrelated topic, thin site, crowded footer link list, stuffed exact-match anchor, and bought in a package.',
    keyChecklistPoints: ['Unrelated topic', 'Footer link list', 'Bought link', 'Stuffed keyword anchor'],
    suggestedReasons: [
      'Unrelated plumbing site with footer link list and bought placement',
      'Keyword-stuffed anchor text on a thin coupon site',
    ],
  },
  {
    id: 'scen-3',
    number: 3,
    title: 'College Department Alumni Resource Page',
    sourceSite: 'csdept.maduraicollege.edu.in',
    sourceTopic: 'Computer Science Department Careers & Industry Partners',
    targetSite: 'www.elysiumacademy.org',
    placement: 'Inside the curated "Local Skill Training Partners" section',
    anchorText: 'www.elysiumacademy.org',
    acquisition: 'Listed after hosting an on-campus SEO workshop',
    snippetHtml: {
      before: 'Final-year students preparing for digital marketing internships can review the free syllabus and practice workshops published at ',
      anchor: 'www.elysiumacademy.org',
      after: ' through our industry partner network.',
    },
    correctVerdict: 'Q',
    trainerFeedback: 'Quality (Q). Institutional .edu.in page on a directly relevant careers topic, real student audience, natural naked URL anchor, and genuinely earned via partnership.',
    keyChecklistPoints: ['Relevance', 'Institutional trust', 'Useful content', 'Natural URL anchor'],
    suggestedReasons: [
      'Relevant college department page with real institutional trust',
      'Earned partnership link with clean naked URL anchor',
    ],
  },
  {
    id: 'scen-4',
    number: 4,
    title: 'Automated Blog Comment Blast',
    sourceSite: 'daily-recipes-corner.blogspot.com',
    sourceTopic: 'Home Cooking Blog (unmoderated comment section with 140 spam replies)',
    targetSite: 'www.elysiumacademy.org',
    placement: 'Bottom comment thread posted by a bot',
    anchorText: 'digital marketing course in Madurai',
    acquisition: 'Automated comment-submission software',
    snippetHtml: {
      before: 'Nice post thanks for sharing!! Visit my website for ',
      anchor: 'digital marketing course in Madurai',
      after: ' best price join today!!',
    },
    correctVerdict: 'L',
    trainerFeedback: 'Low-Quality (L). Automated comment spam on an unrelated cooking blog with repeated exact-match anchor text. Search engines ignore or discount these links.',
    keyChecklistPoints: ['Unrelated topic', 'Automated spam', 'Comment section placement'],
    suggestedReasons: [
      'Automated comment spam on an unrelated cooking blog',
      'Exact keyword stuffed inside an unmoderated comment thread',
    ],
  },
  {
    id: 'scen-5',
    number: 5,
    title: 'Verified Business Listing on Justdial / GBP',
    sourceSite: 'justdial.com',
    sourceTopic: 'Local Business & Training Institute Directory (Madurai)',
    targetSite: 'www.elysiumacademy.org',
    placement: 'Complete verified business profile with consistent address, phone, and photos',
    anchorText: 'Visit Website',
    acquisition: 'Manual listing submitted with complete, accurate NAP details',
    snippetHtml: {
      before: 'Elysium Academy · 230, Church Road, Anna Nagar, Madurai 625 020 · +91 96777 61442 · ',
      anchor: 'Visit Website',
      after: ' · Verified Institute',
    },
    correctVerdict: 'Q',
    trainerFeedback: 'Quality (Q) foundational link. Genuine, high-trust local platform, relevant category, complete details, and natural generic anchor. Remember: foundation links support trust and local visibility.',
    keyChecklistPoints: ['Trusted platform', 'Relevant category', 'Natural generic anchor', 'Legitimately listed'],
    suggestedReasons: [
      'Genuine local business listing with complete and consistent NAP details',
      'Trusted platform with natural anchor text building a clean foundation',
    ],
  },
];

export const ANCHOR_TEXT_TYPES: {
  type: AnchorType;
  example: string;
  howMuch: string;
  idealRange: string;
  guidance: string;
}[] = [
  {
    type: 'Branded',
    example: 'Elysium Academy',
    howMuch: 'Largest share',
    idealRange: '40% – 55%',
    guidance: 'Your company or personal brand name. Safe, natural, and builds entity authority.',
  },
  {
    type: 'Naked URL',
    example: 'www.elysiumacademy.org',
    howMuch: 'Common',
    idealRange: '15% – 25%',
    guidance: 'Raw web address pasted directly into articles, bios, or resource citations.',
  },
  {
    type: 'Generic',
    example: 'click here, visit website',
    howMuch: 'A few',
    idealRange: '10% – 15%',
    guidance: 'Common in directory buttons, author bios, and natural editorial citations.',
  },
  {
    type: 'Partial match',
    example: 'courses in digital marketing at Elysium',
    howMuch: 'When it fits',
    idealRange: '10% – 15%',
    guidance: 'Combines a topic phrase with brand or conversational words smoothly in a sentence.',
  },
  {
    type: 'Exact match',
    example: 'digital marketing course in Madurai',
    howMuch: 'Rarely',
    idealRange: '1% – 5%',
    guidance: 'Exact target search query. Overusing exact-match anchors triggers over-optimization filters.',
  },
];

export const SIMULATED_DOMAIN_REPORTS: Record<string, BacklinkProfileSnapshot> = {
  'www.elysiumacademy.org': {
    domain: 'www.elysiumacademy.org',
    authorityScore: 34,
    totalBacklinks: 1420,
    referringDomains: 168,
    dofollowPercent: 72,
    capturedAt: 'Live Simulated Snapshot',
    anchors: [
      { id: 'a1', anchorText: 'Elysium Academy', percentShare: 46, referringDomains: 77, correctType: 'Branded', selectedType: '', isVerified: false },
      { id: 'a2', anchorText: 'www.elysiumacademy.org', percentShare: 21, referringDomains: 35, correctType: 'Naked URL', selectedType: '', isVerified: false },
      { id: 'a3', anchorText: 'visit website', percentShare: 14, referringDomains: 24, correctType: 'Generic', selectedType: '', isVerified: false },
      { id: 'a4', anchorText: 'courses in digital marketing at Elysium', percentShare: 13, referringDomains: 22, correctType: 'Partial match', selectedType: '', isVerified: false },
      { id: 'a5', anchorText: 'digital marketing course in Madurai', percentShare: 6, referringDomains: 10, correctType: 'Exact match', selectedType: '', isVerified: false },
    ],
  },
  'maduraitechhub.in': {
    domain: 'maduraitechhub.in',
    authorityScore: 26,
    totalBacklinks: 540,
    referringDomains: 74,
    dofollowPercent: 68,
    capturedAt: 'Live Simulated Snapshot',
    anchors: [
      { id: 'm1', anchorText: 'Madurai Tech Hub', percentShare: 41, referringDomains: 30, correctType: 'Branded', selectedType: '', isVerified: false },
      { id: 'm2', anchorText: 'https://maduraitechhub.in', percentShare: 24, referringDomains: 18, correctType: 'Naked URL', selectedType: '', isVerified: false },
      { id: 'm3', anchorText: 'software internships at Madurai Tech Hub', percentShare: 15, referringDomains: 11, correctType: 'Partial match', selectedType: '', isVerified: false },
      { id: 'm4', anchorText: 'click here', percentShare: 12, referringDomains: 9, correctType: 'Generic', selectedType: '', isVerified: false },
      { id: 'm5', anchorText: 'IT training center Madurai', percentShare: 8, referringDomains: 6, correctType: 'Exact match', selectedType: '', isVerified: false },
    ],
  },
  'greenleafcoffee.in': {
    domain: 'greenleafcoffee.in',
    authorityScore: 42,
    totalBacklinks: 2890,
    referringDomains: 312,
    dofollowPercent: 79,
    capturedAt: 'Live Simulated Snapshot',
    anchors: [
      { id: 'g1', anchorText: 'GreenLeaf Coffee Roasters', percentShare: 52, referringDomains: 162, correctType: 'Branded', selectedType: '', isVerified: false },
      { id: 'g2', anchorText: 'greenleafcoffee.in', percentShare: 18, referringDomains: 56, correctType: 'Naked URL', selectedType: '', isVerified: false },
      { id: 'g3', anchorText: 'freshly roasted filter coffee guide', percentShare: 14, referringDomains: 44, correctType: 'Partial match', selectedType: '', isVerified: false },
      { id: 'g4', anchorText: 'read more', percentShare: 11, referringDomains: 34, correctType: 'Generic', selectedType: '', isVerified: false },
      { id: 'g5', anchorText: 'buy south indian filter coffee online', percentShare: 5, referringDomains: 16, correctType: 'Exact match', selectedType: '', isVerified: false },
    ],
  },
};

export function generateSimulatedReport(rawInput: string): BacklinkProfileSnapshot {
  const cleaned = rawInput
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/\/.*$/, '');

  const normalized = cleaned || 'www.elysiumacademy.org';
  if (SIMULATED_DOMAIN_REPORTS[normalized]) {
    return {
      ...SIMULATED_DOMAIN_REPORTS[normalized],
      capturedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      anchors: SIMULATED_DOMAIN_REPORTS[normalized].anchors.map((a) => ({ ...a })),
    };
  }

  // Deterministic hash for any custom practice website entered by the trainee
  let hash = 0;
  for (let i = 0; i < normalized.length; i += 1) {
    hash = (hash * 31 + normalized.charCodeAt(i)) % 9973;
  }

  const brandSlug = normalized
    .replace(/^www\./, '')
    .split('.')[0]
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const authorityScore = 18 + (hash % 39);
  const referringDomains = 32 + (hash % 185);
  const totalBacklinks = referringDomains * (4 + (hash % 6));
  const dofollowPercent = 62 + (hash % 24);

  return {
    domain: normalized,
    authorityScore,
    totalBacklinks,
    referringDomains,
    dofollowPercent,
    capturedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    anchors: [
      {
        id: `custom-1-${hash}`,
        anchorText: brandSlug,
        percentShare: 44,
        referringDomains: Math.max(1, Math.round(referringDomains * 0.44)),
        correctType: 'Branded',
        selectedType: '',
        isVerified: false,
      },
      {
        id: `custom-2-${hash}`,
        anchorText: `www.${normalized.replace(/^www\./, '')}`,
        percentShare: 22,
        referringDomains: Math.max(1, Math.round(referringDomains * 0.22)),
        correctType: 'Naked URL',
        selectedType: '',
        isVerified: false,
      },
      {
        id: `custom-3-${hash}`,
        anchorText: `services and guides by ${brandSlug}`,
        percentShare: 15,
        referringDomains: Math.max(1, Math.round(referringDomains * 0.15)),
        correctType: 'Partial match',
        selectedType: '',
        isVerified: false,
      },
      {
        id: `custom-4-${hash}`,
        anchorText: 'visit website',
        percentShare: 13,
        referringDomains: Math.max(1, Math.round(referringDomains * 0.13)),
        correctType: 'Generic',
        selectedType: '',
        isVerified: false,
      },
      {
        id: `custom-5-${hash}`,
        anchorText: `best ${brandSlug.toLowerCase()} services online`,
        percentShare: 6,
        referringDomains: Math.max(1, Math.round(referringDomains * 0.06)),
        correctType: 'Exact match',
        selectedType: '',
        isVerified: false,
      },
    ],
  };
}

export const OPPORTUNITY_TYPES = [
  {
    type: 'Professional profiles' as const,
    examples: 'LinkedIn, GitHub, Behance, Medium',
    bestFor: 'Individual founders, students, agencies, and trainers establishing brand presence.',
    foundationRole: 'High-trust brand signals & referral clicks from professional networks.',
  },
  {
    type: 'Business listings' as const,
    examples: 'Google Business Profile, Justdial, Sulekha, IndiaMART',
    bestFor: 'Local businesses, institutes, clinics, and service providers.',
    foundationRole: 'Consistent Name, Address, Phone (NAP) citations for local search trust.',
  },
  {
    type: 'Relevant directories' as const,
    examples: 'Industry and education directories',
    bestFor: 'Niche-specific catalogs curated by real editors (e.g., Shiksha, Clutch, EdTech lists).',
    foundationRole: 'Topically relevant discovery and referral traffic.',
  },
  {
    type: 'Institutional pages' as const,
    examples: 'Alumni, department and partner pages',
    bestFor: 'Colleges, incubators, chambers of commerce, and event partners.',
    foundationRole: 'Strong editorial trust that competitors cannot easily replicate.',
  },
  {
    type: 'Content-based links' as const,
    examples: 'Guest articles and expert quotes (next step)',
    bestFor: 'Scaling authority after foundation profiles and listings are complete.',
    foundationRole: 'Primary driver of long-term organic ranking growth.',
  },
];

export const SUBMISSION_PLATFORMS = {
  profiles: [
    { name: 'LinkedIn', urlPrefix: 'https://www.linkedin.com/company/', type: 'Professional profile' as const, instantLive: true },
    { name: 'GitHub', urlPrefix: 'https://github.com/', type: 'Professional profile' as const, instantLive: true },
    { name: 'Behance', urlPrefix: 'https://www.behance.net/', type: 'Professional profile' as const, instantLive: true },
    { name: 'Medium', urlPrefix: 'https://medium.com/@', type: 'Professional profile' as const, instantLive: true },
  ],
  listings: [
    { name: 'Google Business Profile', urlPrefix: 'https://business.google.com/n/', type: 'Business listing' as const, instantLive: false },
    { name: 'Justdial', urlPrefix: 'https://www.justdial.com/Madurai/', type: 'Business listing' as const, instantLive: true },
    { name: 'Sulekha', urlPrefix: 'https://www.sulekha.com/', type: 'Business listing' as const, instantLive: false },
    { name: 'IndiaMART', urlPrefix: 'https://www.indiamart.com/', type: 'Business listing' as const, instantLive: false },
  ],
};

export interface CompetitorNichePreset {
  keyword: string;
  compA: { name: string; domain: string; dr: number; referringDomains: number };
  compB: { name: string; domain: string; dr: number; referringDomains: number };
  candidates: {
    id: string;
    domain: string;
    domainRating: number;
    topic: string;
    linksToCompA: boolean;
    linksToCompB: boolean;
    placement: string;
    isLowQuality: boolean;
    qualityReason: string;
  }[];
}

export const COMPETITOR_PRESETS: CompetitorNichePreset[] = [
  {
    keyword: 'digital marketing course in Madurai',
    compA: { name: 'SouthTech Academy', domain: 'southtechacademy.in', dr: 39, referringDomains: 145 },
    compB: { name: 'Madurai Digital Institute', domain: 'maduraidigital.edu.in', dr: 36, referringDomains: 128 },
    candidates: [
      { id: 'c1', domain: 'shiksha.com', domainRating: 78, topic: 'Indian Education & Course Directory', linksToCompA: true, linksToCompB: true, placement: 'Verified institute course listing', isLowQuality: false, qualityReason: 'High-trust education directory, directly relevant topic, editorial verification.' },
      { id: 'c2', domain: 'collegedunia.com', domainRating: 74, topic: 'College & Training Reviews Portal', linksToCompA: true, linksToCompB: true, placement: 'Course comparison & syllabus page', isLowQuality: false, qualityReason: 'Relevant education audience with genuine student traffic.' },
      { id: 'c3', domain: 'justdial.com', domainRating: 82, topic: 'Local Business Directory (Madurai)', linksToCompA: true, linksToCompB: true, placement: 'Madurai digital marketing category listing', isLowQuality: false, qualityReason: 'Trusted Indian local listing with strong referral visibility.' },
      { id: 'c4', domain: 'tamilnaduedutech.in', domainRating: 41, topic: 'Regional Tech & Career Magazine', linksToCompA: true, linksToCompB: true, placement: 'Editorial feature on regional upskilling', isLowQuality: false, qualityReason: 'Relevant editorial site with contextual links inside useful articles.' },
      { id: 'c5', domain: 'sulekha.com', domainRating: 71, topic: 'Local Service & Coaching Listings', linksToCompA: true, linksToCompB: true, placement: 'Verified training institute profile', isLowQuality: false, qualityReason: 'Legitimate local listing platform with real user inquiries.' },
      { id: 'c6', domain: 'maduraichamber.org', domainRating: 44, topic: 'Regional Business & Industry Chamber', linksToCompA: true, linksToCompB: true, placement: 'Member skill-development partners page', isLowQuality: false, qualityReason: 'High-trust institutional page directly relevant to local businesses.' },
      { id: 'c7', domain: 'free-seo-links-999.xyz', domainRating: 6, topic: 'Unrelated Automated Link Farm', linksToCompA: true, linksToCompB: true, placement: 'Footer list with 400+ random links', isLowQuality: true, qualityReason: 'Fails Relevance, Trust, Placement, and Earned checks (automated link list).' },
      { id: 'c8', domain: 'cheap-articles-directory.info', domainRating: 9, topic: 'Copied / Thin Article Mill', linksToCompA: true, linksToCompB: false, placement: 'Sidebar spam blogroll', isLowQuality: true, qualityReason: 'Thin copied content with keyword-stuffed anchor links.' },
      { id: 'c9', domain: 'urbanpro.com', domainRating: 68, topic: 'Verified Tutors & Training Marketplace', linksToCompA: true, linksToCompB: false, placement: 'Trainer & institute profile page', isLowQuality: false, qualityReason: 'Relevant education marketplace with real student leads.' },
      { id: 'c10', domain: 'linkedin.com', domainRating: 98, topic: 'Professional Network', linksToCompA: false, linksToCompB: true, placement: 'Complete company profile & alumni link', isLowQuality: false, qualityReason: 'Essential foundational professional profile.' },
    ],
  },
  {
    keyword: 'specialty coffee roasters India',
    compA: { name: 'Western Ghats Roastery', domain: 'westernghatscoffee.in', dr: 44, referringDomains: 210 },
    compB: { name: 'Coorg Bean Collective', domain: 'coorgbean.co.in', dr: 41, referringDomains: 184 },
    candidates: [
      { id: 'cf1', domain: 'indiancoffeeforum.in', domainRating: 49, topic: 'Specialty Coffee Enthusiasts Community', linksToCompA: true, linksToCompB: true, placement: 'Curated roasters guide article', isLowQuality: false, qualityReason: 'Highly relevant coffee community with engaged readers.' },
      { id: 'cf2', domain: 'lbb.in', domainRating: 72, topic: 'Local Lifestyle & Food Discovery', linksToCompA: true, linksToCompB: true, placement: 'Editorial roundup of artisanal roasters', isLowQuality: false, qualityReason: 'Trusted lifestyle publication with strong referral traffic.' },
      { id: 'cf3', domain: 'homebaristaindia.com', domainRating: 38, topic: 'Brewing Guides & Equipment Reviews', linksToCompA: true, linksToCompB: true, placement: 'In-content recommendation for pour-over beans', isLowQuality: false, qualityReason: 'Contextual link inside useful brewing tutorials.' },
      { id: 'cf4', domain: 'zomato.com', domainRating: 88, topic: 'Food & Cafe Business Listings', linksToCompA: true, linksToCompB: true, placement: 'Verified roastery cafe listing', isLowQuality: false, qualityReason: 'High-trust local directory with consistent NAP details.' },
      { id: 'cf5', domain: 'culinaryguild.org.in', domainRating: 46, topic: 'Hospitality & Artisanal Food Association', linksToCompA: true, linksToCompB: true, placement: 'Member producer showcase page', isLowQuality: false, qualityReason: 'Institutional partner listing with strong topical trust.' },
      { id: 'cf6', domain: 'auto-submit-dir-fast.biz', domainRating: 5, topic: 'Generic Automated Directory', linksToCompA: true, linksToCompB: true, placement: 'Unmoderated link dump', isLowQuality: true, qualityReason: 'Low-quality automated directory treated as link spam.' },
      { id: 'cf7', domain: 'random-coupon-scraper.net', domainRating: 8, topic: 'Thin Scraped Coupon Pages', linksToCompA: true, linksToCompB: true, placement: 'Auto-generated footer widget', isLowQuality: true, qualityReason: 'Thin copied content with zero real visitors.' },
      { id: 'cf8', domain: 'indiamart.com', domainRating: 84, topic: 'B2B Wholesale & Roaster Directory', linksToCompA: true, linksToCompB: false, placement: 'Verified wholesale supplier listing', isLowQuality: false, qualityReason: 'Legitimate B2B business listing platform.' },
    ],
  },
];

export const KEY_TAKEAWAYS = [
  'Backlinks support discovery, authority and referral traffic.',
  'Quality matters more than quantity.',
  'Relevance decides the best opportunities.',
  'Complete, consistent profiles and listings come first.',
  'Aim for more referring domains and natural anchor text.',
  'Competitors show you the link gap.',
  'A steady 30-day plan beats a one-day burst.',
];

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'q1',
    question: 'Which backlink profile is stronger according to Module 2?',
    options: [
      '10 backlinks from 1 referring domain (sitewide footer)',
      '10 backlinks from 10 different relevant referring domains',
      '100 automated directory links submitted in one afternoon',
      '10 exact-match keyword links from an unrelated blog',
    ],
    correctIndex: 1,
    explanation: 'Unique referring domains carry far more weight than repeated links from a single website.',
  },
  {
    id: 'q2',
    question: 'Which anchor text type should make up the largest share of a natural backlink profile?',
    options: [
      'Exact match (e.g., "digital marketing course in Madurai")',
      'Branded (e.g., "Elysium Academy")',
      'Repeated commercial keywords in footers',
      'Hidden image alt links',
    ],
    correctIndex: 1,
    explanation: 'Branded anchors form the largest natural share, while exact-match anchors should appear rarely.',
  },
  {
    id: 'q3',
    question: 'Which of the following is NOT one of the 5 points in the Link Quality Checklist?',
    options: [
      'Relevance (same or related topic)',
      'Placement (inside useful content vs. footers)',
      'How fast you can buy 500 links at once',
      'How it was earned (earned/listed vs. bought/automated)',
    ],
    correctIndex: 2,
    explanation: 'The 5 quality checks are Relevance, Trust, Placement, Anchor text, and How it was earned. Buying links in bulk fails check #5.',
  },
  {
    id: 'q4',
    question: 'When creating business listings like Google Business Profile and Justdial, what detail must stay identical everywhere?',
    options: [
      'Your exact-match SEO keyword anchor text',
      'Your Name, Address, and Phone number (NAP)',
      'Your competitor’s domain rating',
      'A minimum of 200 directory submissions per day',
    ],
    correctIndex: 1,
    explanation: 'Consistent Name, Address, and Phone (NAP) details across every genuine listing reinforce local search trust.',
  },
  {
    id: 'q5',
    question: 'In Competitor Link-Gap Analysis, which websites are your best first targets?',
    options: [
      'Sites that link to neither competitor and have copied content',
      'Websites that link to both competitors, but not to you (filtered through the 5-point checklist)',
      'Footer link farms with the lowest domain rating',
      'Only your own social media accounts',
    ],
    correctIndex: 1,
    explanation: 'Domains linking to both Competitor A and Competitor B already cover your industry—filtering them with the 5-point checklist reveals high-probability targets.',
  },
];

export const DEFAULT_PLAN_TASKS: PlanWeekTask[] = [
  { id: 'w1-1', week: 1, title: 'Complete LinkedIn or GitHub profile', detail: 'Add full bio, logo, and website URL.', completed: false },
  { id: 'w1-2', week: 1, title: 'Claim Google Business Profile', detail: 'Verify exact Name, Address, and Phone (NAP).', completed: false },
  { id: 'w1-3', week: 1, title: 'Submit 3 additional consistent listings', detail: 'Justdial, Sulekha, IndiaMART, or Medium with identical NAP.', completed: false },
  { id: 'w2-1', week: 2, title: 'Review competitor link-gap targets', detail: 'Select 3 to 5 quality domains linking to both competitors.', completed: false },
  { id: 'w2-2', week: 2, title: 'Filter every target with 5-point checklist', detail: 'Verify relevance, real traffic, placement, and legitimacy.', completed: false },
  { id: 'w2-3', week: 2, title: 'Submit to 3–5 relevant industry directories', detail: 'Log live or pending status in the Backlink Tracker.', completed: false },
  { id: 'w3-1', week: 3, title: 'Publish 1 linkable asset', detail: 'Create a practical guide, checklist, or local case study on your site.', completed: false },
  { id: 'w3-2', week: 3, title: 'Add shareable stats or downloadable template', detail: 'Give bloggers and journalists a clear reason to cite your page.', completed: false },
  { id: 'w4-1', week: 4, title: 'Send 5 personalized outreach messages', detail: 'Contact relevant editors, alumni coordinators, or resource authors.', completed: false },
  { id: 'w4-2', week: 4, title: 'Review and update Backlink Tracker', detail: 'Check live links, anchor distribution, and plan Month 2.', completed: false },
];

export const INITIAL_WORKSHOP_STATE: WorkshopState = {
  participantName: '',
  practiceWebsite: 'www.elysiumacademy.org',
  pollChoice: null,
  activeModule: 'module1',
  exercise1Responses: {},
  profileSnapshot: null,
  brandKit: {
    businessName: 'Elysium Academy',
    websiteUrl: 'https://www.elysiumacademy.org',
    shortBio: 'Career-focused IT, cloud, and digital marketing training institute in Madurai offering hands-on workshops and industry certifications.',
    address: '230, Church Road, Anna Nagar, Madurai 625 020',
    phone: '+91 96777 61442',
    category: 'Education & Training Institute',
  },
  submissions: [],
  competitorKeyword: 'digital marketing course in Madurai',
  competitorOpportunities: [],
  planTasks: DEFAULT_PLAN_TASKS,
  assetDraft: {
    format: 'Checklist',
    title: 'The 2026 Beginner Backlink Quality Checklist for Local Businesses',
    targetAudience: 'Small business owners, students, and junior digital marketers',
    keyHook: 'Includes a printable 5-point link vetting rubric and NAP consistency template.',
  },
  outreachDraft: {
    recipientDomain: 'tamilnaduedutech.in',
    contactName: 'Editorial Team',
    subject: 'Resource suggestion for your Digital Skills in Madurai guide',
    message:
      'Hello Editorial Team,\n\nI enjoyed your recent feature on practical digital skills training in Tamil Nadu. We just published a free, beginner-friendly Backlink Quality Checklist with step-by-step examples for local students and small businesses.\n\nIf you are updating your career resources page this month, I would be glad to share it for your readers.\n\nBest regards,',
    sentCount: 0,
  },
  assessmentAnswers: {},
  assessmentSubmitted: false,
  certificateId: 'EA-SEO-2026-8419',
};
