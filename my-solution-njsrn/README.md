# Turborepo Project

This is a monorepo containing a Next.js web application and an Expo (React Native) mobile application, managed by [Turborepo](https://turbo.build/repo).

## Scripts

The following scripts are available in the root `package.json`:

| Script | Command | Description |
| :--- | :--- | :--- |
| `build` | `turbo build` | Builds all apps and packages in the monorepo. |
| `dev` | `turbo dev` | Runs all apps in development mode simultaneously. |
| `dev:web` | `turbo dev --filter=@repo/web` | Runs only the Next.js web application in development mode. |
| `dev:native` | `turbo dev --filter=@repo/native` | Runs only the Expo mobile application in development mode. |
| `lint` | `turbo lint` | Lints all files in the monorepo using ESLint. |
| `format` | `turbo format` | Formats all files in the monorepo using Prettier. |
| `type-check` | `turbo type-check` | Runs TypeScript type checking across all packages. |
| `clean` | `turbo clean && rimraf node_modules` | Cleans build artifacts and removes all `node_modules` folders. |

## Apps and Packages

- `apps/web`: A [Next.js](https://nextjs.org/) web application (@repo/web).
- `apps/native`: An [Expo](https://expo.dev/) mobile application (@repo/native).
- `packages/eslint-config`: Shared ESLint configurations (@repo/eslint-config).
- `packages/typescript-config`: Shared TypeScript configurations (@repo/typescript-config).

## What's inside?

Each app and package is 100% [TypeScript](https://www.typescriptlang.org/). Shared configurations ensure consistency across the codebase.

### Build

To build all apps and packages:
```sh
npm run build
```

### Develop

To start all apps in development mode:
```sh
npm run dev
```

To develop a specific app (e.g., web):
```sh
npm run dev:web
```

### Update

To update the dependencies of all apps and packages:
```sh
pnpm up -r --latest
```