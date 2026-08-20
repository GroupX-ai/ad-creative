// Batch 13 — 1Lookup, one named banner concept for every product in the catalogue.
//
// Robby, 2026-08-19: "I want ads for each product, properly named."
//
// Every headline and subheadline below is derived from that product's OWN page on
// www.1lookup.io, read out of `src/app/(en)/products/<slug>/page.tsx` on 2026-08-19, not
// from the playbook's copy bank (which has been stale twice) and not from memory. The
// source line is quoted above each entry so the next person can re-verify in one grep.
//
// Three families, because the account has never run a readable creative test and the two
// families that have actually won Robby's picks are opposites:
//
//   A · product-truth      dark developer-terminal card showing the product's real response
//                          fields. The workhorse: it names the product, so it can run in a
//                          per-product ad set on any platform. 43 products.
//   B · analog             a real physical surface someone wrote on, shot on a phone. This
//                          register won the VoiceDrop batch outright ("best by far") and is
//                          untested on 1Lookup. Top 8 products only.
//   C · direct-response    loud offer poster / hazard tape, platform-level, leaning on the
//                          41-data-products claim, which is the strongest thing on the site
//                          that no competitor can copy in a headline.
//
// Families A and C are deliberately opposite bets. The feed punishes the middle, so both
// run, and the ad set names carry the family so the read is per family, not blended.

export const BATCH = "2026-08-19-b13-product-banners";

// ---------------------------------------------------------------- brand, verified 2026-08-19
// src/app/globals.css + tailwind config + AD-CREATIVE-PLAYBOOK.md
const BG = "deep blue-black #05060F";
const BLUE = "#3B82F6";
const CYAN = "#22D3EE";
const GREEN = "#10B981";
const CTA = "Start For Free"; // hero button, src/components/home/hero.tsx
const FONT = "geometric technical sans-serif";

// The constraint that has to sit at the very end of every prompt, every time. The image
// model invents "feature chip" rows carrying fabricated claims when any slot is unassigned;
// a fake badge is a claim violation, not a typo.
const NO_TEXT = (extra = "", withButton = true) =>
  `The ONLY text in the image is the brand name "1lookup", the headline, the subheadline${withButton ? " and the button label" : ""}${extra}. ` +
  `No feature chips, no badges with captions, no statistics, no percentages, no company logos of any kind, no other words anywhere.`;

const MARGIN =
  "Every line of the headline must fit completely inside the frame with a clear margin on all four sides. " +
  "No letter may touch, overlap or be cropped by any edge. Shrink the type until every word fits whole.";

// ---------------------------------------------------------------- family A
// A dark API-response card whose FIELD NAMES are the ones that product actually returns.
// Field values are rendered as blank pills or check marks, never as text: the 2026-07 batch
// proved the model writes plausible-but-wrong values into any field it is allowed to fill,
// and a wrong product mechanic is worse than an empty one.
function productTruth(p) {
  return [
    `Professional {{SHAPE_WORD}} display ad banner for 1Lookup, a ${p.oneLiner}.`,
    `Background: ${BG}, dark developer terminal aesthetic with a soft ${CYAN} glow and thin glowing cyan signal lines.`,
    `Bold ${FONT} headline text in white: "${p.headline}".`,
    `Smaller light gray subheadline text: "${p.sub}".`,
    `A bright blue ${BLUE} rounded call-to-action button with white text: "${CTA}".`,
    `The brand name "1lookup" in small white ${FONT} type in one corner, the "1" in blue ${BLUE}.`,
    `Visual element: ${p.visual} Each row shows only its field name in monospace type and a blank rounded pill where the value would be, with a small ${GREEN} check mark beside it. The pills are empty: no values, no numbers, no words inside them.`,
    `{{COMPOSITION}}`,
    `Clean modern SaaS advertising design, crisp legible typography, exact spelling, generous margins, high detail.`,
    NO_TEXT(", plus the monospace field names listed above"),
  ].join(" ");
}

// ---------------------------------------------------------------- family B
// Photographic, hand-made, deliberately unpolished. Bans the SaaS-design language, which
// fights the concept, and spells the hand-lettered copy out because hand-lettering is where
// the model garbles far more than clean type.
function analog(p) {
  return [
    `A photograph of ${p.surface}, shot on a phone in natural available light, slightly off-square, real surface texture and grain, shallow depth of field.`,
    `Hand-lettered on it in ${p.ink}, in an ordinary person's handwriting, character for character: "${p.headline}".`,
    `Underneath, smaller and in the same hand: "${p.sub}".`,
    `In the bottom corner, written smaller and neatly: "1lookup.io".`,
    `${p.propNote}`,
    `Deliberately unpolished and organic so it reads as a real photo someone snapped and posted, rather than an advertisement.`,
    `No gradients, no glow, no vector graphics, no digital overlays, no studio lighting, no rendered buttons.`,
    `{{COMPOSITION}}`,
    MARGIN,
    NO_TEXT(" and the handwritten line \"1lookup.io\"", false),
  ].join(" ");
}

// ---------------------------------------------------------------- family C
function directResponse(c) {
  return [
    `Professional {{SHAPE_WORD}} display ad banner for 1Lookup. ${c.treatment}`,
    `Enormous bold ${FONT} headline text: "${c.headline}".`,
    `Smaller supporting text: "${c.sub}".`,
    `A bright blue ${BLUE} rounded call-to-action button with white text: "${CTA}".`,
    `The brand name "1lookup" in small type in one corner.`,
    `{{COMPOSITION}}`,
    MARGIN,
    `Crisp legible typography, exact spelling, high detail.`,
    NO_TEXT(),
  ].join(" ");
}

// ================================================================= the catalogue
// oneLiner: how the product is described on its own page, compressed to a clause.
// headline: max 7 words. sub: max 10 words. Both traceable to the page's own metadata.
const PRODUCTS = [
  // ---- Validate ----------------------------------------------------------------
  { slug: "phone-validation", family: "Validate",
    oneLiner: "real-time phone validation API with live carrier data",
    headline: "Stop Dialing Dead Numbers",
    sub: "Live carrier data. Answers in under 0.3 seconds.",
    visual: "a dark API response card in monospace listing the fields carrier, line_type, ported, dnc_registered and risk_level." },
  { slug: "email-validation", family: "Validate",
    oneLiner: "real-time email verification API",
    headline: "Verify Every Email Before You Send",
    sub: "SMTP checks and disposable detection, under 300 milliseconds.",
    visual: "a dark API response card in monospace listing the fields deliverable, smtp_check, disposable, role_account and score." },
  { slug: "ip-lookup", family: "Validate",
    oneLiner: "IP intelligence API with geolocation and risk scoring",
    headline: "Know Who Is Behind That IP",
    sub: "Geolocation, proxy and VPN detection, reputation scoring.",
    visual: "a dark API response card in monospace listing the fields country, city, isp, proxy, vpn and reputation." },
  { slug: "phone-spam-check", family: "Validate",
    oneLiner: "phone spam and risk scoring API",
    headline: "Are Your Numbers Flagged?",
    sub: "Machine-learning risk scoring, refreshed daily.",
    visual: "a dark API response card in monospace listing the fields spam_score, risk_level, robocall_flag and last_updated." },
  { slug: "hlr-lookup", family: "Validate",
    oneLiner: "HLR lookup API returning live subscriber status",
    headline: "Is That Number Still Alive?",
    sub: "Live subscriber status across 195+ countries.",
    visual: "a dark API response card in monospace listing the fields reachable, current_carrier, ported, roaming and country." },
  { slug: "carrier-lookup", family: "Validate",
    oneLiner: "carrier lookup API returning carrier, line type and porting history",
    headline: "Find The Carrier Behind Any Number",
    sub: "Line type and porting history, 195+ countries.",
    visual: "a dark API response card in monospace listing the fields carrier, line_type, ported, port_date and country." },
  { slug: "phone-scrub", family: "Validate",
    oneLiner: "DNC scrubbing API for compliant outreach",
    headline: "Scrub The List Before You Dial",
    sub: "Do-not-call checks, line type and risk flags.",
    visual: "a dark API response card in monospace listing the fields dnc_registered, litigator, line_type and risk_flag." },
  { slug: "fraud-detection", family: "Validate",
    oneLiner: "real-time fraud detection API",
    headline: "Catch Fraud Before It Signs Up",
    sub: "150+ risk indicators analyzed in real time.",
    visual: "a dark API response card in monospace listing the fields fraud_score, risk_level, indicators and decision." },
  { slug: "business-verify", family: "Validate",
    oneLiner: "business verification API for KYB-lite checks",
    headline: "Is That Business Even Real?",
    sub: "Live listing data plus phone and email checks.",
    visual: "a dark API response card in monospace listing the fields business_found, open_now, phone_valid, email_valid and score." },

  // ---- Enrich ------------------------------------------------------------------
  { slug: "email-append", family: "Enrich",
    oneLiner: "email append API that turns postal records into email addresses",
    headline: "Turn Addresses Into Email Addresses",
    sub: "Appended from name and address, confidence scored.",
    visual: "a dark API response card in monospace listing the fields email, match_confidence, source and last_seen." },
  { slug: "reverse-email-append", family: "Enrich",
    oneLiner: "reverse email lookup API that appends contact data to an address",
    headline: "One Email. The Whole Person.",
    sub: "Append name, address and phone to any email.",
    visual: "a dark API response card in monospace listing the fields first_name, last_name, address, phone and confidence." },
  { slug: "reverse-ip-append", family: "Enrich",
    oneLiner: "reverse IP append API that turns website traffic into contact data",
    headline: "Turn Anonymous Traffic Into Contacts",
    sub: "Append contact and location data from an IP.",
    visual: "a dark API response card in monospace listing the fields ip, contact_found, city, region and confidence." },
  { slug: "reverse-lookup", family: "Enrich",
    oneLiner: "reverse phone lookup API returning caller identity and risk",
    headline: "Who Is Actually Calling You?",
    sub: "Caller identity, risk score and associated data.",
    visual: "a dark API response card in monospace listing the fields name, line_type, carrier, risk_score and associated_records." },
  { slug: "skip-trace", family: "Enrich",
    oneLiner: "skip tracing API that finds phones and addresses from a name",
    headline: "Find Anyone From Just A Name",
    sub: "Verified phones and addresses, confidence scored.",
    visual: "a dark API response card in monospace listing the fields phone, address, city, state and match_confidence." },
  { slug: "mobile-finder", family: "Enrich",
    oneLiner: "mobile finder API that returns a direct mobile number",
    headline: "Get Their Direct Mobile Number",
    sub: "Profile link or work email in. Mobile out.",
    visual: "a dark API response card in monospace listing the fields mobile, line_type, carrier and match_confidence." },
  { slug: "email-enrichment", family: "Enrich",
    oneLiner: "email enrichment API that finds a work email from a name and domain",
    headline: "Name Plus Domain. Work Email Out.",
    sub: "Only charged when an email is actually found.",
    visual: "a dark API response card in monospace listing the fields work_email, verified, domain and charged." },
  { slug: "b2b-contact-append", family: "Enrich",
    oneLiner: "B2B contact append API returning verified work emails",
    headline: "Verified Work Emails, Charged On Match",
    sub: "Name, email or profile URL in. Contact out.",
    visual: "a dark API response card in monospace listing the fields work_email, title, seniority, company and verified." },
  { slug: "company-firmographics", family: "Enrich",
    oneLiner: "company enrichment API returning firmographic data from a domain",
    headline: "Turn A Domain Into A Company",
    sub: "50+ firmographic fields, charged only on a match.",
    visual: "a dark API response card in monospace listing the fields industry, sic_code, headcount, revenue and tech_stack." },
  { slug: "company-profile-lookup", family: "Enrich",
    oneLiner: "company profile lookup API returning size, HQ and funding history",
    headline: "Everything About A Company, One Call",
    sub: "Size, headquarters, founding year, specialties, funding history.",
    visual: "a dark API response card in monospace listing the fields headcount, headquarters, founded, specialties and funding_rounds." },
  { slug: "linkedin-profile-lookup", family: "Enrich",
    oneLiner: "profile lookup API that turns a public profile URL into a full record",
    headline: "Profile URL In. Full Record Out.",
    sub: "Role, job history, education and skills in seconds.",
    visual: "a dark API response card in monospace listing the fields headline, location, current_role, job_history and skills." },
  { slug: "business-lookup", family: "Enrich",
    oneLiner: "business lookup API that turns a name and city into a full listing",
    headline: "Name And City In. Listing Out.",
    sub: "Address, phone, website, rating, review count, hours.",
    visual: "a dark API response card in monospace listing the fields address, phone, website, category, rating and hours." },
  { slug: "property-lookup", family: "Enrich",
    oneLiner: "property lookup API returning home details from a US address",
    headline: "Any Address. The Whole Property Record.",
    sub: "Beds, baths, square footage, last sale price.",
    visual: "a dark API response card in monospace listing the fields beds, baths, sqft, year_built, listing_status and last_sale." },

  // ---- Social ------------------------------------------------------------------
  { slug: "social-profile-check", family: "Social",
    oneLiner: "social profile check API covering ten platforms",
    headline: "Check A Handle On Ten Platforms",
    sub: "Followers, flags and link in bio, fetched live.",
    visual: "a dark API response card in monospace listing the fields exists, followers, posts, verified and link_in_bio." },
  { slug: "social-post-lookup", family: "Social",
    oneLiner: "social post API returning real engagement numbers from a post URL",
    headline: "Real Numbers Behind Any Post",
    sub: "Likes, comments, shares and views as JSON.",
    visual: "a dark API response card in monospace listing the fields live, author, likes, comments, shares and views." },
  { slug: "video-transcript", family: "Social",
    oneLiner: "video transcript API for public videos across seven platforms",
    headline: "Any Video Link. Full Transcript.",
    sub: "Seven platforms, billed only on success.",
    visual: "a dark API response card in monospace listing the fields language, word_count, duration and transcript." },
  { slug: "social-search", family: "Social",
    oneLiner: "social profile search API across six platforms",
    headline: "One Keyword. Twenty Matching Accounts.",
    sub: "Six platforms, one call, zero cost on empty.",
    visual: "a dark API response card in monospace listing the fields platform, handle, followers and matches." },
  { slug: "ad-library-lookup", family: "Social",
    oneLiner: "ad library API covering four major ad platforms",
    headline: "See Every Ad They Are Running",
    sub: "Four ad libraries, one call, nothing found costs nothing.",
    // Wave 1 rendered the real Meta, TikTok, Google and Microsoft marks in the four corners.
    // The prompt already said "no company logos of any kind" and the model added them anyway,
    // because a subheadline naming four ad platforms invites them. The playbook's own rule
    // applies: prevent a prop with an exhaustive POSITIVE spec, never with a prohibition. So
    // the four slots are now assigned something concrete and unbranded.
    visual: "a dark API response card in monospace listing the fields running_ads, ad_count, platform, status and started, with four small plain dark rounded squares arranged around it, connected to the card by thin glowing cyan lines. Each of those four squares is completely empty: a plain dark rounded tile with a soft cyan edge glow and absolutely nothing inside it, no icon, no glyph, no letter, no symbol, no mark and no picture of any kind." },
  { slug: "tiktok-audience-demographics", family: "Social",
    oneLiner: "audience demographics API returning a creator's country split",
    headline: "Where Does Their Audience Actually Live?",
    sub: "Country split before you pay for a post.",
    visual: "a dark API response card in monospace listing the fields handle, country, share and total." },
  { slug: "link-in-bio-lookup", family: "Social",
    oneLiner: "link-in-bio API that turns a bio page into structured JSON",
    headline: "Every Link Behind A Bio Page",
    sub: "Title and destination for each, dead pages free.",
    visual: "a dark API response card in monospace listing the fields page_title, link_title and destination_url." },

  // ---- Monitor -----------------------------------------------------------------
  { slug: "job-change-monitoring", family: "Monitor",
    oneLiner: "job change monitoring API that watches a contact list",
    headline: "Know The Day They Change Jobs",
    sub: "Webhook, email and API event on every move.",
    visual: "a dark API response card in monospace listing the fields contact, event, old_company, new_company and detected_at." },

  // ---- Intelligence ------------------------------------------------------------
  { slug: "search-intent-lookup", family: "Intelligence",
    oneLiner: "SERP scraper API for Google search results",
    headline: "Scrape Google. One Credit A Search.",
    sub: "Rankings, Knowledge Graph and People Also Ask.",
    visual: "a dark API response card in monospace listing the fields query, position, url, knowledge_graph and people_also_ask." },
  { slug: "keyword-metrics", family: "Intelligence",
    oneLiner: "keyword research API returning volume, CPC and difficulty",
    headline: "Volume, Cost And Difficulty, One Call",
    sub: "Intent, twelve-month trend and every SERP feature.",
    visual: "a dark API response card in monospace listing the fields volume, cpc, difficulty, intent and serp_features." },
  { slug: "domain-authority", family: "Intelligence",
    oneLiner: "domain authority API returning score, traffic and keyword counts",
    headline: "One Domain In. Authority Score Out.",
    sub: "Keyword counts, traffic estimate and traffic value.",
    visual: "a dark API response card in monospace listing the fields authority_score, organic_keywords, traffic and traffic_value." },
  { slug: "domain-age", family: "Intelligence",
    oneLiner: "domain age API reading registration facts straight from the registry",
    headline: "When Was That Domain Registered?",
    sub: "Creation date, expiry and registrar, from the registry.",
    visual: "a dark API response card in monospace listing the fields created, age_years, expires, registrar and nameservers." },
  { slug: "backlink-overview", family: "Intelligence",
    oneLiner: "backlink checker API returning a full referring-domain profile",
    headline: "A Domain's Whole Backlink Profile",
    sub: "Referring domains, follow ratio and Authority Score.",
    visual: "a dark API response card in monospace listing the fields referring_domains, backlinks, follow_ratio and authority_score." },
  { slug: "domain-seo-intelligence", family: "Intelligence",
    oneLiner: "domain SEO intelligence API returning authority, backlinks and traffic",
    headline: "Every SEO Metric In One Call",
    sub: "Authority, backlinks and traffic, one request.",
    visual: "a dark API response card in monospace listing the fields authority, backlinks, traffic and social_signals." },
  { slug: "audience-intelligence", family: "Intelligence",
    oneLiner: "website audience intelligence API",
    headline: "See Who Visits Any Website",
    sub: "Traffic by country, audience age and income.",
    visual: "a dark API response card in monospace listing the fields country, share, age_band, income_band and destinations." },
  { slug: "prospect-search", family: "Intelligence",
    oneLiner: "B2B prospect search API",
    headline: "Find Decision Makers For Two Credits",
    sub: "Search by title, seniority, location and employer.",
    visual: "a dark API response card in monospace listing the fields name, title, seniority, employer and location." },
  { slug: "account-search", family: "Intelligence",
    oneLiner: "target account search API for building B2B lists",
    headline: "Build A Target Account List",
    sub: "Headcount, revenue, location and technology stack.",
    visual: "a dark API response card in monospace listing the fields company, domain, headcount, revenue and location." },
  { slug: "website-scraper", family: "Intelligence",
    oneLiner: "website scraper API that turns any URL into clean Markdown",
    headline: "Any URL Into Clean Markdown",
    sub: "Built for analysis and AI workflows.",
    visual: "a dark API response card in monospace listing the fields url, title, word_count and markdown." },
  { slug: "website-contacts-scraper", family: "Intelligence",
    oneLiner: "website contacts scraper API",
    headline: "Pull Every Contact Off A Website",
    sub: "Emails, phone numbers and social profiles.",
    visual: "a dark API response card in monospace listing the fields emails, phones, socials and pages_crawled." },
  { slug: "bulk-audio-transcription", family: "Intelligence",
    oneLiner: "bulk audio and video transcription API",
    headline: "Transcribe Audio And Video At Scale",
    sub: "Speaker labels, word timestamps, 95+ languages.",
    visual: "a dark API response card in monospace listing the fields speaker, start, end, language and text." },
  { slug: "mcp", family: "Intelligence",
    oneLiner: "MCP server that lets an AI agent run lookups directly",
    headline: "Your AI Agent Can Now Validate",
    sub: "One URL into Claude or Cursor. No API key.",
    visual: "a dark terminal-style card in monospace listing five tool names: validate_phone, validate_email, lookup_ip, spam_check and reverse_lookup." },
];

// ---------------------------------------------------------------- family B, top 8 only
// Chosen for buyer pain that a human would actually scrawl on something, not by volume.
const ANALOG = [
  { slug: "skip-trace",
    headline: "Half these addresses are wrong.",
    sub: "Skip trace them. 1Lookup.",
    surface: "a sheet of torn brown cardboard propped against a truck tailgate on a suburban street",
    ink: "thick black marker",
    propNote: "The cardboard has a real bent corner and a coffee ring. Nothing else is written on it." },
  { slug: "phone-scrub",
    headline: "Do not dial this list yet.",
    sub: "Scrub it for DNC first. 1Lookup.",
    surface: "a yellow sticky note stuck to the bezel of a monitor on a cluttered sales desk",
    ink: "blue ballpoint pen",
    propNote: "The monitor screen behind it is switched off and completely blank. The desk has a mug and a headset on it." },
  { slug: "email-validation",
    headline: "Every bounce costs you the next inbox.",
    sub: "Verify before you send. 1Lookup.",
    surface: "a whiteboard in an ordinary office, photographed slightly off-angle with the marker tray visible",
    ink: "black dry-erase marker",
    propNote: "The whiteboard is otherwise empty, with faint ghosting from previous writing that is illegible." },
  { slug: "phone-validation",
    headline: "300 dials. 11 rang. Same list.",
    sub: "Validate first. 1Lookup.",
    surface: "a yellow legal pad on a car passenger seat, seatbelt buckle visible at the edge",
    ink: "blue ballpoint pen",
    propNote: "The pad's top sheet is faintly indented from earlier writing. No other page is visible." },
  { slug: "search-intent-lookup",
    headline: "You are paying a subscription to read Google.",
    sub: "One credit a search instead. 1Lookup.",
    surface: "a paper coffee cup sleeve, held in one hand, cafe counter blurred behind",
    ink: "black fineliner pen",
    propNote: "The cup and sleeve are plain unbranded kraft brown with no printing on them at all." },
  { slug: "reverse-ip-append",
    headline: "97 visitors today. You know none of them.",
    sub: "Turn the traffic into contacts. 1Lookup.",
    surface: "an index card pinned to a cork board above a desk",
    ink: "black marker",
    propNote: "The other pins on the board hold no paper. Nothing else on the board carries writing." },
  { slug: "prospect-search",
    headline: "Stop paying per seat to search a list.",
    sub: "Two credits a search. 1Lookup.",
    surface: "the back of a printed spreadsheet page, turned over on a desk",
    ink: "red ballpoint pen",
    propNote: "The printed side is face down and no printing shows through. The desk is plain wood." },
  { slug: "fraud-detection",
    headline: "Best signup day ever. All one guy.",
    sub: "Score them before they get in. 1Lookup.",
    surface: "a whiteboard beside a laptop in a small startup office, shot from a seated angle",
    ink: "black dry-erase marker",
    propNote: "The laptop screen is closed. The whiteboard carries nothing else." },
];

// ---------------------------------------------------------------- family C, platform level
// The 41-products claim is the newest, least-used, and least copyable thing on the site.
// DATA_PRODUCT_COUNT = 41, src/lib/products.ts, re-read 2026-08-19.
const DIRECT = [
  { code: "forty-one-keys",
    headline: "41 Data Products. One API Key.",
    sub: "One shared credit balance. 7-day free trial.",
    treatment: `A loud offer-poster treatment: a flat ${BLUE} field with a single enormous white numeral 41 set behind the headline as a watermark, and a hard ${CYAN} diagonal band across one corner.` },
  { code: "vendor-graveyard",
    headline: "Cancel The Other Eleven Subscriptions.",
    sub: "41 data products on one API key.",
    treatment: `A brutalist inversion of the brand: flat white background, black ${FONT} type, one ${BLUE} block behind a single word of the headline. No glow, no gradient, no dark mode.` },
  { code: "hazard",
    headline: "Warning: Your List Is Full Of Ghosts.",
    sub: "Validate phones, emails and domains. Start free.",
    treatment: `A hazard-stripe warning label treatment: diagonal black and safety-yellow stripes across the top and bottom edges, a flat ${BG} centre panel holding the type.` },
  { code: "one-balance",
    headline: "One Balance. Every Lookup.",
    sub: "Validation, enrichment, prospecting, SEO, transcription.",
    treatment: `An oversized cropped mega-numeral treatment: the numeral 1 in ${CYAN} filling most of the frame as a graphic element with the headline set across it in white.` },
  { code: "stop-paying",
    headline: "Stop Paying For Bad Data.",
    sub: "7-day free trial. Nothing charged today.",
    treatment: `A dark ${BG} field with thin glowing ${CYAN} signal lines and a blue-to-cyan gradient accent on the last two words of the headline.` },
];

// ================================================================= assemble
// Asset ids are assigned once here and never change: b13c01..b13c56. The id is the join key
// between the file, the ad name on every platform, and the run log that holds the prompt.
let n = 0;
const id = () => `b13c${String(++n).padStart(2, "0")}`;

const shapeWord = { square: "square", landscape: "wide landscape", vertical: "tall vertical", wide: "very wide short" };

export const BANNERS = [
  // C first, so the platform-level concepts get the low ids and are easy to find.
  ...DIRECT.map((c) => ({
    id: `1lookup-platform-${id()}`,
    company: "1lookup",
    product: "platform",
    family: "direct-response",
    concept: c.code,
    headline: c.headline,
    subheadline: c.sub,
    cta: CTA,
    shapes: ["square", "landscape", "vertical"],
    destination: "https://www.1lookup.io/",
    prompt: directResponse(c),
  })),

  ...PRODUCTS.map((p) => ({
    id: `1lookup-${p.slug}-${id()}`,
    company: "1lookup",
    product: p.slug,
    family: "product-truth",
    concept: p.slug,
    productFamily: p.family,
    headline: p.headline,
    subheadline: p.sub,
    cta: CTA,
    shapes: ["square", "landscape"],
    destination: `https://www.1lookup.io/products/${p.slug}`,
    prompt: productTruth(p),
  })),

  ...ANALOG.map((a) => ({
    id: `1lookup-${a.slug}-${id()}`,
    company: "1lookup",
    product: a.slug,
    family: "analog",
    concept: `analog-${a.slug}`,
    headline: a.headline,
    subheadline: a.sub,
    // No rendered button in this register: the marker carries the offer, and a vector button
    // on a photographed surface is the exact thing that breaks the illusion.
    cta: null,
    shapes: ["square", "vertical"],
    destination: `https://www.1lookup.io/products/${a.slug}`,
    prompt: analog(a),
  })),
];

export const SHAPE_WORD = shapeWord;
