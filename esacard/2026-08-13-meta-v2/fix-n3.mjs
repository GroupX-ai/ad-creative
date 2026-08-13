import { NEW } from "./prompts-banners2.mjs";
import { writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
const KEY=process.env.FAL_KEY; const OUT=new URL("./",import.meta.url).pathname;
const b=NEW.find(x=>x.id==="n3-verifiable");
async function run(payload){
  const sub=await fetch("https://queue.fal.run/openai/gpt-image-2",{method:"POST",
    headers:{Authorization:"Key "+KEY,"Content-Type":"application/json"},body:JSON.stringify(payload)});
  const q=await sub.json();
  for(let i=0;i<200;i++){await new Promise(r=>setTimeout(r,4000));
    const s=await(await fetch(q.status_url,{headers:{Authorization:"Key "+KEY}})).json();
    if(s.status==="COMPLETED") return (await fetch(q.response_url,{headers:{Authorization:"Key "+KEY}})).json();
    if(s.status==="FAILED") throw new Error("failed");}
  throw new Error("timeout");
}
// A uniform frame (the all-black failure) has near-zero standard deviation.
const notBlank=(f)=>Number(execFileSync("python3",["-c",
  `from PIL import Image,ImageStat;print(sum(ImageStat.Stat(Image.open(${JSON.stringify(OUT+f)}).convert("L")).stddev))`]).toString().trim());
for(let a=1;a<=4;a++){
  const d=await run({prompt:b.prompt,image_size:"square_hd",quality:"high",num_images:1});
  const url=d.images?.[0]?.url; if(!url){console.log("attempt",a,"no url");continue;}
  const buf=Buffer.from(await(await fetch(url)).arrayBuffer());
  await writeFile(OUT+"n3-verifiable-square.png",buf);
  const sd=notBlank("n3-verifiable-square.png");
  console.log("attempt",a,(buf.length/1024).toFixed(0)+"KB, stddev",sd.toFixed(1));
  if(sd>8){ console.log("OK n3-verifiable-square.png"); break; }
  console.log("  blank frame, retrying");
}
