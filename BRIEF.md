# Build prompt — Compl.ai.ent product UI

## Brief

Build the frontend for **Compl.ai.ent**, a multi-jurisdiction regulatory obligation tracker for licensed operators in high-risk EU sectors. Working, clickable React app with realistic mock data. No backend — fake the data layer, but fake it convincingly.

This UI will be demoed live to prospective design partners (Heads of Compliance at licensed gambling operators). It has to look like a tool someone already uses, not a concept.

## The user and their job

A Head of Compliance / MLRO at an operator licensed in five EU markets. Possibly a founder wearing that hat. They are the bottleneck in their org: every "are we covered in Sweden?" question routes through them, and answering it today means emailing outside counsel and waiting weeks for a PDF that's stale on arrival.

They open this tool before a board meeting, before a licence renewal, and the moment a regulator emails them. They are not a dashboard enthusiast. On open they want one thing: **am I covered, and what's moving?**

## What the product does

- Holds a company profile: vertical, jurisdictions, licences, payment methods
- Derives the obligations that apply to that specific profile — not a generic regulation dump
- Every obligation carries a status, an owner, an effective date, and a citation to primary source text
- Continuously monitors EUR-Lex, CJEU and national regulator sources; amendments surface as they land
- Answers ad-hoc questions with structured, sourced synthesis instead of a memo in three weeks
- Low-confidence answers are flagged for human review, never guessed
- Everything is auditable

**Two product truths the interface must express visually, everywhere:**

1. Nothing is asserted without a citation. A claim rendered with no visible source is a bug, not a style choice.
2. The system says "I don't know." Low confidence is a first-class, well-designed state — not an error toast.

## Screens

Build in this order of fidelity. 1–4 fully; 5–8 real but lighter.

1. **Dashboard** — the screen being judged
2. **Obligation register** — filterable table
3. **Obligation detail** — the citation view
4. **Ask** — question in, sourced answer out
5. Change feed
6. Sources
7. Review queue (human-in-the-loop)
8. Company profile (setup + edit)

Audit log can be a stub route.

## Dashboard layout — the spec that matters

**Rule: a compliance officer glances for two seconds and knows their posture.**

Full-width stack of horizontal bands. No floating cards on an empty background, no wide dead gutters, no cards nested inside cards. Density is a feature here — this audience reads spreadsheets all day and reads whitespace as "not much data." Everything below should fit in roughly 1.3 screens at 1440×900, with bands 1 and 2 above the fold.

### Band 1 — Posture strip (~64px)

One line. Operator name · verticals · 5 jurisdictions · 5 licences · "sources synced 14 min ago". Right-aligned: a single count of items needing attention, and the Ask entry point. No greeting, no date widget, no hero number.

### Band 2 — The obligation matrix (~280px)

This is the signature element. A compact grid. Rows = jurisdictions (Malta, Sweden, Netherlands, France, Germany). Columns = obligation domains (AML/CTF · Licensing · Player protection · Marketing · Data & privacy · Payments · Reporting). Each cell is a small status chip: colour + glyph + count. Diagonal-hatched grey = not applicable in that market.

- Hover a cell → popover previewing the obligations behind it
- Click a cell → navigates to the register, pre-filtered to that jurisdiction + domain
- Row edge = per-jurisdiction totals; column edge = per-domain totals
- Corner cell = whole-portfolio roll-up

This grid is the product: the entire compliance surface of a five-market operator in one rectangle. Spend your visual precision here.

### Band 3 — Two columns, 60/40 split

- **Left, "Needs attention"**: max 6 rows, each ~44px, not cards. Row = status glyph · jurisdiction code in mono (MT / SE / NL / FR / DE) · obligation title · deadline · source badge. Sorted by urgency, not alphabetically. Footer link to the full register.
- **Right, "Regulatory changes"**: dated feed of detected amendments. Each entry = detection date · instrument in mono (e.g. `AMLR (EU) 2024/1624 Art. 33`) · one plain-language line on what changed · jurisdictions affected · effective date · count of obligations touched.

### Band 4 — Source health (~110px)

Horizontal row of source pills: EUR-Lex · CJEU · MGA · Spelinspektionen · KSA · ANJ · GGL. Each shows last-sync time and a health dot. If one is stale or failing, say so plainly in the pill — this is a trust surface, not a footer.

### Do not build

Donut or pie charts. A "compliance score out of 100". Sparklines without axes. Generic KPI tiles ("Total obligations: 247") that don't tell anyone what to do. Motivational copy. A fat icon-only sidebar. Gradient headers.

## The other screens

**Obligation register.** Dense table. Columns: status · jurisdiction · domain · obligation · instrument (mono) · effective from · next review · owner · confidence. Persistent filter rail (jurisdiction, domain, status, confidence, changed-since). Filters reflected in the URL. Row click opens detail. Bulk export to CSV/PDF as a visible affordance — these people live in evidence packs.

**Obligation detail.** Two panes. Left: the plain-language obligation statement, what triggers it, applicable deadlines, current status, internal owner and notes. Right, always visible: the sources. Each source = instrument name, article reference, publication date, an excerpt of the actual legal text, and a link out to EUR-Lex or the national regulator. Below that, a confidence indicator with a stated reason ("Two sources agree; national transposition confirmed" / "National guidance not yet published — flagged for review"). At the bottom, the change history for this obligation.

**Ask.** A question field, then a structured answer: a direct summary line, the obligations it touches, and inline citation chips that expand to source text on click. A visible confidence banner. Include at least one canned low-confidence example so the abstention behaviour is demonstrable in the demo — the answer says what it can't determine and routes to review. Recent questions listed in a rail; answers are permanent and linkable.

**Sources.** Table of every monitored source: name, jurisdiction, type, coverage, last sync, sync frequency, status, documents indexed. Honest about coverage gaps.

**Review queue.** Items awaiting human sign-off, with why each was flagged, who it's assigned to, and approve / amend / reject actions.

**Company profile.** Vertical, jurisdictions, licences (number, issuer, expiry), payment methods, headcount. Make it visible that changing this input changes which obligations apply — that's the whole thesis of the product.

## Design system — follow exactly

These tokens already exist in the pitch deck's product mockups. Match them; don't reinvent.

```
--surface     #F6F4EF   cream, primary background
--paper       #FFFFFF   tables, panels
--ink         #171A33   primary text
--ink-muted   #5A5F78   secondary text
--rule        #E2DFD6   hairlines and borders
--accent      #3B5BFD   links, focus, primary actions
--status-red     #C0392B  breach / overdue
--status-amber   #D98A0B  action needed / low confidence
--status-green   #1E7A4C  covered / current
--status-grey    #9AA0B4  not applicable
```

**Type.** Source Serif 4 for headings and obligation statements (this is a document product — it should read like a register, not a SaaS landing page). Inter for UI and body. JetBrains Mono for jurisdiction codes, instrument references, article numbers, dates, IDs, sync timestamps. The mono is doing real semantic work: if it's a citable identifier, it's mono.

**Status rendering.** Colour plus an icon glyph, always — never colour alone. Compliance officers print, export and forward these screens, and some are colour-blind. Red = ●, amber = ▲, green = ✓, N/A = hatched.

**Surface treatment.** Hairline rules and borders over drop shadows. Border-radius 4px maximum. No elevation theatre. Restraint in motion: hover states and a fast filter transition, nothing more.

Every colour and type decision derives from the tokens above.

## Mock data

Make it specific enough to survive a demo. Suggested profile:

- Operator: a mid-sized European gambling operator, licensed in Malta (MGA), Sweden (Spelinspektionen), Netherlands (KSA), France (ANJ), Germany (GGL)
- 180–260 obligations across the five markets, unevenly distributed (Sweden and the Netherlands heavier than Malta — that asymmetry is realistic and makes the matrix interesting)
- Real instrument names: AMLR (EU) 2024/1624, AMLD6, GDPR, DSA, MiCA, Spellagen (2018:1138), Wet kansspelen op afstand, Glücksspielstaatsvertrag 2021, Code de la sécurité intérieure
- Realistic statuses: mostly green, a meaningful band of amber, two or three red, some grey N/A
- 6–10 change-feed entries over the last 60 days, with plausible effective dates
- At least two obligations in a genuine low-confidence state with an honest reason attached

## Tech

React with Tailwind. Client-side routing across the eight screens. Mock data in a single well-structured module so it's obvious the UI is data-driven. Fully responsive down to 768px (the matrix becomes a vertical stack of jurisdiction rows, not a horizontal scroll). Keyboard-navigable, visible focus rings, `prefers-reduced-motion` respected. Loading, empty and error states written in the interface's voice: plain, specific about what happened and what to do next, never apologetic.

## Before you finish, check

- Can I understand the operator's compliance posture in two seconds from the dashboard?
- Is there any assertion on screen without a visible path to its source?
- Is uncertainty rendered as a considered state, or as a failure?
- Does any band waste vertical space without adding information?
- Would a Head of Compliance recognise this as their world, or does it look like a generic analytics template with legal words pasted in?
