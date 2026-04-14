import { defineConfig, presetAttributify } from 'unocss';
import { presetWind3 } from 'unocss';

export default defineConfig({
  presets: [presetWind3, presetAttributify()],
});
