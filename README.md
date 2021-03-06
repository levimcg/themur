# Themur.js
A lightweight vanilla JS theme switcher with support for `localStorage` and the `prefers-color-scheme` media query.

[**Demo**](https://levimcg.github.io/themur/)

## Getting started
The easiest way to use Themur is to include it in a `<script>` tag on your site via the [jsDelivr CDN](https://cdn.jsdelivr.net/npm/themur@latest/dist/themur.min.js):

```html
<script src="https://cdn.jsdelivr.net/npm/themur@latest/dist/themur.min.js"></script>
```

Then add a `button` element to you page that will be used to control toggling themes.

🚨 It's important to note the `hidden` attribute here. Themur will remove this attribute so that the button is visible as long as JavaScript is available. In the event that JavaScript isn't available the button will be hidden since Themur would no longer function anyway.

```html
<button id="my-theme-toggle" hidden>
```

### Using as a module
If you are using a module bundling system like [Webpack](https://webpack.js.org/), Themur is also available as an ES6 module you can include in your project. After you've added Themur as a dependency to your project using [npm](https://www.npmjs.com/) you can then `import` it into your project like any other module:

```js
import Themur from 'themur';

const themeSwitcher = new Themur({
  /* options */
});
```

## Options
The `Themur` instance takes one argument, an `Object` with the following options:

- `toggleElement`: `HTMLButtonElement` | _**required**_
- `containerElement`: `HTMLElement` | default: `document.body`,
- `themeClass`: `String` | default: `my-theme`,
- `storageKey`: `String` | default: 'themeEnabled',
- `useLocalStorage`: `Boolean` | default: `false`

## API Methods
There are a couple of methods available on the Themur instance that you can use programmatically in your own scripts if needed.

- `enableTheme()` - Enables the theme. This will add the `themeClass` to the `containerElement` and set the `storageKey` to `"true"` if have the `useLocalStorage` set to `true`.
- `disableTheme()` - disables the theme. This will remove the `themeClass` from the `containerElement` and set the `storageKey` to `"false"` if have the `useLocalStorage` set to `true`.

### API usage
```javascript
// Create a new Themur instance.
const switcher = new Themur({
  // Options...
});

// Later in your script programmatically activate your theme.
switcher.enableTheme(); 

// Later in your script deactivate your theme.
switcher.disableTheme(); 
```

### User preferred theme settings
Themur will first check for a users theme OS preferences by using `window.matchMedia()`. If the `useLocalStorage` Themur option is set to `true` it will store the user's preference in `localStorage`. This means that if the user has their OS dark theme enabled it will set the storage key to `"true"`.

### About using localStorage
Themur comes with an configuration option that allows you to use the browser's [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) API to persist theme selection. When the `useLocalStorage` option is set to `true` Themur will save users' theme choice in `localStorage` persisting their theme choice for your site from page view to page view, and even visit to visit.

## Example
The Themur instance requires only one option, `toggleElement`. The `toggleElement` should be an button element that will be used to switch themes. The rest of the options default to the ones listed above.

### 1. Add the HTML to your page:
```html
<button id="theme-switcher">Select theme</button>
```

### 2. Create a new instance of Themur with your options:
```js
const theme = new Themur({
  toggleElement: document.getElementById('theme-switcher'),
  themeClass: 'dark-theme',
  useLocalStorage: true
});
```

By default Themur will use `document.body` to add/remove a CSS class that you can use as a hook to specify styles for your alternate theme. In [this demo](https://levimcg.github.io/themur/), I'm using [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) to easily update the styles for the "Dark theme" specified in the configuration above.

```css
:root {
  --color-bg: #ffffff;
  --color-text: #2c2e3d;
}

.dark-theme {
  --color-bg: #2c2e3d;
  --color-text: #ffffff;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
}
```