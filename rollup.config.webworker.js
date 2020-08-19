import { banner, rollupPlugins } from './rollup-utils';

export default {
  input: 'src/webworker.ts',
  output: {
    dir: 'dist',
    format: 'umd',
    name: 'WebWorker JS bundle',
    sourcemap: true,
    banner: banner(),
    compact: true,
  },
  plugins: rollupPlugins(),
};
