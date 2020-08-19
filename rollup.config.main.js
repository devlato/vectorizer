import { banner, rollupPlugins } from './rollup-utils';

export default {
  input: 'src/index.tsx',
  output: {
    dir: 'dist',
    format: 'umd',
    name: 'Main JS bundle',
    sourcemap: true,
    banner: banner(),
    compact: true,
  },
  plugins: rollupPlugins(),
};
