// Deploy the 32 animated banner videos as a NEW Meta campaign.
//
// Robby: "deploy all of these on Meta Ads as a new campaign - same exact audience as the Weird
// Animals one, but a separate campaign with these videos (I want to test them against the weird
// animal banners and videos) - also $100 / day".
//
// So the ONLY variable against the Weird Animals campaign is the creative: the targeting is
// copied field for field off that campaign's ad set, and the copy, headline, CTA and landing
// page are the same ones its banners already run. Same audience, same words, moving pictures.
//
// Everything is created PAUSED. $100/day starts burning the moment it goes live, so the ads are
// checked first and the campaign is flipped on separately by --activate.
//
//   node deploy-meta.mjs            build it, paused
//   node deploy-meta.mjs --activate turn the campaign on

import fs from "node:fs";

const TOKEN = process.env.META_SYSTEM_USER_TOKEN;
if (!TOKEN) throw new Error("META_SYSTEM_USER_TOKEN missing");
const ACT = "3530109303824417";
const SRC_ADSET = "120247924771890605";     // ESA | US | Weird Animals | InitiateCheckout
const PAGE_ID = "1238464462686774";
const LINK = "https://www.esacard.com/";
const BODY = "$39 once. That is the whole price.\n\nThe registration never expires and the verification listing stays live for good.\n\nA wallet card with your animal's photo and a certificate for the wall, both print-ready, both in your inbox in about three minutes.";
const TITLE = "$39 once. Never again.";
const CTA = "GET_OFFER";
const STATE = "meta-state.json";

let V = "v23.0";
const api = async (path, method = "GET", body = null) => {
  const url = `https://graph.facebook.com/${V}/${path}`;
  const opts = { method, headers: { "Content-Type": "application/json" } };
  const payload = { ...(body || {}), access_token: TOKEN };
  let target = url;
  if (method === "GET") target = url + (url.includes("?") ? "&" : "?") + new URLSearchParams(payload);
  else opts.body = JSON.stringify(payload);
  const r = await fetch(target, opts);
  const j = await r.json();
  if (j.error) throw new Error(`${path}: ${j.error.message}`);
  return j;
};

// find a version this token accepts
for (const v of ["v23.0", "v21.0", "v20.0", "v19.0"]) {
  V = v;
  try { await api(`act_${ACT}`, "GET", { fields: "id" }); console.log("graph version", v); break; }
  catch (e) { if (v === "v19.0") throw e; }
}

const state = fs.existsSync(STATE) ? JSON.parse(fs.readFileSync(STATE, "utf8")) : {};
const save = () => fs.writeFileSync(STATE, JSON.stringify(state, null, 1));

if (process.argv.includes("--activate")) {
  await api(state.campaign_id, "POST", { status: "ACTIVE" });
  await api(state.adset_id, "POST", { status: "ACTIVE" });
  console.log("campaign ACTIVE:", state.campaign_id);
  process.exit(0);
}

// 1. copy the Weird Animals ad set's audience, field for field
const src = await api(SRC_ADSET, "GET", {
  fields: "targeting,optimization_goal,billing_event,promoted_object,attribution_spec,destination_type,bid_strategy",
});
console.log("cloned audience from Weird Animals ad set");
console.log("  targeting:", JSON.stringify(src.targeting).slice(0, 400));
console.log("  optimization_goal:", src.optimization_goal, "| promoted_object:", JSON.stringify(src.promoted_object));

// 2. campaign, CBO at $100/day
if (!state.campaign_id) {
  const c = await api(`act_${ACT}/campaigns`, "POST", {
    name: "ESA Card | Meta | US | Weird Animals | ANIMATED VIDEO",
    objective: "OUTCOME_SALES",
    status: "PAUSED",
    special_ad_categories: [],
    daily_budget: 10000,
    bid_strategy: "LOWEST_COST_WITHOUT_CAP",
  });
  state.campaign_id = c.id; save();
}
console.log("campaign", state.campaign_id);

// 3. ad set with the copied audience. No budget here: the campaign holds it (CBO).
if (!state.adset_id) {
  const a = await api(`act_${ACT}/adsets`, "POST", {
    name: "ESA | US | Weird Animals | ANIMATED VIDEO",
    campaign_id: state.campaign_id,
    status: "PAUSED",
    targeting: src.targeting,
    optimization_goal: src.optimization_goal,
    billing_event: src.billing_event,
    promoted_object: src.promoted_object,
    destination_type: src.destination_type || "WEBSITE",
    attribution_spec: src.attribution_spec,
  });
  state.adset_id = a.id; save();
}
console.log("ad set", state.adset_id);

// 4. videos
const urls = JSON.parse(fs.readFileSync("all/video-urls.json", "utf8"));
state.videos = state.videos || {};
const names = Object.keys(urls).sort();
for (const n of names) {
  if (state.videos[n]) continue;
  const v = await api(`act_${ACT}/advideos`, "POST", { file_url: urls[n], name: `ESA animated ${n}` });
  state.videos[n] = v.id; save();
  console.log(`  video ${Object.keys(state.videos).length}/${names.length} ${n} -> ${v.id}`);
}

// 5. thumbnails. Meta refuses a video ad without one ("Your ad needs a video thumbnail",
// subcode 1443226) and will not fall back to frame one. The padded source banner IS frame one,
// so uploading it makes the ad's still frame identical to the static banner it is being tested
// against, which is exactly what this test needs.
state.thumbs = state.thumbs || {};
for (const n of names) {
  if (state.thumbs[n]) continue;
  const bytes = fs.readFileSync(`all/src/${n}.jpg`).toString("base64");
  const form = new URLSearchParams({ bytes, access_token: TOKEN });
  const r = await fetch(`https://graph.facebook.com/${V}/act_${ACT}/adimages`, { method: "POST", body: form });
  const j = await r.json();
  if (j.error) throw new Error("adimages " + n + ": " + j.error.message);
  state.thumbs[n] = j.images.bytes.hash; save();
  console.log(`  thumb ${Object.keys(state.thumbs).length}/${names.length} ${n}`);
}

// 6. one ad per video
state.ads = state.ads || {};
for (const n of names) {
  if (state.ads[n]) continue;
  const link = `${LINK}?utm_source=meta&utm_medium=paid_social&utm_campaign=esa-card-meta-animated-banners&utm_content=${n}`;
  const ad = await api(`act_${ACT}/ads`, "POST", {
    name: `ANIM ${n}`,
    adset_id: state.adset_id,
    status: "PAUSED",
    creative: {
      object_story_spec: {
        page_id: PAGE_ID,
        video_data: {
          video_id: state.videos[n],
          image_hash: state.thumbs[n],
          message: BODY,
          title: TITLE,
          call_to_action: { type: CTA, value: { link } },
        },
      },
    },
  });
  state.ads[n] = ad.id; save();
  console.log(`  ad ${Object.keys(state.ads).length}/${names.length} ${n} -> ${ad.id}`);
}
console.log(`\nBUILT PAUSED: campaign ${state.campaign_id}, ${Object.keys(state.ads).length} ads`);
