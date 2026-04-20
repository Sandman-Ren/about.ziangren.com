import { cpSync, existsSync } from 'node:fs';

for (const file of ['_headers', '_redirects']) {
  const src = `public/${file}`;
  const dst = `out/${file}`;
  if (existsSync(src)) {
    cpSync(src, dst);
    console.log(`[cf-config] copied ${src} -> ${dst}`);
  }
}
