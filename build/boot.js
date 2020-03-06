(function() {var require=("function"==typeof hypothesisRequire&&hypothesisRequire);(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _require = require('../shared/polyfills'),
    requiredPolyfillSets = _require.requiredPolyfillSets;

function injectStylesheet(doc, href) {
  var link = doc.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = href;
  doc.head.appendChild(link);
}

function injectScript(doc, src) {
  var script = doc.createElement('script');
  script.type = 'text/javascript';
  script.src = src; // Set 'async' to false to maintain execution order of scripts.
  // See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script

  script.async = false;
  doc.head.appendChild(script);
}

function injectAssets(doc, config, assets) {
  assets.forEach(function (path) {
    var url = config.assetRoot + 'build/' + config.manifest[path];

    if (url.match(/\.css/)) {
      injectStylesheet(doc, url);
    } else {
      injectScript(doc, url);
    }
  });
}

function polyfillBundles(needed) {
  return requiredPolyfillSets(needed).map(function (set) {
    return "scripts/polyfills-".concat(set, ".bundle.js");
  });
}
/**
 * Bootstrap the Hypothesis client.
 *
 * This triggers loading of the necessary resources for the client
 */


function bootHypothesisClient(doc, config) {
  // Detect presence of Hypothesis in the page
  var appLinkEl = doc.querySelector('link[type="application/annotator+html"]');

  if (appLinkEl) {
    return;
  } // Register the URL of the sidebar app which the Hypothesis client should load.
  // The <link> tag is also used by browser extensions etc. to detect the
  // presence of the Hypothesis client on the page.


  var sidebarUrl = doc.createElement('link');
  sidebarUrl.rel = 'sidebar';
  sidebarUrl.href = config.sidebarAppUrl;
  sidebarUrl.type = 'application/annotator+html';
  doc.head.appendChild(sidebarUrl); // Register the URL of the annotation client which is currently being used to drive
  // annotation interactions.

  var clientUrl = doc.createElement('link');
  clientUrl.rel = 'hypothesis-client';
  clientUrl.href = config.assetRoot + 'build/';
  clientUrl.type = 'application/annotator+javascript';
  doc.head.appendChild(clientUrl);
  var polyfills = polyfillBundles(['document.evaluate', 'es2015', 'es2016', 'es2017', 'url']);
  injectAssets(doc, config, [].concat(_toConsumableArray(polyfills), ['scripts/jquery.bundle.js', // Main entry point for the client
  'scripts/annotator.bundle.js', 'styles/icomoon.css', 'styles/annotator.css', 'styles/pdfjs-overrides.css']));
}
/**
 * Bootstrap the sidebar application which displays annotations.
 */


function bootSidebarApp(doc, config) {
  var polyfills = polyfillBundles([// JS polyfills.
  'es2015', 'es2016', 'es2017', 'string.prototype.normalize', // DOM polyfills. These are loaded after the JS polyfills as they may
  // depend upon them, eg. for Promises.
  'fetch', 'url']);
  injectAssets(doc, config, [].concat(_toConsumableArray(polyfills), [// Vendor code required by sidebar.bundle.js
  'scripts/raven.bundle.js', 'scripts/angular.bundle.js', 'scripts/katex.bundle.js', 'scripts/showdown.bundle.js', // The sidebar app
  'scripts/sidebar.bundle.js', 'styles/angular-csp.css', 'styles/angular-toastr.css', 'styles/icomoon.css', 'styles/katex.min.css', 'styles/sidebar.css']));
}

function boot(document_, config) {
  if (document_.querySelector('hypothesis-app')) {
    bootSidebarApp(document_, config);
  } else {
    bootHypothesisClient(document_, config);
  }
}

module.exports = boot;

},{"../shared/polyfills":3}],2:[function(require,module,exports){
'use strict'; // This is the main entry point for the Hypothesis client in the host page
// and the sidebar application.
//
// The same boot script is used for both entry points so that the browser
// already has it cached when it encounters the reference in the sidebar
// application.
// Variables replaced by the build script

/* global {"styles/angular-csp.css":"styles/angular-csp.css?e61a94","styles/angular-toastr.css":"styles/angular-toastr.css?c60e91","styles/annotator.css":"styles/annotator.css?9cd204","styles/icomoon.css":"styles/icomoon.css?78a896","styles/katex.min.css":"styles/katex.min.css?f92711","styles/pdfjs-overrides.css":"styles/pdfjs-overrides.css?28636f","styles/sidebar.css":"styles/sidebar.css?a80f3a","fonts/KaTeX_AMS-Regular.woff":"fonts/KaTeX_AMS-Regular.woff?d695b8","fonts/KaTeX_Caligraphic-Bold.woff":"fonts/KaTeX_Caligraphic-Bold.woff?011f63","fonts/KaTeX_Caligraphic-Regular.woff":"fonts/KaTeX_Caligraphic-Regular.woff?43014c","fonts/KaTeX_Fraktur-Bold.woff":"fonts/KaTeX_Fraktur-Bold.woff?555c68","fonts/KaTeX_Fraktur-Regular.woff":"fonts/KaTeX_Fraktur-Regular.woff?2b146c","fonts/KaTeX_Main-Bold.woff":"fonts/KaTeX_Main-Bold.woff?516337","fonts/KaTeX_Main-BoldItalic.woff":"fonts/KaTeX_Main-BoldItalic.woff?2561b4","fonts/KaTeX_Main-Italic.woff":"fonts/KaTeX_Main-Italic.woff?abcdc7","fonts/KaTeX_Main-Regular.woff":"fonts/KaTeX_Main-Regular.woff?6b04cf","fonts/KaTeX_Math-BoldItalic.woff":"fonts/KaTeX_Math-BoldItalic.woff?3c49c7","fonts/KaTeX_Math-Italic.woff":"fonts/KaTeX_Math-Italic.woff?724c26","fonts/KaTeX_SansSerif-Bold.woff":"fonts/KaTeX_SansSerif-Bold.woff?dfa790","fonts/KaTeX_SansSerif-Italic.woff":"fonts/KaTeX_SansSerif-Italic.woff?dafff6","fonts/KaTeX_SansSerif-Regular.woff":"fonts/KaTeX_SansSerif-Regular.woff?9c9898","fonts/KaTeX_Script-Regular.woff":"fonts/KaTeX_Script-Regular.woff?923fb5","fonts/KaTeX_Size1-Regular.woff":"fonts/KaTeX_Size1-Regular.woff?ac3f9a","fonts/KaTeX_Size2-Regular.woff":"fonts/KaTeX_Size2-Regular.woff?106cfd","fonts/KaTeX_Size3-Regular.woff":"fonts/KaTeX_Size3-Regular.woff?e61a9f","fonts/KaTeX_Size4-Regular.woff":"fonts/KaTeX_Size4-Regular.woff?b7132c","fonts/KaTeX_Typewriter-Regular.woff":"fonts/KaTeX_Typewriter-Regular.woff?9b8bfe","fonts/h.woff":"fonts/h.woff?95b92e","scripts/angular.bundle.js":"scripts/angular.bundle.js?dfe3e9","scripts/annotator.bundle.js":"scripts/annotator.bundle.js?a2f7cb","scripts/boot.bundle.js":"scripts/boot.bundle.js?9884d1","scripts/jquery.bundle.js":"scripts/jquery.bundle.js?dd14b8","scripts/katex.bundle.js":"scripts/katex.bundle.js?d6d6e1","scripts/polyfills-document.evaluate.bundle.js":"scripts/polyfills-document.evaluate.bundle.js?e8cbc5","scripts/polyfills-es2015.bundle.js":"scripts/polyfills-es2015.bundle.js?f18a45","scripts/polyfills-es2016.bundle.js":"scripts/polyfills-es2016.bundle.js?04a87f","scripts/polyfills-es2017.bundle.js":"scripts/polyfills-es2017.bundle.js?33a86b","scripts/polyfills-fetch.bundle.js":"scripts/polyfills-fetch.bundle.js?b8799b","scripts/polyfills-string.prototype.normalize.bundle.js":"scripts/polyfills-string.prototype.normalize.bundle.js?b2fd69","scripts/polyfills-url.bundle.js":"scripts/polyfills-url.bundle.js?1c2063","scripts/raven.bundle.js":"scripts/raven.bundle.js?ac4d0b","scripts/showdown.bundle.js":"scripts/showdown.bundle.js?be4ece","scripts/sidebar.bundle.js":"scripts/sidebar.bundle.js?759db3"} */

var boot = require('./boot');

var settings = require('../shared/settings').jsonConfigsFrom(document);

boot(document, {
  assetRoot: settings.assetRoot || './just-colors/client/',
  manifest: {"styles/angular-csp.css":"styles/angular-csp.css?e61a94","styles/angular-toastr.css":"styles/angular-toastr.css?c60e91","styles/annotator.css":"styles/annotator.css?9cd204","styles/icomoon.css":"styles/icomoon.css?78a896","styles/katex.min.css":"styles/katex.min.css?f92711","styles/pdfjs-overrides.css":"styles/pdfjs-overrides.css?28636f","styles/sidebar.css":"styles/sidebar.css?a80f3a","fonts/KaTeX_AMS-Regular.woff":"fonts/KaTeX_AMS-Regular.woff?d695b8","fonts/KaTeX_Caligraphic-Bold.woff":"fonts/KaTeX_Caligraphic-Bold.woff?011f63","fonts/KaTeX_Caligraphic-Regular.woff":"fonts/KaTeX_Caligraphic-Regular.woff?43014c","fonts/KaTeX_Fraktur-Bold.woff":"fonts/KaTeX_Fraktur-Bold.woff?555c68","fonts/KaTeX_Fraktur-Regular.woff":"fonts/KaTeX_Fraktur-Regular.woff?2b146c","fonts/KaTeX_Main-Bold.woff":"fonts/KaTeX_Main-Bold.woff?516337","fonts/KaTeX_Main-BoldItalic.woff":"fonts/KaTeX_Main-BoldItalic.woff?2561b4","fonts/KaTeX_Main-Italic.woff":"fonts/KaTeX_Main-Italic.woff?abcdc7","fonts/KaTeX_Main-Regular.woff":"fonts/KaTeX_Main-Regular.woff?6b04cf","fonts/KaTeX_Math-BoldItalic.woff":"fonts/KaTeX_Math-BoldItalic.woff?3c49c7","fonts/KaTeX_Math-Italic.woff":"fonts/KaTeX_Math-Italic.woff?724c26","fonts/KaTeX_SansSerif-Bold.woff":"fonts/KaTeX_SansSerif-Bold.woff?dfa790","fonts/KaTeX_SansSerif-Italic.woff":"fonts/KaTeX_SansSerif-Italic.woff?dafff6","fonts/KaTeX_SansSerif-Regular.woff":"fonts/KaTeX_SansSerif-Regular.woff?9c9898","fonts/KaTeX_Script-Regular.woff":"fonts/KaTeX_Script-Regular.woff?923fb5","fonts/KaTeX_Size1-Regular.woff":"fonts/KaTeX_Size1-Regular.woff?ac3f9a","fonts/KaTeX_Size2-Regular.woff":"fonts/KaTeX_Size2-Regular.woff?106cfd","fonts/KaTeX_Size3-Regular.woff":"fonts/KaTeX_Size3-Regular.woff?e61a9f","fonts/KaTeX_Size4-Regular.woff":"fonts/KaTeX_Size4-Regular.woff?b7132c","fonts/KaTeX_Typewriter-Regular.woff":"fonts/KaTeX_Typewriter-Regular.woff?9b8bfe","fonts/h.woff":"fonts/h.woff?95b92e","scripts/angular.bundle.js":"scripts/angular.bundle.js?dfe3e9","scripts/annotator.bundle.js":"scripts/annotator.bundle.js?a2f7cb","scripts/boot.bundle.js":"scripts/boot.bundle.js?9884d1","scripts/jquery.bundle.js":"scripts/jquery.bundle.js?dd14b8","scripts/katex.bundle.js":"scripts/katex.bundle.js?d6d6e1","scripts/polyfills-document.evaluate.bundle.js":"scripts/polyfills-document.evaluate.bundle.js?e8cbc5","scripts/polyfills-es2015.bundle.js":"scripts/polyfills-es2015.bundle.js?f18a45","scripts/polyfills-es2016.bundle.js":"scripts/polyfills-es2016.bundle.js?04a87f","scripts/polyfills-es2017.bundle.js":"scripts/polyfills-es2017.bundle.js?33a86b","scripts/polyfills-fetch.bundle.js":"scripts/polyfills-fetch.bundle.js?b8799b","scripts/polyfills-string.prototype.normalize.bundle.js":"scripts/polyfills-string.prototype.normalize.bundle.js?b2fd69","scripts/polyfills-url.bundle.js":"scripts/polyfills-url.bundle.js?1c2063","scripts/raven.bundle.js":"scripts/raven.bundle.js?ac4d0b","scripts/showdown.bundle.js":"scripts/showdown.bundle.js?be4ece","scripts/sidebar.bundle.js":"scripts/sidebar.bundle.js?759db3"},
  sidebarAppUrl: settings.sidebarAppUrl || 'https://hypothes.is/app.html'
});

},{"../shared/settings":4,"./boot":1}],3:[function(require,module,exports){
'use strict';
/**
 * Checkers to test which polyfills are required by the current browser.
 *
 * This module executes in an environment without any polyfills loaded so it
 * needs to run in old browsers, down to IE 11.
 *
 * See gulpfile.js for details of how to add a new polyfill.
 */

/**
 * Return true if `obj` has all of the methods in `methods`.
 */

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function hasMethods(obj) {
  for (var _len = arguments.length, methods = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    methods[_key - 1] = arguments[_key];
  }

  return methods.every(function (method) {
    return typeof obj[method] === 'function';
  });
}
/**
 * Map of polyfill set name to function to test whether the current browser
 * needs that polyfill set.
 *
 * Each checker function returns `true` if the polyfill is required or `false`
 * if the browser has the functionality natively available.
 */


var needsPolyfill = {
  es2015: function es2015() {
    // Check for new objects in ES2015.
    if (typeof Promise !== 'function' || typeof Map !== 'function' || typeof Set !== 'function' || typeof Symbol !== 'function') {
      return true;
    } // Check for new methods on existing objects in ES2015.


    var objMethods = [[Array, 'from'], [Array.prototype, 'fill', 'find', 'findIndex'], [Object, 'assign'], [String.prototype, 'startsWith', 'endsWith']];

    for (var _i = 0, _objMethods = objMethods; _i < _objMethods.length; _i++) {
      var _objMethods$_i = _toArray(_objMethods[_i]),
          obj = _objMethods$_i[0],
          methods = _objMethods$_i.slice(1);

      if (!hasMethods.apply(void 0, [obj].concat(_toConsumableArray(methods)))) {
        return true;
      }
    }

    return false;
  },
  es2016: function es2016() {
    return !hasMethods(Array.prototype, 'includes');
  },
  es2017: function es2017() {
    return !hasMethods(Object, 'entries', 'values');
  },
  // Test for a fully-working URL constructor.
  url: function url() {
    try {
      // Some browsers do not have a URL constructor at all.
      var url = new window.URL('https://hypothes.is'); // Other browsers have a broken URL constructor.

      if (url.hostname !== 'hypothes.is') {
        throw new Error('Broken URL constructor');
      }

      return false;
    } catch (e) {
      return true;
    }
  },
  // Test for XPath evaluation.
  'document.evaluate': function documentEvaluate() {
    // Depending on the browser the `evaluate` property may be on the prototype
    // or just the object itself.
    return typeof document.evaluate !== 'function';
  },
  // Test for Unicode normalization. This depends on a large polyfill so it
  // is separated out into its own bundle.
  'string.prototype.normalize': function stringPrototypeNormalize() {
    return !hasMethods(String.prototype, 'normalize');
  },
  fetch: function fetch() {
    return typeof window.fetch !== 'function';
  }
};
/**
 * Return the subset of polyfill sets from `needed`  which are needed by the
 * current browser.
 */

function requiredPolyfillSets(needed) {
  return needed.filter(function (set) {
    var checker = needsPolyfill[set];

    if (!checker) {
      throw new Error("Unknown polyfill set \"".concat(set, "\""));
    }

    return checker();
  });
}

module.exports = {
  requiredPolyfillSets: requiredPolyfillSets
};

},{}],4:[function(require,module,exports){
'use strict'; // `Object.assign()`-like helper. Used because this script needs to work
// in IE 10/11 without polyfills.

function assign(dest, src) {
  for (var k in src) {
    if (src.hasOwnProperty(k)) {
      dest[k] = src[k];
    }
  }

  return dest;
}
/**
 * Return a parsed `js-hypothesis-config` object from the document, or `{}`.
 *
 * Find all `<script class="js-hypothesis-config">` tags in the given document,
 * parse them as JSON, and return the parsed object.
 *
 * If there are no `js-hypothesis-config` tags in the document then return
 * `{}`.
 *
 * If there are multiple `js-hypothesis-config` tags in the document then merge
 * them into a single returned object (when multiple scripts contain the same
 * setting names, scripts further down in the document override those further
 * up).
 *
 * @param {Document|Element} document - The root element to search.
 */


function jsonConfigsFrom(document) {
  var config = {};
  var settingsElements = document.querySelectorAll('script.js-hypothesis-config');

  for (var i = 0; i < settingsElements.length; i++) {
    var settings = void 0;

    try {
      settings = JSON.parse(settingsElements[i].textContent);
    } catch (err) {
      console.warn('Could not parse settings from js-hypothesis-config tags', err);
      settings = {};
    }

    assign(config, settings);
  }

  return config;
}

module.exports = {
  jsonConfigsFrom: jsonConfigsFrom
};

},{}]},{},[2])

;})()