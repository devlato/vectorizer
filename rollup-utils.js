import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import pckg from './package.json';

const isProduction = process.env.NODE_ENV === 'production';

export const rollupPlugins = () => [
  typescript(),
  commonjs({ extensions: [/.js$/, /\.tsx?$/] }),
  ...(isProduction ? [terser()] : []),
];

export const banner = () =>
  [
    `/**`,
    ` * ${pckg.name} ${pckg.version}`,
    ` * ${pckg.description}`,
    ` * ${pckg.homepage}`,
    ` * (c) ${pckg.author}, under the ${pckg.license} license`,
    ` */`,
  ].join('\n');
