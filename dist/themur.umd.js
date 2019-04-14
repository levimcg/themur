/*!
 * themur - @version 0.2.1
 * Copyright (C) 2019 Levi McGranahan
 * MIT License
 */ 

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Themur = factory());
}(this, function () { 'use strict';

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

      var settings = Object.assign({}, defaults, options);
      this.containerElement = settings.containerElement;
      this.toggleElement = settings.toggleElement;
      this.themeClass = settings.themeClass;
      this.storageKey = settings.storageKey;
      this.useLocalStorage = settings.useLocalStorage; // The toggle element (button) is the only required option

      if (!this.toggleElement) {
        console.error('You must provide a toggle element for the switcher');
        return;
      } // Check to make sure the use want to use localStorage


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
      this.updateDOM = this.updateDOM.bind(this); // Attach event listeners

      this.toggleElement.addEventListener('click', this.handleClick, false);
    }

    _createClass(Themur, [{
      key: "setUpInitialState",
      value: function setUpInitialState() {
        // Add ARIA semantics and role to toggle element if JS is available
        this.toggleElement.setAttribute('aria-checked', this.themeIsEnabled);
        this.toggleElement.setAttribute('role', 'switch');

        if (this.themeIsEnabled === 'true') {
          this.containerElement.classList.add(this.themeClass);
        }
      }
    }, {
      key: "updateDOM",
      value: function updateDOM(newValue) {
        // Update the value of the aria-checked
        this.toggleElement.setAttribute('aria-checked', newValue); // Toggle the theme class on the container element

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
          var isEnabled = this.toggleElement.getAttribute('aria-checked');
          isEnabled === 'true' ? this.disableTheme() : this.enableTheme();
        }
      }
    }]);

    return Themur;
  }();

  return Themur;

}));
