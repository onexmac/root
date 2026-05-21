import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../react/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  // Serve `public/` at the Storybook root so iframe.html can resolve
  // /apple-touch-icon.png, /manifest.webmanifest, etc. iOS Safari reads
  // these as absolute paths when the user does "Add to Home Screen".
  // Icons are regenerated via `npm run icons` (which reads the canonical
  // SVG at ~/Desktop/adelante-icon.svg). Per ICON.md.
  "staticDirs": ["../public"],
  "framework": "@storybook/react-vite",
  async viteFinal(config) {
    const basePath = process.env.STORYBOOK_BASE_PATH;

    if (basePath) {
      config.base = basePath;
    }

    // Plugin post-enforce: fija nombres estables (sin hash) en los chunks.
    // Evita "Failed to fetch dynamically imported module" en GitHub Pages cuando
    // el browser cachea iframe.html viejo con hashes que ya no existen en el servidor.
    config.plugins = [
      ...(Array.isArray(config.plugins) ? config.plugins : []),
      {
        name: 'stable-chunk-names',
        enforce: 'post' as const,
        configResolved(resolved) {
          const patch = {
            chunkFileNames: 'assets/[name].js',
            entryFileNames: 'assets/[name].js',
          };
          const out = resolved.build?.rollupOptions?.output;
          if (Array.isArray(out)) {
            out.forEach(o => Object.assign(o, patch));
          } else if (out && typeof out === 'object') {
            Object.assign(out, patch);
          } else {
            resolved.build = resolved.build ?? {};
            resolved.build.rollupOptions = resolved.build.rollupOptions ?? {};
            (resolved.build.rollupOptions as Record<string, unknown>).output = patch;
          }
        },
      },
    ];

    return config;
  }
};
export default config;