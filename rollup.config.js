import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const banner = `/*!
 * ${pkg.name} - @version ${pkg.version}
 * Copyright (C) 2019 ${pkg.author}
 * ${pkg.license} License
 */ 
`;

module.exports = {
  input: 'src/index.js',
  output: [
    {
      banner,
      file: pkg.main,
      name: 'Themur',
      format: 'umd'
    },
    {
      banner,
      file: pkg.module,
      format: 'esm'
    },
    {
      banner,
      file: pkg.browser,
      name: 'Themur',
      format: 'iife'
    }
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
};