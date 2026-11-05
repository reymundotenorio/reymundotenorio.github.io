import{execFileSync}from'node:child_process';
import{writeFileSync}from'node:fs';
import{BASE_URL,QA_OUTPUT}from'../tests/browser/helpers.mjs';
const scripts=['intro.mjs','regressions.mjs','revision-tests.mjs','stack-ai-tests.mjs','project-pages-tests.mjs','case-qa.mjs','qa.mjs','compact-demo.mjs','prompt-caret.mjs','auto-proof.mjs'],results=[];
const response=await fetch(`${BASE_URL}/en/`).catch(()=>null);
if(!response?.ok)throw new Error(`Start the site before browser tests: pnpm dev --port 4331, or set PORTFOLIO_BASE_URL. Target: ${BASE_URL}`);
for(const script of scripts){
 try{execFileSync(process.execPath,[new URL(`../tests/browser/${script}`,import.meta.url).pathname],{stdio:'inherit'});results.push({script,pass:true});}
 catch(error){results.push({script,pass:false});process.exitCode=1;break;}
}
writeFileSync(new URL('browser-summary.json',QA_OUTPUT),JSON.stringify({baseURL:BASE_URL,verifiedAt:new Date().toISOString(),results},null,2));
console.log(JSON.stringify({passed:results.filter(result=>result.pass).length,total:scripts.length,evidence:QA_OUTPUT.pathname}));
