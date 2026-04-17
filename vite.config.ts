import { paraglideVitePlugin } from '@inlang/paraglide-js';
import extractorSvelte from '@unocss/extractor-svelte';
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import UnoCSS from 'unocss/vite';
export default defineConfig(() => {
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
    ],
  };
});
