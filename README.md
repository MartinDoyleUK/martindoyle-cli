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

Publishing is done by the `Publish to npm` workflow (`.github/workflows/publish.yml`) when a GitHub release is published. It authenticates with [npm trusted publishing](https://docs.npmjs.com/trusted-publishers), so there is no npm token, and npm adds provenance to each version.

1. In a pull request, bump the version without tagging: `npm version patch --no-git-tag-version` (or `minor` / `major`). Merge it.
2. Create the release from `main`, tagged `v` plus the new version: `gh release create v1.0.12 --target main --generate-notes`.
3. The workflow checks that the tag matches `package.json` and is on `main`, then lints, builds and publishes.

The trusted publisher is configured on npmjs.com (package `martindoyle` → *Settings* → *Trusted Publisher*): GitHub Actions, user `MartinDoyleUK`, repository `martindoyle-cli`, workflow `publish.yml`, no environment. Renaming the repository or the workflow file breaks publishing until it is updated there.

Use plain `x.y.z` versions: the workflow has no way to publish to a dist-tag other than `latest`. The old `v1.1.0` tag points at a commit that never reached `main` (npm's latest is 1.0.11), so the workflow refuses it; release the next version as `v1.0.12` or `v1.1.1`, not `v1.1.0`.
