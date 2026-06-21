# ts-sdks-poc — authorized reproduction of the MystenLabs/ts-sdks release pipeline

> **Not affiliated with Mysten Labs.** This repository exists solely to
> demonstrate, in an environment the reporter fully controls, a supply-chain
> vulnerability reported to Mysten Labs via HackerOne. No Mysten Labs
> infrastructure is touched. The package published here lives under a scope the
> reporter owns and contains no malicious payload — only a benign "PWN PROOF"
> marker printed to the Actions log.

## What this is

The four workflow files under `.github/workflows/` reproduce Mysten Labs'
release pipeline at commit `e81f0bf483c54e45d905224f5267ce5fa136c261`:

| File | vs. upstream |
|------|--------------|
| `release.yml` | identical except the package-scope regex (`@mysten` → reporter scope) |
| `release-sui.yml` | identical except the package name/scope |
| `_release-package.yml` | **byte-identical** |
| `turborepo.yml` | minimal stand-in (only needs to trigger on `pull_request` and finish `success`) |

## The chain (see `../RUNBOOK.md`)

A fork PR whose **source branch is named `main`** satisfies
`release.yml`'s `workflow_run.branches: [main]` filter. When the fork's
Turborepo CI finishes successfully, the privileged orchestrator runs, checks out
the **attacker's** `head_sha`, and dispatches the per-package publisher with
`ref=<attacker_sha>`. The publisher checks out attacker code and runs
`pnpm --filter "<pkg>..." --if-present run build` — executing the attacker's
`package.json` build script — then `pnpm publish` with `id-token: write` and
provenance enabled.
