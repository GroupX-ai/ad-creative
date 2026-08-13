import { BANNERS } from "./prompts.mjs";
import { writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
const KEY=process.env.FAL_KEY; const OUT=new URL("./",import.meta.url).pathname;
async function run(payload){
  const sub=await fetch("https://queue.fal.run/openai/gpt-image-2",{method:"POST",
    headers:{Authorization:"Key "+KEY,"Content-Type":"application/json"},body:JSON.stringify(payload)});
  const q=await sub.json(); if(!q.request_id) throw new Error("submit");
  for(let i=0;i<200;i++){await new Promise(r=>setTimeout(r,4000));
    const s=await(await fetch(q.status_url,{headers:{Authorization:"Key "+KEY}})).json();
    if(s.status==="COMPLETED") return (await fetch(q.response_url,{headers:{Authorization:"Key "+KEY}})).json();
    if(s.status==="FAILED") throw new Error("failed");}
  throw new Error("timeout");
}
// A blank render has near-zero luminance spread; file size alone does not catch it.
const spread=(f)=>Number(execFileSync("python3",["-c",
 `from PIL import Image,ImageStat;print(sum(ImageStat.Stat(Image.open(${JSON.stringify(OUT+f)}).convert("L")).stddev))`]).toString().trim());
const jobs=BANNERS.flatMap(b=>b.shapes.map(s=>({b,s,
  file:`${b.id}-${s==="square_hd"?"square":"vertical"}.png`})));
console.log("rendering",jobs.length,"banners");
await Promise.all(jobs.map(async j=>{
  for(let a=1;a<=4;a++){
    try{
      const d=await run({prompt:j.b.prompt,image_size:j.s,quality:"high",num_images:1});
      const url=d.images?.[0]?.url; if(!url) throw new Error("no url");
      const buf=Buffer.from(await(await fetch(url)).arrayBuffer());
      if(buf.length<10000) throw new Error("short");
      await writeFile(OUT+j.file,buf);
      const sd=spread(j.file);
      if(sd<8) throw new Error("blank frame");
      console.log("OK ",j.file,(buf.length/1024).toFixed(0)+"KB");
      return;
    }catch(e){ if(a===4) console.log("FAIL",j.file,String(e).slice(0,80)); }
  }
}));
console.log("done");
