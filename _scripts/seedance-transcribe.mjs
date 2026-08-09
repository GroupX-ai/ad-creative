#!/usr/bin/env node
// Transcribe a generated ad's audio so the spoken brand line can be checked
// against the approved copy bank word for word. ~$0.008 per audio minute.
//
//   node _scripts/seedance-transcribe.mjs <audio.mp3> [...]

import { readFile } from "node:fs/promises";
import path from "node:path";

const KEY = process.env.FAL_KEY;
if (!KEY) throw new Error("FAL_KEY is not set");
const MODEL = "fal-ai/elevenlabs/speech-to-text/scribe-v2";
const headers = { Authorization: `Key ${KEY}`, "Content-Type": "application/json" };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// fal accepts a data URI in place of a hosted file for small payloads.
async function dataUri(file) {
  const buf = await readFile(file);
  return `data:audio/mpeg;base64,${buf.toString("base64")}`;
}

for (const f of process.argv.slice(2)) {
  const submit = await fetch(`https://queue.fal.run/${MODEL}`, {
    method: "POST",
    headers,
    body: JSON.stringify({ audio_url: await dataUri(f), language_code: "eng", diarize: true }),
  });
  if (!submit.ok) {
    console.error(`${path.basename(f)}: submit ${submit.status} ${await submit.text()}`);
    continue;
  }
  const { status_url, response_url } = await submit.json();

  let out = null;
  for (let i = 0; i < 60; i++) {
    await sleep(3000);
    const st = await (await fetch(status_url, { headers })).json();
    if (st.status === "COMPLETED") {
      out = await (await fetch(response_url, { headers })).json();
      break;
    }
    if (st.status === "FAILED" || st.status === "ERROR") {
      console.error(`${path.basename(f)}: ${JSON.stringify(st).slice(0, 300)}`);
      break;
    }
  }
  console.log(`\n=== ${path.basename(f)} ===`);
  if (!out) { console.log("(no transcript)"); continue; }
  console.log(out.text ?? JSON.stringify(out).slice(0, 2000));
}
