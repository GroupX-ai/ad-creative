import { VIDEOS } from "./prompts-video.mjs";
import { writeFile } from "node:fs/promises";
const KEY=process.env.FAL_KEY; const OUT=new URL("./",import.meta.url).pathname;
async function run(payload){
  const sub=await fetch("https://queue.fal.run/bytedance/seedance-2.5/text-to-video",{method:"POST",
    headers:{Authorization:"Key "+KEY,"Content-Type":"application/json"},body:JSON.stringify(payload)});
  const q=await sub.json(); if(!q.request_id) throw new Error("submit "+JSON.stringify(q).slice(0,150));
  for(let i=0;i<250;i++){await new Promise(r=>setTimeout(r,10000));
    const s=await(await fetch(q.status_url,{headers:{Authorization:"Key "+KEY}})).json();
    if(s.status==="COMPLETED") return (await fetch(q.response_url,{headers:{Authorization:"Key "+KEY}})).json();
    if(s.status==="FAILED") throw new Error("failed");}
  throw new Error("timeout");
}
await Promise.all(VIDEOS.map(async v=>{
  try{
    const d=await run({prompt:v.prompt,aspect_ratio:"9:16",resolution:"720p",duration:15});
    const url=d.video?.url||d.videos?.[0]?.url; if(!url) throw new Error("no url");
    const buf=Buffer.from(await(await fetch(url)).arrayBuffer());
    await writeFile(OUT+v.id+".mp4",buf);
    console.log("OK ",v.id,(buf.length/1024/1024).toFixed(1)+"MB");
  }catch(e){ console.log("FAIL",v.id,String(e).slice(0,120)); }
}));
