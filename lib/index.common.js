module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "01f9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var $iterCreate = __webpack_require__("41a0");
var setToStringTag = __webpack_require__("7f20");
var getPrototypeOf = __webpack_require__("38fd");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "02f4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var defined = __webpack_require__("be13");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "0390":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var at = __webpack_require__("02f4")(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};


/***/ }),

/***/ "0bfb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__("cb7c");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "11e9":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("52a7");
var createDesc = __webpack_require__("4630");
var toIObject = __webpack_require__("6821");
var toPrimitive = __webpack_require__("6a99");
var has = __webpack_require__("69a8");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("9e1e") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "1495":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var anObject = __webpack_require__("cb7c");
var getKeys = __webpack_require__("0d58");

module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "1eb2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (false) {}

  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* unused harmony default export */ var _unused_webpack_default_export = (null);


/***/ }),

/***/ "214f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("b0c5");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var fails = __webpack_require__("79e5");
var defined = __webpack_require__("be13");
var wks = __webpack_require__("2b4c");
var regexpExec = __webpack_require__("520a");

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "2397":
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__("5ca1");
var create = __webpack_require__("2aeb");
var aFunction = __webpack_require__("d8e8");
var anObject = __webpack_require__("cb7c");
var isObject = __webpack_require__("d3f4");
var fails = __webpack_require__("79e5");
var bind = __webpack_require__("f0c1");
var rConstruct = (__webpack_require__("7726").Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),

/***/ "23c6":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("2d95");
var TAG = __webpack_require__("2b4c")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "2621":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "262e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ _inherits; });

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

/***/ }),

/***/ "288e":
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "28a5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isRegExp = __webpack_require__("aae3");
var anObject = __webpack_require__("cb7c");
var speciesConstructor = __webpack_require__("ebd6");
var advanceStringIndex = __webpack_require__("0390");
var toLength = __webpack_require__("9def");
var callRegExpExec = __webpack_require__("5f1b");
var regexpExec = __webpack_require__("520a");
var fails = __webpack_require__("79e5");
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';
var MAX_UINT32 = 0xffffffff;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { RegExp(MAX_UINT32, 'y'); });

// @@split logic
__webpack_require__("214f")('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});


/***/ }),

/***/ "2909":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ _toConsumableArray; });

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js




function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var $toString = __webpack_require__("fa5b");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2aeb":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("cb7c");
var dPs = __webpack_require__("1495");
var enumBugKeys = __webpack_require__("e11e");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("fab2").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "31f4":
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "3846":
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__("9e1e") && /./g.flags != 'g') __webpack_require__("86cc").f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__("0bfb")
});


/***/ }),

/***/ "38fd":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("69a8");
var toObject = __webpack_require__("4bf8");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "3a0d":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__("de86")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _monitorjs) {
  "use strict";

  var _interopRequireDefault = __webpack_require__("288e");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "MonitorJS", {
    enumerable: true,
    get: function get() {
      return _monitorjs.default;
    }
  });
  _exports.default = void 0;
  _monitorjs = _interopRequireDefault(_monitorjs);
  var _default = _monitorjs.default;
  _exports.default = _default;
  window.MonitorJS = _monitorjs.default;
});

/***/ }),

/***/ "3da2":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__("c1cc")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _api) {
  "use strict";

  var _interopRequireDefault = __webpack_require__("288e");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _api = _interopRequireDefault(_api);

  /**
   * 消息队列
   */
  var TaskQueue = {
    queues: [],
    //待处理消息列表

    /**
     * 添加消息
     * @param {*} reportUrl 上报url
     * @param {*} data 上报数据
     */
    add: function add(reportUrl, data) {
      this.queues.push({
        reportUrl: reportUrl,
        data: data
      });
    },

    /**
     * 统一上报
     */
    fire: function fire() {
      if (!this.queues || this.queues.length === 0) {
        return;
      }

      var item = this.queues[0];
      item.reportUrl && new _api.default(item.reportUrl).report(item.data);
      this.queues.splice(0, 1);
      this.fire(); //递归
    }
  };
  var _default = TaskQueue;
  _exports.default = _default;
});

/***/ }),

/***/ "41a0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("2aeb");
var descriptor = __webpack_require__("4630");
var setToStringTag = __webpack_require__("7f20");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("32e9")(IteratorPrototype, __webpack_require__("2b4c")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "456d":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("4bf8");
var $keys = __webpack_require__("0d58");

__webpack_require__("5eda")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "4917":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__("cb7c");
var toLength = __webpack_require__("9def");
var advanceStringIndex = __webpack_require__("0390");
var regExpExec = __webpack_require__("5f1b");

// @@match logic
__webpack_require__("214f")('match', 1, function (defined, MATCH, $match, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative($match, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      if (!rx.global) return regExpExec(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "5001":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__("2397"), __webpack_require__("6b54"), __webpack_require__("28a5"), __webpack_require__("a481"), __webpack_require__("4917"), __webpack_require__("d4ec"), __webpack_require__("bee2"), __webpack_require__("262e"), __webpack_require__("99de"), __webpack_require__("7e84"), __webpack_require__("95b7"), __webpack_require__("b6e0")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _es6Reflect, _es6Regexp, _es6Regexp2, _es6Regexp3, _es6Regexp4, _classCallCheck2, _createClass2, _inherits2, _possibleConstructorReturn2, _getPrototypeOf2, _baseMonitor, _baseConfig) {
  "use strict";

  var _interopRequireDefault = __webpack_require__("288e");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _baseMonitor = _interopRequireDefault(_baseMonitor);

  function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  /**
   * vue错误
   */
  var VueError = /*#__PURE__*/function (_BaseMonitor) {
    (0, _inherits2.default)(VueError, _BaseMonitor);

    var _super = _createSuper(VueError);

    function VueError(params) {
      (0, _classCallCheck2.default)(this, VueError);
      return _super.call(this, params);
    }
    /**
     * 处理Vue错误提示
     */


    (0, _createClass2.default)(VueError, [{
      key: "handleError",
      value: function handleError(Vue) {
        var _this = this;

        if (!Vue) {
          return;
        }

        Vue.config.errorHandler = function (error, vm, info) {
          try {
            var metaData = {
              name: error.name,
              //异常名称
              message: error.message,
              //异常信息
              stack: error.stack,
              //异常堆栈信息
              vueInfo: error.info,
              //vue info
              resourceUrl: error.script // 异常脚本url

            }; //解析resourceUrl，line，col

            var errs = error.stack.match(/\(.+?\)/);

            if (errs && errs.length) {
              errs = errs[0];
              errs = errs.replace(/\w.+[js|html]/g, function ($1) {
                _this.url = $1;
                return '';
              });
              errs = errs.split(':');

              if (errs.length > 1) {
                _this.line = parseInt(errs[1] || null); //行

                _this.col = parseInt(errs[2] || null); //列
              }
            }

            if (Object.prototype.toString.call(vm) === '[object Object]') {
              metaData.componentName = vm._isVue ? vm.$options.name || vm.$options._componentTag : vm.name;
              metaData.propsData = vm.$options.propsData;
            }

            _this.level = _baseConfig.ErrorLevelEnum.WARN;
            _this.msg = JSON.stringify(metaData);
            _this.category = _baseConfig.ErrorCategoryEnum.VUE_ERROR;

            _this.recordError();
          } catch (error) {
            console.log('vue错误异常', error);
          }
        };
      }
    }]);
    return VueError;
  }(_baseMonitor.default);

  var _default = VueError;
  _exports.default = _default;
});

/***/ }),

/***/ "520a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__("0bfb");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "52a7":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "532d":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__("ac6a")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _webDom) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /**
   * 页面监控
   */
  var pagePerformance = {
    getTiming: function getTiming() {
      try {
        if (!window.performance || !window.performance.timing) {
          console.log('你的浏览器不支持 performance 操作');
          return;
        }

        var t = window.performance.timing;
        var times = {};
        var loadTime = t.loadEventEnd - t.loadEventStart;

        if (loadTime < 0) {
          setTimeout(function () {
            pagePerformance.getTiming();
          }, 200);
          return;
        } //【重要】重定向的时间


        times.redirectTime = t.redirectEnd - t.redirectStart; //【重要】DNS 查询时间
        //【原因】DNS 预加载做了么？页面内是不是使用了太多不同的域名导致域名查询的时间太长？

        times.dnsTime = t.domainLookupEnd - t.domainLookupStart; //【重要】读取页面第一个字节的时间
        //【原因】这可以理解为用户拿到你的资源占用的时间，加异地机房了么，加CDN 处理了么？加带宽了么？加 CPU 运算速度了么？

        times.ttfbTime = t.responseStart - t.navigationStart; //DNS 缓存时间

        times.appcacheTime = t.domainLookupStart - t.fetchStart; //卸载页面的时间

        times.unloadTime = t.unloadEventEnd - t.unloadEventStart; //tcp连接耗时

        times.tcpTime = t.connectEnd - t.connectStart; //【重要】内容加载完成的时间
        //【原因】页面内容经过 gzip 压缩了么，静态资源 css/js 等压缩了么？

        times.reqTime = t.responseEnd - t.responseStart; //解析dom树耗时

        times.analysisTime = t.domComplete - t.domInteractive; //白屏时间

        times.blankTime = t.domLoading - t.navigationStart; //domReadyTime

        times.domReadyTime = t.domContentLoadedEventEnd - t.navigationStart; //【重要】页面加载完成的时间
        //【原因】这几乎代表了用户等待页面可用的时间

        times.loadPage = t.loadEventEnd - t.navigationStart;
        return times;
      } catch (e) {
        console.log(e);
      }
    },
    getEntries: function getEntries() {
      if (!window.performance || !window.performance.getEntries) {
        console.log('该浏览器不支持performance.getEntries方法');
        return;
      }

      var entryTimesList = [];
      var entryList = window.performance.getEntries();

      if (!entryList || entryList.length == 0) {
        return entryTimesList;
      }

      entryList.forEach(function (item, index) {
        var templeObj = {};
        var usefulType = ['script', 'css', 'fetch', 'xmlhttprequest', 'link', 'img']; //'navigation'

        if (usefulType.indexOf(item.initiatorType) > -1) {
          //请求资源路径
          templeObj.name = item.name; //发起资源类型

          templeObj.initiatorType = item.initiatorType; //http协议版本

          templeObj.nextHopProtocol = item.nextHopProtocol; //dns查询耗时

          templeObj.dnsTime = item.domainLookupEnd - item.domainLookupStart; //tcp链接耗时

          templeObj.tcpTime = item.connectEnd - item.connectStart; //请求时间

          templeObj.reqTime = item.responseEnd - item.responseStart; //重定向时间

          templeObj.redirectTime = item.redirectEnd - item.redirectStart;
          entryTimesList.push(templeObj);
        }
      });
      return entryTimesList;
    }
  };
  var _default = pagePerformance;
  _exports.default = _default;
});

/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "5675":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__("6b54"), __webpack_require__("2397"), __webpack_require__("d4ec"), __webpack_require__("bee2"), __webpack_require__("262e"), __webpack_require__("99de"), __webpack_require__("7e84"), __webpack_require__("95b7"), __webpack_require__("b6e0")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _es6Regexp, _es6Reflect, _classCallCheck2, _createClass2, _inherits2, _possibleConstructorReturn2, _getPrototypeOf2, _baseMonitor, _baseConfig) {
  "use strict";

  var _interopRequireDefault = __webpack_require__("288e");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _baseMonitor = _interopRequireDefault(_baseMonitor);

  function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  /**
   * 资源加载错误
   */
  var ResourceError = /*#__PURE__*/function (_BaseMonitor) {
    (0, _inherits2.default)(ResourceError, _BaseMonitor);

    var _super = _createSuper(ResourceError);

    function ResourceError(params) {
      (0, _classCallCheck2.default)(this, ResourceError);
      return _super.call(this, params);
    }
    /**
     * 注册onerror事件
     */


    (0, _createClass2.default)(ResourceError, [{
      key: "handleError",
      value: function handleError() {
        var _this = this;

        window.addEventListener('error', function (event) {
          try {
            if (!event) {
              return;
            }

            _this.category = _baseConfig.ErrorCategoryEnum.RESOURCE_ERROR;
            var target = event.target || event.srcElement;
            var isElementTarget = target instanceof HTMLScriptElement || target instanceof HTMLLinkElement || target instanceof HTMLImageElement;

            if (!isElementTarget) {
              return; // js error不再处理
            }

            _this.level = target.tagName.toUpperCase() === 'IMG' ? _baseConfig.ErrorLevelEnum.WARN : _baseConfig.ErrorLevelEnum.ERROR;
            _this.msg = "加载 " + target.tagName + " 资源错误";
            _this.url = target.src || target.href;
            _this.errorObj = target;

            _this.recordError();
          } catch (error) {
            console.log("资源加载收集异常", error);
          }
        }, true);
      }
    }]);
    return ResourceError;
  }(_baseMonitor.default);

  var _default = ResourceError;
  _exports.default = _default;
});

/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "5eda":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("5ca1");
var core = __webpack_require__("8378");
var fails = __webpack_require__("79e5");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "5f1b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__("23c6");
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};


/***/ }),

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "6b54":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("3846");
var anObject = __webpack_require__("cb7c");
var $flags = __webpack_require__("0bfb");
var DESCRIPTORS = __webpack_require__("9e1e");
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__("2aba")(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__("79e5")(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),

/***/ "6e04":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__("6b54"), __webpack_require__("2397"), __webpack_require__("d4ec"), __webpack_require__("bee2"), __webpack_require__("262e"), __webpack_require__("99de"), __webpack_require__("7e84"), __webpack_require__("95b7"), __webpack_require__("b6e0")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _es6Regexp, _es6Reflect, _classCallCheck2, _createClass2, _inherits2, _possibleConstructorReturn2, _getPrototypeOf2, _baseMonitor, _baseConfig) {
  "use strict";

  var _interopRequireDefault = __webpack_require__("288e");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _baseMonitor = _interopRequireDefault(_baseMonitor);

  function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  /**
   * 捕获未处理的Promise异常
   */
  var PromiseError = /*#__PURE__*/function (_BaseMonitor) {
    (0, _inherits2.default)(PromiseError, _BaseMonitor);

    var _super = _createSuper(PromiseError);

    function PromiseError(params) {
      (0, _classCallCheck2.default)(this, PromiseError);
      return _super.call(this, params);
    }
    /**
     * 处理错误
     */


    (0, _createClass2.default)(PromiseError, [{
      key: "handleError",
      value: function handleError() {
        var _this = this;

        window.addEventListener('unhandledrejection', function (event) {
          try {
            if (!event || !event.reason) {
              return;
            } //判断当前被捕获的异常url，是否是异常处理url，防止死循环


            if (event.reason.config && event.reason.config.url) {
              _this.url = event.reason.config.url;
            }

            _this.level = _baseConfig.ErrorLevelEnum.WARN;
            _this.category = _baseConfig.ErrorCategoryEnum.PROMISE_ERROR;
            _this.msg = event.reason;

            _this.recordError();
          } catch (error) {
            console.log(error);
          }
        }, true);
      }
    }]);
    return PromiseError;
  }(_baseMonitor.default);

  var _default = PromiseError;
  _exports.default = _default;
});

/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7e84":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _getPrototypeOf; });
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

/***/ }),

/***/ "7f20":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("86cc").f;
var has = __webpack_require__("69a8");
var TAG = __webpack_require__("2b4c")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "84f2":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "8e6e":
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__("5ca1");
var ownKeys = __webpack_require__("990b");
var toIObject = __webpack_require__("6821");
var gOPD = __webpack_require__("11e9");
var createProperty = __webpack_require__("f1ae");

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),

/***/ "9093":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("ce10");
var hiddenKeys = __webpack_require__("e11e").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "9111":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__("a755"), __webpack_require__("f776"), __webpack_require__("e8d1"), __webpack_require__("6e04"), __webpack_require__("5675"), __webpack_require__("5001")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _ajaxError, _consoleError, _jsError, _promiseError, _resourceError, _vueError) {
  "use strict";

  var _interopRequireDefault = __webpack_require__("288e");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "AjaxError", {
    enumerable: true,
    get: function get() {
      return _ajaxError.default;
    }
  });
  Object.defineProperty(_exports, "ConsoleError", {
    enumerable: true,
    get: function get() {
      return _consoleError.default;
    }
  });
  Object.defineProperty(_exports, "JsError", {
    enumerable: true,
    get: function get() {
      return _jsError.default;
    }
  });
  Object.defineProperty(_exports, "PromiseError", {
    enumerable: true,
    get: function get() {
      return _promiseError.default;
    }
  });
  Object.defineProperty(_exports, "ResourceError", {
    enumerable: true,
    get: function get() {
      return _resourceError.default;
    }
  });
  Object.defineProperty(_exports, "VueError", {
    enumerable: true,
    get: function get() {
      return _vueError.default;
    }
  });
  _ajaxError = _interopRequireDefault(_ajaxError);
  _consoleError = _interopRequireDefault(_consoleError);
  _jsError = _interopRequireDefault(_jsError);
  _promiseError = _interopRequireDefault(_promiseError);
  _resourceError = _interopRequireDefault(_resourceError);
  _vueError = _interopRequireDefault(_vueError);
});

/***/ }),

/***/ "95b7":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__("8e6e"), __webpack_require__("ac6a"), __webpack_require__("cadf"), __webpack_require__("456d"), __webpack_require__("ade3"), __webpack_require__("d4ec"), __webpack_require__("bee2"), __webpack_require__("b6e0"), __webpack_require__("dcbb"), __webpack_require__("ef9e"), __webpack_require__("3da2")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _es7Object, _webDom, _es6Array, _es6Object, _defineProperty2, _classCallCheck2, _createClass2, _baseConfig, _device, _utils, _taskQueue) {
  "use strict";

  var _interopRequireDefault = __webpack_require__("288e");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _defineProperty2 = _interopRequireDefault(_defineProperty2);
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _device = _interopRequireDefault(_device);
  _utils = _interopRequireDefault(_utils);
  _taskQueue = _interopRequireDefault(_taskQueue);

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  /**
   * 监控基类
   */
  var BaseMonitor = /*#__PURE__*/function () {
    /**
     * 上报错误地址
     * @param {*} params { reportUrl,extendsInfo }
     */
    function BaseMonitor(params) {
      (0, _classCallCheck2.default)(this, BaseMonitor);
      this.category = _baseConfig.ErrorCategoryEnum.UNKNOW_ERROR; //错误类型

      this.level = _baseConfig.ErrorLevelEnum.INFO; //错误等级

      this.msg = ''; //错误信息

      this.url = ''; //错误信息地址

      this.line = ''; //行数

      this.col = ''; //列数

      this.errorObj = ''; //错误堆栈

      this.reportUrl = params.reportUrl; //上报错误地址

      this.extendsInfo = params.extendsInfo; //扩展信息
    }
    /**
     * 记录错误信息
     */


    (0, _createClass2.default)(BaseMonitor, [{
      key: "recordError",
      value: function recordError() {
        console.log('url', this.url);
        this.handleRecordError(); //延迟记录日志

        setTimeout(function () {
          _taskQueue.default.fire();
        }, 100);
      }
      /**
       * 处理记录日志
       */

    }, {
      key: "handleRecordError",
      value: function handleRecordError() {
        try {
          if (!this.msg) {
            return;
          }

          console.log(this.url, this.reportUrl); //过滤掉错误上报地址

          if (this.reportUrl && this.url && this.url.toLowerCase().indexOf(this.reportUrl.toLowerCase()) >= 0) {
            console.log('统计错误接口异常', this.msg);
            return;
          }

          var errorInfo = this.handleErrorInfo();
          console.log('\n````````````````````` ' + this.category + ' `````````````````````\n', errorInfo); //记录日志

          _taskQueue.default.add(this.reportUrl, errorInfo);
        } catch (error) {
          console.log(error);
        }
      }
      /**
       * 处理错误信息
       * @param {*} extendsInfo
       */

    }, {
      key: "handleErrorInfo",
      value: function handleErrorInfo() {
        var txt = '错误类别: ' + this.category + '\r\n';
        txt += '日志信息: ' + this.msg + '\r\n';
        txt += 'url: ' + this.url + '\r\n';

        switch (this.category) {
          case _baseConfig.ErrorCategoryEnum.JS_ERROR:
            txt += '错误行号: ' + this.line + '\r\n';
            txt += '错误列号: ' + this.col + '\r\n';

            if (this.errorObj && this.errorObj.stack) {
              txt += '错误栈: ' + this.errorObj.stack + '\r\n';
            }

            break;

          default:
            if (this.errorObj) txt += '其他错误: ' + JSON.stringify(this.errorObj) + '\r\n';
            break;
        }

        var deviceInfo = this.getDeviceInfo();
        txt += '设备信息: ' + deviceInfo; //设备信息

        var extendsInfo = this.getExtendsInfo();
        var recordInfo = extendsInfo;
        recordInfo.category = this.category; //错误分类

        recordInfo.logType = this.level; //错误级别

        recordInfo.logInfo = txt; //错误信息

        recordInfo.deviceInfo = deviceInfo; //设备信息

        return recordInfo;
      }
      /**
       * 获取扩展信息
       */

    }, {
      key: "getExtendsInfo",
      value: function getExtendsInfo() {
        try {
          var ret = {};
          var extendsInfo = this.extendsInfo || {};
          var dynamicParams;

          if (_utils.default.isFunction(extendsInfo.getDynamic)) {
            dynamicParams = extendsInfo.getDynamic(); //获取动态参数
          } //判断动态方法返回的参数是否是对象


          if (_utils.default.isObject(dynamicParams)) {
            extendsInfo = _objectSpread({}, extendsInfo, {}, dynamicParams);
          } //遍历扩展信息，排除动态方法


          for (var key in extendsInfo) {
            if (!_utils.default.isFunction(extendsInfo[key])) {
              //排除获取动态方法
              ret[key] = extendsInfo[key];
            }
          }

          return ret;
        } catch (error) {
          console.log('call getExtendsInfo error', error);
          return {};
        }
      }
      /**
       * 获取设备信息
       */

    }, {
      key: "getDeviceInfo",
      value: function getDeviceInfo() {
        try {
          var deviceInfo = _device.default.getDeviceInfo();

          return JSON.stringify(deviceInfo);
        } catch (error) {
          console.log(error);
          return '';
        }
      }
    }]);
    return BaseMonitor;
  }();

  var _default = BaseMonitor;
  _exports.default = _default;
});

/***/ }),

/***/ "990b":
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__("9093");
var gOPS = __webpack_require__("2621");
var anObject = __webpack_require__("cb7c");
var Reflect = __webpack_require__("7726").Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),

/***/ "99de":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ _possibleConstructorReturn; });

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js


function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9c6c":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("2b4c")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "a481":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__("cb7c");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var toInteger = __webpack_require__("4588");
var advanceStringIndex = __webpack_require__("0390");
var regExpExec = __webpack_require__("5f1b");
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__("214f")('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),

/***/ "a755":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__("6b54"), __webpack_require__("2397"), __webpack_require__("262e"), __webpack_require__("99de"), __webpack_require__("7e84"), __webpack_require__("d4ec"), __webpack_require__("bee2"), __webpack_require__("95b7"), __webpack_require__("b6e0")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _es6Regexp, _es6Reflect, _inherits2, _possibleConstructorReturn2, _getPrototypeOf2, _classCallCheck2, _createClass2, _baseMonitor, _baseConfig) {
  "use strict";

  var _interopRequireDefault = __webpack_require__("288e");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _inherits2 = _interopRequireDefault(_inherits2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _baseMonitor = _interopRequireDefault(_baseMonitor);

  function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  /**
   * ajax error异常
   */
  var AjaxError = /*#__PURE__*/function () {
    function AjaxError(params) {
      (0, _classCallCheck2.default)(this, AjaxError);
      this.params = params;
    }
    /**
     * 处理错误
     * @param type {*} ajax库类型
     * @param error{*} 错误信息
     */


    (0, _createClass2.default)(AjaxError, [{
      key: "handleError",
      value: function handleError(type, err) {
        switch (type) {
          case _baseConfig.AjaxLibEnum.AXIOS:
            new AxiosError(this.params).handleError(err);
            break;

          default:
            new XHRError(this.params).handleError();
            break;
        }
      }
    }]);
    return AjaxError;
  }();

  var _default = AjaxError;
  /**
   * Axios类库 错误信息处理(如果不配置，可以统一通过XHR接受错误信息)
   */

  _exports.default = _default;

  var AxiosError = /*#__PURE__*/function (_BaseMonitor) {
    (0, _inherits2.default)(AxiosError, _BaseMonitor);

    var _super = _createSuper(AxiosError);

    function AxiosError(params) {
      (0, _classCallCheck2.default)(this, AxiosError);
      return _super.call(this, params);
    }

    (0, _createClass2.default)(AxiosError, [{
      key: "handleError",
      value: function handleError(error) {
        if (error && error.config && error.config.url) {
          this.url = error.config.url;
        }

        this.level = _baseConfig.ErrorLevelEnum.WARN;
        this.category = _baseConfig.ErrorCategoryEnum.AJAX_ERROR;
        this.msg = JSON.stringify(error);
        this.recordError();
      }
    }]);
    return AxiosError;
  }(_baseMonitor.default);
  /**
   * 获取HTTP错误信息
   */


  var XHRError = /*#__PURE__*/function (_BaseMonitor2) {
    (0, _inherits2.default)(XHRError, _BaseMonitor2);

    var _super2 = _createSuper(XHRError);

    function XHRError(params) {
      (0, _classCallCheck2.default)(this, XHRError);
      return _super2.call(this, params);
    }
    /**
     * 获取错误信息
     */


    (0, _createClass2.default)(XHRError, [{
      key: "handleError",
      value: function handleError() {
        var _this = this;

        if (!window.XMLHttpRequest) {
          return;
        }

        var xhrSend = XMLHttpRequest.prototype.send;

        var _handleEvent = function _handleEvent(event) {
          try {
            if (event && event.currentTarget && event.currentTarget.status !== 200) {
              _this.level = _baseConfig.ErrorLevelEnum.WARN;
              _this.category = _baseConfig.ErrorCategoryEnum.AJAX_ERROR;
              _this.msg = event.target.response;
              _this.url = event.target.responseURL;
              _this.errorObj = {
                status: event.target.status,
                statusText: event.target.statusText
              };

              _this.recordError();
            }
          } catch (error) {
            console.log(error);
          }
        };

        XMLHttpRequest.prototype.send = function () {
          if (this.addEventListener) {
            this.addEventListener('error', _handleEvent);
            this.addEventListener('load', _handleEvent);
            this.addEventListener('abort', _handleEvent);
          } else {
            var tempStateChange = this.onreadystatechange;

            this.onreadystatechange = function (event) {
              tempStateChange.apply(this, arguments);

              if (this.readyState === 4) {
                _handleEvent(event);
              }
            };
          }

          return xhrSend.apply(this, arguments);
        };
      }
    }]);
    return XHRError;
  }(_baseMonitor.default);
});

/***/ }),

/***/ "aae3":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__("d3f4");
var cof = __webpack_require__("2d95");
var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ "ac6a":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("cadf");
var getKeys = __webpack_require__("0d58");
var redefine = __webpack_require__("2aba");
var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var wks = __webpack_require__("2b4c");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "ade3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _defineProperty; });
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

/***/ }),

/***/ "b0c5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpExec = __webpack_require__("520a");
__webpack_require__("5ca1")({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


/***/ }),

/***/ "b6e0":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__("d4ec"), __webpack_require__("bee2")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _classCallCheck2, _createClass2) {
  "use strict";

  var _interopRequireDefault = __webpack_require__("288e");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.AjaxLibEnum = _exports.ErrorLevelEnum = _exports.ErrorCategoryEnum = void 0;
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);

  /**
   * 错误类型枚举
   */
  var ErrorCategoryEnum = /*#__PURE__*/function () {
    function ErrorCategoryEnum() {
      (0, _classCallCheck2.default)(this, ErrorCategoryEnum);
    }

    (0, _createClass2.default)(ErrorCategoryEnum, null, [{
      key: "JS_ERROR",

      /**
       * js 错误
       */
      get: function get() {
        return "js_error";
      }
      /**
       * 资源引用错误
       */

    }, {
      key: "RESOURCE_ERROR",
      get: function get() {
        return "resource_error";
      }
      /**
       * Vue错误
       */

    }, {
      key: "VUE_ERROR",
      get: function get() {
        return "vue_error";
      }
      /**
       * promise 错误
       */

    }, {
      key: "PROMISE_ERROR",
      get: function get() {
        return "promise_error";
      }
      /**
       * ajax异步请求错误
       */

    }, {
      key: "AJAX_ERROR",
      get: function get() {
        return "ajax_error";
      }
      /**
       * 控制台错误console.info
       */

    }, {
      key: "CONSOLE_INFO",
      get: function get() {
        return "console_info";
      }
      /**
       * 控制台错误console.warn
       */

    }, {
      key: "CONSOLE_WARN",
      get: function get() {
        return "console_warn";
      }
      /**
       * 控制台错误console.error
       */

    }, {
      key: "CONSOLE_ERROR",
      get: function get() {
        return "console_error";
      }
      /**
       * 跨域js错误
       */

    }, {
      key: "CROSS_SCRIPT_ERROR",
      get: function get() {
        return "cross_srcipt_error";
      }
      /**
       * 未知异常
       */

    }, {
      key: "UNKNOW_ERROR",
      get: function get() {
        return "unknow_error";
      }
    }]);
    return ErrorCategoryEnum;
  }();
  /**
   * 错误level枚举
   */


  _exports.ErrorCategoryEnum = ErrorCategoryEnum;

  var ErrorLevelEnum = /*#__PURE__*/function () {
    function ErrorLevelEnum() {
      (0, _classCallCheck2.default)(this, ErrorLevelEnum);
    }

    (0, _createClass2.default)(ErrorLevelEnum, null, [{
      key: "ERROR",

      /**
       * 错误信息
       */
      get: function get() {
        return "Error";
      }
      /**
       * 警告信息
       */

    }, {
      key: "WARN",
      get: function get() {
        return "Warning";
      }
      /**
       * 日志信息
       */

    }, {
      key: "INFO",
      get: function get() {
        return "Info";
      }
    }]);
    return ErrorLevelEnum;
  }();
  /**
   * Ajax库枚举
   */


  _exports.ErrorLevelEnum = ErrorLevelEnum;

  var AjaxLibEnum = /*#__PURE__*/function () {
    function AjaxLibEnum() {
      (0, _classCallCheck2.default)(this, AjaxLibEnum);
    }

    (0, _createClass2.default)(AjaxLibEnum, null, [{
      key: "AXIOS",
      get: function get() {
        return 'axios';
      }
    }, {
      key: "DEFAULT",
      get: function get() {
        return 'default';
      }
    }]);
    return AjaxLibEnum;
  }();

  _exports.AjaxLibEnum = AjaxLibEnum;
});

/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "bee2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _createClass; });
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

/***/ }),

/***/ "c1cc":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__("d4ec"), __webpack_require__("bee2")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _classCallCheck2, _createClass2) {
  "use strict";

  var _interopRequireDefault = __webpack_require__("288e");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);

  /**
   * 数据持久化
   */
  var API = /*#__PURE__*/function () {
    function API(url) {
      (0, _classCallCheck2.default)(this, API);
      this.url = url;
    }
    /**
     * 上报信息 （默认方式）
     */


    (0, _createClass2.default)(API, [{
      key: "report",
      value: function report(data) {
        if (!this.checkUrl(this.url)) {
          console.log("上报信息url地址格式不正确,url=", this.url);
          return;
        }

        console.log("上报地址：" + this.url);
        this.sendInfo(data);
      }
      /**
       * 发送消息
       */

    }, {
      key: "sendInfo",
      value: function sendInfo(data) {
        try {
          var xhr = new XMLHttpRequest();
          xhr.open("POST", this.url, true); //xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.send(JSON.stringify(data));
        } catch (error) {
          console.log(error);
        }
      }
      /**
       * 通过img方式上报信息
       */

    }, {
      key: "reportByImg",
      value: function reportByImg(data) {
        if (!this.checkUrl(this.url)) {
          console.log("上报信息url地址格式不正确,url=", this.url);
          return;
        }

        try {
          var img = new Image();
          img.src = this.url + '?v=' + new Date().getTime() + '&' + this.formatParams(data);
        } catch (error) {
          console.log(error);
        }
      }
      /*
       *格式化参数
       */

    }, {
      key: "formatParams",
      value: function formatParams(data) {
        var arr = [];

        for (var name in data) {
          arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }

        return arr.join("&");
      }
      /**
       * 检测URL
       */

    }, {
      key: "checkUrl",
      value: function checkUrl(url) {
        if (!url) {
          return false;
        }

        var urlRule = /^[hH][tT][tT][pP]([sS]?):\/\//;
        return urlRule.test(url);
      }
    }]);
    return API;
  }();

  var _default = API;
  _exports.default = _default;
});

/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cadf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("9c6c");
var step = __webpack_require__("d53b");
var Iterators = __webpack_require__("84f2");
var toIObject = __webpack_require__("6821");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("01f9")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("69a8");
var toIObject = __webpack_require__("6821");
var arrayIndexOf = __webpack_require__("c366")(false);
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d4ec":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _classCallCheck; });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ "d53b":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "da75":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__("ac6a"), __webpack_require__("6b54"), __webpack_require__("28a5"), __webpack_require__("a481")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _webDom, _es6Regexp, _es6Regexp2, _es6Regexp3) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var DeviceInfo = function () {
    var root = typeof self !== 'undefined' ? self : this;

    var _window = root || {}; // 变量库


    var VariableLibrary = {
      navigator: typeof root.navigator != 'undefined' ? root.navigator : {},
      // 信息map
      infoMap: {
        engine: ['WebKit', 'Trident', 'Gecko', 'Presto'],
        browser: ['Safari', 'Chrome', 'Edge', 'IE', 'Firefox', 'Firefox Focus', 'Chromium', 'Opera', 'Vivaldi', 'Yandex', 'Arora', 'Lunascape', 'QupZilla', 'Coc Coc', 'Kindle', 'Iceweasel', 'Konqueror', 'Iceape', 'SeaMonkey', 'Epiphany', '360', '360SE', '360EE', 'UC', 'QQBrowser', 'QQ', 'Baidu', 'Maxthon', 'Sogou', 'LBBROWSER', '2345Explorer', 'TheWorld', 'XiaoMi', 'Quark', 'Qiyu', 'Wechat', 'Taobao', 'Alipay', 'Weibo', 'Douban', 'Suning', 'iQiYi'],
        os: ['Windows', 'Linux', 'Mac OS', 'Android', 'Ubuntu', 'FreeBSD', 'Debian', 'iOS', 'Windows Phone', 'BlackBerry', 'MeeGo', 'Symbian', 'Chrome OS', 'WebOS'],
        device: ['Mobile', 'Tablet', 'iPad']
      }
    }; // 方法库

    var MethodLibrary = function () {
      return {
        // 获取匹配库
        getMatchMap: function getMatchMap(u) {
          return {
            // 内核
            Trident: u.indexOf('Trident') > -1 || u.indexOf('NET CLR') > -1,
            Presto: u.indexOf('Presto') > -1,
            WebKit: u.indexOf('AppleWebKit') > -1,
            Gecko: u.indexOf('Gecko/') > -1,
            // 浏览器
            Safari: u.indexOf('Safari') > -1,
            Chrome: u.indexOf('Chrome') > -1 || u.indexOf('CriOS') > -1,
            IE: u.indexOf('MSIE') > -1 || u.indexOf('Trident') > -1,
            Edge: u.indexOf('Edge') > -1,
            Firefox: u.indexOf('Firefox') > -1 || u.indexOf('FxiOS') > -1,
            'Firefox Focus': u.indexOf('Focus') > -1,
            Chromium: u.indexOf('Chromium') > -1,
            Opera: u.indexOf('Opera') > -1 || u.indexOf('OPR') > -1,
            Vivaldi: u.indexOf('Vivaldi') > -1,
            Yandex: u.indexOf('YaBrowser') > -1,
            Arora: u.indexOf('Arora') > -1,
            Lunascape: u.indexOf('Lunascape') > -1,
            QupZilla: u.indexOf('QupZilla') > -1,
            'Coc Coc': u.indexOf('coc_coc_browser') > -1,
            Kindle: u.indexOf('Kindle') > -1 || u.indexOf('Silk/') > -1,
            Iceweasel: u.indexOf('Iceweasel') > -1,
            Konqueror: u.indexOf('Konqueror') > -1,
            Iceape: u.indexOf('Iceape') > -1,
            SeaMonkey: u.indexOf('SeaMonkey') > -1,
            Epiphany: u.indexOf('Epiphany') > -1,
            '360': u.indexOf('QihooBrowser') > -1 || u.indexOf('QHBrowser') > -1,
            '360EE': u.indexOf('360EE') > -1,
            '360SE': u.indexOf('360SE') > -1,
            UC: u.indexOf('UC') > -1 || u.indexOf(' UBrowser') > -1,
            QQBrowser: u.indexOf('QQBrowser') > -1,
            QQ: u.indexOf('QQ/') > -1,
            Baidu: u.indexOf('Baidu') > -1 || u.indexOf('BIDUBrowser') > -1,
            Maxthon: u.indexOf('Maxthon') > -1,
            Sogou: u.indexOf('MetaSr') > -1 || u.indexOf('Sogou') > -1,
            LBBROWSER: u.indexOf('LBBROWSER') > -1,
            '2345Explorer': u.indexOf('2345Explorer') > -1,
            TheWorld: u.indexOf('TheWorld') > -1,
            XiaoMi: u.indexOf('MiuiBrowser') > -1,
            Quark: u.indexOf('Quark') > -1,
            Qiyu: u.indexOf('Qiyu') > -1,
            Wechat: u.indexOf('MicroMessenger') > -1,
            Taobao: u.indexOf('AliApp(TB') > -1,
            Alipay: u.indexOf('AliApp(AP') > -1,
            Weibo: u.indexOf('Weibo') > -1,
            Douban: u.indexOf('com.douban.frodo') > -1,
            Suning: u.indexOf('SNEBUY-APP') > -1,
            iQiYi: u.indexOf('IqiyiApp') > -1,
            // 系统或平台
            Windows: u.indexOf('Windows') > -1,
            Linux: u.indexOf('Linux') > -1 || u.indexOf('X11') > -1,
            'Mac OS': u.indexOf('Macintosh') > -1,
            Android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
            Ubuntu: u.indexOf('Ubuntu') > -1,
            FreeBSD: u.indexOf('FreeBSD') > -1,
            Debian: u.indexOf('Debian') > -1,
            'Windows Phone': u.indexOf('IEMobile') > -1 || u.indexOf('Windows Phone') > -1,
            BlackBerry: u.indexOf('BlackBerry') > -1 || u.indexOf('RIM') > -1,
            MeeGo: u.indexOf('MeeGo') > -1,
            Symbian: u.indexOf('Symbian') > -1,
            iOS: u.indexOf('like Mac OS X') > -1,
            'Chrome OS': u.indexOf('CrOS') > -1,
            WebOS: u.indexOf('hpwOS') > -1,
            // 设备
            Mobile: u.indexOf('Mobi') > -1 || u.indexOf('iPh') > -1 || u.indexOf('480') > -1,
            Tablet: u.indexOf('Tablet') > -1 || u.indexOf('Nexus 7') > -1,
            iPad: u.indexOf('iPad') > -1
          };
        },
        // 在信息map和匹配库中进行匹配
        matchInfoMap: function matchInfoMap(_this) {
          var u = VariableLibrary.navigator.userAgent || {};
          var match = MethodLibrary.getMatchMap(u);

          for (var s in VariableLibrary.infoMap) {
            for (var i = 0; i < VariableLibrary.infoMap[s].length; i++) {
              var value = VariableLibrary.infoMap[s][i];

              if (match[value]) {
                _this[s] = value;
              }
            }
          }
        },
        // 获取当前操作系统
        getOS: function getOS() {
          var _this = this;

          MethodLibrary.matchInfoMap(_this);
          return _this.os;
        },
        // 获取操作系统版本
        getOSVersion: function getOSVersion() {
          var _this = this;

          var u = VariableLibrary.navigator.userAgent || {};
          _this.osVersion = ''; // 系统版本信息

          var osVersion = {
            Windows: function Windows() {
              var v = u.replace(/^.*Windows NT ([\d.]+);.*$/, '$1');
              var oldWindowsVersionMap = {
                '6.4': '10',
                '6.3': '8.1',
                '6.2': '8',
                '6.1': '7',
                '6.0': 'Vista',
                '5.2': 'XP',
                '5.1': 'XP',
                '5.0': '2000'
              };
              return oldWindowsVersionMap[v] || v;
            },
            Android: function Android() {
              return u.replace(/^.*Android ([\d.]+);.*$/, '$1');
            },
            iOS: function iOS() {
              return u.replace(/^.*OS ([\d_]+) like.*$/, '$1').replace(/_/g, '.');
            },
            Debian: function Debian() {
              return u.replace(/^.*Debian\/([\d.]+).*$/, '$1');
            },
            'Windows Phone': function WindowsPhone() {
              return u.replace(/^.*Windows Phone( OS)? ([\d.]+);.*$/, '$2');
            },
            'Mac OS': function MacOS() {
              return u.replace(/^.*Mac OS X ([\d_]+).*$/, '$1').replace(/_/g, '.');
            },
            WebOS: function WebOS() {
              return u.replace(/^.*hpwOS\/([\d.]+);.*$/, '$1');
            }
          };

          if (osVersion[_this.os]) {
            _this.osVersion = osVersion[_this.os]();

            if (_this.osVersion == u) {
              _this.osVersion = '';
            }
          }

          return _this.osVersion;
        },
        // 获取横竖屏状态
        getOrientationStatu: function getOrientationStatu() {
          var orientationStatus = '';
          var orientation = window.matchMedia('(orientation: portrait)');

          if (orientation.matches) {
            orientationStatus = '竖屏';
          } else {
            orientationStatus = '横屏';
          }

          return orientationStatus;
        },
        // 获取设备类型
        getDeviceType: function getDeviceType() {
          var _this = this;

          _this.device = 'PC';
          MethodLibrary.matchInfoMap(_this);
          return _this.device;
        },
        // 获取网络状态
        getNetwork: function getNetwork() {
          var netWork = navigator && navigator.connection && navigator.connection.effectiveType;
          return netWork;
        },
        // 获取当前语言
        getLanguage: function getLanguage() {
          var _this = this;

          _this.language = function () {
            var language = VariableLibrary.navigator.browserLanguage || VariableLibrary.navigator.language;
            var arr = language.split('-');

            if (arr[1]) {
              arr[1] = arr[1].toUpperCase();
            }

            return arr.join('_');
          }();

          return _this.language;
        },
        // 生成浏览器指纹
        createFingerprint: function createFingerprint(domain) {
          var fingerprint;

          function bin2hex(s) {
            var i,
                l,
                n,
                o = '';
            s += '';

            for (i = 0, l = s.length; i < l; i++) {
              n = s.charCodeAt(i).toString(16);
              o += n.length < 2 ? '0' + n : n;
            }

            return o;
          }

          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');
          var txt = domain || window.location.host;
          ctx.textBaseline = 'top';
          ctx.font = "14px 'Arial'";
          ctx.textBaseline = 'tencent';
          ctx.fillStyle = '#f60';
          ctx.fillRect(125, 1, 62, 20);
          ctx.fillStyle = '#069';
          ctx.fillText(txt, 2, 15);
          ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
          ctx.fillText(txt, 4, 17);
          var b64 = canvas.toDataURL().replace('data:image/png;base64,', '');
          var bin = atob(b64);
          var crc = bin2hex(bin.slice(-16, -12));
          fingerprint = crc;
          return fingerprint;
        },
        // 浏览器信息
        getBrowserInfo: function getBrowserInfo() {
          var _this = this;

          MethodLibrary.matchInfoMap(_this);
          var u = VariableLibrary.navigator.userAgent || {};

          var _mime = function _mime(option, value) {
            var mimeTypes = VariableLibrary.navigator.mimeTypes;

            for (var key in mimeTypes) {
              if (mimeTypes[key][option] == value) {
                return true;
              }
            }

            return false;
          };

          var match = MethodLibrary.getMatchMap(u);
          var is360 = false;

          if (_window.chrome) {
            var chrome_vision = u.replace(/^.*Chrome\/([\d]+).*$/, '$1');

            if (chrome_vision > 36 && _window.showModalDialog) {
              is360 = true;
            } else if (chrome_vision > 45) {
              is360 = _mime('type', 'application/vnd.chromium.remoting-viewer');
            }
          }

          if (match['Baidu'] && match['Opera']) {
            match['Baidu'] = false;
          }

          if (match['Mobile']) {
            match['Mobile'] = !(u.indexOf('iPad') > -1);
          }

          if (is360) {
            if (_mime('type', 'application/gameplugin')) {
              match['360SE'] = true;
            } else if (VariableLibrary.navigator && typeof VariableLibrary.navigator['connection']['saveData'] == 'undefined') {
              match['360SE'] = true;
            } else {
              match['360EE'] = true;
            }
          }

          if (match['IE'] || match['Edge']) {
            var navigator_top = window.screenTop - window.screenY;

            switch (navigator_top) {
              case 71:
                // 无收藏栏,贴边
                break;

              case 74:
                // 无收藏栏,非贴边
                break;

              case 99:
                // 有收藏栏,贴边
                break;

              case 102:
                // 有收藏栏,非贴边
                match['360EE'] = true;
                break;

              case 75:
                // 无收藏栏,贴边
                break;

              case 74:
                // 无收藏栏,非贴边
                break;

              case 105:
                // 有收藏栏,贴边
                break;

              case 104:
                // 有收藏栏,非贴边
                match['360SE'] = true;
                break;

              default:
                break;
            }
          }

          var browerVersionMap = {
            Safari: function Safari() {
              return u.replace(/^.*Version\/([\d.]+).*$/, '$1');
            },
            Chrome: function Chrome() {
              return u.replace(/^.*Chrome\/([\d.]+).*$/, '$1').replace(/^.*CriOS\/([\d.]+).*$/, '$1');
            },
            IE: function IE() {
              return u.replace(/^.*MSIE ([\d.]+).*$/, '$1').replace(/^.*rv:([\d.]+).*$/, '$1');
            },
            Edge: function Edge() {
              return u.replace(/^.*Edge\/([\d.]+).*$/, '$1');
            },
            Firefox: function Firefox() {
              return u.replace(/^.*Firefox\/([\d.]+).*$/, '$1').replace(/^.*FxiOS\/([\d.]+).*$/, '$1');
            },
            'Firefox Focus': function FirefoxFocus() {
              return u.replace(/^.*Focus\/([\d.]+).*$/, '$1');
            },
            Chromium: function Chromium() {
              return u.replace(/^.*Chromium\/([\d.]+).*$/, '$1');
            },
            Opera: function Opera() {
              return u.replace(/^.*Opera\/([\d.]+).*$/, '$1').replace(/^.*OPR\/([\d.]+).*$/, '$1');
            },
            Vivaldi: function Vivaldi() {
              return u.replace(/^.*Vivaldi\/([\d.]+).*$/, '$1');
            },
            Yandex: function Yandex() {
              return u.replace(/^.*YaBrowser\/([\d.]+).*$/, '$1');
            },
            Arora: function Arora() {
              return u.replace(/^.*Arora\/([\d.]+).*$/, '$1');
            },
            Lunascape: function Lunascape() {
              return u.replace(/^.*Lunascape[\/\s]([\d.]+).*$/, '$1');
            },
            QupZilla: function QupZilla() {
              return u.replace(/^.*QupZilla[\/\s]([\d.]+).*$/, '$1');
            },
            'Coc Coc': function CocCoc() {
              return u.replace(/^.*coc_coc_browser\/([\d.]+).*$/, '$1');
            },
            Kindle: function Kindle() {
              return u.replace(/^.*Version\/([\d.]+).*$/, '$1');
            },
            Iceweasel: function Iceweasel() {
              return u.replace(/^.*Iceweasel\/([\d.]+).*$/, '$1');
            },
            Konqueror: function Konqueror() {
              return u.replace(/^.*Konqueror\/([\d.]+).*$/, '$1');
            },
            Iceape: function Iceape() {
              return u.replace(/^.*Iceape\/([\d.]+).*$/, '$1');
            },
            SeaMonkey: function SeaMonkey() {
              return u.replace(/^.*SeaMonkey\/([\d.]+).*$/, '$1');
            },
            Epiphany: function Epiphany() {
              return u.replace(/^.*Epiphany\/([\d.]+).*$/, '$1');
            },
            '360': function _() {
              return u.replace(/^.*QihooBrowser\/([\d.]+).*$/, '$1');
            },
            '360SE': function SE() {
              var hash = {
                '63': '10.0',
                '55': '9.1',
                '45': '8.1',
                '42': '8.0',
                '31': '7.0',
                '21': '6.3'
              };
              var chrome_vision = u.replace(/^.*Chrome\/([\d]+).*$/, '$1');
              return hash[chrome_vision] || '';
            },
            '360EE': function EE() {
              var hash = {
                '69': '11.0',
                '63': '9.5',
                '55': '9.0',
                '50': '8.7',
                '30': '7.5'
              };
              var chrome_vision = u.replace(/^.*Chrome\/([\d]+).*$/, '$1');
              return hash[chrome_vision] || '';
            },
            Maxthon: function Maxthon() {
              return u.replace(/^.*Maxthon\/([\d.]+).*$/, '$1');
            },
            QQBrowser: function QQBrowser() {
              return u.replace(/^.*QQBrowser\/([\d.]+).*$/, '$1');
            },
            QQ: function QQ() {
              return u.replace(/^.*QQ\/([\d.]+).*$/, '$1');
            },
            Baidu: function Baidu() {
              return u.replace(/^.*BIDUBrowser[\s\/]([\d.]+).*$/, '$1');
            },
            UC: function UC() {
              return u.replace(/^.*UC?Browser\/([\d.]+).*$/, '$1');
            },
            Sogou: function Sogou() {
              return u.replace(/^.*SE ([\d.X]+).*$/, '$1').replace(/^.*SogouMobileBrowser\/([\d.]+).*$/, '$1');
            },
            LBBROWSER: function LBBROWSER() {
              var hash = {
                '57': '6.5',
                '49': '6.0',
                '46': '5.9',
                '42': '5.3',
                '39': '5.2',
                '34': '5.0',
                '29': '4.5',
                '21': '4.0'
              };
              var chrome_vision = navigator.userAgent.replace(/^.*Chrome\/([\d]+).*$/, '$1');
              return hash[chrome_vision] || '';
            },
            '2345Explorer': function Explorer() {
              return u.replace(/^.*2345Explorer\/([\d.]+).*$/, '$1');
            },
            TheWorld: function TheWorld() {
              return u.replace(/^.*TheWorld ([\d.]+).*$/, '$1');
            },
            XiaoMi: function XiaoMi() {
              return u.replace(/^.*MiuiBrowser\/([\d.]+).*$/, '$1');
            },
            Quark: function Quark() {
              return u.replace(/^.*Quark\/([\d.]+).*$/, '$1');
            },
            Qiyu: function Qiyu() {
              return u.replace(/^.*Qiyu\/([\d.]+).*$/, '$1');
            },
            Wechat: function Wechat() {
              return u.replace(/^.*MicroMessenger\/([\d.]+).*$/, '$1');
            },
            Taobao: function Taobao() {
              return u.replace(/^.*AliApp\(TB\/([\d.]+).*$/, '$1');
            },
            Alipay: function Alipay() {
              return u.replace(/^.*AliApp\(AP\/([\d.]+).*$/, '$1');
            },
            Weibo: function Weibo() {
              return u.replace(/^.*weibo__([\d.]+).*$/, '$1');
            },
            Douban: function Douban() {
              return u.replace(/^.*com.douban.frodo\/([\d.]+).*$/, '$1');
            },
            Suning: function Suning() {
              return u.replace(/^.*SNEBUY-APP([\d.]+).*$/, '$1');
            },
            iQiYi: function iQiYi() {
              return u.replace(/^.*IqiyiVersion\/([\d.]+).*$/, '$1');
            }
          };
          _this.browserVersion = '';

          if (browerVersionMap[_this.browser]) {
            _this.browserVersion = browerVersionMap[_this.browser]();

            if (_this.browserVersion == u) {
              _this.browserVersion = '';
            }
          }

          if (_this.browser == 'Edge') {
            _this.engine = 'EdgeHTML';
          }

          if (_this.browser == 'Chrome' && parseInt(_this.browserVersion) > 27) {
            _this.engine = 'Blink';
          }

          if (_this.browser == 'Opera' && parseInt(_this.browserVersion) > 12) {
            _this.engine = 'Blink';
          }

          if (_this.browser == 'Yandex') {
            _this.engine = 'Blink';
          }

          return _this.browser + '（版本: ' + _this.browserVersion + '&nbsp;&nbsp;内核: ' + _this.engine + '）';
        }
      };
    }(); // 逻辑层


    var LogicLibrary = function () {
      return {
        DeviceInfoObj: function DeviceInfoObj(params) {
          params = params || {
            domain: ''
          };
          var info = {
            deviceType: MethodLibrary.getDeviceType(),
            // 设备类型
            OS: MethodLibrary.getOS(),
            // 操作系统
            OSVersion: MethodLibrary.getOSVersion(),
            // 操作系统版本
            screenHeight: _window.screen.height,
            // 屏幕高
            screenWidth: _window.screen.width,
            // 屏幕宽
            language: MethodLibrary.getLanguage(),
            // 当前使用的语言-国家
            netWork: MethodLibrary.getNetwork(),
            // 联网类型
            orientation: MethodLibrary.getOrientationStatu(),
            // 横竖屏
            browserInfo: MethodLibrary.getBrowserInfo(),
            // 浏览器信息
            fingerprint: MethodLibrary.createFingerprint(params.domain),
            // 浏览器指纹
            userAgent: VariableLibrary.navigator.userAgent // 包含 appCodeName,appName,appVersion,language,platform 等

          };

          if (!params.info || params.info.length == 0) {
            return info;
          }

          var infoTemp = {};

          for (var i in info) {
            params.info.forEach(function (item) {
              if (item.toLowerCase() == i.toLowerCase()) {
                item = i;
                infoTemp[item] = info[item];
              }
            });
          }

          return infoTemp;
        }
      };
    }(); // 对外暴露方法


    return {
      getDeviceInfo: function getDeviceInfo(params) {
        return LogicLibrary.DeviceInfoObj(params);
      }
    };
  }();

  var _default = DeviceInfo;
  _exports.default = _default;
});

/***/ }),

/***/ "dcbb":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__("da75")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _device) {
  "use strict";

  var _interopRequireDefault = __webpack_require__("288e");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _device = _interopRequireDefault(_device);
  var _default = _device.default;
  _exports.default = _default;
});

/***/ }),

/***/ "de86":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__("d4ec"), __webpack_require__("bee2"), __webpack_require__("9111"), __webpack_require__("b6e0"), __webpack_require__("e40c"), __webpack_require__("ef9e")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _classCallCheck2, _createClass2, _error, _baseConfig, _performance, _utils) {
  "use strict";

  var _interopRequireDefault = __webpack_require__("288e");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _performance = _interopRequireDefault(_performance);
  _utils = _interopRequireDefault(_utils);

  var MonitorJS = /*#__PURE__*/function () {
    function MonitorJS() {
      (0, _classCallCheck2.default)(this, MonitorJS);
      this.jsError = true;
      this.promiseError = true;
      this.resourceError = true;
      this.ajaxError = true;
      this.consoleError = false; //console.error默认不处理

      this.vueError = false;
    }
    /**
     * 处理异常信息初始化
     * @param {*} options
     */


    (0, _createClass2.default)(MonitorJS, [{
      key: "init",
      value: function init(options) {
        options = options || {};
        this.jsError = options.jsError || this.jsError;
        this.promiseError = options.promiseError || this.promiseError;
        this.resourceError = options.resourceError || this.resourceError;
        this.ajaxError = options.ajaxError || this.ajaxError;
        this.consoleError = options.consoleError || this.consoleError;
        this.vueError = options.vueError || this.vueError;
        var reportUrl = options.url; //上报错误地址

        var extendsInfo = options.extendsInfo || {}; //扩展信息（一般用于系统个性化分析）

        var param = {
          reportUrl: reportUrl,
          extendsInfo: extendsInfo
        };

        if (this.jsError) {
          new _error.JsError(param).handleError();
        }

        if (this.promiseError) {
          new _error.PromiseError(param).handleError();
        }

        if (this.resourceError) {
          new _error.ResourceError(param).handleError();
        }

        if (this.ajaxError) {
          new _error.AjaxError(param).handleError(_baseConfig.AjaxLibEnum.DEFAULT);
        }

        if (this.consoleError) {
          new _error.ConsoleError(param).handleError();
        }

        if (this.vueError && options.vue) {
          new _error.VueError(param).handleError(options.vue);
        }
      }
      /**
       * 监听页面性能
       * @param {*} options {pageId：页面标示,url：上报地址}
       */

    }, {
      key: "monitorPerformance",
      value: function monitorPerformance(options) {
        options = options || {};
        var pageId = options.pageId || '';
        var url = options.url || '';
        new _performance.default().record({
          pageId: pageId,
          url: url
        });
      }
    }]);
    return MonitorJS;
  }();

  var _default = MonitorJS;
  _exports.default = _default;
});

/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "e40c":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__("d4ec"), __webpack_require__("bee2"), __webpack_require__("532d"), __webpack_require__("dcbb"), __webpack_require__("c1cc")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _classCallCheck2, _createClass2, _performance, _device, _api) {
  "use strict";

  var _interopRequireDefault = __webpack_require__("288e");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _performance = _interopRequireDefault(_performance);
  _device = _interopRequireDefault(_device);
  _api = _interopRequireDefault(_api);

  /**
   * 监控工具
   */
  var MonitorPerformance = /*#__PURE__*/function () {
    function MonitorPerformance() {
      (0, _classCallCheck2.default)(this, MonitorPerformance);
      this.isPage = true; //是否上报页面性能数据

      this.isResource = true; //是否上报页面资源数据

      this.outTime = 50;
      this.config = {
        resourceList: [],
        //资源列表
        performance: {} //页面性能列表

      };
    }
    /**
     * 记录页面信息
     * @param {*} params  {pageId ：页面标示,url ：上报地址}
     */


    (0, _createClass2.default)(MonitorPerformance, [{
      key: "record",
      value: function record(params) {
        var _this = this;

        setTimeout(function () {
          if (_this.isPage) {
            _this.config.performance = _performance.default.getTiming();
          }

          if (_this.isResource) {
            _this.config.resourceList = _performance.default.getEntries();
          }

          var result = {
            time: new Date().getTime(),
            performance: _this.config.performance,
            resourceList: _this.config.resourceList,
            markUser: _this.markUser(),
            markUv: _this.markUv(),
            pageId: params ? params.pageId : '',
            deviceInfo: _this.getDeviceInfo()
          };
          console.log('report data =', result); //发送监控数据

          new _api.default(params.url).report(result);

          _this.clearPerformance();
        }, this.outTime);
      }
      /**
       * 获取设备信息
       */

    }, {
      key: "getDeviceInfo",
      value: function getDeviceInfo() {
        try {
          var deviceInfo = _device.default.getDeviceInfo();

          return JSON.stringify(deviceInfo);
        } catch (error) {
          console.log(error);
          return '';
        }
      }
    }, {
      key: "randomString",
      value: function randomString(len) {
        len = len || 10;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789';
        var maxPos = $chars.length;
        var pwd = '';

        for (var i = 0; i < len; i++) {
          pwd = pwd + $chars.charAt(Math.floor(Math.random() * maxPos));
        }

        return pwd + new Date().getTime();
      }
      /**
       * 获得markpage
       */

    }, {
      key: "markUser",
      value: function markUser() {
        var psMarkUser = sessionStorage.getItem('ps_markUser') || '';

        if (!psMarkUser) {
          psMarkUser = this.randomString();
          sessionStorage.setItem('ps_markUser', psMarkUser);
        }

        return psMarkUser;
      }
      /**
       * 获得Uv
       */

    }, {
      key: "markUv",
      value: function markUv() {
        var date = new Date();
        var psMarkUv = localStorage.getItem('ps_markUv') || '';
        var datatime = localStorage.getItem('ps_markUvTime') || '';
        var today = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' 23:59:59';

        if (!psMarkUv && !datatime || date.getTime() > datatime * 1) {
          psMarkUv = this.randomString();
          localStorage.setItem('ps_markUv', psMarkUv);
          localStorage.setItem('ps_markUvTime', new Date(today).getTime());
        }

        return psMarkUv;
      }
      /*
       * 清空记录
       */

    }, {
      key: "clearPerformance",
      value: function clearPerformance() {
        if (window.performance && window.performance.clearResourceTimings) {
          performance.clearResourceTimings();
          this.config.performance = {};
          this.config.resourceList = '';
        }
      }
    }]);
    return MonitorPerformance;
  }();

  var _default = MonitorPerformance;
  _exports.default = _default;
});

/***/ }),

/***/ "e8d1":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__("6b54"), __webpack_require__("2397"), __webpack_require__("d4ec"), __webpack_require__("bee2"), __webpack_require__("262e"), __webpack_require__("99de"), __webpack_require__("7e84"), __webpack_require__("95b7"), __webpack_require__("b6e0")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _es6Regexp, _es6Reflect, _classCallCheck2, _createClass2, _inherits2, _possibleConstructorReturn2, _getPrototypeOf2, _baseMonitor, _baseConfig) {
  "use strict";

  var _interopRequireDefault = __webpack_require__("288e");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _baseMonitor = _interopRequireDefault(_baseMonitor);

  function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  /**
   * 捕获JS错误
   */
  var JSError = /*#__PURE__*/function (_BaseMonitor) {
    (0, _inherits2.default)(JSError, _BaseMonitor);

    var _super = _createSuper(JSError);

    function JSError(params) {
      (0, _classCallCheck2.default)(this, JSError);
      return _super.call(this, params);
    }
    /**
     * 注册onerror事件
     */


    (0, _createClass2.default)(JSError, [{
      key: "handleError",
      value: function handleError() {
        var _this = this;

        window.onerror = function (msg, url, line, col, error) {
          try {
            _this.level = _baseConfig.ErrorLevelEnum.WARN;
            _this.category = _baseConfig.ErrorCategoryEnum.JS_ERROR;
            _this.msg = msg;
            _this.url = url;
            _this.line = line;
            _this.col = col || window.event && window.event.errorCharacter || null;
            _this.errorObj = error;
            console.log('url', _this.url);

            _this.recordError();
          } catch (error) {
            console.log('js错误异常', error);
          }
        };
      }
    }]);
    return JSError;
  }(_baseMonitor.default);

  var _default = JSError;
  _exports.default = _default;
});

/***/ }),

/***/ "ebd6":
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__("cb7c");
var aFunction = __webpack_require__("d8e8");
var SPECIES = __webpack_require__("2b4c")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "ef9e":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__("6b54"), __webpack_require__("a481")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _es6Regexp, _es6Regexp2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    type: function type(obj) {
      return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '');
    },
    isFunction: function isFunction(func) {
      return this.type(func) === "Function";
    },
    isArray: function isArray(list) {
      return this.type(list) === 'Array';
    },

    /**
     * 是否为null
     * @param {String} str 
     */
    isNull: function isNull(str) {
      return str == undefined || str == '' || str == null;
    },

    /**
     * 对象是否为空
     * @param {*} obj 
     */
    objectIsNull: function objectIsNull(obj) {
      return JSON.stringify(obj) === "{}";
    },

    /**
     * 是否是对象
     * @param {*} obj 
     */
    isObject: function isObject(obj) {
      return this.type(obj) === "Object";
    }
  };
  _exports.default = _default;
});

/***/ }),

/***/ "f0c1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__("d8e8");
var isObject = __webpack_require__("d3f4");
var invoke = __webpack_require__("31f4");
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),

/***/ "f1ae":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ "f776":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__("6b54"), __webpack_require__("2397"), __webpack_require__("2909"), __webpack_require__("d4ec"), __webpack_require__("bee2"), __webpack_require__("262e"), __webpack_require__("99de"), __webpack_require__("7e84"), __webpack_require__("95b7"), __webpack_require__("b6e0")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _es6Regexp, _es6Reflect, _toConsumableArray2, _classCallCheck2, _createClass2, _inherits2, _possibleConstructorReturn2, _getPrototypeOf2, _baseMonitor, _baseConfig) {
  "use strict";

  var _interopRequireDefault = __webpack_require__("288e");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _toConsumableArray2 = _interopRequireDefault(_toConsumableArray2);
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _baseMonitor = _interopRequireDefault(_baseMonitor);

  function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  /**
   * console.error异常
   */
  var ConsoleError = /*#__PURE__*/function (_BaseMonitor) {
    (0, _inherits2.default)(ConsoleError, _BaseMonitor);

    var _super = _createSuper(ConsoleError);

    function ConsoleError(params) {
      (0, _classCallCheck2.default)(this, ConsoleError);
      return _super.call(this, params);
    }
    /**
     * 处理console事件
     */


    (0, _createClass2.default)(ConsoleError, [{
      key: "handleError",
      value: function handleError() {
        this.registerInfo();
        this.registerWarn();
        this.registerError();
      }
      /**
       * 处理信息
       */

    }, {
      key: "registerInfo",
      value: function registerInfo() {
        var t = this;

        console.tInfo = function () {
          t.handleLog(_baseConfig.ErrorLevelEnum.INFO, _baseConfig.ErrorCategoryEnum.CONSOLE_INFO, arguments);
        };
      }
      /**
       * 处理警告
       */

    }, {
      key: "registerWarn",
      value: function registerWarn() {
        var t = this;

        console.tWarn = function () {
          t.handleLog(_baseConfig.ErrorLevelEnum.WARN, _baseConfig.ErrorCategoryEnum.CONSOLE_WARN, arguments);
        };
      }
      /**
       * 处理错误
       */

    }, {
      key: "registerError",
      value: function registerError() {
        var t = this;

        console.tError = function () {
          t.handleLog(_baseConfig.ErrorLevelEnum.ERROR, _baseConfig.ErrorCategoryEnum.CONSOLE_ERROR, arguments);
        };
      }
      /**
       * 处理日志
       */

    }, {
      key: "handleLog",
      value: function handleLog(level, category, args) {
        try {
          this.level = level;
          var params = (0, _toConsumableArray2.default)(args);
          this.msg = params.join("\r\n"); //换行符分割

          this.url = location.href; //当前地址

          this.category = category;
          this.recordError();
        } catch (error) {
          console.log("console统计错误异常", level, error);
        }
      }
    }]);
    return ConsoleError;
  }(_baseMonitor.default);
  /**
   * 初始化console事件
   */


  (function () {
    //创建空console对象，避免JS报错  
    if (!window.console) {
      window.console = {};
    }

    var funcs = ['tInfo', 'tWarn', 'tError'];
    funcs.forEach(function (func, index) {
      if (!console[func]) {
        console[func] = function () {};
      }
    });
  })();

  var _default = ConsoleError;
  _exports.default = _default;
});

/***/ }),

/***/ "fa5b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("5537")('native-function-to-string', Function.toString);


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _setPublicPath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1eb2");
/* harmony import */ var _entry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("3a0d");
/* harmony import */ var _entry__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_entry__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _entry__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _entry__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/* harmony default export */ __webpack_exports__["default"] = (_entry__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ })

/******/ });