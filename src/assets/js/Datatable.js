/*!
 * jQuery JavaScript Library v3.7.0
 * https://jquery.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2023-05-11T18:29Z
 */
(function (global, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    // For CommonJS and CommonJS-like environments where a proper `window`
    // is present, execute the factory and get jQuery.
    // For environments that do not have a `window` with a `document`
    // (such as Node.js), expose a factory as module.exports.
    // This accentuates the need for the creation of a real `window`.
    // e.g. var jQuery = require("jquery")(window);
    // See ticket trac-14549 for more info.
    module.exports = global.document
      ? factory(global, true)
      : function (w) {
        if (!w.document) {
          throw new Error('jQuery requires a window with a document');
        }
        return factory(w);
      };
  } else {
    factory(global);
  }

// Pass this if window is not defined yet
}(typeof window !== 'undefined' ? window : this, (window, noGlobal) => {
// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
  // throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
  // arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
  // enough that all such attempts are guarded in a try block.

  let arr = [];

  const getProto = Object.getPrototypeOf;

  const { slice } = arr;

  const flat = arr.flat ? function (array) {
    return arr.flat.call(array);
  } : function (array) {
    return arr.concat.apply([], array);
  };

  const { push } = arr;

  const { indexOf } = arr;

  const class2type = {};

  const { toString } = class2type;

  const hasOwn = class2type.hasOwnProperty;

  const fnToString = hasOwn.toString;

  const ObjectFunctionString = fnToString.call(Object);

  const support = {};

  const isFunction = function isFunction(obj) {
    // Support: Chrome <=57, Firefox <=52
    // In some browsers, typeof returns "function" for HTML <object> elements
    // (i.e., `typeof document.createElement( "object" ) === "function"`).
    // We don't want to classify *any* DOM node as a function.
    // Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
    // Plus for old WebKit, typeof returns "function" for HTML collections
    // (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
    return typeof obj === 'function' && typeof obj.nodeType !== 'number'
			&& typeof obj.item !== 'function';
  };

  const isWindow = function isWindow(obj) {
    return obj != null && obj === obj.window;
  };

  const { document } = window;

  const preservedScriptAttributes = {
    type: true,
    src: true,
    nonce: true,
    noModule: true,
  };

  function DOMEval(code, node, doc) {
    doc = doc || document;

    let i; let val;
    const script = doc.createElement('script');

    script.text = code;
    if (node) {
      for (i in preservedScriptAttributes) {
        // Support: Firefox 64+, Edge 18+
        // Some browsers don't support the "nonce" property on scripts.
        // On the other hand, just using `getAttribute` is not enough as
        // the `nonce` attribute is reset to an empty string whenever it
        // becomes browsing-context connected.
        // See https://github.com/whatwg/html/issues/2369
        // See https://html.spec.whatwg.org/#nonce-attributes
        // The `node.getAttribute` check was added for the sake of
        // `jQuery.globalEval` so that it can fake a nonce-containing node
        // via an object.
        val = node[i] || node.getAttribute && node.getAttribute(i);
        if (val) {
          script.setAttribute(i, val);
        }
      }
    }
    doc.head.appendChild(script).parentNode.removeChild(script);
  }

  function toType(obj) {
    if (obj == null) {
      return `${obj}`;
    }

    // Support: Android <=2.3 only (functionish RegExp)
    return typeof obj === 'object' || typeof obj === 'function'
      ? class2type[toString.call(obj)] || 'object'
      : typeof obj;
  }
  /* global Symbol */
  // Defining this global in .eslintrc.json would create a danger of using the global
  // unguarded in another place, it seems safer to define global only for this module

  const version = '3.7.0';

  const rhtmlSuffix = /HTML$/i;

  // Define a local copy of jQuery
  const jQuery = function (selector, context) {
    // The jQuery object is actually just the init constructor 'enhanced'
    // Need init if jQuery is called (just allow error to be thrown if not included)
    return new jQuery.fn.init(selector, context);
  };

  jQuery.fn = jQuery.prototype = {

    // The current version of jQuery being used
    jquery: version,

    constructor: jQuery,

    // The default length of a jQuery object is 0
    length: 0,

    toArray() {
      return slice.call(this);
    },

    // Get the Nth element in the matched element set OR
    // Get the whole matched element set as a clean array
    get(num) {
      // Return all the elements in a clean array
      if (num == null) {
        return slice.call(this);
      }

      // Return just the one element from the set
      return num < 0 ? this[num + this.length] : this[num];
    },

    // Take an array of elements and push it onto the stack
    // (returning the new matched element set)
    pushStack(elems) {
      // Build a new jQuery matched element set
      const ret = jQuery.merge(this.constructor(), elems);

      // Add the old object onto the stack (as a reference)
      ret.prevObject = this;

      // Return the newly-formed element set
      return ret;
    },

    // Execute a callback for every element in the matched set.
    each(callback) {
      return jQuery.each(this, callback);
    },

    map(callback) {
      return this.pushStack(jQuery.map(this, (elem, i) => callback.call(elem, i, elem)));
    },

    slice() {
      return this.pushStack(slice.apply(this, arguments));
    },

    first() {
      return this.eq(0);
    },

    last() {
      return this.eq(-1);
    },

    even() {
      return this.pushStack(jQuery.grep(this, (_elem, i) => (i + 1) % 2));
    },

    odd() {
      return this.pushStack(jQuery.grep(this, (_elem, i) => i % 2));
    },

    eq(i) {
      const len = this.length;
      const j = +i + (i < 0 ? len : 0);
      return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
    },

    end() {
      return this.prevObject || this.constructor();
    },

    // For internal use only.
    // Behaves like an Array's method, not like a jQuery method.
    push,
    sort: arr.sort,
    splice: arr.splice,
  };

  jQuery.extend = jQuery.fn.extend = function () {
    let options; let name; let src; let copy; let copyIsArray; let clone;
    let target = arguments[0] || {};
    let i = 1;
    const { length } = arguments;
    let deep = false;

    // Handle a deep copy situation
    if (typeof target === 'boolean') {
      deep = target;

      // Skip the boolean and the target
      target = arguments[i] || {};
      i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== 'object' && !isFunction(target)) {
      target = {};
    }

    // Extend jQuery itself if only one argument is passed
    if (i === length) {
      target = this;
      i--;
    }

    for (; i < length; i++) {
      // Only deal with non-null/undefined values
      if ((options = arguments[i]) != null) {
        // Extend the base object
        for (name in options) {
          copy = options[name];

          // Prevent Object.prototype pollution
          // Prevent never-ending loop
          if (name === '__proto__' || target === copy) {
            continue;
          }

          // Recurse if we're merging plain objects or arrays
          if (deep && copy && (jQuery.isPlainObject(copy)
					|| (copyIsArray = Array.isArray(copy)))) {
            src = target[name];

            // Ensure proper type for the source value
            if (copyIsArray && !Array.isArray(src)) {
              clone = [];
            } else if (!copyIsArray && !jQuery.isPlainObject(src)) {
              clone = {};
            } else {
              clone = src;
            }
            copyIsArray = false;

            // Never move original objects, clone them
            target[name] = jQuery.extend(deep, clone, copy);

            // Don't bring in undefined values
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }

    // Return the modified object
    return target;
  };

  jQuery.extend({

    // Unique for each copy of jQuery on the page
    expando: `jQuery${(version + Math.random()).replace(/\D/g, '')}`,

    // Assume jQuery is ready without the ready module
    isReady: true,

    error(msg) {
      throw new Error(msg);
    },

    noop() {},

    isPlainObject(obj) {
      let proto; let
        Ctor;

      // Detect obvious negatives
      // Use toString instead of jQuery.type to catch host objects
      if (!obj || toString.call(obj) !== '[object Object]') {
        return false;
      }

      proto = getProto(obj);

      // Objects with no prototype (e.g., `Object.create( null )`) are plain
      if (!proto) {
        return true;
      }

      // Objects with prototype are plain iff they were constructed by a global Object function
      Ctor = hasOwn.call(proto, 'constructor') && proto.constructor;
      return typeof Ctor === 'function' && fnToString.call(Ctor) === ObjectFunctionString;
    },

    isEmptyObject(obj) {
      let name;

      for (name in obj) {
        return false;
      }
      return true;
    },

    // Evaluates a script in a provided context; falls back to the global one
    // if not specified.
    globalEval(code, options, doc) {
      DOMEval(code, { nonce: options && options.nonce }, doc);
    },

    each(obj, callback) {
      let length; let
        i = 0;

      if (isArrayLike(obj)) {
        length = obj.length;
        for (; i < length; i++) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      } else {
        for (i in obj) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      }

      return obj;
    },

    // Retrieve the text value of an array of DOM nodes
    text(elem) {
      let node;
      let ret = '';
      let i = 0;
      const { nodeType } = elem;

      if (!nodeType) {
        // If no nodeType, this is expected to be an array
        while ((node = elem[i++])) {
          // Do not traverse comment nodes
          ret += jQuery.text(node);
        }
      } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
        return elem.textContent;
      } else if (nodeType === 3 || nodeType === 4) {
        return elem.nodeValue;
      }

      // Do not include comment or processing instruction nodes

      return ret;
    },

    // results is for internal usage only
    makeArray(arr, results) {
      const ret = results || [];

      if (arr != null) {
        if (isArrayLike(Object(arr))) {
          jQuery.merge(
            ret,
            typeof arr === 'string'
              ? [arr] : arr,
          );
        } else {
          push.call(ret, arr);
        }
      }

      return ret;
    },

    inArray(elem, arr, i) {
      return arr == null ? -1 : indexOf.call(arr, elem, i);
    },

    isXMLDoc(elem) {
      const namespace = elem && elem.namespaceURI;
      const docElem = elem && (elem.ownerDocument || elem).documentElement;

      // Assume HTML when documentElement doesn't yet exist, such as inside
      // document fragments.
      return !rhtmlSuffix.test(namespace || docElem && docElem.nodeName || 'HTML');
    },

    // Support: Android <=4.0 only, PhantomJS 1 only
    // push.apply(_, arraylike) throws on ancient WebKit
    merge(first, second) {
      const len = +second.length;
      let j = 0;
      let i = first.length;

      for (; j < len; j++) {
        first[i++] = second[j];
      }

      first.length = i;

      return first;
    },

    grep(elems, callback, invert) {
      let callbackInverse;
      const matches = [];
      let i = 0;
      const { length } = elems;
      const callbackExpect = !invert;

      // Go through the array, only saving the items
      // that pass the validator function
      for (; i < length; i++) {
        callbackInverse = !callback(elems[i], i);
        if (callbackInverse !== callbackExpect) {
          matches.push(elems[i]);
        }
      }

      return matches;
    },

    // arg is for internal usage only
    map(elems, callback, arg) {
      let length; let value;
      let i = 0;
      const ret = [];

      // Go through the array, translating each of the items to their new values
      if (isArrayLike(elems)) {
        length = elems.length;
        for (; i < length; i++) {
          value = callback(elems[i], i, arg);

          if (value != null) {
            ret.push(value);
          }
        }

        // Go through every key on the object,
      } else {
        for (i in elems) {
          value = callback(elems[i], i, arg);

          if (value != null) {
            ret.push(value);
          }
        }
      }

      // Flatten any nested arrays
      return flat(ret);
    },

    // A global GUID counter for objects
    guid: 1,

    // jQuery.support is not used in Core but other projects attach their
    // properties to it so it needs to exist.
    support,
  });

  if (typeof Symbol === 'function') {
    jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
  }

  // Populate the class2type map
  jQuery.each(
    'Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' '),
    (_i, name) => {
      class2type[`[object ${name}]`] = name.toLowerCase();
    },
  );

  function isArrayLike(obj) {
    // Support: real iOS 8.2 only (not reproducible in simulator)
    // `in` check used to prevent JIT error (gh-2145)
    // hasOwn isn't used here due to false negatives
    // regarding Nodelist length in IE
    const length = !!obj && 'length' in obj && obj.length;
    const type = toType(obj);

    if (isFunction(obj) || isWindow(obj)) {
      return false;
    }

    return type === 'array' || length === 0
		|| typeof length === 'number' && length > 0 && (length - 1) in obj;
  }

  function nodeName(elem, name) {
    return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
  }
  const { pop } = arr;

  const { sort } = arr;

  const { splice } = arr;

  const whitespace = '[\\x20\\t\\r\\n\\f]';

  const rtrimCSS = new RegExp(
    `^${whitespace}+|((?:^|[^\\\\])(?:\\\\.)*)${whitespace}+$`,
    'g',
  );

  // Note: an element does not contain itself
  jQuery.contains = function (a, b) {
    const bup = b && b.parentNode;

    return a === bup || !!(bup && bup.nodeType === 1 && (

    // Support: IE 9 - 11+
    // IE doesn't have `contains` on SVG.
      a.contains
        ? a.contains(bup)
        : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16
    ));
  };

  // CSS string/identifier serialization
  // https://drafts.csswg.org/cssom/#common-serializing-idioms
  const rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;

  function fcssescape(ch, asCodePoint) {
    if (asCodePoint) {
      // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
      if (ch === '\0') {
        return '\uFFFD';
      }

      // Control characters and (dependent upon position) numbers get escaped as code points
      return `${ch.slice(0, -1)}\\${ch.charCodeAt(ch.length - 1).toString(16)} `;
    }

    // Other potentially-special ASCII characters get backslash-escaped
    return `\\${ch}`;
  }

  jQuery.escapeSelector = function (sel) {
    return (`${sel}`).replace(rcssescape, fcssescape);
  };

  const preferredDoc = document;
  const pushNative = push;

  (function () {
    let i;
    let Expr;
    let outermostContext;
    let sortInput;
    let hasDuplicate;
    let push = pushNative;

    // Local document vars
    let document;
    let documentElement;
    let documentIsHTML;
    let rbuggyQSA;
    let matches;

    // Instance-specific data
    const { expando } = jQuery;
    let dirruns = 0;
    let done = 0;
    const classCache = createCache();
    const tokenCache = createCache();
    const compilerCache = createCache();
    const nonnativeSelectorCache = createCache();
    let sortOrder = function (a, b) {
      if (a === b) {
        hasDuplicate = true;
      }
      return 0;
    };

    const booleans = 'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|'
		+ 'loop|multiple|open|readonly|required|scoped';

    // Regular expressions

    // https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
    const identifier = `(?:\\\\[\\da-fA-F]{1,6}${whitespace
		 }?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+`;

    // Attribute selectors: https://www.w3.org/TR/selectors/#attribute-selectors
    const attributes = `\\[${whitespace}*(${identifier})(?:${whitespace

      // Operator (capture 2)
		 }*([*^$|!~]?=)${whitespace

      // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		 }*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(${identifier}))|)${
      whitespace}*\\]`;

    const pseudos = `:(${identifier})(?:\\((`

		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		+ '(\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|'

		// 2. simple (capture 6)
		+ `((?:\\\\.|[^\\\\()[\\]]|${attributes})*)|`

		// 3. anything else (capture 2)
		+ '.*'
		+ ')\\)|)';

    // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
    const rwhitespace = new RegExp(`${whitespace}+`, 'g');

    const rcomma = new RegExp(`^${whitespace}*,${whitespace}*`);
    const rleadingCombinator = new RegExp(`^${whitespace}*([>+~]|${whitespace})${
		 whitespace}*`);
    const rdescend = new RegExp(`${whitespace}|>`);

    const rpseudo = new RegExp(pseudos);
    const ridentifier = new RegExp(`^${identifier}$`);

    const matchExpr = {
      ID: new RegExp(`^#(${identifier})`),
      CLASS: new RegExp(`^\\.(${identifier})`),
      TAG: new RegExp(`^(${identifier}|[*])`),
      ATTR: new RegExp(`^${attributes}`),
      PSEUDO: new RegExp(`^${pseudos}`),
      CHILD: new RegExp(`^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(${
				 whitespace}*(even|odd|(([+-]|)(\\d*)n|)${whitespace}*(?:([+-]|)${
				 whitespace}*(\\d+)|))${whitespace}*\\)|)`, 'i'),
      bool: new RegExp(`^(?:${booleans})$`, 'i'),

      // For use in libraries implementing .is()
      // We use this for POS matching in `select`
      needsContext: new RegExp(`^${whitespace
			 }*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(${whitespace
			 }*((?:-\\d)?\\d*)${whitespace}*\\)|)(?=[^-]|$)`, 'i'),
    };

    const rinputs = /^(?:input|select|textarea|button)$/i;
    const rheader = /^h\d$/i;

    // Easily-parseable/retrievable ID or TAG or CLASS selectors
    const rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;

    const rsibling = /[+~]/;

    // CSS escapes
    // https://www.w3.org/TR/CSS21/syndata.html#escaped-characters
    const runescape = new RegExp(`\\\\[\\da-fA-F]{1,6}${whitespace
		 }?|\\\\([^\\r\\n\\f])`, 'g');
    const funescape = function (escape, nonHex) {
      const high = `0x${escape.slice(1)}` - 0x10000;

      if (nonHex) {
        // Strip the backslash prefix from a non-hex escape sequence
        return nonHex;
      }

      // Replace a hexadecimal escape sequence with the encoded Unicode code point
      // Support: IE <=11+
      // For values outside the Basic Multilingual Plane (BMP), manually construct a
      // surrogate pair
      return high < 0
        ? String.fromCharCode(high + 0x10000)
        : String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
    };

    // Used for iframes; see `setDocument`.
    // Support: IE 9 - 11+, Edge 12 - 18+
    // Removing the function wrapper causes a "Permission Denied"
    // error in IE/Edge.
    const unloadHandler = function () {
      setDocument();
    };

    const inDisabledFieldset = addCombinator(
      (elem) => elem.disabled === true && nodeName(elem, 'fieldset'),
      { dir: 'parentNode', next: 'legend' },
    );

    // Support: IE <=9 only
    // Accessing document.activeElement can throw unexpectedly
    // https://bugs.jquery.com/ticket/13393
    function safeActiveElement() {
      try {
        return document.activeElement;
      } catch (err) { }
    }

    // Optimize for push.apply( _, NodeList )
    try {
      push.apply(
        (arr = slice.call(preferredDoc.childNodes)),
        preferredDoc.childNodes,
      );

      // Support: Android <=4.0
      // Detect silently failing push.apply
      // eslint-disable-next-line no-unused-expressions
      arr[preferredDoc.childNodes.length].nodeType;
    } catch (e) {
      push = {
        apply(target, els) {
          pushNative.apply(target, slice.call(els));
        },
        call(target) {
          pushNative.apply(target, slice.call(arguments, 1));
        },
      };
    }

    function find(selector, context, results, seed) {
      let m; let i; let elem; let nid; let match; let groups; let newSelector;
      let newContext = context && context.ownerDocument;

      // nodeType defaults to 9, since context defaults to document
      const nodeType = context ? context.nodeType : 9;

      results = results || [];

      // Return early from calls with invalid selector or context
      if (typeof selector !== 'string' || !selector
		|| nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
        return results;
      }

      // Try to shortcut find operations (as opposed to filters) in HTML documents
      if (!seed) {
        setDocument(context);
        context = context || document;

        if (documentIsHTML) {
          // If the selector is sufficiently simple, try using a "get*By*" DOM method
          // (excepting DocumentFragment context, where the methods don't exist)
          if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
            // ID selector
            if ((m = match[1])) {
              // Document context
              if (nodeType === 9) {
                if ((elem = context.getElementById(m))) {
                  // Support: IE 9 only
                  // getElementById can match elements by name instead of ID
                  if (elem.id === m) {
                    push.call(results, elem);
                    return results;
                  }
                } else {
                  return results;
                }

                // Element context
              } else {
                // Support: IE 9 only
                // getElementById can match elements by name instead of ID
                if (newContext && (elem = newContext.getElementById(m))
							&& find.contains(context, elem)
							&& elem.id === m) {
                  push.call(results, elem);
                  return results;
                }
              }

              // Type selector
            } else if (match[2]) {
              push.apply(results, context.getElementsByTagName(selector));
              return results;

              // Class selector
            } else if ((m = match[3]) && context.getElementsByClassName) {
              push.apply(results, context.getElementsByClassName(m));
              return results;
            }
          }

          // Take advantage of querySelectorAll
          if (!nonnativeSelectorCache[`${selector} `]
				&& (!rbuggyQSA || !rbuggyQSA.test(selector))) {
            newSelector = selector;
            newContext = context;

            // qSA considers elements outside a scoping root when evaluating child or
            // descendant combinators, which is not what we want.
            // In such cases, we work around the behavior by prefixing every selector in the
            // list with an ID selector referencing the scope context.
            // The technique has to be used as well when a leading combinator is used
            // as such selectors are not recognized by querySelectorAll.
            // Thanks to Andrew Dupont for this technique.
            if (nodeType === 1
					&& (rdescend.test(selector) || rleadingCombinator.test(selector))) {
              // Expand context for sibling selectors
              newContext = rsibling.test(selector) && testContext(context.parentNode)
						|| context;

              // We can use :scope instead of the ID hack if the browser
              // supports it & if we're not changing the context.
              // Support: IE 11+, Edge 17 - 18+
              // IE/Edge sometimes throw a "Permission denied" error when
              // strict-comparing two documents; shallow comparisons work.
              // eslint-disable-next-line eqeqeq
              if (newContext != context || !support.scope) {
                // Capture the context ID, setting it first if necessary
                if ((nid = context.getAttribute('id'))) {
                  nid = jQuery.escapeSelector(nid);
                } else {
                  context.setAttribute('id', (nid = expando));
                }
              }

              // Prefix every selector in the list
              groups = tokenize(selector);
              i = groups.length;
              while (i--) {
                groups[i] = `${nid ? `#${nid}` : ':scope'} ${
                  toSelector(groups[i])}`;
              }
              newSelector = groups.join(',');
            }

            try {
              push.apply(
                results,
                newContext.querySelectorAll(newSelector),
              );
              return results;
            } catch (qsaError) {
              nonnativeSelectorCache(selector, true);
            } finally {
              if (nid === expando) {
                context.removeAttribute('id');
              }
            }
          }
        }
      }

      // All others
      return select(selector.replace(rtrimCSS, '$1'), context, results, seed);
    }

    /**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
    function createCache() {
      const keys = [];

      function cache(key, value) {
        // Use (key + " ") to avoid collision with native prototype properties
        // (see https://github.com/jquery/sizzle/issues/157)
        if (keys.push(`${key} `) > Expr.cacheLength) {
          // Only keep the most recent entries
          delete cache[keys.shift()];
        }
        return (cache[`${key} `] = value);
      }
      return cache;
    }

    /**
 * Mark a function for special use by jQuery selector module
 * @param {Function} fn The function to mark
 */
    function markFunction(fn) {
      fn[expando] = true;
      return fn;
    }

    /**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
    function assert(fn) {
      let el = document.createElement('fieldset');

      try {
        return !!fn(el);
      } catch (e) {
        return false;
      } finally {
        // Remove from its parent by default
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }

        // release memory in IE
        el = null;
      }
    }

    /**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
    function createInputPseudo(type) {
      return function (elem) {
        return nodeName(elem, 'input') && elem.type === type;
      };
    }

    /**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
    function createButtonPseudo(type) {
      return function (elem) {
        return (nodeName(elem, 'input') || nodeName(elem, 'button'))
			&& elem.type === type;
      };
    }

    /**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
    function createDisabledPseudo(disabled) {
      // Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
      return function (elem) {
        // Only certain elements can match :enabled or :disabled
        // https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
        // https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
        if ('form' in elem) {
          // Check for inherited disabledness on relevant non-disabled elements:
          // * listed form-associated elements in a disabled fieldset
          //   https://html.spec.whatwg.org/multipage/forms.html#category-listed
          //   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
          // * option elements in a disabled optgroup
          //   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
          // All such elements have a "form" property.
          if (elem.parentNode && elem.disabled === false) {
            // Option elements defer to a parent optgroup if present
            if ('label' in elem) {
              if ('label' in elem.parentNode) {
                return elem.parentNode.disabled === disabled;
              }
              return elem.disabled === disabled;
            }

            // Support: IE 6 - 11+
            // Use the isDisabled shortcut property to check for disabled fieldset ancestors
            return elem.isDisabled === disabled

					// Where there is no isDisabled, check manually
					|| elem.isDisabled !== !disabled
						&& inDisabledFieldset(elem) === disabled;
          }

          return elem.disabled === disabled;

          // Try to winnow out elements that can't be disabled before trusting the disabled property.
          // Some victims get caught in our net (label, legend, menu, track), but it shouldn't
          // even exist on them, let alone have a boolean value.
        } if ('label' in elem) {
          return elem.disabled === disabled;
        }

        // Remaining elements are neither :enabled nor :disabled
        return false;
      };
    }

    /**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
    function createPositionalPseudo(fn) {
      return markFunction((argument) => {
        argument = +argument;
        return markFunction((seed, matches) => {
          let j;
          const matchIndexes = fn([], seed.length, argument);
          let i = matchIndexes.length;

          // Match elements found at the specified indexes
          while (i--) {
            if (seed[(j = matchIndexes[i])]) {
              seed[j] = !(matches[j] = seed[j]);
            }
          }
        });
      });
    }

    /**
 * Checks a node for validity as a jQuery selector context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
    function testContext(context) {
      return context && typeof context.getElementsByTagName !== 'undefined' && context;
    }

    /**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [node] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
    function setDocument(node) {
      let subWindow;
      const doc = node ? node.ownerDocument || node : preferredDoc;

      // Return early if doc is invalid or already selected
      // Support: IE 11+, Edge 17 - 18+
      // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
      // two documents; shallow comparisons work.
      // eslint-disable-next-line eqeqeq
      if (doc == document || doc.nodeType !== 9 || !doc.documentElement) {
        return document;
      }

      // Update global variables
      document = doc;
      documentElement = document.documentElement;
      documentIsHTML = !jQuery.isXMLDoc(document);

      // Support: iOS 7 only, IE 9 - 11+
      // Older browsers didn't support unprefixed `matches`.
      matches = documentElement.matches
		|| documentElement.webkitMatchesSelector
		|| documentElement.msMatchesSelector;

      // Support: IE 9 - 11+, Edge 12 - 18+
      // Accessing iframe documents after unload throws "permission denied" errors (see trac-13936)
      // Support: IE 11+, Edge 17 - 18+
      // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
      // two documents; shallow comparisons work.
      // eslint-disable-next-line eqeqeq
      if (preferredDoc != document
		&& (subWindow = document.defaultView) && subWindow.top !== subWindow) {
        // Support: IE 9 - 11+, Edge 12 - 18+
        subWindow.addEventListener('unload', unloadHandler);
      }

      // Support: IE <10
      // Check if getElementById returns elements by name
      // The broken getElementById methods don't pick up programmatically-set names,
      // so use a roundabout getElementsByName test
      support.getById = assert((el) => {
        documentElement.appendChild(el).id = jQuery.expando;
        return !document.getElementsByName
			|| !document.getElementsByName(jQuery.expando).length;
      });

      // Support: IE 9 only
      // Check to see if it's possible to do matchesSelector
      // on a disconnected node.
      support.disconnectedMatch = assert((el) => matches.call(el, '*'));

      // Support: IE 9 - 11+, Edge 12 - 18+
      // IE/Edge don't support the :scope pseudo-class.
      support.scope = assert(() => document.querySelectorAll(':scope'));

      // Support: Chrome 105 - 111 only, Safari 15.4 - 16.3 only
      // Make sure the `:has()` argument is parsed unforgivingly.
      // We include `*` in the test to detect buggy implementations that are
      // _selectively_ forgiving (specifically when the list includes at least
      // one valid selector).
      // Note that we treat complete lack of support for `:has()` as if it were
      // spec-compliant support, which is fine because use of `:has()` in such
      // environments will fail in the qSA path and fall back to jQuery traversal
      // anyway.
      support.cssHas = assert(() => {
        try {
          document.querySelector(':has(*,:jqfake)');
          return false;
        } catch (e) {
          return true;
        }
      });

      // ID filter and find
      if (support.getById) {
        Expr.filter.ID = function (id) {
          const attrId = id.replace(runescape, funescape);
          return function (elem) {
            return elem.getAttribute('id') === attrId;
          };
        };
        Expr.find.ID = function (id, context) {
          if (typeof context.getElementById !== 'undefined' && documentIsHTML) {
            const elem = context.getElementById(id);
            return elem ? [elem] : [];
          }
        };
      } else {
        Expr.filter.ID = function (id) {
          const attrId = id.replace(runescape, funescape);
          return function (elem) {
            const node = typeof elem.getAttributeNode !== 'undefined'
					&& elem.getAttributeNode('id');
            return node && node.value === attrId;
          };
        };

        // Support: IE 6 - 7 only
        // getElementById is not reliable as a find shortcut
        Expr.find.ID = function (id, context) {
          if (typeof context.getElementById !== 'undefined' && documentIsHTML) {
            let node; let i; let elems;
            let elem = context.getElementById(id);

            if (elem) {
              // Verify the id attribute
              node = elem.getAttributeNode('id');
              if (node && node.value === id) {
                return [elem];
              }

              // Fall back on getElementsByName
              elems = context.getElementsByName(id);
              i = 0;
              while ((elem = elems[i++])) {
                node = elem.getAttributeNode('id');
                if (node && node.value === id) {
                  return [elem];
                }
              }
            }

            return [];
          }
        };
      }

      // Tag
      Expr.find.TAG = function (tag, context) {
        if (typeof context.getElementsByTagName !== 'undefined') {
          return context.getElementsByTagName(tag);

          // DocumentFragment nodes don't have gEBTN
        }
        return context.querySelectorAll(tag);
      };

      // Class
      Expr.find.CLASS = function (className, context) {
        if (typeof context.getElementsByClassName !== 'undefined' && documentIsHTML) {
          return context.getElementsByClassName(className);
        }
      };

      /* QSA/matchesSelector
	---------------------------------------------------------------------- */

      // QSA and matchesSelector support

      rbuggyQSA = [];

      // Build QSA regex
      // Regex strategy adopted from Diego Perini
      assert((el) => {
        let input;

        documentElement.appendChild(el).innerHTML =			`<a id='${expando}' href='' disabled='disabled'></a>`
			+ `<select id='${expando}-\r\\' disabled='disabled'>`
			+ '<option selected=\'\'></option></select>';

        // Support: iOS <=7 - 8 only
        // Boolean attributes and "value" are not treated correctly in some XML documents
        if (!el.querySelectorAll('[selected]').length) {
          rbuggyQSA.push(`\\[${whitespace}*(?:value|${booleans})`);
        }

        // Support: iOS <=7 - 8 only
        if (!el.querySelectorAll(`[id~=${expando}-]`).length) {
          rbuggyQSA.push('~=');
        }

        // Support: iOS 8 only
        // https://bugs.webkit.org/show_bug.cgi?id=136851
        // In-page `selector#id sibling-combinator selector` fails
        if (!el.querySelectorAll(`a#${expando}+*`).length) {
          rbuggyQSA.push('.#.+[+~]');
        }

        // Support: Chrome <=105+, Firefox <=104+, Safari <=15.4+
        // In some of the document kinds, these selectors wouldn't work natively.
        // This is probably OK but for backwards compatibility we want to maintain
        // handling them through jQuery traversal in jQuery 3.x.
        if (!el.querySelectorAll(':checked').length) {
          rbuggyQSA.push(':checked');
        }

        // Support: Windows 8 Native Apps
        // The type and name attributes are restricted during .innerHTML assignment
        input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        el.appendChild(input).setAttribute('name', 'D');

        // Support: IE 9 - 11+
        // IE's :disabled selector does not pick up the children of disabled fieldsets
        // Support: Chrome <=105+, Firefox <=104+, Safari <=15.4+
        // In some of the document kinds, these selectors wouldn't work natively.
        // This is probably OK but for backwards compatibility we want to maintain
        // handling them through jQuery traversal in jQuery 3.x.
        documentElement.appendChild(el).disabled = true;
        if (el.querySelectorAll(':disabled').length !== 2) {
          rbuggyQSA.push(':enabled', ':disabled');
        }

        // Support: IE 11+, Edge 15 - 18+
        // IE 11/Edge don't find elements on a `[name='']` query in some cases.
        // Adding a temporary attribute to the document before the selection works
        // around the issue.
        // Interestingly, IE 10 & older don't seem to have the issue.
        input = document.createElement('input');
        input.setAttribute('name', '');
        el.appendChild(input);
        if (!el.querySelectorAll("[name='']").length) {
          rbuggyQSA.push(`\\[${whitespace}*name${whitespace}*=${
				 whitespace}*(?:''|"")`);
        }
      });

      if (!support.cssHas) {
        // Support: Chrome 105 - 110+, Safari 15.4 - 16.3+
        // Our regular `try-catch` mechanism fails to detect natively-unsupported
        // pseudo-classes inside `:has()` (such as `:has(:contains("Foo"))`)
        // in browsers that parse the `:has()` argument as a forgiving selector list.
        // https://drafts.csswg.org/selectors/#relational now requires the argument
        // to be parsed unforgivingly, but browsers have not yet fully adjusted.
        rbuggyQSA.push(':has');
      }

      rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join('|'));

      /* Sorting
	---------------------------------------------------------------------- */

      // Document order sorting
      sortOrder = function (a, b) {
        // Flag for duplicate removal
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }

        // Sort on method existence if only one input has compareDocumentPosition
        let compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
        if (compare) {
          return compare;
        }

        // Calculate position if both inputs belong to the same document
        // Support: IE 11+, Edge 17 - 18+
        // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
        // two documents; shallow comparisons work.
        // eslint-disable-next-line eqeqeq
        compare = (a.ownerDocument || a) == (b.ownerDocument || b)
          ? a.compareDocumentPosition(b)

        // Otherwise we know they are disconnected
          : 1;

        // Disconnected nodes
        if (compare & 1
			|| (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {
          // Choose the first element that is related to our preferred document
          // Support: IE 11+, Edge 17 - 18+
          // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
          // two documents; shallow comparisons work.
          // eslint-disable-next-line eqeqeq
          if (a === document || a.ownerDocument == preferredDoc
				&& find.contains(preferredDoc, a)) {
            return -1;
          }

          // Support: IE 11+, Edge 17 - 18+
          // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
          // two documents; shallow comparisons work.
          // eslint-disable-next-line eqeqeq
          if (b === document || b.ownerDocument == preferredDoc
				&& find.contains(preferredDoc, b)) {
            return 1;
          }

          // Maintain original order
          return sortInput
            ? (indexOf.call(sortInput, a) - indexOf.call(sortInput, b))
            : 0;
        }

        return compare & 4 ? -1 : 1;
      };

      return document;
    }

    find.matches = function (expr, elements) {
      return find(expr, null, null, elements);
    };

    find.matchesSelector = function (elem, expr) {
      setDocument(elem);

      if (documentIsHTML
		&& !nonnativeSelectorCache[`${expr} `]
		&& (!rbuggyQSA || !rbuggyQSA.test(expr))) {
        try {
          const ret = matches.call(elem, expr);

          // IE 9's matchesSelector returns false on disconnected nodes
          if (ret || support.disconnectedMatch

					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					|| elem.document && elem.document.nodeType !== 11) {
            return ret;
          }
        } catch (e) {
          nonnativeSelectorCache(expr, true);
        }
      }

      return find(expr, document, null, [elem]).length > 0;
    };

    find.contains = function (context, elem) {
      // Set document vars if needed
      // Support: IE 11+, Edge 17 - 18+
      // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
      // two documents; shallow comparisons work.
      // eslint-disable-next-line eqeqeq
      if ((context.ownerDocument || context) != document) {
        setDocument(context);
      }
      return jQuery.contains(context, elem);
    };

    find.attr = function (elem, name) {
      // Set document vars if needed
      // Support: IE 11+, Edge 17 - 18+
      // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
      // two documents; shallow comparisons work.
      // eslint-disable-next-line eqeqeq
      if ((elem.ownerDocument || elem) != document) {
        setDocument(elem);
      }

      const fn = Expr.attrHandle[name.toLowerCase()];

      // Don't get fooled by Object.prototype properties (see trac-13807)
      const val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase())
        ? fn(elem, name, !documentIsHTML)
        : undefined;

      if (val !== undefined) {
        return val;
      }

      return elem.getAttribute(name);
    };

    find.error = function (msg) {
      throw new Error(`Syntax error, unrecognized expression: ${msg}`);
    };

    /**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
    jQuery.uniqueSort = function (results) {
      let elem;
      const duplicates = [];
      let j = 0;
      let i = 0;

      // Unless we *know* we can detect duplicates, assume their presence
      //
      // Support: Android <=4.0+
      // Testing for detecting duplicates is unpredictable so instead assume we can't
      // depend on duplicate detection in all browsers without a stable sort.
      hasDuplicate = !support.sortStable;
      sortInput = !support.sortStable && slice.call(results, 0);
      sort.call(results, sortOrder);

      if (hasDuplicate) {
        while ((elem = results[i++])) {
          if (elem === results[i]) {
            j = duplicates.push(i);
          }
        }
        while (j--) {
          splice.call(results, duplicates[j], 1);
        }
      }

      // Clear input after sorting to release objects
      // See https://github.com/jquery/sizzle/pull/225
      sortInput = null;

      return results;
    };

    jQuery.fn.uniqueSort = function () {
      return this.pushStack(jQuery.uniqueSort(slice.apply(this)));
    };

    Expr = jQuery.expr = {

      // Can be adjusted by the user
      cacheLength: 50,

      createPseudo: markFunction,

      match: matchExpr,

      attrHandle: {},

      find: {},

      relative: {
        '>': { dir: 'parentNode', first: true },
        ' ': { dir: 'parentNode' },
        '+': { dir: 'previousSibling', first: true },
        '~': { dir: 'previousSibling' },
      },

      preFilter: {
        ATTR(match) {
          match[1] = match[1].replace(runescape, funescape);

          // Move the given value to match[3] whether quoted or unquoted
          match[3] = (match[3] || match[4] || match[5] || '')
            .replace(runescape, funescape);

          if (match[2] === '~=') {
            match[3] = ` ${match[3]} `;
          }

          return match.slice(0, 4);
        },

        CHILD(match) {
          /* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
          match[1] = match[1].toLowerCase();

          if (match[1].slice(0, 3) === 'nth') {
            // nth-* requires argument
            if (!match[3]) {
              find.error(match[0]);
            }

            // numeric x and y parameters for Expr.filter.CHILD
            // remember that false/true cast respectively to 0/1
            match[4] = +(match[4]
              ? match[5] + (match[6] || 1)
              : 2 * (match[3] === 'even' || match[3] === 'odd')
            );
            match[5] = +((match[7] + match[8]) || match[3] === 'odd');

            // other types prohibit arguments
          } else if (match[3]) {
            find.error(match[0]);
          }

          return match;
        },

        PSEUDO(match) {
          let excess;
          const unquoted = !match[6] && match[2];

          if (matchExpr.CHILD.test(match[0])) {
            return null;
          }

          // Accept quoted arguments as-is
          if (match[3]) {
            match[2] = match[4] || match[5] || '';

            // Strip excess characters from unquoted arguments
          } else if (unquoted && rpseudo.test(unquoted)

				// Get excess from tokenize (recursively)
				&& (excess = tokenize(unquoted, true))

				// advance to the next closing parenthesis
				&& (excess = unquoted.indexOf(')', unquoted.length - excess) - unquoted.length)) {
            // excess is a negative index
            match[0] = match[0].slice(0, excess);
            match[2] = unquoted.slice(0, excess);
          }

          // Return only captures needed by the pseudo filter method (type and argument)
          return match.slice(0, 3);
        },
      },

      filter: {

        TAG(nodeNameSelector) {
          const expectedNodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
          return nodeNameSelector === '*'
            ? function () {
              return true;
            }
            : function (elem) {
              return nodeName(elem, expectedNodeName);
            };
        },

        CLASS(className) {
          let pattern = classCache[`${className} `];

          return pattern
				|| (pattern = new RegExp(`(^|${whitespace})${className
					 }(${whitespace}|$)`))
				&& classCache(className, (elem) => pattern.test(
				    typeof elem.className === 'string' && elem.className
							|| typeof elem.getAttribute !== 'undefined'
								&& elem.getAttribute('class')
							|| '',
				  ));
        },

        ATTR(name, operator, check) {
          return function (elem) {
            let result = find.attr(elem, name);

            if (result == null) {
              return operator === '!=';
            }
            if (!operator) {
              return true;
            }

            result += '';

            if (operator === '=') {
              return result === check;
            }
            if (operator === '!=') {
              return result !== check;
            }
            if (operator === '^=') {
              return check && result.indexOf(check) === 0;
            }
            if (operator === '*=') {
              return check && result.indexOf(check) > -1;
            }
            if (operator === '$=') {
              return check && result.slice(-check.length) === check;
            }
            if (operator === '~=') {
              return (` ${result.replace(rwhitespace, ' ')} `)
                .indexOf(check) > -1;
            }
            if (operator === '|=') {
              return result === check || result.slice(0, check.length + 1) === `${check}-`;
            }

            return false;
          };
        },

        CHILD(type, what, _argument, first, last) {
          const simple = type.slice(0, 3) !== 'nth';
          const forward = type.slice(-4) !== 'last';
          const ofType = what === 'of-type';

          return first === 1 && last === 0

          // Shortcut for :nth-*(n)
            ? function (elem) {
              return !!elem.parentNode;
            }

            : function (elem, _context, xml) {
              let cache; let outerCache; let node; let nodeIndex; let start;
              let dir = simple !== forward ? 'nextSibling' : 'previousSibling';
              const parent = elem.parentNode;
              const name = ofType && elem.nodeName.toLowerCase();
              const useCache = !xml && !ofType;
              let diff = false;

              if (parent) {
                // :(first|last|only)-(child|of-type)
                if (simple) {
                  while (dir) {
                    node = elem;
                    while ((node = node[dir])) {
                      if (ofType
                        ? nodeName(node, name)
                        : node.nodeType === 1) {
                        return false;
                      }
                    }

                    // Reverse direction for :only-* (if we haven't yet done so)
                    start = dir = type === 'only' && !start && 'nextSibling';
                  }
                  return true;
                }

                start = [forward ? parent.firstChild : parent.lastChild];

                // non-xml :nth-child(...) stores cache data on `parent`
                if (forward && useCache) {
                  // Seek `elem` from a previously-cached index
                  outerCache = parent[expando] || (parent[expando] = {});
                  cache = outerCache[type] || [];
                  nodeIndex = cache[0] === dirruns && cache[1];
                  diff = nodeIndex && cache[2];
                  node = nodeIndex && parent.childNodes[nodeIndex];

                  while ((node = ++nodeIndex && node && node[dir]

								// Fallback to seeking `elem` from the start
								|| (diff = nodeIndex = 0) || start.pop())) {
                    // When found, cache indexes on `parent` and break
                    if (node.nodeType === 1 && ++diff && node === elem) {
                      outerCache[type] = [dirruns, nodeIndex, diff];
                      break;
                    }
                  }
                } else {
                  // Use previously-cached element index if available
                  if (useCache) {
                    outerCache = elem[expando] || (elem[expando] = {});
                    cache = outerCache[type] || [];
                    nodeIndex = cache[0] === dirruns && cache[1];
                    diff = nodeIndex;
                  }

                  // xml :nth-child(...)
                  // or :nth-last-child(...) or :nth(-last)?-of-type(...)
                  if (diff === false) {
                    // Use the same loop as above to seek `elem` from the start
                    while ((node = ++nodeIndex && node && node[dir]
									|| (diff = nodeIndex = 0) || start.pop())) {
                      if ((ofType
                        ? nodeName(node, name)
                        : node.nodeType === 1)
										&& ++diff) {
                        // Cache the index of each encountered element
                        if (useCache) {
                          outerCache = node[expando]
												|| (node[expando] = {});
                          outerCache[type] = [dirruns, diff];
                        }

                        if (node === elem) {
                          break;
                        }
                      }
                    }
                  }
                }

                // Incorporate the offset, then check against cycle size
                diff -= last;
                return diff === first || (diff % first === 0 && diff / first >= 0);
              }
            };
        },

        PSEUDO(pseudo, argument) {
          // pseudo-class names are case-insensitive
          // https://www.w3.org/TR/selectors/#pseudo-classes
          // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
          // Remember that setFilters inherits from pseudos
          let args;
          const fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()]
					|| find.error(`unsupported pseudo: ${pseudo}`);

          // The user may use createPseudo to indicate that
          // arguments are needed to create the filter function
          // just as jQuery does
          if (fn[expando]) {
            return fn(argument);
          }

          // But maintain support for old signatures
          if (fn.length > 1) {
            args = [pseudo, pseudo, '', argument];
            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase())
              ? markFunction((seed, matches) => {
                let idx;
                const matched = fn(seed, argument);
                let i = matched.length;
                while (i--) {
                  idx = indexOf.call(seed, matched[i]);
                  seed[idx] = !(matches[idx] = matched[i]);
                }
              })
              : function (elem) {
                return fn(elem, 0, args);
              };
          }

          return fn;
        },
      },

      pseudos: {

        // Potentially complex pseudos
        not: markFunction((selector) => {
          // Trim the selector passed to compile
          // to avoid treating leading and trailing
          // spaces as combinators
          const input = [];
          const results = [];
          const matcher = compile(selector.replace(rtrimCSS, '$1'));

          return matcher[expando]
            ? markFunction((seed, matches, _context, xml) => {
              let elem;
              const unmatched = matcher(seed, null, xml, []);
              let i = seed.length;

              // Match elements unmatched by `matcher`
              while (i--) {
                if ((elem = unmatched[i])) {
                  seed[i] = !(matches[i] = elem);
                }
              }
            })
            : function (elem, _context, xml) {
              input[0] = elem;
              matcher(input, null, xml, results);

              // Don't keep the element
              // (see https://github.com/jquery/sizzle/issues/299)
              input[0] = null;
              return !results.pop();
            };
        }),

        has: markFunction((selector) => function (elem) {
          return find(selector, elem).length > 0;
        }),

        contains: markFunction((text) => {
          text = text.replace(runescape, funescape);
          return function (elem) {
            return (elem.textContent || jQuery.text(elem)).indexOf(text) > -1;
          };
        }),

        // "Whether an element is represented by a :lang() selector
        // is based solely on the element's language value
        // being equal to the identifier C,
        // or beginning with the identifier C immediately followed by "-".
        // The matching of C against the element's language value is performed case-insensitively.
        // The identifier C does not have to be a valid language name."
        // https://www.w3.org/TR/selectors/#lang-pseudo
        lang: markFunction((lang) => {
          // lang value must be a valid identifier
          if (!ridentifier.test(lang || '')) {
            find.error(`unsupported lang: ${lang}`);
          }
          lang = lang.replace(runescape, funescape).toLowerCase();
          return function (elem) {
            let elemLang;
            do {
              if ((elemLang = documentIsHTML
                ? elem.lang
                : elem.getAttribute('xml:lang') || elem.getAttribute('lang'))) {
                elemLang = elemLang.toLowerCase();
                return elemLang === lang || elemLang.indexOf(`${lang}-`) === 0;
              }
            } while ((elem = elem.parentNode) && elem.nodeType === 1);
            return false;
          };
        }),

        // Miscellaneous
        target(elem) {
          const hash = window.location && window.location.hash;
          return hash && hash.slice(1) === elem.id;
        },

        root(elem) {
          return elem === documentElement;
        },

        focus(elem) {
          return elem === safeActiveElement()
				&& document.hasFocus()
				&& !!(elem.type || elem.href || ~elem.tabIndex);
        },

        // Boolean properties
        enabled: createDisabledPseudo(false),
        disabled: createDisabledPseudo(true),

        checked(elem) {
          // In CSS3, :checked should return both checked and selected elements
          // https://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
          return (nodeName(elem, 'input') && !!elem.checked)
				|| (nodeName(elem, 'option') && !!elem.selected);
        },

        selected(elem) {
          // Support: IE <=11+
          // Accessing the selectedIndex property
          // forces the browser to treat the default option as
          // selected when in an optgroup.
          if (elem.parentNode) {
            // eslint-disable-next-line no-unused-expressions
            elem.parentNode.selectedIndex;
          }

          return elem.selected === true;
        },

        // Contents
        empty(elem) {
          // https://www.w3.org/TR/selectors/#empty-pseudo
          // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
          //   but not by others (comment: 8; processing instruction: 7; etc.)
          // nodeType < 6 works because attributes (2) do not appear as children
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            if (elem.nodeType < 6) {
              return false;
            }
          }
          return true;
        },

        parent(elem) {
          return !Expr.pseudos.empty(elem);
        },

        // Element/input types
        header(elem) {
          return rheader.test(elem.nodeName);
        },

        input(elem) {
          return rinputs.test(elem.nodeName);
        },

        button(elem) {
          return nodeName(elem, 'input') && elem.type === 'button'
				|| nodeName(elem, 'button');
        },

        text(elem) {
          let attr;
          return nodeName(elem, 'input') && elem.type === 'text'

				// Support: IE <10 only
				// New HTML5 attribute values (e.g., "search") appear
				// with elem.type === "text"
				&& ((attr = elem.getAttribute('type')) == null
					|| attr.toLowerCase() === 'text');
        },

        // Position-in-collection
        first: createPositionalPseudo(() => [0]),

        last: createPositionalPseudo((_matchIndexes, length) => [length - 1]),

        eq: createPositionalPseudo((_matchIndexes, length, argument) => [argument < 0 ? argument + length : argument]),

        even: createPositionalPseudo((matchIndexes, length) => {
          let i = 0;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),

        odd: createPositionalPseudo((matchIndexes, length) => {
          let i = 1;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),

        lt: createPositionalPseudo((matchIndexes, length, argument) => {
          let i;

          if (argument < 0) {
            i = argument + length;
          } else if (argument > length) {
            i = length;
          } else {
            i = argument;
          }

          for (; --i >= 0;) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),

        gt: createPositionalPseudo((matchIndexes, length, argument) => {
          let i = argument < 0 ? argument + length : argument;
          for (; ++i < length;) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
      },
    };

    Expr.pseudos.nth = Expr.pseudos.eq;

    // Add button/input type pseudos
    for (i in {
      radio: true, checkbox: true, file: true, password: true, image: true,
    }) {
      Expr.pseudos[i] = createInputPseudo(i);
    }
    for (i in { submit: true, reset: true }) {
      Expr.pseudos[i] = createButtonPseudo(i);
    }

    // Easy API for creating new setFilters
    function setFilters() {}
    setFilters.prototype = Expr.filters = Expr.pseudos;
    Expr.setFilters = new setFilters();

    function tokenize(selector, parseOnly) {
      let matched; let match; let tokens; let type;
      let soFar; let groups; let preFilters;
      const cached = tokenCache[`${selector} `];

      if (cached) {
        return parseOnly ? 0 : cached.slice(0);
      }

      soFar = selector;
      groups = [];
      preFilters = Expr.preFilter;

      while (soFar) {
        // Comma and first run
        if (!matched || (match = rcomma.exec(soFar))) {
          if (match) {
            // Don't consume trailing commas as valid
            soFar = soFar.slice(match[0].length) || soFar;
          }
          groups.push((tokens = []));
        }

        matched = false;

        // Combinators
        if ((match = rleadingCombinator.exec(soFar))) {
          matched = match.shift();
          tokens.push({
            value: matched,

            // Cast descendant combinators to space
            type: match[0].replace(rtrimCSS, ' '),
          });
          soFar = soFar.slice(matched.length);
        }

        // Filters
        for (type in Expr.filter) {
          if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type]
				|| (match = preFilters[type](match)))) {
            matched = match.shift();
            tokens.push({
              value: matched,
              type,
              matches: match,
            });
            soFar = soFar.slice(matched.length);
          }
        }

        if (!matched) {
          break;
        }
      }

      // Return the length of the invalid excess
      // if we're just parsing
      // Otherwise, throw an error or return tokens
      if (parseOnly) {
        return soFar.length;
      }

      return soFar
        ? find.error(selector)

      // Cache the tokens
        : tokenCache(selector, groups).slice(0);
    }

    function toSelector(tokens) {
      let i = 0;
      const len = tokens.length;
      let selector = '';
      for (; i < len; i++) {
        selector += tokens[i].value;
      }
      return selector;
    }

    function addCombinator(matcher, combinator, base) {
      const { dir } = combinator;
      const skip = combinator.next;
      const key = skip || dir;
      const checkNonElements = base && key === 'parentNode';
      const doneName = done++;

      return combinator.first

      // Check against closest ancestor/preceding element
        ? function (elem, context, xml) {
          while ((elem = elem[dir])) {
            if (elem.nodeType === 1 || checkNonElements) {
              return matcher(elem, context, xml);
            }
          }
          return false;
        }

      // Check against all ancestor/preceding elements
        : function (elem, context, xml) {
          let oldCache; let outerCache;
          const newCache = [dirruns, doneName];

          // We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
          if (xml) {
            while ((elem = elem[dir])) {
              if (elem.nodeType === 1 || checkNonElements) {
                if (matcher(elem, context, xml)) {
                  return true;
                }
              }
            }
          } else {
            while ((elem = elem[dir])) {
              if (elem.nodeType === 1 || checkNonElements) {
                outerCache = elem[expando] || (elem[expando] = {});

                if (skip && nodeName(elem, skip)) {
                  elem = elem[dir] || elem;
                } else if ((oldCache = outerCache[key])
							&& oldCache[0] === dirruns && oldCache[1] === doneName) {
                  // Assign to newCache so results back-propagate to previous elements
                  return (newCache[2] = oldCache[2]);
                } else {
                  // Reuse newcache so results back-propagate to previous elements
                  outerCache[key] = newCache;

                  // A match means we're done; a fail means we have to keep checking
                  if ((newCache[2] = matcher(elem, context, xml))) {
                    return true;
                  }
                }
              }
            }
          }
          return false;
        };
    }

    function elementMatcher(matchers) {
      return matchers.length > 1
        ? function (elem, context, xml) {
          let i = matchers.length;
          while (i--) {
            if (!matchers[i](elem, context, xml)) {
              return false;
            }
          }
          return true;
        }
        : matchers[0];
    }

    function multipleContexts(selector, contexts, results) {
      let i = 0;
      const len = contexts.length;
      for (; i < len; i++) {
        find(selector, contexts[i], results);
      }
      return results;
    }

    function condense(unmatched, map, filter, context, xml) {
      let elem;
      const newUnmatched = [];
      let i = 0;
      const len = unmatched.length;
      const mapped = map != null;

      for (; i < len; i++) {
        if ((elem = unmatched[i])) {
          if (!filter || filter(elem, context, xml)) {
            newUnmatched.push(elem);
            if (mapped) {
              map.push(i);
            }
          }
        }
      }

      return newUnmatched;
    }

    function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
      if (postFilter && !postFilter[expando]) {
        postFilter = setMatcher(postFilter);
      }
      if (postFinder && !postFinder[expando]) {
        postFinder = setMatcher(postFinder, postSelector);
      }
      return markFunction((seed, results, context, xml) => {
        let temp; let i; let elem; let matcherOut;
        const preMap = [];
        const postMap = [];
        const preexisting = results.length;

        // Get initial elements from seed or context
        const elems = seed
				|| multipleContexts(
				  selector || '*',
				  context.nodeType ? [context] : context,
				  [],
				);

        // Prefilter to get matcher input, preserving a map for seed-results synchronization
        const matcherIn = preFilter && (seed || !selector)
          ? condense(elems, preMap, preFilter, context, xml)
          : elems;

        if (matcher) {
          // If we have a postFinder, or filtered seed, or non-seed postFilter
          // or preexisting results,
          matcherOut = postFinder || (seed ? preFilter : preexisting || postFilter)

          // ...intermediate processing is necessary
            ? []

          // ...otherwise use results directly
            : results;

          // Find primary matches
          matcher(matcherIn, matcherOut, context, xml);
        } else {
          matcherOut = matcherIn;
        }

        // Apply postFilter
        if (postFilter) {
          temp = condense(matcherOut, postMap);
          postFilter(temp, [], context, xml);

          // Un-match failing elements by moving them back to matcherIn
          i = temp.length;
          while (i--) {
            if ((elem = temp[i])) {
              matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
            }
          }
        }

        if (seed) {
          if (postFinder || preFilter) {
            if (postFinder) {
              // Get the final matcherOut by condensing this intermediate into postFinder contexts
              temp = [];
              i = matcherOut.length;
              while (i--) {
                if ((elem = matcherOut[i])) {
                  // Restore matcherIn since elem is not yet a final match
                  temp.push((matcherIn[i] = elem));
                }
              }
              postFinder(null, (matcherOut = []), temp, xml);
            }

            // Move matched elements from seed to results to keep them synchronized
            i = matcherOut.length;
            while (i--) {
              if ((elem = matcherOut[i])
						&& (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1) {
                seed[temp] = !(results[temp] = elem);
              }
            }
          }

          // Add elements to results, through postFinder if defined
        } else {
          matcherOut = condense(
            matcherOut === results
              ? matcherOut.splice(preexisting, matcherOut.length)
              : matcherOut,
          );
          if (postFinder) {
            postFinder(null, results, matcherOut, xml);
          } else {
            push.apply(results, matcherOut);
          }
        }
      });
    }

    function matcherFromTokens(tokens) {
      let checkContext; let matcher; let j;
      const len = tokens.length;
      const leadingRelative = Expr.relative[tokens[0].type];
      const implicitRelative = leadingRelative || Expr.relative[' '];
      let i = leadingRelative ? 1 : 0;

      // The foundational matcher ensures that elements are reachable from top-level context(s)
      const matchContext = addCombinator((elem) => elem === checkContext, implicitRelative, true);
      const matchAnyContext = addCombinator((elem) => indexOf.call(checkContext, elem) > -1, implicitRelative, true);
      let matchers = [function (elem, context, xml) {
        // Support: IE 11+, Edge 17 - 18+
        // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
        // two documents; shallow comparisons work.
        // eslint-disable-next-line eqeqeq
        const ret = (!leadingRelative && (xml || context != outermostContext)) || (
          (checkContext = context).nodeType
            ? matchContext(elem, context, xml)
            : matchAnyContext(elem, context, xml));

        // Avoid hanging onto element
        // (see https://github.com/jquery/sizzle/issues/299)
        checkContext = null;
        return ret;
      }];

      for (; i < len; i++) {
        if ((matcher = Expr.relative[tokens[i].type])) {
          matchers = [addCombinator(elementMatcher(matchers), matcher)];
        } else {
          matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

          // Return special upon seeing a positional matcher
          if (matcher[expando]) {
            // Find the next relative operator (if any) for proper handling
            j = ++i;
            for (; j < len; j++) {
              if (Expr.relative[tokens[j].type]) {
                break;
              }
            }
            return setMatcher(
              i > 1 && elementMatcher(matchers),
              i > 1 && toSelector(

                // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                tokens.slice(0, i - 1)
                  .concat({ value: tokens[i - 2].type === ' ' ? '*' : '' }),
              ).replace(rtrimCSS, '$1'),
              matcher,
              i < j && matcherFromTokens(tokens.slice(i, j)),
              j < len && matcherFromTokens((tokens = tokens.slice(j))),
              j < len && toSelector(tokens),
            );
          }
          matchers.push(matcher);
        }
      }

      return elementMatcher(matchers);
    }

    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      const bySet = setMatchers.length > 0;
      const byElement = elementMatchers.length > 0;
      const superMatcher = function (seed, context, xml, results, outermost) {
        let elem; let j; let matcher;
        let matchedCount = 0;
        let i = '0';
        const unmatched = seed && [];
        let setMatched = [];
        const contextBackup = outermostContext;

        // We must always have either seed elements or outermost context
        const elems = seed || byElement && Expr.find.TAG('*', outermost);

        // Use integer dirruns iff this is the outermost matcher
        const dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1);
        const len = elems.length;

        if (outermost) {
          // Support: IE 11+, Edge 17 - 18+
          // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
          // two documents; shallow comparisons work.
          // eslint-disable-next-line eqeqeq
          outermostContext = context == document || context || outermost;
        }

        // Add elements passing elementMatchers directly to results
        // Support: iOS <=7 - 9 only
        // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching
        // elements by id. (see trac-14142)
        for (; i !== len && (elem = elems[i]) != null; i++) {
          if (byElement && elem) {
            j = 0;

            // Support: IE 11+, Edge 17 - 18+
            // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
            // two documents; shallow comparisons work.
            // eslint-disable-next-line eqeqeq
            if (!context && elem.ownerDocument != document) {
              setDocument(elem);
              xml = !documentIsHTML;
            }
            while ((matcher = elementMatchers[j++])) {
              if (matcher(elem, context || document, xml)) {
                push.call(results, elem);
                break;
              }
            }
            if (outermost) {
              dirruns = dirrunsUnique;
            }
          }

          // Track unmatched elements for set filters
          if (bySet) {
            // They will have gone through all possible matchers
            if ((elem = !matcher && elem)) {
              matchedCount--;
            }

            // Lengthen the array for every element, matched or not
            if (seed) {
              unmatched.push(elem);
            }
          }
        }

        // `i` is now the count of elements visited above, and adding it to `matchedCount`
        // makes the latter nonnegative.
        matchedCount += i;

        // Apply set filters to unmatched elements
        // NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
        // equals `i`), unless we didn't visit _any_ elements in the above loop because we have
        // no element matchers and no seed.
        // Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
        // case, which will result in a "00" `matchedCount` that differs from `i` but is also
        // numerically zero.
        if (bySet && i !== matchedCount) {
          j = 0;
          while ((matcher = setMatchers[j++])) {
            matcher(unmatched, setMatched, context, xml);
          }

          if (seed) {
            // Reintegrate element matches to eliminate the need for sorting
            if (matchedCount > 0) {
              while (i--) {
                if (!(unmatched[i] || setMatched[i])) {
                  setMatched[i] = pop.call(results);
                }
              }
            }

            // Discard index placeholder values to get only actual matches
            setMatched = condense(setMatched);
          }

          // Add matches to results
          push.apply(results, setMatched);

          // Seedless set matches succeeding multiple successful matchers stipulate sorting
          if (outermost && !seed && setMatched.length > 0
					&& (matchedCount + setMatchers.length) > 1) {
            jQuery.uniqueSort(results);
          }
        }

        // Override manipulation of globals by nested matchers
        if (outermost) {
          dirruns = dirrunsUnique;
          outermostContext = contextBackup;
        }

        return unmatched;
      };

      return bySet
        ? markFunction(superMatcher)
        : superMatcher;
    }

    function compile(selector, match /* Internal Use Only */) {
      let i;
      const setMatchers = [];
      const elementMatchers = [];
      let cached = compilerCache[`${selector} `];

      if (!cached) {
        // Generate a function of recursive functions that can be used to check each element
        if (!match) {
          match = tokenize(selector);
        }
        i = match.length;
        while (i--) {
          cached = matcherFromTokens(match[i]);
          if (cached[expando]) {
            setMatchers.push(cached);
          } else {
            elementMatchers.push(cached);
          }
        }

        // Cache the compiled function
        cached = compilerCache(
          selector,
          matcherFromGroupMatchers(elementMatchers, setMatchers),
        );

        // Save selector and tokenization
        cached.selector = selector;
      }
      return cached;
    }

    /**
 * A low-level selection function that works with jQuery's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with jQuery selector compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
    function select(selector, context, results, seed) {
      let i; let tokens; let token; let type; let find;
      const compiled = typeof selector === 'function' && selector;
      const match = !seed && tokenize((selector = compiled.selector || selector));

      results = results || [];

      // Try to minimize operations if there is only one selector in the list and no seed
      // (the latter of which guarantees us context)
      if (match.length === 1) {
        // Reduce context if the leading compound selector is an ID
        tokens = match[0] = match[0].slice(0);
        if (tokens.length > 2 && (token = tokens[0]).type === 'ID'
				&& context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
          context = (Expr.find.ID(
            token.matches[0].replace(runescape, funescape),
            context,
          ) || [])[0];
          if (!context) {
            return results;

            // Precompiled matchers will still verify ancestry, so step up a level
          } if (compiled) {
            context = context.parentNode;
          }

          selector = selector.slice(tokens.shift().value.length);
        }

        // Fetch a seed set for right-to-left matching
        i = matchExpr.needsContext.test(selector) ? 0 : tokens.length;
        while (i--) {
          token = tokens[i];

          // Abort if we hit a combinator
          if (Expr.relative[(type = token.type)]) {
            break;
          }
          if ((find = Expr.find[type])) {
            // Search, expanding context for leading sibling combinators
            if ((seed = find(
              token.matches[0].replace(runescape, funescape),
              rsibling.test(tokens[0].type)
						&& testContext(context.parentNode) || context,
            ))) {
              // If seed is empty or no tokens remain, we can return early
              tokens.splice(i, 1);
              selector = seed.length && toSelector(tokens);
              if (!selector) {
                push.apply(results, seed);
                return results;
              }

              break;
            }
          }
        }
      }

      // Compile and execute a filtering function if one is not provided
      // Provide `match` to avoid retokenization if we modified the selector above
      (compiled || compile(selector, match))(
        seed,
        context,
        !documentIsHTML,
        results,
        !context || rsibling.test(selector) && testContext(context.parentNode) || context,
      );
      return results;
    }

    // One-time assignments

    // Support: Android <=4.0 - 4.1+
    // Sort stability
    support.sortStable = expando.split('').sort(sortOrder).join('') === expando;

    // Initialize against the default document
    setDocument();

    // Support: Android <=4.0 - 4.1+
    // Detached nodes confoundingly follow *each other*
    support.sortDetached = assert((el) =>
      // Should return 1, but returns 4 (following)
      el.compareDocumentPosition(document.createElement('fieldset')) & 1);

    jQuery.find = find;

    // Deprecated
    jQuery.expr[':'] = jQuery.expr.pseudos;
    jQuery.unique = jQuery.uniqueSort;

    // These have always been private, but they used to be documented
    // as part of Sizzle so let's maintain them in the 3.x line
    // for backwards compatibility purposes.
    find.compile = compile;
    find.select = select;
    find.setDocument = setDocument;

    find.escape = jQuery.escapeSelector;
    find.getText = jQuery.text;
    find.isXML = jQuery.isXMLDoc;
    find.selectors = jQuery.expr;
    find.support = jQuery.support;
    find.uniqueSort = jQuery.uniqueSort;

    /* eslint-enable */
  }());

  const dir = function (elem, dir, until) {
    const matched = [];
    const truncate = until !== undefined;

    while ((elem = elem[dir]) && elem.nodeType !== 9) {
      if (elem.nodeType === 1) {
        if (truncate && jQuery(elem).is(until)) {
          break;
        }
        matched.push(elem);
      }
    }
    return matched;
  };

  const siblings = function (n, elem) {
    const matched = [];

    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== elem) {
        matched.push(n);
      }
    }

    return matched;
  };

  const rneedsContext = jQuery.expr.match.needsContext;

  const rsingleTag = (/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i);

  // Implement the identical functionality for filter and not
  function winnow(elements, qualifier, not) {
    if (isFunction(qualifier)) {
      return jQuery.grep(elements, (elem, i) => !!qualifier.call(elem, i, elem) !== not);
    }

    // Single element
    if (qualifier.nodeType) {
      return jQuery.grep(elements, (elem) => (elem === qualifier) !== not);
    }

    // Arraylike of elements (jQuery, arguments, Array)
    if (typeof qualifier !== 'string') {
      return jQuery.grep(elements, (elem) => (indexOf.call(qualifier, elem) > -1) !== not);
    }

    // Filtered directly for both simple and complex selectors
    return jQuery.filter(qualifier, elements, not);
  }

  jQuery.filter = function (expr, elems, not) {
    const elem = elems[0];

    if (not) {
      expr = `:not(${expr})`;
    }

    if (elems.length === 1 && elem.nodeType === 1) {
      return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
    }

    return jQuery.find.matches(expr, jQuery.grep(elems, (elem) => elem.nodeType === 1));
  };

  jQuery.fn.extend({
    find(selector) {
      let i; let ret;
      const len = this.length;
      const self = this;

      if (typeof selector !== 'string') {
        return this.pushStack(jQuery(selector).filter(function () {
          for (i = 0; i < len; i++) {
            if (jQuery.contains(self[i], this)) {
              return true;
            }
          }
        }));
      }

      ret = this.pushStack([]);

      for (i = 0; i < len; i++) {
        jQuery.find(selector, self[i], ret);
      }

      return len > 1 ? jQuery.uniqueSort(ret) : ret;
    },
    filter(selector) {
      return this.pushStack(winnow(this, selector || [], false));
    },
    not(selector) {
      return this.pushStack(winnow(this, selector || [], true));
    },
    is(selector) {
      return !!winnow(
        this,

        // If this is a positional/relative selector, check membership in the returned set
        // so $("p:first").is("p:last") won't return true for a doc with two "p".
        typeof selector === 'string' && rneedsContext.test(selector)
          ? jQuery(selector)
          : selector || [],
        false,
      ).length;
    },
  });

  // Initialize a jQuery object

  // A central reference to the root jQuery(document)
  let rootjQuery;

  // A simple way to check for HTML strings
  // Prioritize #id over <tag> to avoid XSS via location.hash (trac-9521)
  // Strict HTML recognition (trac-11290: must start with <)
  // Shortcut simple #id case for speed
  const rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;

  const init = jQuery.fn.init = function (selector, context, root) {
    let match; let
      elem;

    // HANDLE: $(""), $(null), $(undefined), $(false)
    if (!selector) {
      return this;
    }

    // Method init() accepts an alternate rootjQuery
    // so migrate can support jQuery.sub (gh-2101)
    root = root || rootjQuery;

    // Handle HTML strings
    if (typeof selector === 'string') {
      if (selector[0] === '<'
				&& selector[selector.length - 1] === '>'
				&& selector.length >= 3) {
        // Assume that strings that start and end with <> are HTML and skip the regex check
        match = [null, selector, null];
      } else {
        match = rquickExpr.exec(selector);
      }

      // Match html or make sure no context is specified for #id
      if (match && (match[1] || !context)) {
        // HANDLE: $(html) -> $(array)
        if (match[1]) {
          context = context instanceof jQuery ? context[0] : context;

          // Option to run scripts is true for back-compat
          // Intentionally let the error be thrown if parseHTML is not present
          jQuery.merge(this, jQuery.parseHTML(
            match[1],
            context && context.nodeType ? context.ownerDocument || context : document,
            true,
          ));

          // HANDLE: $(html, props)
          if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
            for (match in context) {
              // Properties of context are called as methods if possible
              if (isFunction(this[match])) {
                this[match](context[match]);

                // ...and otherwise set as attributes
              } else {
                this.attr(match, context[match]);
              }
            }
          }

          return this;

          // HANDLE: $(#id)
        }
        elem = document.getElementById(match[2]);

        if (elem) {
          // Inject the element directly into the jQuery object
          this[0] = elem;
          this.length = 1;
        }
        return this;

        // HANDLE: $(expr, $(...))
      } if (!context || context.jquery) {
        return (context || root).find(selector);

        // HANDLE: $(expr, context)
        // (which is just equivalent to: $(context).find(expr)
      }
      return this.constructor(context).find(selector);

      // HANDLE: $(DOMElement)
    } if (selector.nodeType) {
      this[0] = selector;
      this.length = 1;
      return this;

      // HANDLE: $(function)
      // Shortcut for document ready
    } if (isFunction(selector)) {
      return root.ready !== undefined
        ? root.ready(selector)

      // Execute immediately if ready is not present
        : selector(jQuery);
    }

    return jQuery.makeArray(selector, this);
  };

  // Give the init function the jQuery prototype for later instantiation
  init.prototype = jQuery.fn;

  // Initialize central reference
  rootjQuery = jQuery(document);

  const rparentsprev = /^(?:parents|prev(?:Until|All))/;

  // Methods guaranteed to produce a unique set when starting from a unique set
  const guaranteedUnique = {
    children: true,
    contents: true,
    next: true,
    prev: true,
  };

  jQuery.fn.extend({
    has(target) {
      const targets = jQuery(target, this);
      const l = targets.length;

      return this.filter(function () {
        let i = 0;
        for (; i < l; i++) {
          if (jQuery.contains(this, targets[i])) {
            return true;
          }
        }
      });
    },

    closest(selectors, context) {
      let cur;
      let i = 0;
      const l = this.length;
      const matched = [];
      const targets = typeof selectors !== 'string' && jQuery(selectors);

      // Positional selectors never match, since there's no _selection_ context
      if (!rneedsContext.test(selectors)) {
        for (; i < l; i++) {
          for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
            // Always skip document fragments
            if (cur.nodeType < 11 && (targets
              ? targets.index(cur) > -1

            // Don't pass non-elements to jQuery#find
              : cur.nodeType === 1
							&& jQuery.find.matchesSelector(cur, selectors))) {
              matched.push(cur);
              break;
            }
          }
        }
      }

      return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
    },

    // Determine the position of an element within the set
    index(elem) {
      // No argument, return index in parent
      if (!elem) {
        return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
      }

      // Index in selector
      if (typeof elem === 'string') {
        return indexOf.call(jQuery(elem), this[0]);
      }

      // Locate the position of the desired element
      return indexOf.call(
        this,

        // If it receives a jQuery object, the first element is used
        elem.jquery ? elem[0] : elem,
      );
    },

    add(selector, context) {
      return this.pushStack(
        jQuery.uniqueSort(
          jQuery.merge(this.get(), jQuery(selector, context)),
        ),
      );
    },

    addBack(selector) {
      return this.add(selector == null
        ? this.prevObject : this.prevObject.filter(selector));
    },
  });

  function sibling(cur, dir) {
    while ((cur = cur[dir]) && cur.nodeType !== 1) {}
    return cur;
  }

  jQuery.each({
    parent(elem) {
      const parent = elem.parentNode;
      return parent && parent.nodeType !== 11 ? parent : null;
    },
    parents(elem) {
      return dir(elem, 'parentNode');
    },
    parentsUntil(elem, _i, until) {
      return dir(elem, 'parentNode', until);
    },
    next(elem) {
      return sibling(elem, 'nextSibling');
    },
    prev(elem) {
      return sibling(elem, 'previousSibling');
    },
    nextAll(elem) {
      return dir(elem, 'nextSibling');
    },
    prevAll(elem) {
      return dir(elem, 'previousSibling');
    },
    nextUntil(elem, _i, until) {
      return dir(elem, 'nextSibling', until);
    },
    prevUntil(elem, _i, until) {
      return dir(elem, 'previousSibling', until);
    },
    siblings(elem) {
      return siblings((elem.parentNode || {}).firstChild, elem);
    },
    children(elem) {
      return siblings(elem.firstChild);
    },
    contents(elem) {
      if (elem.contentDocument != null

			// Support: IE 11+
			// <object> elements with no `data` attribute has an object
			// `contentDocument` with a `null` prototype.
			&& getProto(elem.contentDocument)) {
        return elem.contentDocument;
      }

      // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
      // Treat the template element as a regular one in browsers that
      // don't support it.
      if (nodeName(elem, 'template')) {
        elem = elem.content || elem;
      }

      return jQuery.merge([], elem.childNodes);
    },
  }, (name, fn) => {
    jQuery.fn[name] = function (until, selector) {
      let matched = jQuery.map(this, fn, until);

      if (name.slice(-5) !== 'Until') {
        selector = until;
      }

      if (selector && typeof selector === 'string') {
        matched = jQuery.filter(selector, matched);
      }

      if (this.length > 1) {
        // Remove duplicates
        if (!guaranteedUnique[name]) {
          jQuery.uniqueSort(matched);
        }

        // Reverse order for parents* and prev-derivatives
        if (rparentsprev.test(name)) {
          matched.reverse();
        }
      }

      return this.pushStack(matched);
    };
  });
  const rnothtmlwhite = (/[^\x20\t\r\n\f]+/g);

  // Convert String-formatted options into Object-formatted ones
  function createOptions(options) {
    const object = {};
    jQuery.each(options.match(rnothtmlwhite) || [], (_, flag) => {
      object[flag] = true;
    });
    return object;
  }

  /*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
  jQuery.Callbacks = function (options) {
    // Convert options from String-formatted to Object-formatted if needed
    // (we check in cache first)
    options = typeof options === 'string'
      ? createOptions(options)
      : jQuery.extend({}, options);

    let // Flag to know if list is currently firing
      firing;

    // Last fire value for non-forgettable lists
    let memory;

    // Flag to know if list was already fired
    let fired;

    // Flag to prevent firing
    let locked;

    // Actual callback list
    let list = [];

    // Queue of execution data for repeatable lists
    let queue = [];

    // Index of currently firing callback (modified by add/remove as needed)
    let firingIndex = -1;

    // Fire callbacks
    const fire = function () {
      // Enforce single-firing
      locked = locked || options.once;

      // Execute callbacks for all pending executions,
      // respecting firingIndex overrides and runtime changes
      fired = firing = true;
      for (; queue.length; firingIndex = -1) {
        memory = queue.shift();
        while (++firingIndex < list.length) {
          // Run callback and check for early termination
          if (list[firingIndex].apply(memory[0], memory[1]) === false
						&& options.stopOnFalse) {
            // Jump to end and forget the data so .add doesn't re-fire
            firingIndex = list.length;
            memory = false;
          }
        }
      }

      // Forget the data if we're done with it
      if (!options.memory) {
        memory = false;
      }

      firing = false;

      // Clean up if we're done firing for good
      if (locked) {
        // Keep an empty list if we have data for future add calls
        if (memory) {
          list = [];

          // Otherwise, this object is spent
        } else {
          list = '';
        }
      }
    };

    // Actual Callbacks object
    var self = {

      // Add a callback or a collection of callbacks to the list
      add() {
        if (list) {
          // If we have memory from a past run, we should fire after adding
          if (memory && !firing) {
            firingIndex = list.length - 1;
            queue.push(memory);
          }

          (function add(args) {
            jQuery.each(args, (_, arg) => {
              if (isFunction(arg)) {
                if (!options.unique || !self.has(arg)) {
                  list.push(arg);
                }
              } else if (arg && arg.length && toType(arg) !== 'string') {
                // Inspect recursively
                add(arg);
              }
            });
          }(arguments));

          if (memory && !firing) {
            fire();
          }
        }
        return this;
      },

      // Remove a callback from the list
      remove() {
        jQuery.each(arguments, (_, arg) => {
          let index;
          while ((index = jQuery.inArray(arg, list, index)) > -1) {
            list.splice(index, 1);

            // Handle firing indexes
            if (index <= firingIndex) {
              firingIndex--;
            }
          }
        });
        return this;
      },

      // Check if a given callback is in the list.
      // If no argument is given, return whether or not list has callbacks attached.
      has(fn) {
        return fn
          ? jQuery.inArray(fn, list) > -1
          : list.length > 0;
      },

      // Remove all callbacks from the list
      empty() {
        if (list) {
          list = [];
        }
        return this;
      },

      // Disable .fire and .add
      // Abort any current/pending executions
      // Clear all callbacks and values
      disable() {
        locked = queue = [];
        list = memory = '';
        return this;
      },
      disabled() {
        return !list;
      },

      // Disable .fire
      // Also disable .add unless we have memory (since it would have no effect)
      // Abort any pending executions
      lock() {
        locked = queue = [];
        if (!memory && !firing) {
          list = memory = '';
        }
        return this;
      },
      locked() {
        return !!locked;
      },

      // Call all callbacks with the given context and arguments
      fireWith(context, args) {
        if (!locked) {
          args = args || [];
          args = [context, args.slice ? args.slice() : args];
          queue.push(args);
          if (!firing) {
            fire();
          }
        }
        return this;
      },

      // Call all the callbacks with the given arguments
      fire() {
        self.fireWith(this, arguments);
        return this;
      },

      // To know if the callbacks have already been called at least once
      fired() {
        return !!fired;
      },
    };

    return self;
  };

  function Identity(v) {
    return v;
  }
  function Thrower(ex) {
    throw ex;
  }

  function adoptValue(value, resolve, reject, noValue) {
    let method;

    try {
      // Check for promise aspect first to privilege synchronous behavior
      if (value && isFunction((method = value.promise))) {
        method.call(value).done(resolve).fail(reject);

        // Other thenables
      } else if (value && isFunction((method = value.then))) {
        method.call(value, resolve, reject);

        // Other non-thenables
      } else {
        // Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
        // * false: [ value ].slice( 0 ) => resolve( value )
        // * true: [ value ].slice( 1 ) => resolve()
        resolve.apply(undefined, [value].slice(noValue));
      }

      // For Promises/A+, convert exceptions into rejections
      // Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
      // Deferred#then to conditionally suppress rejection.
    } catch (value) {
      // Support: Android 4.0 only
      // Strict mode functions invoked without .call/.apply get global-object context
      reject.apply(undefined, [value]);
    }
  }

  jQuery.extend({

    Deferred(func) {
      const tuples = [

        // action, add listener, callbacks,
        // ... .then handlers, argument index, [final state]
        ['notify', 'progress', jQuery.Callbacks('memory'),
          jQuery.Callbacks('memory'), 2],
        ['resolve', 'done', jQuery.Callbacks('once memory'),
          jQuery.Callbacks('once memory'), 0, 'resolved'],
        ['reject', 'fail', jQuery.Callbacks('once memory'),
          jQuery.Callbacks('once memory'), 1, 'rejected'],
      ];
      let state = 'pending';
      var promise = {
        state() {
          return state;
        },
        always() {
          deferred.done(arguments).fail(arguments);
          return this;
        },
        catch(fn) {
          return promise.then(null, fn);
        },

        // Keep pipe for back-compat
        pipe(/* fnDone, fnFail, fnProgress */) {
          let fns = arguments;

          return jQuery.Deferred((newDefer) => {
            jQuery.each(tuples, (_i, tuple) => {
              // Map tuples (progress, done, fail) to arguments (done, fail, progress)
              const fn = isFunction(fns[tuple[4]]) && fns[tuple[4]];

              // deferred.progress(function() { bind to newDefer or newDefer.notify })
              // deferred.done(function() { bind to newDefer or newDefer.resolve })
              // deferred.fail(function() { bind to newDefer or newDefer.reject })
              deferred[tuple[1]](function () {
                const returned = fn && fn.apply(this, arguments);
                if (returned && isFunction(returned.promise)) {
                  returned.promise()
                    .progress(newDefer.notify)
                    .done(newDefer.resolve)
                    .fail(newDefer.reject);
                } else {
                  newDefer[`${tuple[0]}With`](
                    this,
                    fn ? [returned] : arguments,
                  );
                }
              });
            });
            fns = null;
          }).promise();
        },
        then(onFulfilled, onRejected, onProgress) {
          let maxDepth = 0;
          function resolve(depth, deferred, handler, special) {
            return function () {
              let that = this;
              let args = arguments;
              const mightThrow = function () {
                let returned; let
                  then;

                // Support: Promises/A+ section 2.3.3.3.3
                // https://promisesaplus.com/#point-59
                // Ignore double-resolution attempts
                if (depth < maxDepth) {
                  return;
                }

                returned = handler.apply(that, args);

                // Support: Promises/A+ section 2.3.1
                // https://promisesaplus.com/#point-48
                if (returned === deferred.promise()) {
                  throw new TypeError('Thenable self-resolution');
                }

                // Support: Promises/A+ sections 2.3.3.1, 3.5
                // https://promisesaplus.com/#point-54
                // https://promisesaplus.com/#point-75
                // Retrieve `then` only once
                then = returned

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										&& (typeof returned === 'object'
											|| typeof returned === 'function')
										&& returned.then;

                // Handle a returned thenable
                if (isFunction(then)) {
                  // Special processors (notify) just wait for resolution
                  if (special) {
                    then.call(
                      returned,
                      resolve(maxDepth, deferred, Identity, special),
                      resolve(maxDepth, deferred, Thrower, special),
                    );

                    // Normal processors (resolve) also hook into progress
                  } else {
                    // ...and disregard older resolution values
                    maxDepth++;

                    then.call(
                      returned,
                      resolve(maxDepth, deferred, Identity, special),
                      resolve(maxDepth, deferred, Thrower, special),
                      resolve(
                        maxDepth,
                        deferred,
                        Identity,
                        deferred.notifyWith,
                      ),
                    );
                  }

                  // Handle all other returned values
                } else {
                  // Only substitute handlers pass on context
                  // and multiple values (non-spec behavior)
                  if (handler !== Identity) {
                    that = undefined;
                    args = [returned];
                  }

                  // Process the value(s)
                  // Default process is resolve
                  (special || deferred.resolveWith)(that, args);
                }
              };

              // Only normal processors (resolve) catch and reject exceptions
              var process = special
                ? mightThrow
                : function () {
                  try {
                    mightThrow();
                  } catch (e) {
                    if (jQuery.Deferred.exceptionHook) {
                      jQuery.Deferred.exceptionHook(
                        e,
                        process.error,
                      );
                    }

                    // Support: Promises/A+ section 2.3.3.3.4.1
                    // https://promisesaplus.com/#point-61
                    // Ignore post-resolution exceptions
                    if (depth + 1 >= maxDepth) {
                      // Only substitute handlers pass on context
                      // and multiple values (non-spec behavior)
                      if (handler !== Thrower) {
                        that = undefined;
                        args = [e];
                      }

                      deferred.rejectWith(that, args);
                    }
                  }
                };

              // Support: Promises/A+ section 2.3.3.3.1
              // https://promisesaplus.com/#point-57
              // Re-resolve promises immediately to dodge false rejection from
              // subsequent errors
              if (depth) {
                process();
              } else {
                // Call an optional hook to record the error, in case of exception
                // since it's otherwise lost when execution goes async
                if (jQuery.Deferred.getErrorHook) {
                  process.error = jQuery.Deferred.getErrorHook();

                  // The deprecated alias of the above. While the name suggests
                  // returning the stack, not an error instance, jQuery just passes
                  // it directly to `console.warn` so both will work; an instance
                  // just better cooperates with source maps.
                } else if (jQuery.Deferred.getStackHook) {
                  process.error = jQuery.Deferred.getStackHook();
                }
                window.setTimeout(process);
              }
            };
          }

          return jQuery.Deferred((newDefer) => {
            // progress_handlers.add( ... )
            tuples[0][3].add(
              resolve(
                0,
                newDefer,
                isFunction(onProgress)
                  ? onProgress
                  : Identity,
                newDefer.notifyWith,
              ),
            );

            // fulfilled_handlers.add( ... )
            tuples[1][3].add(
              resolve(
                0,
                newDefer,
                isFunction(onFulfilled)
                  ? onFulfilled
                  : Identity,
              ),
            );

            // rejected_handlers.add( ... )
            tuples[2][3].add(
              resolve(
                0,
                newDefer,
                isFunction(onRejected)
                  ? onRejected
                  : Thrower,
              ),
            );
          }).promise();
        },

        // Get a promise for this deferred
        // If obj is provided, the promise aspect is added to the object
        promise(obj) {
          return obj != null ? jQuery.extend(obj, promise) : promise;
        },
      };
      var deferred = {};

      // Add list-specific methods
      jQuery.each(tuples, (i, tuple) => {
        const list = tuple[2];
        const stateString = tuple[5];

        // promise.progress = list.add
        // promise.done = list.add
        // promise.fail = list.add
        promise[tuple[1]] = list.add;

        // Handle state
        if (stateString) {
          list.add(
            () => {
              // state = "resolved" (i.e., fulfilled)
              // state = "rejected"
              state = stateString;
            },

            // rejected_callbacks.disable
            // fulfilled_callbacks.disable
            tuples[3 - i][2].disable,

            // rejected_handlers.disable
            // fulfilled_handlers.disable
            tuples[3 - i][3].disable,

            // progress_callbacks.lock
            tuples[0][2].lock,

            // progress_handlers.lock
            tuples[0][3].lock,
          );
        }

        // progress_handlers.fire
        // fulfilled_handlers.fire
        // rejected_handlers.fire
        list.add(tuple[3].fire);

        // deferred.notify = function() { deferred.notifyWith(...) }
        // deferred.resolve = function() { deferred.resolveWith(...) }
        // deferred.reject = function() { deferred.rejectWith(...) }
        deferred[tuple[0]] = function () {
          deferred[`${tuple[0]}With`](this === deferred ? undefined : this, arguments);
          return this;
        };

        // deferred.notifyWith = list.fireWith
        // deferred.resolveWith = list.fireWith
        // deferred.rejectWith = list.fireWith
        deferred[`${tuple[0]}With`] = list.fireWith;
      });

      // Make the deferred a promise
      promise.promise(deferred);

      // Call given func if any
      if (func) {
        func.call(deferred, deferred);
      }

      // All done!
      return deferred;
    },

    // Deferred helper
    when(singleValue) {
      let

        // count of uncompleted subordinates
        remaining = arguments.length;

      // count of unprocessed arguments
      let i = remaining;

      // subordinate fulfillment data
      const resolveContexts = Array(i);
      const resolveValues = slice.call(arguments);

      // the primary Deferred
      const primary = jQuery.Deferred();

      // subordinate callback factory
      const updateFunc = function (i) {
        return function (value) {
          resolveContexts[i] = this;
          resolveValues[i] = arguments.length > 1 ? slice.call(arguments) : value;
          if (!(--remaining)) {
            primary.resolveWith(resolveContexts, resolveValues);
          }
        };
      };

      // Single- and empty arguments are adopted like Promise.resolve
      if (remaining <= 1) {
        adoptValue(
          singleValue,
          primary.done(updateFunc(i)).resolve,
          primary.reject,
          !remaining,
        );

        // Use .then() to unwrap secondary thenables (cf. gh-3000)
        if (primary.state() === 'pending'
				|| isFunction(resolveValues[i] && resolveValues[i].then)) {
          return primary.then();
        }
      }

      // Multiple arguments are aggregated like Promise.all array elements
      while (i--) {
        adoptValue(resolveValues[i], updateFunc(i), primary.reject);
      }

      return primary.promise();
    },
  });

  // These usually indicate a programmer mistake during development,
  // warn about them ASAP rather than swallowing them by default.
  const rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

  // If `jQuery.Deferred.getErrorHook` is defined, `asyncError` is an error
  // captured before the async barrier to get the original error cause
  // which may otherwise be hidden.
  jQuery.Deferred.exceptionHook = function (error, asyncError) {
    // Support: IE 8 - 9 only
    // Console exists when dev tools are open, which can happen at any time
    if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
      window.console.warn(
        `jQuery.Deferred exception: ${error.message}`,
        error.stack,
        asyncError,
      );
    }
  };

  jQuery.readyException = function (error) {
    window.setTimeout(() => {
      throw error;
    });
  };

  // The deferred used on DOM ready
  const readyList = jQuery.Deferred();

  jQuery.fn.ready = function (fn) {
    readyList
      .then(fn)

    // Wrap jQuery.readyException in a function so that the lookup
    // happens at the time of error handling instead of callback
    // registration.
      .catch((error) => {
        jQuery.readyException(error);
      });

    return this;
  };

  jQuery.extend({

    // Is the DOM ready to be used? Set to true once it occurs.
    isReady: false,

    // A counter to track how many items to wait for before
    // the ready event fires. See trac-6781
    readyWait: 1,

    // Handle when the DOM is ready
    ready(wait) {
      // Abort if there are pending holds or we're already ready
      if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
        return;
      }

      // Remember that the DOM is ready
      jQuery.isReady = true;

      // If a normal DOM Ready event fired, decrement, and wait if need be
      if (wait !== true && --jQuery.readyWait > 0) {
        return;
      }

      // If there are functions bound, to execute
      readyList.resolveWith(document, [jQuery]);
    },
  });

  jQuery.ready.then = readyList.then;

  // The ready event handler and self cleanup method
  function completed() {
    document.removeEventListener('DOMContentLoaded', completed);
    window.removeEventListener('load', completed);
    jQuery.ready();
  }

  // Catch cases where $(document).ready() is called
  // after the browser event has already occurred.
  // Support: IE <=9 - 10 only
  // Older IE sometimes signals "interactive" too soon
  if (document.readyState === 'complete'
	|| (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    // Handle it asynchronously to allow scripts the opportunity to delay ready
    window.setTimeout(jQuery.ready);
  } else {
    // Use the handy event callback
    document.addEventListener('DOMContentLoaded', completed);

    // A fallback to window.onload, that will always work
    window.addEventListener('load', completed);
  }

  // Multifunctional method to get and set values of a collection
  // The value/s can optionally be executed if it's a function
  const access = function (elems, fn, key, value, chainable, emptyGet, raw) {
    let i = 0;
    const len = elems.length;
    let bulk = key == null;

    // Sets many values
    if (toType(key) === 'object') {
      chainable = true;
      for (i in key) {
        access(elems, fn, i, key[i], true, emptyGet, raw);
      }

      // Sets one value
    } else if (value !== undefined) {
      chainable = true;

      if (!isFunction(value)) {
        raw = true;
      }

      if (bulk) {
        // Bulk operations run against the entire set
        if (raw) {
          fn.call(elems, value);
          fn = null;

          // ...except when executing function values
        } else {
          bulk = fn;
          fn = function (elem, _key, value) {
            return bulk.call(jQuery(elem), value);
          };
        }
      }

      if (fn) {
        for (; i < len; i++) {
          fn(elems[i], key, raw
            ? value
            : value.call(elems[i], i, fn(elems[i], key)));
        }
      }
    }

    if (chainable) {
      return elems;
    }

    // Gets
    if (bulk) {
      return fn.call(elems);
    }

    return len ? fn(elems[0], key) : emptyGet;
  };

  // Matches dashed string for camelizing
  const rmsPrefix = /^-ms-/;
  const rdashAlpha = /-([a-z])/g;

  // Used by camelCase as callback to replace()
  function fcamelCase(_all, letter) {
    return letter.toUpperCase();
  }

  // Convert dashed to camelCase; used by the css and data modules
  // Support: IE <=9 - 11, Edge 12 - 15
  // Microsoft forgot to hump their vendor prefix (trac-9572)
  function camelCase(string) {
    return string.replace(rmsPrefix, 'ms-').replace(rdashAlpha, fcamelCase);
  }
  const acceptData = function (owner) {
    // Accepts only:
    //  - Node
    //    - Node.ELEMENT_NODE
    //    - Node.DOCUMENT_NODE
    //  - Object
    //    - Any
    return owner.nodeType === 1 || owner.nodeType === 9 || !(+owner.nodeType);
  };

  function Data() {
    this.expando = jQuery.expando + Data.uid++;
  }

  Data.uid = 1;

  Data.prototype = {

    cache(owner) {
      // Check if the owner object already has a cache
      let value = owner[this.expando];

      // If not, create one
      if (!value) {
        value = {};

        // We can accept data for non-element nodes in modern browsers,
        // but we should not, see trac-8335.
        // Always return an empty object.
        if (acceptData(owner)) {
          // If it is a node unlikely to be stringify-ed or looped over
          // use plain assignment
          if (owner.nodeType) {
            owner[this.expando] = value;

            // Otherwise secure it in a non-enumerable property
            // configurable must be true to allow the property to be
            // deleted when data is removed
          } else {
            Object.defineProperty(owner, this.expando, {
              value,
              configurable: true,
            });
          }
        }
      }

      return value;
    },
    set(owner, data, value) {
      let prop;
      const cache = this.cache(owner);

      // Handle: [ owner, key, value ] args
      // Always use camelCase key (gh-2257)
      if (typeof data === 'string') {
        cache[camelCase(data)] = value;

        // Handle: [ owner, { properties } ] args
      } else {
        // Copy the properties one-by-one to the cache object
        for (prop in data) {
          cache[camelCase(prop)] = data[prop];
        }
      }
      return cache;
    },
    get(owner, key) {
      return key === undefined
        ? this.cache(owner)

      // Always use camelCase key (gh-2257)
        : owner[this.expando] && owner[this.expando][camelCase(key)];
    },
    access(owner, key, value) {
      // In cases where either:
      //
      //   1. No key was specified
      //   2. A string key was specified, but no value provided
      //
      // Take the "read" path and allow the get method to determine
      // which value to return, respectively either:
      //
      //   1. The entire cache object
      //   2. The data stored at the key
      //
      if (key === undefined
				|| ((key && typeof key === 'string') && value === undefined)) {
        return this.get(owner, key);
      }

      // When the key is not a string, or both a key and value
      // are specified, set or extend (existing objects) with either:
      //
      //   1. An object of properties
      //   2. A key and value
      //
      this.set(owner, key, value);

      // Since the "set" path can have two possible entry points
      // return the expected data based on which path was taken[*]
      return value !== undefined ? value : key;
    },
    remove(owner, key) {
      let i;
      const cache = owner[this.expando];

      if (cache === undefined) {
        return;
      }

      if (key !== undefined) {
        // Support array or space separated string of keys
        if (Array.isArray(key)) {
          // If key is an array of keys...
          // We always set camelCase keys, so remove that.
          key = key.map(camelCase);
        } else {
          key = camelCase(key);

          // If a key with the spaces exists, use it.
          // Otherwise, create an array by matching non-whitespace
          key = key in cache
            ? [key]
            : (key.match(rnothtmlwhite) || []);
        }

        i = key.length;

        while (i--) {
          delete cache[key[i]];
        }
      }

      // Remove the expando if there's no more data
      if (key === undefined || jQuery.isEmptyObject(cache)) {
        // Support: Chrome <=35 - 45
        // Webkit & Blink performance suffers when deleting properties
        // from DOM nodes, so set to undefined instead
        // https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
        if (owner.nodeType) {
          owner[this.expando] = undefined;
        } else {
          delete owner[this.expando];
        }
      }
    },
    hasData(owner) {
      const cache = owner[this.expando];
      return cache !== undefined && !jQuery.isEmptyObject(cache);
    },
  };
  const dataPriv = new Data();

  const dataUser = new Data();

  //	Implementation Summary
  //
  //	1. Enforce API surface and semantic compatibility with 1.9.x branch
  //	2. Improve the module's maintainability by reducing the storage
  //		paths to a single mechanism.
  //	3. Use the same single mechanism to support "private" and "user" data.
  //	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
  //	5. Avoid exposing implementation details on user objects (eg. expando properties)
  //	6. Provide a clear path for implementation upgrade to WeakMap in 2014

  const rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/;
  const rmultiDash = /[A-Z]/g;

  function getData(data) {
    if (data === 'true') {
      return true;
    }

    if (data === 'false') {
      return false;
    }

    if (data === 'null') {
      return null;
    }

    // Only convert to a number if it doesn't change the string
    if (data === `${+data}`) {
      return +data;
    }

    if (rbrace.test(data)) {
      return JSON.parse(data);
    }

    return data;
  }

  function dataAttr(elem, key, data) {
    let name;

    // If nothing was found internally, try to fetch any
    // data from the HTML5 data-* attribute
    if (data === undefined && elem.nodeType === 1) {
      name = `data-${key.replace(rmultiDash, '-$&').toLowerCase()}`;
      data = elem.getAttribute(name);

      if (typeof data === 'string') {
        try {
          data = getData(data);
        } catch (e) {}

        // Make sure we set the data so it isn't changed later
        dataUser.set(elem, key, data);
      } else {
        data = undefined;
      }
    }
    return data;
  }

  jQuery.extend({
    hasData(elem) {
      return dataUser.hasData(elem) || dataPriv.hasData(elem);
    },

    data(elem, name, data) {
      return dataUser.access(elem, name, data);
    },

    removeData(elem, name) {
      dataUser.remove(elem, name);
    },

    // TODO: Now that all calls to _data and _removeData have been replaced
    // with direct calls to dataPriv methods, these can be deprecated.
    _data(elem, name, data) {
      return dataPriv.access(elem, name, data);
    },

    _removeData(elem, name) {
      dataPriv.remove(elem, name);
    },
  });

  jQuery.fn.extend({
    data(key, value) {
      let i; let name; let data;
      const elem = this[0];
      const attrs = elem && elem.attributes;

      // Gets all values
      if (key === undefined) {
        if (this.length) {
          data = dataUser.get(elem);

          if (elem.nodeType === 1 && !dataPriv.get(elem, 'hasDataAttrs')) {
            i = attrs.length;
            while (i--) {
              // Support: IE 11 only
              // The attrs elements can be null (trac-14894)
              if (attrs[i]) {
                name = attrs[i].name;
                if (name.indexOf('data-') === 0) {
                  name = camelCase(name.slice(5));
                  dataAttr(elem, name, data[name]);
                }
              }
            }
            dataPriv.set(elem, 'hasDataAttrs', true);
          }
        }

        return data;
      }

      // Sets multiple values
      if (typeof key === 'object') {
        return this.each(function () {
          dataUser.set(this, key);
        });
      }

      return access(this, function (value) {
        let data;

        // The calling jQuery object (element matches) is not empty
        // (and therefore has an element appears at this[ 0 ]) and the
        // `value` parameter was not undefined. An empty jQuery object
        // will result in `undefined` for elem = this[ 0 ] which will
        // throw an exception if an attempt to read a data cache is made.
        if (elem && value === undefined) {
          // Attempt to get data from the cache
          // The key will always be camelCased in Data
          data = dataUser.get(elem, key);
          if (data !== undefined) {
            return data;
          }

          // Attempt to "discover" the data in
          // HTML5 custom data-* attrs
          data = dataAttr(elem, key);
          if (data !== undefined) {
            return data;
          }

          // We tried really hard, but the data doesn't exist.
          return;
        }

        // Set the data...
        this.each(function () {
          // We always store the camelCased key
          dataUser.set(this, key, value);
        });
      }, null, value, arguments.length > 1, null, true);
    },

    removeData(key) {
      return this.each(function () {
        dataUser.remove(this, key);
      });
    },
  });

  jQuery.extend({
    queue(elem, type, data) {
      let queue;

      if (elem) {
        type = `${type || 'fx'}queue`;
        queue = dataPriv.get(elem, type);

        // Speed up dequeue by getting out quickly if this is just a lookup
        if (data) {
          if (!queue || Array.isArray(data)) {
            queue = dataPriv.access(elem, type, jQuery.makeArray(data));
          } else {
            queue.push(data);
          }
        }
        return queue || [];
      }
    },

    dequeue(elem, type) {
      type = type || 'fx';

      const queue = jQuery.queue(elem, type);
      let startLength = queue.length;
      let fn = queue.shift();
      const hooks = jQuery._queueHooks(elem, type);
      const next = function () {
        jQuery.dequeue(elem, type);
      };

      // If the fx queue is dequeued, always remove the progress sentinel
      if (fn === 'inprogress') {
        fn = queue.shift();
        startLength--;
      }

      if (fn) {
        // Add a progress sentinel to prevent the fx queue from being
        // automatically dequeued
        if (type === 'fx') {
          queue.unshift('inprogress');
        }

        // Clear up the last queue stop function
        delete hooks.stop;
        fn.call(elem, next, hooks);
      }

      if (!startLength && hooks) {
        hooks.empty.fire();
      }
    },

    // Not public - generate a queueHooks object, or return the current one
    _queueHooks(elem, type) {
      const key = `${type}queueHooks`;
      return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
        empty: jQuery.Callbacks('once memory').add(() => {
          dataPriv.remove(elem, [`${type}queue`, key]);
        }),
      });
    },
  });

  jQuery.fn.extend({
    queue(type, data) {
      let setter = 2;

      if (typeof type !== 'string') {
        data = type;
        type = 'fx';
        setter--;
      }

      if (arguments.length < setter) {
        return jQuery.queue(this[0], type);
      }

      return data === undefined
        ? this
        : this.each(function () {
          const queue = jQuery.queue(this, type, data);

          // Ensure a hooks for this queue
          jQuery._queueHooks(this, type);

          if (type === 'fx' && queue[0] !== 'inprogress') {
            jQuery.dequeue(this, type);
          }
        });
    },
    dequeue(type) {
      return this.each(function () {
        jQuery.dequeue(this, type);
      });
    },
    clearQueue(type) {
      return this.queue(type || 'fx', []);
    },

    // Get a promise resolved when queues of a certain type
    // are emptied (fx is the type by default)
    promise(type, obj) {
      let tmp;
      let count = 1;
      const defer = jQuery.Deferred();
      const elements = this;
      let i = this.length;
      const resolve = function () {
        if (!(--count)) {
          defer.resolveWith(elements, [elements]);
        }
      };

      if (typeof type !== 'string') {
        obj = type;
        type = undefined;
      }
      type = type || 'fx';

      while (i--) {
        tmp = dataPriv.get(elements[i], `${type}queueHooks`);
        if (tmp && tmp.empty) {
          count++;
          tmp.empty.add(resolve);
        }
      }
      resolve();
      return defer.promise(obj);
    },
  });
  const pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

  const rcssNum = new RegExp(`^(?:([+-])=|)(${pnum})([a-z%]*)$`, 'i');

  const cssExpand = ['Top', 'Right', 'Bottom', 'Left'];

  const { documentElement } = document;

  let isAttached = function (elem) {
    return jQuery.contains(elem.ownerDocument, elem);
  };
  const composed = { composed: true };

  // Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
  // Check attachment across shadow DOM boundaries when possible (gh-3504)
  // Support: iOS 10.0-10.2 only
  // Early iOS 10 versions support `attachShadow` but not `getRootNode`,
  // leading to errors. We need to check for `getRootNode`.
  if (documentElement.getRootNode) {
    isAttached = function (elem) {
      return jQuery.contains(elem.ownerDocument, elem)
				|| elem.getRootNode(composed) === elem.ownerDocument;
    };
  }
  const isHiddenWithinTree = function (elem, el) {
    // isHiddenWithinTree might be called from jQuery#filter function;
    // in that case, element will be second argument
    elem = el || elem;

    // Inline style trumps all
    return elem.style.display === 'none'
			|| elem.style.display === ''

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			&& isAttached(elem)

			&& jQuery.css(elem, 'display') === 'none';
  };

  function adjustCSS(elem, prop, valueParts, tween) {
    let adjusted; let scale;
    let maxIterations = 20;
    const currentValue = tween
      ? function () {
        return tween.cur();
      }
      : function () {
        return jQuery.css(elem, prop, '');
      };
    let initial = currentValue();
    let unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? '' : 'px');

    // Starting value computation is required for potential unit mismatches
    let initialInUnit = elem.nodeType
			&& (jQuery.cssNumber[prop] || unit !== 'px' && +initial)
			&& rcssNum.exec(jQuery.css(elem, prop));

    if (initialInUnit && initialInUnit[3] !== unit) {
      // Support: Firefox <=54
      // Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
      initial /= 2;

      // Trust units reported by jQuery.css
      unit = unit || initialInUnit[3];

      // Iteratively approximate from a nonzero starting point
      initialInUnit = +initial || 1;

      while (maxIterations--) {
        // Evaluate and update our best guess (doubling guesses that zero out).
        // Finish if the scale equals or crosses 1 (making the old*new product non-positive).
        jQuery.style(elem, prop, initialInUnit + unit);
        if ((1 - scale) * (1 - (scale = currentValue() / initial || 0.5)) <= 0) {
          maxIterations = 0;
        }
        initialInUnit /= scale;
      }

      initialInUnit *= 2;
      jQuery.style(elem, prop, initialInUnit + unit);

      // Make sure we update the tween properties later on
      valueParts = valueParts || [];
    }

    if (valueParts) {
      initialInUnit = +initialInUnit || +initial || 0;

      // Apply relative offset (+=/-=) if specified
      adjusted = valueParts[1]
        ? initialInUnit + (valueParts[1] + 1) * valueParts[2]
        : +valueParts[2];
      if (tween) {
        tween.unit = unit;
        tween.start = initialInUnit;
        tween.end = adjusted;
      }
    }
    return adjusted;
  }

  const defaultDisplayMap = {};

  function getDefaultDisplay(elem) {
    let temp;
    const doc = elem.ownerDocument;
    const { nodeName } = elem;
    let display = defaultDisplayMap[nodeName];

    if (display) {
      return display;
    }

    temp = doc.body.appendChild(doc.createElement(nodeName));
    display = jQuery.css(temp, 'display');

    temp.parentNode.removeChild(temp);

    if (display === 'none') {
      display = 'block';
    }
    defaultDisplayMap[nodeName] = display;

    return display;
  }

  function showHide(elements, show) {
    let display; let elem;
    const values = [];
    let index = 0;
    const { length } = elements;

    // Determine new display value for elements that need to change
    for (; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }

      display = elem.style.display;
      if (show) {
        // Since we force visibility upon cascade-hidden elements, an immediate (and slow)
        // check is required in this first loop unless we have a nonempty display value (either
        // inline or about-to-be-restored)
        if (display === 'none') {
          values[index] = dataPriv.get(elem, 'display') || null;
          if (!values[index]) {
            elem.style.display = '';
          }
        }
        if (elem.style.display === '' && isHiddenWithinTree(elem)) {
          values[index] = getDefaultDisplay(elem);
        }
      } else if (display !== 'none') {
        values[index] = 'none';

        // Remember what we're overwriting
        dataPriv.set(elem, 'display', display);
      }
    }

    // Set the display of the elements in a second loop to avoid constant reflow
    for (index = 0; index < length; index++) {
      if (values[index] != null) {
        elements[index].style.display = values[index];
      }
    }

    return elements;
  }

  jQuery.fn.extend({
    show() {
      return showHide(this, true);
    },
    hide() {
      return showHide(this);
    },
    toggle(state) {
      if (typeof state === 'boolean') {
        return state ? this.show() : this.hide();
      }

      return this.each(function () {
        if (isHiddenWithinTree(this)) {
          jQuery(this).show();
        } else {
          jQuery(this).hide();
        }
      });
    },
  });
  const rcheckableType = (/^(?:checkbox|radio)$/i);

  const rtagName = (/<([a-z][^\/\0>\x20\t\r\n\f]*)/i);

  const rscriptType = (/^$|^module$|\/(?:java|ecma)script/i);

  (function () {
    const fragment = document.createDocumentFragment();
    const div = fragment.appendChild(document.createElement('div'));
    const input = document.createElement('input');

    // Support: Android 4.0 - 4.3 only
    // Check state lost if the name is set (trac-11217)
    // Support: Windows Web Apps (WWA)
    // `name` and `type` must use .setAttribute for WWA (trac-14901)
    input.setAttribute('type', 'radio');
    input.setAttribute('checked', 'checked');
    input.setAttribute('name', 't');

    div.appendChild(input);

    // Support: Android <=4.1 only
    // Older WebKit doesn't clone checked state correctly in fragments
    support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

    // Support: IE <=11 only
    // Make sure textarea (and checkbox) defaultValue is properly cloned
    div.innerHTML = '<textarea>x</textarea>';
    support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;

    // Support: IE <=9 only
    // IE <=9 replaces <option> tags with their contents when inserted outside of
    // the select element.
    div.innerHTML = '<option></option>';
    support.option = !!div.lastChild;
  }());

  // We have to close these tags to support XHTML (trac-13200)
  const wrapMap = {

    // XHTML parsers do not magically insert elements in the
    // same way that tag soup parsers do. So we cannot shorten
    // this by omitting <tbody> or other required elements.
    thead: [1, '<table>', '</table>'],
    col: [2, '<table><colgroup>', '</colgroup></table>'],
    tr: [2, '<table><tbody>', '</tbody></table>'],
    td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],

    _default: [0, '', ''],
  };

  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
  wrapMap.th = wrapMap.td;

  // Support: IE <=9 only
  if (!support.option) {
    wrapMap.optgroup = wrapMap.option = [1, "<select multiple='multiple'>", '</select>'];
  }

  function getAll(context, tag) {
    // Support: IE <=9 - 11 only
    // Use typeof to avoid zero-argument method invocation on host objects (trac-15151)
    let ret;

    if (typeof context.getElementsByTagName !== 'undefined') {
      ret = context.getElementsByTagName(tag || '*');
    } else if (typeof context.querySelectorAll !== 'undefined') {
      ret = context.querySelectorAll(tag || '*');
    } else {
      ret = [];
    }

    if (tag === undefined || tag && nodeName(context, tag)) {
      return jQuery.merge([context], ret);
    }

    return ret;
  }

  // Mark scripts as having already been evaluated
  function setGlobalEval(elems, refElements) {
    let i = 0;
    const l = elems.length;

    for (; i < l; i++) {
      dataPriv.set(
        elems[i],
        'globalEval',
        !refElements || dataPriv.get(refElements[i], 'globalEval'),
      );
    }
  }

  const rhtml = /<|&#?\w+;/;

  function buildFragment(elems, context, scripts, selection, ignored) {
    let elem; let tmp; let tag; let wrap; let attached; let j;
    const fragment = context.createDocumentFragment();
    const nodes = [];
    let i = 0;
    const l = elems.length;

    for (; i < l; i++) {
      elem = elems[i];

      if (elem || elem === 0) {
        // Add nodes directly
        if (toType(elem) === 'object') {
          // Support: Android <=4.0 only, PhantomJS 1 only
          // push.apply(_, arraylike) throws on ancient WebKit
          jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

          // Convert non-html into a text node
        } else if (!rhtml.test(elem)) {
          nodes.push(context.createTextNode(elem));

          // Convert html into DOM nodes
        } else {
          tmp = tmp || fragment.appendChild(context.createElement('div'));

          // Deserialize a standard representation
          tag = (rtagName.exec(elem) || ['', ''])[1].toLowerCase();
          wrap = wrapMap[tag] || wrapMap._default;
          tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];

          // Descend through wrappers to the right content
          j = wrap[0];
          while (j--) {
            tmp = tmp.lastChild;
          }

          // Support: Android <=4.0 only, PhantomJS 1 only
          // push.apply(_, arraylike) throws on ancient WebKit
          jQuery.merge(nodes, tmp.childNodes);

          // Remember the top-level container
          tmp = fragment.firstChild;

          // Ensure the created nodes are orphaned (trac-12392)
          tmp.textContent = '';
        }
      }
    }

    // Remove wrapper from fragment
    fragment.textContent = '';

    i = 0;
    while ((elem = nodes[i++])) {
      // Skip elements already in the context collection (trac-4087)
      if (selection && jQuery.inArray(elem, selection) > -1) {
        if (ignored) {
          ignored.push(elem);
        }
        continue;
      }

      attached = isAttached(elem);

      // Append to fragment
      tmp = getAll(fragment.appendChild(elem), 'script');

      // Preserve script evaluation history
      if (attached) {
        setGlobalEval(tmp);
      }

      // Capture executables
      if (scripts) {
        j = 0;
        while ((elem = tmp[j++])) {
          if (rscriptType.test(elem.type || '')) {
            scripts.push(elem);
          }
        }
      }
    }

    return fragment;
  }

  const rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

  function returnTrue() {
    return true;
  }

  function returnFalse() {
    return false;
  }

  function on(elem, types, selector, data, fn, one) {
    let origFn; let
      type;

    // Types can be a map of types/handlers
    if (typeof types === 'object') {
      // ( types-Object, selector, data )
      if (typeof selector !== 'string') {
        // ( types-Object, data )
        data = data || selector;
        selector = undefined;
      }
      for (type in types) {
        on(elem, type, selector, data, types[type], one);
      }
      return elem;
    }

    if (data == null && fn == null) {
      // ( types, fn )
      fn = selector;
      data = selector = undefined;
    } else if (fn == null) {
      if (typeof selector === 'string') {
        // ( types, selector, fn )
        fn = data;
        data = undefined;
      } else {
        // ( types, data, fn )
        fn = data;
        data = selector;
        selector = undefined;
      }
    }
    if (fn === false) {
      fn = returnFalse;
    } else if (!fn) {
      return elem;
    }

    if (one === 1) {
      origFn = fn;
      fn = function (event) {
        // Can use an empty set, since event contains the info
        jQuery().off(event);
        return origFn.apply(this, arguments);
      };

      // Use same guid so caller can remove using origFn
      fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
    }
    return elem.each(function () {
      jQuery.event.add(this, types, fn, data, selector);
    });
  }

  /*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
  jQuery.event = {

    global: {},

    add(elem, types, handler, data, selector) {
      let handleObjIn; let eventHandle; let tmp;
      let events; let t; let handleObj;
      let special; let handlers; let type; let namespaces; let origType;
      const elemData = dataPriv.get(elem);

      // Only attach events to objects that accept data
      if (!acceptData(elem)) {
        return;
      }

      // Caller can pass in an object of custom data in lieu of the handler
      if (handler.handler) {
        handleObjIn = handler;
        handler = handleObjIn.handler;
        selector = handleObjIn.selector;
      }

      // Ensure that invalid selectors throw exceptions at attach time
      // Evaluate against documentElement in case elem is a non-element node (e.g., document)
      if (selector) {
        jQuery.find.matchesSelector(documentElement, selector);
      }

      // Make sure that the handler has a unique ID, used to find/remove it later
      if (!handler.guid) {
        handler.guid = jQuery.guid++;
      }

      // Init the element's event structure and main handler, if this is the first
      if (!(events = elemData.events)) {
        events = elemData.events = Object.create(null);
      }
      if (!(eventHandle = elemData.handle)) {
        eventHandle = elemData.handle = function (e) {
          // Discard the second event of a jQuery.event.trigger() and
          // when an event is called after a page has unloaded
          return typeof jQuery !== 'undefined' && jQuery.event.triggered !== e.type
            ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
        };
      }

      // Handle multiple events separated by a space
      types = (types || '').match(rnothtmlwhite) || [''];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || '').split('.').sort();

        // There *must* be a type, no attaching namespace-only handlers
        if (!type) {
          continue;
        }

        // If event changes its type, use the special event handlers for the changed type
        special = jQuery.event.special[type] || {};

        // If selector defined, determine special event api type, otherwise given type
        type = (selector ? special.delegateType : special.bindType) || type;

        // Update special based on newly reset type
        special = jQuery.event.special[type] || {};

        // handleObj is passed to all event handlers
        handleObj = jQuery.extend({
          type,
          origType,
          data,
          handler,
          guid: handler.guid,
          selector,
          needsContext: selector && jQuery.expr.match.needsContext.test(selector),
          namespace: namespaces.join('.'),
        }, handleObjIn);

        // Init the event handler queue if we're the first
        if (!(handlers = events[type])) {
          handlers = events[type] = [];
          handlers.delegateCount = 0;

          // Only use addEventListener if the special events handler returns false
          if (!special.setup
					|| special.setup.call(elem, data, namespaces, eventHandle) === false) {
            if (elem.addEventListener) {
              elem.addEventListener(type, eventHandle);
            }
          }
        }

        if (special.add) {
          special.add.call(elem, handleObj);

          if (!handleObj.handler.guid) {
            handleObj.handler.guid = handler.guid;
          }
        }

        // Add to the element's handler list, delegates in front
        if (selector) {
          handlers.splice(handlers.delegateCount++, 0, handleObj);
        } else {
          handlers.push(handleObj);
        }

        // Keep track of which events have ever been used, for event optimization
        jQuery.event.global[type] = true;
      }
    },

    // Detach an event or set of events from an element
    remove(elem, types, handler, selector, mappedTypes) {
      let j; let origCount; let tmp;
      let events; let t; let handleObj;
      let special; let handlers; let type; let namespaces; let origType;
      const elemData = dataPriv.hasData(elem) && dataPriv.get(elem);

      if (!elemData || !(events = elemData.events)) {
        return;
      }

      // Once for each type.namespace in types; type may be omitted
      types = (types || '').match(rnothtmlwhite) || [''];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || '').split('.').sort();

        // Unbind all events (on this namespace, if provided) for the element
        if (!type) {
          for (type in events) {
            jQuery.event.remove(elem, type + types[t], handler, selector, true);
          }
          continue;
        }

        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        handlers = events[type] || [];
        tmp = tmp[2]
				&& new RegExp(`(^|\\.)${namespaces.join('\\.(?:.*\\.|)')}(\\.|$)`);

        // Remove matching events
        origCount = j = handlers.length;
        while (j--) {
          handleObj = handlers[j];

          if ((mappedTypes || origType === handleObj.origType)
					&& (!handler || handler.guid === handleObj.guid)
					&& (!tmp || tmp.test(handleObj.namespace))
					&& (!selector || selector === handleObj.selector
						|| selector === '**' && handleObj.selector)) {
            handlers.splice(j, 1);

            if (handleObj.selector) {
              handlers.delegateCount--;
            }
            if (special.remove) {
              special.remove.call(elem, handleObj);
            }
          }
        }

        // Remove generic event handler if we removed something and no more handlers exist
        // (avoids potential for endless recursion during removal of special event handlers)
        if (origCount && !handlers.length) {
          if (!special.teardown
					|| special.teardown.call(elem, namespaces, elemData.handle) === false) {
            jQuery.removeEvent(elem, type, elemData.handle);
          }

          delete events[type];
        }
      }

      // Remove data and the expando if it's no longer used
      if (jQuery.isEmptyObject(events)) {
        dataPriv.remove(elem, 'handle events');
      }
    },

    dispatch(nativeEvent) {
      let i; let j; let ret; let matched; let handleObj; let handlerQueue;
      const args = new Array(arguments.length);

      // Make a writable jQuery.Event from the native event object
      const event = jQuery.event.fix(nativeEvent);

      const handlers = (
        dataPriv.get(this, 'events') || Object.create(null)
      )[event.type] || [];
      const special = jQuery.event.special[event.type] || {};

      // Use the fix-ed jQuery.Event rather than the (read-only) native event
      args[0] = event;

      for (i = 1; i < arguments.length; i++) {
        args[i] = arguments[i];
      }

      event.delegateTarget = this;

      // Call the preDispatch hook for the mapped type, and let it bail if desired
      if (special.preDispatch && special.preDispatch.call(this, event) === false) {
        return;
      }

      // Determine handlers
      handlerQueue = jQuery.event.handlers.call(this, event, handlers);

      // Run delegates first; they may want to stop propagation beneath us
      i = 0;
      while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
        event.currentTarget = matched.elem;

        j = 0;
        while ((handleObj = matched.handlers[j++])
				&& !event.isImmediatePropagationStopped()) {
          // If the event is namespaced, then each handler is only invoked if it is
          // specially universal or its namespaces are a superset of the event's.
          if (!event.rnamespace || handleObj.namespace === false
					|| event.rnamespace.test(handleObj.namespace)) {
            event.handleObj = handleObj;
            event.data = handleObj.data;

            ret = ((jQuery.event.special[handleObj.origType] || {}).handle
						|| handleObj.handler).apply(matched.elem, args);

            if (ret !== undefined) {
              if ((event.result = ret) === false) {
                event.preventDefault();
                event.stopPropagation();
              }
            }
          }
        }
      }

      // Call the postDispatch hook for the mapped type
      if (special.postDispatch) {
        special.postDispatch.call(this, event);
      }

      return event.result;
    },

    handlers(event, handlers) {
      let i; let handleObj; let sel; let matchedHandlers; let matchedSelectors;
      const handlerQueue = [];
      const { delegateCount } = handlers;
      let cur = event.target;

      // Find delegate handlers
      if (delegateCount

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			&& cur.nodeType

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			&& !(event.type === 'click' && event.button >= 1)) {
        for (; cur !== this; cur = cur.parentNode || this) {
          // Don't check non-elements (trac-13208)
          // Don't process clicks on disabled elements (trac-6911, trac-8165, trac-11382, trac-11764)
          if (cur.nodeType === 1 && !(event.type === 'click' && cur.disabled === true)) {
            matchedHandlers = [];
            matchedSelectors = {};
            for (i = 0; i < delegateCount; i++) {
              handleObj = handlers[i];

              // Don't conflict with Object.prototype properties (trac-13203)
              sel = `${handleObj.selector} `;

              if (matchedSelectors[sel] === undefined) {
                matchedSelectors[sel] = handleObj.needsContext
                  ? jQuery(sel, this).index(cur) > -1
                  : jQuery.find(sel, this, null, [cur]).length;
              }
              if (matchedSelectors[sel]) {
                matchedHandlers.push(handleObj);
              }
            }
            if (matchedHandlers.length) {
              handlerQueue.push({ elem: cur, handlers: matchedHandlers });
            }
          }
        }
      }

      // Add the remaining (directly-bound) handlers
      cur = this;
      if (delegateCount < handlers.length) {
        handlerQueue.push({ elem: cur, handlers: handlers.slice(delegateCount) });
      }

      return handlerQueue;
    },

    addProp(name, hook) {
      Object.defineProperty(jQuery.Event.prototype, name, {
        enumerable: true,
        configurable: true,

        get: isFunction(hook)
          ? function () {
            if (this.originalEvent) {
              return hook(this.originalEvent);
            }
          }
          : function () {
            if (this.originalEvent) {
              return this.originalEvent[name];
            }
          },

        set(value) {
          Object.defineProperty(this, name, {
            enumerable: true,
            configurable: true,
            writable: true,
            value,
          });
        },
      });
    },

    fix(originalEvent) {
      return originalEvent[jQuery.expando]
        ? originalEvent
        : new jQuery.Event(originalEvent);
    },

    special: {
      load: {

        // Prevent triggered image.load events from bubbling to window.load
        noBubble: true,
      },
      click: {

        // Utilize native event to ensure correct state for checkable inputs
        setup(data) {
          // For mutual compressibility with _default, replace `this` access with a local var.
          // `|| data` is dead code meant only to preserve the variable through minification.
          const el = this || data;

          // Claim the first handler
          if (rcheckableType.test(el.type)
					&& el.click && nodeName(el, 'input')) {
            // dataPriv.set( el, "click", ... )
            leverageNative(el, 'click', true);
          }

          // Return false to allow normal processing in the caller
          return false;
        },
        trigger(data) {
          // For mutual compressibility with _default, replace `this` access with a local var.
          // `|| data` is dead code meant only to preserve the variable through minification.
          const el = this || data;

          // Force setup before triggering a click
          if (rcheckableType.test(el.type)
					&& el.click && nodeName(el, 'input')) {
            leverageNative(el, 'click');
          }

          // Return non-false to allow normal event-path propagation
          return true;
        },

        // For cross-browser consistency, suppress native .click() on links
        // Also prevent it if we're currently inside a leveraged native-event stack
        _default(event) {
          const { target } = event;
          return rcheckableType.test(target.type)
					&& target.click && nodeName(target, 'input')
					&& dataPriv.get(target, 'click')
					|| nodeName(target, 'a');
        },
      },

      beforeunload: {
        postDispatch(event) {
          // Support: Firefox 20+
          // Firefox doesn't alert if the returnValue field is not set.
          if (event.result !== undefined && event.originalEvent) {
            event.originalEvent.returnValue = event.result;
          }
        },
      },
    },
  };

  // Ensure the presence of an event listener that handles manually-triggered
  // synthetic events by interrupting progress until reinvoked in response to
  // *native* events that it fires directly, ensuring that state changes have
  // already occurred before other listeners are invoked.
  function leverageNative(el, type, isSetup) {
    // Missing `isSetup` indicates a trigger call, which must force setup through jQuery.event.add
    if (!isSetup) {
      if (dataPriv.get(el, type) === undefined) {
        jQuery.event.add(el, type, returnTrue);
      }
      return;
    }

    // Register the controller as a special universal handler for all event namespaces
    dataPriv.set(el, type, false);
    jQuery.event.add(el, type, {
      namespace: false,
      handler(event) {
        let result;
        let saved = dataPriv.get(this, type);

        if ((event.isTrigger & 1) && this[type]) {
          // Interrupt processing of the outer synthetic .trigger()ed event
          if (!saved) {
            // Store arguments for use when handling the inner native event
            // There will always be at least one argument (an event object), so this array
            // will not be confused with a leftover capture object.
            saved = slice.call(arguments);
            dataPriv.set(this, type, saved);

            // Trigger the native event and capture its result
            this[type]();
            result = dataPriv.get(this, type);
            dataPriv.set(this, type, false);

            if (saved !== result) {
              // Cancel the outer synthetic event
              event.stopImmediatePropagation();
              event.preventDefault();

              return result;
            }

            // If this is an inner synthetic event for an event with a bubbling surrogate
            // (focus or blur), assume that the surrogate already propagated from triggering
            // the native event and prevent that from happening again here.
            // This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
            // bubbling surrogate propagates *after* the non-bubbling base), but that seems
            // less bad than duplication.
          } else if ((jQuery.event.special[type] || {}).delegateType) {
            event.stopPropagation();
          }

          // If this is a native event triggered above, everything is now in order
          // Fire an inner synthetic event with the original arguments
        } else if (saved) {
          // ...and capture the result
          dataPriv.set(this, type, jQuery.event.trigger(
            saved[0],
            saved.slice(1),
            this,
          ));

          // Abort handling of the native event by all jQuery handlers while allowing
          // native handlers on the same element to run. On target, this is achieved
          // by stopping immediate propagation just on the jQuery event. However,
          // the native event is re-wrapped by a jQuery one on each level of the
          // propagation so the only way to stop it for jQuery is to stop it for
          // everyone via native `stopPropagation()`. This is not a problem for
          // focus/blur which don't bubble, but it does also stop click on checkboxes
          // and radios. We accept this limitation.
          event.stopPropagation();
          event.isImmediatePropagationStopped = returnTrue;
        }
      },
    });
  }

  jQuery.removeEvent = function (elem, type, handle) {
    // This "if" is needed for plain objects
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handle);
    }
  };

  jQuery.Event = function (src, props) {
    // Allow instantiation without the 'new' keyword
    if (!(this instanceof jQuery.Event)) {
      return new jQuery.Event(src, props);
    }

    // Event object
    if (src && src.type) {
      this.originalEvent = src;
      this.type = src.type;

      // Events bubbling up the document may have been marked as prevented
      // by a handler lower down the tree; reflect the correct value.
      this.isDefaultPrevented = src.defaultPrevented
				|| src.defaultPrevented === undefined

				// Support: Android <=2.3 only
				&& src.returnValue === false
        ? returnTrue
        : returnFalse;

      // Create target properties
      // Support: Safari <=6 - 7 only
      // Target should not be a text node (trac-504, trac-13143)
      this.target = (src.target && src.target.nodeType === 3)
        ? src.target.parentNode
        : src.target;

      this.currentTarget = src.currentTarget;
      this.relatedTarget = src.relatedTarget;

      // Event type
    } else {
      this.type = src;
    }

    // Put explicitly provided properties onto the event object
    if (props) {
      jQuery.extend(this, props);
    }

    // Create a timestamp if incoming event doesn't have one
    this.timeStamp = src && src.timeStamp || Date.now();

    // Mark it as fixed
    this[jQuery.expando] = true;
  };

  // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
  // https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
  jQuery.Event.prototype = {
    constructor: jQuery.Event,
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse,
    isSimulated: false,

    preventDefault() {
      const e = this.originalEvent;

      this.isDefaultPrevented = returnTrue;

      if (e && !this.isSimulated) {
        e.preventDefault();
      }
    },
    stopPropagation() {
      const e = this.originalEvent;

      this.isPropagationStopped = returnTrue;

      if (e && !this.isSimulated) {
        e.stopPropagation();
      }
    },
    stopImmediatePropagation() {
      const e = this.originalEvent;

      this.isImmediatePropagationStopped = returnTrue;

      if (e && !this.isSimulated) {
        e.stopImmediatePropagation();
      }

      this.stopPropagation();
    },
  };

  // Includes all common event props including KeyEvent and MouseEvent specific props
  jQuery.each({
    altKey: true,
    bubbles: true,
    cancelable: true,
    changedTouches: true,
    ctrlKey: true,
    detail: true,
    eventPhase: true,
    metaKey: true,
    pageX: true,
    pageY: true,
    shiftKey: true,
    view: true,
    char: true,
    code: true,
    charCode: true,
    key: true,
    keyCode: true,
    button: true,
    buttons: true,
    clientX: true,
    clientY: true,
    offsetX: true,
    offsetY: true,
    pointerId: true,
    pointerType: true,
    screenX: true,
    screenY: true,
    targetTouches: true,
    toElement: true,
    touches: true,
    which: true,
  }, jQuery.event.addProp);

  jQuery.each({ focus: 'focusin', blur: 'focusout' }, (type, delegateType) => {
    function focusMappedHandler(nativeEvent) {
      if (document.documentMode) {
        // Support: IE 11+
        // Attach a single focusin/focusout handler on the document while someone wants
        // focus/blur. This is because the former are synchronous in IE while the latter
        // are async. In other browsers, all those handlers are invoked synchronously.

        // `handle` from private data would already wrap the event, but we need
        // to change the `type` here.
        const handle = dataPriv.get(this, 'handle');
        const event = jQuery.event.fix(nativeEvent);
        event.type = nativeEvent.type === 'focusin' ? 'focus' : 'blur';
        event.isSimulated = true;

        // First, handle focusin/focusout
        handle(nativeEvent);

        // ...then, handle focus/blur
        //
        // focus/blur don't bubble while focusin/focusout do; simulate the former by only
        // invoking the handler at the lower level.
        if (event.target === event.currentTarget) {
          // The setup part calls `leverageNative`, which, in turn, calls
          // `jQuery.event.add`, so event handle will already have been set
          // by this point.
          handle(event);
        }
      } else {
        // For non-IE browsers, attach a single capturing handler on the document
        // while someone wants focusin/focusout.
        jQuery.event.simulate(
          delegateType,
          nativeEvent.target,
          jQuery.event.fix(nativeEvent),
        );
      }
    }

    jQuery.event.special[type] = {

      // Utilize native event if possible so blur/focus sequence is correct
      setup() {
        let attaches;

        // Claim the first handler
        // dataPriv.set( this, "focus", ... )
        // dataPriv.set( this, "blur", ... )
        leverageNative(this, type, true);

        if (document.documentMode) {
          // Support: IE 9 - 11+
          // We use the same native handler for focusin & focus (and focusout & blur)
          // so we need to coordinate setup & teardown parts between those events.
          // Use `delegateType` as the key as `type` is already used by `leverageNative`.
          attaches = dataPriv.get(this, delegateType);
          if (!attaches) {
            this.addEventListener(delegateType, focusMappedHandler);
          }
          dataPriv.set(this, delegateType, (attaches || 0) + 1);
        } else {
          // Return false to allow normal processing in the caller
          return false;
        }
      },
      trigger() {
        // Force setup before trigger
        leverageNative(this, type);

        // Return non-false to allow normal event-path propagation
        return true;
      },

      teardown() {
        let attaches;

        if (document.documentMode) {
          attaches = dataPriv.get(this, delegateType) - 1;
          if (!attaches) {
            this.removeEventListener(delegateType, focusMappedHandler);
            dataPriv.remove(this, delegateType);
          } else {
            dataPriv.set(this, delegateType, attaches);
          }
        } else {
          // Return false to indicate standard teardown should be applied
          return false;
        }
      },

      // Suppress native focus or blur if we're currently inside
      // a leveraged native-event stack
      _default(event) {
        return dataPriv.get(event.target, type);
      },

      delegateType,
    };

    // Support: Firefox <=44
    // Firefox doesn't have focus(in | out) events
    // Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
    //
    // Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
    // focus(in | out) events fire after focus & blur events,
    // which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
    // Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
    //
    // Support: IE 9 - 11+
    // To preserve relative focusin/focus & focusout/blur event order guaranteed on the 3.x branch,
    // attach a single handler for both events in IE.
    jQuery.event.special[delegateType] = {
      setup() {
        // Handle: regular nodes (via `this.ownerDocument`), window
        // (via `this.document`) & document (via `this`).
        const doc = this.ownerDocument || this.document || this;
        const dataHolder = document.documentMode ? this : doc;
        const attaches = dataPriv.get(dataHolder, delegateType);

        // Support: IE 9 - 11+
        // We use the same native handler for focusin & focus (and focusout & blur)
        // so we need to coordinate setup & teardown parts between those events.
        // Use `delegateType` as the key as `type` is already used by `leverageNative`.
        if (!attaches) {
          if (document.documentMode) {
            this.addEventListener(delegateType, focusMappedHandler);
          } else {
            doc.addEventListener(type, focusMappedHandler, true);
          }
        }
        dataPriv.set(dataHolder, delegateType, (attaches || 0) + 1);
      },
      teardown() {
        const doc = this.ownerDocument || this.document || this;
        const dataHolder = document.documentMode ? this : doc;
        const attaches = dataPriv.get(dataHolder, delegateType) - 1;

        if (!attaches) {
          if (document.documentMode) {
            this.removeEventListener(delegateType, focusMappedHandler);
          } else {
            doc.removeEventListener(type, focusMappedHandler, true);
          }
          dataPriv.remove(dataHolder, delegateType);
        } else {
          dataPriv.set(dataHolder, delegateType, attaches);
        }
      },
    };
  });

  // Create mouseenter/leave events using mouseover/out and event-time checks
  // so that event delegation works in jQuery.
  // Do the same for pointerenter/pointerleave and pointerover/pointerout
  //
  // Support: Safari 7 only
  // Safari sends mouseenter too often; see:
  // https://bugs.chromium.org/p/chromium/issues/detail?id=470258
  // for the description of the bug (it existed in older Chrome versions as well).
  jQuery.each({
    mouseenter: 'mouseover',
    mouseleave: 'mouseout',
    pointerenter: 'pointerover',
    pointerleave: 'pointerout',
  }, (orig, fix) => {
    jQuery.event.special[orig] = {
      delegateType: fix,
      bindType: fix,

      handle(event) {
        let ret;
        const target = this;
        const related = event.relatedTarget;
        const { handleObj } = event;

        // For mouseenter/leave call the handler if related is outside the target.
        // NB: No relatedTarget if the mouse left/entered the browser window
        if (!related || (related !== target && !jQuery.contains(target, related))) {
          event.type = handleObj.origType;
          ret = handleObj.handler.apply(this, arguments);
          event.type = fix;
        }
        return ret;
      },
    };
  });

  jQuery.fn.extend({

    on(types, selector, data, fn) {
      return on(this, types, selector, data, fn);
    },
    one(types, selector, data, fn) {
      return on(this, types, selector, data, fn, 1);
    },
    off(types, selector, fn) {
      let handleObj; let
        type;
      if (types && types.preventDefault && types.handleObj) {
        // ( event )  dispatched jQuery.Event
        handleObj = types.handleObj;
        jQuery(types.delegateTarget).off(
          handleObj.namespace
            ? `${handleObj.origType}.${handleObj.namespace}`
            : handleObj.origType,
          handleObj.selector,
          handleObj.handler,
        );
        return this;
      }
      if (typeof types === 'object') {
        // ( types-object [, selector] )
        for (type in types) {
          this.off(type, selector, types[type]);
        }
        return this;
      }
      if (selector === false || typeof selector === 'function') {
        // ( types [, fn] )
        fn = selector;
        selector = undefined;
      }
      if (fn === false) {
        fn = returnFalse;
      }
      return this.each(function () {
        jQuery.event.remove(this, types, fn, selector);
      });
    },
  });

  const

    // Support: IE <=10 - 11, Edge 12 - 13 only
    // In IE/Edge using regex groups here causes severe slowdowns.
    // See https://connect.microsoft.com/IE/feedback/details/1736512/
    rnoInnerhtml = /<script|<style|<link/i;

  // checked="checked" or checked
  const rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i;

  const rcleanScript = /^\s*<!\[CDATA\[|\]\]>\s*$/g;

  // Prefer a tbody over its parent table for containing new rows
  function manipulationTarget(elem, content) {
    if (nodeName(elem, 'table')
		&& nodeName(content.nodeType !== 11 ? content : content.firstChild, 'tr')) {
      return jQuery(elem).children('tbody')[0] || elem;
    }

    return elem;
  }

  // Replace/restore the type attribute of script elements for safe DOM manipulation
  function disableScript(elem) {
    elem.type = `${elem.getAttribute('type') !== null}/${elem.type}`;
    return elem;
  }
  function restoreScript(elem) {
    if ((elem.type || '').slice(0, 5) === 'true/') {
      elem.type = elem.type.slice(5);
    } else {
      elem.removeAttribute('type');
    }

    return elem;
  }

  function cloneCopyEvent(src, dest) {
    let i; let l; let type; let pdataOld; let udataOld; let udataCur; let
      events;

    if (dest.nodeType !== 1) {
      return;
    }

    // 1. Copy private data: events, handlers, etc.
    if (dataPriv.hasData(src)) {
      pdataOld = dataPriv.get(src);
      events = pdataOld.events;

      if (events) {
        dataPriv.remove(dest, 'handle events');

        for (type in events) {
          for (i = 0, l = events[type].length; i < l; i++) {
            jQuery.event.add(dest, type, events[type][i]);
          }
        }
      }
    }

    // 2. Copy user data
    if (dataUser.hasData(src)) {
      udataOld = dataUser.access(src);
      udataCur = jQuery.extend({}, udataOld);

      dataUser.set(dest, udataCur);
    }
  }

  // Fix IE bugs, see support tests
  function fixInput(src, dest) {
    const nodeName = dest.nodeName.toLowerCase();

    // Fails to persist the checked state of a cloned checkbox or radio button.
    if (nodeName === 'input' && rcheckableType.test(src.type)) {
      dest.checked = src.checked;

      // Fails to return the selected option to the default selected state when cloning options
    } else if (nodeName === 'input' || nodeName === 'textarea') {
      dest.defaultValue = src.defaultValue;
    }
  }

  function domManip(collection, args, callback, ignored) {
    // Flatten any nested arrays
    args = flat(args);

    let fragment; let first; let scripts; let hasScripts; let node; let doc;
    let i = 0;
    const l = collection.length;
    const iNoClone = l - 1;
    const value = args[0];
    const valueIsFunction = isFunction(value);

    // We can't cloneNode fragments that contain checked, in WebKit
    if (valueIsFunction
			|| (l > 1 && typeof value === 'string'
				&& !support.checkClone && rchecked.test(value))) {
      return collection.each(function (index) {
        const self = collection.eq(index);
        if (valueIsFunction) {
          args[0] = value.call(this, index, self.html());
        }
        domManip(self, args, callback, ignored);
      });
    }

    if (l) {
      fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
      first = fragment.firstChild;

      if (fragment.childNodes.length === 1) {
        fragment = first;
      }

      // Require either new content or an interest in ignored elements to invoke the callback
      if (first || ignored) {
        scripts = jQuery.map(getAll(fragment, 'script'), disableScript);
        hasScripts = scripts.length;

        // Use the original fragment for the last item
        // instead of the first because it can end up
        // being emptied incorrectly in certain situations (trac-8070).
        for (; i < l; i++) {
          node = fragment;

          if (i !== iNoClone) {
            node = jQuery.clone(node, true, true);

            // Keep references to cloned scripts for later restoration
            if (hasScripts) {
              // Support: Android <=4.0 only, PhantomJS 1 only
              // push.apply(_, arraylike) throws on ancient WebKit
              jQuery.merge(scripts, getAll(node, 'script'));
            }
          }

          callback.call(collection[i], node, i);
        }

        if (hasScripts) {
          doc = scripts[scripts.length - 1].ownerDocument;

          // Reenable scripts
          jQuery.map(scripts, restoreScript);

          // Evaluate executable scripts on first document insertion
          for (i = 0; i < hasScripts; i++) {
            node = scripts[i];
            if (rscriptType.test(node.type || '')
						&& !dataPriv.access(node, 'globalEval')
						&& jQuery.contains(doc, node)) {
              if (node.src && (node.type || '').toLowerCase() !== 'module') {
                // Optional AJAX dependency, but won't run scripts if not present
                if (jQuery._evalUrl && !node.noModule) {
                  jQuery._evalUrl(node.src, {
                    nonce: node.nonce || node.getAttribute('nonce'),
                  }, doc);
                }
              } else {
                // Unwrap a CDATA section containing script contents. This shouldn't be
                // needed as in XML documents they're already not visible when
                // inspecting element contents and in HTML documents they have no
                // meaning but we're preserving that logic for backwards compatibility.
                // This will be removed completely in 4.0. See gh-4904.
                DOMEval(node.textContent.replace(rcleanScript, ''), node, doc);
              }
            }
          }
        }
      }
    }

    return collection;
  }

  function remove(elem, selector, keepData) {
    let node;
    const nodes = selector ? jQuery.filter(selector, elem) : elem;
    let i = 0;

    for (; (node = nodes[i]) != null; i++) {
      if (!keepData && node.nodeType === 1) {
        jQuery.cleanData(getAll(node));
      }

      if (node.parentNode) {
        if (keepData && isAttached(node)) {
          setGlobalEval(getAll(node, 'script'));
        }
        node.parentNode.removeChild(node);
      }
    }

    return elem;
  }

  jQuery.extend({
    htmlPrefilter(html) {
      return html;
    },

    clone(elem, dataAndEvents, deepDataAndEvents) {
      let i; let l; let srcElements; let destElements;
      const clone = elem.cloneNode(true);
      const inPage = isAttached(elem);

      // Fix IE cloning issues
      if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11)
				&& !jQuery.isXMLDoc(elem)) {
        // We eschew jQuery#find here for performance reasons:
        // https://jsperf.com/getall-vs-sizzle/2
        destElements = getAll(clone);
        srcElements = getAll(elem);

        for (i = 0, l = srcElements.length; i < l; i++) {
          fixInput(srcElements[i], destElements[i]);
        }
      }

      // Copy the events from the original to the clone
      if (dataAndEvents) {
        if (deepDataAndEvents) {
          srcElements = srcElements || getAll(elem);
          destElements = destElements || getAll(clone);

          for (i = 0, l = srcElements.length; i < l; i++) {
            cloneCopyEvent(srcElements[i], destElements[i]);
          }
        } else {
          cloneCopyEvent(elem, clone);
        }
      }

      // Preserve script evaluation history
      destElements = getAll(clone, 'script');
      if (destElements.length > 0) {
        setGlobalEval(destElements, !inPage && getAll(elem, 'script'));
      }

      // Return the cloned set
      return clone;
    },

    cleanData(elems) {
      let data; let elem; let type;
      const { special } = jQuery.event;
      let i = 0;

      for (; (elem = elems[i]) !== undefined; i++) {
        if (acceptData(elem)) {
          if ((data = elem[dataPriv.expando])) {
            if (data.events) {
              for (type in data.events) {
                if (special[type]) {
                  jQuery.event.remove(elem, type);

                  // This is a shortcut to avoid jQuery.event.remove's overhead
                } else {
                  jQuery.removeEvent(elem, type, data.handle);
                }
              }
            }

            // Support: Chrome <=35 - 45+
            // Assign undefined instead of using delete, see Data#remove
            elem[dataPriv.expando] = undefined;
          }
          if (elem[dataUser.expando]) {
            // Support: Chrome <=35 - 45+
            // Assign undefined instead of using delete, see Data#remove
            elem[dataUser.expando] = undefined;
          }
        }
      }
    },
  });

  jQuery.fn.extend({
    detach(selector) {
      return remove(this, selector, true);
    },

    remove(selector) {
      return remove(this, selector);
    },

    text(value) {
      return access(this, function (value) {
        return value === undefined
          ? jQuery.text(this)
          : this.empty().each(function () {
            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
              this.textContent = value;
            }
          });
      }, null, value, arguments.length);
    },

    append() {
      return domManip(this, arguments, function (elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          const target = manipulationTarget(this, elem);
          target.appendChild(elem);
        }
      });
    },

    prepend() {
      return domManip(this, arguments, function (elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          const target = manipulationTarget(this, elem);
          target.insertBefore(elem, target.firstChild);
        }
      });
    },

    before() {
      return domManip(this, arguments, function (elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this);
        }
      });
    },

    after() {
      return domManip(this, arguments, function (elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this.nextSibling);
        }
      });
    },

    empty() {
      let elem;
      let i = 0;

      for (; (elem = this[i]) != null; i++) {
        if (elem.nodeType === 1) {
          // Prevent memory leaks
          jQuery.cleanData(getAll(elem, false));

          // Remove any remaining nodes
          elem.textContent = '';
        }
      }

      return this;
    },

    clone(dataAndEvents, deepDataAndEvents) {
      dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
      deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

      return this.map(function () {
        return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
      });
    },

    html(value) {
      return access(this, function (value) {
        let elem = this[0] || {};
        let i = 0;
        const l = this.length;

        if (value === undefined && elem.nodeType === 1) {
          return elem.innerHTML;
        }

        // See if we can take a shortcut and just use innerHTML
        if (typeof value === 'string' && !rnoInnerhtml.test(value)
				&& !wrapMap[(rtagName.exec(value) || ['', ''])[1].toLowerCase()]) {
          value = jQuery.htmlPrefilter(value);

          try {
            for (; i < l; i++) {
              elem = this[i] || {};

              // Remove element nodes and prevent memory leaks
              if (elem.nodeType === 1) {
                jQuery.cleanData(getAll(elem, false));
                elem.innerHTML = value;
              }
            }

            elem = 0;

            // If using innerHTML throws an exception, use the fallback method
          } catch (e) {}
        }

        if (elem) {
          this.empty().append(value);
        }
      }, null, value, arguments.length);
    },

    replaceWith() {
      const ignored = [];

      // Make the changes, replacing each non-ignored context element with the new content
      return domManip(this, arguments, function (elem) {
        const parent = this.parentNode;

        if (jQuery.inArray(this, ignored) < 0) {
          jQuery.cleanData(getAll(this));
          if (parent) {
            parent.replaceChild(elem, this);
          }
        }

        // Force callback invocation
      }, ignored);
    },
  });

  jQuery.each({
    appendTo: 'append',
    prependTo: 'prepend',
    insertBefore: 'before',
    insertAfter: 'after',
    replaceAll: 'replaceWith',
  }, (name, original) => {
    jQuery.fn[name] = function (selector) {
      let elems;
      const ret = [];
      const insert = jQuery(selector);
      const last = insert.length - 1;
      let i = 0;

      for (; i <= last; i++) {
        elems = i === last ? this : this.clone(true);
        jQuery(insert[i])[original](elems);

        // Support: Android <=4.0 only, PhantomJS 1 only
        // .get() because push.apply(_, arraylike) throws on ancient WebKit
        push.apply(ret, elems.get());
      }

      return this.pushStack(ret);
    };
  });
  const rnumnonpx = new RegExp(`^(${pnum})(?!px)[a-z%]+$`, 'i');

  const rcustomProp = /^--/;

  const getStyles = function (elem) {
    // Support: IE <=11 only, Firefox <=30 (trac-15098, trac-14150)
    // IE throws on elements created in popups
    // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
    let view = elem.ownerDocument.defaultView;

    if (!view || !view.opener) {
      view = window;
    }

    return view.getComputedStyle(elem);
  };

  const swap = function (elem, options, callback) {
    let ret; let name;
    const old = {};

    // Remember the old values, and insert the new ones
    for (name in options) {
      old[name] = elem.style[name];
      elem.style[name] = options[name];
    }

    ret = callback.call(elem);

    // Revert the old values
    for (name in options) {
      elem.style[name] = old[name];
    }

    return ret;
  };

  const rboxStyle = new RegExp(cssExpand.join('|'), 'i');

  (function () {
    // Executing both pixelPosition & boxSizingReliable tests require only one layout
    // so they're executed at the same time to save the second computation.
    function computeStyleTests() {
      // This is a singleton, we need to execute it only once
      if (!div) {
        return;
      }

      container.style.cssText = 'position:absolute;left:-11111px;width:60px;'
			+ 'margin-top:1px;padding:0;border:0';
      div.style.cssText =			'position:relative;display:block;box-sizing:border-box;overflow:scroll;'
			+ 'margin:auto;border:1px;padding:1px;'
			+ 'width:60%;top:1%';
      documentElement.appendChild(container).appendChild(div);

      const divStyle = window.getComputedStyle(div);
      pixelPositionVal = divStyle.top !== '1%';

      // Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
      reliableMarginLeftVal = roundPixelMeasures(divStyle.marginLeft) === 12;

      // Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
      // Some styles come back with percentage values, even though they shouldn't
      div.style.right = '60%';
      pixelBoxStylesVal = roundPixelMeasures(divStyle.right) === 36;

      // Support: IE 9 - 11 only
      // Detect misreporting of content dimensions for box-sizing:border-box elements
      boxSizingReliableVal = roundPixelMeasures(divStyle.width) === 36;

      // Support: IE 9 only
      // Detect overflow:scroll screwiness (gh-3699)
      // Support: Chrome <=64
      // Don't get tricked when zoom affects offsetWidth (gh-4029)
      div.style.position = 'absolute';
      scrollboxSizeVal = roundPixelMeasures(div.offsetWidth / 3) === 12;

      documentElement.removeChild(container);

      // Nullify the div so it wouldn't be stored in the memory and
      // it will also be a sign that checks already performed
      div = null;
    }

    function roundPixelMeasures(measure) {
      return Math.round(parseFloat(measure));
    }

    let pixelPositionVal; let boxSizingReliableVal; let scrollboxSizeVal; let pixelBoxStylesVal;
    let reliableTrDimensionsVal; let reliableMarginLeftVal;
    var container = document.createElement('div');
    var div = document.createElement('div');

    // Finish early in limited (non-browser) environments
    if (!div.style) {
      return;
    }

    // Support: IE <=9 - 11 only
    // Style of cloned element affects source element cloned (trac-8908)
    div.style.backgroundClip = 'content-box';
    div.cloneNode(true).style.backgroundClip = '';
    support.clearCloneStyle = div.style.backgroundClip === 'content-box';

    jQuery.extend(support, {
      boxSizingReliable() {
        computeStyleTests();
        return boxSizingReliableVal;
      },
      pixelBoxStyles() {
        computeStyleTests();
        return pixelBoxStylesVal;
      },
      pixelPosition() {
        computeStyleTests();
        return pixelPositionVal;
      },
      reliableMarginLeft() {
        computeStyleTests();
        return reliableMarginLeftVal;
      },
      scrollboxSize() {
        computeStyleTests();
        return scrollboxSizeVal;
      },

      // Support: IE 9 - 11+, Edge 15 - 18+
      // IE/Edge misreport `getComputedStyle` of table rows with width/height
      // set in CSS while `offset*` properties report correct values.
      // Behavior in IE 9 is more subtle than in newer versions & it passes
      // some versions of this test; make sure not to make it pass there!
      //
      // Support: Firefox 70+
      // Only Firefox includes border widths
      // in computed dimensions. (gh-4529)
      reliableTrDimensions() {
        let table; let tr; let trChild; let
          trStyle;
        if (reliableTrDimensionsVal == null) {
          table = document.createElement('table');
          tr = document.createElement('tr');
          trChild = document.createElement('div');

          table.style.cssText = 'position:absolute;left:-11111px;border-collapse:separate';
          tr.style.cssText = 'border:1px solid';

          // Support: Chrome 86+
          // Height set through cssText does not get applied.
          // Computed height then comes back as 0.
          tr.style.height = '1px';
          trChild.style.height = '9px';

          // Support: Android 8 Chrome 86+
          // In our bodyBackground.html iframe,
          // display for all div elements is set to "inline",
          // which causes a problem only in Android 8 Chrome 86.
          // Ensuring the div is display: block
          // gets around this issue.
          trChild.style.display = 'block';

          documentElement
            .appendChild(table)
            .appendChild(tr)
            .appendChild(trChild);

          trStyle = window.getComputedStyle(tr);
          reliableTrDimensionsVal = (parseInt(trStyle.height, 10)
					+ parseInt(trStyle.borderTopWidth, 10)
					+ parseInt(trStyle.borderBottomWidth, 10)) === tr.offsetHeight;

          documentElement.removeChild(table);
        }
        return reliableTrDimensionsVal;
      },
    });
  }());

  function curCSS(elem, name, computed) {
    let width; let minWidth; let maxWidth; let ret;
    const isCustomProp = rcustomProp.test(name);

    // Support: Firefox 51+
    // Retrieving style before computed somehow
    // fixes an issue with getting wrong values
    // on detached elements
    const { style } = elem;

    computed = computed || getStyles(elem);

    // getPropertyValue is needed for:
    //   .css('filter') (IE 9 only, trac-12537)
    //   .css('--customProperty) (gh-3144)
    if (computed) {
      // Support: IE <=9 - 11+
      // IE only supports `"float"` in `getPropertyValue`; in computed styles
      // it's only available as `"cssFloat"`. We no longer modify properties
      // sent to `.css()` apart from camelCasing, so we need to check both.
      // Normally, this would create difference in behavior: if
      // `getPropertyValue` returns an empty string, the value returned
      // by `.css()` would be `undefined`. This is usually the case for
      // disconnected elements. However, in IE even disconnected elements
      // with no styles return `"none"` for `getPropertyValue( "float" )`
      ret = computed.getPropertyValue(name) || computed[name];

      if (isCustomProp && ret) {
        // Support: Firefox 105+, Chrome <=105+
        // Spec requires trimming whitespace for custom properties (gh-4926).
        // Firefox only trims leading whitespace. Chrome just collapses
        // both leading & trailing whitespace to a single space.
        //
        // Fall back to `undefined` if empty string returned.
        // This collapses a missing definition with property defined
        // and set to an empty string but there's no standard API
        // allowing us to differentiate them without a performance penalty
        // and returning `undefined` aligns with older jQuery.
        //
        // rtrimCSS treats U+000D CARRIAGE RETURN and U+000C FORM FEED
        // as whitespace while CSS does not, but this is not a problem
        // because CSS preprocessing replaces them with U+000A LINE FEED
        // (which *is* CSS whitespace)
        // https://www.w3.org/TR/css-syntax-3/#input-preprocessing
        ret = ret.replace(rtrimCSS, '$1') || undefined;
      }

      if (ret === '' && !isAttached(elem)) {
        ret = jQuery.style(elem, name);
      }

      // A tribute to the "awesome hack by Dean Edwards"
      // Android Browser returns percentage for some values,
      // but width seems to be reliably pixels.
      // This is against the CSSOM draft spec:
      // https://drafts.csswg.org/cssom/#resolved-values
      if (!support.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name)) {
        // Remember the original values
        width = style.width;
        minWidth = style.minWidth;
        maxWidth = style.maxWidth;

        // Put in the new values to get a computed value out
        style.minWidth = style.maxWidth = style.width = ret;
        ret = computed.width;

        // Revert the changed values
        style.width = width;
        style.minWidth = minWidth;
        style.maxWidth = maxWidth;
      }
    }

    return ret !== undefined

    // Support: IE <=9 - 11 only
    // IE returns zIndex value as an integer.
      ? `${ret}`
      : ret;
  }

  function addGetHookIf(conditionFn, hookFn) {
    // Define the hook, we'll check on the first run if it's really needed.
    return {
      get() {
        if (conditionFn()) {
          // Hook not needed (or it's not possible to use it due
          // to missing dependency), remove it.
          delete this.get;
          return;
        }

        // Hook needed; redefine it so that the support test is not executed again.
        return (this.get = hookFn).apply(this, arguments);
      },
    };
  }

  const cssPrefixes = ['Webkit', 'Moz', 'ms'];
  const emptyStyle = document.createElement('div').style;
  const vendorProps = {};

  // Return a vendor-prefixed property or undefined
  function vendorPropName(name) {
    // Check for vendor prefixed names
    const capName = name[0].toUpperCase() + name.slice(1);
    let i = cssPrefixes.length;

    while (i--) {
      name = cssPrefixes[i] + capName;
      if (name in emptyStyle) {
        return name;
      }
    }
  }

  // Return a potentially-mapped jQuery.cssProps or vendor prefixed property
  function finalPropName(name) {
    const final = jQuery.cssProps[name] || vendorProps[name];

    if (final) {
      return final;
    }
    if (name in emptyStyle) {
      return name;
    }
    return vendorProps[name] = vendorPropName(name) || name;
  }

  const

    // Swappable if display is none or starts with table
    // except "table", "table-cell", or "table-caption"
    // See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
    rdisplayswap = /^(none|table(?!-c[ea]).+)/;
  const cssShow = { position: 'absolute', visibility: 'hidden', display: 'block' };
  const cssNormalTransform = {
    letterSpacing: '0',
    fontWeight: '400',
  };

  function setPositiveNumber(_elem, value, subtract) {
    // Any relative (+/-) values have already been
    // normalized at this point
    const matches = rcssNum.exec(value);
    return matches

    // Guard against undefined "subtract", e.g., when used as in cssHooks
      ? Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || 'px')
      : value;
  }

  function boxModelAdjustment(elem, dimension, box, isBorderBox, styles, computedVal) {
    let i = dimension === 'width' ? 1 : 0;
    let extra = 0;
    let delta = 0;
    let marginDelta = 0;

    // Adjustment may not be necessary
    if (box === (isBorderBox ? 'border' : 'content')) {
      return 0;
    }

    for (; i < 4; i += 2) {
      // Both box models exclude margin
      // Count margin delta separately to only add it after scroll gutter adjustment.
      // This is needed to make negative margins work with `outerHeight( true )` (gh-3982).
      if (box === 'margin') {
        marginDelta += jQuery.css(elem, box + cssExpand[i], true, styles);
      }

      // If we get here with a content-box, we're seeking "padding" or "border" or "margin"
      if (!isBorderBox) {
        // Add padding
        delta += jQuery.css(elem, `padding${cssExpand[i]}`, true, styles);

        // For "border" or "margin", add border
        if (box !== 'padding') {
          delta += jQuery.css(elem, `border${cssExpand[i]}Width`, true, styles);

          // But still keep track of it otherwise
        } else {
          extra += jQuery.css(elem, `border${cssExpand[i]}Width`, true, styles);
        }

        // If we get here with a border-box (content + padding + border), we're seeking "content" or
        // "padding" or "margin"
      } else {
        // For "content", subtract padding
        if (box === 'content') {
          delta -= jQuery.css(elem, `padding${cssExpand[i]}`, true, styles);
        }

        // For "content" or "padding", subtract border
        if (box !== 'margin') {
          delta -= jQuery.css(elem, `border${cssExpand[i]}Width`, true, styles);
        }
      }
    }

    // Account for positive content-box scroll gutter when requested by providing computedVal
    if (!isBorderBox && computedVal >= 0) {
      // offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
      // Assuming integer scroll gutter, subtract the rest and round down
      delta += Math.max(0, Math.ceil(
        elem[`offset${dimension[0].toUpperCase()}${dimension.slice(1)}`]
			- computedVal
			- delta
			- extra
			- 0.5,

        // If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
        // Use an explicit zero to avoid NaN (gh-3964)
      )) || 0;
    }

    return delta + marginDelta;
  }

  function getWidthOrHeight(elem, dimension, extra) {
    // Start with computed style
    const styles = getStyles(elem);

    // To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
    // Fake content-box until we know it's needed to know the true value.
    const boxSizingNeeded = !support.boxSizingReliable() || extra;
    let isBorderBox = boxSizingNeeded
			&& jQuery.css(elem, 'boxSizing', false, styles) === 'border-box';
    let valueIsBorderBox = isBorderBox;

    let val = curCSS(elem, dimension, styles);
    const offsetProp = `offset${dimension[0].toUpperCase()}${dimension.slice(1)}`;

    // Support: Firefox <=54
    // Return a confounding non-pixel value or feign ignorance, as appropriate.
    if (rnumnonpx.test(val)) {
      if (!extra) {
        return val;
      }
      val = 'auto';
    }

    // Support: IE 9 - 11 only
    // Use offsetWidth/offsetHeight for when box sizing is unreliable.
    // In those cases, the computed value can be trusted to be border-box.
    if ((!support.boxSizingReliable() && isBorderBox

		// Support: IE 10 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Interestingly, in some cases IE 9 doesn't suffer from this issue.
		|| !support.reliableTrDimensions() && nodeName(elem, 'tr')

		// Fall back to offsetWidth/offsetHeight when value is "auto"
		// This happens for inline elements with no explicit setting (gh-3571)
		|| val === 'auto'

		// Support: Android <=4.1 - 4.3 only
		// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
		|| !parseFloat(val) && jQuery.css(elem, 'display', false, styles) === 'inline')

		// Make sure the element is visible & connected
		&& elem.getClientRects().length) {
      isBorderBox = jQuery.css(elem, 'boxSizing', false, styles) === 'border-box';

      // Where available, offsetWidth/offsetHeight approximate border box dimensions.
      // Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
      // retrieved value as a content box dimension.
      valueIsBorderBox = offsetProp in elem;
      if (valueIsBorderBox) {
        val = elem[offsetProp];
      }
    }

    // Normalize "" and auto
    val = parseFloat(val) || 0;

    // Adjust for the element's box model
    return `${val
		+ boxModelAdjustment(
		  elem,
		  dimension,
		  extra || (isBorderBox ? 'border' : 'content'),
		  valueIsBorderBox,
		  styles,

		  // Provide the current computed size to request scroll gutter calculation (gh-3589)
		  val,
		)
	  }px`;
  }

  jQuery.extend({

    // Add in style property hooks for overriding the default
    // behavior of getting and setting a style property
    cssHooks: {
      opacity: {
        get(elem, computed) {
          if (computed) {
            // We should always get a number back from opacity
            const ret = curCSS(elem, 'opacity');
            return ret === '' ? '1' : ret;
          }
        },
      },
    },

    // Don't automatically add "px" to these possibly-unitless properties
    cssNumber: {
      animationIterationCount: true,
      aspectRatio: true,
      borderImageSlice: true,
      columnCount: true,
      flexGrow: true,
      flexShrink: true,
      fontWeight: true,
      gridArea: true,
      gridColumn: true,
      gridColumnEnd: true,
      gridColumnStart: true,
      gridRow: true,
      gridRowEnd: true,
      gridRowStart: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      scale: true,
      widows: true,
      zIndex: true,
      zoom: true,

      // SVG-related
      fillOpacity: true,
      floodOpacity: true,
      stopOpacity: true,
      strokeMiterlimit: true,
      strokeOpacity: true,
    },

    // Add in properties whose names you wish to fix before
    // setting or getting the value
    cssProps: {},

    // Get and set the style property on a DOM Node
    style(elem, name, value, extra) {
      // Don't set styles on text and comment nodes
      if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
        return;
      }

      // Make sure that we're working with the right name
      let ret; let type; let hooks;
      const origName = camelCase(name);
      const isCustomProp = rcustomProp.test(name);
      const { style } = elem;

      // Make sure that we're working with the right name. We don't
      // want to query the value if it is a CSS custom property
      // since they are user-defined.
      if (!isCustomProp) {
        name = finalPropName(origName);
      }

      // Gets hook for the prefixed version, then unprefixed version
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

      // Check if we're setting a value
      if (value !== undefined) {
        type = typeof value;

        // Convert "+=" or "-=" to relative numbers (trac-7345)
        if (type === 'string' && (ret = rcssNum.exec(value)) && ret[1]) {
          value = adjustCSS(elem, name, ret);

          // Fixes bug trac-9237
          type = 'number';
        }

        // Make sure that null and NaN values aren't set (trac-7116)
        if (value == null || value !== value) {
          return;
        }

        // If a number was passed in, add the unit (except for certain CSS properties)
        // The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
        // "px" to a few hardcoded values.
        if (type === 'number' && !isCustomProp) {
          value += ret && ret[3] || (jQuery.cssNumber[origName] ? '' : 'px');
        }

        // background-* props affect original clone's values
        if (!support.clearCloneStyle && value === '' && name.indexOf('background') === 0) {
          style[name] = 'inherit';
        }

        // If a hook was provided, use that value, otherwise just set the specified value
        if (!hooks || !('set' in hooks)
				|| (value = hooks.set(elem, value, extra)) !== undefined) {
          if (isCustomProp) {
            style.setProperty(name, value);
          } else {
            style[name] = value;
          }
        }
      } else {
        // If a hook was provided get the non-computed value from there
        if (hooks && 'get' in hooks
				&& (ret = hooks.get(elem, false, extra)) !== undefined) {
          return ret;
        }

        // Otherwise just get the value from the style object
        return style[name];
      }
    },

    css(elem, name, extra, styles) {
      let val; let num; let hooks;
      const origName = camelCase(name);
      const isCustomProp = rcustomProp.test(name);

      // Make sure that we're working with the right name. We don't
      // want to modify the value if it is a CSS custom property
      // since they are user-defined.
      if (!isCustomProp) {
        name = finalPropName(origName);
      }

      // Try prefixed name followed by the unprefixed name
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

      // If a hook was provided get the computed value from there
      if (hooks && 'get' in hooks) {
        val = hooks.get(elem, true, extra);
      }

      // Otherwise, if a way to get the computed value exists, use that
      if (val === undefined) {
        val = curCSS(elem, name, styles);
      }

      // Convert "normal" to computed value
      if (val === 'normal' && name in cssNormalTransform) {
        val = cssNormalTransform[name];
      }

      // Make numeric if forced or a qualifier was provided and val looks numeric
      if (extra === '' || extra) {
        num = parseFloat(val);
        return extra === true || isFinite(num) ? num || 0 : val;
      }

      return val;
    },
  });

  jQuery.each(['height', 'width'], (_i, dimension) => {
    jQuery.cssHooks[dimension] = {
      get(elem, computed, extra) {
        if (computed) {
          // Certain elements can have dimension info if we invisibly show them
          // but it must have a current display style that would benefit
          return rdisplayswap.test(jQuery.css(elem, 'display'))

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					&& (!elem.getClientRects().length || !elem.getBoundingClientRect().width)
            ? swap(elem, cssShow, () => getWidthOrHeight(elem, dimension, extra))
            : getWidthOrHeight(elem, dimension, extra);
        }
      },

      set(elem, value, extra) {
        let matches;
        const styles = getStyles(elem);

        // Only read styles.position if the test has a chance to fail
        // to avoid forcing a reflow.
        const scrollboxSizeBuggy = !support.scrollboxSize()
					&& styles.position === 'absolute';

        // To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
        const boxSizingNeeded = scrollboxSizeBuggy || extra;
        const isBorderBox = boxSizingNeeded
					&& jQuery.css(elem, 'boxSizing', false, styles) === 'border-box';
        let subtract = extra
          ? boxModelAdjustment(
            elem,
            dimension,
            extra,
            isBorderBox,
            styles,
          )
          : 0;

        // Account for unreliable border-box dimensions by comparing offset* to computed and
        // faking a content-box to get border and padding (gh-3699)
        if (isBorderBox && scrollboxSizeBuggy) {
          subtract -= Math.ceil(
            elem[`offset${dimension[0].toUpperCase()}${dimension.slice(1)}`]
					- parseFloat(styles[dimension])
					- boxModelAdjustment(elem, dimension, 'border', false, styles)
					- 0.5,
          );
        }

        // Convert to pixels if value adjustment is needed
        if (subtract && (matches = rcssNum.exec(value))
				&& (matches[3] || 'px') !== 'px') {
          elem.style[dimension] = value;
          value = jQuery.css(elem, dimension);
        }

        return setPositiveNumber(elem, value, subtract);
      },
    };
  });

  jQuery.cssHooks.marginLeft = addGetHookIf(
    support.reliableMarginLeft,
    (elem, computed) => {
      if (computed) {
        return `${parseFloat(curCSS(elem, 'marginLeft'))
				|| elem.getBoundingClientRect().left
					- swap(elem, { marginLeft: 0 }, () => elem.getBoundingClientRect().left)
			  }px`;
      }
    },
  );

  // These hooks are used by animate to expand properties
  jQuery.each({
    margin: '',
    padding: '',
    border: 'Width',
  }, (prefix, suffix) => {
    jQuery.cssHooks[prefix + suffix] = {
      expand(value) {
        let i = 0;
        const expanded = {};

        // Assumes a single number if not a string
        const parts = typeof value === 'string' ? value.split(' ') : [value];

        for (; i < 4; i++) {
          expanded[prefix + cssExpand[i] + suffix] =					parts[i] || parts[i - 2] || parts[0];
        }

        return expanded;
      },
    };

    if (prefix !== 'margin') {
      jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
    }
  });

  jQuery.fn.extend({
    css(name, value) {
      return access(this, (elem, name, value) => {
        let styles; let len;
        const map = {};
        let i = 0;

        if (Array.isArray(name)) {
          styles = getStyles(elem);
          len = name.length;

          for (; i < len; i++) {
            map[name[i]] = jQuery.css(elem, name[i], false, styles);
          }

          return map;
        }

        return value !== undefined
          ? jQuery.style(elem, name, value)
          : jQuery.css(elem, name);
      }, name, value, arguments.length > 1);
    },
  });

  function Tween(elem, options, prop, end, easing) {
    return new Tween.prototype.init(elem, options, prop, end, easing);
  }
  jQuery.Tween = Tween;

  Tween.prototype = {
    constructor: Tween,
    init(elem, options, prop, end, easing, unit) {
      this.elem = elem;
      this.prop = prop;
      this.easing = easing || jQuery.easing._default;
      this.options = options;
      this.start = this.now = this.cur();
      this.end = end;
      this.unit = unit || (jQuery.cssNumber[prop] ? '' : 'px');
    },
    cur() {
      const hooks = Tween.propHooks[this.prop];

      return hooks && hooks.get
        ? hooks.get(this)
        : Tween.propHooks._default.get(this);
    },
    run(percent) {
      let eased;
      const hooks = Tween.propHooks[this.prop];

      if (this.options.duration) {
        this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
      } else {
        this.pos = eased = percent;
      }
      this.now = (this.end - this.start) * eased + this.start;

      if (this.options.step) {
        this.options.step.call(this.elem, this.now, this);
      }

      if (hooks && hooks.set) {
        hooks.set(this);
      } else {
        Tween.propHooks._default.set(this);
      }
      return this;
    },
  };

  Tween.prototype.init.prototype = Tween.prototype;

  Tween.propHooks = {
    _default: {
      get(tween) {
        let result;

        // Use a property on the element directly when it is not a DOM element,
        // or when there is no matching style property that exists.
        if (tween.elem.nodeType !== 1
				|| tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
          return tween.elem[tween.prop];
        }

        // Passing an empty string as a 3rd parameter to .css will automatically
        // attempt a parseFloat and fallback to a string if the parse fails.
        // Simple values such as "10px" are parsed to Float;
        // complex values such as "rotate(1rad)" are returned as-is.
        result = jQuery.css(tween.elem, tween.prop, '');

        // Empty strings, null, undefined and "auto" are converted to 0.
        return !result || result === 'auto' ? 0 : result;
      },
      set(tween) {
        // Use step hook for back compat.
        // Use cssHook if its there.
        // Use .style if available and use plain properties where available.
        if (jQuery.fx.step[tween.prop]) {
          jQuery.fx.step[tween.prop](tween);
        } else if (tween.elem.nodeType === 1 && (
          jQuery.cssHooks[tween.prop]
					|| tween.elem.style[finalPropName(tween.prop)] != null)) {
          jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
        } else {
          tween.elem[tween.prop] = tween.now;
        }
      },
    },
  };

  // Support: IE <=9 only
  // Panic based approach to setting things on disconnected nodes
  Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
    set(tween) {
      if (tween.elem.nodeType && tween.elem.parentNode) {
        tween.elem[tween.prop] = tween.now;
      }
    },
  };

  jQuery.easing = {
    linear(p) {
      return p;
    },
    swing(p) {
      return 0.5 - Math.cos(p * Math.PI) / 2;
    },
    _default: 'swing',
  };

  jQuery.fx = Tween.prototype.init;

  // Back compat <1.8 extension point
  jQuery.fx.step = {};

  let
    fxNow; let inProgress;
  const rfxtypes = /^(?:toggle|show|hide)$/;
  const rrun = /queueHooks$/;

  function schedule() {
    if (inProgress) {
      if (document.hidden === false && window.requestAnimationFrame) {
        window.requestAnimationFrame(schedule);
      } else {
        window.setTimeout(schedule, jQuery.fx.interval);
      }

      jQuery.fx.tick();
    }
  }

  // Animations created synchronously will run synchronously
  function createFxNow() {
    window.setTimeout(() => {
      fxNow = undefined;
    });
    return (fxNow = Date.now());
  }

  // Generate parameters to create a standard animation
  function genFx(type, includeWidth) {
    let which;
    let i = 0;
    const attrs = { height: type };

    // If we include width, step value is 1 to do all cssExpand values,
    // otherwise step value is 2 to skip over Left and Right
    includeWidth = includeWidth ? 1 : 0;
    for (; i < 4; i += 2 - includeWidth) {
      which = cssExpand[i];
      attrs[`margin${which}`] = attrs[`padding${which}`] = type;
    }

    if (includeWidth) {
      attrs.opacity = attrs.width = type;
    }

    return attrs;
  }

  function createTween(value, prop, animation) {
    let tween;
    const collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners['*']);
    let index = 0;
    const { length } = collection;
    for (; index < length; index++) {
      if ((tween = collection[index].call(animation, prop, value))) {
        // We're done with this property
        return tween;
      }
    }
  }

  function defaultPrefilter(elem, props, opts) {
    let prop; let value; let toggle; let hooks; let oldfire; let propTween; let restoreDisplay; let display;
    const isBox = 'width' in props || 'height' in props;
    const anim = this;
    const orig = {};
    const { style } = elem;
    let hidden = elem.nodeType && isHiddenWithinTree(elem);
    let dataShow = dataPriv.get(elem, 'fxshow');

    // Queue-skipping animations hijack the fx hooks
    if (!opts.queue) {
      hooks = jQuery._queueHooks(elem, 'fx');
      if (hooks.unqueued == null) {
        hooks.unqueued = 0;
        oldfire = hooks.empty.fire;
        hooks.empty.fire = function () {
          if (!hooks.unqueued) {
            oldfire();
          }
        };
      }
      hooks.unqueued++;

      anim.always(() => {
        // Ensure the complete handler is called before this completes
        anim.always(() => {
          hooks.unqueued--;
          if (!jQuery.queue(elem, 'fx').length) {
            hooks.empty.fire();
          }
        });
      });
    }

    // Detect show/hide animations
    for (prop in props) {
      value = props[prop];
      if (rfxtypes.test(value)) {
        delete props[prop];
        toggle = toggle || value === 'toggle';
        if (value === (hidden ? 'hide' : 'show')) {
          // Pretend to be hidden if this is a "show" and
          // there is still data from a stopped show/hide
          if (value === 'show' && dataShow && dataShow[prop] !== undefined) {
            hidden = true;

            // Ignore all other no-op show/hide data
          } else {
            continue;
          }
        }
        orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
      }
    }

    // Bail out if this is a no-op like .hide().hide()
    propTween = !jQuery.isEmptyObject(props);
    if (!propTween && jQuery.isEmptyObject(orig)) {
      return;
    }

    // Restrict "overflow" and "display" styles during box animations
    if (isBox && elem.nodeType === 1) {
      // Support: IE <=9 - 11, Edge 12 - 15
      // Record all 3 overflow attributes because IE does not infer the shorthand
      // from identically-valued overflowX and overflowY and Edge just mirrors
      // the overflowX value there.
      opts.overflow = [style.overflow, style.overflowX, style.overflowY];

      // Identify a display type, preferring old show/hide data over the CSS cascade
      restoreDisplay = dataShow && dataShow.display;
      if (restoreDisplay == null) {
        restoreDisplay = dataPriv.get(elem, 'display');
      }
      display = jQuery.css(elem, 'display');
      if (display === 'none') {
        if (restoreDisplay) {
          display = restoreDisplay;
        } else {
          // Get nonempty value(s) by temporarily forcing visibility
          showHide([elem], true);
          restoreDisplay = elem.style.display || restoreDisplay;
          display = jQuery.css(elem, 'display');
          showHide([elem]);
        }
      }

      // Animate inline elements as inline-block
      if (display === 'inline' || display === 'inline-block' && restoreDisplay != null) {
        if (jQuery.css(elem, 'float') === 'none') {
          // Restore the original display value at the end of pure show/hide animations
          if (!propTween) {
            anim.done(() => {
              style.display = restoreDisplay;
            });
            if (restoreDisplay == null) {
              display = style.display;
              restoreDisplay = display === 'none' ? '' : display;
            }
          }
          style.display = 'inline-block';
        }
      }
    }

    if (opts.overflow) {
      style.overflow = 'hidden';
      anim.always(() => {
        style.overflow = opts.overflow[0];
        style.overflowX = opts.overflow[1];
        style.overflowY = opts.overflow[2];
      });
    }

    // Implement show/hide animations
    propTween = false;
    for (prop in orig) {
      // General show/hide setup for this element animation
      if (!propTween) {
        if (dataShow) {
          if ('hidden' in dataShow) {
            hidden = dataShow.hidden;
          }
        } else {
          dataShow = dataPriv.access(elem, 'fxshow', { display: restoreDisplay });
        }

        // Store hidden/visible for toggle so `.stop().toggle()` "reverses"
        if (toggle) {
          dataShow.hidden = !hidden;
        }

        // Show elements before animating them
        if (hidden) {
          showHide([elem], true);
        }

        /* eslint-disable no-loop-func */

        anim.done(() => {
          /* eslint-enable no-loop-func */

          // The final step of a "hide" animation is actually hiding the element
          if (!hidden) {
            showHide([elem]);
          }
          dataPriv.remove(elem, 'fxshow');
          for (prop in orig) {
            jQuery.style(elem, prop, orig[prop]);
          }
        });
      }

      // Per-property setup
      propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
      if (!(prop in dataShow)) {
        dataShow[prop] = propTween.start;
        if (hidden) {
          propTween.end = propTween.start;
          propTween.start = 0;
        }
      }
    }
  }

  function propFilter(props, specialEasing) {
    let index; let name; let easing; let value; let
      hooks;

    // camelCase, specialEasing and expand cssHook pass
    for (index in props) {
      name = camelCase(index);
      easing = specialEasing[name];
      value = props[index];
      if (Array.isArray(value)) {
        easing = value[1];
        value = props[index] = value[0];
      }

      if (index !== name) {
        props[name] = value;
        delete props[index];
      }

      hooks = jQuery.cssHooks[name];
      if (hooks && 'expand' in hooks) {
        value = hooks.expand(value);
        delete props[name];

        // Not quite $.extend, this won't overwrite existing keys.
        // Reusing 'index' because we have the correct "name"
        for (index in value) {
          if (!(index in props)) {
            props[index] = value[index];
            specialEasing[index] = easing;
          }
        }
      } else {
        specialEasing[name] = easing;
      }
    }
  }

  function Animation(elem, properties, options) {
    let result;
    let stopped;
    let index = 0;
    const { length } = Animation.prefilters;
    const deferred = jQuery.Deferred().always(() => {
      // Don't match elem in the :animated selector
      delete tick.elem;
    });
    var tick = function () {
      if (stopped) {
        return false;
      }
      const currentTime = fxNow || createFxNow();
      const remaining = Math.max(0, animation.startTime + animation.duration - currentTime);

      // Support: Android 2.3 only
      // Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (trac-12497)
      const temp = remaining / animation.duration || 0;
      const percent = 1 - temp;
      let index = 0;
      const { length } = animation.tweens;

      for (; index < length; index++) {
        animation.tweens[index].run(percent);
      }

      deferred.notifyWith(elem, [animation, percent, remaining]);

      // If there's more to do, yield
      if (percent < 1 && length) {
        return remaining;
      }

      // If this was an empty animation, synthesize a final progress notification
      if (!length) {
        deferred.notifyWith(elem, [animation, 1, 0]);
      }

      // Resolve the animation and report its conclusion
      deferred.resolveWith(elem, [animation]);
      return false;
    };
    var animation = deferred.promise({
      elem,
      props: jQuery.extend({}, properties),
      opts: jQuery.extend(true, {
        specialEasing: {},
        easing: jQuery.easing._default,
      }, options),
      originalProperties: properties,
      originalOptions: options,
      startTime: fxNow || createFxNow(),
      duration: options.duration,
      tweens: [],
      createTween(prop, end) {
        const tween = jQuery.Tween(
          elem,
          animation.opts,
          prop,
          end,
          animation.opts.specialEasing[prop] || animation.opts.easing,
        );
        animation.tweens.push(tween);
        return tween;
      },
      stop(gotoEnd) {
        let index = 0;

        // If we are going to the end, we want to run all the tweens
        // otherwise we skip this part
        const length = gotoEnd ? animation.tweens.length : 0;
        if (stopped) {
          return this;
        }
        stopped = true;
        for (; index < length; index++) {
          animation.tweens[index].run(1);
        }

        // Resolve when we played the last frame; otherwise, reject
        if (gotoEnd) {
          deferred.notifyWith(elem, [animation, 1, 0]);
          deferred.resolveWith(elem, [animation, gotoEnd]);
        } else {
          deferred.rejectWith(elem, [animation, gotoEnd]);
        }
        return this;
      },
    });
    const { props } = animation;

    propFilter(props, animation.opts.specialEasing);

    for (; index < length; index++) {
      result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
      if (result) {
        if (isFunction(result.stop)) {
          jQuery._queueHooks(animation.elem, animation.opts.queue).stop =					result.stop.bind(result);
        }
        return result;
      }
    }

    jQuery.map(props, createTween, animation);

    if (isFunction(animation.opts.start)) {
      animation.opts.start.call(elem, animation);
    }

    // Attach callbacks from options
    animation
      .progress(animation.opts.progress)
      .done(animation.opts.done, animation.opts.complete)
      .fail(animation.opts.fail)
      .always(animation.opts.always);

    jQuery.fx.timer(
      jQuery.extend(tick, {
        elem,
        anim: animation,
        queue: animation.opts.queue,
      }),
    );

    return animation;
  }

  jQuery.Animation = jQuery.extend(Animation, {

    tweeners: {
      '*': [function (prop, value) {
        const tween = this.createTween(prop, value);
        adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
        return tween;
      }],
    },

    tweener(props, callback) {
      if (isFunction(props)) {
        callback = props;
        props = ['*'];
      } else {
        props = props.match(rnothtmlwhite);
      }

      let prop;
      let index = 0;
      const { length } = props;

      for (; index < length; index++) {
        prop = props[index];
        Animation.tweeners[prop] = Animation.tweeners[prop] || [];
        Animation.tweeners[prop].unshift(callback);
      }
    },

    prefilters: [defaultPrefilter],

    prefilter(callback, prepend) {
      if (prepend) {
        Animation.prefilters.unshift(callback);
      } else {
        Animation.prefilters.push(callback);
      }
    },
  });

  jQuery.speed = function (speed, easing, fn) {
    const opt = speed && typeof speed === 'object' ? jQuery.extend({}, speed) : {
      complete: fn || !fn && easing
			|| isFunction(speed) && speed,
      duration: speed,
      easing: fn && easing || easing && !isFunction(easing) && easing,
    };

    // Go to the end state if fx are off
    if (jQuery.fx.off) {
      opt.duration = 0;
    } else if (typeof opt.duration !== 'number') {
      if (opt.duration in jQuery.fx.speeds) {
        opt.duration = jQuery.fx.speeds[opt.duration];
      } else {
        opt.duration = jQuery.fx.speeds._default;
      }
    }

    // Normalize opt.queue - true/undefined/null -> "fx"
    if (opt.queue == null || opt.queue === true) {
      opt.queue = 'fx';
    }

    // Queueing
    opt.old = opt.complete;

    opt.complete = function () {
      if (isFunction(opt.old)) {
        opt.old.call(this);
      }

      if (opt.queue) {
        jQuery.dequeue(this, opt.queue);
      }
    };

    return opt;
  };

  jQuery.fn.extend({
    fadeTo(speed, to, easing, callback) {
      // Show any hidden elements after setting opacity to 0
      return this.filter(isHiddenWithinTree).css('opacity', 0).show()

      // Animate to the value specified
        .end()
        .animate({ opacity: to }, speed, easing, callback);
    },
    animate(prop, speed, easing, callback) {
      const empty = jQuery.isEmptyObject(prop);
      const optall = jQuery.speed(speed, easing, callback);
      const doAnimation = function () {
        // Operate on a copy of prop so per-property easing won't be lost
        const anim = Animation(this, jQuery.extend({}, prop), optall);

        // Empty animations, or finishing resolves immediately
        if (empty || dataPriv.get(this, 'finish')) {
          anim.stop(true);
        }
      };

      doAnimation.finish = doAnimation;

      return empty || optall.queue === false
        ? this.each(doAnimation)
        : this.queue(optall.queue, doAnimation);
    },
    stop(type, clearQueue, gotoEnd) {
      const stopQueue = function (hooks) {
        const { stop } = hooks;
        delete hooks.stop;
        stop(gotoEnd);
      };

      if (typeof type !== 'string') {
        gotoEnd = clearQueue;
        clearQueue = type;
        type = undefined;
      }
      if (clearQueue) {
        this.queue(type || 'fx', []);
      }

      return this.each(function () {
        let dequeue = true;
        let index = type != null && `${type}queueHooks`;
        const { timers } = jQuery;
        const data = dataPriv.get(this);

        if (index) {
          if (data[index] && data[index].stop) {
            stopQueue(data[index]);
          }
        } else {
          for (index in data) {
            if (data[index] && data[index].stop && rrun.test(index)) {
              stopQueue(data[index]);
            }
          }
        }

        for (index = timers.length; index--;) {
          if (timers[index].elem === this
					&& (type == null || timers[index].queue === type)) {
            timers[index].anim.stop(gotoEnd);
            dequeue = false;
            timers.splice(index, 1);
          }
        }

        // Start the next in the queue if the last step wasn't forced.
        // Timers currently will call their complete callbacks, which
        // will dequeue but only if they were gotoEnd.
        if (dequeue || !gotoEnd) {
          jQuery.dequeue(this, type);
        }
      });
    },
    finish(type) {
      if (type !== false) {
        type = type || 'fx';
      }
      return this.each(function () {
        let index;
        const data = dataPriv.get(this);
        const queue = data[`${type}queue`];
        const hooks = data[`${type}queueHooks`];
        const { timers } = jQuery;
        const length = queue ? queue.length : 0;

        // Enable finishing flag on private data
        data.finish = true;

        // Empty the queue first
        jQuery.queue(this, type, []);

        if (hooks && hooks.stop) {
          hooks.stop.call(this, true);
        }

        // Look for any active animations, and finish them
        for (index = timers.length; index--;) {
          if (timers[index].elem === this && timers[index].queue === type) {
            timers[index].anim.stop(true);
            timers.splice(index, 1);
          }
        }

        // Look for any animations in the old queue and finish them
        for (index = 0; index < length; index++) {
          if (queue[index] && queue[index].finish) {
            queue[index].finish.call(this);
          }
        }

        // Turn off finishing flag
        delete data.finish;
      });
    },
  });

  jQuery.each(['toggle', 'show', 'hide'], (_i, name) => {
    const cssFn = jQuery.fn[name];
    jQuery.fn[name] = function (speed, easing, callback) {
      return speed == null || typeof speed === 'boolean'
        ? cssFn.apply(this, arguments)
        : this.animate(genFx(name, true), speed, easing, callback);
    };
  });

  // Generate shortcuts for custom animations
  jQuery.each({
    slideDown: genFx('show'),
    slideUp: genFx('hide'),
    slideToggle: genFx('toggle'),
    fadeIn: { opacity: 'show' },
    fadeOut: { opacity: 'hide' },
    fadeToggle: { opacity: 'toggle' },
  }, (name, props) => {
    jQuery.fn[name] = function (speed, easing, callback) {
      return this.animate(props, speed, easing, callback);
    };
  });

  jQuery.timers = [];
  jQuery.fx.tick = function () {
    let timer;
    let i = 0;
    const { timers } = jQuery;

    fxNow = Date.now();

    for (; i < timers.length; i++) {
      timer = timers[i];

      // Run the timer and safely remove it when done (allowing for external removal)
      if (!timer() && timers[i] === timer) {
        timers.splice(i--, 1);
      }
    }

    if (!timers.length) {
      jQuery.fx.stop();
    }
    fxNow = undefined;
  };

  jQuery.fx.timer = function (timer) {
    jQuery.timers.push(timer);
    jQuery.fx.start();
  };

  jQuery.fx.interval = 13;
  jQuery.fx.start = function () {
    if (inProgress) {
      return;
    }

    inProgress = true;
    schedule();
  };

  jQuery.fx.stop = function () {
    inProgress = null;
  };

  jQuery.fx.speeds = {
    slow: 600,
    fast: 200,

    // Default speed
    _default: 400,
  };

  // Based off of the plugin by Clint Helfers, with permission.
  jQuery.fn.delay = function (time, type) {
    time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
    type = type || 'fx';

    return this.queue(type, (next, hooks) => {
      const timeout = window.setTimeout(next, time);
      hooks.stop = function () {
        window.clearTimeout(timeout);
      };
    });
  };

  (function () {
    let input = document.createElement('input');
    const select = document.createElement('select');
    const opt = select.appendChild(document.createElement('option'));

    input.type = 'checkbox';

    // Support: Android <=4.3 only
    // Default value for a checkbox should be "on"
    support.checkOn = input.value !== '';

    // Support: IE <=11 only
    // Must access selectedIndex to make default options select
    support.optSelected = opt.selected;

    // Support: IE <=11 only
    // An input loses its value after becoming a radio
    input = document.createElement('input');
    input.value = 't';
    input.type = 'radio';
    support.radioValue = input.value === 't';
  }());

  let boolHook;
  const { attrHandle } = jQuery.expr;

  jQuery.fn.extend({
    attr(name, value) {
      return access(this, jQuery.attr, name, value, arguments.length > 1);
    },

    removeAttr(name) {
      return this.each(function () {
        jQuery.removeAttr(this, name);
      });
    },
  });

  jQuery.extend({
    attr(elem, name, value) {
      let ret; let hooks;
      const nType = elem.nodeType;

      // Don't get/set attributes on text, comment and attribute nodes
      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      }

      // Fallback to prop when attributes are not supported
      if (typeof elem.getAttribute === 'undefined') {
        return jQuery.prop(elem, name, value);
      }

      // Attribute hooks are determined by the lowercase version
      // Grab necessary hook if one is defined
      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        hooks = jQuery.attrHooks[name.toLowerCase()]
				|| (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
      }

      if (value !== undefined) {
        if (value === null) {
          jQuery.removeAttr(elem, name);
          return;
        }

        if (hooks && 'set' in hooks
				&& (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        }

        elem.setAttribute(name, `${value}`);
        return value;
      }

      if (hooks && 'get' in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      }

      ret = jQuery.find.attr(elem, name);

      // Non-existent attributes return null, we normalize to undefined
      return ret == null ? undefined : ret;
    },

    attrHooks: {
      type: {
        set(elem, value) {
          if (!support.radioValue && value === 'radio'
					&& nodeName(elem, 'input')) {
            const val = elem.value;
            elem.setAttribute('type', value);
            if (val) {
              elem.value = val;
            }
            return value;
          }
        },
      },
    },

    removeAttr(elem, value) {
      let name;
      let i = 0;

      // Attribute names can contain non-HTML whitespace characters
      // https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
      const attrNames = value && value.match(rnothtmlwhite);

      if (attrNames && elem.nodeType === 1) {
        while ((name = attrNames[i++])) {
          elem.removeAttribute(name);
        }
      }
    },
  });

  // Hooks for boolean attributes
  boolHook = {
    set(elem, value, name) {
      if (value === false) {
        // Remove boolean attributes when set to false
        jQuery.removeAttr(elem, name);
      } else {
        elem.setAttribute(name, name);
      }
      return name;
    },
  };

  jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), (_i, name) => {
    const getter = attrHandle[name] || jQuery.find.attr;

    attrHandle[name] = function (elem, name, isXML) {
      let ret; let handle;
      const lowercaseName = name.toLowerCase();

      if (!isXML) {
        // Avoid an infinite loop by temporarily removing this function from the getter
        handle = attrHandle[lowercaseName];
        attrHandle[lowercaseName] = ret;
        ret = getter(elem, name, isXML) != null
          ? lowercaseName
          : null;
        attrHandle[lowercaseName] = handle;
      }
      return ret;
    };
  });

  const rfocusable = /^(?:input|select|textarea|button)$/i;
  const rclickable = /^(?:a|area)$/i;

  jQuery.fn.extend({
    prop(name, value) {
      return access(this, jQuery.prop, name, value, arguments.length > 1);
    },

    removeProp(name) {
      return this.each(function () {
        delete this[jQuery.propFix[name] || name];
      });
    },
  });

  jQuery.extend({
    prop(elem, name, value) {
      let ret; let hooks;
      const nType = elem.nodeType;

      // Don't get/set properties on text, comment and attribute nodes
      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      }

      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        // Fix name and attach hooks
        name = jQuery.propFix[name] || name;
        hooks = jQuery.propHooks[name];
      }

      if (value !== undefined) {
        if (hooks && 'set' in hooks
				&& (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        }

        return (elem[name] = value);
      }

      if (hooks && 'get' in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      }

      return elem[name];
    },

    propHooks: {
      tabIndex: {
        get(elem) {
          // Support: IE <=9 - 11 only
          // elem.tabIndex doesn't always return the
          // correct value when it hasn't been explicitly set
          // Use proper attribute retrieval (trac-12072)
          const tabindex = jQuery.find.attr(elem, 'tabindex');

          if (tabindex) {
            return parseInt(tabindex, 10);
          }

          if (
            rfocusable.test(elem.nodeName)
					|| rclickable.test(elem.nodeName)
					&& elem.href
          ) {
            return 0;
          }

          return -1;
        },
      },
    },

    propFix: {
      for: 'htmlFor',
      class: 'className',
    },
  });

  // Support: IE <=11 only
  // Accessing the selectedIndex property
  // forces the browser to respect setting selected
  // on the option
  // The getter ensures a default option is selected
  // when in an optgroup
  // eslint rule "no-unused-expressions" is disabled for this code
  // since it considers such accessions noop
  if (!support.optSelected) {
    jQuery.propHooks.selected = {
      get(elem) {
        /* eslint no-unused-expressions: "off" */

        const parent = elem.parentNode;
        if (parent && parent.parentNode) {
          parent.parentNode.selectedIndex;
        }
        return null;
      },
      set(elem) {
        /* eslint no-unused-expressions: "off" */

        const parent = elem.parentNode;
        if (parent) {
          parent.selectedIndex;

          if (parent.parentNode) {
            parent.parentNode.selectedIndex;
          }
        }
      },
    };
  }

  jQuery.each([
    'tabIndex',
    'readOnly',
    'maxLength',
    'cellSpacing',
    'cellPadding',
    'rowSpan',
    'colSpan',
    'useMap',
    'frameBorder',
    'contentEditable',
  ], function () {
    jQuery.propFix[this.toLowerCase()] = this;
  });

  // Strip and collapse whitespace according to HTML spec
  // https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
  function stripAndCollapse(value) {
    const tokens = value.match(rnothtmlwhite) || [];
    return tokens.join(' ');
  }

  function getClass(elem) {
    return elem.getAttribute && elem.getAttribute('class') || '';
  }

  function classesToArray(value) {
    if (Array.isArray(value)) {
      return value;
    }
    if (typeof value === 'string') {
      return value.match(rnothtmlwhite) || [];
    }
    return [];
  }

  jQuery.fn.extend({
    addClass(value) {
      let classNames; let cur; let curValue; let className; let i; let
        finalValue;

      if (isFunction(value)) {
        return this.each(function (j) {
          jQuery(this).addClass(value.call(this, j, getClass(this)));
        });
      }

      classNames = classesToArray(value);

      if (classNames.length) {
        return this.each(function () {
          curValue = getClass(this);
          cur = this.nodeType === 1 && (` ${stripAndCollapse(curValue)} `);

          if (cur) {
            for (i = 0; i < classNames.length; i++) {
              className = classNames[i];
              if (cur.indexOf(` ${className} `) < 0) {
                cur += `${className} `;
              }
            }

            // Only assign if different to avoid unneeded rendering.
            finalValue = stripAndCollapse(cur);
            if (curValue !== finalValue) {
              this.setAttribute('class', finalValue);
            }
          }
        });
      }

      return this;
    },

    removeClass(value) {
      let classNames; let cur; let curValue; let className; let i; let
        finalValue;

      if (isFunction(value)) {
        return this.each(function (j) {
          jQuery(this).removeClass(value.call(this, j, getClass(this)));
        });
      }

      if (!arguments.length) {
        return this.attr('class', '');
      }

      classNames = classesToArray(value);

      if (classNames.length) {
        return this.each(function () {
          curValue = getClass(this);

          // This expression is here for better compressibility (see addClass)
          cur = this.nodeType === 1 && (` ${stripAndCollapse(curValue)} `);

          if (cur) {
            for (i = 0; i < classNames.length; i++) {
              className = classNames[i];

              // Remove *all* instances
              while (cur.indexOf(` ${className} `) > -1) {
                cur = cur.replace(` ${className} `, ' ');
              }
            }

            // Only assign if different to avoid unneeded rendering.
            finalValue = stripAndCollapse(cur);
            if (curValue !== finalValue) {
              this.setAttribute('class', finalValue);
            }
          }
        });
      }

      return this;
    },

    toggleClass(value, stateVal) {
      let classNames; let className; let i; let self;
      const type = typeof value;
      const isValidValue = type === 'string' || Array.isArray(value);

      if (isFunction(value)) {
        return this.each(function (i) {
          jQuery(this).toggleClass(
            value.call(this, i, getClass(this), stateVal),
            stateVal,
          );
        });
      }

      if (typeof stateVal === 'boolean' && isValidValue) {
        return stateVal ? this.addClass(value) : this.removeClass(value);
      }

      classNames = classesToArray(value);

      return this.each(function () {
        if (isValidValue) {
          // Toggle individual class names
          self = jQuery(this);

          for (i = 0; i < classNames.length; i++) {
            className = classNames[i];

            // Check each className given, space separated list
            if (self.hasClass(className)) {
              self.removeClass(className);
            } else {
              self.addClass(className);
            }
          }

          // Toggle whole class name
        } else if (value === undefined || type === 'boolean') {
          className = getClass(this);
          if (className) {
            // Store className if set
            dataPriv.set(this, '__className__', className);
          }

          // If the element has a class name or if we're passed `false`,
          // then remove the whole classname (if there was one, the above saved it).
          // Otherwise bring back whatever was previously saved (if anything),
          // falling back to the empty string if nothing was stored.
          if (this.setAttribute) {
            this.setAttribute(
              'class',
              className || value === false
                ? ''
                : dataPriv.get(this, '__className__') || '',
            );
          }
        }
      });
    },

    hasClass(selector) {
      let className; let elem;
      let i = 0;

      className = ` ${selector} `;
      while ((elem = this[i++])) {
        if (elem.nodeType === 1
				&& (` ${stripAndCollapse(getClass(elem))} `).indexOf(className) > -1) {
          return true;
        }
      }

      return false;
    },
  });

  const rreturn = /\r/g;

  jQuery.fn.extend({
    val(value) {
      let hooks; let ret; let valueIsFunction;
      const elem = this[0];

      if (!arguments.length) {
        if (elem) {
          hooks = jQuery.valHooks[elem.type]
					|| jQuery.valHooks[elem.nodeName.toLowerCase()];

          if (hooks
					&& 'get' in hooks
					&& (ret = hooks.get(elem, 'value')) !== undefined
          ) {
            return ret;
          }

          ret = elem.value;

          // Handle most common string cases
          if (typeof ret === 'string') {
            return ret.replace(rreturn, '');
          }

          // Handle cases where value is null/undef or number
          return ret == null ? '' : ret;
        }

        return;
      }

      valueIsFunction = isFunction(value);

      return this.each(function (i) {
        let val;

        if (this.nodeType !== 1) {
          return;
        }

        if (valueIsFunction) {
          val = value.call(this, i, jQuery(this).val());
        } else {
          val = value;
        }

        // Treat null/undefined as ""; convert numbers to string
        if (val == null) {
          val = '';
        } else if (typeof val === 'number') {
          val += '';
        } else if (Array.isArray(val)) {
          val = jQuery.map(val, (value) => (value == null ? '' : `${value}`));
        }

        hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

        // If set returns undefined, fall back to normal setting
        if (!hooks || !('set' in hooks) || hooks.set(this, val, 'value') === undefined) {
          this.value = val;
        }
      });
    },
  });

  jQuery.extend({
    valHooks: {
      option: {
        get(elem) {
          const val = jQuery.find.attr(elem, 'value');
          return val != null
            ? val

          // Support: IE <=10 - 11 only
          // option.text throws exceptions (trac-14686, trac-14858)
          // Strip and collapse whitespace
          // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
            : stripAndCollapse(jQuery.text(elem));
        },
      },
      select: {
        get(elem) {
          let value; let option; let i;
          const { options } = elem;
          const index = elem.selectedIndex;
          const one = elem.type === 'select-one';
          const values = one ? null : [];
          const max = one ? index + 1 : options.length;

          if (index < 0) {
            i = max;
          } else {
            i = one ? index : 0;
          }

          // Loop through all the selected options
          for (; i < max; i++) {
            option = options[i];

            // Support: IE <=9 only
            // IE8-9 doesn't update selected after form reset (trac-2551)
            if ((option.selected || i === index)

							// Don't return options that are disabled or in a disabled optgroup
							&& !option.disabled
							&& (!option.parentNode.disabled
								|| !nodeName(option.parentNode, 'optgroup'))) {
              // Get the specific value for the option
              value = jQuery(option).val();

              // We don't need an array for one selects
              if (one) {
                return value;
              }

              // Multi-Selects return an array
              values.push(value);
            }
          }

          return values;
        },

        set(elem, value) {
          let optionSet; let option;
          const { options } = elem;
          const values = jQuery.makeArray(value);
          let i = options.length;

          while (i--) {
            option = options[i];

            /* eslint-disable no-cond-assign */

            if (option.selected =						jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1
            ) {
              optionSet = true;
            }

            /* eslint-enable no-cond-assign */
          }

          // Force browsers to behave consistently when non-matching value is set
          if (!optionSet) {
            elem.selectedIndex = -1;
          }
          return values;
        },
      },
    },
  });

  // Radios and checkboxes getter/setter
  jQuery.each(['radio', 'checkbox'], function () {
    jQuery.valHooks[this] = {
      set(elem, value) {
        if (Array.isArray(value)) {
          return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1);
        }
      },
    };
    if (!support.checkOn) {
      jQuery.valHooks[this].get = function (elem) {
        return elem.getAttribute('value') === null ? 'on' : elem.value;
      };
    }
  });

  // Return jQuery for attributes-only inclusion
  const { location } = window;

  const nonce = { guid: Date.now() };

  const rquery = (/\?/);

  // Cross-browser xml parsing
  jQuery.parseXML = function (data) {
    let xml; let
      parserErrorElem;
    if (!data || typeof data !== 'string') {
      return null;
    }

    // Support: IE 9 - 11 only
    // IE throws on parseFromString with invalid input.
    try {
      xml = (new window.DOMParser()).parseFromString(data, 'text/xml');
    } catch (e) {}

    parserErrorElem = xml && xml.getElementsByTagName('parsererror')[0];
    if (!xml || parserErrorElem) {
      jQuery.error(`Invalid XML: ${
        parserErrorElem
          ? jQuery.map(parserErrorElem.childNodes, (el) => el.textContent).join('\n')
          : data}`);
    }
    return xml;
  };

  const rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
  const stopPropagationCallback = function (e) {
    e.stopPropagation();
  };

  jQuery.extend(jQuery.event, {

    trigger(event, data, elem, onlyHandlers) {
      let i; let cur; let tmp; let bubbleType; let ontype; let handle; let special; let lastElement;
      const eventPath = [elem || document];
      let type = hasOwn.call(event, 'type') ? event.type : event;
      let namespaces = hasOwn.call(event, 'namespace') ? event.namespace.split('.') : [];

      cur = lastElement = tmp = elem = elem || document;

      // Don't do events on text and comment nodes
      if (elem.nodeType === 3 || elem.nodeType === 8) {
        return;
      }

      // focus/blur morphs to focusin/out; ensure we're not firing them right now
      if (rfocusMorph.test(type + jQuery.event.triggered)) {
        return;
      }

      if (type.indexOf('.') > -1) {
        // Namespaced trigger; create a regexp to match event type in handle()
        namespaces = type.split('.');
        type = namespaces.shift();
        namespaces.sort();
      }
      ontype = type.indexOf(':') < 0 && `on${type}`;

      // Caller can pass in a jQuery.Event object, Object, or just an event type string
      event = event[jQuery.expando]
        ? event
        : new jQuery.Event(type, typeof event === 'object' && event);

      // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
      event.isTrigger = onlyHandlers ? 2 : 3;
      event.namespace = namespaces.join('.');
      event.rnamespace = event.namespace
        ? new RegExp(`(^|\\.)${namespaces.join('\\.(?:.*\\.|)')}(\\.|$)`)
        : null;

      // Clean up the event in case it is being reused
      event.result = undefined;
      if (!event.target) {
        event.target = elem;
      }

      // Clone any incoming data and prepend the event, creating the handler arg list
      data = data == null
        ? [event]
        : jQuery.makeArray(data, [event]);

      // Allow special events to draw outside the lines
      special = jQuery.event.special[type] || {};
      if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
        return;
      }

      // Determine event propagation path in advance, per W3C events spec (trac-9951)
      // Bubble up to document, then to window; watch for a global ownerDocument var (trac-9724)
      if (!onlyHandlers && !special.noBubble && !isWindow(elem)) {
        bubbleType = special.delegateType || type;
        if (!rfocusMorph.test(bubbleType + type)) {
          cur = cur.parentNode;
        }
        for (; cur; cur = cur.parentNode) {
          eventPath.push(cur);
          tmp = cur;
        }

        // Only add window if we got to document (e.g., not plain obj or detached DOM)
        if (tmp === (elem.ownerDocument || document)) {
          eventPath.push(tmp.defaultView || tmp.parentWindow || window);
        }
      }

      // Fire handlers on the event path
      i = 0;
      while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
        lastElement = cur;
        event.type = i > 1
          ? bubbleType
          : special.bindType || type;

        // jQuery handler
        handle = (dataPriv.get(cur, 'events') || Object.create(null))[event.type]
				&& dataPriv.get(cur, 'handle');
        if (handle) {
          handle.apply(cur, data);
        }

        // Native handler
        handle = ontype && cur[ontype];
        if (handle && handle.apply && acceptData(cur)) {
          event.result = handle.apply(cur, data);
          if (event.result === false) {
            event.preventDefault();
          }
        }
      }
      event.type = type;

      // If nobody prevented the default action, do it now
      if (!onlyHandlers && !event.isDefaultPrevented()) {
        if ((!special._default
				|| special._default.apply(eventPath.pop(), data) === false)
				&& acceptData(elem)) {
          // Call a native DOM method on the target with the same name as the event.
          // Don't do default actions on window, that's where global variables be (trac-6170)
          if (ontype && isFunction(elem[type]) && !isWindow(elem)) {
            // Don't re-trigger an onFOO event when we call its FOO() method
            tmp = elem[ontype];

            if (tmp) {
              elem[ontype] = null;
            }

            // Prevent re-triggering of the same event, since we already bubbled it above
            jQuery.event.triggered = type;

            if (event.isPropagationStopped()) {
              lastElement.addEventListener(type, stopPropagationCallback);
            }

            elem[type]();

            if (event.isPropagationStopped()) {
              lastElement.removeEventListener(type, stopPropagationCallback);
            }

            jQuery.event.triggered = undefined;

            if (tmp) {
              elem[ontype] = tmp;
            }
          }
        }
      }

      return event.result;
    },

    // Piggyback on a donor event to simulate a different one
    // Used only for `focus(in | out)` events
    simulate(type, elem, event) {
      const e = jQuery.extend(
        new jQuery.Event(),
        event,
        {
          type,
          isSimulated: true,
        },
      );

      jQuery.event.trigger(e, null, elem);
    },

  });

  jQuery.fn.extend({

    trigger(type, data) {
      return this.each(function () {
        jQuery.event.trigger(type, data, this);
      });
    },
    triggerHandler(type, data) {
      const elem = this[0];
      if (elem) {
        return jQuery.event.trigger(type, data, elem, true);
      }
    },
  });

  const
    rbracket = /\[\]$/;
  const rCRLF = /\r?\n/g;
  const rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i;
  const rsubmittable = /^(?:input|select|textarea|keygen)/i;

  function buildParams(prefix, obj, traditional, add) {
    let name;

    if (Array.isArray(obj)) {
      // Serialize array item.
      jQuery.each(obj, (i, v) => {
        if (traditional || rbracket.test(prefix)) {
          // Treat each array item as a scalar.
          add(prefix, v);
        } else {
          // Item is non-scalar (array or object), encode its numeric index.
          buildParams(
            `${prefix}[${typeof v === 'object' && v != null ? i : ''}]`,
            v,
            traditional,
            add,
          );
        }
      });
    } else if (!traditional && toType(obj) === 'object') {
      // Serialize object item.
      for (name in obj) {
        buildParams(`${prefix}[${name}]`, obj[name], traditional, add);
      }
    } else {
      // Serialize scalar item.
      add(prefix, obj);
    }
  }

  // Serialize an array of form elements or a set of
  // key/values into a query string
  jQuery.param = function (a, traditional) {
    let prefix;
    const s = [];
    const add = function (key, valueOrFunction) {
      // If value is a function, invoke it and use its return value
      const value = isFunction(valueOrFunction)
        ? valueOrFunction()
        : valueOrFunction;

      s[s.length] = `${encodeURIComponent(key)}=${
        encodeURIComponent(value == null ? '' : value)}`;
    };

    if (a == null) {
      return '';
    }

    // If an array was passed in, assume that it is an array of form elements.
    if (Array.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
      // Serialize the form elements
      jQuery.each(a, function () {
        add(this.name, this.value);
      });
    } else {
      // If traditional, encode the "old" way (the way 1.3.2 or older
      // did it), otherwise encode params recursively.
      for (prefix in a) {
        buildParams(prefix, a[prefix], traditional, add);
      }
    }

    // Return the resulting serialization
    return s.join('&');
  };

  jQuery.fn.extend({
    serialize() {
      return jQuery.param(this.serializeArray());
    },
    serializeArray() {
      return this.map(function () {
        // Can add propHook for "elements" to filter or add form elements
        const elements = jQuery.prop(this, 'elements');
        return elements ? jQuery.makeArray(elements) : this;
      }).filter(function () {
        const { type } = this;

        // Use .is( ":disabled" ) so that fieldset[disabled] works
        return this.name && !jQuery(this).is(':disabled')
				&& rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type)
				&& (this.checked || !rcheckableType.test(type));
      }).map(function (_i, elem) {
        const val = jQuery(this).val();

        if (val == null) {
          return null;
        }

        if (Array.isArray(val)) {
          return jQuery.map(val, (val) => ({ name: elem.name, value: val.replace(rCRLF, '\r\n') }));
        }

        return { name: elem.name, value: val.replace(rCRLF, '\r\n') };
      }).get();
    },
  });

  const
    r20 = /%20/g;
  const rhash = /#.*$/;
  const rantiCache = /([?&])_=[^&]*/;
  const rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg;

  // trac-7653, trac-8125, trac-8152: local protocol detection
  const rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/;
  const rnoContent = /^(?:GET|HEAD)$/;
  const rprotocol = /^\/\//;

  /* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
  const prefilters = {};

  /* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
  const transports = {};

  // Avoid comment-prolog char sequence (trac-10098); must appease lint and evade compression
  const allTypes = '*/'.concat('*');

  // Anchor tag for parsing the document origin
  const originAnchor = document.createElement('a');

  originAnchor.href = location.href;

  // Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
  function addToPrefiltersOrTransports(structure) {
    // dataTypeExpression is optional and defaults to "*"
    return function (dataTypeExpression, func) {
      if (typeof dataTypeExpression !== 'string') {
        func = dataTypeExpression;
        dataTypeExpression = '*';
      }

      let dataType;
      let i = 0;
      const dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];

      if (isFunction(func)) {
        // For each dataType in the dataTypeExpression
        while ((dataType = dataTypes[i++])) {
          // Prepend if requested
          if (dataType[0] === '+') {
            dataType = dataType.slice(1) || '*';
            (structure[dataType] = structure[dataType] || []).unshift(func);

            // Otherwise append
          } else {
            (structure[dataType] = structure[dataType] || []).push(func);
          }
        }
      }
    };
  }

  // Base inspection function for prefilters and transports
  function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
    const inspected = {};
    const seekingTransport = (structure === transports);

    function inspect(dataType) {
      let selected;
      inspected[dataType] = true;
      jQuery.each(structure[dataType] || [], (_, prefilterOrFactory) => {
        const dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
        if (typeof dataTypeOrTransport === 'string'
				&& !seekingTransport && !inspected[dataTypeOrTransport]) {
          options.dataTypes.unshift(dataTypeOrTransport);
          inspect(dataTypeOrTransport);
          return false;
        } if (seekingTransport) {
          return !(selected = dataTypeOrTransport);
        }
      });
      return selected;
    }

    return inspect(options.dataTypes[0]) || !inspected['*'] && inspect('*');
  }

  // A special extend for ajax options
  // that takes "flat" options (not to be deep extended)
  // Fixes trac-9887
  function ajaxExtend(target, src) {
    let key; let deep;
    const flatOptions = jQuery.ajaxSettings.flatOptions || {};

    for (key in src) {
      if (src[key] !== undefined) {
        (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
      }
    }
    if (deep) {
      jQuery.extend(true, target, deep);
    }

    return target;
  }

  /* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
  function ajaxHandleResponses(s, jqXHR, responses) {
    let ct; let type; let finalDataType; let firstDataType;
    const { contents } = s;
    const { dataTypes } = s;

    // Remove auto dataType and get content-type in the process
    while (dataTypes[0] === '*') {
      dataTypes.shift();
      if (ct === undefined) {
        ct = s.mimeType || jqXHR.getResponseHeader('Content-Type');
      }
    }

    // Check if we're dealing with a known content-type
    if (ct) {
      for (type in contents) {
        if (contents[type] && contents[type].test(ct)) {
          dataTypes.unshift(type);
          break;
        }
      }
    }

    // Check to see if we have a response for the expected dataType
    if (dataTypes[0] in responses) {
      finalDataType = dataTypes[0];
    } else {
      // Try convertible dataTypes
      for (type in responses) {
        if (!dataTypes[0] || s.converters[`${type} ${dataTypes[0]}`]) {
          finalDataType = type;
          break;
        }
        if (!firstDataType) {
          firstDataType = type;
        }
      }

      // Or just use first one
      finalDataType = finalDataType || firstDataType;
    }

    // If we found a dataType
    // We add the dataType to the list if needed
    // and return the corresponding response
    if (finalDataType) {
      if (finalDataType !== dataTypes[0]) {
        dataTypes.unshift(finalDataType);
      }
      return responses[finalDataType];
    }
  }

  /* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
  function ajaxConvert(s, response, jqXHR, isSuccess) {
    let conv2; let current; let conv; let tmp; let prev;
    const converters = {};

    // Work with a copy of dataTypes in case we need to modify it for conversion
    const dataTypes = s.dataTypes.slice();

    // Create converters map with lowercased keys
    if (dataTypes[1]) {
      for (conv in s.converters) {
        converters[conv.toLowerCase()] = s.converters[conv];
      }
    }

    current = dataTypes.shift();

    // Convert to each sequential dataType
    while (current) {
      if (s.responseFields[current]) {
        jqXHR[s.responseFields[current]] = response;
      }

      // Apply the dataFilter if provided
      if (!prev && isSuccess && s.dataFilter) {
        response = s.dataFilter(response, s.dataType);
      }

      prev = current;
      current = dataTypes.shift();

      if (current) {
        // There's only work to do if current dataType is non-auto
        if (current === '*') {
          current = prev;

          // Convert response if prev dataType is non-auto and differs from current
        } else if (prev !== '*' && prev !== current) {
          // Seek a direct converter
          conv = converters[`${prev} ${current}`] || converters[`* ${current}`];

          // If none found, seek a pair
          if (!conv) {
            for (conv2 in converters) {
              // If conv2 outputs current
              tmp = conv2.split(' ');
              if (tmp[1] === current) {
                // If prev can be converted to accepted input
                conv = converters[`${prev} ${tmp[0]}`]
								|| converters[`* ${tmp[0]}`];
                if (conv) {
                  // Condense equivalence converters
                  if (conv === true) {
                    conv = converters[conv2];

                    // Otherwise, insert the intermediate dataType
                  } else if (converters[conv2] !== true) {
                    current = tmp[0];
                    dataTypes.unshift(tmp[1]);
                  }
                  break;
                }
              }
            }
          }

          // Apply converter (if not an equivalence)
          if (conv !== true) {
            // Unless errors are allowed to bubble, catch and return them
            if (conv && s.throws) {
              response = conv(response);
            } else {
              try {
                response = conv(response);
              } catch (e) {
                return {
                  state: 'parsererror',
                  error: conv ? e : `No conversion from ${prev} to ${current}`,
                };
              }
            }
          }
        }
      }
    }

    return { state: 'success', data: response };
  }

  jQuery.extend({

    // Counter for holding the number of active queries
    active: 0,

    // Last-Modified header cache for next request
    lastModified: {},
    etag: {},

    ajaxSettings: {
      url: location.href,
      type: 'GET',
      isLocal: rlocalProtocol.test(location.protocol),
      global: true,
      processData: true,
      async: true,
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',

      /*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

      accepts: {
        '*': allTypes,
        text: 'text/plain',
        html: 'text/html',
        xml: 'application/xml, text/xml',
        json: 'application/json, text/javascript',
      },

      contents: {
        xml: /\bxml\b/,
        html: /\bhtml/,
        json: /\bjson\b/,
      },

      responseFields: {
        xml: 'responseXML',
        text: 'responseText',
        json: 'responseJSON',
      },

      // Data converters
      // Keys separate source (or catchall "*") and destination types with a single space
      converters: {

        // Convert anything to text
        '* text': String,

        // Text to html (true = no transformation)
        'text html': true,

        // Evaluate text as a json expression
        'text json': JSON.parse,

        // Parse text as xml
        'text xml': jQuery.parseXML,
      },

      // For options that shouldn't be deep extended:
      // you can add your own custom options here if
      // and when you create one that shouldn't be
      // deep extended (see ajaxExtend)
      flatOptions: {
        url: true,
        context: true,
      },
    },

    // Creates a full fledged settings object into target
    // with both ajaxSettings and settings fields.
    // If target is omitted, writes into ajaxSettings.
    ajaxSetup(target, settings) {
      return settings

      // Building a settings object
        ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings)

      // Extending ajaxSettings
        : ajaxExtend(jQuery.ajaxSettings, target);
    },

    ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
    ajaxTransport: addToPrefiltersOrTransports(transports),

    // Main method
    ajax(url, options) {
      // If url is an object, simulate pre-1.5 signature
      if (typeof url === 'object') {
        options = url;
        url = undefined;
      }

      // Force options to be an object
      options = options || {};

      let transport;

      // URL without anti-cache param
      let cacheURL;

      // Response headers
      let responseHeadersString;
      let responseHeaders;

      // timeout handle
      let timeoutTimer;

      // Url cleanup var
      let urlAnchor;

      // Request state (becomes false upon send and true upon completion)
      let completed;

      // To know if global events are to be dispatched
      let fireGlobals;

      // Loop variable
      let i;

      // uncached part of the url
      let uncached;

      // Create the final options object
      const s = jQuery.ajaxSetup({}, options);

      // Callbacks context
      const callbackContext = s.context || s;

      // Context for global events is callbackContext if it is a DOM node or jQuery collection
      const globalEventContext = s.context
				&& (callbackContext.nodeType || callbackContext.jquery)
        ? jQuery(callbackContext)
        : jQuery.event;

      // Deferreds
      const deferred = jQuery.Deferred();
      const completeDeferred = jQuery.Callbacks('once memory');

      // Status-dependent callbacks
      let statusCode = s.statusCode || {};

      // Headers (they are sent all at once)
      const requestHeaders = {};
      const requestHeadersNames = {};

      // Default abort message
      let strAbort = 'canceled';

      // Fake xhr
      var jqXHR = {
        readyState: 0,

        // Builds headers hashtable if needed
        getResponseHeader(key) {
          let match;
          if (completed) {
            if (!responseHeaders) {
              responseHeaders = {};
              while ((match = rheaders.exec(responseHeadersString))) {
                responseHeaders[`${match[1].toLowerCase()} `] =									(responseHeaders[`${match[1].toLowerCase()} `] || [])
									  .concat(match[2]);
              }
            }
            match = responseHeaders[`${key.toLowerCase()} `];
          }
          return match == null ? null : match.join(', ');
        },

        // Raw string
        getAllResponseHeaders() {
          return completed ? responseHeadersString : null;
        },

        // Caches the header
        setRequestHeader(name, value) {
          if (completed == null) {
            name = requestHeadersNames[name.toLowerCase()] =							requestHeadersNames[name.toLowerCase()] || name;
            requestHeaders[name] = value;
          }
          return this;
        },

        // Overrides response content-type header
        overrideMimeType(type) {
          if (completed == null) {
            s.mimeType = type;
          }
          return this;
        },

        // Status-dependent callbacks
        statusCode(map) {
          let code;
          if (map) {
            if (completed) {
              // Execute the appropriate callbacks
              jqXHR.always(map[jqXHR.status]);
            } else {
              // Lazy-add the new callbacks in a way that preserves old ones
              for (code in map) {
                statusCode[code] = [statusCode[code], map[code]];
              }
            }
          }
          return this;
        },

        // Cancel the request
        abort(statusText) {
          const finalText = statusText || strAbort;
          if (transport) {
            transport.abort(finalText);
          }
          done(0, finalText);
          return this;
        },
      };

      // Attach deferreds
      deferred.promise(jqXHR);

      // Add protocol if not provided (prefilters might expect it)
      // Handle falsy url in the settings object (trac-10093: consistency with old signature)
      // We also use the url parameter if available
      s.url = (`${url || s.url || location.href}`)
        .replace(rprotocol, `${location.protocol}//`);

      // Alias method option to type as per ticket trac-12004
      s.type = options.method || options.type || s.method || s.type;

      // Extract dataTypes list
      s.dataTypes = (s.dataType || '*').toLowerCase().match(rnothtmlwhite) || [''];

      // A cross-domain request is in order when the origin doesn't match the current origin.
      if (s.crossDomain == null) {
        urlAnchor = document.createElement('a');

        // Support: IE <=8 - 11, Edge 12 - 15
        // IE throws exception on accessing the href property if url is malformed,
        // e.g. http://example.com:80x/
        try {
          urlAnchor.href = s.url;

          // Support: IE <=8 - 11 only
          // Anchor's host property isn't correctly set when s.url is relative
          urlAnchor.href = urlAnchor.href;
          s.crossDomain = `${originAnchor.protocol}//${originAnchor.host}`
					!== `${urlAnchor.protocol}//${urlAnchor.host}`;
        } catch (e) {
          // If there is an error parsing the URL, assume it is crossDomain,
          // it can be rejected by the transport if it is invalid
          s.crossDomain = true;
        }
      }

      // Convert data if not already a string
      if (s.data && s.processData && typeof s.data !== 'string') {
        s.data = jQuery.param(s.data, s.traditional);
      }

      // Apply prefilters
      inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

      // If request was aborted inside a prefilter, stop there
      if (completed) {
        return jqXHR;
      }

      // We can fire global events as of now if asked to
      // Don't fire events if jQuery.event is undefined in an AMD-usage scenario (trac-15118)
      fireGlobals = jQuery.event && s.global;

      // Watch for a new set of requests
      if (fireGlobals && jQuery.active++ === 0) {
        jQuery.event.trigger('ajaxStart');
      }

      // Uppercase the type
      s.type = s.type.toUpperCase();

      // Determine if request has content
      s.hasContent = !rnoContent.test(s.type);

      // Save the URL in case we're toying with the If-Modified-Since
      // and/or If-None-Match header later on
      // Remove hash to simplify url manipulation
      cacheURL = s.url.replace(rhash, '');

      // More options handling for requests with no content
      if (!s.hasContent) {
        // Remember the hash so we can put it back
        uncached = s.url.slice(cacheURL.length);

        // If data is available and should be processed, append data to url
        if (s.data && (s.processData || typeof s.data === 'string')) {
          cacheURL += (rquery.test(cacheURL) ? '&' : '?') + s.data;

          // trac-9682: remove data so that it's not used in an eventual retry
          delete s.data;
        }

        // Add or update anti-cache param if needed
        if (s.cache === false) {
          cacheURL = cacheURL.replace(rantiCache, '$1');
          uncached = `${rquery.test(cacheURL) ? '&' : '?'}_=${nonce.guid++
          }${uncached}`;
        }

        // Put hash and anti-cache on the URL that will be requested (gh-1732)
        s.url = cacheURL + uncached;

        // Change '%20' to '+' if this is encoded form body content (gh-2658)
      } else if (s.data && s.processData
			&& (s.contentType || '').indexOf('application/x-www-form-urlencoded') === 0) {
        s.data = s.data.replace(r20, '+');
      }

      // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
      if (s.ifModified) {
        if (jQuery.lastModified[cacheURL]) {
          jqXHR.setRequestHeader('If-Modified-Since', jQuery.lastModified[cacheURL]);
        }
        if (jQuery.etag[cacheURL]) {
          jqXHR.setRequestHeader('If-None-Match', jQuery.etag[cacheURL]);
        }
      }

      // Set the correct header, if data is being sent
      if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
        jqXHR.setRequestHeader('Content-Type', s.contentType);
      }

      // Set the Accepts header for the server, depending on the dataType
      jqXHR.setRequestHeader(
        'Accept',
        s.dataTypes[0] && s.accepts[s.dataTypes[0]]
          ? s.accepts[s.dataTypes[0]]
					+ (s.dataTypes[0] !== '*' ? `, ${allTypes}; q=0.01` : '')
          : s.accepts['*'],
      );

      // Check for headers option
      for (i in s.headers) {
        jqXHR.setRequestHeader(i, s.headers[i]);
      }

      // Allow custom headers/mimetypes and early abort
      if (s.beforeSend
			&& (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed)) {
        // Abort if not done already and return
        return jqXHR.abort();
      }

      // Aborting is no longer a cancellation
      strAbort = 'abort';

      // Install callbacks on deferreds
      completeDeferred.add(s.complete);
      jqXHR.done(s.success);
      jqXHR.fail(s.error);

      // Get transport
      transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

      // If no transport, we auto-abort
      if (!transport) {
        done(-1, 'No Transport');
      } else {
        jqXHR.readyState = 1;

        // Send global event
        if (fireGlobals) {
          globalEventContext.trigger('ajaxSend', [jqXHR, s]);
        }

        // If request was aborted inside ajaxSend, stop there
        if (completed) {
          return jqXHR;
        }

        // Timeout
        if (s.async && s.timeout > 0) {
          timeoutTimer = window.setTimeout(() => {
            jqXHR.abort('timeout');
          }, s.timeout);
        }

        try {
          completed = false;
          transport.send(requestHeaders, done);
        } catch (e) {
          // Rethrow post-completion exceptions
          if (completed) {
            throw e;
          }

          // Propagate others as results
          done(-1, e);
        }
      }

      // Callback for when everything is done
      function done(status, nativeStatusText, responses, headers) {
        let isSuccess; let success; let error; let response; let modified;
        let statusText = nativeStatusText;

        // Ignore repeat invocations
        if (completed) {
          return;
        }

        completed = true;

        // Clear timeout if it exists
        if (timeoutTimer) {
          window.clearTimeout(timeoutTimer);
        }

        // Dereference transport for early garbage collection
        // (no matter how long the jqXHR object will be used)
        transport = undefined;

        // Cache response headers
        responseHeadersString = headers || '';

        // Set readyState
        jqXHR.readyState = status > 0 ? 4 : 0;

        // Determine if successful
        isSuccess = status >= 200 && status < 300 || status === 304;

        // Get response data
        if (responses) {
          response = ajaxHandleResponses(s, jqXHR, responses);
        }

        // Use a noop converter for missing script but not if jsonp
        if (!isSuccess
				&& jQuery.inArray('script', s.dataTypes) > -1
				&& jQuery.inArray('json', s.dataTypes) < 0) {
          s.converters['text script'] = function () {};
        }

        // Convert no matter what (that way responseXXX fields are always set)
        response = ajaxConvert(s, response, jqXHR, isSuccess);

        // If successful, handle type chaining
        if (isSuccess) {
          // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
          if (s.ifModified) {
            modified = jqXHR.getResponseHeader('Last-Modified');
            if (modified) {
              jQuery.lastModified[cacheURL] = modified;
            }
            modified = jqXHR.getResponseHeader('etag');
            if (modified) {
              jQuery.etag[cacheURL] = modified;
            }
          }

          // if no content
          if (status === 204 || s.type === 'HEAD') {
            statusText = 'nocontent';

            // if not modified
          } else if (status === 304) {
            statusText = 'notmodified';

            // If we have data, let's convert it
          } else {
            statusText = response.state;
            success = response.data;
            error = response.error;
            isSuccess = !error;
          }
        } else {
          // Extract error from statusText and normalize for non-aborts
          error = statusText;
          if (status || !statusText) {
            statusText = 'error';
            if (status < 0) {
              status = 0;
            }
          }
        }

        // Set data for the fake xhr object
        jqXHR.status = status;
        jqXHR.statusText = `${nativeStatusText || statusText}`;

        // Success/Error
        if (isSuccess) {
          deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
        } else {
          deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
        }

        // Status-dependent callbacks
        jqXHR.statusCode(statusCode);
        statusCode = undefined;

        if (fireGlobals) {
          globalEventContext.trigger(
            isSuccess ? 'ajaxSuccess' : 'ajaxError',
            [jqXHR, s, isSuccess ? success : error],
          );
        }

        // Complete
        completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

        if (fireGlobals) {
          globalEventContext.trigger('ajaxComplete', [jqXHR, s]);

          // Handle the global AJAX counter
          if (!(--jQuery.active)) {
            jQuery.event.trigger('ajaxStop');
          }
        }
      }

      return jqXHR;
    },

    getJSON(url, data, callback) {
      return jQuery.get(url, data, callback, 'json');
    },

    getScript(url, callback) {
      return jQuery.get(url, undefined, callback, 'script');
    },
  });

  jQuery.each(['get', 'post'], (_i, method) => {
    jQuery[method] = function (url, data, callback, type) {
      // Shift arguments if data argument was omitted
      if (isFunction(data)) {
        type = type || callback;
        callback = data;
        data = undefined;
      }

      // The url can be an options object (which then must have .url)
      return jQuery.ajax(jQuery.extend({
        url,
        type: method,
        dataType: type,
        data,
        success: callback,
      }, jQuery.isPlainObject(url) && url));
    };
  });

  jQuery.ajaxPrefilter((s) => {
    let i;
    for (i in s.headers) {
      if (i.toLowerCase() === 'content-type') {
        s.contentType = s.headers[i] || '';
      }
    }
  });

  jQuery._evalUrl = function (url, options, doc) {
    return jQuery.ajax({
      url,

      // Make this explicit, since user can override this through ajaxSetup (trac-11264)
      type: 'GET',
      dataType: 'script',
      cache: true,
      async: false,
      global: false,

      // Only evaluate the response if it is successful (gh-4126)
      // dataFilter is not invoked for failure responses, so using it instead
      // of the default converter is kludgy but it works.
      converters: {
        'text script': function () {},
      },
      dataFilter(response) {
        jQuery.globalEval(response, options, doc);
      },
    });
  };

  jQuery.fn.extend({
    wrapAll(html) {
      let wrap;

      if (this[0]) {
        if (isFunction(html)) {
          html = html.call(this[0]);
        }

        // The elements to wrap the target around
        wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

        if (this[0].parentNode) {
          wrap.insertBefore(this[0]);
        }

        wrap.map(function () {
          let elem = this;

          while (elem.firstElementChild) {
            elem = elem.firstElementChild;
          }

          return elem;
        }).append(this);
      }

      return this;
    },

    wrapInner(html) {
      if (isFunction(html)) {
        return this.each(function (i) {
          jQuery(this).wrapInner(html.call(this, i));
        });
      }

      return this.each(function () {
        const self = jQuery(this);
        const contents = self.contents();

        if (contents.length) {
          contents.wrapAll(html);
        } else {
          self.append(html);
        }
      });
    },

    wrap(html) {
      const htmlIsFunction = isFunction(html);

      return this.each(function (i) {
        jQuery(this).wrapAll(htmlIsFunction ? html.call(this, i) : html);
      });
    },

    unwrap(selector) {
      this.parent(selector).not('body').each(function () {
        jQuery(this).replaceWith(this.childNodes);
      });
      return this;
    },
  });

  jQuery.expr.pseudos.hidden = function (elem) {
    return !jQuery.expr.pseudos.visible(elem);
  };
  jQuery.expr.pseudos.visible = function (elem) {
    return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
  };

  jQuery.ajaxSettings.xhr = function () {
    try {
      return new window.XMLHttpRequest();
    } catch (e) {}
  };

  const xhrSuccessStatus = {

    // File protocol always yields status code 0, assume 200
    0: 200,

    // Support: IE <=9 only
    // trac-1450: sometimes IE returns 1223 when it should be 204
    1223: 204,
  };
  let xhrSupported = jQuery.ajaxSettings.xhr();

  support.cors = !!xhrSupported && ('withCredentials' in xhrSupported);
  support.ajax = xhrSupported = !!xhrSupported;

  jQuery.ajaxTransport((options) => {
    let callback; let
      errorCallback;

    // Cross domain only allowed if supported through XMLHttpRequest
    if (support.cors || xhrSupported && !options.crossDomain) {
      return {
        send(headers, complete) {
          let i;
          const xhr = options.xhr();

          xhr.open(
            options.type,
            options.url,
            options.async,
            options.username,
            options.password,
          );

          // Apply custom fields if provided
          if (options.xhrFields) {
            for (i in options.xhrFields) {
              xhr[i] = options.xhrFields[i];
            }
          }

          // Override mime type if needed
          if (options.mimeType && xhr.overrideMimeType) {
            xhr.overrideMimeType(options.mimeType);
          }

          // X-Requested-With header
          // For cross-domain requests, seeing as conditions for a preflight are
          // akin to a jigsaw puzzle, we simply never set it to be sure.
          // (it can always be set on a per-request basis or even using ajaxSetup)
          // For same-domain requests, won't change header if already provided.
          if (!options.crossDomain && !headers['X-Requested-With']) {
            headers['X-Requested-With'] = 'XMLHttpRequest';
          }

          // Set headers
          for (i in headers) {
            xhr.setRequestHeader(i, headers[i]);
          }

          // Callback
          callback = function (type) {
            return function () {
              if (callback) {
                callback = errorCallback = xhr.onload =								xhr.onerror = xhr.onabort = xhr.ontimeout =									xhr.onreadystatechange = null;

                if (type === 'abort') {
                  xhr.abort();
                } else if (type === 'error') {
                  // Support: IE <=9 only
                  // On a manual native abort, IE9 throws
                  // errors on any property access that is not readyState
                  if (typeof xhr.status !== 'number') {
                    complete(0, 'error');
                  } else {
                    complete(

                      // File: protocol always yields status 0; see trac-8605, trac-14207
                      xhr.status,
                      xhr.statusText,
                    );
                  }
                } else {
                  complete(
                    xhrSuccessStatus[xhr.status] || xhr.status,
                    xhr.statusText,

                    // Support: IE <=9 only
                    // IE9 has no XHR2 but throws on binary (trac-11426)
                    // For XHR2 non-text, let the caller handle it (gh-2498)
                    (xhr.responseType || 'text') !== 'text'
									|| typeof xhr.responseText !== 'string'
                      ? { binary: xhr.response }
                      : { text: xhr.responseText },
                    xhr.getAllResponseHeaders(),
                  );
                }
              }
            };
          };

          // Listen to events
          xhr.onload = callback();
          errorCallback = xhr.onerror = xhr.ontimeout = callback('error');

          // Support: IE 9 only
          // Use onreadystatechange to replace onabort
          // to handle uncaught aborts
          if (xhr.onabort !== undefined) {
            xhr.onabort = errorCallback;
          } else {
            xhr.onreadystatechange = function () {
              // Check readyState before timeout as it changes
              if (xhr.readyState === 4) {
                // Allow onerror to be called first,
                // but that will not handle a native abort
                // Also, save errorCallback to a variable
                // as xhr.onerror cannot be accessed
                window.setTimeout(() => {
                  if (callback) {
                    errorCallback();
                  }
                });
              }
            };
          }

          // Create the abort callback
          callback = callback('abort');

          try {
            // Do send the request (this may raise an exception)
            xhr.send(options.hasContent && options.data || null);
          } catch (e) {
            // trac-14683: Only rethrow if this hasn't been notified as an error yet
            if (callback) {
              throw e;
            }
          }
        },

        abort() {
          if (callback) {
            callback();
          }
        },
      };
    }
  });

  // Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
  jQuery.ajaxPrefilter((s) => {
    if (s.crossDomain) {
      s.contents.script = false;
    }
  });

  // Install script dataType
  jQuery.ajaxSetup({
    accepts: {
      script: 'text/javascript, application/javascript, '
			+ 'application/ecmascript, application/x-ecmascript',
    },
    contents: {
      script: /\b(?:java|ecma)script\b/,
    },
    converters: {
      'text script': function (text) {
        jQuery.globalEval(text);
        return text;
      },
    },
  });

  // Handle cache's special case and crossDomain
  jQuery.ajaxPrefilter('script', (s) => {
    if (s.cache === undefined) {
      s.cache = false;
    }
    if (s.crossDomain) {
      s.type = 'GET';
    }
  });

  // Bind script tag hack transport
  jQuery.ajaxTransport('script', (s) => {
    // This transport only deals with cross domain or forced-by-attrs requests
    if (s.crossDomain || s.scriptAttrs) {
      let script; let
        callback;
      return {
        send(_, complete) {
          script = jQuery('<script>')
            .attr(s.scriptAttrs || {})
            .prop({ charset: s.scriptCharset, src: s.url })
            .on('load error', callback = function (evt) {
              script.remove();
              callback = null;
              if (evt) {
                complete(evt.type === 'error' ? 404 : 200, evt.type);
              }
            });

          // Use native DOM manipulation to avoid our domManip AJAX trickery
          document.head.appendChild(script[0]);
        },
        abort() {
          if (callback) {
            callback();
          }
        },
      };
    }
  });

  const oldCallbacks = [];
  const rjsonp = /(=)\?(?=&|$)|\?\?/;

  // Default jsonp settings
  jQuery.ajaxSetup({
    jsonp: 'callback',
    jsonpCallback() {
      const callback = oldCallbacks.pop() || (`${jQuery.expando}_${nonce.guid++}`);
      this[callback] = true;
      return callback;
    },
  });

  // Detect, normalize options and install callbacks for jsonp requests
  jQuery.ajaxPrefilter('json jsonp', (s, originalSettings, jqXHR) => {
    let callbackName; let overwritten; let responseContainer;
    const jsonProp = s.jsonp !== false && (rjsonp.test(s.url)
      ? 'url'
      : typeof s.data === 'string'
				&& (s.contentType || '')
				  .indexOf('application/x-www-form-urlencoded') === 0
				&& rjsonp.test(s.data) && 'data'
    );

    // Handle iff the expected data type is "jsonp" or we have a parameter to set
    if (jsonProp || s.dataTypes[0] === 'jsonp') {
      // Get callback name, remembering preexisting value associated with it
      callbackName = s.jsonpCallback = isFunction(s.jsonpCallback)
        ? s.jsonpCallback()
        : s.jsonpCallback;

      // Insert callback into url or form data
      if (jsonProp) {
        s[jsonProp] = s[jsonProp].replace(rjsonp, `$1${callbackName}`);
      } else if (s.jsonp !== false) {
        s.url += `${(rquery.test(s.url) ? '&' : '?') + s.jsonp}=${callbackName}`;
      }

      // Use data converter to retrieve json after script execution
      s.converters['script json'] = function () {
        if (!responseContainer) {
          jQuery.error(`${callbackName} was not called`);
        }
        return responseContainer[0];
      };

      // Force json dataType
      s.dataTypes[0] = 'json';

      // Install callback
      overwritten = window[callbackName];
      window[callbackName] = function () {
        responseContainer = arguments;
      };

      // Clean-up function (fires after converters)
      jqXHR.always(() => {
        // If previous value didn't exist - remove it
        if (overwritten === undefined) {
          jQuery(window).removeProp(callbackName);

          // Otherwise restore preexisting value
        } else {
          window[callbackName] = overwritten;
        }

        // Save back as free
        if (s[callbackName]) {
          // Make sure that re-using the options doesn't screw things around
          s.jsonpCallback = originalSettings.jsonpCallback;

          // Save the callback name for future use
          oldCallbacks.push(callbackName);
        }

        // Call if it was a function and we have a response
        if (responseContainer && isFunction(overwritten)) {
          overwritten(responseContainer[0]);
        }

        responseContainer = overwritten = undefined;
      });

      // Delegate to script
      return 'script';
    }
  });

  // Support: Safari 8 only
  // In Safari 8 documents created via document.implementation.createHTMLDocument
  // collapse sibling forms: the second one becomes a child of the first one.
  // Because of that, this security measure has to be disabled in Safari 8.
  // https://bugs.webkit.org/show_bug.cgi?id=137337
  support.createHTMLDocument = (function () {
    const { body } = document.implementation.createHTMLDocument('');
    body.innerHTML = '<form></form><form></form>';
    return body.childNodes.length === 2;
  }());

  // Argument "data" should be string of html
  // context (optional): If specified, the fragment will be created in this context,
  // defaults to document
  // keepScripts (optional): If true, will include scripts passed in the html string
  jQuery.parseHTML = function (data, context, keepScripts) {
    if (typeof data !== 'string') {
      return [];
    }
    if (typeof context === 'boolean') {
      keepScripts = context;
      context = false;
    }

    let base; let parsed; let
      scripts;

    if (!context) {
      // Stop scripts or inline event handlers from being executed immediately
      // by using document.implementation
      if (support.createHTMLDocument) {
        context = document.implementation.createHTMLDocument('');

        // Set the base href for the created document
        // so any parsed elements with URLs
        // are based on the document's URL (gh-2965)
        base = context.createElement('base');
        base.href = document.location.href;
        context.head.appendChild(base);
      } else {
        context = document;
      }
    }

    parsed = rsingleTag.exec(data);
    scripts = !keepScripts && [];

    // Single tag
    if (parsed) {
      return [context.createElement(parsed[1])];
    }

    parsed = buildFragment([data], context, scripts);

    if (scripts && scripts.length) {
      jQuery(scripts).remove();
    }

    return jQuery.merge([], parsed.childNodes);
  };

  /**
 * Load a url into a page
 */
  jQuery.fn.load = function (url, params, callback) {
    let selector; let type; let response;
    const self = this;
    const off = url.indexOf(' ');

    if (off > -1) {
      selector = stripAndCollapse(url.slice(off));
      url = url.slice(0, off);
    }

    // If it's a function
    if (isFunction(params)) {
      // We assume that it's the callback
      callback = params;
      params = undefined;

      // Otherwise, build a param string
    } else if (params && typeof params === 'object') {
      type = 'POST';
    }

    // If we have elements to modify, make the request
    if (self.length > 0) {
      jQuery.ajax({
        url,

        // If "type" variable is undefined, then "GET" method will be used.
        // Make value of this field explicit since
        // user can override it through ajaxSetup method
        type: type || 'GET',
        dataType: 'html',
        data: params,
      }).done(function (responseText) {
        // Save response for use in complete callback
        response = arguments;

        self.html(selector

        // If a selector was specified, locate the right elements in a dummy div
        // Exclude scripts to avoid IE 'Permission Denied' errors
          ? jQuery('<div>').append(jQuery.parseHTML(responseText)).find(selector)

        // Otherwise use the full result
          : responseText);

        // If the request succeeds, this function gets "data", "status", "jqXHR"
        // but they are ignored because response was set above.
        // If it fails, this function gets "jqXHR", "status", "error"
      }).always(callback && ((jqXHR, status) => {
        self.each(function () {
          callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
        });
      }));
    }

    return this;
  };

  jQuery.expr.pseudos.animated = function (elem) {
    return jQuery.grep(jQuery.timers, (fn) => elem === fn.elem).length;
  };

  jQuery.offset = {
    setOffset(elem, options, i) {
      let curPosition; let curLeft; let curCSSTop; let curTop; let curOffset; let curCSSLeft; let calculatePosition;
      const position = jQuery.css(elem, 'position');
      const curElem = jQuery(elem);
      const props = {};

      // Set position first, in-case top/left are set even on static elem
      if (position === 'static') {
        elem.style.position = 'relative';
      }

      curOffset = curElem.offset();
      curCSSTop = jQuery.css(elem, 'top');
      curCSSLeft = jQuery.css(elem, 'left');
      calculatePosition = (position === 'absolute' || position === 'fixed')
			&& (curCSSTop + curCSSLeft).indexOf('auto') > -1;

      // Need to be able to calculate position if either
      // top or left is auto and position is either absolute or fixed
      if (calculatePosition) {
        curPosition = curElem.position();
        curTop = curPosition.top;
        curLeft = curPosition.left;
      } else {
        curTop = parseFloat(curCSSTop) || 0;
        curLeft = parseFloat(curCSSLeft) || 0;
      }

      if (isFunction(options)) {
        // Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
        options = options.call(elem, i, jQuery.extend({}, curOffset));
      }

      if (options.top != null) {
        props.top = (options.top - curOffset.top) + curTop;
      }
      if (options.left != null) {
        props.left = (options.left - curOffset.left) + curLeft;
      }

      if ('using' in options) {
        options.using.call(elem, props);
      } else {
        curElem.css(props);
      }
    },
  };

  jQuery.fn.extend({

    // offset() relates an element's border box to the document origin
    offset(options) {
      // Preserve chaining for setter
      if (arguments.length) {
        return options === undefined
          ? this
          : this.each(function (i) {
            jQuery.offset.setOffset(this, options, i);
          });
      }

      let rect; let win;
      const elem = this[0];

      if (!elem) {
        return;
      }

      // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
      // Support: IE <=11 only
      // Running getBoundingClientRect on a
      // disconnected node in IE throws an error
      if (!elem.getClientRects().length) {
        return { top: 0, left: 0 };
      }

      // Get document-relative position by adding viewport scroll to viewport-relative gBCR
      rect = elem.getBoundingClientRect();
      win = elem.ownerDocument.defaultView;
      return {
        top: rect.top + win.pageYOffset,
        left: rect.left + win.pageXOffset,
      };
    },

    // position() relates an element's margin box to its offset parent's padding box
    // This corresponds to the behavior of CSS absolute positioning
    position() {
      if (!this[0]) {
        return;
      }

      let offsetParent; let offset; let doc;
      const elem = this[0];
      let parentOffset = { top: 0, left: 0 };

      // position:fixed elements are offset from the viewport, which itself always has zero offset
      if (jQuery.css(elem, 'position') === 'fixed') {
        // Assume position:fixed implies availability of getBoundingClientRect
        offset = elem.getBoundingClientRect();
      } else {
        offset = this.offset();

        // Account for the *real* offset parent, which can be the document or its root element
        // when a statically positioned element is identified
        doc = elem.ownerDocument;
        offsetParent = elem.offsetParent || doc.documentElement;
        while (offsetParent
				&& (offsetParent === doc.body || offsetParent === doc.documentElement)
				&& jQuery.css(offsetParent, 'position') === 'static') {
          offsetParent = offsetParent.parentNode;
        }
        if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {
          // Incorporate borders into its offset, since they are outside its content origin
          parentOffset = jQuery(offsetParent).offset();
          parentOffset.top += jQuery.css(offsetParent, 'borderTopWidth', true);
          parentOffset.left += jQuery.css(offsetParent, 'borderLeftWidth', true);
        }
      }

      // Subtract parent offsets and element margins
      return {
        top: offset.top - parentOffset.top - jQuery.css(elem, 'marginTop', true),
        left: offset.left - parentOffset.left - jQuery.css(elem, 'marginLeft', true),
      };
    },

    // This method will return documentElement in the following cases:
    // 1) For the element inside the iframe without offsetParent, this method will return
    //    documentElement of the parent window
    // 2) For the hidden or detached element
    // 3) For body or html element, i.e. in case of the html node - it will return itself
    //
    // but those exceptions were never presented as a real life use-cases
    // and might be considered as more preferable results.
    //
    // This logic, however, is not guaranteed and can change at any point in the future
    offsetParent() {
      return this.map(function () {
        let { offsetParent } = this;

        while (offsetParent && jQuery.css(offsetParent, 'position') === 'static') {
          offsetParent = offsetParent.offsetParent;
        }

        return offsetParent || documentElement;
      });
    },
  });

  // Create scrollLeft and scrollTop methods
  jQuery.each({ scrollLeft: 'pageXOffset', scrollTop: 'pageYOffset' }, (method, prop) => {
    const top = prop === 'pageYOffset';

    jQuery.fn[method] = function (val) {
      return access(this, (elem, method, val) => {
        // Coalesce documents and windows
        let win;
        if (isWindow(elem)) {
          win = elem;
        } else if (elem.nodeType === 9) {
          win = elem.defaultView;
        }

        if (val === undefined) {
          return win ? win[prop] : elem[method];
        }

        if (win) {
          win.scrollTo(
            !top ? val : win.pageXOffset,
            top ? val : win.pageYOffset,
          );
        } else {
          elem[method] = val;
        }
      }, method, val, arguments.length);
    };
  });

  // Support: Safari <=7 - 9.1, Chrome <=37 - 49
  // Add the top/left cssHooks using jQuery.fn.position
  // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
  // Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
  // getComputedStyle returns percent when specified for top/left/bottom/right;
  // rather than make the css module depend on the offset module, just check for it here
  jQuery.each(['top', 'left'], (_i, prop) => {
    jQuery.cssHooks[prop] = addGetHookIf(
      support.pixelPosition,
      (elem, computed) => {
        if (computed) {
          computed = curCSS(elem, prop);

          // If curCSS returns percentage, fallback to offset
          return rnumnonpx.test(computed)
            ? `${jQuery(elem).position()[prop]}px`
            : computed;
        }
      },
    );
  });

  // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
  jQuery.each({ Height: 'height', Width: 'width' }, (name, type) => {
    jQuery.each({
      padding: `inner${name}`,
      content: type,
      '': `outer${name}`,
    }, (defaultExtra, funcName) => {
      // Margin is only for outerHeight, outerWidth
      jQuery.fn[funcName] = function (margin, value) {
        const chainable = arguments.length && (defaultExtra || typeof margin !== 'boolean');
        const extra = defaultExtra || (margin === true || value === true ? 'margin' : 'border');

        return access(this, (elem, type, value) => {
          let doc;

          if (isWindow(elem)) {
            // $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
            return funcName.indexOf('outer') === 0
              ? elem[`inner${name}`]
              : elem.document.documentElement[`client${name}`];
          }

          // Get document width or height
          if (elem.nodeType === 9) {
            doc = elem.documentElement;

            // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
            // whichever is greatest
            return Math.max(
              elem.body[`scroll${name}`],
              doc[`scroll${name}`],
              elem.body[`offset${name}`],
              doc[`offset${name}`],
              doc[`client${name}`],
            );
          }

          return value === undefined

          // Get width or height on the element, requesting but not forcing parseFloat
            ? jQuery.css(elem, type, extra)

          // Set width or height on the element
            : jQuery.style(elem, type, value, extra);
        }, type, chainable ? margin : undefined, chainable);
      };
    });
  });

  jQuery.each([
    'ajaxStart',
    'ajaxStop',
    'ajaxComplete',
    'ajaxError',
    'ajaxSuccess',
    'ajaxSend',
  ], (_i, type) => {
    jQuery.fn[type] = function (fn) {
      return this.on(type, fn);
    };
  });

  jQuery.fn.extend({

    bind(types, data, fn) {
      return this.on(types, null, data, fn);
    },
    unbind(types, fn) {
      return this.off(types, null, fn);
    },

    delegate(selector, types, data, fn) {
      return this.on(types, selector, data, fn);
    },
    undelegate(selector, types, fn) {
      // ( namespace ) or ( selector, types [, fn] )
      return arguments.length === 1
        ? this.off(selector, '**')
        : this.off(types, selector || '**', fn);
    },

    hover(fnOver, fnOut) {
      return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
    },
  });

  jQuery.each(
    ('blur focus focusin focusout resize scroll click dblclick '
	+ 'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '
	+ 'change select submit keydown keypress keyup contextmenu').split(' '),
    (_i, name) => {
      // Handle event binding
      jQuery.fn[name] = function (data, fn) {
        return arguments.length > 0
          ? this.on(name, null, data, fn)
          : this.trigger(name);
      };
    },
  );

  // Support: Android <=4.0 only
  // Make sure we trim BOM and NBSP
  // Require that the "whitespace run" starts from a non-whitespace
  // to avoid O(N^2) behavior when the engine would try matching "\s+$" at each space position.
  const rtrim = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;

  // Bind a function to a context, optionally partially applying any
  // arguments.
  // jQuery.proxy is deprecated to promote standards (specifically Function#bind)
  // However, it is not slated for removal any time soon
  jQuery.proxy = function (fn, context) {
    let tmp; let args; let
      proxy;

    if (typeof context === 'string') {
      tmp = fn[context];
      context = fn;
      fn = tmp;
    }

    // Quick check to determine if target is callable, in the spec
    // this throws a TypeError, but we will just return undefined.
    if (!isFunction(fn)) {
      return undefined;
    }

    // Simulated bind
    args = slice.call(arguments, 2);
    proxy = function () {
      return fn.apply(context || this, args.concat(slice.call(arguments)));
    };

    // Set the guid of unique handler to the same of original handler, so it can be removed
    proxy.guid = fn.guid = fn.guid || jQuery.guid++;

    return proxy;
  };

  jQuery.holdReady = function (hold) {
    if (hold) {
      jQuery.readyWait++;
    } else {
      jQuery.ready(true);
    }
  };
  jQuery.isArray = Array.isArray;
  jQuery.parseJSON = JSON.parse;
  jQuery.nodeName = nodeName;
  jQuery.isFunction = isFunction;
  jQuery.isWindow = isWindow;
  jQuery.camelCase = camelCase;
  jQuery.type = toType;

  jQuery.now = Date.now;

  jQuery.isNumeric = function (obj) {
    // As of jQuery 3.0, isNumeric is limited to
    // strings and numbers (primitives or objects)
    // that can be coerced to finite numbers (gh-2662)
    const type = jQuery.type(obj);
    return (type === 'number' || type === 'string')

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		&& !isNaN(obj - parseFloat(obj));
  };

  jQuery.trim = function (text) {
    return text == null
      ? ''
      : (`${text}`).replace(rtrim, '$1');
  };

  // Register as a named AMD module, since jQuery can be concatenated with other
  // files that may use define, but not via a proper concatenation script that
  // understands anonymous AMD modules. A named AMD is safest and most robust
  // way to register. Lowercase jquery is used because AMD module names are
  // derived from file names, and jQuery is normally delivered in a lowercase
  // file name. Do this after creating the global so that if an AMD module wants
  // to call noConflict to hide this version of jQuery, it will work.

  // Note that for maximum portability, libraries that are not jQuery should
  // declare themselves as anonymous modules, and avoid setting a global if an
  // AMD loader is present. jQuery is a special case. For more information, see
  // https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

  if (typeof define === 'function' && define.amd) {
    define('jquery', [], () => jQuery);
  }

  const

    // Map over jQuery in case of overwrite
    _jQuery = window.jQuery;

  // Map over the $ in case of overwrite
  const _$ = window.$;

  jQuery.noConflict = function (deep) {
    if (window.$ === jQuery) {
      window.$ = _$;
    }

    if (deep && window.jQuery === jQuery) {
      window.jQuery = _jQuery;
    }

    return jQuery;
  };

  // Expose jQuery and $ identifiers, even in AMD
  // (trac-7102#comment:10, https://github.com/jquery/jquery/pull/557)
  // and CommonJS for browser emulators (trac-13566)
  if (typeof noGlobal === 'undefined') {
    window.jQuery = window.$ = jQuery;
  }

  return jQuery;
}));

/*! DataTables 1.13.5
 * ©2008-2023 SpryMedia Ltd - datatables.net/license
 */
!(function (n) {
  let a; typeof define === 'function' && define.amd ? define(['jquery'], (t) => n(t, window, document)) : typeof exports === 'object' ? (a = require('jquery'), typeof window !== 'undefined' ? module.exports = function (t, e) { return t = t || window, e = e || a(t), n(e, t, t.document); } : n(a, window, window.document)) : window.DataTable = n(jQuery, window, document);
}((P, j, y, H) => {
  function d(t) { const e = parseInt(t, 10); return !isNaN(e) && isFinite(t) ? e : null; } function l(t, e, n) { const a = typeof t; const r = a == 'string'; return a == 'number' || a == 'bigint' || !!h(t) || (e && r && (t = $(t, e)), n && r && (t = t.replace(q, '')), !isNaN(parseFloat(t)) && isFinite(t)); } function a(t, e, n) { let a; return !!h(t) || (h(a = t) || typeof a === 'string') && !!l(t.replace(V, '').replace(/<script/i, ''), e, n) || null; } function m(t, e, n, a) { const r = []; let o = 0; const i = e.length; if (a !== H) for (;o < i; o++)t[e[o]][n] && r.push(t[e[o]][n][a]); else for (;o < i; o++)r.push(t[e[o]][n]); return r; } function f(t, e) { let n; const a = []; e === H ? (e = 0, n = t) : (n = e, e = t); for (let r = e; r < n; r++)a.push(r); return a; } function _(t) { for (var e = [], n = 0, a = t.length; n < a; n++)t[n] && e.push(t[n]); return e; } function s(t, e) { return this.indexOf(t, e = e === H ? 0 : e) !== -1; } let p; let e; let t; const w = function (t, v) {
    if (w.factory(t, v)) return w; if (this instanceof w) return P(t).DataTable(v); v = t, this.$ = function (t, e) { return this.api(!0).$(t, e); }, this._ = function (t, e) { return this.api(!0).rows(t, e).data(); }, this.api = function (t) { return new B(t ? ge(this[p.iApiIndex]) : this); }, this.fnAddData = function (t, e) { const n = this.api(!0); var t = (Array.isArray(t) && (Array.isArray(t[0]) || P.isPlainObject(t[0])) ? n.rows : n.row).add(t); return e !== H && !e || n.draw(), t.flatten().toArray(); }, this.fnAdjustColumnSizing = function (t) { const e = this.api(!0).columns.adjust(); const n = e.settings()[0]; const a = n.oScroll; t === H || t ? e.draw(!1) : a.sX === '' && a.sY === '' || Qt(n); }, this.fnClearTable = function (t) { const e = this.api(!0).clear(); t !== H && !t || e.draw(); }, this.fnClose = function (t) { this.api(!0).row(t).child.hide(); }, this.fnDeleteRow = function (t, e, n) { const a = this.api(!0); var t = a.rows(t); const r = t.settings()[0]; const o = r.aoData[t[0][0]]; return t.remove(), e && e.call(this, r, o), n !== H && !n || a.draw(), o; }, this.fnDestroy = function (t) { this.api(!0).destroy(t); }, this.fnDraw = function (t) { this.api(!0).draw(t); }, this.fnFilter = function (t, e, n, a, r, o) { const i = this.api(!0); (e === null || e === H ? i : i.column(e)).search(t, n, a, o), i.draw(); }, this.fnGetData = function (t, e) { let n; const a = this.api(!0); return t !== H ? (n = t.nodeName ? t.nodeName.toLowerCase() : '', e !== H || n == 'td' || n == 'th' ? a.cell(t, e).data() : a.row(t).data() || null) : a.data().toArray(); }, this.fnGetNodes = function (t) { const e = this.api(!0); return t !== H ? e.row(t).node() : e.rows().nodes().flatten().toArray(); }, this.fnGetPosition = function (t) { const e = this.api(!0); let n = t.nodeName.toUpperCase(); return n == 'TR' ? e.row(t).index() : n == 'TD' || n == 'TH' ? [(n = e.cell(t).index()).row, n.columnVisible, n.column] : null; }, this.fnIsOpen = function (t) { return this.api(!0).row(t).child.isShown(); }, this.fnOpen = function (t, e, n) {
      return this.api(!0).row(t).child(e, n).show()
        .child()[0];
    }, this.fnPageChange = function (t, e) { t = this.api(!0).page(t); e !== H && !e || t.draw(!1); }, this.fnSetColumnVis = function (t, e, n) { t = this.api(!0).column(t).visible(e); n !== H && !n || t.columns.adjust().draw(); }, this.fnSettings = function () { return ge(this[p.iApiIndex]); }, this.fnSort = function (t) { this.api(!0).order(t).draw(); }, this.fnSortListener = function (t, e, n) { this.api(!0).order.listener(t, e, n); }, this.fnUpdate = function (t, e, n, a, r) { const o = this.api(!0); return (n === H || n === null ? o.row(e) : o.cell(e, n)).data(t), r !== H && !r || o.columns.adjust(), a !== H && !a || o.draw(), 0; }, this.fnVersionCheck = p.fnVersionCheck; let e; let y = this; const D = v === H; const _ = this.length; for (e in D && (v = {}), this.oApi = this.internal = p.internal, w.ext.internal)e && (this[e] = $e(e)); return this.each(function () {
      let r = _ > 1 ? be({}, v, !0) : v; var o = 0; var t = this.getAttribute('id'); let i = !1; const e = w.defaults; const l = P(this); if (this.nodeName.toLowerCase() != 'table')W(null, 0, `Non-table node initialisation (${this.nodeName})`, 2); else {
        K(e), Q(e.column), C(e, e, !0), C(e.column, e.column, !0), C(e, P.extend(r, l.data()), !0); for (var n = w.settings, o = 0, s = n.length; o < s; o++) { const a = n[o]; if (a.nTable == this || a.nTHead && a.nTHead.parentNode == this || a.nTFoot && a.nTFoot.parentNode == this) { const u = (r.bRetrieve !== H ? r : e).bRetrieve; const c = (r.bDestroy !== H ? r : e).bDestroy; if (D || u) return a.oInstance; if (c) { a.oInstance.fnDestroy(); break; } return void W(a, 0, 'Cannot reinitialise DataTable', 3); } if (a.sTableId == this.id) { n.splice(o, 1); break; } }t !== null && t !== '' || (t = `DataTables_Table_${w.ext._unique++}`, this.id = t); let f; let d; const h = P.extend(!0, {}, w.models.oSettings, { sDestroyWidth: l[0].style.width, sInstance: t, sTableId: t }); const p = (h.nTable = this, h.oApi = y.internal, h.oInit = r, n.push(h), h.oInstance = y.length === 1 ? y : l.dataTable(), K(r), Z(r.oLanguage), r.aLengthMenu && !r.iDisplayLength && (r.iDisplayLength = (Array.isArray(r.aLengthMenu[0]) ? r.aLengthMenu[0] : r.aLengthMenu)[0]), r = be(P.extend(!0, {}, e), r), F(h.oFeatures, r, ['bPaginate', 'bLengthChange', 'bFilter', 'bSort', 'bSortMulti', 'bInfo', 'bProcessing', 'bAutoWidth', 'bSortClasses', 'bServerSide', 'bDeferRender']), F(h, r, ['asStripeClasses', 'ajax', 'fnServerData', 'fnFormatNumber', 'sServerMethod', 'aaSorting', 'aaSortingFixed', 'aLengthMenu', 'sPaginationType', 'sAjaxSource', 'sAjaxDataProp', 'iStateDuration', 'sDom', 'bSortCellsTop', 'iTabIndex', 'fnStateLoadCallback', 'fnStateSaveCallback', 'renderer', 'searchDelay', 'rowId', ['iCookieDuration', 'iStateDuration'], ['oSearch', 'oPreviousSearch'], ['aoSearchCols', 'aoPreSearchCols'], ['iDisplayLength', '_iDisplayLength']]), F(h.oScroll, r, [['sScrollX', 'sX'], ['sScrollXInner', 'sXInner'], ['sScrollY', 'sY'], ['bScrollCollapse', 'bCollapse']]), F(h.oLanguage, r, 'fnInfoCallback'), L(h, 'aoDrawCallback', r.fnDrawCallback, 'user'), L(h, 'aoServerParams', r.fnServerParams, 'user'), L(h, 'aoStateSaveParams', r.fnStateSaveParams, 'user'), L(h, 'aoStateLoadParams', r.fnStateLoadParams, 'user'), L(h, 'aoStateLoaded', r.fnStateLoaded, 'user'), L(h, 'aoRowCallback', r.fnRowCallback, 'user'), L(h, 'aoRowCreatedCallback', r.fnCreatedRow, 'user'), L(h, 'aoHeaderCallback', r.fnHeaderCallback, 'user'), L(h, 'aoFooterCallback', r.fnFooterCallback, 'user'), L(h, 'aoInitComplete', r.fnInitComplete, 'user'), L(h, 'aoPreDrawCallback', r.fnPreDrawCallback, 'user'), h.rowIdFn = A(r.rowId), tt(h), h.oClasses); const g = (P.extend(p, w.ext.classes, r.oClasses), l.addClass(p.sTable), h.iInitDisplayStart === H && (h.iInitDisplayStart = r.iDisplayStart, h._iDisplayStart = r.iDisplayStart), r.iDeferLoading !== null && (h.bDeferLoading = !0, t = Array.isArray(r.iDeferLoading), h._iRecordsDisplay = t ? r.iDeferLoading[0] : r.iDeferLoading, h._iRecordsTotal = t ? r.iDeferLoading[1] : r.iDeferLoading), h.oLanguage); var t = (P.extend(!0, g, r.oLanguage), g.sUrl ? (P.ajax({
          dataType: 'json', url: g.sUrl, success(t) { C(e.oLanguage, t), Z(t), P.extend(!0, g, t, h.oInit.oLanguage), R(h, null, 'i18n', [h]), Jt(h); }, error() { Jt(h); },
        }), i = !0) : R(h, null, 'i18n', [h]), r.asStripeClasses === null && (h.asStripeClasses = [p.sStripeOdd, p.sStripeEven]), h.asStripeClasses); const b = l.children('tbody').find('tr').eq(0); let m = (P.inArray(!0, P.map(t, (t, e) => b.hasClass(t))) !== -1 && (P('tbody tr', this).removeClass(t.join(' ')), h.asDestroyStripes = t.slice()), []); var t = this.getElementsByTagName('thead'); if (t.length !== 0 && (wt(h.aoHeader, t[0]), m = Ct(h)), r.aoColumns === null) for (f = [], o = 0, s = m.length; o < s; o++)f.push(null); else f = r.aoColumns; for (o = 0, s = f.length; o < s; o++)nt(h, m ? m[o] : null); st(h, r.aoColumnDefs, f, (t, e) => { at(h, t, e); }), b.length && (d = function (t, e) { return t.getAttribute(`data-${e}`) !== null ? e : null; }, P(b[0]).children('th, td').each((t, e) => {
          let n; const a = h.aoColumns[t]; a || W(h, 0, 'Incorrect column count', 18), a.mData === t && (n = d(e, 'sort') || d(e, 'order'), e = d(e, 'filter') || d(e, 'search'), n === null && e === null || (a.mData = {
            _: `${t}.display`, sort: n !== null ? `${t}.@data-${n}` : H, type: n !== null ? `${t}.@data-${n}` : H, filter: e !== null ? `${t}.@data-${e}` : H,
          }, a._isArrayHost = !0, at(h, t)));
        })); const S = h.oFeatures; var t = function () { if (r.aaSorting === H) { const t = h.aaSorting; for (o = 0, s = t.length; o < s; o++)t[o][1] = h.aoColumns[o].asSorting[0]; }ce(h), S.bSort && L(h, 'aoDrawCallback', () => { let t; let n; h.bSorted && (t = I(h), n = {}, P.each(t, (t, e) => { n[e.src] = e.dir; }), R(h, null, 'order', [h, t, n]), le(h)); }), L(h, 'aoDrawCallback', () => { (h.bSorted || E(h) === 'ssp' || S.bDeferRender) && ce(h); }, 'sc'); const e = l.children('caption').each(function () { this._captionSide = P(this).css('caption-side'); }); var n = l.children('thead'); let a = (n.length === 0 && (n = P('<thead/>').appendTo(l)), h.nTHead = n[0], l.children('tbody')); var n = (a.length === 0 && (a = P('<tbody/>').insertAfter(n)), h.nTBody = a[0], l.children('tfoot')); if ((n = n.length === 0 && e.length > 0 && (h.oScroll.sX !== '' || h.oScroll.sY !== '') ? P('<tfoot/>').appendTo(l) : n).length === 0 || n.children().length === 0 ? l.addClass(p.sNoFooter) : n.length > 0 && (h.nTFoot = n[0], wt(h.aoFooter, h.nTFoot)), r.aaData) for (o = 0; o < r.aaData.length; o++)x(h, r.aaData[o]); else !h.bDeferLoading && E(h) != 'dom' || ut(h, P(h.nTBody).children('tr')); h.aiDisplay = h.aiDisplayMaster.slice(), !(h.bInitialised = !0) === i && Jt(h); }; L(h, 'aoDrawCallback', de, 'state_save'), r.bStateSave ? (S.bStateSave = !0, he(h, 0, t)) : t();
      }
    }), y = null, this;
  }; const c = {}; const U = /[\r\n\u2028]/g; var V = /<.*?>/g; const X = /^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/; const J = new RegExp(`(\\${['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\', '$', '^', '-'].join('|\\')})`, 'g'); var q = /['\u00A0,$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi; var h = function (t) { return !t || !0 === t || t === '-'; }; var $ = function (t, e) { return c[e] || (c[e] = new RegExp(Ot(e), 'g')), typeof t === 'string' && e !== '.' ? t.replace(/\./g, '').replace(c[e], '.') : t; }; const N = function (t, e, n) { const a = []; let r = 0; const o = t.length; if (n !== H) for (;r < o; r++)t[r] && t[r][e] && a.push(t[r][e][n]); else for (;r < o; r++)t[r] && a.push(t[r][e]); return a; }; const G = function (t) { if (!(t.length < 2)) for (let e = t.slice().sort(), n = e[0], a = 1, r = e.length; a < r; a++) { if (e[a] === n) return !1; n = e[a]; } return !0; }; const z = function (t) { if (G(t)) return t.slice(); let e; let n; let a; const r = []; const o = t.length; let i = 0; t:for (n = 0; n < o; n++) { for (e = t[n], a = 0; a < i; a++) if (r[a] === e) continue t; r.push(e), i++; } return r; }; const Y = function (t, e) { if (Array.isArray(e)) for (let n = 0; n < e.length; n++)Y(t, e[n]); else t.push(e); return t; }; function i(n) { let a; let r; const o = {}; P.each(n, (t, e) => { (a = t.match(/^([^A-Z]+?)([A-Z])/)) && 'a aa ai ao as b fn i m o s '.indexOf(`${a[1]} `) !== -1 && (r = t.replace(a[0], a[2].toLowerCase()), o[r] = t, a[1] === 'o') && i(n[t]); }), n._hungarianMap = o; } function C(n, a, r) { let o; n._hungarianMap || i(n), P.each(a, (t, e) => { (o = n._hungarianMap[t]) === H || !r && a[o] !== H || (o.charAt(0) === 'o' ? (a[o] || (a[o] = {}), P.extend(!0, a[o], a[t]), C(n[o], a[o], r)) : a[o] = a[t]); }); } function Z(t) { let e; const n = w.defaults.oLanguage; const a = n.sDecimal; a && Me(a), t && (e = t.sZeroRecords, !t.sEmptyTable && e && n.sEmptyTable === 'No data available in table' && F(t, t, 'sZeroRecords', 'sEmptyTable'), !t.sLoadingRecords && e && n.sLoadingRecords === 'Loading...' && F(t, t, 'sZeroRecords', 'sLoadingRecords'), t.sInfoThousands && (t.sThousands = t.sInfoThousands), e = t.sDecimal) && a !== e && Me(e); }Array.isArray || (Array.isArray = function (t) { return Object.prototype.toString.call(t) === '[object Array]'; }), Array.prototype.includes || (Array.prototype.includes = s), String.prototype.trim || (String.prototype.trim = function () { return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''); }), String.prototype.includes || (String.prototype.includes = s), w.util = {
    throttle(a, t) { let r; let o; const i = t !== H ? t : 200; return function () { const t = this; const e = +new Date(); const n = arguments; r && e < r + i ? (clearTimeout(o), o = setTimeout(() => { r = H, a.apply(t, n); }, i)) : (r = e, a.apply(t, n)); }; }, escapeRegex(t) { return t.replace(J, '\\$1'); }, set(a) { let d; return P.isPlainObject(a) ? w.util.set(a._) : a === null ? function () {} : typeof a === 'function' ? function (t, e, n) { a(t, 'set', e, n); } : typeof a !== 'string' || a.indexOf('.') === -1 && a.indexOf('[') === -1 && a.indexOf('(') === -1 ? function (t, e) { t[a] = e; } : (d = function (t, e, n) { for (var a, r, o, i, l = dt(n), n = l[l.length - 1], s = 0, u = l.length - 1; s < u; s++) { if (l[s] === '__proto__' || l[s] === 'constructor') throw new Error('Cannot set prototype values'); if (a = l[s].match(ft), r = l[s].match(g), a) { if (l[s] = l[s].replace(ft, ''), t[l[s]] = [], (a = l.slice()).splice(0, s + 1), i = a.join('.'), Array.isArray(e)) for (let c = 0, f = e.length; c < f; c++)d(o = {}, e[c], i), t[l[s]].push(o); else t[l[s]] = e; return; }r && (l[s] = l[s].replace(g, ''), t = t[l[s]](e)), t[l[s]] !== null && t[l[s]] !== H || (t[l[s]] = {}), t = t[l[s]]; }n.match(g) ? t[n.replace(g, '')](e) : t[n.replace(ft, '')] = e; }, function (t, e) { return d(t, e, a); }); }, get(r) { let o; let d; return P.isPlainObject(r) ? (o = {}, P.each(r, (t, e) => { e && (o[t] = w.util.get(e)); }), function (t, e, n, a) { const r = o[e] || o._; return r !== H ? r(t, e, n, a) : t; }) : r === null ? function (t) { return t; } : typeof r === 'function' ? function (t, e, n, a) { return r(t, e, n, a); } : typeof r !== 'string' || r.indexOf('.') === -1 && r.indexOf('[') === -1 && r.indexOf('(') === -1 ? function (t, e) { return t[r]; } : (d = function (t, e, n) { let a; let r; let o; if (n !== '') for (let i = dt(n), l = 0, s = i.length; l < s; l++) { if (f = i[l].match(ft), a = i[l].match(g), f) { if (i[l] = i[l].replace(ft, ''), i[l] !== '' && (t = t[i[l]]), r = [], i.splice(0, l + 1), o = i.join('.'), Array.isArray(t)) for (let u = 0, c = t.length; u < c; u++)r.push(d(t[u], e, o)); var f = f[0].substring(1, f[0].length - 1); t = f === '' ? r : r.join(f); break; } if (a)i[l] = i[l].replace(g, ''), t = t[i[l]](); else { if (t === null || t[i[l]] === null) return null; if (t === H || t[i[l]] === H) return H; t = t[i[l]]; } } return t; }, function (t, e) { return d(t, e, r); }); },
  }; const r = function (t, e, n) { t[e] !== H && (t[n] = t[e]); }; function K(t) { r(t, 'ordering', 'bSort'), r(t, 'orderMulti', 'bSortMulti'), r(t, 'orderClasses', 'bSortClasses'), r(t, 'orderCellsTop', 'bSortCellsTop'), r(t, 'order', 'aaSorting'), r(t, 'orderFixed', 'aaSortingFixed'), r(t, 'paging', 'bPaginate'), r(t, 'pagingType', 'sPaginationType'), r(t, 'pageLength', 'iDisplayLength'), r(t, 'searching', 'bFilter'), typeof t.sScrollX === 'boolean' && (t.sScrollX = t.sScrollX ? '100%' : ''), typeof t.scrollX === 'boolean' && (t.scrollX = t.scrollX ? '100%' : ''); const e = t.aoSearchCols; if (e) for (let n = 0, a = e.length; n < a; n++)e[n] && C(w.models.oSearch, e[n]); } function Q(t) { r(t, 'orderable', 'bSortable'), r(t, 'orderData', 'aDataSort'), r(t, 'orderSequence', 'asSorting'), r(t, 'orderDataType', 'sortDataType'); const e = t.aDataSort; typeof e !== 'number' || Array.isArray(e) || (t.aDataSort = [e]); } function tt(t) {
    let e; let n; let a; let r; w.__browser || (w.__browser = e = {}, r = (a = (n = P('<div/>').css({
      position: 'fixed', top: 0, left: -1 * P(j).scrollLeft(), height: 1, width: 1, overflow: 'hidden',
    }).append(P('<div/>').css({
      position: 'absolute', top: 1, left: 1, width: 100, overflow: 'scroll',
    }).append(P('<div/>').css({ width: '100%', height: 10 }))).appendTo('body')).children()).children(), e.barWidth = a[0].offsetWidth - a[0].clientWidth, e.bScrollOversize = r[0].offsetWidth === 100 && a[0].clientWidth !== 100, e.bScrollbarLeft = Math.round(r.offset().left) !== 1, e.bBounding = !!n[0].getBoundingClientRect().width, n.remove()), P.extend(t.oBrowser, w.__browser), t.oScroll.iBarWidth = w.__browser.barWidth;
  } function et(t, e, n, a, r, o) { let i; let l = a; let s = !1; for (n !== H && (i = n, s = !0); l !== r;)t.hasOwnProperty(l) && (i = s ? e(i, t[l], l, t) : t[l], s = !0, l += o); return i; } function nt(t, e) {
    var n = w.defaults.column; const a = t.aoColumns.length; var n = P.extend({}, w.models.oColumn, n, {
      nTh: e || y.createElement('th'), sTitle: n.sTitle || (e ? e.innerHTML : ''), aDataSort: n.aDataSort || [a], mData: n.mData || a, idx: a,
    }); var n = (t.aoColumns.push(n), t.aoPreSearchCols); n[a] = P.extend({}, w.models.oSearch, n[a]), at(t, a, P(e).data());
  } function at(t, e, n) { function a(t) { return typeof t === 'string' && t.indexOf('@') !== -1; } var e = t.aoColumns[e]; const r = t.oClasses; const o = P(e.nTh); const i = (!e.sWidthOrig && (e.sWidthOrig = o.attr('width') || null, u = (o.attr('style') || '').match(/width:\s*(\d+[pxem%]+)/)) && (e.sWidthOrig = u[1]), n !== H && n !== null && (Q(n), C(w.defaults.column, n, !0), n.mDataProp === H || n.mData || (n.mData = n.mDataProp), n.sType && (e._sManualType = n.sType), n.className && !n.sClass && (n.sClass = n.className), n.sClass && o.addClass(n.sClass), u = e.sClass, P.extend(e, n), F(e, n, 'sWidth', 'sWidthOrig'), u !== e.sClass && (e.sClass = `${u} ${e.sClass}`), n.iDataSort !== H && (e.aDataSort = [n.iDataSort]), F(e, n, 'aDataSort')), e.mData); const l = A(i); const s = e.mRender ? A(e.mRender) : null; var u = (e._bAttrSrc = P.isPlainObject(i) && (a(i.sort) || a(i.type) || a(i.filter)), e._setter = null, e.fnGetData = function (t, e, n) { const a = l(t, e, H, n); return s && e ? s(a, e, t, n) : a; }, e.fnSetData = function (t, e, n) { return b(i)(t, e, n); }, typeof i === 'number' || e._isArrayHost || (t._rowReadObject = !0), t.oFeatures.bSort || (e.bSortable = !1, o.addClass(r.sSortableNone)), P.inArray('asc', e.asSorting) !== -1); var n = P.inArray('desc', e.asSorting) !== -1; e.bSortable && (u || n) ? u && !n ? (e.sSortingClass = r.sSortableAsc, e.sSortingClassJUI = r.sSortJUIAscAllowed) : !u && n ? (e.sSortingClass = r.sSortableDesc, e.sSortingClassJUI = r.sSortJUIDescAllowed) : (e.sSortingClass = r.sSortable, e.sSortingClassJUI = r.sSortJUI) : (e.sSortingClass = r.sSortableNone, e.sSortingClassJUI = ''); } function O(t) { if (!1 !== t.oFeatures.bAutoWidth) { const e = t.aoColumns; ee(t); for (let n = 0, a = e.length; n < a; n++)e[n].nTh.style.width = e[n].sWidth; } const r = t.oScroll; r.sY === '' && r.sX === '' || Qt(t), R(t, null, 'column-sizing', [t]); } function rt(t, e) { t = it(t, 'bVisible'); return typeof t[e] === 'number' ? t[e] : null; } function ot(t, e) { t = it(t, 'bVisible'), e = P.inArray(e, t); return e !== -1 ? e : null; } function T(t) { let n = 0; return P.each(t.aoColumns, (t, e) => { e.bVisible && P(e.nTh).css('display') !== 'none' && n++; }), n; } function it(t, n) { const a = []; return P.map(t.aoColumns, (t, e) => { t[n] && a.push(e); }), a; } function lt(t) { for (var e, n, a, r, o, i, l, s = t.aoColumns, u = t.aoData, c = w.ext.type.detect, f = 0, d = s.length; f < d; f++) if (l = [], !(o = s[f]).sType && o._sManualType)o.sType = o._sManualType; else if (!o.sType) { for (e = 0, n = c.length; e < n; e++) { for (a = 0, r = u.length; a < r && (l[a] === H && (l[a] = S(t, a, f, 'type')), (i = c[e](l[a], t)) || e === c.length - 1) && (i !== 'html' || h(l[a])); a++);if (i) { o.sType = i; break; } }o.sType || (o.sType = 'string'); } } function st(t, e, n, a) { let r; let o; let i; let l; const s = t.aoColumns; if (e) for (r = e.length - 1; r >= 0; r--) for (var u, c = (u = e[r]).target !== H ? u.target : u.targets !== H ? u.targets : u.aTargets, f = 0, d = (c = Array.isArray(c) ? c : [c]).length; f < d; f++) if (typeof c[f] === 'number' && c[f] >= 0) { for (;s.length <= c[f];)nt(t); a(c[f], u); } else if (typeof c[f] === 'number' && c[f] < 0)a(s.length + c[f], u); else if (typeof c[f] === 'string') for (i = 0, l = s.length; i < l; i++)c[f] != '_all' && !P(s[i].nTh).hasClass(c[f]) || a(i, u); if (n) for (r = 0, o = n.length; r < o; r++)a(r, n[r]); } function x(t, e, n, a) { for (var r = t.aoData.length, o = P.extend(!0, {}, w.models.oRow, { src: n ? 'dom' : 'data', idx: r }), i = (o._aData = e, t.aoData.push(o), t.aoColumns), l = 0, s = i.length; l < s; l++)i[l].sType = null; t.aiDisplayMaster.push(r); e = t.rowIdFn(e); return e !== H && (t.aIds[e] = o), !n && t.oFeatures.bDeferRender || St(t, r, n, a), r; } function ut(n, t) { let a; return (t = t instanceof P ? t : P(t)).map((t, e) => (a = mt(n, e), x(n, a.data, e, a.cells))); } function S(t, e, n, a) { a === 'search' ? a = 'filter' : a === 'order' && (a = 'sort'); const r = t.iDraw; const o = t.aoColumns[n]; const i = t.aoData[e]._aData; const l = o.sDefaultContent; let s = o.fnGetData(i, a, { settings: t, row: e, col: n }); if (s === H) return t.iDrawError != r && l === null && (W(t, 0, `Requested unknown parameter ${typeof o.mData === 'function' ? '{function}' : `'${o.mData}'`} for row ${e}, column ${n}`, 4), t.iDrawError = r), l; if (s !== i && s !== null || l === null || a === H) { if (typeof s === 'function') return s.call(i); } else s = l; return s === null && a === 'display' ? '' : a === 'filter' && (e = w.ext.type.search)[o.sType] ? e[o.sType](s) : s; } function ct(t, e, n, a) { const r = t.aoColumns[n]; const o = t.aoData[e]._aData; r.fnSetData(o, a, { settings: t, row: e, col: n }); } var ft = /\[.*?\]$/; var g = /\(\)$/; function dt(t) { return P.map(t.match(/(\\.|[^\.])+/g) || [''], (t) => t.replace(/\\\./g, '.')); } var A = w.util.get; var b = w.util.set; function ht(t) { return N(t.aoData, '_aData'); } function pt(t) { t.aoData.length = 0, t.aiDisplayMaster.length = 0, t.aiDisplay.length = 0, t.aIds = {}; } function gt(t, e, n) { for (var a = -1, r = 0, o = t.length; r < o; r++)t[r] == e ? a = r : t[r] > e && t[r]--; a != -1 && n === H && t.splice(a, 1); } function bt(n, a, t, e) { function r(t, e) { for (;t.childNodes.length;)t.removeChild(t.firstChild); t.innerHTML = S(n, a, e, 'display'); } let o; let i; const l = n.aoData[a]; if (t !== 'dom' && (t && t !== 'auto' || l.src !== 'dom')) { const s = l.anCells; if (s) if (e !== H)r(s[e], e); else for (o = 0, i = s.length; o < i; o++)r(s[o], o); } else l._aData = mt(n, l, e, e === H ? H : l._aData).data; l._aSortData = null, l._aFilterData = null; const u = n.aoColumns; if (e !== H)u[e].sType = null; else { for (o = 0, i = u.length; o < i; o++)u[o].sType = null; vt(n, l); } } function mt(t, e, n, a) { function r(t, e) { let n; typeof t === 'string' && (n = t.indexOf('@')) !== -1 && (n = t.substring(n + 1), b(t)(a, e.getAttribute(n))); } function o(t) { n !== H && n !== f || (l = d[f], s = t.innerHTML.trim(), l && l._bAttrSrc ? (b(l.mData._)(a, s), r(l.mData.sort, t), r(l.mData.type, t), r(l.mData.filter, t)) : h ? (l._setter || (l._setter = b(l.mData)), l._setter(a, s)) : a[f] = s), f++; } let i; let l; let s; let u = []; let c = e.firstChild; var f = 0; var d = t.aoColumns; var h = t._rowReadObject; a = a !== H ? a : h ? {} : []; if (c) for (;c;)(i = c.nodeName.toUpperCase()) != 'TD' && i != 'TH' || (o(c), u.push(c)), c = c.nextSibling; else for (let p = 0, g = (u = e.anCells).length; p < g; p++)o(u[p]); var e = e.firstChild ? e : e.nTr; return e && (e = e.getAttribute('id')) && b(t.rowId)(a, e), { data: a, cells: u }; } function St(t, e, n, a) { let r; let o; let i; let l; let s; let u; const c = t.aoData[e]; const f = c._aData; const d = []; if (c.nTr === null) { for (r = n || y.createElement('tr'), c.nTr = r, c.anCells = d, r._DT_RowIndex = e, vt(t, c), l = 0, s = t.aoColumns.length; l < s; l++)i = t.aoColumns[l], (o = (u = !n) ? y.createElement(i.sCellType) : a[l]) || W(t, 0, 'Incorrect column count', 18), o._DT_CellIndex = { row: e, column: l }, d.push(o), !u && (!i.mRender && i.mData === l || P.isPlainObject(i.mData) && i.mData._ === `${l}.display`) || (o.innerHTML = S(t, e, l, 'display')), i.sClass && (o.className += ` ${i.sClass}`), i.bVisible && !n ? r.appendChild(o) : !i.bVisible && n && o.parentNode.removeChild(o), i.fnCreatedCell && i.fnCreatedCell.call(t.oInstance, o, S(t, e, l), f, e, l); R(t, 'aoRowCreatedCallback', null, [r, f, e, d]); } } function vt(t, e) { const n = e.nTr; const a = e._aData; n && ((t = t.rowIdFn(a)) && (n.id = t), a.DT_RowClass && (t = a.DT_RowClass.split(' '), e.__rowc = e.__rowc ? z(e.__rowc.concat(t)) : t, P(n).removeClass(e.__rowc.join(' ')).addClass(a.DT_RowClass)), a.DT_RowAttr && P(n).attr(a.DT_RowAttr), a.DT_RowData) && P(n).data(a.DT_RowData); } function yt(t) { let e; let n; let a; const r = t.nTHead; const o = t.nTFoot; const i = P('th, td', r).length === 0; const l = t.oClasses; const s = t.aoColumns; for (i && (n = P('<tr/>').appendTo(r)), c = 0, f = s.length; c < f; c++)a = s[c], e = P(a.nTh).addClass(a.sClass), i && e.appendTo(n), t.oFeatures.bSort && (e.addClass(a.sSortingClass), !1 !== a.bSortable) && (e.attr('tabindex', t.iTabIndex).attr('aria-controls', t.sTableId), ue(t, a.nTh, c)), a.sTitle != e[0].innerHTML && e.html(a.sTitle), ve(t, 'header')(t, e, a, l); if (i && wt(t.aoHeader, r), P(r).children('tr').children('th, td').addClass(l.sHeaderTH), P(o).children('tr').children('th, td').addClass(l.sFooterTH), o !== null) for (var u = t.aoFooter[0], c = 0, f = u.length; c < f; c++)(a = s[c]) ? (a.nTf = u[c].cell, a.sClass && P(a.nTf).addClass(a.sClass)) : W(t, 0, 'Incorrect column count', 18); } function Dt(t, e, n) { let a; let r; let o; let i; let l; let s; let u; let c; let f; const d = []; const h = []; const p = t.aoColumns.length; if (e) { for (n === H && (n = !1), a = 0, r = e.length; a < r; a++) { for (d[a] = e[a].slice(), d[a].nTr = e[a].nTr, o = p - 1; o >= 0; o--)t.aoColumns[o].bVisible || n || d[a].splice(o, 1); h.push([]); } for (a = 0, r = d.length; a < r; a++) { if (u = d[a].nTr) for (;s = u.firstChild;)u.removeChild(s); for (o = 0, i = d[a].length; o < i; o++) if (f = c = 1, h[a][o] === H) { for (u.appendChild(d[a][o].cell), h[a][o] = 1; d[a + c] !== H && d[a][o].cell == d[a + c][o].cell;)h[a + c][o] = 1, c++; for (;d[a][o + f] !== H && d[a][o].cell == d[a][o + f].cell;) { for (l = 0; l < c; l++)h[a + l][o + f] = 1; f++; }P(d[a][o].cell).attr('rowspan', c).attr('colspan', f); } } } } function v(t, e) { n = E(s = t) == 'ssp', (l = s.iInitDisplayStart) !== H && l !== -1 && (s._iDisplayStart = !n && l >= s.fnRecordsDisplay() ? 0 : l, s.iInitDisplayStart = -1); var n = R(t, 'aoPreDrawCallback', 'preDraw', [t]); if (P.inArray(!1, n) !== -1)D(t, !1); else { const a = []; let r = 0; const o = t.asStripeClasses; const i = o.length; var l = t.oLanguage; var s = E(t) == 'ssp'; const u = t.aiDisplay; var n = t._iDisplayStart; const c = t.fnDisplayEnd(); if (t.bDrawing = !0, t.bDeferLoading)t.bDeferLoading = !1, t.iDraw++, D(t, !1); else if (s) { if (!t.bDestroying && !e) return void xt(t); } else t.iDraw++; if (u.length !== 0) for (let f = s ? t.aoData.length : c, d = s ? 0 : n; d < f; d++) { var h; const p = u[d]; const g = t.aoData[p]; const b = (g.nTr === null && St(t, p), g.nTr); i !== 0 && (h = o[r % i], g._sRowStripe != h) && (P(b).removeClass(g._sRowStripe).addClass(h), g._sRowStripe = h), R(t, 'aoRowCallback', null, [b, g._aData, r, d, p]), a.push(b), r++; } else { e = l.sZeroRecords; t.iDraw == 1 && E(t) == 'ajax' ? e = l.sLoadingRecords : l.sEmptyTable && t.fnRecordsTotal() === 0 && (e = l.sEmptyTable), a[0] = P('<tr/>', { class: i ? o[0] : '' }).append(P('<td />', { valign: 'top', colSpan: T(t), class: t.oClasses.sRowEmpty }).html(e))[0]; }R(t, 'aoHeaderCallback', 'header', [P(t.nTHead).children('tr')[0], ht(t), n, c, u]), R(t, 'aoFooterCallback', 'footer', [P(t.nTFoot).children('tr')[0], ht(t), n, c, u]); s = P(t.nTBody); s.children().detach(), s.append(P(a)), R(t, 'aoDrawCallback', 'draw', [t]), t.bSorted = !1, t.bFiltered = !1, t.bDrawing = !1; } } function u(t, e) { var n = t.oFeatures; const a = n.bSort; var n = n.bFilter; a && ie(t), n ? Rt(t, t.oPreviousSearch) : t.aiDisplay = t.aiDisplayMaster.slice(), !0 !== e && (t._iDisplayStart = 0), t._drawHold = e, v(t), t._drawHold = !1; } function _t(t) { for (var e, n, a, r, o, i, l, s = t.oClasses, u = P(t.nTable), u = P('<div/>').insertBefore(u), c = t.oFeatures, f = P('<div/>', { id: `${t.sTableId}_wrapper`, class: s.sWrapper + (t.nTFoot ? '' : ` ${s.sNoFooter}`) }), d = (t.nHolding = u[0], t.nTableWrapper = f[0], t.nTableReinsertBefore = t.nTable.nextSibling, t.sDom.split('')), h = 0; h < d.length; h++) { if (e = null, (n = d[h]) == '<') { if (a = P('<div/>')[0], (r = d[h + 1]) == "'" || r == '"') { for (o = '', i = 2; d[h + i] != r;)o += d[h + i], i++; o == 'H' ? o = s.sJUIHeader : o == 'F' && (o = s.sJUIFooter), o.indexOf('.') != -1 ? (l = o.split('.'), a.id = l[0].substr(1, l[0].length - 1), a.className = l[1]) : o.charAt(0) == '#' ? a.id = o.substr(1, o.length - 1) : a.className = o, h += i; }f.append(a), f = P(a); } else if (n == '>')f = f.parent(); else if (n == 'l' && c.bPaginate && c.bLengthChange)e = Gt(t); else if (n == 'f' && c.bFilter)e = Lt(t); else if (n == 'r' && c.bProcessing)e = Zt(t); else if (n == 't')e = Kt(t); else if (n == 'i' && c.bInfo)e = Ut(t); else if (n == 'p' && c.bPaginate)e = zt(t); else if (w.ext.feature.length !== 0) for (let p = w.ext.feature, g = 0, b = p.length; g < b; g++) if (n == p[g].cFeature) { e = p[g].fnInit(t); break; }e && ((l = t.aanFeatures)[n] || (l[n] = []), l[n].push(e), f.append(e)); }u.replaceWith(f), t.nHolding = null; } function wt(t, e) { let n; let a; let r; let o; let i; let l; let s; let u; let c; let f; const d = P(e).children('tr'); for (t.splice(0, t.length), r = 0, l = d.length; r < l; r++)t.push([]); for (r = 0, l = d.length; r < l; r++) for (a = (n = d[r]).firstChild; a;) { if (a.nodeName.toUpperCase() == 'TD' || a.nodeName.toUpperCase() == 'TH') for (u = (u = +a.getAttribute('colspan')) && u != 0 && u != 1 ? u : 1, c = (c = +a.getAttribute('rowspan')) && c != 0 && c != 1 ? c : 1, s = (function (t, e, n) { for (let a = t[e]; a[n];)n++; return n; }(t, r, 0)), f = u == 1, i = 0; i < u; i++) for (o = 0; o < c; o++)t[r + o][s + i] = { cell: a, unique: f }, t[r + o].nTr = n; a = a.nextSibling; } } function Ct(t, e, n) { const a = []; n || (n = t.aoHeader, e && wt(n = [], e)); for (let r = 0, o = n.length; r < o; r++) for (let i = 0, l = n[r].length; i < l; i++)!n[r][i].unique || a[i] && t.bSortCellsTop || (a[i] = n[r][i].cell); return a; } function Tt(r, t, n) {
    function e(t) { let e = r.jqXHR ? r.jqXHR.status : null; (t === null || typeof e === 'number' && e == 204) && Ft(r, t = {}, []), (e = t.error || t.sError) && W(r, 0, e), r.json = t, R(r, null, 'xhr', [r, t, r.jqXHR]), n(t); }R(r, 'aoServerParams', 'serverParams', [t]), t && Array.isArray(t) && (a = {}, o = /(.*?)\[\]$/, P.each(t, (t, e) => { let n = e.name.match(o); n ? (n = n[0], a[n] || (a[n] = []), a[n].push(e.value)) : a[e.name] = e.value; }), t = a); let a; let o; let i; const l = r.ajax; const s = r.oInstance; var u = (P.isPlainObject(l) && l.data && (u = typeof (i = l.data) === 'function' ? i(t, r) : i, t = typeof i === 'function' && u ? u : P.extend(!0, t, u), delete l.data), {
      data: t, success: e, dataType: 'json', cache: !1, type: r.sServerMethod, error(t, e, n) { const a = R(r, null, 'xhr', [r, null, r.jqXHR]); P.inArray(!0, a) === -1 && (e == 'parsererror' ? W(r, 0, 'Invalid JSON response', 1) : t.readyState === 4 && W(r, 0, 'Ajax error', 7)), D(r, !1); },
    }); r.oAjaxData = t, R(r, null, 'preXhr', [r, t]), r.fnServerData ? r.fnServerData.call(s, r.sAjaxSource, P.map(t, (t, e) => ({ name: e, value: t })), e, r) : r.sAjaxSource || typeof l === 'string' ? r.jqXHR = P.ajax(P.extend(u, { url: l || r.sAjaxSource })) : typeof l === 'function' ? r.jqXHR = l.call(s, t, e, r) : (r.jqXHR = P.ajax(P.extend(u, l)), l.data = i);
  } function xt(e) { e.iDraw++, D(e, !0); const n = e._drawHold; Tt(e, At(e), (t) => { e._drawHold = n, It(e, t), e._drawHold = !1; }); } function At(t) {
    for (var e, n, a, r = t.aoColumns, o = r.length, i = t.oFeatures, l = t.oPreviousSearch, s = t.aoPreSearchCols, u = [], c = I(t), f = t._iDisplayStart, d = !1 !== i.bPaginate ? t._iDisplayLength : -1, h = function (t, e) { u.push({ name: t, value: e }); }, p = (h('sEcho', t.iDraw), h('iColumns', o), h('sColumns', N(r, 'sName').join(',')), h('iDisplayStart', f), h('iDisplayLength', d), {
        draw: t.iDraw, columns: [], order: [], start: f, length: d, search: { value: l.sSearch, regex: l.bRegex },
      }), g = 0; g < o; g++) {
      n = r[g], a = s[g], e = typeof n.mData === 'function' ? 'function' : n.mData, p.columns.push({
        data: e, name: n.sName, searchable: n.bSearchable, orderable: n.bSortable, search: { value: a.sSearch, regex: a.bRegex },
      }), h(`mDataProp_${g}`, e), i.bFilter && (h(`sSearch_${g}`, a.sSearch), h(`bRegex_${g}`, a.bRegex), h(`bSearchable_${g}`, n.bSearchable)), i.bSort && h(`bSortable_${g}`, n.bSortable);
    } i.bFilter && (h('sSearch', l.sSearch), h('bRegex', l.bRegex)), i.bSort && (P.each(c, (t, e) => { p.order.push({ column: e.col, dir: e.dir }), h(`iSortCol_${t}`, e.col), h(`sSortDir_${t}`, e.dir); }), h('iSortingCols', c.length)); f = w.ext.legacy.ajax; return f === null ? t.sAjaxSource ? u : p : f ? u : p;
  } function It(t, n) { function e(t, e) { return n[t] !== H ? n[t] : n[e]; } let a = Ft(t, n); const r = e('sEcho', 'draw'); const o = e('iTotalRecords', 'recordsTotal'); const i = e('iTotalDisplayRecords', 'recordsFiltered'); if (r !== H) { if (+r < t.iDraw) return; t.iDraw = +r; }a = a || [], pt(t), t._iRecordsTotal = parseInt(o, 10), t._iRecordsDisplay = parseInt(i, 10); for (let l = 0, s = a.length; l < s; l++)x(t, a[l]); t.aiDisplay = t.aiDisplayMaster.slice(), v(t, !0), t._bInitComplete || qt(t, n), D(t, !1); } function Ft(t, e, n) { t = P.isPlainObject(t.ajax) && t.ajax.dataSrc !== H ? t.ajax.dataSrc : t.sAjaxDataProp; if (!n) return t === 'data' ? e.aaData || e[t] : t !== '' ? A(t)(e) : e; b(t)(e, n); } function Lt(n) {
    function e(t) {
      i.f; const e = this.value || ''; o.return && t.key !== 'Enter' || e != o.sSearch && (Rt(n, {
        sSearch: e, bRegex: o.bRegex, bSmart: o.bSmart, bCaseInsensitive: o.bCaseInsensitive, return: o.return,
      }), n._iDisplayStart = 0, v(n));
    } var t = n.oClasses; const a = n.sTableId; const r = n.oLanguage; var o = n.oPreviousSearch; var i = n.aanFeatures; var l = `<input type="search" class="${t.sFilterInput}"/>`; var s = (s = r.sSearch).match(/_INPUT_/) ? s.replace('_INPUT_', l) : s + l; var l = P('<div/>', { id: i.f ? null : `${a}_filter`, class: t.sFilter }).append(P('<label/>').append(s)); var t = n.searchDelay !== null ? n.searchDelay : E(n) === 'ssp' ? 400 : 0; var u = P('input', l).val(o.sSearch).attr('placeholder', r.sSearchPlaceholder).on('keyup.DT search.DT input.DT paste.DT cut.DT', t ? ne(e, t) : e)
      .on('mouseup.DT', (t) => { setTimeout(() => { e.call(u[0], t); }, 10); })
      .on('keypress.DT', (t) => { if (t.keyCode == 13) return !1; })
      .attr('aria-controls', a); return P(n.nTable).on('search.dt.DT', (t, e) => { if (n === e) try { u[0] !== y.activeElement && u.val(o.sSearch); } catch (t) {} }), l[0];
  } function Rt(t, e, n) { function a(t) { o.sSearch = t.sSearch, o.bRegex = t.bRegex, o.bSmart = t.bSmart, o.bCaseInsensitive = t.bCaseInsensitive, o.return = t.return; } function r(t) { return t.bEscapeRegex !== H ? !t.bEscapeRegex : t.bRegex; } var o = t.oPreviousSearch; const i = t.aoPreSearchCols; if (lt(t), E(t) != 'ssp') { Ht(t, e.sSearch, n, r(e), e.bSmart, e.bCaseInsensitive), a(e); for (let l = 0; l < i.length; l++)jt(t, i[l].sSearch, l, r(i[l]), i[l].bSmart, i[l].bCaseInsensitive); Pt(t); } else a(e); t.bFiltered = !0, R(t, null, 'search', [t]); } function Pt(t) { for (var e, n, a = w.ext.search, r = t.aiDisplay, o = 0, i = a.length; o < i; o++) { for (var l = [], s = 0, u = r.length; s < u; s++)n = r[s], e = t.aoData[n], a[o](t, e._aFilterData, n, e._aData, s) && l.push(n); r.length = 0, P.merge(r, l); } } function jt(t, e, n, a, r, o) { if (e !== '') { for (var i, l = [], s = t.aiDisplay, u = Nt(e, a, r, o), c = 0; c < s.length; c++)i = t.aoData[s[c]]._aFilterData[n], u.test(i) && l.push(s[c]); t.aiDisplay = l; } } function Ht(t, e, n, a, r, o) { let i; let l; let s; const u = Nt(e, a, r, o); var r = t.oPreviousSearch.sSearch; var o = t.aiDisplayMaster; const c = []; if (w.ext.search.length !== 0 && (n = !0), l = Wt(t), e.length <= 0)t.aiDisplay = o.slice(); else { for ((l || n || a || r.length > e.length || e.indexOf(r) !== 0 || t.bSorted) && (t.aiDisplay = o.slice()), i = t.aiDisplay, s = 0; s < i.length; s++)u.test(t.aoData[i[s]]._sFilterRow) && c.push(i[s]); t.aiDisplay = c; } } function Nt(t, e, n, a) { return t = e ? t : Ot(t), n && (t = `^(?=.*?${P.map(t.match(/["\u201C][^"\u201D]+["\u201D]|[^ ]+/g) || [''], (t) => { let e; return t.charAt(0) === '"' ? t = (e = t.match(/^"(.*)"$/)) ? e[1] : t : t.charAt(0) === '“' && (t = (e = t.match(/^\u201C(.*)\u201D$/)) ? e[1] : t), t.replace('"', ''); }).join(')(?=.*?')}).*$`), new RegExp(t, a ? 'i' : ''); } var Ot = w.util.escapeRegex; const kt = P('<div>')[0]; const Mt = kt.textContent !== H; function Wt(t) { for (var e, n, a, r, o, i = t.aoColumns, l = !1, s = 0, u = t.aoData.length; s < u; s++) if (!(o = t.aoData[s])._aFilterData) { for (a = [], e = 0, n = i.length; e < n; e++)i[e].bSearchable ? typeof (r = (r = S(t, s, e, 'filter')) === null ? '' : r) !== 'string' && r.toString && (r = r.toString()) : r = '', r.indexOf && r.indexOf('&') !== -1 && (kt.innerHTML = r, r = Mt ? kt.textContent : kt.innerText), r.replace && (r = r.replace(/[\r\n\u2028]/g, '')), a.push(r); o._aFilterData = a, o._sFilterRow = a.join('  '), l = !0; } return l; } function Et(t) {
    return {
      search: t.sSearch, smart: t.bSmart, regex: t.bRegex, caseInsensitive: t.bCaseInsensitive,
    };
  } function Bt(t) {
    return {
      sSearch: t.search, bSmart: t.smart, bRegex: t.regex, bCaseInsensitive: t.caseInsensitive,
    };
  } function Ut(t) { const e = t.sTableId; const n = t.aanFeatures.i; const a = P('<div/>', { class: t.oClasses.sInfo, id: n ? null : `${e}_info` }); return n || (t.aoDrawCallback.push({ fn: Vt, sName: 'information' }), a.attr('role', 'status').attr('aria-live', 'polite'), P(t.nTable).attr('aria-describedby', `${e}_info`)), a[0]; } function Vt(t) { let e; let n; let a; let r; let o; let i; const l = t.aanFeatures.i; l.length !== 0 && (i = t.oLanguage, e = t._iDisplayStart + 1, n = t.fnDisplayEnd(), a = t.fnRecordsTotal(), o = (r = t.fnRecordsDisplay()) ? i.sInfo : i.sInfoEmpty, r !== a && (o += ` ${i.sInfoFiltered}`), o = Xt(t, o += i.sInfoPostFix), (i = i.fnInfoCallback) !== null && (o = i.call(t.oInstance, t, e, n, a, r, o)), P(l).html(o)); } function Xt(t, e) {
    const n = t.fnFormatNumber; const a = t._iDisplayStart + 1; const r = t._iDisplayLength; const o = t.fnRecordsDisplay(); const i = r === -1; return e.replace(/_START_/g, n.call(t, a)).replace(/_END_/g, n.call(t, t.fnDisplayEnd())).replace(/_MAX_/g, n.call(t, t.fnRecordsTotal())).replace(/_TOTAL_/g, n.call(t, o))
      .replace(/_PAGE_/g, n.call(t, i ? 1 : Math.ceil(a / r)))
      .replace(/_PAGES_/g, n.call(t, i ? 1 : Math.ceil(o / r)));
  } function Jt(n) { let a; let t; let e; const r = n.iInitDisplayStart; const o = n.aoColumns; let i = n.oFeatures; const l = n.bDeferLoading; if (n.bInitialised) { for (_t(n), yt(n), Dt(n, n.aoHeader), Dt(n, n.aoFooter), D(n, !0), i.bAutoWidth && ee(n), a = 0, t = o.length; a < t; a++)(e = o[a]).sWidth && (e.nTh.style.width = M(e.sWidth)); R(n, null, 'preInit', [n]), u(n); i = E(n); i == 'ssp' && !l || (i == 'ajax' ? Tt(n, [], (t) => { const e = Ft(n, t); for (a = 0; a < e.length; a++)x(n, e[a]); n.iInitDisplayStart = r, u(n), D(n, !1), qt(n, t); }) : (D(n, !1), qt(n))); } else setTimeout(() => { Jt(n); }, 200); } function qt(t, e) { t._bInitComplete = !0, (e || t.oInit.aaData) && O(t), R(t, null, 'plugin-init', [t, e]), R(t, 'aoInitComplete', 'init', [t, e]); } function $t(t, e) { e = parseInt(e, 10); t._iDisplayLength = e, Se(t), R(t, null, 'length', [t, e]); } function Gt(a) { for (var t = a.oClasses, e = a.sTableId, n = a.aLengthMenu, r = Array.isArray(n[0]), o = r ? n[0] : n, i = r ? n[1] : n, l = P('<select/>', { name: `${e}_length`, 'aria-controls': e, class: t.sLengthSelect }), s = 0, u = o.length; s < u; s++)l[0][s] = new Option(typeof i[s] === 'number' ? a.fnFormatNumber(i[s]) : i[s], o[s]); const c = P('<div><label/></div>').addClass(t.sLength); return a.aanFeatures.l || (c[0].id = `${e}_length`), c.children().append(a.oLanguage.sLengthMenu.replace('_MENU_', l[0].outerHTML)), P('select', c).val(a._iDisplayLength).on('change.DT', function (t) { $t(a, P(this).val()), v(a); }), P(a.nTable).on('length.dt.DT', (t, e, n) => { a === e && P('select', c).val(n); }), c[0]; } function zt(t) { function c(t) { v(t); } var e = t.sPaginationType; const f = w.ext.pager[e]; const d = typeof f === 'function'; var e = P('<div/>').addClass(t.oClasses.sPaging + e)[0]; const h = t.aanFeatures; return d || f.fnInit(t, e, c), h.p || (e.id = `${t.sTableId}_paginate`, t.aoDrawCallback.push({ fn(t) { if (d) for (let e = t._iDisplayStart, n = t._iDisplayLength, a = t.fnRecordsDisplay(), r = n === -1, o = r ? 0 : Math.ceil(e / n), i = r ? 1 : Math.ceil(a / n), l = f(o, i), s = 0, u = h.p.length; s < u; s++)ve(t, 'pageButton')(t, h.p[s], s, l, o, i); else f.fnUpdate(t, c); }, sName: 'pagination' })), e; } function Yt(t, e, n) { let a = t._iDisplayStart; const r = t._iDisplayLength; var o = t.fnRecordsDisplay(); var o = (o === 0 || r === -1 ? a = 0 : typeof e === 'number' ? o < (a = e * r) && (a = 0) : e == 'first' ? a = 0 : e == 'previous' ? (a = r >= 0 ? a - r : 0) < 0 && (a = 0) : e == 'next' ? a + r < o && (a += r) : e == 'last' ? a = Math.floor((o - 1) / r) * r : W(t, 0, `Unknown paging action: ${e}`, 5), t._iDisplayStart !== a); return t._iDisplayStart = a, o ? (R(t, null, 'page', [t]), n && v(t)) : R(t, null, 'page-nc', [t]), o; } function Zt(t) { return P('<div/>', { id: t.aanFeatures.r ? null : `${t.sTableId}_processing`, class: t.oClasses.sProcessing, role: 'status' }).html(t.oLanguage.sProcessing).append('<div><div></div><div></div><div></div><div></div></div>').insertBefore(t.nTable)[0]; } function D(t, e) { t.oFeatures.bProcessing && P(t.aanFeatures.r).css('display', e ? 'block' : 'none'), R(t, null, 'processing', [t, e]); } function Kt(t) {
    let e; let n; let a; let r; let o; let i; let l; let s; let u; let c; let f; let d; const h = P(t.nTable); const p = t.oScroll; return p.sX === '' && p.sY === '' ? t.nTable : (e = p.sX, n = p.sY, a = t.oClasses, o = (r = h.children('caption')).length ? r[0]._captionSide : null, s = P(h[0].cloneNode(!1)), i = P(h[0].cloneNode(!1)), u = function (t) { return t ? M(t) : null; }, (l = h.children('tfoot')).length || (l = null), s = P(f = '<div/>', { class: a.sScrollWrapper }).append(P(f, { class: a.sScrollHead }).css({
      overflow: 'hidden', position: 'relative', border: 0, width: e ? u(e) : '100%',
    }).append(P(f, { class: a.sScrollHeadInner }).css({ 'box-sizing': 'content-box', width: p.sXInner || '100%' }).append(s.removeAttr('id').css('margin-left', 0).append(o === 'top' ? r : null).append(h.children('thead'))))).append(P(f, { class: a.sScrollBody }).css({ position: 'relative', overflow: 'auto', width: u(e) }).append(h)), l && s.append(P(f, { class: a.sScrollFoot }).css({ overflow: 'hidden', border: 0, width: e ? u(e) : '100%' }).append(P(f, { class: a.sScrollFootInner }).append(i.removeAttr('id').css('margin-left', 0).append(o === 'bottom' ? r : null).append(h.children('tfoot'))))), u = s.children(), c = u[0], f = u[1], d = l ? u[2] : null, e && P(f).on('scroll.DT', function (t) { const e = this.scrollLeft; c.scrollLeft = e, l && (d.scrollLeft = e); }), P(f).css('max-height', n), p.bCollapse || P(f).css('height', n), t.nScrollHead = c, t.nScrollBody = f, t.nScrollFoot = d, t.aoDrawCallback.push({ fn: Qt, sName: 'scrolling' }), s[0]);
  } function Qt(n) { function t(t) { (t = t.style).paddingTop = '0', t.paddingBottom = '0', t.borderTopWidth = '0', t.borderBottomWidth = '0', t.height = 0; } let e; let a; let r; let o; let i; var l = n.oScroll; const s = l.sX; const u = l.sXInner; const c = l.sY; var l = l.iBarWidth; let f = P(n.nScrollHead); const d = f[0].style; var h = f.children('div'); const p = h[0].style; var h = h.children('table'); const g = n.nScrollBody; const b = P(g); const m = g.style; const S = P(n.nScrollFoot).children('div'); const v = S.children('table'); let y = P(n.nTHead); const D = P(n.nTable); const _ = D[0]; const w = _.style; const C = n.nTFoot ? P(n.nTFoot) : null; const T = n.oBrowser; const x = T.bScrollOversize; const A = (N(n.aoColumns, 'nTh'), []); const I = []; const F = []; const L = []; let R = g.scrollHeight > g.clientHeight; n.scrollBarVis !== R && n.scrollBarVis !== H ? (n.scrollBarVis = R, O(n)) : (n.scrollBarVis = R, D.children('thead, tfoot').remove(), C && (R = C.clone().prependTo(D), i = C.find('tr'), a = R.find('tr'), R.find('[id]').removeAttr('id')), R = y.clone().prependTo(D), y = y.find('tr'), e = R.find('tr'), R.find('th, td').removeAttr('tabindex'), R.find('[id]').removeAttr('id'), s || (m.width = '100%', f[0].style.width = '100%'), P.each(Ct(n, R), (t, e) => { r = rt(n, t), e.style.width = n.aoColumns[r].sWidth; }), C && k((t) => { t.style.width = ''; }, a), f = D.outerWidth(), s === '' ? (w.width = '100%', x && (D.find('tbody').height() > g.offsetHeight || b.css('overflow-y') == 'scroll') && (w.width = M(D.outerWidth() - l)), f = D.outerWidth()) : u !== '' && (w.width = M(u), f = D.outerWidth()), k(t, e), k((t) => { const e = j.getComputedStyle ? j.getComputedStyle(t).width : M(P(t).width()); F.push(t.innerHTML), A.push(e); }, e), k((t, e) => { t.style.width = A[e]; }, y), P(e).css('height', 0), C && (k(t, a), k((t) => { L.push(t.innerHTML), I.push(M(P(t).css('width'))); }, a), k((t, e) => { t.style.width = I[e]; }, i), P(a).height(0)), k((t, e) => { t.innerHTML = `<div class="dataTables_sizing">${F[e]}</div>`, t.childNodes[0].style.height = '0', t.childNodes[0].style.overflow = 'hidden', t.style.width = A[e]; }, e), C && k((t, e) => { t.innerHTML = `<div class="dataTables_sizing">${L[e]}</div>`, t.childNodes[0].style.height = '0', t.childNodes[0].style.overflow = 'hidden', t.style.width = I[e]; }, a), Math.round(D.outerWidth()) < Math.round(f) ? (o = g.scrollHeight > g.offsetHeight || b.css('overflow-y') == 'scroll' ? f + l : f, x && (g.scrollHeight > g.offsetHeight || b.css('overflow-y') == 'scroll') && (w.width = M(o - l)), s !== '' && u === '' || W(n, 1, 'Possible column misalignment', 6)) : o = '100%', m.width = M(o), d.width = M(o), C && (n.nScrollFoot.style.width = M(o)), c || x && (m.height = M(_.offsetHeight + l)), R = D.outerWidth(), h[0].style.width = M(R), p.width = M(R), y = D.height() > g.clientHeight || b.css('overflow-y') == 'scroll', p[i = `padding${T.bScrollbarLeft ? 'Left' : 'Right'}`] = y ? `${l}px` : '0px', C && (v[0].style.width = M(R), S[0].style.width = M(R), S[0].style[i] = y ? `${l}px` : '0px'), D.children('colgroup').insertBefore(D.children('thead')), b.trigger('scroll'), !n.bSorted && !n.bFiltered || n._drawHold || (g.scrollTop = 0)); } function k(t, e, n) { for (var a, r, o = 0, i = 0, l = e.length; i < l;) { for (a = e[i].firstChild, r = n ? n[i].firstChild : null; a;)a.nodeType === 1 && (n ? t(a, r, o) : t(a, o), o++), a = a.nextSibling, r = n ? r.nextSibling : null; i++; } } const te = /<.*?>/g; function ee(t) {
    let e; let n; const a = t.nTable; const r = t.aoColumns; var o = t.oScroll; const i = o.sY; const l = o.sX; var o = o.sXInner; const s = r.length; const u = it(t, 'bVisible'); let c = P('th', t.nTHead); let f = a.getAttribute('width'); const d = a.parentNode; let h = !1; const p = t.oBrowser; const g = p.bScrollOversize; var b = a.style.width; for (b && b.indexOf('%') !== -1 && (f = b), D = 0; D < u.length; D++)(e = r[u[D]]).sWidth !== null && (e.sWidth = ae(e.sWidthOrig, d), h = !0); if (g || !h && !l && !i && s == T(t) && s == c.length) for (D = 0; D < s; D++) { const m = rt(t, D); m !== null && (r[m].sWidth = M(c.eq(D).width())); } else {
      var b = P(a).clone().css('visibility', 'hidden').removeAttr('id'); const S = (b.find('tbody tr').remove(), P('<tr/>').appendTo(b.find('tbody'))); for (b.find('thead, tfoot').remove(), b.append(P(t.nTHead).clone()).append(P(t.nTFoot).clone()), b.find('tfoot th, tfoot td').css('width', ''), c = Ct(t, b.find('thead')[0]), D = 0; D < u.length; D++) {
        e = r[u[D]], c[D].style.width = e.sWidthOrig !== null && e.sWidthOrig !== '' ? M(e.sWidthOrig) : '', e.sWidthOrig && l && P(c[D]).append(P('<div/>').css({
          width: e.sWidthOrig, margin: 0, padding: 0, border: 0, height: 1,
        }));
      } if (t.aoData.length) for (D = 0; D < u.length; D++)e = r[n = u[D]], P(re(t, n)).clone(!1).append(e.sContentPadding).appendTo(S); P('[name]', b).removeAttr('name'); for (var v = P('<div/>').css(l || i ? {
          position: 'absolute', top: 0, left: 0, height: 1, right: 0, overflow: 'hidden',
        } : {}).append(b).appendTo(d), y = (l && o ? b.width(o) : l ? (b.css('width', 'auto'), b.removeAttr('width'), b.width() < d.clientWidth && f && b.width(d.clientWidth)) : i ? b.width(d.clientWidth) : f && b.width(f), 0), D = 0; D < u.length; D++) { var _ = P(c[D]); const w = _.outerWidth() - _.width(); var _ = p.bBounding ? Math.ceil(c[D].getBoundingClientRect().width) : _.outerWidth(); y += _, r[u[D]].sWidth = M(_ - w); }a.style.width = M(y), v.remove();
    }f && (a.style.width = M(f)), !f && !l || t._reszEvt || (o = function () { P(j).on(`resize.DT-${t.sInstance}`, ne(() => { O(t); })); }, g ? setTimeout(o, 1e3) : o(), t._reszEvt = !0);
  } var ne = w.util.throttle; function ae(t, e) { return t ? (e = (t = P('<div/>').css('width', M(t)).appendTo(e || y.body))[0].offsetWidth, t.remove(), e) : 0; } function re(t, e) { let n; const a = oe(t, e); return a < 0 ? null : (n = t.aoData[a]).nTr ? n.anCells[e] : P('<td/>').html(S(t, a, e, 'display'))[0]; } function oe(t, e) { for (var n, a = -1, r = -1, o = 0, i = t.aoData.length; o < i; o++)(n = (n = (n = `${S(t, o, e, 'display')}`).replace(te, '')).replace(/&nbsp;/g, ' ')).length > a && (a = n.length, r = o); return r; } function M(t) { return t === null ? '0px' : typeof t === 'number' ? t < 0 ? '0px' : `${t}px` : t.match(/\d$/) ? `${t}px` : t; } function I(t) {
    function e(t) { t.length && !Array.isArray(t[0]) ? h.push(t) : P.merge(h, t); } let n; let a; let r; let o; let i; let l; let s; const u = []; const c = t.aoColumns; const f = t.aaSortingFixed; const d = P.isPlainObject(f); var h = []; for (Array.isArray(f) && e(f), d && f.pre && e(f.pre), e(t.aaSorting), d && f.post && e(f.post), n = 0; n < h.length; n++) {
      for (r = (o = c[s = h[n][a = 0]].aDataSort).length; a < r; a++) {
        l = c[i = o[a]].sType || 'string', h[n]._idx === H && (h[n]._idx = P.inArray(h[n][1], c[i].asSorting)), u.push({
          src: s, col: i, dir: h[n][1], index: h[n]._idx, type: l, formatter: w.ext.type.order[`${l}-pre`],
        });
      }
    } return u;
  } function ie(t) { let e; let n; let a; let r; let c; const f = []; const u = w.ext.type.order; const d = t.aoData; let o = (t.aoColumns, 0); const i = t.aiDisplayMaster; for (lt(t), e = 0, n = (c = I(t)).length; e < n; e++)(r = c[e]).formatter && o++, fe(t, r.col); if (E(t) != 'ssp' && c.length !== 0) { for (e = 0, a = i.length; e < a; e++)f[i[e]] = e; o === c.length ? i.sort((t, e) => { for (var n, a, r, o, i = c.length, l = d[t]._aSortData, s = d[e]._aSortData, u = 0; u < i; u++) if ((r = (n = l[(o = c[u]).col]) < (a = s[o.col]) ? -1 : a < n ? 1 : 0) != 0) return o.dir === 'asc' ? r : -r; return (n = f[t]) < (a = f[e]) ? -1 : a < n ? 1 : 0; }) : i.sort((t, e) => { for (var n, a, r, o = c.length, i = d[t]._aSortData, l = d[e]._aSortData, s = 0; s < o; s++) if (n = i[(r = c[s]).col], a = l[r.col], (r = (u[`${r.type}-${r.dir}`] || u[`string-${r.dir}`])(n, a)) !== 0) return r; return (n = f[t]) < (a = f[e]) ? -1 : a < n ? 1 : 0; }); }t.bSorted = !0; } function le(t) { for (let e = t.aoColumns, n = I(t), a = t.oLanguage.oAria, r = 0, o = e.length; r < o; r++) { let i = e[r]; const l = i.asSorting; const s = i.ariaTitle || i.sTitle.replace(/<.*?>/g, ''); const u = i.nTh; u.removeAttribute('aria-sort'), i = i.bSortable ? s + ((n.length > 0 && n[0].col == r && (u.setAttribute('aria-sort', n[0].dir == 'asc' ? 'ascending' : 'descending'), l[n[0].index + 1]) || l[0]) === 'asc' ? a.sSortAscending : a.sSortDescending) : s, u.setAttribute('aria-label', i); } } function se(t, e, n, a) { function r(t, e) { let n = t._idx; return (n = n === H ? P.inArray(t[1], s) : n) + 1 < s.length ? n + 1 : e ? null : 0; } let o; let i = t.aoColumns[e]; let l = t.aaSorting; var s = i.asSorting; typeof l[0] === 'number' && (l = t.aaSorting = [l]), n && t.oFeatures.bSortMulti ? (i = P.inArray(e, N(l, '0'))) !== -1 ? (o = (o = r(l[i], !0)) === null && l.length === 1 ? 0 : o) === null ? l.splice(i, 1) : (l[i][1] = s[o], l[i]._idx = o) : (l.push([e, s[0], 0]), l[l.length - 1]._idx = 0) : l.length && l[0][0] == e ? (o = r(l[0]), l.length = 1, l[0][1] = s[o], l[0]._idx = o) : (l.length = 0, l.push([e, s[0]]), l[0]._idx = 0), u(t), typeof a === 'function' && a(t); } function ue(e, t, n, a) { const r = e.aoColumns[n]; me(t, {}, (t) => { !1 !== r.bSortable && (e.oFeatures.bProcessing ? (D(e, !0), setTimeout(() => { se(e, n, t.shiftKey, a), E(e) !== 'ssp' && D(e, !1); }, 0)) : se(e, n, t.shiftKey, a)); }); } function ce(t) { let e; let n; let a; const r = t.aLastSort; const o = t.oClasses.sSortColumn; const i = I(t); const l = t.oFeatures; if (l.bSort && l.bSortClasses) { for (e = 0, n = r.length; e < n; e++)a = r[e].src, P(N(t.aoData, 'anCells', a)).removeClass(o + (e < 2 ? e + 1 : 3)); for (e = 0, n = i.length; e < n; e++)a = i[e].src, P(N(t.aoData, 'anCells', a)).addClass(o + (e < 2 ? e + 1 : 3)); }t.aLastSort = i; } function fe(t, e) { for (var n, a, r, o = t.aoColumns[e], i = w.ext.order[o.sSortDataType], l = (i && (n = i.call(t.oInstance, t, e, ot(t, e))), w.ext.type.order[`${o.sType}-pre`]), s = 0, u = t.aoData.length; s < u; s++)(a = t.aoData[s])._aSortData || (a._aSortData = []), a._aSortData[e] && !i || (r = i ? n[s] : S(t, s, e, 'sort'), a._aSortData[e] = l ? l(r) : r); } function de(n) {
    let t; n._bLoadingState || (t = {
      time: +new Date(), start: n._iDisplayStart, length: n._iDisplayLength, order: P.extend(!0, [], n.aaSorting), search: Et(n.oPreviousSearch), columns: P.map(n.aoColumns, (t, e) => ({ visible: t.bVisible, search: Et(n.aoPreSearchCols[e]) })),
    }, n.oSavedState = t, R(n, 'aoStateSaveParams', 'stateSaveParams', [n, t]), n.oFeatures.bStateSave && !n.bDestroying && n.fnStateSaveCallback.call(n.oInstance, n, t));
  } function he(e, t, n) { let a; if (e.oFeatures.bStateSave) return (a = e.fnStateLoadCallback.call(e.oInstance, e, (t) => { pe(e, t, n); })) !== H && pe(e, a, n), !0; n(); } function pe(n, t, e) { let a; let r; const o = n.aoColumns; const i = (n._bLoadingState = !0, n._bInitComplete ? new w.Api(n) : null); if (t && t.time) { let l = R(n, 'aoStateLoadParams', 'stateLoadParams', [n, t]); if (P.inArray(!1, l) !== -1)n._bLoadingState = !1; else { l = n.iStateDuration; if (l > 0 && t.time < +new Date() - 1e3 * l)n._bLoadingState = !1; else if (t.columns && o.length !== t.columns.length)n._bLoadingState = !1; else { if (n.oLoadedState = P.extend(!0, {}, t), t.length !== H && (i ? i.page.len(t.length) : n._iDisplayLength = t.length), t.start !== H && (i === null ? (n._iDisplayStart = t.start, n.iInitDisplayStart = t.start) : Yt(n, t.start / n._iDisplayLength)), t.order !== H && (n.aaSorting = [], P.each(t.order, (t, e) => { n.aaSorting.push(e[0] >= o.length ? [0, e[1]] : e); })), t.search !== H && P.extend(n.oPreviousSearch, Bt(t.search)), t.columns) { for (a = 0, r = t.columns.length; a < r; a++) { const s = t.columns[a]; s.visible !== H && (i ? i.column(a).visible(s.visible, !1) : o[a].bVisible = s.visible), s.search !== H && P.extend(n.aoPreSearchCols[a], Bt(s.search)); }i && i.columns.adjust(); }n._bLoadingState = !1, R(n, 'aoStateLoaded', 'stateLoaded', [n, t]); } } } else n._bLoadingState = !1; e(); } function ge(t) { const e = w.settings; var t = P.inArray(t, N(e, 'nTable')); return t !== -1 ? e[t] : null; } function W(t, e, n, a) { if (n = `DataTables warning: ${t ? `table id=${t.sTableId} - ` : ''}${n}`, a && (n += `. For more information about this error, please see http://datatables.net/tn/${a}`), e)j.console && console.log && console.log(n); else { e = w.ext, e = e.sErrMode || e.errMode; if (t && R(t, null, 'error', [t, a, n]), e == 'alert')alert(n); else { if (e == 'throw') throw new Error(n); typeof e === 'function' && e(t, a, n); } } } function F(n, a, t, e) { Array.isArray(t) ? P.each(t, (t, e) => { Array.isArray(e) ? F(n, a, e[0], e[1]) : F(n, a, e); }) : (e === H && (e = t), a[t] !== H && (n[e] = a[t])); } function be(t, e, n) { let a; let r; for (r in e)e.hasOwnProperty(r) && (a = e[r], P.isPlainObject(a) ? (P.isPlainObject(t[r]) || (t[r] = {}), P.extend(!0, t[r], a)) : n && r !== 'data' && r !== 'aaData' && Array.isArray(a) ? t[r] = a.slice() : t[r] = a); return t; } function me(e, t, n) { P(e).on('click.DT', t, (t) => { P(e).trigger('blur'), n(t); }).on('keypress.DT', t, (t) => { t.which === 13 && (t.preventDefault(), n(t)); }).on('selectstart.DT', () => !1); } function L(t, e, n, a) { n && t[e].push({ fn: n, sName: a }); } function R(n, t, e, a) { let r = []; return t && (r = P.map(n[t].slice().reverse(), (t, e) => t.fn.apply(n.oInstance, a))), e !== null && (t = P.Event(`${e}.dt`), (e = P(n.nTable)).trigger(t, a), e.parents('body').length === 0 && P('body').trigger(t, a), r.push(t.result)), r; } function Se(t) { let e = t._iDisplayStart; const n = t.fnDisplayEnd(); const a = t._iDisplayLength; n <= e && (e = n - a), e -= e % a, t._iDisplayStart = e = a === -1 || e < 0 ? 0 : e; } function ve(t, e) { var t = t.renderer; const n = w.ext.renderer[e]; return P.isPlainObject(t) && t[e] ? n[t[e]] || n._ : typeof t === 'string' && n[t] || n._; } function E(t) { return t.oFeatures.bServerSide ? 'ssp' : t.ajax || t.sAjaxSource ? 'ajax' : 'dom'; } function ye(t, n) { let a; return Array.isArray(t) ? P.map(t, (t) => ye(t, n)) : typeof t === 'number' ? [n[t]] : (a = P.map(n, (t, e) => t.nTable), P(a).filter(t).map(function (t) { const e = P.inArray(this, a); return n[e]; }).toArray()); } function De(r, o, t) { let e; let n; t && (e = new B(r)).one('draw', () => { t(e.ajax.json()); }), E(r) == 'ssp' ? u(r, o) : (D(r, !0), (n = r.jqXHR) && n.readyState !== 4 && n.abort(), Tt(r, [], (t) => { pt(r); for (let e = Ft(r, t), n = 0, a = e.length; n < a; n++)x(r, e[n]); u(r, o), D(r, !1); })); } function _e(t, e, n, a, r) { for (var o, i, l, s, u = [], c = typeof e, f = 0, d = (e = e && c != 'string' && c != 'function' && e.length !== H ? e : [e]).length; f < d; f++) for (l = 0, s = (i = e[f] && e[f].split && !e[f].match(/[\[\(:]/) ? e[f].split(',') : [e[f]]).length; l < s; l++)(o = n(typeof i[l] === 'string' ? i[l].trim() : i[l])) && o.length && (u = u.concat(o)); const h = p.selector[t]; if (h.length) for (f = 0, d = h.length; f < d; f++)u = h[f](a, r, u); return z(u); } function we(t) { return (t = t || {}).filter && t.search === H && (t.search = t.filter), P.extend({ search: 'none', order: 'current', page: 'all' }, t); } function Ce(t) { for (let e = 0, n = t.length; e < n; e++) if (t[e].length > 0) return t[0] = t[e], t[0].length = 1, t.length = 1, t.context = [t.context[e]], t; return t.length = 0, t; } function Te(o, t, e, n) { function i(t, e) { let n; if (Array.isArray(t) || t instanceof P) for (let a = 0, r = t.length; a < r; a++)i(t[a], e); else t.nodeName && t.nodeName.toLowerCase() === 'tr' ? l.push(t) : (n = P('<tr><td></td></tr>').addClass(e), P('td', n).addClass(e).html(t)[0].colSpan = T(o), l.push(n[0])); } var l = []; i(e, n), t._details && t._details.detach(), t._details = P(l), t._detailsShow && t._details.insertAfter(t.nTr); } function xe(t, e) { const n = t.context; if (n.length && t.length) { var a = n[0].aoData[t[0]]; if (a._details) { (a._detailsShow = e) ? (a._details.insertAfter(a.nTr), P(a.nTr).addClass('dt-hasChild')) : (a._details.detach(), P(a.nTr).removeClass('dt-hasChild')), R(n[0], null, 'childRow', [e, t.row(t[0])]); const s = n[0]; const r = new B(s); var a = '.dt.DT_details'; var e = `draw${a}`; var t = `column-sizing${a}`; var a = `destroy${a}`; const u = s.aoData; if (r.off(`${e} ${t} ${a}`), N(u, '_details').length > 0) { r.on(e, (t, e) => { if (s !== e) return; r.rows({ page: 'current' }).eq(0).each((t) => { const e = u[t]; if (e._detailsShow)e._details.insertAfter(e.nTr); }); }); r.on(t, (t, e, n, a) => { if (s !== e) return; let r; const o = T(e); for (let i = 0, l = u.length; i < l; i++) { r = u[i]; if (r._details)r._details.children('td[colspan]').attr('colspan', o); } }); r.on(a, (t, e) => { if (s !== e) return; for (let n = 0, a = u.length; n < a; n++) if (u[n]._details)Re(r, n); }); }Le(n); } } } function Ae(t, e, n, a, r) { for (var o = [], i = 0, l = r.length; i < l; i++)o.push(S(t, r[i], e)); return o; } const Ie = []; const o = Array.prototype; var B = function (t, e) { if (!(this instanceof B)) return new B(t, e); function n(t) { let e; let n; let a; let r; t = t, a = w.settings, r = P.map(a, (t, e) => t.nTable), (t = t ? t.nTable && t.oApi ? [t] : t.nodeName && t.nodeName.toLowerCase() === 'table' ? (e = P.inArray(t, r)) !== -1 ? [a[e]] : null : t && typeof t.settings === 'function' ? t.settings().toArray() : (typeof t === 'string' ? n = P(t) : t instanceof P && (n = t), n ? n.map(function (t) { return (e = P.inArray(this, r)) !== -1 ? a[e] : null; }).toArray() : void 0) : []) && o.push.apply(o, t); } var o = []; if (Array.isArray(t)) for (let a = 0, r = t.length; a < r; a++)n(t[a]); else n(t); this.context = z(o), e && P.merge(this, e), this.selector = { rows: null, cols: null, opts: null }, B.extend(this, this, Ie); }; var Fe = (w.Api = B, P.extend(B.prototype, {
    any() { return this.count() !== 0; }, concat: o.concat, context: [], count() { return this.flatten().length; }, each(t) { for (let e = 0, n = this.length; e < n; e++)t.call(this, this[e], e, this); return this; }, eq(t) { const e = this.context; return e.length > t ? new B(e[t], this[t]) : null; }, filter(t) { let e = []; if (o.filter)e = o.filter.call(this, t, this); else for (let n = 0, a = this.length; n < a; n++)t.call(this, this[n], n, this) && e.push(this[n]); return new B(this.context, e); }, flatten() { const t = []; return new B(this.context, t.concat.apply(t, this.toArray())); }, join: o.join, indexOf: o.indexOf || function (t, e) { for (let n = e || 0, a = this.length; n < a; n++) if (this[n] === t) return n; return -1; }, iterator(t, e, n, a) { let r; let o; let i; let l; let s; let u; let c; let f; const d = []; const h = this.context; const p = this.selector; for (typeof t === 'string' && (a = n, n = e, e = t, t = !1), o = 0, i = h.length; o < i; o++) { const g = new B(h[o]); if (e === 'table')(r = n.call(g, h[o], o)) !== H && d.push(r); else if (e === 'columns' || e === 'rows')(r = n.call(g, h[o], this[o], o)) !== H && d.push(r); else if (e === 'column' || e === 'column-rows' || e === 'row' || e === 'cell') for (c = this[o], e === 'column-rows' && (u = Fe(h[o], p.opts)), l = 0, s = c.length; l < s; l++)f = c[l], (r = e === 'cell' ? n.call(g, h[o], f.row, f.column, o, l) : n.call(g, h[o], f, o, l, u)) !== H && d.push(r); } return d.length || a ? ((t = (a = new B(h, t ? d.concat.apply([], d) : d)).selector).rows = p.rows, t.cols = p.cols, t.opts = p.opts, a) : this; }, lastIndexOf: o.lastIndexOf || function (t, e) { return this.indexOf.apply(this.toArray.reverse(), arguments); }, length: 0, map(t) { let e = []; if (o.map)e = o.map.call(this, t, this); else for (let n = 0, a = this.length; n < a; n++)e.push(t.call(this, this[n], n)); return new B(this.context, e); }, pluck(t) { const e = w.util.get(t); return this.map((t) => e(t)); }, pop: o.pop, push: o.push, reduce: o.reduce || function (t, e) { return et(this, t, e, 0, this.length, 1); }, reduceRight: o.reduceRight || function (t, e) { return et(this, t, e, this.length - 1, -1, -1); }, reverse: o.reverse, selector: null, shift: o.shift, slice() { return new B(this.context, this); }, sort: o.sort, splice: o.splice, toArray() { return o.slice.call(this); }, to$() { return P(this); }, toJQuery() { return P(this); }, unique() { return new B(this.context, z(this)); }, unshift: o.unshift,
  }), B.extend = function (t, e, n) { if (n.length && e && (e instanceof B || e.__dt_wrapper)) for (var a, r = 0, o = n.length; r < o; r++)e[(a = n[r]).name] = a.type === 'function' ? (function (e, n, a) { return function () { const t = n.apply(e, arguments); return B.extend(t, t, a.methodExt), t; }; }(t, a.val, a)) : a.type === 'object' ? {} : a.val, e[a.name].__dt_wrapper = !0, B.extend(t, e[a.name], a.propExt); }, B.register = e = function (t, e) {
    if (Array.isArray(t)) for (let n = 0, a = t.length; n < a; n++)B.register(t[n], e); else {
      for (let r = t.split('.'), o = Ie, i = 0, l = r.length; i < l; i++) {
        var s; var u; let c = (function (t, e) { for (let n = 0, a = t.length; n < a; n++) if (t[n].name === e) return t[n]; return null; }(o, u = (s = r[i].indexOf('()') !== -1) ? r[i].replace('()', '') : r[i])); c || o.push(c = {
          name: u, val: {}, methodExt: [], propExt: [], type: 'object',
        }), i === l - 1 ? (c.val = e, c.type = typeof e === 'function' ? 'function' : P.isPlainObject(e) ? 'object' : 'other') : o = s ? c.methodExt : c.propExt;
      }
    }
  }, B.registerPlural = t = function (t, e, n) { B.register(t, n), B.register(e, function () { const t = n.apply(this, arguments); return t === this ? this : t instanceof B ? t.length ? Array.isArray(t[0]) ? new B(t.context, t[0]) : t[0] : H : t; }); }, e('tables()', function (t) { return t !== H && t !== null ? new B(ye(t, this.context)) : this; }), e('table()', function (t) { var t = this.tables(t); const e = t.context; return e.length ? new B(e[0]) : t; }), t('tables().nodes()', 'table().node()', function () { return this.iterator('table', (t) => t.nTable, 1); }), t('tables().body()', 'table().body()', function () { return this.iterator('table', (t) => t.nTBody, 1); }), t('tables().header()', 'table().header()', function () { return this.iterator('table', (t) => t.nTHead, 1); }), t('tables().footer()', 'table().footer()', function () { return this.iterator('table', (t) => t.nTFoot, 1); }), t('tables().containers()', 'table().container()', function () { return this.iterator('table', (t) => t.nTableWrapper, 1); }), e('draw()', function (e) { return this.iterator('table', (t) => { e === 'page' ? v(t) : u(t, !1 === (e = typeof e === 'string' ? e !== 'full-hold' : e)); }); }), e('page()', function (e) { return e === H ? this.page.info().page : this.iterator('table', (t) => { Yt(t, e); }); }), e('page.info()', function (t) {
    let e; let n; let a; let r; let o; return this.context.length === 0 ? H : (n = (e = this.context[0])._iDisplayStart, a = e.oFeatures.bPaginate ? e._iDisplayLength : -1, r = e.fnRecordsDisplay(), {
      page: (o = a === -1) ? 0 : Math.floor(n / a), pages: o ? 1 : Math.ceil(r / a), start: n, end: e.fnDisplayEnd(), length: a, recordsTotal: e.fnRecordsTotal(), recordsDisplay: r, serverSide: E(e) === 'ssp',
    });
  }), e('page.len()', function (e) { return e === H ? this.context.length !== 0 ? this.context[0]._iDisplayLength : H : this.iterator('table', (t) => { $t(t, e); }); }), e('ajax.json()', function () { const t = this.context; if (t.length > 0) return t[0].json; }), e('ajax.params()', function () { const t = this.context; if (t.length > 0) return t[0].oAjaxData; }), e('ajax.reload()', function (e, n) { return this.iterator('table', (t) => { De(t, !1 === n, e); }); }), e('ajax.url()', function (e) { let t = this.context; return e === H ? t.length === 0 ? H : (t = t[0]).ajax ? P.isPlainObject(t.ajax) ? t.ajax.url : t.ajax : t.sAjaxSource : this.iterator('table', (t) => { P.isPlainObject(t.ajax) ? t.ajax.url = e : t.ajax = e; }); }), e('ajax.url().load()', function (e, n) { return this.iterator('table', (t) => { De(t, !1 === n, e); }); }), function (t, e) { let n; let a = []; const r = t.aiDisplay; const o = t.aiDisplayMaster; const i = e.search; const l = e.order; var e = e.page; if (E(t) == 'ssp') return i === 'removed' ? [] : f(0, o.length); if (e == 'current') for (u = t._iDisplayStart, c = t.fnDisplayEnd(); u < c; u++)a.push(r[u]); else if (l == 'current' || l == 'applied') { if (i == 'none')a = o.slice(); else if (i == 'applied')a = r.slice(); else if (i == 'removed') { for (var s = {}, u = 0, c = r.length; u < c; u++)s[r[u]] = null; a = P.map(o, (t) => (s.hasOwnProperty(t) ? null : t)); } } else if (l == 'index' || l == 'original') for (u = 0, c = t.aoData.length; u < c; u++)(i == 'none' || (n = P.inArray(u, r)) === -1 && i == 'removed' || n >= 0 && i == 'applied') && a.push(u); return a; }); var Le = (e('rows()', function (e, n) { e === H ? e = '' : P.isPlainObject(e) && (n = e, e = ''), n = we(n); const t = this.iterator('table', (t) => { return _e('row', e, (n) => { let t = d(n); const a = r.aoData; if (t !== null && !o) return [t]; if (i = i || Fe(r, o), t !== null && P.inArray(t, i) !== -1) return [t]; if (n === null || n === H || n === '') return i; if (typeof n === 'function') return P.map(i, (t) => { const e = a[t]; return n(t, e._aData, e.nTr) ? t : null; }); if (n.nodeName) return t = n._DT_RowIndex, e = n._DT_CellIndex, t !== H ? a[t] && a[t].nTr === n ? [t] : [] : e ? a[e.row] && a[e.row].nTr === n.parentNode ? [e.row] : [] : (t = P(n).closest('*[data-dt-row]')).length ? [t.data('dt-row')] : []; if (typeof n === 'string' && n.charAt(0) === '#') { var e = r.aIds[n.replace(/^#/, '')]; if (e !== H) return [e.idx]; }t = _(m(r.aoData, i, 'nTr')); return P(t).filter(n).map(function () { return this._DT_RowIndex; }).toArray(); }, r = t, o = n); let r; let o; let i; }, 1); return t.selector.rows = e, t.selector.opts = n, t; }), e('rows().nodes()', function () { return this.iterator('row', (t, e) => t.aoData[e].nTr || H, 1); }), e('rows().data()', function () { return this.iterator(!0, 'rows', (t, e) => m(t.aoData, e, '_aData'), 1); }), t('rows().cache()', 'row().cache()', function (n) { return this.iterator('row', (t, e) => { t = t.aoData[e]; return n === 'search' ? t._aFilterData : t._aSortData; }, 1); }), t('rows().invalidate()', 'row().invalidate()', function (n) { return this.iterator('row', (t, e) => { bt(t, e, n); }); }), t('rows().indexes()', 'row().index()', function () { return this.iterator('row', (t, e) => e, 1); }), t('rows().ids()', 'row().id()', function (t) { for (var e = [], n = this.context, a = 0, r = n.length; a < r; a++) for (let o = 0, i = this[a].length; o < i; o++) { const l = n[a].rowIdFn(n[a].aoData[this[a][o]]._aData); e.push((!0 === t ? '#' : '') + l); } return new B(n, e); }), t('rows().remove()', 'row().remove()', function () { const f = this; return this.iterator('row', (t, e, n) => { let a; let r; let o; let i; let l; let s; const u = t.aoData; const c = u[e]; for (u.splice(e, 1), a = 0, r = u.length; a < r; a++) if (s = (l = u[a]).anCells, l.nTr !== null && (l.nTr._DT_RowIndex = a), s !== null) for (o = 0, i = s.length; o < i; o++)s[o]._DT_CellIndex.row = a; gt(t.aiDisplayMaster, e), gt(t.aiDisplay, e), gt(f[n], e, !1), t._iRecordsDisplay > 0 && t._iRecordsDisplay--, Se(t); n = t.rowIdFn(c._aData); n !== H && delete t.aIds[n]; }), this.iterator('table', (t) => { for (let e = 0, n = t.aoData.length; e < n; e++)t.aoData[e].idx = e; }), this; }), e('rows.add()', function (o) { const t = this.iterator('table', (t) => { for (var e, n = [], a = 0, r = o.length; a < r; a++)(e = o[a]).nodeName && e.nodeName.toUpperCase() === 'TR' ? n.push(ut(t, e)[0]) : n.push(x(t, e)); return n; }, 1); const e = this.rows(-1); return e.pop(), P.merge(e, t), e; }), e('row()', function (t, e) { return Ce(this.rows(t, e)); }), e('row().data()', function (t) { let e; const n = this.context; return t === H ? n.length && this.length ? n[0].aoData[this[0]]._aData : H : ((e = n[0].aoData[this[0]])._aData = t, Array.isArray(t) && e.nTr && e.nTr.id && b(n[0].rowId)(t, e.nTr.id), bt(n[0], this[0], 'data'), this); }), e('row().node()', function () { const t = this.context; return t.length && this.length && t[0].aoData[this[0]].nTr || null; }), e('row.add()', function (e) { e instanceof P && e.length && (e = e[0]); const t = this.iterator('table', (t) => (e.nodeName && e.nodeName.toUpperCase() === 'TR' ? ut(t, e)[0] : x(t, e))); return this.row(t[0]); }), P(y).on('plugin-init.dt', (t, e) => { const n = new B(e); var a = 'on-plugin-init'; const r = `stateSaveParams.${a}`; const o = `destroy. ${a}`; var a = (n.on(r, (t, e, n) => { for (var a = e.rowIdFn, r = e.aoData, o = [], i = 0; i < r.length; i++)r[i]._detailsShow && o.push(`#${a(r[i]._aData)}`); n.childRows = o; }), n.on(o, () => { n.off(`${r} ${o}`); }), n.state.loaded()); a && a.childRows && n.rows(P.map(a.childRows, (t) => t.replace(/:/g, '\\:'))).every(function () { R(e, null, 'requestChild', [this]); }); }), w.util.throttle((t) => { de(t[0]); }, 500)); var Re = function (t, e) { const n = t.context; n.length && (e = n[0].aoData[e !== H ? e : t[0]]) && e._details && (e._details.remove(), e._detailsShow = H, e._details = H, P(e.nTr).removeClass('dt-hasChild'), Le(n)); }; const Pe = 'row().child'; const je = `${Pe}()`; const He = (e(je, function (t, e) { const n = this.context; return t === H ? n.length && this.length ? n[0].aoData[this[0]]._details : H : (!0 === t ? this.child.show() : !1 === t ? Re(this) : n.length && this.length && Te(n[0], n[0].aoData[this[0]], t, e), this); }), e([`${Pe}.show()`, `${je}.show()`], function (t) { return xe(this, !0), this; }), e([`${Pe}.hide()`, `${je}.hide()`], function () { return xe(this, !1), this; }), e([`${Pe}.remove()`, `${je}.remove()`], function () { return Re(this), this; }), e(`${Pe}.isShown()`, function () { const t = this.context; return t.length && this.length && t[0].aoData[this[0]]._detailsShow || !1; }), /^([^:]+):(name|visIdx|visible)$/); const Ne = (e('columns()', function (n, a) { n === H ? n = '' : P.isPlainObject(n) && (a = n, n = ''), a = we(a); const t = this.iterator('table', (t) => { return e = n, l = a, s = (i = t).aoColumns, u = N(s, 'sName'), c = N(s, 'nTh'), _e('column', e, (n) => { let a; let t = d(n); if (n === '') return f(s.length); if (t !== null) return [t >= 0 ? t : s.length + t]; if (typeof n === 'function') return a = Fe(i, l), P.map(s, (t, e) => (n(e, Ae(i, e, 0, 0, a), c[e]) ? e : null)); const r = typeof n === 'string' ? n.match(He) : ''; if (r) switch (r[2]) { case 'visIdx': case 'visible': var e; var o = parseInt(r[1], 10); return o < 0 ? [(e = P.map(s, (t, e) => (t.bVisible ? e : null)))[e.length + o]] : [rt(i, o)]; case 'name': return P.map(u, (t, e) => (t === r[1] ? e : null)); default: return []; } return n.nodeName && n._DT_CellIndex ? [n._DT_CellIndex.column] : (t = P(c).filter(n).map(function () { return P.inArray(this, c); }).toArray()).length || !n.nodeName ? t : (t = P(n).closest('*[data-dt-column]')).length ? [t.data('dt-column')] : []; }, i, l); let i; let e; let l; let s; let u; let c; }, 1); return t.selector.cols = n, t.selector.opts = a, t; }), t('columns().header()', 'column().header()', function (t, e) { return this.iterator('column', (t, e) => t.aoColumns[e].nTh, 1); }), t('columns().footer()', 'column().footer()', function (t, e) { return this.iterator('column', (t, e) => t.aoColumns[e].nTf, 1); }), t('columns().data()', 'column().data()', function () { return this.iterator('column-rows', Ae, 1); }), t('columns().dataSrc()', 'column().dataSrc()', function () { return this.iterator('column', (t, e) => t.aoColumns[e].mData, 1); }), t('columns().cache()', 'column().cache()', function (o) { return this.iterator('column-rows', (t, e, n, a, r) => m(t.aoData, r, o === 'search' ? '_aFilterData' : '_aSortData', e), 1); }), t('columns().nodes()', 'column().nodes()', function () { return this.iterator('column-rows', (t, e, n, a, r) => m(t.aoData, r, 'anCells', e), 1); }), t('columns().visible()', 'column().visible()', function (f, n) { const e = this; const t = this.iterator('column', (t, e) => { if (f === H) return t.aoColumns[e].bVisible; let n; let a; const r = e; var e = f; const o = t.aoColumns; const i = o[r]; const l = t.aoData; if (e === H)i.bVisible; else if (i.bVisible !== e) { if (e) for (let s = P.inArray(!0, N(o, 'bVisible'), r + 1), u = 0, c = l.length; u < c; u++)a = l[u].nTr, n = l[u].anCells, a && a.insertBefore(n[r], n[s] || null); else P(N(t.aoData, 'anCells', r)).detach(); i.bVisible = e; } }); return f !== H && this.iterator('table', (t) => { Dt(t, t.aoHeader), Dt(t, t.aoFooter), t.aiDisplay.length || P(t.nTBody).find('td[colspan]').attr('colspan', T(t)), de(t), e.iterator('column', (t, e) => { R(t, null, 'column-visibility', [t, e, f, n]); }), n !== H && !n || e.columns.adjust(); }), t; }), t('columns().indexes()', 'column().index()', function (n) { return this.iterator('column', (t, e) => (n === 'visible' ? ot(t, e) : e), 1); }), e('columns.adjust()', function () { return this.iterator('table', (t) => { O(t); }, 1); }), e('column.index()', function (t, e) { let n; if (this.context.length !== 0) return n = this.context[0], t === 'fromVisible' || t === 'toData' ? rt(n, e) : t === 'fromData' || t === 'toVisible' ? ot(n, e) : void 0; }), e('column()', function (t, e) { return Ce(this.columns(t, e)); }), e('cells()', function (g, t, b) { let a; let r; let o; let i; let l; let s; let e; return P.isPlainObject(g) && (g.row === H ? (b = g, g = null) : (b = t, t = null)), P.isPlainObject(t) && (b = t, t = null), t === null || t === H ? this.iterator('table', (t) => { return a = t, t = g, e = we(b), f = a.aoData, d = Fe(a, e), n = _(m(f, d, 'anCells')), h = P(Y([], n)), p = a.aoColumns.length, _e('cell', t, (t) => { let e; const n = typeof t === 'function'; if (t === null || t === H || n) { for (o = [], i = 0, l = d.length; i < l; i++) for (r = d[i], s = 0; s < p; s++)u = { row: r, column: s }, (!n || (c = f[r], t(u, S(a, r, s), c.anCells ? c.anCells[s] : null))) && o.push(u); return o; } return P.isPlainObject(t) ? t.column !== H && t.row !== H && P.inArray(t.row, d) !== -1 ? [t] : [] : (e = h.filter(t).map((t, e) => ({ row: e._DT_CellIndex.row, column: e._DT_CellIndex.column })).toArray()).length || !t.nodeName ? e : (c = P(t).closest('*[data-dt-row]')).length ? [{ row: c.data('dt-row'), column: c.data('dt-column') }] : []; }, a, e); let a; let e; let r; let o; let i; let l; let s; let u; let c; let f; let d; let n; let h; let p; }) : (e = b ? { page: b.page, order: b.order, search: b.search } : {}, a = this.columns(t, e), r = this.rows(g, e), e = this.iterator('table', (t, e) => { const n = []; for (o = 0, i = r[e].length; o < i; o++) for (l = 0, s = a[e].length; l < s; l++)n.push({ row: r[e][o], column: a[e][l] }); return n; }, 1), e = b && b.selected ? this.cells(e, b) : e, P.extend(e.selector, { cols: t, rows: g, opts: b }), e); }), t('cells().nodes()', 'cell().node()', function () { return this.iterator('cell', (t, e, n) => { t = t.aoData[e]; return t && t.anCells ? t.anCells[n] : H; }, 1); }), e('cells().data()', function () { return this.iterator('cell', (t, e, n) => S(t, e, n), 1); }), t('cells().cache()', 'cell().cache()', function (a) { return a = a === 'search' ? '_aFilterData' : '_aSortData', this.iterator('cell', (t, e, n) => t.aoData[e][a][n], 1); }), t('cells().render()', 'cell().render()', function (a) { return this.iterator('cell', (t, e, n) => S(t, e, n, a), 1); }), t('cells().indexes()', 'cell().index()', function () { return this.iterator('cell', (t, e, n) => ({ row: e, column: n, columnVisible: ot(t, n) }), 1); }), t('cells().invalidate()', 'cell().invalidate()', function (a) { return this.iterator('cell', (t, e, n) => { bt(t, e, a, n); }); }), e('cell()', function (t, e, n) { return Ce(this.cells(t, e, n)); }), e('cell().data()', function (t) { const e = this.context; const n = this[0]; return t === H ? e.length && n.length ? S(e[0], n[0].row, n[0].column) : H : (ct(e[0], n[0].row, n[0].column, t), bt(e[0], n[0].row, 'data', n[0].column), this); }), e('order()', function (e, t) { const n = this.context; return e === H ? n.length !== 0 ? n[0].aaSorting : H : (typeof e === 'number' ? e = [[e, t]] : e.length && !Array.isArray(e[0]) && (e = Array.prototype.slice.call(arguments)), this.iterator('table', (t) => { t.aaSorting = e.slice(); })); }), e('order.listener()', function (e, n, a) { return this.iterator('table', (t) => { ue(t, e, n, a); }); }), e('order.fixed()', function (e) { let t; return e ? this.iterator('table', (t) => { t.aaSortingFixed = P.extend(!0, {}, e); }) : (t = (t = this.context).length ? t[0].aaSortingFixed : H, Array.isArray(t) ? { pre: t } : t); }), e(['columns().order()', 'column().order()'], function (a) { const r = this; return this.iterator('table', (t, e) => { const n = []; P.each(r[e], (t, e) => { n.push([e, a]); }), t.aaSorting = n; }); }), e('search()', function (e, n, a, r) {
    const t = this.context; return e === H ? t.length !== 0 ? t[0].oPreviousSearch.sSearch : H : this.iterator('table', (t) => {
      t.oFeatures.bFilter && Rt(t, P.extend({}, t.oPreviousSearch, {
        sSearch: `${e}`, bRegex: n !== null && n, bSmart: a === null || a, bCaseInsensitive: r === null || r,
      }), 1);
    });
  }), t('columns().search()', 'column().search()', function (a, r, o, i) {
    return this.iterator('column', (t, e) => {
      const n = t.aoPreSearchCols; if (a === H) return n[e].sSearch; t.oFeatures.bFilter && (P.extend(n[e], {
        sSearch: `${a}`, bRegex: r !== null && r, bSmart: o === null || o, bCaseInsensitive: i === null || i,
      }), Rt(t, t.oPreviousSearch, 1));
    });
  }), e('state()', function () { return this.context.length ? this.context[0].oSavedState : null; }), e('state.clear()', function () { return this.iterator('table', (t) => { t.fnStateSaveCallback.call(t.oInstance, t, {}); }); }), e('state.loaded()', function () { return this.context.length ? this.context[0].oLoadedState : null; }), e('state.save()', function () { return this.iterator('table', (t) => { de(t); }); }), w.use = function (t, e) { e === 'lib' || t.fn ? P = t : e == 'win' || t.document ? y = (j = t).document : e !== 'datetime' && t.type !== 'DateTime' || (w.DateTime = t); }, w.factory = function (t, e) { let n = !1; return t && t.document && (y = (j = t).document), e && e.fn && e.fn.jquery && (P = e, n = !0), n; }, w.versionCheck = w.fnVersionCheck = function (t) { for (var e, n, a = w.version.split('.'), r = t.split('.'), o = 0, i = r.length; o < i; o++) if ((e = parseInt(a[o], 10) || 0) !== (n = parseInt(r[o], 10) || 0)) return n < e; return !0; }, w.isDataTable = w.fnIsDataTable = function (t) { const r = P(t).get(0); let o = !1; return t instanceof w.Api || (P.each(w.settings, (t, e) => { const n = e.nScrollHead ? P('table', e.nScrollHead)[0] : null; const a = e.nScrollFoot ? P('table', e.nScrollFoot)[0] : null; e.nTable !== r && n !== r && a !== r || (o = !0); }), o); }, w.tables = w.fnTables = function (e) { let t = !1; const n = (P.isPlainObject(e) && (t = e.api, e = e.visible), P.map(w.settings, (t) => { if (!e || P(t.nTable).is(':visible')) return t.nTable; })); return t ? new B(n) : n; }, w.camelToHungarian = C, e('$()', function (t, e) { e = this.rows(e).nodes(), e = P(e); return P([].concat(e.filter(t).toArray(), e.find(t).toArray())); }), P.each(['on', 'one', 'off'], (t, n) => { e(`${n}()`, function () { const t = Array.prototype.slice.call(arguments); const e = (t[0] = P.map(t[0].split(/\s/), (t) => (t.match(/\.dt\b/) ? t : `${t}.dt`)).join(' '), P(this.tables().nodes())); return e[n].apply(e, t), this; }); }), e('clear()', function () { return this.iterator('table', (t) => { pt(t); }); }), e('settings()', function () { return new B(this.context, this.context); }), e('init()', function () { const t = this.context; return t.length ? t[0].oInit : null; }), e('data()', function () { return this.iterator('table', (t) => N(t.aoData, '_aData')).flatten(); }), e('destroy()', function (c) { return c = c || !1, this.iterator('table', (e) => { let n; const t = e.oClasses; const a = e.nTable; var r = e.nTBody; var o = e.nTHead; var i = e.nTFoot; const l = P(a); var r = P(r); const s = P(e.nTableWrapper); var u = P.map(e.aoData, (t) => t.nTr); var i = (e.bDestroying = !0, R(e, 'aoDestroyCallback', 'destroy', [e]), c || new B(e).columns().visible(!0), s.off('.DT').find(':not(tbody *)').off('.DT'), P(j).off(`.DT-${e.sInstance}`), a != o.parentNode && (l.children('thead').detach(), l.append(o)), i && a != i.parentNode && (l.children('tfoot').detach(), l.append(i)), e.aaSorting = [], e.aaSortingFixed = [], ce(e), P(u).removeClass(e.asStripeClasses.join(' ')), P('th, td', o).removeClass(`${t.sSortable} ${t.sSortableAsc} ${t.sSortableDesc} ${t.sSortableNone}`), r.children().detach(), r.append(u), e.nTableWrapper.parentNode); var o = c ? 'remove' : 'detach'; var u = (l[o](), s[o](), !c && i && (i.insertBefore(a, e.nTableReinsertBefore), l.css('width', e.sDestroyWidth).removeClass(t.sTable), n = e.asDestroyStripes.length) && r.children().each(function (t) { P(this).addClass(e.asDestroyStripes[t % n]); }), P.inArray(e, w.settings)); u !== -1 && w.settings.splice(u, 1); }); }), P.each(['column', 'row', 'cell'], (t, s) => { e(`${s}s().every()`, function (o) { const i = this.selector.opts; const l = this; return this.iterator(s, (t, e, n, a, r) => { o.call(l[s](e, s === 'cell' ? n : i, s === 'cell' ? i : H), e, n, a, r); }); }); }), e('i18n()', function (t, e, n) { const a = this.context[0]; var t = A(t)(a.oLanguage); return t === H && (t = e), typeof (t = n !== H && P.isPlainObject(t) ? t[n] !== H ? t[n] : t._ : t) === 'string' ? t.replace('%d', n) : t; }), w.version = '1.13.5', w.settings = [], w.models = {}, w.models.oSearch = {
    bCaseInsensitive: !0, sSearch: '', bRegex: !1, bSmart: !0, return: !1,
  }, w.models.oRow = {
    nTr: null, anCells: null, _aData: [], _aSortData: null, _aFilterData: null, _sFilterRow: null, _sRowStripe: '', src: null, idx: -1,
  }, w.models.oColumn = {
    idx: null, aDataSort: null, asSorting: null, bSearchable: null, bSortable: null, bVisible: null, _sManualType: null, _bAttrSrc: !1, fnCreatedCell: null, fnGetData: null, fnSetData: null, mData: null, mRender: null, nTh: null, nTf: null, sClass: null, sContentPadding: null, sDefaultContent: null, sName: null, sSortDataType: 'std', sSortingClass: null, sSortingClassJUI: null, sTitle: null, sType: null, sWidth: null, sWidthOrig: null,
  }, w.defaults = {
    aaData: null,
    aaSorting: [[0, 'asc']],
    aaSortingFixed: [],
    ajax: null,
    aLengthMenu: [10, 25, 50, 100],
    aoColumns: null,
    aoColumnDefs: null,
    aoSearchCols: [],
    asStripeClasses: null,
    bAutoWidth: !0,
    bDeferRender: !1,
    bDestroy: !1,
    bFilter: !0,
    bInfo: !0,
    bLengthChange: !0,
    bPaginate: !0,
    bProcessing: !1,
    bRetrieve: !1,
    bScrollCollapse: !1,
    bServerSide: !1,
    bSort: !0,
    bSortMulti: !0,
    bSortCellsTop: !1,
    bSortClasses: !0,
    bStateSave: !1,
    fnCreatedRow: null,
    fnDrawCallback: null,
    fnFooterCallback: null,
    fnFormatNumber(t) { return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.oLanguage.sThousands); },
    fnHeaderCallback: null,
    fnInfoCallback: null,
    fnInitComplete: null,
    fnPreDrawCallback: null,
    fnRowCallback: null,
    fnServerData: null,
    fnServerParams: null,
    fnStateLoadCallback(t) { try { return JSON.parse((t.iStateDuration === -1 ? sessionStorage : localStorage).getItem(`DataTables_${t.sInstance}_${location.pathname}`)); } catch (t) { return {}; } },
    fnStateLoadParams: null,
    fnStateLoaded: null,
    fnStateSaveCallback(t, e) { try { (t.iStateDuration === -1 ? sessionStorage : localStorage).setItem(`DataTables_${t.sInstance}_${location.pathname}`, JSON.stringify(e)); } catch (t) {} },
    fnStateSaveParams: null,
    iStateDuration: 7200,
    iDeferLoading: null,
    iDisplayLength: 10,
    iDisplayStart: 0,
    iTabIndex: 0,
    oClasses: {},
    oLanguage: {
      oAria: { sSortAscending: ': activate to sort column ascending', sSortDescending: ': activate to sort column descending' },
      oPaginate: {
        sFirst: 'First', sLast: 'Last', sNext: 'Next', sPrevious: 'Previous',
      },
      sEmptyTable: 'No data available in table',
      sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
      sInfoEmpty: 'Showing 0 to 0 of 0 entries',
      sInfoFiltered: '(filtered from _MAX_ total entries)',
      sInfoPostFix: '',
      sDecimal: '',
      sThousands: ',',
      sLengthMenu: 'Show _MENU_ entries',
      sLoadingRecords: 'Loading...',
      sProcessing: '',
      sSearch: 'Search:',
      sSearchPlaceholder: '',
      sUrl: '',
      sZeroRecords: 'No matching records found',
    },
    oSearch: P.extend({}, w.models.oSearch),
    sAjaxDataProp: 'data',
    sAjaxSource: null,
    sDom: 'lfrtip',
    searchDelay: null,
    sPaginationType: 'simple_numbers',
    sScrollX: '',
    sScrollXInner: '',
    sScrollY: '',
    sServerMethod: 'GET',
    renderer: null,
    rowId: 'DT_RowId',
  }, i(w.defaults), w.defaults.column = {
    aDataSort: null, iDataSort: -1, asSorting: ['asc', 'desc'], bSearchable: !0, bSortable: !0, bVisible: !0, fnCreatedCell: null, mData: null, mRender: null, sCellType: 'td', sClass: '', sContentPadding: '', sDefaultContent: null, sName: '', sSortDataType: 'std', sTitle: null, sType: null, sWidth: null,
  }, i(w.defaults.column), w.models.oSettings = {
    oFeatures: {
      bAutoWidth: null, bDeferRender: null, bFilter: null, bInfo: null, bLengthChange: null, bPaginate: null, bProcessing: null, bServerSide: null, bSort: null, bSortMulti: null, bSortClasses: null, bStateSave: null,
    },
    oScroll: {
      bCollapse: null, iBarWidth: 0, sX: null, sXInner: null, sY: null,
    },
    oLanguage: { fnInfoCallback: null },
    oBrowser: {
      bScrollOversize: !1, bScrollbarLeft: !1, bBounding: !1, barWidth: 0,
    },
    ajax: null,
    aanFeatures: [],
    aoData: [],
    aiDisplay: [],
    aiDisplayMaster: [],
    aIds: {},
    aoColumns: [],
    aoHeader: [],
    aoFooter: [],
    oPreviousSearch: {},
    aoPreSearchCols: [],
    aaSorting: null,
    aaSortingFixed: [],
    asStripeClasses: null,
    asDestroyStripes: [],
    sDestroyWidth: 0,
    aoRowCallback: [],
    aoHeaderCallback: [],
    aoFooterCallback: [],
    aoDrawCallback: [],
    aoRowCreatedCallback: [],
    aoPreDrawCallback: [],
    aoInitComplete: [],
    aoStateSaveParams: [],
    aoStateLoadParams: [],
    aoStateLoaded: [],
    sTableId: '',
    nTable: null,
    nTHead: null,
    nTFoot: null,
    nTBody: null,
    nTableWrapper: null,
    bDeferLoading: !1,
    bInitialised: !1,
    aoOpenRows: [],
    sDom: null,
    searchDelay: null,
    sPaginationType: 'two_button',
    iStateDuration: 0,
    aoStateSave: [],
    aoStateLoad: [],
    oSavedState: null,
    oLoadedState: null,
    sAjaxSource: null,
    sAjaxDataProp: null,
    jqXHR: null,
    json: H,
    oAjaxData: H,
    fnServerData: null,
    aoServerParams: [],
    sServerMethod: null,
    fnFormatNumber: null,
    aLengthMenu: null,
    iDraw: 0,
    bDrawing: !1,
    iDrawError: -1,
    _iDisplayLength: 10,
    _iDisplayStart: 0,
    _iRecordsTotal: 0,
    _iRecordsDisplay: 0,
    oClasses: {},
    bFiltered: !1,
    bSorted: !1,
    bSortCellsTop: null,
    oInit: null,
    aoDestroyCallback: [],
    fnRecordsTotal() { return E(this) == 'ssp' ? +this._iRecordsTotal : this.aiDisplayMaster.length; },
    fnRecordsDisplay() { return E(this) == 'ssp' ? +this._iRecordsDisplay : this.aiDisplay.length; },
    fnDisplayEnd() { const t = this._iDisplayLength; const e = this._iDisplayStart; const n = e + t; const a = this.aiDisplay.length; const r = this.oFeatures; const o = r.bPaginate; return r.bServerSide ? !1 === o || t === -1 ? e + a : Math.min(e + t, this._iRecordsDisplay) : !o || a < n || t === -1 ? a : n; },
    oInstance: null,
    sInstance: null,
    iTabIndex: 0,
    nScrollHead: null,
    nScrollFoot: null,
    aLastSort: [],
    oPlugins: {},
    rowIdFn: null,
    rowId: null,
  }, w.ext = p = {
    buttons: {}, classes: {}, builder: '-source-', errMode: 'alert', feature: [], search: [], selector: { cell: [], column: [], row: [] }, internal: {}, legacy: { ajax: null }, pager: {}, renderer: { pageButton: {}, header: {} }, order: {}, type: { detect: [], search: {}, order: {} }, _unique: 0, fnVersionCheck: w.fnVersionCheck, iApiIndex: 0, oJUIClasses: {}, sVersion: w.version,
  }, P.extend(p, {
    afnFiltering: p.search, aTypes: p.type.detect, ofnSearch: p.type.search, oSort: p.type.order, afnSortData: p.order, aoFeatures: p.feature, oApi: p.internal, oStdClasses: p.classes, oPagination: p.pager,
  }), P.extend(w.ext.classes, {
    sTable: 'dataTable', sNoFooter: 'no-footer', sPageButton: 'paginate_button', sPageButtonActive: 'current', sPageButtonDisabled: 'disabled', sStripeOdd: 'odd', sStripeEven: 'even', sRowEmpty: 'dataTables_empty', sWrapper: 'dataTables_wrapper', sFilter: 'dataTables_filter', sInfo: 'dataTables_info', sPaging: 'dataTables_paginate paging_', sLength: 'dataTables_length', sProcessing: 'dataTables_processing', sSortAsc: 'sorting_asc', sSortDesc: 'sorting_desc', sSortable: 'sorting', sSortableAsc: 'sorting_desc_disabled', sSortableDesc: 'sorting_asc_disabled', sSortableNone: 'sorting_disabled', sSortColumn: 'sorting_', sFilterInput: '', sLengthSelect: '', sScrollWrapper: 'dataTables_scroll', sScrollHead: 'dataTables_scrollHead', sScrollHeadInner: 'dataTables_scrollHeadInner', sScrollBody: 'dataTables_scrollBody', sScrollFoot: 'dataTables_scrollFoot', sScrollFootInner: 'dataTables_scrollFootInner', sHeaderTH: '', sFooterTH: '', sSortJUIAsc: '', sSortJUIDesc: '', sSortJUI: '', sSortJUIAscAllowed: '', sSortJUIDescAllowed: '', sSortJUIWrapper: '', sSortIcon: '', sJUIHeader: '', sJUIFooter: '',
  }), w.ext.pager); function Oe(t, e) { let n = []; const a = Ne.numbers_length; const r = Math.floor(a / 2); return e <= a ? n = f(0, e) : t <= r ? ((n = f(0, a - 2)).push('ellipsis'), n.push(e - 1)) : ((e - 1 - r <= t ? n = f(e - (a - 2), e) : ((n = f(t - r + 2, t + r - 1)).push('ellipsis'), n.push(e - 1), n)).splice(0, 0, 'ellipsis'), n.splice(0, 0, 0)), n.DT_el = 'span', n; }P.extend(Ne, {
    simple(t, e) { return ['previous', 'next']; }, full(t, e) { return ['first', 'previous', 'next', 'last']; }, numbers(t, e) { return [Oe(t, e)]; }, simple_numbers(t, e) { return ['previous', Oe(t, e), 'next']; }, full_numbers(t, e) { return ['first', 'previous', Oe(t, e), 'next', 'last']; }, first_last_numbers(t, e) { return ['first', Oe(t, e), 'last']; }, _numbers: Oe, numbers_length: 7,
  }), P.extend(!0, w.ext.renderer, {
    pageButton: {
      _(c, t, f, e, d, h) {
        function p(t, e) {
          for (var n, a, r, o = m.sPageButtonDisabled, i = function (t) { Yt(c, t.data.action, !0); }, l = 0, s = e.length; l < s; l++) {
            if (n = e[l], Array.isArray(n)) { var u = P(`<${n.DT_el || 'div'}/>`).appendTo(t); p(u, n); } else {
              switch (g = null, b = n, a = c.iTabIndex, n) { case 'ellipsis': t.append('<span class="ellipsis">&#x2026;</span>'); break; case 'first': g = S.sFirst, d === 0 && (a = -1, b += ` ${o}`); break; case 'previous': g = S.sPrevious, d === 0 && (a = -1, b += ` ${o}`); break; case 'next': g = S.sNext, h !== 0 && d !== h - 1 || (a = -1, b += ` ${o}`); break; case 'last': g = S.sLast, h !== 0 && d !== h - 1 || (a = -1, b += ` ${o}`); break; default: g = c.fnFormatNumber(n + 1), b = d === n ? m.sPageButtonActive : ''; }g !== null && (u = c.oInit.pagingTag || 'a', r = b.indexOf(o) !== -1, me(P(`<${u}>`, {
                class: `${m.sPageButton} ${b}`, 'aria-controls': c.sTableId, 'aria-disabled': r ? 'true' : null, 'aria-label': v[n], role: 'link', 'aria-current': b === m.sPageButtonActive ? 'page' : null, 'data-dt-idx': n, tabindex: a, id: f === 0 && typeof n === 'string' ? `${c.sTableId}_${n}` : null,
              }).html(g).appendTo(t), { action: n }, i));
            }
          }
        } let g; let b; let n; var m = c.oClasses; var S = c.oLanguage.oPaginate; var v = c.oLanguage.oAria.paginate || {}; try { n = P(t).find(y.activeElement).data('dt-idx'); } catch (t) {}p(P(t).empty(), e), n !== H && P(t).find(`[data-dt-idx=${n}]`).trigger('focus');
      },
    },
  }), P.extend(w.ext.type.detect, [function (t, e) { e = e.oLanguage.sDecimal; return l(t, e) ? `num${e}` : null; }, function (t, e) { let n; return (!t || t instanceof Date || X.test(t)) && ((n = Date.parse(t)) !== null && !isNaN(n) || h(t)) ? 'date' : null; }, function (t, e) { e = e.oLanguage.sDecimal; return l(t, e, !0) ? `num-fmt${e}` : null; }, function (t, e) { e = e.oLanguage.sDecimal; return a(t, e) ? `html-num${e}` : null; }, function (t, e) { e = e.oLanguage.sDecimal; return a(t, e, !0) ? `html-num-fmt${e}` : null; }, function (t, e) { return h(t) || typeof t === 'string' && t.indexOf('<') !== -1 ? 'html' : null; }]), P.extend(w.ext.type.search, { html(t) { return h(t) ? t : typeof t === 'string' ? t.replace(U, ' ').replace(V, '') : ''; }, string(t) { return !h(t) && typeof t === 'string' ? t.replace(U, ' ') : t; } }); function ke(t, e, n, a) { let r; return t === 0 || t && t !== '-' ? (r = typeof t) == 'number' || r == 'bigint' ? t : +(t = (t = e ? $(t, e) : t).replace && (n && (t = t.replace(n, '')), a) ? t.replace(a, '') : t) : -1 / 0; } function Me(n) {
    P.each({
      num(t) { return ke(t, n); }, 'num-fmt': function (t) { return ke(t, n, q); }, 'html-num': function (t) { return ke(t, n, V); }, 'html-num-fmt': function (t) { return ke(t, n, V, q); },
    }, (t, e) => { p.type.order[`${t + n}-pre`] = e, t.match(/^html\-/) && (p.type.search[t + n] = p.type.search.html); });
  }P.extend(p.type.order, {
    'date-pre': function (t) { t = Date.parse(t); return isNaN(t) ? -1 / 0 : t; }, 'html-pre': function (t) { return h(t) ? '' : t.replace ? t.replace(/<.*?>/g, '').toLowerCase() : `${t}`; }, 'string-pre': function (t) { return h(t) ? '' : typeof t === 'string' ? t.toLowerCase() : t.toString ? t.toString() : ''; }, 'string-asc': function (t, e) { return t < e ? -1 : e < t ? 1 : 0; }, 'string-desc': function (t, e) { return t < e ? 1 : e < t ? -1 : 0; },
  }), Me(''), P.extend(!0, w.ext.renderer, {
    header: {
      _(r, o, i, l) { P(r.nTable).on('order.dt.DT', (t, e, n, a) => { r === e && (e = i.idx, o.removeClass(`${l.sSortAsc} ${l.sSortDesc}`).addClass(a[e] == 'asc' ? l.sSortAsc : a[e] == 'desc' ? l.sSortDesc : i.sSortingClass)); }); },
      jqueryui(r, o, i, l) {
        P('<div/>').addClass(l.sSortJUIWrapper).append(o.contents()).append(P('<span/>').addClass(`${l.sSortIcon} ${i.sSortingClassJUI}`))
          .appendTo(o), P(r.nTable).on('order.dt.DT', (t, e, n, a) => { r === e && (e = i.idx, o.removeClass(`${l.sSortAsc} ${l.sSortDesc}`).addClass(a[e] == 'asc' ? l.sSortAsc : a[e] == 'desc' ? l.sSortDesc : i.sSortingClass), o.find(`span.${l.sSortIcon}`).removeClass(`${l.sSortJUIAsc} ${l.sSortJUIDesc} ${l.sSortJUI} ${l.sSortJUIAscAllowed} ${l.sSortJUIDescAllowed}`).addClass(a[e] == 'asc' ? l.sSortJUIAsc : a[e] == 'desc' ? l.sSortJUIDesc : i.sSortingClassJUI)); });
      },
    },
  }); function We(t) { return typeof (t = Array.isArray(t) ? t.join(',') : t) === 'string' ? t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') : t; } function Ee(t, e, n, a, r) { return j.moment ? t[e](r) : j.luxon ? t[n](r) : a ? t[a](r) : t; } let Be = !1; function Ue(t, e, n) { let a; if (j.moment) { if (!(a = j.moment.utc(t, e, n, !0)).isValid()) return null; } else if (j.luxon) { if (!(a = e && typeof t === 'string' ? j.luxon.DateTime.fromFormat(t, e) : j.luxon.DateTime.fromISO(t)).isValid) return null; a.setLocale(n); } else e ? (Be || alert('DataTables warning: Formatted date without Moment.js or Luxon - https://datatables.net/tn/17'), Be = !0) : a = new Date(t); return a; } function Ve(s) { return function (a, r, o, i) { arguments.length === 0 ? (o = 'en', a = r = null) : arguments.length === 1 ? (o = 'en', r = a, a = null) : arguments.length === 2 && (o = r, r = a, a = null); const l = `datetime-${r}`; return w.ext.type.order[l] || (w.ext.type.detect.unshift((t) => t === l && l), w.ext.type.order[`${l}-asc`] = function (t, e) { t = t.valueOf(), e = e.valueOf(); return t === e ? 0 : t < e ? -1 : 1; }, w.ext.type.order[`${l}-desc`] = function (t, e) { t = t.valueOf(), e = e.valueOf(); return t === e ? 0 : e < t ? -1 : 1; }), function (t, e) { let n; return t !== null && t !== H || (t = i === '--now' ? (n = new Date(), new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds()))) : ''), e === 'type' ? l : t === '' ? e !== 'sort' ? '' : Ue('0000-01-01 00:00:00', null, o) : !(r === null || a !== r || e === 'sort' || e === 'type' || t instanceof Date) || (n = Ue(t, a, o)) === null ? t : e === 'sort' ? n : (t = r === null ? Ee(n, 'toDate', 'toJSDate', '')[s]() : Ee(n, 'format', 'toFormat', 'toISOString', r), e === 'display' ? We(t) : t); }; }; } let Xe = ','; let Je = '.'; if (j.Intl !== H) try { for (let qe = (new Intl.NumberFormat()).formatToParts(100000.1), n = 0; n < qe.length; n++)qe[n].type === 'group' ? Xe = qe[n].value : qe[n].type === 'decimal' && (Je = qe[n].value); } catch (t) {} function $e(e) { return function () { const t = [ge(this[w.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments)); return w.ext.internal[e].apply(this, t); }; } return w.datetime = function (n, a) { const r = `datetime-detect-${n}`; a = a || 'en', w.ext.type.order[r] || (w.ext.type.detect.unshift((t) => { const e = Ue(t, n, a); return !(t !== '' && !e) && r; }), w.ext.type.order[`${r}-pre`] = function (t) { return Ue(t, n, a) || 0; }); }, w.render = {
    date: Ve('toLocaleDateString'), datetime: Ve('toLocaleString'), time: Ve('toLocaleTimeString'), number(a, r, o, i, l) { return a !== null && a !== H || (a = Xe), r !== null && r !== H || (r = Je), { display(t) { if (typeof t !== 'number' && typeof t !== 'string') return t; if (t === '' || t === null) return t; let e = t < 0 ? '-' : ''; let n = parseFloat(t); if (isNaN(n)) return We(t); n = n.toFixed(o), t = Math.abs(n); n = parseInt(t, 10), t = o ? r + (t - n).toFixed(o).substring(2) : ''; return (e = n === 0 && parseFloat(t) === 0 ? '' : e) + (i || '') + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, a) + t + (l || ''); } }; }, text() { return { display: We, filter: We }; },
  }, P.extend(w.ext.internal, {
    _fnExternApiFunc: $e, _fnBuildAjax: Tt, _fnAjaxUpdate: xt, _fnAjaxParameters: At, _fnAjaxUpdateDraw: It, _fnAjaxDataSrc: Ft, _fnAddColumn: nt, _fnColumnOptions: at, _fnAdjustColumnSizing: O, _fnVisibleToColumnIndex: rt, _fnColumnIndexToVisible: ot, _fnVisbleColumns: T, _fnGetColumns: it, _fnColumnTypes: lt, _fnApplyColumnDefs: st, _fnHungarianMap: i, _fnCamelToHungarian: C, _fnLanguageCompat: Z, _fnBrowserDetect: tt, _fnAddData: x, _fnAddTr: ut, _fnNodeToDataIndex(t, e) { return e._DT_RowIndex !== H ? e._DT_RowIndex : null; }, _fnNodeToColumnIndex(t, e, n) { return P.inArray(n, t.aoData[e].anCells); }, _fnGetCellData: S, _fnSetCellData: ct, _fnSplitObjNotation: dt, _fnGetObjectDataFn: A, _fnSetObjectDataFn: b, _fnGetDataMaster: ht, _fnClearTable: pt, _fnDeleteIndex: gt, _fnInvalidate: bt, _fnGetRowElements: mt, _fnCreateTr: St, _fnBuildHead: yt, _fnDrawHead: Dt, _fnDraw: v, _fnReDraw: u, _fnAddOptionsHtml: _t, _fnDetectHeader: wt, _fnGetUniqueThs: Ct, _fnFeatureHtmlFilter: Lt, _fnFilterComplete: Rt, _fnFilterCustom: Pt, _fnFilterColumn: jt, _fnFilter: Ht, _fnFilterCreateSearch: Nt, _fnEscapeRegex: Ot, _fnFilterData: Wt, _fnFeatureHtmlInfo: Ut, _fnUpdateInfo: Vt, _fnInfoMacros: Xt, _fnInitialise: Jt, _fnInitComplete: qt, _fnLengthChange: $t, _fnFeatureHtmlLength: Gt, _fnFeatureHtmlPaginate: zt, _fnPageChange: Yt, _fnFeatureHtmlProcessing: Zt, _fnProcessingDisplay: D, _fnFeatureHtmlTable: Kt, _fnScrollDraw: Qt, _fnApplyToChildren: k, _fnCalculateColumnWidths: ee, _fnThrottle: ne, _fnConvertToWidth: ae, _fnGetWidestNode: re, _fnGetMaxLenString: oe, _fnStringToCss: M, _fnSortFlatten: I, _fnSort: ie, _fnSortAria: le, _fnSortListener: se, _fnSortAttachListener: ue, _fnSortingClasses: ce, _fnSortData: fe, _fnSaveState: de, _fnLoadState: he, _fnImplementState: pe, _fnSettingsFromNode: ge, _fnLog: W, _fnMap: F, _fnBindAction: me, _fnCallbackReg: L, _fnCallbackFire: R, _fnLengthOverflow: Se, _fnRenderer: ve, _fnDataSource: E, _fnRowAttributes: vt, _fnExtend: be, _fnCalculateEnd() {},
  }), ((P.fn.dataTable = w).$ = P).fn.dataTableSettings = w.settings, P.fn.dataTableExt = w.ext, P.fn.DataTable = function (t) { return P(this).dataTable(t).api(); }, P.each(w, (t, e) => { P.fn.DataTable[t] = e; }), w;
}));
