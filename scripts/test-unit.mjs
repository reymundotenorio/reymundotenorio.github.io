import { readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const buildTests = new Set([
  'static-output.test.mjs',
  'prompt-static.test.mjs',
  'performance-budget.test.mjs'
]);
const files = readdirSync(new URL('../tests/', import.meta.url))
  .filter(
    (name) =>
      name.endsWith('.test.mjs') && !name.endsWith('.static.test.mjs') && !buildTests.has(name)
  )
  .map((name) => fileURLToPath(new URL(`../tests/${name}`, import.meta.url)));
const result = spawnSync(process.execPath, ['--test', ...files], { stdio: 'inherit' });
process.exit(result.status ?? 1);
