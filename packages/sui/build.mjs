// Genuine (benign) build for the PoC package. The attacker overlay REPLACES the
// `scripts.build` that invokes this with arbitrary code — that is the whole bug.
import { mkdirSync, writeFileSync } from 'node:fs';

mkdirSync('dist', { recursive: true });
writeFileSync('dist/index.js', "export const hello = () => 'hello from @sectest7331/sui';\n");
writeFileSync('dist/index.d.ts', 'export declare const hello: () => string;\n');
console.log('built dist/index.js');
