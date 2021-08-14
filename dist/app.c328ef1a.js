// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"sass/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./..\\images\\image-hero-desktop.jpg":[["image-hero-desktop.1cb3e33a.jpg","images/image-hero-desktop.jpg"],"images/image-hero-desktop.jpg"],"_css_loader":"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"app.js":[function(require,module,exports) {
"use strict";

require("./sass/main.scss");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var bookmark = document.querySelector("#bookmark");
var iconGreen = document.querySelector("#icon__bookmark--green");
var iconGrey = document.querySelector("#icon__bookmark--grey");
var progressBar = document.querySelector(".progress__bar--front");
var progressText = document.querySelector(".progress__bold");
var progressBack = document.querySelector("#progress_backup");
var suppBtn = document.querySelector("#btn__support");
var freeBtn = document.querySelector("#btn__free");
var thanksBtn = document.querySelector("#btn__thanks");
var closeBtn = document.querySelector("#popup__close--btn");
var toggleBtns = document.querySelectorAll(".offer__btn");
var amountBtns = document.querySelectorAll(".amount__btn");
var radio3 = document.querySelector("#pledge-3");
var offerContainer = document.querySelector("#offer__card");
var popup = document.querySelector("#popup__container");
var thanks = document.querySelector("#thanks__container");
var toggles = document.querySelectorAll(".amount");
var checkboxes = document.querySelectorAll('input[type="checkbox"]');
var count = 1,
    add,
    numOpen,
    numClose;
var amountProgress = 89914,
    amountBack = 5007;
var arr = [0, 25, 75, 10000 - 8914, 25, 75, 10000 - 8914];
checkboxes.forEach(function (btn, i) {
  btn.addEventListener("change", function (e) {
    removeActive(i);
  });
}); //remove other active checkboxes

function removeActive(i) {
  checkboxes.forEach(function (btn) {
    if (_toConsumableArray(checkboxes).indexOf(btn) !== i) {
      btn.checked = false;
    }
  });
} //uncheck all checkboxes


function uncheck() {
  _toConsumableArray(checkboxes).forEach(function (box) {
    return box.checked = false;
  });
}

function toggleShow(num) {
  document.querySelector("#amount__".concat(num)).style.visibility = "visible";
  document.querySelector("#amount__".concat(num)).style.height = "100px";
  document.querySelector("#amount__".concat(num)).style.padding = "1rem";
  document.querySelector(".offer-".concat(num)).style.display = "none";

  if (num !== 6) {
    document.querySelector("#amount__text--".concat(num)).innerHTML = "Enter your pledge";
  }
}

function toggleHide(num) {
  document.querySelector("#amount__".concat(num)).style.visibility = "hidden";
  document.querySelector("#amount__".concat(num)).style.height = "0";
  document.querySelector("#amount__".concat(num)).style.padding = "0";
  document.querySelector(".offer-".concat(num)).style.display = "block";

  if (num !== 6) {
    document.querySelector("#amount__input--".concat(num)).value = "";
  }
}

function showThanks() {
  popup.style.display = "none";
  thanks.style.display = "block";
}

freeBtn.addEventListener("click", function () {
  showThanks();
});
thanksBtn.addEventListener("click", function () {
  thanks.style.display = "none";
  uncheck();
}); //toggle

toggleBtns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    var buttons = _toConsumableArray(e.target.classList);

    if (buttons[1] === "offer-1") {
      numOpen = 1;
      numClose = 2;
      toggleHide(6);
      toggleHide(numClose);
    }

    if (buttons[1] === "offer-2") {
      numOpen = 2;
      numClose = 1;
      toggleHide(6);
      toggleHide(numClose);
    }

    if (buttons[1] === "offer-3") return;

    if (buttons[1] === "offer-4") {
      numOpen = 4;
      numClose = 5;
      toggleHide(6);
      toggleHide(numClose);
    }

    if (buttons[1] === "offer-5") {
      numOpen = 5;
      numClose = 4;
      toggleHide(6);
      toggleHide(numClose);
    }

    if (buttons[1] === "offer-6") {
      if (numOpen === 1 || numOpen === 2 || numOpen === 4 || numOpen === 5) {
        numClose = numOpen;
        toggleHide(numClose);
      }

      numOpen = 6;
    } //show


    toggleShow(numOpen);
  });
}); //validating pledge amount

amountBtns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    var inputAmount = document.querySelector("#amount__input--".concat(numOpen)).value;
    if (numOpen === 1) add = 4;
    if (numOpen === 2) add = 5;
    if (numOpen === 4) add = 1;
    if (numOpen === 5) add = 2;
    amountValidation(inputAmount, numOpen, add);
    updateProgress(Number(inputAmount));
  });
});

function amountValidation(amount, open, add) {
  if (amount < arr[open]) {
    document.querySelector("#amount__text--".concat(open)).innerHTML = "Pledge must be atleast $".concat(arr[open]);
    document.querySelector("#amount__input--".concat(open)).value = "";
  }

  if (amount >= arr[open] && amount < arr[open + 1]) {
    document.querySelector("#amount__text--".concat(open)).innerHTML = "Enter your pledge";
    var val = Number(document.querySelector("#offer__price--".concat(open)).innerHTML);
    val--;
    document.querySelector("#offer__price--".concat(open)).innerHTML = "".concat(val);
    var val2 = Number(document.querySelector("#offer__price--".concat(add)).innerHTML);
    val2--;
    document.querySelector("#offer__price--".concat(add)).innerHTML = "".concat(val2);
    arr[3] -= amount;
    uncheck();
    toggleHide(open);
    showThanks();
  }

  if (amount >= arr[open + 1]) {
    document.querySelector("#amount__text--".concat(open)).innerHTML = "Enter an amount less than $".concat(arr[open + 1]);
    document.querySelector("#amount__input--".concat(open)).value = "";
  }
} //updating progress bar


function updateProgress(amount) {
  amountProgress += amount;
  amountBack++;
  var percentage = amountProgress / 100000 * 100;
  progressBar.style.width = "".concat(percentage, "%");
  progressText.innerHTML = "$".concat(amountProgress.toLocaleString());
  progressBack.innerHTML = "".concat(amountBack.toLocaleString());
} //bookmark


bookmark.addEventListener("click", function (e) {
  if (count % 2 !== 0) {
    bookmark.classList.add("btn__bookmark--green");
    bookmark.innerHTML = "Bookmarked";
    iconGreen.style.display = "block";
    iconGrey.style.display = "none";
  } else {
    bookmark.classList.remove("btn__bookmark--green");
    bookmark.innerHTML = "Bookmark";
    iconGreen.style.display = "none";
    iconGrey.style.display = "block";
  }

  count++;
}); //popup

suppBtn.addEventListener("click", function () {
  popup.style.display = "block";
  if (numOpen) toggleHide(numOpen);
});
closeBtn.addEventListener("click", function () {
  popup.style.display = "none";
  uncheck();
}); //make radio unclickable

radio3.disabled = "true";
},{"./sass/main.scss":"sass/main.scss"}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49949" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map