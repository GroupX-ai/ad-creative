#!/usr/bin/env node
// Build ONE combined review sheet per company: 4 evenly-spaced frames from each
// clip, one clip per row. Lets a whole company's batch be eyeballed in a single
// image for scene correctness, stray on-screen text and mangled faces, instead of
// ten separate contact sheets.
//
//   node _scripts/seedance-contactsheet.mjs <outdir> <clip.mp4> [...]

import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const FF = execFileSync("python3", ["-c", "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())"])
  .toString().trim();
const ff = (a) => execFileSync(FF, a, { stdio: ["ignore", "pipe", "pipe"] });

const [outDir, ...clips] = process.argv.slice(2);
if (!outDir || !clips.length) throw new Error("usage: seedance-contactsheet.mjs <outdir> <clip.mp4>...");
mkdirSync(outDir, { recursive: true });

const byCompany = {};
for (const c of clips) (byCompany[c.split("/")[0]] ??= []).push(c);

for (const [company, list] of Object.entries(byCompany)) {
  const tmp = mkdtempSync(path.join(tmpdir(), "sheet-"));
  const rows = [];
  for (const [i, clip] of list.entries()) {
    // 4 frames at 15%, 40%, 65%, 88% of the runtime.
    let dur = 30;
    try { ff(["-hide_banner", "-i", clip]); }
    catch (e) {
      const m = (e.stderr || "").toString().match(/Duration: (\d+):(\d+):([\d.]+)/);
      if (m) dur = +m[1] * 3600 + +m[2] * 60 + +m[3];
    }
    const frames = [0.15, 0.4, 0.65, 0.88].map((p, j) => {
      const f = path.join(tmp, `r${i}_${j}.jpg`);
      ff(["-hide_banner", "-loglevel", "error", "-y", "-ss", String(dur * p), "-i", clip,
          "-frames:v", "1", "-vf", "scale=260:-1", "-q:v", "4", f]);
      return f;
    });
    const row = path.join(tmp, `row${i}.jpg`);
    const cmd = ["-hide_banner", "-loglevel", "error", "-y"];
    frames.forEach((f) => cmd.push("-i", f));
    cmd.push("-filter_complex", `${frames.map((_, k) => `[${k}:v]`).join("")}hstack=inputs=${frames.length}`, row);
    ff(cmd);
    rows.push(row);
    console.log(`  row ${i + 1}: ${path.basename(clip)}`);
  }
  const out = path.join(outDir, `${company}-review.jpg`);
  const cmd = ["-hide_banner", "-loglevel", "error", "-y"];
  rows.forEach((r) => cmd.push("-i", r));
  cmd.push("-filter_complex", `${rows.map((_, k) => `[${k}:v]`).join("")}vstack=inputs=${rows.length}`, out);
  ff(cmd);
  console.log(`${company}: ${list.length} clips -> ${out}`);
}
