export default class Themur {
  constructor(options) {
    // Set up a default options object
    const defaults = {
      containerElement: document.body,
      themeClass: 'my-theme',
      storageKey: 'themeEnabled',
      useLocalStorage: false
    };

    /**
     * Merge the defaults and any user settings
     */
    const settings = {
      ...defaults,
      ...options
    };

    this.containerElement = settings.containerElement;
    this.toggleElement = settings.toggleElement;
    this.themeClass = settings.themeClass;
    this.storageKey = settings.storageKey;
    this.useLocalStorage = settings.useLocalStorage;
    
    // The toggle element (button) is the only required option
    if (!this.toggleElement) {
      console.error('You must provide a toggle element for the switcher');
      return;
    }

    if (!this.useLocalStorage) {
      this.themeIsEnabled = this.prefersDarkTheme();
    } else {
      const storageIsSet = localStorage.getItem(this.storageKey);
      if (!storageIsSet) {
        localStorage.setItem(this.storageKey, this.prefersDarkTheme());
      }
      this.themeIsEnabled = localStorage.getItem(this.storageKey);
    }

    this.setUpInitialState();

    /**
     * Bind class methods to the instance
     */
    this.enableTheme = this.enableTheme.bind(this);
    this.disableTheme = this.disableTheme.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateDOM = this.updateDOM.bind(this);

    // Attach event listeners
    this
      .toggleElement
      .addEventListener('click', this.handleClick, false);
  }
  
  prefersDarkTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches.toString();
  }

  setUpInitialState() {
    // Add ARIA semantics and role to toggle element if JS is available
    this.toggleElement.setAttribute('aria-pressed', this.themeIsEnabled);
    this.toggleElement.removeAttribute('hidden');

    if (this.themeIsEnabled === 'true') {
      this.containerElement.classList.add(this.themeClass);
    }
  }

  updateDOM(newValue) {
    // Update the value of the aria-checked
    this.toggleElement.setAttribute('aria-pressed', newValue);

    // Toggle the theme class on the container element
    this.containerElement.classList.toggle(this.themeClass);
  }

  enableTheme() {
    // Check to make sure localStorage usage is enabled
    if (this.useLocalStorage) {
      // Set theme enabled localStorage variable to 'true'
      localStorage.setItem(this.storageKey, 'true');
    }

    this.updateDOM('true');
  }

  disableTheme() {
    if (this.useLocalStorage) {
      localStorage.setItem(this.storageKey, 'false');
    }

    this.updateDOM('false');
  }

  handleClick() {
    if (this.useLocalStorage) {
      localStorage.getItem(this.storageKey) === 'false' ?
        this.enableTheme() :
        this.disableTheme();
    } else {
      const isEnabled =
        this.toggleElement.getAttribute('aria-pressed');

      isEnabled === 'true' ?
        this.disableTheme() :
        this.enableTheme();
    }
  }
}