import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { codeInspectorPlugin } from 'code-inspector-plugin';
import extractorSvelte from '@unocss/extractor-svelte';
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import UnoCSS from 'unocss/vite';
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  return {
    server: {
      port: 8000,
      open: true,
    },
    plugins: [
      UnoCSS({
        extractors: [extractorSvelte()],
      }),
      sveltekit(),
      paraglideVitePlugin({
        project: './project.inlang',
        outdir: './src/lib/paraglide',
        strategy: ['url', 'cookie', 'globalVariable', 'baseLocale'],
      }),
      isDev && codeInspectorPlugin({ bundler: 'vite' }),
    ].filter(Boolean),
  };
});
