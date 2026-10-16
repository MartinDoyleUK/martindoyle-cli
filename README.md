# Martin Doyle's CLI

## Introduction

This repository contains the code for **@MartinDoyleUK**'s CLI, which is a quick info-card that can be accessed using the terminal.

## Usage

By default you can run the following to use the CLI.
```sh
npx martindoyle
```

To always run the latest, and remove any prompts, run the following.
```
npx -y martindoyle@latest
```

## Example

![image](https://github.com/MartinDoyleUK/martindoyle-cli/assets/2427267/703298c7-9f8d-4890-ad7b-6f100ba8c1cf)

## Development

```sh
yarn install --frozen-lockfile
yarn lint
yarn build
yarn start
```

The `CI` workflow runs the same lint and build, then prints the card, on every pull request and every push to `main`.

## Releasing

Publishing is done by the `Publish to npm` workflow (`.github/workflows/publish.yml`) when a GitHub release is published. It authenticates with [npm trusted publishing](https://docs.npmjs.com/trusted-publishers), so there is no npm token, and npm adds provenance to each version. The workflow only **stages** the version ([`npm stage publish`](https://docs.npmjs.com/cli/commands/npm-stage)); nothing is public until a maintainer approves it with 2FA.

1. In a pull request, bump the version without tagging: `npm version patch --no-git-tag-version` (or `minor` / `major`). Merge it.
2. From an up-to-date `main` checkout, create the release, tagged `v` plus the version in `package.json`: `gh release create "v$(node -p 'require("./package.json").version')" --target main --generate-notes`. The workflow refuses a tag that does not match.
3. The workflow checks that the tag matches `package.json` and is on `main`, then lints, builds and stages the version. Its log ends with the stage ID.
4. Approve the staged version on npmjs.com, or with `npm stage approve <stage-id>` (npm 11.15.0 or later, logged in; it prompts for 2FA). `npm stage list martindoyle` shows what is waiting.

The trusted publisher is configured on npmjs.com (package `martindoyle` → *Settings* → *Trusted publishing* → *Add trusted publisher*): GitHub Actions, user `MartinDoyleUK`, repository `martindoyle-cli`, workflow `publish.yml`, no environment. Its *Allowed actions* need only `npm stage publish` (the default for configurations created after 2026-09-03); leaving `npm publish` off means a leaked workflow run can never publish without your approval. Renaming the repository or the workflow file breaks publishing until it is updated there.

Use plain `x.y.z` versions and normal releases: every approved version becomes npm's `latest`, so the workflow skips releases marked as a prerelease on GitHub. The workflow also refuses a tag whose commit is not on `main`.
