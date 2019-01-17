import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

module.exports = {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/theme-switcher.umd.js',
      name: 'ThemeSwitcher',
      format: 'umd'
    },
    {
      file: 'dist/theme-switcher.esm.js',
      name: 'ThemeSwitcher',
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