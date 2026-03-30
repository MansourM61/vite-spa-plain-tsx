# Vite+Plain+TSX

Frontend vanilla TypeScript based on Vite with support of TSX

## Scaffolding Steps

1. Initial VSCode related files (`extensions.json` and `settings.json`) are added.
2. Git repos is created (commit: `Git repos is created.`).
3. Vite build tool is installed (commit: `Vite build tool is installed.`).
4. Plugins `vite-plugin-inspect` and `unplugin-turbo-console` are added (commit: `Vite plugins are added.`).
5. Tailwind CSS is added to the development pipeline (commit: `Tailwind CSS is added.`).
6. Biome as linter and formatter with git hook is setup (commit: `Biome and git hook is setup.`).
7. Biome configuration is added (commit: `Biome configuration is added.`).
8. Landing page with interactive UI is created (commit: `Landing page is created.`).
9. Multi-page app is created (landing page and about page) (commit: `Multi-page entry is created.`).
10. The app is turned back into SPA (commit: `App is turned into a SPA.`).
11. .env files are added for the app configuration. (commit: `.env files are added.`).
12. Vite configuration is documented and enhanced with more customisation (commit: `Vite configuration is tidied up.`).
13. Support for JSX syntax is added (commit: `JSX feature is added.`).
14. Data fetching and interaction with API's endpoint is added (commit: `Interaction with API is added.`).
15. Vitest support is added (commit: `Vitest support is added.`).
16. Playwright support is added (commit: `Playwright support is added.`).
17. Test bugs are fixed (commit: `Test bugs are fixed.`).
18. Documentation based on TypeDoc is added (commit: `TypeDoc documentation is added.`).
19. The deleted text files are revived. (commit: `The missing test files are restored.`).
20. The root and env directories are hardcoded and `README.md` file documentation is updated (commit: `README.md is updated.`).

## Instruction

1. All library files are placed in `src/lib`, and can be imported using `@lib/` prefix.
2. JSX components are located in `src/components`, and accessed by `@components/` prefix in the main script.
3. Tailwind CSS, TypeDoc, and Playwright are available (see **package.json** for the available scripts).
4. The package `concurrently` is not terminating all processes in Windows OS. So the **Node.js** runtime must be terminated manually after running `dev+mock` script.
