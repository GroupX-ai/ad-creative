# Display campaigns — build spec

Two campaigns, built in the Google Ads UI (responsive display ads cannot be CSV-imported with images). All text assets below are within Google limits and use only approved claims.

## Campaign 7: 1L Display - Remarketing ($39/day)

- **Type:** Display, Smart bidding: Maximize Conversions from day one (small audience, let it learn). Frequency cap: 3 impressions/day/user.
- **Audiences (Your data):**
  1. All website visitors, 30 days.
  2. Trial abandoners: visited /signup, /free-trial, or /pricing, no trial started (higher bid via audience bid adjustment once on manual, or its own ad group).
  3. Free-tool users: visited /tools/*, no signup. This is who campaign 5 (Search - Free Tools) feeds.
- **Exclude:** converters (trial started), existing customers.
- **Location:** US + Canada. Language: English.

## Campaign 8: 1L Display - Prospecting ($39/day)

- **Type:** Display, Manual CPC to start ($0.50 max), switch to Max Conversions at 15+ conversions.
- **Audiences:**
  1. Custom segment "Competitor site browsers": people who browse websites like zerobounce.net, neverbounce.com, numverify.com, ipqualityscore.com, kickbox.com, melissa.com, hlr-lookups.com, telesign.com.
  2. Custom segment "Validation searchers": people who searched Google for phone validation api, email verification api, carrier lookup api, bulk email verification, skip tracing api.
  3. Layer (observation first, targeting if CTR holds): in-market Business Technology.
- **Exclusions (both campaigns):** mobile app placements (exclude all app categories), parked domains, sensitive content categories, YouTube channels made for kids. Weekly placement report review; exclude junk domains.

## Responsive display ad text assets (both campaigns)

- Business name: `1Lookup`
- Short headlines (max 30): `Stop Paying for Bad Data` / `Validate Any Phone Instantly` / `7-Day Free Trial` / `One API for Phone, Email & IP` / `Under 0.3s Per Lookup`
- Long headline (max 90): `Validate Any Phone, Email, or IP Instantly. Start Your 7-Day Free Trial.`
- Descriptions (max 90): `Validate phones, emails, and IPs through one API. Under 0.3 seconds per lookup.` / `Accuracy sourced direct from FCC and carrier data, updated daily. Start for free.` / `7-day free trial. 5-minute setup, no contracts, cancel anytime.` / `Stop paying for bad data. Millions of lookups processed at under 0.3 seconds each.`
- Call to action: Sign up
- Final URL: `https://www.1lookup.io/free-trial` (remarketing) / `https://www.1lookup.io/` (prospecting)

## Image assets

Google responsive display needs 1.91:1 (1200x628) + 1:1 (1200x1200) images and logos.

- **New in this batch (Google ratios):** `1lookup-g1-landscape.png` + `1lookup-g1-square.png` (trial-led), `1lookup-g2-landscape.png` + `1lookup-g2-square.png` (one-API). Prompts below.
- **Reuse from `../2026-07-20-banners/`:** `1lookup-c1-*` (Stop Paying for Bad Data) and `1lookup-c2-*` (Validate Any Phone Instantly). The 1024x1024 squares meet Google's minimum.
- **Logos:** use the real logo files from the 1Lookup-Marketing repo `public/` folder (1:1 at 1200x1200 or smaller, 4:1 at 512x128). Do not generate logos.

## Generation prompts (fal `openai/gpt-image-2`, quality high)

### `1lookup-g1-square.png` (1200x1200) / `1lookup-g1-landscape.png` (1200x624, delivered 1200x628)

```text
Professional [square | wide landscape] display ad banner for 1Lookup, a real-time phone, email and IP validation API. Background: deep blue-black #05060F with thin glowing cyan #22D3EE signal lines. Bold geometric technical sans-serif headline text in white: "7-Day Free Trial" with a blue-to-cyan gradient accent on "Free". Smaller light gray subheadline text: "Validate any phone, email, or IP instantly." A bright blue #3B82F6 rounded call-to-action button with white text: "Start For Free". Three small dark UI cards, one with a phone icon, one with an envelope icon, one with a globe icon, each stamped with a green checkmark badge. The cards contain icons and checkmarks only, no words. The ONLY text in the image is the brand name 1Lookup, the headline, the subheadline and the button label. No feature chips, no badges with captions, no other words anywhere. [Balanced centered composition. | Wide landscape composition with text on the left and the visual element on the right.] Clean modern SaaS advertising design, crisp legible typography, exact spelling, generous margins, high detail.
```

### `1lookup-g2-square.png` (1200x1200) / `1lookup-g2-landscape.png` (1200x624, delivered 1200x628) — re-roll (final)

Wave 1 rendered "Verizon Wireless" as the carrier value, breaking the playbook's no-third-party-brands guardrail. A "never use Verizon" instruction made it worse (the model rendered the named brand again). What worked: pin every card row positively as quoted text and never name a real brand in the prompt. Final prompt:

```text
Professional [square | wide landscape] display ad banner for 1Lookup, a real-time phone, email and IP validation API. Background: deep blue-black #05060F, dark developer terminal aesthetic with a soft cyan glow. Bold geometric technical sans-serif headline text in white: "One API. Every Lookup." with a blue-to-cyan gradient accent on "Every Lookup". Smaller light gray subheadline text: "Phone, email, IP, fraud and more." A bright blue #3B82F6 rounded call-to-action button with white text: "Start For Free". A dark API response card in monospace font listing exactly four rows of text: the row "carrier : Verified", the row "line type : Mobile", the row "spam score : 0.03", and the row "DNC : Not Listed", each row with a small green checkmark and a pulsing cyan live dot. The ONLY text in the image is the brand name 1Lookup, the headline, the subheadline, the button label and those four API card rows exactly as quoted. No feature chips, no badges with captions, no company names, no other words anywhere. [Balanced centered composition. | Wide landscape composition with text on the left and the visual element on the right.] Clean modern SaaS advertising design, crisp legible typography, exact spelling, generous margins, high detail.
```
