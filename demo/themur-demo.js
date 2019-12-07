/*!
 * themur - @version 0.3.1
 * Copyright (C) 2019 Levi McGranahan
 * MIT License
 */ 

var Themur = (function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  var Themur =
  /*#__PURE__*/
  function () {
    function Themur(options) {
      _classCallCheck(this, Themur);

      // Set up a default options object
      var defaults = {
        containerElement: document.body,
        themeClass: 'my-theme',
        storageKey: 'themeEnabled',
        useLocalStorage: false
      };
      /**
       * Merge the defaults and any user settings
       */

      var settings = _objectSpread({}, defaults, options);

      this.containerElement = settings.containerElement;
      this.toggleElement = settings.toggleElement;
      this.themeClass = settings.themeClass;
      this.storageKey = settings.storageKey;
      this.useLocalStorage = settings.useLocalStorage; // The toggle element (button) is the only required option

      if (!this.toggleElement) {
        console.error('You must provide a toggle element for the switcher');
        return;
      }

      if (!this.useLocalStorage) {
        this.themeIsEnabled = this.prefersDarkTheme();
      } else {
        var storageIsSet = localStorage.getItem(this.storageKey);

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
      this.updateDOM = this.updateDOM.bind(this); // Attach event listeners

      this.toggleElement.addEventListener('click', this.handleClick, false);
    }

    _createClass(Themur, [{
      key: "prefersDarkTheme",
      value: function prefersDarkTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches.toString();
      }
    }, {
      key: "setUpInitialState",
      value: function setUpInitialState() {
        // Add ARIA semantics and role to toggle element if JS is available
        this.toggleElement.setAttribute('aria-pressed', this.themeIsEnabled);
        this.toggleElement.removeAttribute('hidden');

        if (this.themeIsEnabled === 'true') {
          this.containerElement.classList.add(this.themeClass);
        }
      }
    }, {
      key: "updateDOM",
      value: function updateDOM(newValue) {
        // Update the value of the aria-checked
        this.toggleElement.setAttribute('aria-pressed', newValue); // Toggle the theme class on the container element

        this.containerElement.classList.toggle(this.themeClass);
      }
    }, {
      key: "enableTheme",
      value: function enableTheme() {
        // Check to make sure localStorage usage is enabled
        if (this.useLocalStorage) {
          // Set theme enabled localStorage variable to 'true'
          localStorage.setItem(this.storageKey, 'true');
        }

        this.updateDOM('true');
      }
    }, {
      key: "disableTheme",
      value: function disableTheme() {
        if (this.useLocalStorage) {
          localStorage.setItem(this.storageKey, 'false');
        }

        this.updateDOM('false');
      }
    }, {
      key: "handleClick",
      value: function handleClick() {
        if (this.useLocalStorage) {
          localStorage.getItem(this.storageKey) === 'false' ? this.enableTheme() : this.disableTheme();
        } else {
          var isEnabled = this.toggleElement.getAttribute('aria-pressed');
          isEnabled === 'true' ? this.disableTheme() : this.enableTheme();
        }
      }
    }]);

    return Themur;
  }();

  return Themur;

}());
