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
    const settings = Object.assign({}, defaults, options);

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

    // Check to make sure the use want to use localStorage
    if (this.useLocalStorage) {
      // Check to see if the theme is enabled in localStorage
      this.themeIsEnabled = localStorage.getItem(this.storageKey);

      if (!this.themeIsEnabled) {
        localStorage.setItem(this.storageKey, 'false');

        this.themeIsEnabled = localStorage.getItem(this.storageKey);
      }
    } else {
      this.themeIsEnabled = 'false';
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

  setUpInitialState() {
    // Add ARIA semantics and role to toggle element if JS is available
    this
      .toggleElement
      .setAttribute('aria-checked', this.themeIsEnabled);
      
    this
      .toggleElement
      .setAttribute('role', 'switch');

    if (this.themeIsEnabled === 'true') {
      this.containerElement.classList.add(this.themeClass);
    }
  }

  updateDOM(newValue) {
    // Update the value of the aria-checked
    this.toggleElement.setAttribute('aria-checked', newValue);

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
        this.toggleElement.getAttribute('aria-checked');

      isEnabled === 'true' ?
        this.disableTheme() :
        this.enableTheme();
    }
  }
}