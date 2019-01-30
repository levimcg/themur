# Themur.js
A lightweight vanilla JS theme switcher with support for localStorage

[Demo](https://levimcg.github.io/themur/)

## Example usage
The Themur instance requires only one options, `toggleElement`. The `toggleElement` should be an button element that will be used to switch themes.

```js
const theme = new Themur({
  toggleElement: document.getElementById('theme-switcher'),
  themeClass: 'dark-theme',
  useLocalStorage: true
});
```