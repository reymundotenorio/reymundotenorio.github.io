import{chromium}from'@playwright/test';
import{mkdirSync}from'node:fs';
import{pathToFileURL}from'node:url';
import{resolve}from'node:path';
export const BASE_URL=(process.env.PORTFOLIO_BASE_URL||'http://127.0.0.1:4331').replace(/\/$/,'');
export const QA_OUTPUT=pathToFileURL(`${resolve(process.env.PORTFOLIO_QA_OUTPUT||'/tmp/portfolio-qa')}/`);
mkdirSync(QA_OUTPUT,{recursive:true});
export const launchBrowser=()=>chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH?{executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH}:{})});
