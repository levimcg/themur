class ThemeSwitcher {
  constructor(options) {
    // Set up a default options object
    const defaults = {
      containerElement: document.body,
      themeClass: 'my-theme',
      storageKey: 'themeEnabled',
      useLocalStorage: false
    }

    // Merge the defaults and any user settings
    const settings = Object.assign({}, defaults, options);

    this.containerElement = settings.containerElement;
    this.toggleElement = settings.toggleElement;
    this.themeClass = settings.themeClass;
    this.storageKey = settings.storageKey;

    if (!this.toggleElement) {
      console.error('You must provide a toggle element for the switcher');
      return;
    }

    // Check to see if the theme is enabled in localStorage
    this.themeIsEnabled = localStorage.getItem(this.storageKey);

    if (!this.themeIsEnabled) {
      localStorage.setItem(this.storageKey, 'false');

      this.themeIsEnabled = localStorage.getItem(this.storageKey);
    }

    // Add ARIA semantics and role to toggle element if JS is available
    this.toggleElement.setAttribute('aria-checked', this.themeIsEnabled);
    this.toggleElement.setAttribute('role', 'switch');

    if (this.themeIsEnabled === 'true') {
      this.containerElement.classList.add(this.themeClass);
    }

    // Bind methods
    this.enableTheme = this.enableTheme.bind(this);
    this.disableTheme = this.disableTheme.bind(this);
    this.handleClick = this.handleClick.bind(this);

    // Attach event listeners
    this.toggleElement.addEventListener('click', this.handleClick, false);
  }

  enableTheme() {
    localStorage.setItem(this.storageKey, 'true');

    this.toggleElement.setAttribute('aria-checked', 'true');

    this.containerElement.classList.add(this.themeClass);
  }

  disableTheme() {
    localStorage.setItem(this.storageKey, 'false');

    this.toggleElement.setAttribute('aria-checked', 'false');

    this.containerElement.classList.remove(this.themeClass);
  }

  handleClick() {
    localStorage.getItem(this.storageKey) === 'false' ?
      this.enableTheme() :
      this.disableTheme();
  }
}