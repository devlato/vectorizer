import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import pckg from './package.json';

const isProduction = process.env.NODE_ENV === 'production';

const rollupPlugins = () => [
  typescript(),
  commonjs({ extensions: [/.js$/, /\.tsx?$/] }),
  ...(isProduction ? [terser()] : []),
];

const banner = () =>
  [
    `/**`,
    ` * ${pckg.name} ${pckg.version}`,
    ` * ${pckg.description}`,
    ` * ${pckg.homepage}`,
    ` * (c) ${pckg.author}, under the ${pckg.license} license`,
    ` */`,
  ].join('\n');

const buildTarget = ({ entryPoint, title }) => ({
  input: entryPoint,
  output: {
    dir: 'dist',
    format: 'umd',
    name: title,
    sourcemap: true,
    banner: banner(),
    compact: true,
  },
  plugins: rollupPlugins(),
});

export default [
  buildTarget({
    entryPoint: 'src/index.tsx',
    title: 'Main JS bundle',
  }),
  buildTarget({
    entryPoint: 'src/webworker.ts',
    title: 'WebWorker JS bundle',
  }),
];
