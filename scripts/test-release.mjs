import{spawn}from'node:child_process';
import{once}from'node:events';
const port=process.env.PORTFOLIO_PREVIEW_PORT||'4331',base=`http://127.0.0.1:${port}`;
if(await fetch(`${base}/en/`).catch(()=>null))throw new Error(`Port ${port} is already in use. Set PORTFOLIO_PREVIEW_PORT to an unused port.`);
const server=spawn(process.execPath,[new URL('../node_modules/astro/bin/astro.mjs',import.meta.url).pathname,'preview','--ignore-lock','--host','127.0.0.1','--port',port],{stdio:['ignore','pipe','pipe']});
server.stdout.pipe(process.stdout);server.stderr.pipe(process.stderr);
try{
 let ready=false;
 for(let i=0;i<100;i++){
  if(server.exitCode!==null)throw new Error('Static preview exited before it became ready.');
  const response=await fetch(`${base}/en/`).catch(()=>null);if(response?.ok){ready=true;break;}
  await new Promise(resolve=>setTimeout(resolve,200));
 }
 if(!ready)throw new Error('Static preview did not become ready.');
 const tests=spawn(process.execPath,[new URL('test-browser.mjs',import.meta.url).pathname],{stdio:'inherit',env:{...process.env,PORTFOLIO_BASE_URL:base}});
 const[code]=await once(tests,'exit');process.exitCode=code??1;
}finally{
 if(server.exitCode===null&&server.signalCode===null){const exit=once(server,'exit');server.kill('SIGTERM');await exit;}
}
