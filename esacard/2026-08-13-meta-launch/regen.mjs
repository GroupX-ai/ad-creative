import { BANNERS } from "./prompts.mjs";
import { writeFile, stat } from "node:fs/promises";
const KEY = process.env.FAL_KEY;
const OUT = new URL("./", import.meta.url).pathname;
const SHAPES = [["square","square_hd"],["vertical","portrait_16_9"]];
async function run(model,payload){
  const sub=await fetch(`https://queue.fal.run/${model}`,{method:"POST",
    headers:{Authorization:"Key "+KEY,"Content-Type":"application/json"},body:JSON.stringify(payload)});
  const q=await sub.json();
  for(let i=0;i<200;i++){await new Promise(r=>setTimeout(r,4000));
    const s=await(await fetch(q.status_url,{headers:{Authorization:"Key "+KEY}})).json();
    if(s.status==="COMPLETED") return (await fetch(q.response_url,{headers:{Authorization:"Key "+KEY}})).json();
    if(s.status==="FAILED") throw new Error("failed");}
  throw new Error("timeout");
}
async function bytes(f){ try { return (await stat(OUT+f)).size; } catch { return 0; } }
const todo=[];
for(const b of BANNERS) for(const [shape,size] of SHAPES){
  const f=`${b.id}-${shape}.png`;
  if(await bytes(f) < 10000) todo.push({b,shape,size,f});
}
console.log("re-rendering",todo.length,"banners");
for(const t of todo){
  for(let attempt=1; attempt<=3; attempt++){
    try{
      const d=await run("openai/gpt-image-2",{prompt:t.b.prompt,image_size:t.size,quality:"high",num_images:1});
      const url=d.images?.[0]?.url; if(!url) throw new Error("no url");
      const r=await fetch(url); const buf=Buffer.from(await r.arrayBuffer());
      if(buf.length<10000) throw new Error("short download "+buf.length);
      await writeFile(OUT+t.f,buf);
      console.log("OK ",t.f,(buf.length/1024).toFixed(0)+"KB"); break;
    }catch(e){ console.log("attempt",attempt,"failed for",t.f,String(e).slice(0,90));
      if(attempt===3) console.log("GAVE UP",t.f); }
  }
}
