#!/usr/bin/env node
// Add the heart-tug banners to the ESA Card Demand Gen campaign as a multi-asset ad.
//
//   node _scripts/google-demandgen-esacard-heart-tug.mjs            # validateOnly, no writes
//   node _scripts/google-demandgen-esacard-heart-tug.mjs --live      # upload assets + create ad
//   node _scripts/google-demandgen-esacard-heart-tug.mjs --video <id>,<id>,... --live
//                                                                    # add a video ad instead
//
// Two ad types are involved and they take DIFFERENT field shapes, which is the trap here:
//   DEMAND_GEN_VIDEO_RESPONSIVE_AD  businessName is a MESSAGE {text}, CTA is an asset link
//   DEMAND_GEN_MULTI_ASSET_AD       businessName is a plain STRING, CTA is callToActionText
// The video ad type has no marketing-image field at all, so banners cannot ride along on the
// existing ads; they need this second ad.
//
// Demand Gen enforces exact aspect ratios: 1.91:1 landscape, 1:1 square, 4:5 portrait. The
// files below are the corrected sizes, not the raw fal renders (which are 1.789 and 0.750).

import { readFile } from "node:fs/promises";
import path from "node:path";
import * as L from "/home/user/second-brain/scripts/google-ads-lib.mjs";

const CUSTOMER = "3800595805";
const AD_GROUP = "197002640617"; // ESA | Demand Gen | Broad | US
const LOGO_ASSET = `customers/${CUSTOMER}/assets/407402632952`; // ESA Card logo 512 square
const FINAL_URL = "https://www.esacard.com/";
const ROOT = "/home/user/ad-creative/esacard/2026-08-18-heart-tug";

const LIVE = process.argv.includes("--live");
const videoArg = process.argv.indexOf("--video");
const VIDEO_IDS = videoArg === -1 ? null : process.argv[videoArg + 1].split(",").filter(Boolean);

// Verbatim from the four live Demand Gen ads, so the new ad reads as the same account.
const HEADLINES = [
  "A wallet card in three minutes",
  "$39 once. No renewals, ever.",
  "Certificate and wallet ID card",
  "A number anyone can verify",
  "No appointments, no forms",
];
const LONG_HEADLINES = [
  "A certificate and a wallet card for your emotional support animal, in about 3 minutes",
  "$39 one time. No subscription, no renewal fees, and a number anyone can verify.",
];
const DESCRIPTIONS = [
  "Print-ready PDFs emailed the moment you finish. One-time $39, 30-day money-back.",
  "Your animal's photo on a credit-card sized ID, ready to print at true size.",
  "A registration number anyone can verify in seconds. No renewals, no subscription.",
];

const IMAGES = [
  { file: "n1-grey-muzzle-landscape-1200x628.png", name: "ESA n1 grey muzzle 1200x628", slot: "landscape" },
  { file: "n2-moving-box-landscape-1200x628.png", name: "ESA n2 moving box 1200x628", slot: "landscape" },
  { file: "n1-grey-muzzle-square-1200.png", name: "ESA n1 grey muzzle 1200 square", slot: "square" },
  { file: "n2-moving-box-square-1200.png", name: "ESA n2 moving box 1200 square", slot: "square" },
  { file: "n1-grey-muzzle-portrait-960x1200.png", name: "ESA n1 grey muzzle 960x1200", slot: "portrait" },
  { file: "n2-moving-box-portrait-960x1200.png", name: "ESA n2 moving box 960x1200", slot: "portrait" },
];

const creds = L.loadCreds();
const log = (...a) => console.log(`[${new Date().toISOString().slice(11, 19)}]`, ...a);

// Reuse an asset that is already on the account rather than uploading a second copy: image
// assets are deduplicated by content hash server-side, but a duplicate NAME is confusing in
// the asset library and there is no delete.
const existing = await L.gaSearch(creds, CUSTOMER,
  "SELECT asset.id, asset.name, asset.type FROM asset WHERE asset.type = 'IMAGE'");
const byName = new Map(existing.map((r) => [r.asset.name, r.asset.id]));
log(`account has ${existing.length} image assets`);

async function uploadImage(img) {
  if (byName.has(img.name)) {
    log(`reuse asset ${byName.get(img.name)} ${img.name}`);
    return `customers/${CUSTOMER}/assets/${byName.get(img.name)}`;
  }
  if (!LIVE) { log(`DRY  would upload ${img.file}`); return `customers/${CUSTOMER}/assets/<${img.slot}>`; }
  const data = (await readFile(path.join(ROOT, img.file))).toString("base64");
  const res = await L.gaMutate(creds, CUSTOMER, "assets",
    [{ create: { name: img.name, type: "IMAGE", imageAsset: { data } } }], { validateOnly: false });
  const rn = res.results?.[0]?.resourceName;
  if (!rn) throw new Error(`${img.file}: ${JSON.stringify(res).slice(0, 400)}`);
  log(`uploaded ${img.file} -> ${rn}`);
  return rn;
}

let operation;
if (VIDEO_IDS) {
  // Demand Gen accepts video only as a YOUTUBE_VIDEO asset: there is no mp4 upload path, so
  // the clips must be public on the channel before this runs.
  const videoAssets = [];
  for (const vid of VIDEO_IDS) {
    const found = await L.gaSearch(creds, CUSTOMER,
      `SELECT asset.id, asset.youtube_video_asset.youtube_video_id FROM asset WHERE asset.type = 'YOUTUBE_VIDEO'`);
    const hit = found.find((r) => r.asset.youtubeVideoAsset?.youtubeVideoId === vid);
    if (hit) { videoAssets.push({ asset: `customers/${CUSTOMER}/assets/${hit.asset.id}` }); continue; }
    if (!LIVE) { log(`DRY  would create YOUTUBE_VIDEO asset for ${vid}`); continue; }
    const res = await L.gaMutate(creds, CUSTOMER, "assets",
      [{ create: { type: "YOUTUBE_VIDEO", youtubeVideoAsset: { youtubeVideoId: vid } } }], { validateOnly: false });
    const rn = res.results?.[0]?.resourceName;
    if (!rn) throw new Error(`${vid}: ${JSON.stringify(res).slice(0, 400)}`);
    log(`video asset ${vid} -> ${rn}`);
    videoAssets.push({ asset: rn });
  }
  operation = {
    create: {
      adGroup: `customers/${CUSTOMER}/adGroups/${AD_GROUP}`,
      status: "ENABLED",
      ad: {
        name: "ESA Card | Demand Gen | heart-tug set",
        finalUrls: [FINAL_URL],
        demandGenVideoResponsiveAd: {
          videos: videoAssets,
          headlines: HEADLINES.map((text) => ({ text })),
          longHeadlines: LONG_HEADLINES.map((text) => ({ text })),
          descriptions: DESCRIPTIONS.map((text) => ({ text })),
          businessName: { text: "esacard.com" },
          logoImages: [{ asset: LOGO_ASSET }],
          callToActions: [{ asset: `customers/${CUSTOMER}/assets/407501423149` }],
        },
      },
    },
  };
} else {
  const assets = {};
  for (const img of IMAGES) (assets[img.slot] ??= []).push({ asset: await uploadImage(img) });
  operation = {
    create: {
      adGroup: `customers/${CUSTOMER}/adGroups/${AD_GROUP}`,
      status: "ENABLED",
      ad: {
        name: "ESA Card | Demand Gen | heart-tug banners",
        finalUrls: [FINAL_URL],
        demandGenMultiAssetAd: {
          marketingImages: assets.landscape,
          squareMarketingImages: assets.square,
          portraitMarketingImages: assets.portrait,
          logoImages: [{ asset: LOGO_ASSET }],
          headlines: HEADLINES.map((text) => ({ text })),
          descriptions: DESCRIPTIONS.map((text) => ({ text })),
          businessName: "esacard.com",       // STRING here, MESSAGE on the video ad
          callToActionText: "Learn more",    // STRING here, asset link on the video ad
        },
      },
    },
  };
}

const check = await L.gaMutate(creds, CUSTOMER, "adGroupAds", [operation], { validateOnly: true });
log(`validateOnly: ${JSON.stringify(check).slice(0, 500)}`);

if (!LIVE) { log("dry run only, re-run with --live"); process.exit(0); }

const res = await L.gaMutate(creds, CUSTOMER, "adGroupAds", [operation], { validateOnly: false });
log(`created ${JSON.stringify(res).slice(0, 400)}`);
