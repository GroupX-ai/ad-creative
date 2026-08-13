import { VERTICALS, NEW } from "./prompts-banners2.mjs";
import { writeFile } from "node:fs/promises";
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
async function make(id,prompt,size,file){
  for(let a=1;a<=3;a++){
    try{
      const d=await run({prompt,image_size:size,quality:"high",num_images:1});
      const url=d.images?.[0]?.url; if(!url) throw new Error("no url");
      const buf=Buffer.from(await(await fetch(url)).arrayBuffer());
      if(buf.length<10000) throw new Error("short "+buf.length);
      await writeFile(OUT+file,buf);
      console.log("OK ",file,(buf.length/1024).toFixed(0)+"KB"); return;
    }catch(e){ if(a===3) console.log("FAIL",file,String(e).slice(0,90)); }
  }
}
const jobs=[
  ...VERTICALS.map(b=>({id:b.id,prompt:b.prompt,size:"portrait_16_9",file:`${b.id}-vertical.png`})),
  ...NEW.map(b=>({id:b.id,prompt:b.prompt,size:b.shape,
    file:`${b.id}-${b.shape==="square_hd"?"square":"vertical"}.png`})),
];
console.log("rendering",jobs.length,"banners");
await Promise.all(jobs.map(j=>make(j.id,j.prompt,j.size,j.file)));
console.log("banner wave 2 complete");
