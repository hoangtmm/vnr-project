export const site = {
  title: 'Organization & Intelligence Operations (Post-war)',
  slogan: 'Safeguarding national gains with discipline and insight',
};

export const nav = [
  { path: '/', label: 'Home' },
  { path: '/story', label: 'Story' },
  { path: '/organization', label: 'Organization' },
  { path: '/case-studies', label: 'Case Studies' },
  { path: '/documents', label: 'Documents' },
  { path: '/about', label: 'About' },
];


export const timeline = [
  { year: '1975–1978', title: 'Security consolidation', desc: 'Build apparatus, stabilize public order.' },
  { year: '1979–1989', title: 'Border defense', desc: 'Regional challenges, standardized counterintelligence.' },
  { year: '1990–2005', title: 'Integration & transition', desc: 'International cooperation, strategic analysis.' },
  { year: '2006–present', title: 'Digital intelligence', desc: 'Cyber defense, cryptography, big-data analytics.' },
];

export const tags = ['Organization', 'Tradecraft', 'Legal', 'Cooperation', 'Cybersecurity'];

export const cards = [
  { id: 'org-model', title: 'Organizational model', excerpt: 'Command structure, bureaus, inter-agency ties.', tags: ['Organization'] },
  { id: 'op-methods', title: 'Operational methods', excerpt: 'Collection–analysis–reporting, counterintelligence, security.', tags: ['Tradecraft'] },
  { id: 'legal', title: 'Legal framework', excerpt: 'Leadership principles, law, ethics.', tags: ['Legal'] },
  { id: 'intl', title: 'International cooperation', excerpt: 'Information sharing mechanisms, treaties.', tags: ['Cooperation'] },
  { id: 'cyber', title: 'Cyber intelligence', excerpt: 'Digital infrastructure defense, SIGINT/OSINT, incident response.', tags: ['Cybersecurity'] },
];

export const objectives = [
  'Safeguard independence, sovereignty, and territorial integrity.',
  'Maintain political stability and public order.',
  'Support policy-making across domestic, foreign, economic and defense affairs.',
  'Prevent, detect and neutralize threats: espionage, sabotage, terrorism, organized crime.',
  'Build a professional, modern intelligence workforce.',
];

export const principles = [
  'Party leadership, unified state management, rule of law.',
  'Secrecy – accuracy – timeliness – effectiveness.',
  'Blend overt/covert methods; prevention first, response precise.',
  'People-centric, rights-respecting within the law.',
  'International cooperation under treaties and domestic law.',
];

export const orgStructure = [
  { title: 'Strategic level', points: ['Set strategy, policy and resource allocation.', 'Risk control and approval of critical operations.'] },
  { title: 'Operational bureaus', points: ['Counterintelligence; foreign intelligence; strategic analysis.', 'Technical tradecraft: SIGINT/IMINT/OSINT; crypto; security.'] },
  { title: 'Support & training', points: ['Logistics, finance, internal justice, ethics.', 'Training, competency standards, regular exercises.'] },
  { title: 'Inter-agency coordination', points: ['Public security, defense, foreign affairs, customs, border guard.', 'Information sharing protocols, campaign coordination.'] },
  { title: 'Oversight & discipline', points: ['Multi-tier internal audit and operational logs.', 'Sanctions for violations; whistleblower protection.'] },
];

export const opsDetails = [
  { title: 'Collection & vetting', bullets: ['Human and technical sources; multi-source corroboration.', 'Classify secrecy and reliability; log activities.'] },
  { title: 'Analysis & warning', bullets: ['Trend modeling and scenarios; risk outlooks.', 'Early warning briefs and policy recommendations.'] },
  { title: 'Counterintelligence & protection', bullets: ['Protect critical assets; detect infiltrations.', 'Sting/flip operations to neutralize networks.'] },
  { title: 'Cyber defense', bullets: ['Protect infrastructure; signal monitoring; incident response.', 'Cryptography, access segmentation, penetration testing.'] },
  { title: 'International cooperation', bullets: ['Bilateral/multilateral channels under treaties.', 'Joint exercises; standardized data formats.'] },
];

export const caseStudies = [
  {
    id: 'cs-border-82',
    year: '1982',
    title: 'Border collection route uncovered',
    context: 'Spike in illicit logistics and transmissions across borders.',
    action: 'Inter-agency tasking; supply-line sting; signal correlation.',
    outcome: 'Neutralized 3 relay points; seized improvised crypto gear.',
    lesson: 'Human–technical fusion and sharing shorten time-to-action.',
    lat: 21.0278,  // Hanoi
    lng: 105.8342,
  },
  {
    id: 'cs-econ-94',
    year: '1994',
    title: 'Securing sensitive economic negotiations',
    context: 'Market-opening talks with leak risks.',
    action: 'Tiered access, signal controls, “canary” documents to validate sources.',
    outcome: 'Leaks prevented; upgraded classification and tracking.',
    lesson: 'Digitization + access governance are crucial in negotiations.',
    lat: 10.7769,  // Ho Chi Minh City
    lng: 106.7009,
  },
  {
    id: 'cs-cyber-17',
    year: '2017',
    title: 'Responding to an APT campaign',
    context: 'Targeted intrusions into government infrastructure.',
    action: 'Segment, hunt IOCs, share indicators via partners.',
    outcome: 'Backdoors removed; supply-chain gaps closed; new baselines adopted.',
    lesson: 'Continuous monitoring + exercises reduce damage.',
    lat: 16.0471,  // Da Nang
    lng: 108.2060,
  },
];


export const figures = [
  { code: 'Officer A', period: '1976–1988', role: 'Counterintelligence lead', contribution: 'Rebuilt source-validation pipeline and reliability scoring.' },
  { code: 'Officer B', period: '1991–2003', role: 'Strategic analyst', contribution: 'Institutionalized early-warning briefs across sectors.' },
  { code: 'Officer C', period: '2008–present', role: 'Cyber defense', contribution: 'Introduced Zero-Trust baseline and threat-hunting program.' },
];

export const resources = [
  { id: 'doc-cycle', title: 'Intelligence analysis cycle', type: 'Process', tags: ['Tradecraft'], summary: 'Collect → vet → analyze → report → feedback.' },
  { id: 'doc-legal', title: 'Legal & ethical principles', type: 'Standard', tags: ['Legal'], summary: 'Rule of law, rights, internal oversight & discipline.' },
  { id: 'doc-ci', title: 'Counterintelligence handbook', type: 'Guide', tags: ['Tradecraft'], summary: 'Detect infiltration, sting, emergency asset protection.' },
  { id: 'doc-cyber', title: 'Agency cyber baseline', type: 'Standard', tags: ['Cybersecurity'], summary: 'Segmentation, key mgmt, signal monitoring, drills.' },
  { id: 'doc-source', title: 'Source handling code', type: 'Code', tags: ['Tradecraft'], summary: 'Identity protection, motive analysis, anti-manipulation.' },
  { id: 'doc-class', title: 'Classification & access control', type: 'Policy', tags: ['Legal'], summary: 'Labels, secrecy periods, access logging, de-classification.' },
  { id: 'doc-interop', title: 'Inter-agency SOP', type: 'Protocol', tags: ['Cooperation'], summary: 'Data standards, secure channels, coordination lines.' },
  { id: 'doc-train', title: 'Training framework', type: 'Program', tags: ['Tradecraft'], summary: 'Core competencies, ethics, modern techniques, drills.' },
  { id: 'doc-brief', title: 'Leader brief template', type: 'Template', tags: ['Tradecraft'], summary: 'Findings–evidence–recommendations; confidence levels.' },
  { id: 'doc-crisis', title: 'Crisis response playbook', type: 'Procedure', tags: ['Cooperation'], summary: 'ICS activation, public info, international liaison.' },
];
