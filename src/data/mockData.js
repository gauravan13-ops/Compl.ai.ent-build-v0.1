// ---------------------------------------------------------------------------
// Compl.ai.ent mock data layer.
// The single source every screen reads from. No component invents data.
//
// "Now" is pinned so sync times, deadlines and the change feed are stable
// across reloads and during a live demo.
// ---------------------------------------------------------------------------

export const NOW = new Date('2026-07-22T14:30:00Z')

export const profile = {
  operator: 'Nordica Interactive Ltd',
  verticals: ['Online casino', 'Sports betting'],
  headcount: 240,
  paymentMethods: ['Visa/Mastercard', 'Trustly', 'iDEAL', 'Swish', 'PayPal', 'Bank transfer (SEPA)'],
  licences: [
    { jurisdiction: 'MT', issuer: 'Malta Gaming Authority', number: 'MGA/B2C/394/2017', expiry: '2027-08-01', scope: 'Type 1 & 2 (casino, fixed-odds betting)' },
    { jurisdiction: 'SE', issuer: 'Spelinspektionen', number: '18Li7714', expiry: '2028-12-31', scope: 'Commercial online gambling & betting' },
    { jurisdiction: 'NL', issuer: 'Kansspelautoriteit', number: '1954/01.182.720', expiry: '2026-10-01', scope: 'Games of chance at a distance (Koa)' },
    { jurisdiction: 'FR', issuer: 'Autorité Nationale des Jeux', number: 'ANJ-2021-0043', expiry: '2027-06-30', scope: 'Paris sportifs en ligne' },
    { jurisdiction: 'DE', issuer: 'Gemeinsame Glücksspielbehörde der Länder', number: 'GGL-2023-VS-114', expiry: '2028-06-30', scope: 'Virtuelle Automatenspiele & Sportwetten' },
  ],
}

export const JURISDICTIONS = [
  { code: 'MT', name: 'Malta', regulator: 'MGA' },
  { code: 'SE', name: 'Sweden', regulator: 'Spelinspektionen' },
  { code: 'NL', name: 'Netherlands', regulator: 'KSA' },
  { code: 'FR', name: 'France', regulator: 'ANJ' },
  { code: 'DE', name: 'Germany', regulator: 'GGL' },
]

export const DOMAINS = [
  { key: 'aml', label: 'AML/CTF' },
  { key: 'licensing', label: 'Licensing' },
  { key: 'player', label: 'Player protection' },
  { key: 'marketing', label: 'Marketing' },
  { key: 'privacy', label: 'Data & privacy' },
  { key: 'payments', label: 'Payments' },
  { key: 'reporting', label: 'Reporting' },
]

// Cells where the domain does not apply to this operator in that market.
// Each carries its reason — N/A is asserted, so N/A is cited too.
export const NOT_APPLICABLE = [
  {
    jurisdiction: 'SE', domain: 'payments',
    reason: 'Payment-blocking duties under Spelförordningen (2018:1475) ch. 16 fall on payment service providers, not on licensees.',
  },
  {
    jurisdiction: 'FR', domain: 'payments',
    reason: 'Payment-method obligations under the ANJ sports-betting scope rest with the licensed PSP; the operator does not process payments in France.',
  },
]

export const isNA = (j, d) => NOT_APPLICABLE.some((n) => n.jurisdiction === j && n.domain === d)
export const naReason = (j, d) => NOT_APPLICABLE.find((n) => n.jurisdiction === j && n.domain === d)?.reason

export const OWNERS = ['A. Farrugia (MLRO)', 'M. Lindqvist', 'J. de Vries', 'C. Moreau', 'S. Weber', 'External counsel']

// ---------------------------------------------------------------------------
// Featured obligations — hand-written, fully sourced. These are the ones the
// demo walks through: everything red, the ambers on the dashboard, the
// low-confidence pair, and a few solid greens for the detail view.
// ---------------------------------------------------------------------------

const featured = [
  {
    id: 'SE-MK-014',
    jurisdiction: 'SE', domain: 'marketing',
    title: 'Moderate marketing standard for commercial gambling advertising',
    status: 'red',
    statusNote: 'Ordered to align affiliate creatives by 1 Aug 2026; remediation in progress.',
    confidence: 'high',
    confidenceReason: 'Injunction is addressed to the licensee directly; two sources agree.',
    owner: 'M. Lindqvist',
    effectiveFrom: '2019-01-01', nextReview: '2026-07-29', deadline: '2026-08-01',
    instrument: 'Spellagen (2018:1138) 15 kap. 1 §',
    statement: 'All marketing of licensed gambling directed at Swedish consumers must observe "måttfullhet" (moderation). Following Spelinspektionen\'s injunction of 30 June 2026, affiliate-published creatives using urgency framing must be withdrawn or amended by 1 August 2026.',
    triggers: 'Holding a Swedish licence and directing any marketing, including via affiliates, at Swedish residents.',
    notes: 'Affiliate network notified 2 July. 14 of 23 flagged creatives amended as of 21 July.',
    sources: [
      { instrument: 'Spellagen (2018:1138)', article: '15 kap. 1 §', published: '2018-06-20', url: 'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/spellag-20181138_sfs-2018-1138/', excerpt: 'Vid marknadsföring av spel till konsumenter ska måttfullhet iakttas. [In the marketing of gambling to consumers, moderation shall be observed.]' },
      { instrument: 'Spelinspektionen injunction', article: 'Dnr 26Si1440', published: '2026-06-30', url: 'https://www.spelinspektionen.se/', excerpt: 'The licensee shall ensure that marketing published by affiliates on its behalf observes the moderation requirement… measures shall be completed no later than 1 August 2026.' },
    ],
    history: [
      { date: '2026-06-30', event: 'Status set to breach — Spelinspektionen injunction Dnr 26Si1440 received.' },
      { date: '2026-07-02', event: 'Owner assigned: M. Lindqvist. Affiliate network notified.' },
      { date: '2026-07-21', event: 'Note added: 14/23 creatives amended.' },
    ],
  },
  {
    id: 'NL-RP-006',
    jurisdiction: 'NL', domain: 'reporting',
    title: 'Monthly data-vault (controledatabank) reporting to the Ksa',
    status: 'red',
    statusNote: 'June CDB submission rejected on schema validation; resubmission due 25 Jul 2026.',
    confidence: 'high',
    confidenceReason: 'Rejection notice cites the applicable model; obligation text unambiguous.',
    owner: 'J. de Vries',
    effectiveFrom: '2021-10-01', nextReview: '2026-07-25', deadline: '2026-07-25',
    instrument: 'Besluit kansspelen op afstand art. 4.4',
    statement: 'Licence holders must record prescribed game and player data in the control database (CDB) in the format set by the Kansspelautoriteit. The June 2026 monthly extract failed schema validation and must be corrected and resubmitted by 25 July 2026.',
    triggers: 'Holding a Koa licence and offering games to players registered in the Netherlands.',
    notes: 'Root cause: new bonus type mapped to a retired category code. Fix deployed to staging 20 July.',
    sources: [
      { instrument: 'Besluit kansspelen op afstand', article: 'art. 4.4', published: '2021-03-01', url: 'https://wetten.overheid.nl/BWBR0044767/', excerpt: 'De houder van een vergunning… registreert de gegevens, bedoeld in het eerste lid, in de controledatabank op de door de raad van bestuur vastgestelde wijze.' },
      { instrument: 'Ksa CDB-model v3.2 rejection notice', article: 'ref 2026-018834', published: '2026-07-04', url: 'https://kansspelautoriteit.nl/', excerpt: 'Uw aanlevering over juni 2026 voldoet niet aan het geldende CDB-model… herstelde aanlevering uiterlijk 25 juli 2026.' },
    ],
    history: [
      { date: '2026-07-04', event: 'Status set to breach — CDB June extract rejected (ref 2026-018834).' },
      { date: '2026-07-20', event: 'Note added: category-code fix deployed to staging.' },
    ],
  },
  {
    id: 'DE-PP-009',
    jurisdiction: 'DE', domain: 'player',
    title: 'Connection to OASIS central exclusion system before every game session',
    status: 'red',
    statusNote: 'Intermittent OASIS query failures logged 18–19 Jul; incident report due to GGL.',
    confidence: 'high',
    confidenceReason: 'Statutory duty is explicit; incident-notification duty confirmed in licence conditions.',
    owner: 'S. Weber',
    effectiveFrom: '2021-07-01', nextReview: '2026-07-24', deadline: '2026-07-24',
    instrument: 'GlüStV 2021 § 8c',
    statement: 'Before permitting participation in any game, the operator must query the OASIS exclusion register and refuse excluded players. Outages of 61 and 44 minutes on 18–19 July 2026 require an incident report to the GGL within five working days.',
    triggers: 'Offering virtual slot machine games or sports betting to players located in Germany.',
    notes: 'Sessions during outage windows were blocked (fail-closed). Incident report drafted, in legal review.',
    sources: [
      { instrument: 'Glücksspielstaatsvertrag 2021', article: '§ 8c', published: '2021-07-01', url: 'https://www.gesetze-bayern.de/Content/Document/StVGlueStV2021', excerpt: 'Die Veranstalter… haben sicherzustellen, dass gesperrte Spieler von der Teilnahme… ausgeschlossen sind. Der Abgleich mit der Sperrdatei ist vor jeder Spielteilnahme durchzuführen.' },
      { instrument: 'GGL licence conditions', article: 'Nebenbestimmung 14', published: '2023-06-12', url: 'https://www.gluecksspiel-behoerde.de/', excerpt: 'Störungen des Sperrdatei-Abgleichs sind der Behörde unverzüglich, spätestens binnen fünf Werktagen, anzuzeigen.' },
    ],
    history: [
      { date: '2026-07-19', event: 'Status set to breach-risk — OASIS query failures logged on 18–19 July.' },
      { date: '2026-07-21', event: 'Incident report drafted; owner S. Weber.' },
    ],
  },
  {
    id: 'NL-PP-013',
    jurisdiction: 'NL', domain: 'player',
    title: 'CRUKS check downtime handling and player re-verification',
    status: 'amber',
    statusNote: 'Awaiting Ksa guidance on acceptable downtime handling; flagged for human review.',
    confidence: 'low',
    confidenceReason: 'Ksa guidance on CRUKS downtime handling announced but not yet published. The statutory text does not resolve whether cached checks may bridge short outages. Flagged for review rather than guessed.',
    owner: 'J. de Vries',
    effectiveFrom: '2021-10-01', nextReview: '2026-08-15',
    instrument: 'Wet kansspelen op afstand art. 31m',
    statement: 'Players must be checked against the CRUKS exclusion register at each login and before each game session. How short CRUKS outages must be handled — hard block versus time-limited cached result — is not yet determined by published guidance.',
    triggers: 'Holding a Koa licence; every player login and session start.',
    notes: 'Current behaviour: fail-closed. Review item open pending Ksa publication (expected Q3 2026).',
    sources: [
      { instrument: 'Wet kansspelen op afstand', article: 'art. 31m', published: '2021-04-01', url: 'https://wetten.overheid.nl/BWBR0004927/', excerpt: 'De houder van een vergunning… raadpleegt het register voordat hij een speler tot deelname… toelaat.' },
      { instrument: 'Ksa agenda item', article: 'Beleidsregels verantwoord spelen (aankondiging)', published: '2026-05-28', url: 'https://kansspelautoriteit.nl/', excerpt: 'De Ksa werkt aan nadere regels over de omgang met storingen in de CRUKS-koppeling. Publicatie wordt in het derde kwartaal van 2026 verwacht.' },
    ],
    history: [
      { date: '2026-05-28', event: 'Confidence lowered to low — Ksa announced forthcoming downtime guidance.' },
      { date: '2026-05-29', event: 'Routed to review queue.' },
    ],
  },
  {
    id: 'DE-AML-011',
    jurisdiction: 'DE', domain: 'aml',
    title: 'AMLR alignment of German GwG thresholds for occasional transactions',
    status: 'amber',
    statusNote: 'National transposition timetable unconfirmed; flagged for human review.',
    confidence: 'low',
    confidenceReason: 'AMLR (EU) 2024/1624 applies from 10 July 2027, but Germany has not yet published how GwG § 10 thresholds will be reconciled in the interim. Two plausible readings exist; not asserting either.',
    owner: 'A. Farrugia (MLRO)',
    effectiveFrom: '2027-07-10', nextReview: '2026-09-30',
    instrument: 'AMLR (EU) 2024/1624 Art. 19',
    statement: 'Customer due diligence must be applied to occasional gambling transactions at the AMLR threshold of €2,000, collected in single or linked operations. Whether the stricter existing GwG threshold continues to govern before July 2027 is unresolved pending German implementation guidance.',
    triggers: 'Occasional transactions by non-account customers; threshold review on AMLR application date.',
    notes: 'Tracking BMF publications. Conservative (lower) threshold applied operationally in the interim.',
    sources: [
      { instrument: 'AMLR (EU) 2024/1624', article: 'Art. 19(5)', published: '2024-06-19', url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32024R1624', excerpt: 'Providers of gambling services shall apply customer due diligence… upon the collection of winnings, the wagering of a stake, or both, when carrying out transactions amounting to at least EUR 2 000…' },
      { instrument: 'Geldwäschegesetz (GwG)', article: '§ 10 Abs. 5', published: '2017-06-23', url: 'https://www.gesetze-im-internet.de/gwg_2017/', excerpt: 'Verpflichtete nach § 2 Absatz 1 Nummer 15 haben Sorgfaltspflichten… bei Gewinnen oder Einsätzen eines Spielers in Höhe von 2 000 Euro oder mehr zu erfüllen…' },
    ],
    history: [
      { date: '2026-06-12', event: 'Confidence lowered to low — no German interim guidance located across monitored sources.' },
      { date: '2026-06-12', event: 'Routed to review queue.' },
    ],
  },
  {
    id: 'SE-PP-002',
    jurisdiction: 'SE', domain: 'player',
    title: 'Mandatory deposit limits and limit-change cooling periods',
    status: 'amber',
    statusNote: 'SIFS 2026:1 tightens prompt requirements from 1 Sep 2026; implementation scheduled.',
    confidence: 'high',
    confidenceReason: 'Regulation text final and published; effective date confirmed by Spelinspektionen.',
    owner: 'M. Lindqvist',
    effectiveFrom: '2019-01-01', nextReview: '2026-08-20', deadline: '2026-09-01',
    instrument: 'Spelförordningen (2018:1475) 14 kap.',
    statement: 'Players must set deposit limits before first play. Under SIFS 2026:1, from 1 September 2026 limit-increase prompts must include the player\'s rolling 12-month net loss, displayed before confirmation.',
    triggers: 'Registration of any player resident in Sweden; any limit-increase request.',
    notes: 'Product ticket NORD-4821 scheduled for the 26 Aug release.',
    sources: [
      { instrument: 'Spelförordningen (2018:1475)', article: '14 kap. 5 §', published: '2018-11-29', url: 'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/spelforordning-20181475_sfs-2018-1475/', excerpt: 'En licenshavare ska ge en spelare möjlighet att ange en övre gräns för sina insättningar…' },
      { instrument: 'SIFS 2026:1', article: '4 §', published: '2026-06-05', url: 'https://www.spelinspektionen.se/', excerpt: 'Vid en begäran om höjd insättningsgräns ska licenshavaren, innan höjningen bekräftas, visa spelarens nettoförlust under de senaste tolv månaderna.' },
    ],
    history: [
      { date: '2026-06-05', event: 'Amendment detected: SIFS 2026:1 published, effective 1 Sep 2026.' },
      { date: '2026-06-09', event: 'Status set to action-needed; product ticket opened.' },
    ],
  },
  {
    id: 'NL-MK-004',
    jurisdiction: 'NL', domain: 'marketing',
    title: 'Ban on untargeted advertising for online games of chance',
    status: 'green',
    confidence: 'high',
    confidenceReason: 'Decree in force since 1 July 2023; scope confirmed by Ksa enforcement practice.',
    owner: 'J. de Vries',
    effectiveFrom: '2023-07-01', nextReview: '2026-10-01',
    instrument: 'Besluit ongerichte reclame kansspelen op afstand',
    statement: 'Untargeted advertising for online games of chance — TV, radio, out-of-home and open web — is prohibited. Permitted targeted channels require age and self-exclusion filtering and demonstrable exclusion of 18–24 year olds.',
    triggers: 'Any advertising directed at the Dutch market.',
    notes: 'All NL campaigns run through the consent-gated CRM channel only.',
    sources: [
      { instrument: 'Besluit ongerichte reclame kansspelen op afstand', article: 'art. 2', published: '2023-04-26', url: 'https://wetten.overheid.nl/BWBR0047902/', excerpt: 'Het is verboden ongerichte wervings- en reclameactiviteiten te ontplooien voor kansspelen op afstand.' },
    ],
    history: [
      { date: '2023-07-01', event: 'Obligation derived from profile: NL licence + marketing activity.' },
    ],
  },
  {
    id: 'MT-AML-003',
    jurisdiction: 'MT', domain: 'aml',
    title: 'Risk-based customer due diligence under PMLFTR',
    status: 'green',
    confidence: 'high',
    confidenceReason: 'FIAU Implementing Procedures Part II current; no pending amendments detected.',
    owner: 'A. Farrugia (MLRO)',
    effectiveFrom: '2018-01-01', nextReview: '2026-12-01',
    instrument: 'PMLFTR (S.L. 373.01) reg. 7',
    statement: 'Apply customer due diligence measures on a risk-sensitive basis, including identification and verification before the establishment of a business relationship, with enhanced measures for high-risk situations per the FIAU Implementing Procedures.',
    triggers: 'Establishment of any business relationship; occasional transactions of €2,000 or more.',
    notes: null,
    sources: [
      { instrument: 'PMLFTR (S.L. 373.01)', article: 'reg. 7(1)', published: '2018-01-01', url: 'https://legislation.mt/eli/sl/373.1/', excerpt: 'Subject persons shall apply customer due diligence measures… when establishing a business relationship; when carrying out an occasional transaction amounting to two thousand euro (€2,000) or more…' },
      { instrument: 'FIAU Implementing Procedures', article: 'Part II — Remote Gaming', published: '2023-03-15', url: 'https://fiaumalta.org/', excerpt: 'Licensees shall determine the extent of CDD measures on a risk-sensitive basis, having regard to the player risk profile…' },
    ],
    history: [
      { date: '2026-04-02', event: 'Annual review completed; status confirmed current.' },
    ],
  },
  {
    id: 'FR-LI-001',
    jurisdiction: 'FR', domain: 'licensing',
    title: 'Annual certification of gaming software by ANJ-approved body',
    status: 'amber',
    statusNote: 'Certification audit booked 12 Aug 2026; evidence pack in preparation.',
    confidence: 'high',
    confidenceReason: 'Certification cycle and deadline stated in ANJ decision; single unambiguous source.',
    owner: 'C. Moreau',
    effectiveFrom: '2021-06-30', nextReview: '2026-08-12', deadline: '2026-09-15',
    instrument: 'Code de la sécurité intérieure art. L. 322-6',
    statement: 'The sports-betting platform and odds engine must be re-certified annually by an ANJ-approved certification body; the 2026 certificate must be filed with the ANJ by 15 September 2026.',
    triggers: 'Holding an ANJ licence; annual cycle from initial certification date.',
    notes: 'Auditor: eCOGRA. Slot confirmed 12 Aug.',
    sources: [
      { instrument: 'Code de la sécurité intérieure', article: 'art. L. 322-6', published: '2012-03-01', url: 'https://www.legifrance.gouv.fr/codes/id/LEGISCTA000025506305/', excerpt: 'Les opérateurs… font certifier chaque année la conformité de leur offre par un organisme indépendant agréé…' },
    ],
    history: [
      { date: '2026-06-20', event: 'Status set to action-needed — certification window opened.' },
    ],
  },
  {
    id: 'SE-AML-001',
    jurisdiction: 'SE', domain: 'aml',
    title: 'Suspicious activity reporting to Finanspolisen without delay',
    status: 'green',
    confidence: 'high',
    confidenceReason: 'Statutory duty stable; goAML filing channel operational and tested monthly.',
    owner: 'A. Farrugia (MLRO)',
    effectiveFrom: '2019-01-01', nextReview: '2026-11-15',
    instrument: 'Penningtvättslagen (2017:630) 4 kap. 3 §',
    statement: 'Report suspicious transactions and activity to the Financial Intelligence Unit (Finanspolisen) without delay via goAML, and refrain from tipping off the customer concerned.',
    triggers: 'Any transaction or pattern giving reasonable grounds to suspect money laundering or terrorist financing.',
    notes: null,
    sources: [
      { instrument: 'Lag (2017:630) om åtgärder mot penningtvätt', article: '4 kap. 3 §', published: '2017-06-22', url: 'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-2017630-om-atgarder-mot-penningtvatt-och_sfs-2017-630/', excerpt: 'Om en verksamhetsutövare har skälig grund att misstänka penningtvätt… ska uppgifter om alla omständigheter som kan tyda på detta utan dröjsmål rapporteras till Polismyndigheten.' },
    ],
    history: [
      { date: '2026-03-10', event: 'Annual review completed; status confirmed current.' },
    ],
  },
]

// ---------------------------------------------------------------------------
// Generated obligations — deterministic filler behind the featured set.
// Counts per cell are hand-tuned: SE and NL heavier than MT (see BRIEF.md).
// ---------------------------------------------------------------------------

function mulberry32(seed) {
  let a = seed
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// jurisdiction -> domain -> target obligation count (featured included)
const CELL_COUNTS = {
  MT: { aml: 7, licensing: 5, player: 4, marketing: 4, privacy: 5, payments: 3, reporting: 4 },
  SE: { aml: 10, licensing: 6, player: 12, marketing: 9, privacy: 6, payments: 0, reporting: 9 },
  NL: { aml: 9, licensing: 7, player: 11, marketing: 10, privacy: 5, payments: 4, reporting: 8 },
  FR: { aml: 7, licensing: 6, player: 5, marketing: 7, privacy: 5, payments: 0, reporting: 6 },
  DE: { aml: 8, licensing: 6, player: 10, marketing: 7, privacy: 5, payments: 4, reporting: 6 },
}

const INSTRUMENTS = {
  MT: {
    aml: ['PMLFTR (S.L. 373.01)', 'FIAU Implementing Procedures Part II', 'AMLD6 (EU) 2024/1640'],
    licensing: ['Gaming Act (Cap. 583)', 'Gaming Authorisations Regulations (S.L. 583.05)'],
    player: ['MGA Player Protection Directive (DG3)', 'Gaming Player Protection Regulations (S.L. 583.09)'],
    marketing: ['Gaming Commercial Communications Regulations (S.L. 583.10)'],
    privacy: ['GDPR (EU) 2016/679', 'Data Protection Act (Cap. 586)'],
    payments: ['Gaming Authorisations Regulations (S.L. 583.05)', 'PSD2 (EU) 2015/2366'],
    reporting: ['MGA Directive 4 of 2018', 'Gaming Act (Cap. 583)'],
  },
  SE: {
    aml: ['Penningtvättslagen (2017:630)', 'AMLR (EU) 2024/1624', 'SIFS 2019:2'],
    licensing: ['Spellagen (2018:1138)', 'Spelförordningen (2018:1475)'],
    player: ['Spellagen (2018:1138) 14 kap.', 'SIFS 2019:3', 'SIFS 2026:1'],
    marketing: ['Spellagen (2018:1138) 15 kap.', 'Marknadsföringslagen (2008:486)'],
    privacy: ['GDPR (EU) 2016/679', 'IMY föreskrifter'],
    payments: [],
    reporting: ['SIFS 2019:1', 'Spelinspektionen föreskrifter'],
  },
  NL: {
    aml: ['Wwft', 'AMLR (EU) 2024/1624', 'Sanctiewet 1977'],
    licensing: ['Wet kansspelen op afstand', 'Besluit kansspelen op afstand'],
    player: ['Wet kansspelen op afstand art. 31', 'Besluit werving, reclame en verslavingspreventie', 'Ksa Beleidsregels verantwoord spelen'],
    marketing: ['Besluit ongerichte reclame kansspelen op afstand', 'Besluit werving, reclame en verslavingspreventie'],
    privacy: ['GDPR (EU) 2016/679', 'Uitvoeringswet AVG'],
    payments: ['Wwft art. 4', 'Besluit kansspelen op afstand art. 4.33'],
    reporting: ['Besluit kansspelen op afstand art. 4.4', 'Ksa CDB-model v3.2'],
  },
  FR: {
    aml: ['Code monétaire et financier art. L. 561', 'AMLR (EU) 2024/1624'],
    licensing: ['Code de la sécurité intérieure', 'Loi n° 2010-476'],
    player: ['Code de la sécurité intérieure art. L. 320-3', 'Décret n° 2010-518'],
    marketing: ['Loi n° 2010-476 art. 7', 'ANJ lignes directrices communications commerciales'],
    privacy: ['GDPR (EU) 2016/679', 'Loi Informatique et Libertés'],
    payments: [],
    reporting: ['ANJ décision n° 2020-071', 'Arrêté du 8 juin 2010'],
  },
  DE: {
    aml: ['Geldwäschegesetz (GwG)', 'AMLR (EU) 2024/1624'],
    licensing: ['GlüStV 2021 § 4', 'GGL Nebenbestimmungen'],
    player: ['GlüStV 2021 § 6', 'GlüStV 2021 § 8', 'LUGAS-Anbindungsregeln'],
    marketing: ['GlüStV 2021 § 5', 'GGL Werberichtlinie'],
    privacy: ['GDPR (EU) 2016/679', 'BDSG'],
    payments: ['GlüStV 2021 § 4 Abs. 4', 'ZAG'],
    reporting: ['GlüStV 2021 § 9', 'GGL Berichtspflichten'],
  },
}

const TITLE_TEMPLATES = {
  aml: [
    'Enhanced due diligence for high-risk customer relationships',
    'Ongoing monitoring of business relationships and transaction patterns',
    'Politically exposed person screening at onboarding and periodically',
    'Sanctions list screening before payout and at list updates',
    'Source of funds checks at risk-based thresholds',
    'AML risk assessment — annual update and board approval',
    'Record-keeping of CDD documentation for five years',
    'Appointment and registration of the money laundering reporting officer',
    'Staff AML training programme and attestation records',
    'Group-wide AML policy alignment for cross-border operations',
  ],
  licensing: [
    'Notification of qualifying shareholder changes to the regulator',
    'Key function holder fit-and-proper notifications',
    'Material change notification before deploying new game types',
    'Annual licence fee payment and return filing',
    'Maintenance of approved terms and conditions on file with the regulator',
    'Outsourcing arrangements — prior notification and register',
    'Technical infrastructure location and access requirements',
  ],
  player: [
    'Self-exclusion register integration and enforcement',
    'Age verification before first deposit',
    'Duty of care — detection and intervention on at-risk play',
    'Session reality checks at prescribed intervals',
    'Player-set loss and wager limits',
    'Responsible gambling messaging placement requirements',
    'Underage access prevention controls and testing',
    'Cooling-off and time-out facilities',
    'Problem gambling helpline display requirements',
    'Intervention log and escalation procedure for duty-of-care cases',
    'Bonus restrictions for at-risk and self-excluded players',
    'Automated at-risk behaviour flagging thresholds',
  ],
  marketing: [
    'Prohibition on directing marketing at self-excluded players',
    'Age-gating of all commercial communications',
    'Bonus offer terms — prominence and completeness requirements',
    'Affiliate marketing compliance monitoring programme',
    'Sponsorship restrictions and permitted formats',
    'Pre-approval workflow for new campaign creatives',
    'Restrictions on marketing channels and time windows',
    'Prohibition of misleading claims about winning chances',
    'Direct marketing consent capture and withdrawal handling',
    'Influencer marketing restrictions and disclosure duties',
  ],
  privacy: [
    'Lawful basis mapping for player profiling and risk scoring',
    'Data protection impact assessment for behavioural monitoring',
    'Data retention schedule aligned to regulatory minimums',
    'Data subject access request handling within statutory deadline',
    'Processor agreements with platform and payment providers',
    'Breach notification readiness — 72-hour procedure',
  ],
  payments: [
    'Payment method due diligence and prohibited instrument controls',
    'Closed-loop payout requirement — refunds to originating method',
    'Deposit source consistency checks with registered identity',
    'Chargeback and fraud monitoring thresholds',
  ],
  reporting: [
    'Periodic regulatory return — gaming revenue and player metrics',
    'Incident reporting to the regulator within prescribed deadlines',
    'Annual compliance audit submission',
    'Financial statements filing with licence authority',
    'Key event notifications within statutory windows',
    'Technical fault and downtime reporting',
    'Complaints-handling report and statistics submission',
    'Match-fixing suspicious betting pattern reports',
    'Safer gambling metrics reporting',
  ],
}

const DOMAIN_CODE = { aml: 'AML', licensing: 'LI', player: 'PP', marketing: 'MK', privacy: 'DP', payments: 'PY', reporting: 'RP' }

function buildGenerated() {
  const rand = mulberry32(20260722)
  const out = []
  for (const j of JURISDICTIONS) {
    for (const d of DOMAINS) {
      if (isNA(j.code, d.key)) continue
      const target = CELL_COUNTS[j.code][d.key]
      const already = featured.filter((o) => o.jurisdiction === j.code && o.domain === d.key)
      const need = target - already.length
      const titles = TITLE_TEMPLATES[d.key]
      const instruments = INSTRUMENTS[j.code][d.key]
      for (let i = 0; i < need; i++) {
        const title = titles[i % titles.length] + (i >= titles.length ? ` — ${j.name} specifics` : '')
        const instrument = instruments[Math.floor(rand() * instruments.length)]
        const r = rand()
        // mostly green, a meaningful band of amber; reds are hand-written only
        const status = r < 0.82 ? 'green' : 'amber'
        const conf = rand()
        const confidence = conf < 0.8 ? 'high' : 'medium'
        const effYear = 2018 + Math.floor(rand() * 7)
        const effMonth = 1 + Math.floor(rand() * 12)
        const revMonth = 8 + Math.floor(rand() * 5) // Aug–Dec 2026
        const id = `${j.code}-${DOMAIN_CODE[d.key]}-${String(100 + already.length + i + 1).slice(1)}`
        out.push({
          id,
          jurisdiction: j.code,
          domain: d.key,
          title,
          status,
          statusNote: status === 'amber' ? 'Periodic review due; evidence refresh scheduled.' : undefined,
          confidence,
          confidenceReason:
            confidence === 'high'
              ? 'Primary source current; no pending amendments detected.'
              : 'Primary source current; awaiting confirmation of updated regulator guidance.',
          owner: OWNERS[Math.floor(rand() * OWNERS.length)],
          effectiveFrom: `${effYear}-${String(effMonth).padStart(2, '0')}-01`,
          nextReview: `2026-${String(revMonth).padStart(2, '0')}-${String(1 + Math.floor(rand() * 27)).padStart(2, '0')}`,
          instrument,
          statement: `${title}, as required under ${instrument} for operations in ${j.name}.`,
          triggers: `Holding the ${j.name} licence and offering services in scope of ${instrument}.`,
          notes: null,
          sources: [
            {
              instrument,
              article: 'see instrument',
              published: `${effYear}-01-01`,
              url: 'https://eur-lex.europa.eu/',
              excerpt: 'Full source text indexed. Open the source record for the authoritative excerpt and consolidated version.',
            },
          ],
          history: [{ date: `${effYear}-${String(effMonth).padStart(2, '0')}-01`, event: 'Obligation derived from company profile.' }],
        })
      }
    }
  }
  return out
}

export const obligations = [...featured, ...buildGenerated()]

export const getObligation = (id) => obligations.find((o) => o.id === id)

// ---------------------------------------------------------------------------
// Matrix + dashboard selectors
// ---------------------------------------------------------------------------

export function matrixCell(j, d) {
  if (isNA(j, d)) return { na: true, reason: naReason(j, d) }
  const items = obligations.filter((o) => o.jurisdiction === j && o.domain === d)
  const count = (s) => items.filter((o) => o.status === s).length
  return {
    na: false,
    total: items.length,
    red: count('red'),
    amber: count('amber'),
    green: count('green'),
    // worst status wins the cell colour
    worst: count('red') ? 'red' : count('amber') ? 'amber' : 'green',
    items,
  }
}

export function rollup(items) {
  const count = (s) => items.filter((o) => o.status === s).length
  return { total: items.length, red: count('red'), amber: count('amber'), green: count('green') }
}

export const jurisdictionRollup = (j) => rollup(obligations.filter((o) => o.jurisdiction === j))
export const domainRollup = (d) => rollup(obligations.filter((o) => o.domain === d))
export const portfolioRollup = () => rollup(obligations)

export function needsAttention(limit = 6) {
  const urgency = { red: 0, amber: 1 }
  return obligations
    .filter((o) => o.status !== 'green')
    .sort((a, b) => {
      if (urgency[a.status] !== urgency[b.status]) return urgency[a.status] - urgency[b.status]
      const da = a.deadline || a.nextReview || '9999'
      const db = b.deadline || b.nextReview || '9999'
      return da.localeCompare(db)
    })
    .slice(0, limit)
}

export const attentionCount = () => obligations.filter((o) => o.status !== 'green').length

// ---------------------------------------------------------------------------
// Change feed — detected amendments over the last 60 days
// ---------------------------------------------------------------------------

export const changeFeed = [
  {
    id: 'CH-026', detected: '2026-07-14',
    instrument: 'AMLR (EU) 2024/1624 Art. 33',
    summary: 'EBA published final RTS on customer due diligence data points; adds two verification fields for remote onboarding.',
    jurisdictions: ['MT', 'SE', 'NL', 'FR', 'DE'], effective: '2027-07-10', obligationsTouched: 14,
  },
  {
    id: 'CH-025', detected: '2026-07-09',
    instrument: 'GGL Werberichtlinie §11',
    summary: 'Updated guidance restricts streamer and influencer promotion of virtual slots; written disclosure duties extended.',
    jurisdictions: ['DE'], effective: '2026-10-01', obligationsTouched: 3,
  },
  {
    id: 'CH-024', detected: '2026-07-01',
    instrument: 'Ksa Beleidsregels verantwoord spelen',
    summary: 'Consultation closed on duty-of-care intervention timing; final rules expected Q3. No action required yet.',
    jurisdictions: ['NL'], effective: null, obligationsTouched: 6,
  },
  {
    id: 'CH-023', detected: '2026-06-24',
    instrument: 'Spellagen (2018:1138) 15 kap.',
    summary: 'Government bill proposes extending the moderation requirement explicitly to affiliate-published content.',
    jurisdictions: ['SE'], effective: '2027-01-01', obligationsTouched: 4,
  },
  {
    id: 'CH-022', detected: '2026-06-17',
    instrument: 'DSA (EU) 2022/2065 Art. 26',
    summary: 'Commission guidance clarifies ad-repository duties for gambling advertisers on very large platforms.',
    jurisdictions: ['MT', 'SE', 'NL', 'FR', 'DE'], effective: '2026-08-15', obligationsTouched: 5,
  },
  {
    id: 'CH-021', detected: '2026-06-05',
    instrument: 'SIFS 2026:1',
    summary: 'New Spelinspektionen regulation: deposit-limit increase prompts must display rolling 12-month net loss.',
    jurisdictions: ['SE'], effective: '2026-09-01', obligationsTouched: 2,
  },
  {
    id: 'CH-020', detected: '2026-06-02',
    instrument: 'ANJ décision n° 2026-034',
    summary: 'Annual certification scope extended to cover odds-feed integrity controls from the 2026 cycle.',
    jurisdictions: ['FR'], effective: '2026-09-15', obligationsTouched: 2,
  },
  {
    id: 'CH-019', detected: '2026-05-28',
    instrument: 'Wet kansspelen op afstand art. 31m',
    summary: 'Ksa announced forthcoming rules on CRUKS outage handling; publication expected Q3 2026.',
    jurisdictions: ['NL'], effective: null, obligationsTouched: 2,
  },
]

// ---------------------------------------------------------------------------
// Monitored sources — the trust surface. One is honestly degraded.
// ---------------------------------------------------------------------------

export const sources = [
  { id: 'eurlex', name: 'EUR-Lex', jurisdiction: 'EU', type: 'Official Journal & consolidated law', coverage: 'Regulations, directives, RTS/ITS in force and in pipeline', lastSync: '2026-07-22T14:16:00Z', frequency: 'Every 30 min', status: 'ok', documents: 4182 },
  { id: 'cjeu', name: 'CJEU', jurisdiction: 'EU', type: 'Case law', coverage: 'Judgments and AG opinions touching gambling, AML, data protection', lastSync: '2026-07-22T13:45:00Z', frequency: 'Hourly', status: 'ok', documents: 618 },
  { id: 'mga', name: 'MGA', jurisdiction: 'MT', type: 'National regulator', coverage: 'Directives, guidance, enforcement notices', lastSync: '2026-07-22T14:02:00Z', frequency: 'Hourly', status: 'ok', documents: 347 },
  { id: 'spel', name: 'Spelinspektionen', jurisdiction: 'SE', type: 'National regulator', coverage: 'SIFS regulations, decisions, injunctions', lastSync: '2026-07-22T14:11:00Z', frequency: 'Hourly', status: 'ok', documents: 291 },
  { id: 'ksa', name: 'KSA', jurisdiction: 'NL', type: 'National regulator', coverage: 'Beleidsregels, CDB models, sanction decisions', lastSync: '2026-07-22T13:58:00Z', frequency: 'Hourly', status: 'ok', documents: 402 },
  { id: 'anj', name: 'ANJ', jurisdiction: 'FR', type: 'National regulator', coverage: 'Décisions, lignes directrices, certification requirements', lastSync: '2026-07-19T09:20:00Z', frequency: 'Hourly', status: 'degraded', statusDetail: 'Site structure changed 19 Jul; parser update in progress. Content may be up to 3 days stale.', documents: 188 },
  { id: 'ggl', name: 'GGL', jurisdiction: 'DE', type: 'National regulator', coverage: 'Nebenbestimmungen, Werberichtlinie, technical circulars', lastSync: '2026-07-22T13:30:00Z', frequency: 'Hourly', status: 'ok', documents: 224 },
]

export function lastSyncMinutes() {
  const newest = Math.max(...sources.map((s) => new Date(s.lastSync).getTime()))
  return Math.round((NOW.getTime() - newest) / 60000)
}

export function timeAgo(iso) {
  const mins = Math.round((NOW.getTime() - new Date(iso).getTime()) / 60000)
  if (mins < 60) return `${mins} min ago`
  const hours = Math.round(mins / 60)
  if (hours < 48) return `${hours} h ago`
  return `${Math.round(hours / 24)} d ago`
}

// ---------------------------------------------------------------------------
// Review queue — human-in-the-loop
// ---------------------------------------------------------------------------

export const reviewQueue = [
  {
    id: 'RQ-31', obligationId: 'NL-PP-013', opened: '2026-05-29', assignee: 'J. de Vries',
    reason: 'Low confidence: Ksa guidance on CRUKS downtime handling announced but not published. System will not assert an interpretation.',
  },
  {
    id: 'RQ-32', obligationId: 'DE-AML-011', opened: '2026-06-12', assignee: 'A. Farrugia (MLRO)',
    reason: 'Low confidence: interim relationship between AMLR Art. 19 threshold and GwG § 10 unresolved; no German implementation guidance located.',
  },
  {
    id: 'RQ-33', obligationId: 'SE-MK-014', opened: '2026-07-01', assignee: 'External counsel',
    reason: 'Human sign-off requested: response to Spelinspektionen injunction Dnr 26Si1440 before filing.',
  },
  {
    id: 'RQ-34', obligationId: null, opened: '2026-07-15', assignee: 'A. Farrugia (MLRO)',
    reason: 'New instrument classification: EBA RTS under AMLR Art. 33 — confirm which derived obligations apply to remote onboarding flow.',
    question: 'Does the two-field verification extension apply to existing verified players or only new registrations?',
  },
]

// ---------------------------------------------------------------------------
// Ask — canned questions and answers. One is deliberately low-confidence to
// demonstrate abstention. Answers are permanent and linkable by id.
// ---------------------------------------------------------------------------

export const askExamples = [
  {
    id: 'Q-118',
    question: 'Are we covered for the new AMLR due diligence requirements in Sweden?',
    asked: '2026-07-21',
    confidence: 'high',
    summary: 'Yes — current Swedish CDD obligations are satisfied, and the AMLR changes that apply from 10 July 2027 are tracked with owners assigned.',
    detail: 'AMLR (EU) 2024/1624 applies directly from 10 July 2027 and will sit alongside Penningtvättslagen (2017:630). Your current controls satisfy the Swedish regime in force today. Two derived obligations change on the AMLR application date: the €2,000 occasional-transaction threshold basis (Art. 19(5)) and extended CDD data points from the EBA RTS detected on 14 July 2026.',
    obligationIds: ['SE-AML-001', 'DE-AML-011'],
    citations: [
      { instrument: 'AMLR (EU) 2024/1624', article: 'Art. 19(5)', excerpt: 'Providers of gambling services shall apply customer due diligence… when carrying out transactions amounting to at least EUR 2 000…' },
      { instrument: 'Penningtvättslagen (2017:630)', article: '3 kap.', excerpt: 'Kundkännedom ska uppnås innan en affärsförbindelse etableras…' },
    ],
  },
  {
    id: 'Q-121',
    question: 'Can we launch live-dealer blackjack tables in Germany?',
    asked: '2026-07-22',
    confidence: 'low',
    summary: 'Cannot be determined from monitored sources — online table games are licensed at Länder level, outside the federal GGL permit. Routed to review.',
    detail: 'Your GGL licence covers virtual slot machine games and sports betting under GlüStV 2021 § 4. Online table games (including live-dealer blackjack) are not covered by the federal permit: § 22c leaves them to individual Länder, and only some have enacted enabling rules. The monitored sources do not contain a current, consolidated position for each Land. This answer will not guess. The question has been routed to the review queue with a recommendation to obtain Länder-level advice before any launch decision.',
    reviewId: 'RQ-34',
    obligationIds: ['DE-PP-009'],
    citations: [
      { instrument: 'GlüStV 2021', article: '§ 22c', excerpt: 'Die Länder können… die Veranstaltung von Online-Casinospielen… regeln.' },
      { instrument: 'GGL licence GGL-2023-VS-114', article: 'scope', excerpt: 'Erlaubnis für die Veranstaltung virtueller Automatenspiele und Sportwetten.' },
    ],
  },
  {
    id: 'Q-116',
    question: 'What bonus-offer restrictions apply in the Netherlands right now?',
    asked: '2026-07-18',
    confidence: 'high',
    summary: 'Bonuses may not target 18–24 year olds or players showing risk signals; all offer terms must be complete and prominent at the point of offer.',
    detail: 'Under the Besluit werving, reclame en verslavingspreventie, bonus offers are a form of recruitment activity: they are prohibited for young adults (18–24), for players with active risk-intervention flags, and for self-excluded players. Offer terms — wagering requirements, expiry, game weighting — must be shown in full before acceptance.',
    obligationIds: ['NL-MK-004'],
    citations: [
      { instrument: 'Besluit werving, reclame en verslavingspreventie', article: 'art. 2 lid 4', excerpt: 'Wervings- en reclameactiviteiten worden niet gericht op… personen in de leeftijdscategorie tussen 18 en 24 jaar.' },
    ],
  },
]

export const getAsk = (id) => askExamples.find((q) => q.id === id)
