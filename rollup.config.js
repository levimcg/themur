import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

module.exports = {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/themur.umd.js',
      name: 'Themur',
      format: 'umd'
    },
    {
      file: 'dist/themur.esm.js',
      name: 'Themur',
      format: 'esm'
    },
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
};