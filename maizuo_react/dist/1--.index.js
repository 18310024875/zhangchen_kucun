webpackJsonp([1],{

/***/ 281:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(9);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(75);

var _reactAddonsCssTransitionGroup = __webpack_require__(297);

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

__webpack_require__(293);

var _header = __webpack_require__(309);

var _header2 = _interopRequireDefault(_header);

var _nav = __webpack_require__(310);

var _nav2 = _interopRequireDefault(_nav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 动画全靠它 


var App = function (_Component) {
	_inherits(App, _Component);

	function App() {
		_classCallCheck(this, App);

		return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
	}

	_createClass(App, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ id: 'app' },
				_react2.default.createElement(_header2.default, null),
				_react2.default.createElement(
					'div',
					{ id: 'main' },
					_react2.default.createElement(_nav2.default, null),
					_react2.default.createElement(
						_reactAddonsCssTransitionGroup2.default,
						{
							component: 'div',
							transitionName: 'router',
							transitionEnterTimeout: 550,
							transitionLeaveTimeout: 550 },
						_react2.default.cloneElement(this.props.children, {
							key: location.pathname
						})
					)
				)
			);
		}
	}]);

	return App;
}(_react.Component);

exports.default = App;

/***/ }),

/***/ 291:
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		// Test for IE <= 9 as proposed by Browserhacks
		// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
		// Tests for existence of standard globals is to allow style-loader 
		// to operate correctly into non-standard environments
		// @see https://github.com/webpack-contrib/style-loader/issues/177
		return window && document && document.all && !window.atob;
	}),
	getElement = (function(fn) {
		var memo = {};
		return function(selector) {
			if (typeof memo[selector] === "undefined") {
				memo[selector] = fn.call(this, selector);
			}
			return memo[selector]
		};
	})(function (styleTarget) {
		return document.querySelector(styleTarget)
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [],
	fixUrls = __webpack_require__(292);

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (typeof options.insertInto === "undefined") options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var styleTarget = getElement(options.insertInto)
	if (!styleTarget) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			styleTarget.insertBefore(styleElement, styleTarget.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			styleTarget.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			styleTarget.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		styleTarget.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	options.attrs.type = "text/css";

	attachTagAttrs(styleElement, options.attrs);
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	attachTagAttrs(linkElement, options.attrs);
	insertStyleElement(options, linkElement);
	return linkElement;
}

function attachTagAttrs(element, attrs) {
	Object.keys(attrs).forEach(function (key) {
		element.setAttribute(key, attrs[key]);
	});
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement, options);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
	and there is no publicPath defined then lets turn convertToAbsoluteUrls
	on by default.  Otherwise default to the convertToAbsoluteUrls option
	directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls){
		css = fixUrls(css);
	}

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 292:
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ 293:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(294);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(291)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/.0.28.1@css-loader/index.js??ref--2-1!../../node_modules/.4.0.3@less-loader/dist/index.js??ref--2-2!./app.less", function() {
			var newContent = require("!!../../node_modules/.0.28.1@css-loader/index.js??ref--2-1!../../node_modules/.4.0.3@less-loader/dist/index.js??ref--2-2!./app.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 294:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(295)(undefined);
// imports


// module
exports.push([module.i, "#app {\n  font-size: .3rem;\n}\n#app header {\n  background: #282828;\n  box-shadow: 0px 1px 1px black;\n}\n#app header #nav_bth {\n  position: relative;\n  float: left;\n  width: 1rem;\n  height: 1rem;\n  border-right: 1px solid #222;\n  box-shadow: 1px 0 2px #363636;\n}\n#app header #nav_bth img {\n  position: absolute;\n  width: .5rem;\n  left: .25rem;\n  top: .25rem;\n}\n#app header .title {\n  float: left;\n  margin-left: .4rem;\n  color: #efefef;\n  text-shadow: 0 -1px 0 black;\n  max-width: 2.4rem ;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\n#app header #mine_bth {\n  position: relative;\n  float: right;\n  width: 1rem;\n  height: 1rem;\n}\n#app header #mine_bth img {\n  position: absolute;\n  width: .4rem;\n  left: .3rem;\n  top: .3rem;\n}\n#app header .city {\n  float: right;\n  height: 1rem;\n  color: #999;\n  font-size: .27rem;\n}\n#app header .city span {\n  position: relative;\n  top: 1px;\n}\n#app header .city img {\n  width: .25rem;\n  vertical-align: middle;\n  margin-left: .1rem;\n}\n#app #main #mask {\n  position: fixed;\n  z-index: 100;\n  top: 1rem;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.5);\n}\n#app #main #menu {\n  position: fixed;\n  z-index: 101;\n  top: 1rem;\n  bottom: 0;\n  width: 65%;\n  background: #282828;\n  transition: all 0.4s ease-in-out;\n}\n#app #main #menu h1 {\n  width: 100%;\n  height: 1px;\n  background: #222;\n  border-bottom: 1px solid #333;\n}\n#app #main #menu li {\n  display: block;\n  width: 100%;\n  border-bottom: 1px dotted #333;\n  height: 1rem;\n  line-height: 1rem;\n  color: #999;\n  font-size: .28rem;\n}\n#app #main #menu li a {\n  display: block;\n  padding: 0 .33rem;\n  color: #999;\n}\n#app #main #menu li a .rt {\n  height: 100%;\n  float: right;\n}\n#app #main #menu li a .rt span {\n  width: 7px;\n  height: 7px;\n  display: inline-block;\n  border: 1px solid #999;\n  transform: rotate(45deg);\n  border-left: none;\n  border-bottom: none;\n}\n#app #home {\n  background: #f0f0f0;\n  padding-bottom: .3rem;\n}\n#app #home .swiper-slide img {\n  width: 100%;\n}\n#app #movie {\n  width: 100%;\n  margin: 0 auto;\n}\n#app #movie .movie_wrapper {\n  width: 90%;\n  margin: 0 auto;\n}\n#app #movie .tit {\n  height: 1rem;\n  line-height: 1rem;\n  overflow: hidden;\n  border-bottom: solid #fe6e00 1px;\n}\n#app #movie .tit li {\n  height: 1rem;\n  float: left;\n  color: #6a6a6a;\n  width: 50%;\n  text-align: center;\n  box-sizing: border-box;\n  font-size: .3rem;\n  border-bottom: 3px solid transparent ;\n}\n#app #movie .tit .active {\n  color: #fe6e00;\n  border-bottom: 3px solid #fe6e00;\n}\n#app #movie .box li {\n  border-bottom: dashed 1px #c9c9c9;\n  padding: .4rem 0;\n  overflow: hidden;\n  position: relative;\n}\n#app #movie .box li .fen {\n  position: absolute;\n  right: .33rem;\n  top: .48rem;\n  color: #fc7103;\n  font-size: .32rem;\n}\n#app #movie .box li .fen i {\n  display: inline-block;\n  width: .13rem;\n  height: .13rem;\n  border: 1px solid #999;\n  opacity: .6;\n  position: relative;\n  top: -1px;\n  transform: rotate(45deg);\n  border-left: none;\n  border-bottom: none;\n}\n#app #movie .box li > div {\n  float: left;\n}\n#app #movie .box li .fl {\n  width: 1.2rem;\n  height: 1.64rem;\n  overflow: hidden;\n}\n#app #movie .box li .fl img {\n  width: 100%;\n  height: 100%;\n}\n#app #movie .box li .fr {\n  margin-left: .27rem;\n  color: #8e8e8e;\n}\n#app #movie .box li .fr p {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  width: 3.3rem;\n}\n#app #movie .box li .fr .p1 {\n  font-size: .3rem;\n  color: #000;\n  margin-top: .1rem;\n}\n#app #movie .box li .fr .p2 {\n  margin-top: .18rem;\n}\n#app #movie .box li .fr .div {\n  margin-top: .23rem;\n  width: 3.6rem;\n  overflow: hidden;\n}\n#app #movie .box li .fr .div div:nth-of-type(1) {\n  float: left;\n}\n#app #movie .box li .fr .div div:nth-of-type(2) {\n  float: right;\n}\n#app #movie .box li .fr .div span {\n  color: #8aa2bf;\n}\n#app #movie .box li .fr .div2 {\n  margin-top: .23rem;\n  overflow: hidden;\n  color: #ffb375;\n}\n#app #movie .box li .fr .div2 div {\n  float: left;\n  margin-right: 0.3rem;\n}\n#app .m_box {\n  width: 90%;\n  margin: .3rem auto 0 auto;\n  background: #f0f0f0;\n}\n#app .m_box li {\n  color: #9a9a9a ;\n  margin-bottom: .34rem;\n  padding-bottom: .1rem;\n  box-shadow: 0.5px 0.5px 1px #a8a8a8;\n  background: #f9f9f9 ;\n}\n#app .m_box li img {\n  width: 100%;\n}\n#app .m_box li div {\n  margin-top: .2rem;\n  position: relative;\n}\n#app .m_box li div p {\n  padding-left: 0.3rem;\n}\n#app .m_box li div .p1 {\n  color: #333;\n  font-size: .25rem;\n}\n#app .m_box li div .fen {\n  color: #f78360;\n  font-size: .37rem;\n  position: absolute;\n  right: .34rem;\n  top: 1px ;\n}\n#app .more {\n  width: 3.2rem;\n  display: block;\n  height: .6rem;\n  background: transparent;\n  border: 1px solid #aaa;\n  border-radius: .3rem;\n  margin: .4rem auto .6rem;\n  text-align: center;\n  line-height: .6rem;\n  font-size: .24rem;\n  color: #616161;\n  cursor: pointer;\n}\n#app .cut {\n  width: 1.3rem;\n  height: .4rem;\n  margin: 0 auto;\n  margin-bottom: -0.2rem;\n  border-radius: .1rem;\n  font-size: .2rem;\n  line-height: .4rem;\n  text-align: center;\n  color: #eee;\n  background-color: #a7a7a7;\n}\n#app .cut_after {\n  width: 100%;\n  height: 1px;\n  background: #a8a8a8;\n  margin-bottom: 1rem;\n}\n#app .up {\n  width: .92rem;\n  height: .92rem;\n  border-radius: 50%;\n  background: rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n  cursor: pointer;\n  position: fixed;\n  z-index: 1111;\n  right: .25rem;\n  bottom: 0.25rem;\n  transform: translate3d(0, 1.5rem, 0);\n  transition: all .5s ;\n}\n#app .up img {\n  width: 100%;\n}\n#details {\n  padding-bottom: .6rem;\n  font-size: .24rem;\n  background: #f0f0f0;\n  color: #333;\n}\n#details > img {\n  width: 100%;\n}\n#details .part1 {\n  font-size: .32rem ;\n  margin: .28rem 0 .2rem 0;\n}\n#details .part1 span {\n  display: inline-block;\n  width: .3rem;\n  background: #e4c89c;\n  margin-right: .1rem;\n}\n#details p {\n  text-indent: .4rem;\n  line-height: .6rem;\n}\n#details p span {\n  margin-right: 0.1rem;\n}\n#details .part2 {\n  margin-top: .1rem;\n  padding-left: .4rem;\n  line-height: .38rem;\n  padding-right: .4rem;\n}\n#details .bth {\n  text-align: center;\n  margin: .4rem auto;\n  margin-bottom: 0;\n  font-size: .28rem;\n  width: 3.12rem;\n  height: .72rem;\n  line-height: .72rem;\n  border: none;\n  background-color: #fe8233;\n  padding: 0;\n  border-radius: .36rem;\n  color: #fff;\n}\n#cinema .div {\n  height: .8rem;\n  line-height: .8rem;\n  font-size: .28rem;\n  padding-left: .32rem;\n  background: #e1e1e1;\n  margin-bottom: 1px;\n  color: #636363;\n  cursor: pointer;\n}\n#cinema ul {\n  display: none;\n}\n#cinema ul li {\n  padding: .2rem 0 .24rem .32rem;\n  cursor: pointer;\n  position: relative;\n  border-bottom: 1px solid #e1e1e1;\n}\n#cinema ul li h6 {\n  width: .17rem;\n  height: .17rem;\n  display: inline-block;\n  border: 1px solid #ccc;\n  transform: rotate(45deg);\n  border-left: none;\n  border-bottom: none;\n  position: absolute;\n  right: .3rem;\n  top: .35rem;\n}\n#cinema ul li > div {\n  font-size: .32rem;\n  width: 100%;\n  height: .5rem;\n}\n#cinema ul li > div p {\n  display: inline-block;\n  color: #111;\n  max-width: 4rem;\n}\n#cinema ul li > div span {\n  border-radius: 50%;\n  font-size: .3rem;\n  display: inline-block;\n  width: .55rem;\n  height: .55rem;\n  line-height: .55rem;\n  text-align: center;\n  transform: scale(0.6, 0.6);\n  position: relative;\n  top: -0.1rem;\n}\n#cinema ul li > div span:nth-of-type(1) {\n  border: 1px solid #ff9658;\n  color: #ff9658;\n}\n#cinema ul li > div span:nth-of-type(2) {\n  border: 1px solid #9ebdd2;\n  color: #9ebdd2;\n  position: relative;\n  left: -0.1rem;\n}\n#cinema ul li p {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n#cinema ul li .p1 {\n  color: #ccc;\n  margin-top: .1rem;\n  max-width: 83%;\n}\n#cinema ul li .p2 {\n  color: #ccc;\n  margin-top: .1rem;\n}\n#cinema ul li h5 {\n  display: inline-block;\n  margin-top: .1rem;\n  margin-bottom: 1px;\n  height: .32rem;\n  line-height: .32rem;\n  padding: 0 .1rem;\n  color: white;\n  font-weight: normal;\n  border-radius: 0.07rem;\n  transform: scale(0.95);\n  font-size: .2rem;\n}\n#cinema ul li .h1 {\n  background: #51add0;\n}\n#cinema ul li .h2 {\n  background: #ff9658;\n}\n#shop .tit {\n  overflow: hidden;\n  padding: .2rem 0 .12rem 0;\n}\n#shop .tit li {\n  float: left;\n  width: 25%;\n  height: 1.5rem;\n  text-align: center;\n}\n#shop .tit li img {\n  width: .8rem;\n  margin-bottom: 0.05rem;\n}\n#shop .tit li p {\n  color: #333;\n  opacity: 0.5;\n}\n#shop > p {\n  background: #f2f2f2;\n  height: .5rem;\n  line-height: .5rem;\n  text-indent: .22rem;\n  font-size: .24rem;\n}\n#shop > p span {\n  opacity: .8;\n  color: #333;\n}\n#shop .box {\n  overflow: hidden;\n  width: 100%;\n}\n#shop .box li {\n  padding: .2rem;\n  overflow: hidden;\n  border-bottom: 1px solid #efefef ;\n}\n#shop .box li > div {\n  float: left;\n}\n#shop .box li .fl {\n  width: 1.6rem;\n  height: 1.6rem;\n  overflow: hidden;\n}\n#shop .box li .fl img {\n  width: 100%;\n  height: 100%;\n}\n#shop .box li .fr {\n  position: relative;\n  width: 3.95rem;\n  margin-left: .22rem;\n  height: 1.6rem;\n}\n#shop .box li .fr .p1 {\n  font-size: .28rem;\n  color: #111;\n  line-height: .3rem;\n  min-height: .45rem;\n  max-height: .6rem;\n  overflow-y: hidden;\n}\n#shop .box li .fr .p2 {\n  margin-top: .12rem;\n  color: #999;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n#shop .box li .fr .p3 {\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  color: #999;\n  opacity: .8;\n}\n#shop .box li .fr .p3 span:nth-of-type(1) {\n  color: #ff5000;\n  font-size: .31rem;\n}\n#shop .box li .fr .p3 span:nth-of-type(2) {\n  float: right;\n  margin-right: -0.1rem;\n}\n#mine .part1 {\n  height: 3.03rem;\n  background: #303030;\n  padding: .72rem .24rem .48rem 10%;\n  box-sizing: border-box;\n}\n#mine .part1 > div {\n  width: 1.84rem;\n  height: 1.84rem;\n  border-radius: 50%;\n  margin-right: .28rem;\n  float: left;\n  overflow: hidden;\n}\n#mine .part1 > div img {\n  width: 100%;\n}\n#mine .part1 ul {\n  float: left;\n  color: white;\n  margin-top: .32rem;\n}\n#mine .part1 ul li {\n  margin-bottom: 0.1rem;\n}\n#mine .part1 ul li:nth-of-type(1) {\n  font-size: .28rem;\n}\n#mine .part1 ul li:nth-of-type(3) {\n  cursor: pointer;\n  color: #ffbd80;\n  text-decoration: underline;\n}\n#mine .part2 h5 {\n  height: .28rem;\n  width: 100%;\n  background: #f0f0f0;\n}\n#mine .part2 > div,\n#mine .part2 li {\n  padding: 0 .25rem 0 .35rem;\n  line-height: 1.1rem;\n  background-color: #fff;\n  cursor: pointer;\n  font-size: .25rem;\n  color: #222;\n}\n#mine .part2 > div i,\n#mine .part2 li i {\n  width: .16rem;\n  height: .16rem;\n  display: inline-block;\n  border: 1px solid #999;\n  opacity: .7;\n  transform: rotate(45deg);\n  border-left: none;\n  border-bottom: none;\n  float: right;\n  margin-top: .45rem;\n  margin-right: .1rem;\n}\n#mine .part2 > div > span,\n#mine .part2 li > span {\n  display: block;\n  border-bottom: solid 1px #eaeaea;\n}\n#mine .part2 > div .span,\n#mine .part2 li .span {\n  float: right;\n  margin-right: .06rem;\n}\n#mine .part2 > div .span span,\n#mine .part2 li .span span {\n  color: #e7a858;\n  margin-right: 0.06rem;\n}\n#citys p {\n  height: .8rem;\n  background: #ebebeb;\n  padding-left: .32rem;\n  line-height: .8rem;\n  font-size: .28rem;\n  font-weight: bold;\n  color: #333;\n}\n#citys p:nth-of-type(1),\n#citys > p:nth-of-type(3),\n#citys > p:nth-of-type(4) {\n  font-weight: normal;\n}\n#citys p:nth-of-type(2) {\n  background: white;\n  font-size: .32rem;\n  font-weight: normal;\n  color: #e2941a;\n  height: .94rem;\n  line-height: .94rem;\n  padding-left: .5rem;\n}\n#citys ul {\n  overflow: hidden;\n  width: 100%;\n}\n#citys ul li {\n  height: .94rem;\n  line-height: .94rem;\n  color: #838383;\n  font-size: .32rem;\n  width: 25%;\n  text-align: center;\n  float: left;\n  border-bottom: #ebebeb 1px solid;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\n#card {\n  width: 100%;\n  margin: 0 auto;\n}\n#card .card_wrapper {\n  width: 90%;\n  margin: 0 auto;\n}\n#card .tit {\n  height: 1rem;\n  line-height: 1rem;\n  overflow: hidden;\n  border-bottom: solid #fe6e00 1px;\n}\n#card .tit li {\n  height: 1rem;\n  float: left;\n  color: #6a6a6a;\n  width: 50%;\n  text-align: center;\n  box-sizing: border-box;\n  font-size: .3rem;\n  border-bottom: 3px solid transparent ;\n}\n#card .tit .active {\n  color: #fe6e00;\n  border-bottom: 3px solid #fe6e00;\n}\n#card .box .bth {\n  width: 3.2rem;\n  margin: .9rem auto .6rem;\n  border-radius: .36rem;\n  background-color: #fe8233;\n  height: .72rem;\n  color: #fff;\n  font-size: .28rem;\n  line-height: .72rem;\n  text-align: center;\n}\n#card .box > div {\n  width: 5.12rem ;\n  height: .68rem;\n  margin: 0 auto;\n}\n#card .box > div h5 {\n  height: 5px;\n  width: 100%;\n  border: 1px solid #ccc;\n  border-top: none;\n  margin-top: -0.1rem;\n}\n#card .box > div > div {\n  width: 100%;\n  overflow: hidden;\n  color: #333;\n  font-size: .28rem;\n  margin-top: .6rem;\n}\n#card .box > div > div p {\n  line-height: .68rem;\n  margin: 0 .3rem 0 .2rem;\n  float: left;\n}\n#card .box > div > div input {\n  float: left;\n  line-height: .68rem ;\n  font-size: .28rem;\n  margin-left: 0.15rem;\n}\n.router-enter {\n  transition: all .5s ;\n  transform: translate3d(100%, 0, 0);\n  position: absolute;\n  top: 0;\n  background: white;\n  width: 100%;\n  height: 100%;\n  z-index: 999;\n  opacity: .1;\n}\n.router-enter-active {\n  transform: translate3d(0%, 0, 0);\n  opacity: 1;\n}\n", ""]);

// exports


/***/ }),

/***/ 295:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 296:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */

var invariant = __webpack_require__(1);

/**
 * The CSSCore module specifies the API (and implements most of the methods)
 * that should be used when dealing with the display of elements (via their
 * CSS classes and visibility on screen. It is an API focused on mutating the
 * display and not reading it as no logical state should be encoded in the
 * display of elements.
 */

/* Slow implementation for browsers that don't natively support .matches() */
function matchesSelector_SLOW(element, selector) {
  var root = element;
  while (root.parentNode) {
    root = root.parentNode;
  }

  var all = root.querySelectorAll(selector);
  return Array.prototype.indexOf.call(all, element) !== -1;
}

var CSSCore = {

  /**
   * Adds the class passed in to the element if it doesn't already have it.
   *
   * @param {DOMElement} element the element to set the class on
   * @param {string} className the CSS className
   * @return {DOMElement} the element passed in
   */
  addClass: function addClass(element, className) {
    !!/\s/.test(className) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'CSSCore.addClass takes only a single class name. "%s" contains ' + 'multiple classes.', className) : invariant(false) : void 0;

    if (className) {
      if (element.classList) {
        element.classList.add(className);
      } else if (!CSSCore.hasClass(element, className)) {
        element.className = element.className + ' ' + className;
      }
    }
    return element;
  },

  /**
   * Removes the class passed in from the element
   *
   * @param {DOMElement} element the element to set the class on
   * @param {string} className the CSS className
   * @return {DOMElement} the element passed in
   */
  removeClass: function removeClass(element, className) {
    !!/\s/.test(className) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'CSSCore.removeClass takes only a single class name. "%s" contains ' + 'multiple classes.', className) : invariant(false) : void 0;

    if (className) {
      if (element.classList) {
        element.classList.remove(className);
      } else if (CSSCore.hasClass(element, className)) {
        element.className = element.className.replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)', 'g'), '$1').replace(/\s+/g, ' ') // multiple spaces to one
        .replace(/^\s*|\s*$/g, ''); // trim the ends
      }
    }
    return element;
  },

  /**
   * Helper to add or remove a class from an element based on a condition.
   *
   * @param {DOMElement} element the element to set the class on
   * @param {string} className the CSS className
   * @param {*} bool condition to whether to add or remove the class
   * @return {DOMElement} the element passed in
   */
  conditionClass: function conditionClass(element, className, bool) {
    return (bool ? CSSCore.addClass : CSSCore.removeClass)(element, className);
  },

  /**
   * Tests whether the element has the class specified.
   *
   * @param {DOMNode|DOMWindow} element the element to check the class on
   * @param {string} className the CSS className
   * @return {boolean} true if the element has the class, false if not
   */
  hasClass: function hasClass(element, className) {
    !!/\s/.test(className) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'CSS.hasClass takes only a single class name.') : invariant(false) : void 0;
    if (element.classList) {
      return !!className && element.classList.contains(className);
    }
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
  },

  /**
   * Tests whether the element matches the selector specified
   *
   * @param {DOMNode|DOMWindow} element the element that we are querying
   * @param {string} selector the CSS selector
   * @return {boolean} true if the element matches the selector, false if not
   */
  matchesSelector: function matchesSelector(element, selector) {
    var matchesImpl = element.matches || element.webkitMatchesSelector || element.mozMatchesSelector || element.msMatchesSelector || function (s) {
      return matchesSelector_SLOW(element, s);
    };
    return matchesImpl.call(element, selector);
  }

};

module.exports = CSSCore;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 297:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(303);

/***/ }),

/***/ 298:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Types of raw signals from the browser caught at the top level.
 */
var topLevelTypes = {
  topAbort: null,
  topAnimationEnd: null,
  topAnimationIteration: null,
  topAnimationStart: null,
  topBlur: null,
  topCanPlay: null,
  topCanPlayThrough: null,
  topChange: null,
  topClick: null,
  topCompositionEnd: null,
  topCompositionStart: null,
  topCompositionUpdate: null,
  topContextMenu: null,
  topCopy: null,
  topCut: null,
  topDoubleClick: null,
  topDrag: null,
  topDragEnd: null,
  topDragEnter: null,
  topDragExit: null,
  topDragLeave: null,
  topDragOver: null,
  topDragStart: null,
  topDrop: null,
  topDurationChange: null,
  topEmptied: null,
  topEncrypted: null,
  topEnded: null,
  topError: null,
  topFocus: null,
  topInput: null,
  topInvalid: null,
  topKeyDown: null,
  topKeyPress: null,
  topKeyUp: null,
  topLoad: null,
  topLoadedData: null,
  topLoadedMetadata: null,
  topLoadStart: null,
  topMouseDown: null,
  topMouseMove: null,
  topMouseOut: null,
  topMouseOver: null,
  topMouseUp: null,
  topPaste: null,
  topPause: null,
  topPlay: null,
  topPlaying: null,
  topProgress: null,
  topRateChange: null,
  topReset: null,
  topScroll: null,
  topSeeked: null,
  topSeeking: null,
  topSelectionChange: null,
  topStalled: null,
  topSubmit: null,
  topSuspend: null,
  topTextInput: null,
  topTimeUpdate: null,
  topTouchCancel: null,
  topTouchEnd: null,
  topTouchMove: null,
  topTouchStart: null,
  topTransitionEnd: null,
  topVolumeChange: null,
  topWaiting: null,
  topWheel: null
};

var EventConstants = {
  topLevelTypes: topLevelTypes
};

module.exports = EventConstants;

/***/ }),

/***/ 299:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _assign = __webpack_require__(4);

var _extends = _assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var ReactDebugTool = __webpack_require__(135);
var warning = __webpack_require__(2);
var alreadyWarned = false;

function roundFloat(val) {
  var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  var n = Math.pow(10, base);
  return Math.floor(val * n) / n;
}

// Flow type definition of console.table is too strict right now, see
// https://github.com/facebook/flow/pull/2353 for updates
function consoleTable(table) {
  console.table(table);
}

function warnInProduction() {
  if (alreadyWarned) {
    return;
  }
  alreadyWarned = true;
  if (typeof console !== 'undefined') {
    console.error('ReactPerf is not supported in the production builds of React. ' + 'To collect measurements, please use the development build of React instead.');
  }
}

function getLastMeasurements() {
  if (!(process.env.NODE_ENV !== 'production')) {
    warnInProduction();
    return [];
  }

  return ReactDebugTool.getFlushHistory();
}

function getExclusive() {
  var flushHistory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getLastMeasurements();

  if (!(process.env.NODE_ENV !== 'production')) {
    warnInProduction();
    return [];
  }

  var aggregatedStats = {};
  var affectedIDs = {};

  function updateAggregatedStats(treeSnapshot, instanceID, timerType, applyUpdate) {
    var displayName = treeSnapshot[instanceID].displayName;

    var key = displayName;
    var stats = aggregatedStats[key];
    if (!stats) {
      affectedIDs[key] = {};
      stats = aggregatedStats[key] = {
        key: key,
        instanceCount: 0,
        counts: {},
        durations: {},
        totalDuration: 0
      };
    }
    if (!stats.durations[timerType]) {
      stats.durations[timerType] = 0;
    }
    if (!stats.counts[timerType]) {
      stats.counts[timerType] = 0;
    }
    affectedIDs[key][instanceID] = true;
    applyUpdate(stats);
  }

  flushHistory.forEach(function (flush) {
    var measurements = flush.measurements,
        treeSnapshot = flush.treeSnapshot;

    measurements.forEach(function (measurement) {
      var duration = measurement.duration,
          instanceID = measurement.instanceID,
          timerType = measurement.timerType;

      updateAggregatedStats(treeSnapshot, instanceID, timerType, function (stats) {
        stats.totalDuration += duration;
        stats.durations[timerType] += duration;
        stats.counts[timerType]++;
      });
    });
  });

  return Object.keys(aggregatedStats).map(function (key) {
    return _extends({}, aggregatedStats[key], {
      instanceCount: Object.keys(affectedIDs[key]).length
    });
  }).sort(function (a, b) {
    return b.totalDuration - a.totalDuration;
  });
}

function getInclusive() {
  var flushHistory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getLastMeasurements();

  if (!(process.env.NODE_ENV !== 'production')) {
    warnInProduction();
    return [];
  }

  var aggregatedStats = {};
  var affectedIDs = {};

  function updateAggregatedStats(treeSnapshot, instanceID, applyUpdate) {
    var _treeSnapshot$instanc = treeSnapshot[instanceID],
        displayName = _treeSnapshot$instanc.displayName,
        ownerID = _treeSnapshot$instanc.ownerID;

    var owner = treeSnapshot[ownerID];
    var key = (owner ? owner.displayName + ' > ' : '') + displayName;
    var stats = aggregatedStats[key];
    if (!stats) {
      affectedIDs[key] = {};
      stats = aggregatedStats[key] = {
        key: key,
        instanceCount: 0,
        inclusiveRenderDuration: 0,
        renderCount: 0
      };
    }
    affectedIDs[key][instanceID] = true;
    applyUpdate(stats);
  }

  var isCompositeByID = {};
  flushHistory.forEach(function (flush) {
    var measurements = flush.measurements;

    measurements.forEach(function (measurement) {
      var instanceID = measurement.instanceID,
          timerType = measurement.timerType;

      if (timerType !== 'render') {
        return;
      }
      isCompositeByID[instanceID] = true;
    });
  });

  flushHistory.forEach(function (flush) {
    var measurements = flush.measurements,
        treeSnapshot = flush.treeSnapshot;

    measurements.forEach(function (measurement) {
      var duration = measurement.duration,
          instanceID = measurement.instanceID,
          timerType = measurement.timerType;

      if (timerType !== 'render') {
        return;
      }
      updateAggregatedStats(treeSnapshot, instanceID, function (stats) {
        stats.renderCount++;
      });
      var nextParentID = instanceID;
      while (nextParentID) {
        // As we traverse parents, only count inclusive time towards composites.
        // We know something is a composite if its render() was called.
        if (isCompositeByID[nextParentID]) {
          updateAggregatedStats(treeSnapshot, nextParentID, function (stats) {
            stats.inclusiveRenderDuration += duration;
          });
        }
        nextParentID = treeSnapshot[nextParentID].parentID;
      }
    });
  });

  return Object.keys(aggregatedStats).map(function (key) {
    return _extends({}, aggregatedStats[key], {
      instanceCount: Object.keys(affectedIDs[key]).length
    });
  }).sort(function (a, b) {
    return b.inclusiveRenderDuration - a.inclusiveRenderDuration;
  });
}

function getWasted() {
  var flushHistory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getLastMeasurements();

  if (!(process.env.NODE_ENV !== 'production')) {
    warnInProduction();
    return [];
  }

  var aggregatedStats = {};
  var affectedIDs = {};

  function updateAggregatedStats(treeSnapshot, instanceID, applyUpdate) {
    var _treeSnapshot$instanc2 = treeSnapshot[instanceID],
        displayName = _treeSnapshot$instanc2.displayName,
        ownerID = _treeSnapshot$instanc2.ownerID;

    var owner = treeSnapshot[ownerID];
    var key = (owner ? owner.displayName + ' > ' : '') + displayName;
    var stats = aggregatedStats[key];
    if (!stats) {
      affectedIDs[key] = {};
      stats = aggregatedStats[key] = {
        key: key,
        instanceCount: 0,
        inclusiveRenderDuration: 0,
        renderCount: 0
      };
    }
    affectedIDs[key][instanceID] = true;
    applyUpdate(stats);
  }

  flushHistory.forEach(function (flush) {
    var measurements = flush.measurements,
        treeSnapshot = flush.treeSnapshot,
        operations = flush.operations;

    var isDefinitelyNotWastedByID = {};

    // Find host components associated with an operation in this batch.
    // Mark all components in their parent tree as definitely not wasted.
    operations.forEach(function (operation) {
      var instanceID = operation.instanceID;

      var nextParentID = instanceID;
      while (nextParentID) {
        isDefinitelyNotWastedByID[nextParentID] = true;
        nextParentID = treeSnapshot[nextParentID].parentID;
      }
    });

    // Find composite components that rendered in this batch.
    // These are potential candidates for being wasted renders.
    var renderedCompositeIDs = {};
    measurements.forEach(function (measurement) {
      var instanceID = measurement.instanceID,
          timerType = measurement.timerType;

      if (timerType !== 'render') {
        return;
      }
      renderedCompositeIDs[instanceID] = true;
    });

    measurements.forEach(function (measurement) {
      var duration = measurement.duration,
          instanceID = measurement.instanceID,
          timerType = measurement.timerType;

      if (timerType !== 'render') {
        return;
      }

      // If there was a DOM update below this component, or it has just been
      // mounted, its render() is not considered wasted.
      var updateCount = treeSnapshot[instanceID].updateCount;

      if (isDefinitelyNotWastedByID[instanceID] || updateCount === 0) {
        return;
      }

      // We consider this render() wasted.
      updateAggregatedStats(treeSnapshot, instanceID, function (stats) {
        stats.renderCount++;
      });

      var nextParentID = instanceID;
      while (nextParentID) {
        // Any parents rendered during this batch are considered wasted
        // unless we previously marked them as dirty.
        var isWasted = renderedCompositeIDs[nextParentID] && !isDefinitelyNotWastedByID[nextParentID];
        if (isWasted) {
          updateAggregatedStats(treeSnapshot, nextParentID, function (stats) {
            stats.inclusiveRenderDuration += duration;
          });
        }
        nextParentID = treeSnapshot[nextParentID].parentID;
      }
    });
  });

  return Object.keys(aggregatedStats).map(function (key) {
    return _extends({}, aggregatedStats[key], {
      instanceCount: Object.keys(affectedIDs[key]).length
    });
  }).sort(function (a, b) {
    return b.inclusiveRenderDuration - a.inclusiveRenderDuration;
  });
}

function getOperations() {
  var flushHistory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getLastMeasurements();

  if (!(process.env.NODE_ENV !== 'production')) {
    warnInProduction();
    return [];
  }

  var stats = [];
  flushHistory.forEach(function (flush, flushIndex) {
    var operations = flush.operations,
        treeSnapshot = flush.treeSnapshot;

    operations.forEach(function (operation) {
      var instanceID = operation.instanceID,
          type = operation.type,
          payload = operation.payload;
      var _treeSnapshot$instanc3 = treeSnapshot[instanceID],
          displayName = _treeSnapshot$instanc3.displayName,
          ownerID = _treeSnapshot$instanc3.ownerID;

      var owner = treeSnapshot[ownerID];
      var key = (owner ? owner.displayName + ' > ' : '') + displayName;

      stats.push({
        flushIndex: flushIndex,
        instanceID: instanceID,
        key: key,
        type: type,
        ownerID: ownerID,
        payload: payload
      });
    });
  });
  return stats;
}

function printExclusive(flushHistory) {
  if (!(process.env.NODE_ENV !== 'production')) {
    warnInProduction();
    return;
  }

  var stats = getExclusive(flushHistory);
  var table = stats.map(function (item) {
    var key = item.key,
        instanceCount = item.instanceCount,
        totalDuration = item.totalDuration;

    var renderCount = item.counts.render || 0;
    var renderDuration = item.durations.render || 0;
    return {
      'Component': key,
      'Total time (ms)': roundFloat(totalDuration),
      'Instance count': instanceCount,
      'Total render time (ms)': roundFloat(renderDuration),
      'Average render time (ms)': renderCount ? roundFloat(renderDuration / renderCount) : undefined,
      'Render count': renderCount,
      'Total lifecycle time (ms)': roundFloat(totalDuration - renderDuration)
    };
  });
  consoleTable(table);
}

function printInclusive(flushHistory) {
  if (!(process.env.NODE_ENV !== 'production')) {
    warnInProduction();
    return;
  }

  var stats = getInclusive(flushHistory);
  var table = stats.map(function (item) {
    var key = item.key,
        instanceCount = item.instanceCount,
        inclusiveRenderDuration = item.inclusiveRenderDuration,
        renderCount = item.renderCount;

    return {
      'Owner > Component': key,
      'Inclusive render time (ms)': roundFloat(inclusiveRenderDuration),
      'Instance count': instanceCount,
      'Render count': renderCount
    };
  });
  consoleTable(table);
}

function printWasted(flushHistory) {
  if (!(process.env.NODE_ENV !== 'production')) {
    warnInProduction();
    return;
  }

  var stats = getWasted(flushHistory);
  var table = stats.map(function (item) {
    var key = item.key,
        instanceCount = item.instanceCount,
        inclusiveRenderDuration = item.inclusiveRenderDuration,
        renderCount = item.renderCount;

    return {
      'Owner > Component': key,
      'Inclusive wasted time (ms)': roundFloat(inclusiveRenderDuration),
      'Instance count': instanceCount,
      'Render count': renderCount
    };
  });
  consoleTable(table);
}

function printOperations(flushHistory) {
  if (!(process.env.NODE_ENV !== 'production')) {
    warnInProduction();
    return;
  }

  var stats = getOperations(flushHistory);
  var table = stats.map(function (stat) {
    return {
      'Owner > Node': stat.key,
      'Operation': stat.type,
      'Payload': typeof stat.payload === 'object' ? JSON.stringify(stat.payload) : stat.payload,
      'Flush index': stat.flushIndex,
      'Owner Component ID': stat.ownerID,
      'DOM Component ID': stat.instanceID
    };
  });
  consoleTable(table);
}

var warnedAboutPrintDOM = false;
function printDOM(measurements) {
  process.env.NODE_ENV !== 'production' ? warning(warnedAboutPrintDOM, '`ReactPerf.printDOM(...)` is deprecated. Use ' + '`ReactPerf.printOperations(...)` instead.') : void 0;
  warnedAboutPrintDOM = true;
  return printOperations(measurements);
}

var warnedAboutGetMeasurementsSummaryMap = false;
function getMeasurementsSummaryMap(measurements) {
  process.env.NODE_ENV !== 'production' ? warning(warnedAboutGetMeasurementsSummaryMap, '`ReactPerf.getMeasurementsSummaryMap(...)` is deprecated. Use ' + '`ReactPerf.getWasted(...)` instead.') : void 0;
  warnedAboutGetMeasurementsSummaryMap = true;
  return getWasted(measurements);
}

function start() {
  if (!(process.env.NODE_ENV !== 'production')) {
    warnInProduction();
    return;
  }

  ReactDebugTool.beginProfiling();
}

function stop() {
  if (!(process.env.NODE_ENV !== 'production')) {
    warnInProduction();
    return;
  }

  ReactDebugTool.endProfiling();
}

function isRunning() {
  if (!(process.env.NODE_ENV !== 'production')) {
    warnInProduction();
    return false;
  }

  return ReactDebugTool.isProfiling();
}

var ReactPerfAnalysis = {
  getLastMeasurements: getLastMeasurements,
  getExclusive: getExclusive,
  getInclusive: getInclusive,
  getWasted: getWasted,
  getOperations: getOperations,
  printExclusive: printExclusive,
  printInclusive: printInclusive,
  printWasted: printWasted,
  printOperations: printOperations,
  start: start,
  stop: stop,
  isRunning: isRunning,
  // Deprecated:
  printDOM: printDOM,
  getMeasurementsSummaryMap: getMeasurementsSummaryMap
};

module.exports = ReactPerfAnalysis;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 300:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(3),
    _assign = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var React = __webpack_require__(24);
var ReactCompositeComponent = __webpack_require__(134);
var ReactDefaultBatchingStrategy = __webpack_require__(136);
var ReactReconciler = __webpack_require__(26);
var ReactReconcileTransaction = __webpack_require__(137);
var ReactUpdates = __webpack_require__(13);

var emptyObject = __webpack_require__(25);
var getNextDebugID = __webpack_require__(141);
var invariant = __webpack_require__(1);

function injectDefaults() {
  ReactUpdates.injection.injectReconcileTransaction(ReactReconcileTransaction);
  ReactUpdates.injection.injectBatchingStrategy(ReactDefaultBatchingStrategy);
}

var NoopInternalComponent = function () {
  function NoopInternalComponent(element) {
    _classCallCheck(this, NoopInternalComponent);

    this._renderedOutput = element;
    this._currentElement = element;

    if (process.env.NODE_ENV !== 'production') {
      this._debugID = getNextDebugID();
    }
  }

  NoopInternalComponent.prototype.mountComponent = function mountComponent() {};

  NoopInternalComponent.prototype.receiveComponent = function receiveComponent(element) {
    this._renderedOutput = element;
    this._currentElement = element;
  };

  NoopInternalComponent.prototype.unmountComponent = function unmountComponent() {};

  NoopInternalComponent.prototype.getHostNode = function getHostNode() {
    return undefined;
  };

  NoopInternalComponent.prototype.getPublicInstance = function getPublicInstance() {
    return null;
  };

  return NoopInternalComponent;
}();

var ShallowComponentWrapper = function (element) {
  // TODO: Consolidate with instantiateReactComponent
  if (process.env.NODE_ENV !== 'production') {
    this._debugID = getNextDebugID();
  }

  this.construct(element);
};
_assign(ShallowComponentWrapper.prototype, ReactCompositeComponent, {
  _constructComponent: ReactCompositeComponent._constructComponentWithoutOwner,
  _instantiateReactComponent: function (element) {
    return new NoopInternalComponent(element);
  },
  _replaceNodeWithMarkup: function () {},
  _renderValidatedComponent: ReactCompositeComponent._renderValidatedComponentWithoutOwnerOrContext
});

function _batchedRender(renderer, element, context) {
  var transaction = ReactUpdates.ReactReconcileTransaction.getPooled(true);
  renderer._render(element, transaction, context);
  ReactUpdates.ReactReconcileTransaction.release(transaction);
}

var ReactShallowRenderer = function () {
  function ReactShallowRenderer() {
    _classCallCheck(this, ReactShallowRenderer);

    this._instance = null;
  }

  ReactShallowRenderer.prototype.getMountedInstance = function getMountedInstance() {
    return this._instance ? this._instance._instance : null;
  };

  ReactShallowRenderer.prototype.render = function render(element, context) {
    // Ensure we've done the default injections. This might not be true in the
    // case of a simple test that only requires React and the TestUtils in
    // conjunction with an inline-requires transform.
    injectDefaults();

    !React.isValidElement(element) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactShallowRenderer render(): Invalid component element.%s', typeof element === 'function' ? ' Instead of passing a component class, make sure to instantiate ' + 'it by passing it to React.createElement.' : '') : _prodInvariant('12', typeof element === 'function' ? ' Instead of passing a component class, make sure to instantiate ' + 'it by passing it to React.createElement.' : '') : void 0;
    !(typeof element.type !== 'string') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactShallowRenderer render(): Shallow rendering works only with custom components, not primitives (%s). Instead of calling `.render(el)` and inspecting the rendered output, look at `el.props` directly instead.', element.type) : _prodInvariant('13', element.type) : void 0;

    if (!context) {
      context = emptyObject;
    }
    ReactUpdates.batchedUpdates(_batchedRender, this, element, context);

    return this.getRenderOutput();
  };

  ReactShallowRenderer.prototype.getRenderOutput = function getRenderOutput() {
    return this._instance && this._instance._renderedComponent && this._instance._renderedComponent._renderedOutput || null;
  };

  ReactShallowRenderer.prototype.unmount = function unmount() {
    if (this._instance) {
      ReactReconciler.unmountComponent(this._instance, false);
    }
  };

  ReactShallowRenderer.prototype.unstable_batchedUpdates = function unstable_batchedUpdates(callback, bookkeeping) {
    // This is used by Enzyme for fake-simulating events in shallow mode.
    injectDefaults();
    return ReactUpdates.batchedUpdates(callback, bookkeeping);
  };

  ReactShallowRenderer.prototype._render = function _render(element, transaction, context) {
    if (this._instance) {
      ReactReconciler.receiveComponent(this._instance, element, transaction, context);
    } else {
      var instance = new ShallowComponentWrapper(element);
      ReactReconciler.mountComponent(instance, transaction, null, null, context, 0);
      this._instance = instance;
    }
  };

  return ReactShallowRenderer;
}();

ReactShallowRenderer.createRenderer = function () {
  return new ReactShallowRenderer();
};

module.exports = ReactShallowRenderer;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 301:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(3),
    _assign = __webpack_require__(4);

var EventConstants = __webpack_require__(298);
var EventPluginHub = __webpack_require__(31);
var EventPluginRegistry = __webpack_require__(36);
var EventPropagators = __webpack_require__(32);
var React = __webpack_require__(24);
var ReactDOM = __webpack_require__(133);
var ReactDOMComponentTree = __webpack_require__(5);
var ReactBrowserEventEmitter = __webpack_require__(37);
var ReactInstanceMap = __webpack_require__(33);
var ReactUpdates = __webpack_require__(13);
var SyntheticEvent = __webpack_require__(15);
var ReactShallowRenderer = __webpack_require__(300);

var findDOMNode = __webpack_require__(138);
var invariant = __webpack_require__(1);
var warning = __webpack_require__(2);

var topLevelTypes = EventConstants.topLevelTypes;

function Event(suffix) {}

// In react 16+ shallowRenderer will not be accessible via ReactTestUtils.createRenderer()
// Instead it will be available via react-test-renderer/shallow
// Maintain backwards compat for 15.5.0 release, but warn about using the deprecated method
var hasWarnedAboutCreateRenderer = false;
function createRendererWithWarning() {
  process.env.NODE_ENV !== 'production' ? warning(hasWarnedAboutCreateRenderer, 'Shallow renderer has been moved to react-test-renderer/shallow. ' + 'Update references to remove this warning.') : void 0;
  hasWarnedAboutCreateRenderer = true;

  return new ReactShallowRenderer();
}

/**
 * @class ReactTestUtils
 */

function findAllInRenderedTreeInternal(inst, test) {
  if (!inst || !inst.getPublicInstance) {
    return [];
  }
  var publicInst = inst.getPublicInstance();
  var ret = test(publicInst) ? [publicInst] : [];
  var currentElement = inst._currentElement;
  if (ReactTestUtils.isDOMComponent(publicInst)) {
    var renderedChildren = inst._renderedChildren;
    var key;
    for (key in renderedChildren) {
      if (!renderedChildren.hasOwnProperty(key)) {
        continue;
      }
      ret = ret.concat(findAllInRenderedTreeInternal(renderedChildren[key], test));
    }
  } else if (React.isValidElement(currentElement) && typeof currentElement.type === 'function') {
    ret = ret.concat(findAllInRenderedTreeInternal(inst._renderedComponent, test));
  }
  return ret;
}

/**
 * Utilities for making it easy to test React components.
 *
 * See https://facebook.github.io/react/docs/test-utils.html
 *
 * Todo: Support the entire DOM.scry query syntax. For now, these simple
 * utilities will suffice for testing purposes.
 * @lends ReactTestUtils
 */
var ReactTestUtils = {
  renderIntoDocument: function (element) {
    var div = document.createElement('div');
    // None of our tests actually require attaching the container to the
    // DOM, and doing so creates a mess that we rely on test isolation to
    // clean up, so we're going to stop honoring the name of this method
    // (and probably rename it eventually) if no problems arise.
    // document.documentElement.appendChild(div);
    return ReactDOM.render(element, div);
  },

  isElement: function (element) {
    return React.isValidElement(element);
  },

  isElementOfType: function (inst, convenienceConstructor) {
    return React.isValidElement(inst) && inst.type === convenienceConstructor;
  },

  isDOMComponent: function (inst) {
    return !!(inst && inst.nodeType === 1 && inst.tagName);
  },

  isDOMComponentElement: function (inst) {
    return !!(inst && React.isValidElement(inst) && !!inst.tagName);
  },

  isCompositeComponent: function (inst) {
    if (ReactTestUtils.isDOMComponent(inst)) {
      // Accessing inst.setState warns; just return false as that'll be what
      // this returns when we have DOM nodes as refs directly
      return false;
    }
    return inst != null && typeof inst.render === 'function' && typeof inst.setState === 'function';
  },

  isCompositeComponentWithType: function (inst, type) {
    if (!ReactTestUtils.isCompositeComponent(inst)) {
      return false;
    }
    var internalInstance = ReactInstanceMap.get(inst);
    var constructor = internalInstance._currentElement.type;

    return constructor === type;
  },

  isCompositeComponentElement: function (inst) {
    if (!React.isValidElement(inst)) {
      return false;
    }
    // We check the prototype of the type that will get mounted, not the
    // instance itself. This is a future proof way of duck typing.
    var prototype = inst.type.prototype;
    return typeof prototype.render === 'function' && typeof prototype.setState === 'function';
  },

  isCompositeComponentElementWithType: function (inst, type) {
    var internalInstance = ReactInstanceMap.get(inst);
    var constructor = internalInstance._currentElement.type;

    return !!(ReactTestUtils.isCompositeComponentElement(inst) && constructor === type);
  },

  getRenderedChildOfCompositeComponent: function (inst) {
    if (!ReactTestUtils.isCompositeComponent(inst)) {
      return null;
    }
    var internalInstance = ReactInstanceMap.get(inst);
    return internalInstance._renderedComponent.getPublicInstance();
  },

  findAllInRenderedTree: function (inst, test) {
    if (!inst) {
      return [];
    }
    !ReactTestUtils.isCompositeComponent(inst) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'findAllInRenderedTree(...): instance must be a composite component') : _prodInvariant('10') : void 0;
    return findAllInRenderedTreeInternal(ReactInstanceMap.get(inst), test);
  },

  /**
   * Finds all instance of components in the rendered tree that are DOM
   * components with the class name matching `className`.
   * @return {array} an array of all the matches.
   */
  scryRenderedDOMComponentsWithClass: function (root, classNames) {
    return ReactTestUtils.findAllInRenderedTree(root, function (inst) {
      if (ReactTestUtils.isDOMComponent(inst)) {
        var className = inst.className;
        if (typeof className !== 'string') {
          // SVG, probably.
          className = inst.getAttribute('class') || '';
        }
        var classList = className.split(/\s+/);

        if (!Array.isArray(classNames)) {
          !(classNames !== undefined) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'TestUtils.scryRenderedDOMComponentsWithClass expects a className as a second argument.') : _prodInvariant('11') : void 0;
          classNames = classNames.split(/\s+/);
        }
        return classNames.every(function (name) {
          return classList.indexOf(name) !== -1;
        });
      }
      return false;
    });
  },

  /**
   * Like scryRenderedDOMComponentsWithClass but expects there to be one result,
   * and returns that one result, or throws exception if there is any other
   * number of matches besides one.
   * @return {!ReactDOMComponent} The one match.
   */
  findRenderedDOMComponentWithClass: function (root, className) {
    var all = ReactTestUtils.scryRenderedDOMComponentsWithClass(root, className);
    if (all.length !== 1) {
      throw new Error('Did not find exactly one match (found: ' + all.length + ') ' + 'for class:' + className);
    }
    return all[0];
  },

  /**
   * Finds all instance of components in the rendered tree that are DOM
   * components with the tag name matching `tagName`.
   * @return {array} an array of all the matches.
   */
  scryRenderedDOMComponentsWithTag: function (root, tagName) {
    return ReactTestUtils.findAllInRenderedTree(root, function (inst) {
      return ReactTestUtils.isDOMComponent(inst) && inst.tagName.toUpperCase() === tagName.toUpperCase();
    });
  },

  /**
   * Like scryRenderedDOMComponentsWithTag but expects there to be one result,
   * and returns that one result, or throws exception if there is any other
   * number of matches besides one.
   * @return {!ReactDOMComponent} The one match.
   */
  findRenderedDOMComponentWithTag: function (root, tagName) {
    var all = ReactTestUtils.scryRenderedDOMComponentsWithTag(root, tagName);
    if (all.length !== 1) {
      throw new Error('Did not find exactly one match (found: ' + all.length + ') ' + 'for tag:' + tagName);
    }
    return all[0];
  },

  /**
   * Finds all instances of components with type equal to `componentType`.
   * @return {array} an array of all the matches.
   */
  scryRenderedComponentsWithType: function (root, componentType) {
    return ReactTestUtils.findAllInRenderedTree(root, function (inst) {
      return ReactTestUtils.isCompositeComponentWithType(inst, componentType);
    });
  },

  /**
   * Same as `scryRenderedComponentsWithType` but expects there to be one result
   * and returns that one result, or throws exception if there is any other
   * number of matches besides one.
   * @return {!ReactComponent} The one match.
   */
  findRenderedComponentWithType: function (root, componentType) {
    var all = ReactTestUtils.scryRenderedComponentsWithType(root, componentType);
    if (all.length !== 1) {
      throw new Error('Did not find exactly one match (found: ' + all.length + ') ' + 'for componentType:' + componentType);
    }
    return all[0];
  },

  /**
   * Pass a mocked component module to this method to augment it with
   * useful methods that allow it to be used as a dummy React component.
   * Instead of rendering as usual, the component will become a simple
   * <div> containing any provided children.
   *
   * @param {object} module the mock function object exported from a
   *                        module that defines the component to be mocked
   * @param {?string} mockTagName optional dummy root tag name to return
   *                              from render method (overrides
   *                              module.mockTagName if provided)
   * @return {object} the ReactTestUtils object (for chaining)
   */
  mockComponent: function (module, mockTagName) {
    mockTagName = mockTagName || module.mockTagName || 'div';

    module.prototype.render.mockImplementation(function () {
      return React.createElement(mockTagName, null, this.props.children);
    });

    return this;
  },

  /**
   * Simulates a top level event being dispatched from a raw event that occurred
   * on an `Element` node.
   * @param {Object} topLevelType A type from `EventConstants.topLevelTypes`
   * @param {!Element} node The dom to simulate an event occurring on.
   * @param {?Event} fakeNativeEvent Fake native event to use in SyntheticEvent.
   */
  simulateNativeEventOnNode: function (topLevelType, node, fakeNativeEvent) {
    fakeNativeEvent.target = node;
    ReactBrowserEventEmitter.ReactEventListener.dispatchEvent(topLevelType, fakeNativeEvent);
  },

  /**
   * Simulates a top level event being dispatched from a raw event that occurred
   * on the `ReactDOMComponent` `comp`.
   * @param {Object} topLevelType A type from `EventConstants.topLevelTypes`.
   * @param {!ReactDOMComponent} comp
   * @param {?Event} fakeNativeEvent Fake native event to use in SyntheticEvent.
   */
  simulateNativeEventOnDOMComponent: function (topLevelType, comp, fakeNativeEvent) {
    ReactTestUtils.simulateNativeEventOnNode(topLevelType, findDOMNode(comp), fakeNativeEvent);
  },

  nativeTouchData: function (x, y) {
    return {
      touches: [{ pageX: x, pageY: y }]
    };
  },

  createRenderer: createRendererWithWarning,

  Simulate: null,
  SimulateNative: {}
};

/**
 * Exports:
 *
 * - `ReactTestUtils.Simulate.click(Element/ReactDOMComponent)`
 * - `ReactTestUtils.Simulate.mouseMove(Element/ReactDOMComponent)`
 * - `ReactTestUtils.Simulate.change(Element/ReactDOMComponent)`
 * - ... (All keys from event plugin `eventTypes` objects)
 */
function makeSimulator(eventType) {
  return function (domComponentOrNode, eventData) {
    var node;
    !!React.isValidElement(domComponentOrNode) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'TestUtils.Simulate expects a component instance and not a ReactElement.TestUtils.Simulate will not work if you are using shallow rendering.') : _prodInvariant('14') : void 0;
    if (ReactTestUtils.isDOMComponent(domComponentOrNode)) {
      node = findDOMNode(domComponentOrNode);
    } else if (domComponentOrNode.tagName) {
      node = domComponentOrNode;
    }

    var dispatchConfig = EventPluginRegistry.eventNameDispatchConfigs[eventType];

    var fakeNativeEvent = new Event();
    fakeNativeEvent.target = node;
    fakeNativeEvent.type = eventType.toLowerCase();

    // We don't use SyntheticEvent.getPooled in order to not have to worry about
    // properly destroying any properties assigned from `eventData` upon release
    var event = new SyntheticEvent(dispatchConfig, ReactDOMComponentTree.getInstanceFromNode(node), fakeNativeEvent, node);
    // Since we aren't using pooling, always persist the event. This will make
    // sure it's marked and won't warn when setting additional properties.
    event.persist();
    _assign(event, eventData);

    if (dispatchConfig.phasedRegistrationNames) {
      EventPropagators.accumulateTwoPhaseDispatches(event);
    } else {
      EventPropagators.accumulateDirectDispatches(event);
    }

    ReactUpdates.batchedUpdates(function () {
      EventPluginHub.enqueueEvents(event);
      EventPluginHub.processEventQueue(true);
    });
  };
}

function buildSimulators() {
  ReactTestUtils.Simulate = {};

  var eventType;
  for (eventType in EventPluginRegistry.eventNameDispatchConfigs) {
    /**
     * @param {!Element|ReactDOMComponent} domComponentOrNode
     * @param {?object} eventData Fake event data to use in SyntheticEvent.
     */
    ReactTestUtils.Simulate[eventType] = makeSimulator(eventType);
  }
}

// Rebuild ReactTestUtils.Simulate whenever event plugins are injected
var oldInjectEventPluginOrder = EventPluginHub.injection.injectEventPluginOrder;
EventPluginHub.injection.injectEventPluginOrder = function () {
  oldInjectEventPluginOrder.apply(this, arguments);
  buildSimulators();
};
var oldInjectEventPlugins = EventPluginHub.injection.injectEventPluginsByName;
EventPluginHub.injection.injectEventPluginsByName = function () {
  oldInjectEventPlugins.apply(this, arguments);
  buildSimulators();
};

buildSimulators();

/**
 * Exports:
 *
 * - `ReactTestUtils.SimulateNative.click(Element/ReactDOMComponent)`
 * - `ReactTestUtils.SimulateNative.mouseMove(Element/ReactDOMComponent)`
 * - `ReactTestUtils.SimulateNative.mouseIn/ReactDOMComponent)`
 * - `ReactTestUtils.SimulateNative.mouseOut(Element/ReactDOMComponent)`
 * - ... (All keys from `EventConstants.topLevelTypes`)
 *
 * Note: Top level event types are a subset of the entire set of handler types
 * (which include a broader set of "synthetic" events). For example, onDragDone
 * is a synthetic event. Except when testing an event plugin or React's event
 * handling code specifically, you probably want to use ReactTestUtils.Simulate
 * to dispatch synthetic events.
 */

function makeNativeSimulator(eventType) {
  return function (domComponentOrNode, nativeEventData) {
    var fakeNativeEvent = new Event(eventType);
    _assign(fakeNativeEvent, nativeEventData);
    if (ReactTestUtils.isDOMComponent(domComponentOrNode)) {
      ReactTestUtils.simulateNativeEventOnDOMComponent(eventType, domComponentOrNode, fakeNativeEvent);
    } else if (domComponentOrNode.tagName) {
      // Will allow on actual dom nodes.
      ReactTestUtils.simulateNativeEventOnNode(eventType, domComponentOrNode, fakeNativeEvent);
    }
  };
}

Object.keys(topLevelTypes).forEach(function (eventType) {
  // Event type is stored as 'topClick' - we transform that to 'click'
  var convenienceName = eventType.indexOf('top') === 0 ? eventType.charAt(3).toLowerCase() + eventType.substr(4) : eventType;
  /**
   * @param {!Element|ReactDOMComponent} domComponentOrNode
   * @param {?Event} nativeEventData Fake native event to use in SyntheticEvent.
   */
  ReactTestUtils.SimulateNative[convenienceName] = makeNativeSimulator(eventType);
});

module.exports = ReactTestUtils;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 302:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var ReactDOM = __webpack_require__(133);

exports.getReactDOM = function () {
  return ReactDOM;
};

if (process.env.NODE_ENV !== 'production') {
  var ReactPerf;
  var ReactTestUtils;

  exports.getReactPerf = function () {
    if (!ReactPerf) {
      ReactPerf = __webpack_require__(299);
    }
    return ReactPerf;
  };

  exports.getReactTestUtils = function () {
    if (!ReactTestUtils) {
      ReactTestUtils = __webpack_require__(301);
    }
    return ReactTestUtils;
  };
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 303:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _assign = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(24);
var propTypesFactory = __webpack_require__(78);
var PropTypes = propTypesFactory(React.isValidElement);

var ReactTransitionGroup = __webpack_require__(307);
var ReactCSSTransitionGroupChild = __webpack_require__(304);

function createTransitionTimeoutPropValidator(transitionType) {
  var timeoutPropName = 'transition' + transitionType + 'Timeout';
  var enabledPropName = 'transition' + transitionType;

  return function (props) {
    // If the transition is enabled
    if (props[enabledPropName]) {
      // If no timeout duration is provided
      if (props[timeoutPropName] == null) {
        return new Error(timeoutPropName + ' wasn\'t supplied to ReactCSSTransitionGroup: ' + 'this can cause unreliable animations and won\'t be supported in ' + 'a future version of React. See ' + 'https://fb.me/react-animation-transition-group-timeout for more ' + 'information.');

        // If the duration isn't a number
      } else if (typeof props[timeoutPropName] !== 'number') {
        return new Error(timeoutPropName + ' must be a number (in milliseconds)');
      }
    }
  };
}

/**
 * An easy way to perform CSS transitions and animations when a React component
 * enters or leaves the DOM.
 * See https://facebook.github.io/react/docs/animation.html#high-level-api-reactcsstransitiongroup
 */

var ReactCSSTransitionGroup = function (_React$Component) {
  _inherits(ReactCSSTransitionGroup, _React$Component);

  function ReactCSSTransitionGroup() {
    var _temp, _this, _ret;

    _classCallCheck(this, ReactCSSTransitionGroup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this._wrapChild = function (child) {
      // We need to provide this childFactory so that
      // ReactCSSTransitionGroupChild can receive updates to name, enter, and
      // leave while it is leaving.
      return React.createElement(ReactCSSTransitionGroupChild, {
        name: _this.props.transitionName,
        appear: _this.props.transitionAppear,
        enter: _this.props.transitionEnter,
        leave: _this.props.transitionLeave,
        appearTimeout: _this.props.transitionAppearTimeout,
        enterTimeout: _this.props.transitionEnterTimeout,
        leaveTimeout: _this.props.transitionLeaveTimeout
      }, child);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ReactCSSTransitionGroup.prototype.render = function render() {
    return React.createElement(ReactTransitionGroup, _assign({}, this.props, { childFactory: this._wrapChild }));
  };

  return ReactCSSTransitionGroup;
}(React.Component);

ReactCSSTransitionGroup.displayName = 'ReactCSSTransitionGroup';
ReactCSSTransitionGroup.propTypes = {
  transitionName: ReactCSSTransitionGroupChild.propTypes.name,

  transitionAppear: PropTypes.bool,
  transitionEnter: PropTypes.bool,
  transitionLeave: PropTypes.bool,
  transitionAppearTimeout: createTransitionTimeoutPropValidator('Appear'),
  transitionEnterTimeout: createTransitionTimeoutPropValidator('Enter'),
  transitionLeaveTimeout: createTransitionTimeoutPropValidator('Leave')
};
ReactCSSTransitionGroup.defaultProps = {
  transitionAppear: false,
  transitionEnter: true,
  transitionLeave: true
};


module.exports = ReactCSSTransitionGroup;

/***/ }),

/***/ 304:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(24);
var ReactAddonsDOMDependencies = __webpack_require__(302);

var propTypesFactory = __webpack_require__(78);
var PropTypes = propTypesFactory(React.isValidElement);

var CSSCore = __webpack_require__(296);
var ReactTransitionEvents = __webpack_require__(306);

var onlyChild = __webpack_require__(142);

var TICK = 17;

var ReactCSSTransitionGroupChild = function (_React$Component) {
  _inherits(ReactCSSTransitionGroupChild, _React$Component);

  function ReactCSSTransitionGroupChild() {
    var _temp, _this, _ret;

    _classCallCheck(this, ReactCSSTransitionGroupChild);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this._isMounted = false, _this.transition = function (animationType, finishCallback, userSpecifiedDelay) {
      var node = ReactAddonsDOMDependencies.getReactDOM().findDOMNode(_this);

      if (!node) {
        if (finishCallback) {
          finishCallback();
        }
        return;
      }

      var className = _this.props.name[animationType] || _this.props.name + '-' + animationType;
      var activeClassName = _this.props.name[animationType + 'Active'] || className + '-active';
      var timeout = null;

      var endListener = function (e) {
        if (e && e.target !== node) {
          return;
        }

        clearTimeout(timeout);

        CSSCore.removeClass(node, className);
        CSSCore.removeClass(node, activeClassName);

        ReactTransitionEvents.removeEndEventListener(node, endListener);

        // Usually this optional callback is used for informing an owner of
        // a leave animation and telling it to remove the child.
        if (finishCallback) {
          finishCallback();
        }
      };

      CSSCore.addClass(node, className);

      // Need to do this to actually trigger a transition.
      _this.queueClassAndNode(activeClassName, node);

      // If the user specified a timeout delay.
      if (userSpecifiedDelay) {
        // Clean-up the animation after the specified delay
        timeout = setTimeout(endListener, userSpecifiedDelay);
        _this.transitionTimeouts.push(timeout);
      } else {
        // DEPRECATED: this listener will be removed in a future version of react
        ReactTransitionEvents.addEndEventListener(node, endListener);
      }
    }, _this.queueClassAndNode = function (className, node) {
      _this.classNameAndNodeQueue.push({
        className: className,
        node: node
      });

      if (!_this.timeout) {
        _this.timeout = setTimeout(_this.flushClassNameAndNodeQueue, TICK);
      }
    }, _this.flushClassNameAndNodeQueue = function () {
      if (_this._isMounted) {
        _this.classNameAndNodeQueue.forEach(function (obj) {
          CSSCore.addClass(obj.node, obj.className);
        });
      }
      _this.classNameAndNodeQueue.length = 0;
      _this.timeout = null;
    }, _this.componentWillAppear = function (done) {
      if (_this.props.appear) {
        _this.transition('appear', done, _this.props.appearTimeout);
      } else {
        done();
      }
    }, _this.componentWillEnter = function (done) {
      if (_this.props.enter) {
        _this.transition('enter', done, _this.props.enterTimeout);
      } else {
        done();
      }
    }, _this.componentWillLeave = function (done) {
      if (_this.props.leave) {
        _this.transition('leave', done, _this.props.leaveTimeout);
      } else {
        done();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ReactCSSTransitionGroupChild.prototype.componentWillMount = function componentWillMount() {
    this.classNameAndNodeQueue = [];
    this.transitionTimeouts = [];
  };

  ReactCSSTransitionGroupChild.prototype.componentDidMount = function componentDidMount() {
    this._isMounted = true;
  };

  ReactCSSTransitionGroupChild.prototype.componentWillUnmount = function componentWillUnmount() {
    this._isMounted = false;

    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.transitionTimeouts.forEach(function (timeout) {
      clearTimeout(timeout);
    });

    this.classNameAndNodeQueue.length = 0;
  };

  ReactCSSTransitionGroupChild.prototype.render = function render() {
    return onlyChild(this.props.children);
  };

  return ReactCSSTransitionGroupChild;
}(React.Component);

ReactCSSTransitionGroupChild.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
    enter: PropTypes.string,
    leave: PropTypes.string,
    active: PropTypes.string
  }), PropTypes.shape({
    enter: PropTypes.string,
    enterActive: PropTypes.string,
    leave: PropTypes.string,
    leaveActive: PropTypes.string,
    appear: PropTypes.string,
    appearActive: PropTypes.string
  })]).isRequired,

  // Once we require timeouts to be specified, we can remove the
  // boolean flags (appear etc.) and just accept a number
  // or a bool for the timeout flags (appearTimeout etc.)
  appear: PropTypes.bool,
  enter: PropTypes.bool,
  leave: PropTypes.bool,
  appearTimeout: PropTypes.number,
  enterTimeout: PropTypes.number,
  leaveTimeout: PropTypes.number
};


module.exports = ReactCSSTransitionGroupChild;

/***/ }),

/***/ 305:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var flattenChildren = __webpack_require__(308);

var ReactTransitionChildMapping = {
  /**
   * Given `this.props.children`, return an object mapping key to child. Just
   * simple syntactic sugar around flattenChildren().
   *
   * @param {*} children `this.props.children`
   * @param {number=} selfDebugID Optional debugID of the current internal instance.
   * @return {object} Mapping of key to child
   */
  getChildMapping: function (children, selfDebugID) {
    if (!children) {
      return children;
    }

    if (process.env.NODE_ENV !== 'production') {
      return flattenChildren(children, selfDebugID);
    }

    return flattenChildren(children);
  },

  /**
   * When you're adding or removing children some may be added or removed in the
   * same render pass. We want to show *both* since we want to simultaneously
   * animate elements in and out. This function takes a previous set of keys
   * and a new set of keys and merges them with its best guess of the correct
   * ordering. In the future we may expose some of the utilities in
   * ReactMultiChild to make this easy, but for now React itself does not
   * directly have this concept of the union of prevChildren and nextChildren
   * so we implement it here.
   *
   * @param {object} prev prev children as returned from
   * `ReactTransitionChildMapping.getChildMapping()`.
   * @param {object} next next children as returned from
   * `ReactTransitionChildMapping.getChildMapping()`.
   * @return {object} a key set that contains all keys in `prev` and all keys
   * in `next` in a reasonable order.
   */
  mergeChildMappings: function (prev, next) {
    prev = prev || {};
    next = next || {};

    function getValueForKey(key) {
      if (next.hasOwnProperty(key)) {
        return next[key];
      } else {
        return prev[key];
      }
    }

    // For each key of `next`, the list of keys to insert before that key in
    // the combined list
    var nextKeysPending = {};

    var pendingKeys = [];
    for (var prevKey in prev) {
      if (next.hasOwnProperty(prevKey)) {
        if (pendingKeys.length) {
          nextKeysPending[prevKey] = pendingKeys;
          pendingKeys = [];
        }
      } else {
        pendingKeys.push(prevKey);
      }
    }

    var i;
    var childMapping = {};
    for (var nextKey in next) {
      if (nextKeysPending.hasOwnProperty(nextKey)) {
        for (i = 0; i < nextKeysPending[nextKey].length; i++) {
          var pendingNextKey = nextKeysPending[nextKey][i];
          childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
        }
      }
      childMapping[nextKey] = getValueForKey(nextKey);
    }

    // Finally, add the keys which didn't appear before any key in `next`
    for (i = 0; i < pendingKeys.length; i++) {
      childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
    }

    return childMapping;
  }
};

module.exports = ReactTransitionChildMapping;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 306:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var ExecutionEnvironment = __webpack_require__(6);

var getVendorPrefixedEventName = __webpack_require__(139);

var endEvents = [];

function detectEvents() {
  var animEnd = getVendorPrefixedEventName('animationend');
  var transEnd = getVendorPrefixedEventName('transitionend');

  if (animEnd) {
    endEvents.push(animEnd);
  }

  if (transEnd) {
    endEvents.push(transEnd);
  }
}

if (ExecutionEnvironment.canUseDOM) {
  detectEvents();
}

// We use the raw {add|remove}EventListener() call because EventListener
// does not know how to remove event listeners and we really should
// clean up. Also, these events are not triggered in older browsers
// so we should be A-OK here.

function addEventListener(node, eventName, eventListener) {
  node.addEventListener(eventName, eventListener, false);
}

function removeEventListener(node, eventName, eventListener) {
  node.removeEventListener(eventName, eventListener, false);
}

var ReactTransitionEvents = {
  addEndEventListener: function (node, eventListener) {
    if (endEvents.length === 0) {
      // If CSS transitions are not supported, trigger an "end animation"
      // event immediately.
      window.setTimeout(eventListener, 0);
      return;
    }
    endEvents.forEach(function (endEvent) {
      addEventListener(node, endEvent, eventListener);
    });
  },

  removeEndEventListener: function (node, eventListener) {
    if (endEvents.length === 0) {
      return;
    }
    endEvents.forEach(function (endEvent) {
      removeEventListener(node, endEvent, eventListener);
    });
  }
};

module.exports = ReactTransitionEvents;

/***/ }),

/***/ 307:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _assign = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(24);
var ReactTransitionChildMapping = __webpack_require__(305);

var propTypesFactory = __webpack_require__(78);
var PropTypes = propTypesFactory(React.isValidElement);

var emptyFunction = __webpack_require__(10);

/**
 * A basis for animations. When children are declaratively added or removed,
 * special lifecycle hooks are called.
 * See https://facebook.github.io/react/docs/animation.html#low-level-api-reacttransitiongroup
 */

var ReactTransitionGroup = function (_React$Component) {
  _inherits(ReactTransitionGroup, _React$Component);

  function ReactTransitionGroup() {
    var _temp, _this, _ret;

    _classCallCheck(this, ReactTransitionGroup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      // TODO: can we get useful debug information to show at this point?
      children: ReactTransitionChildMapping.getChildMapping(_this.props.children)
    }, _this.performAppear = function (key) {
      _this.currentlyTransitioningKeys[key] = true;

      var component = _this.refs[key];

      if (component.componentWillAppear) {
        component.componentWillAppear(_this._handleDoneAppearing.bind(_this, key));
      } else {
        _this._handleDoneAppearing(key);
      }
    }, _this._handleDoneAppearing = function (key) {
      var component = _this.refs[key];
      if (component.componentDidAppear) {
        component.componentDidAppear();
      }

      delete _this.currentlyTransitioningKeys[key];

      var currentChildMapping = ReactTransitionChildMapping.getChildMapping(_this.props.children);

      if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
        // This was removed before it had fully appeared. Remove it.
        _this.performLeave(key);
      }
    }, _this.performEnter = function (key) {
      _this.currentlyTransitioningKeys[key] = true;

      var component = _this.refs[key];

      if (component.componentWillEnter) {
        component.componentWillEnter(_this._handleDoneEntering.bind(_this, key));
      } else {
        _this._handleDoneEntering(key);
      }
    }, _this._handleDoneEntering = function (key) {
      var component = _this.refs[key];
      if (component.componentDidEnter) {
        component.componentDidEnter();
      }

      delete _this.currentlyTransitioningKeys[key];

      var currentChildMapping = ReactTransitionChildMapping.getChildMapping(_this.props.children);

      if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
        // This was removed before it had fully entered. Remove it.
        _this.performLeave(key);
      }
    }, _this.performLeave = function (key) {
      _this.currentlyTransitioningKeys[key] = true;

      var component = _this.refs[key];
      if (component.componentWillLeave) {
        component.componentWillLeave(_this._handleDoneLeaving.bind(_this, key));
      } else {
        // Note that this is somewhat dangerous b/c it calls setState()
        // again, effectively mutating the component before all the work
        // is done.
        _this._handleDoneLeaving(key);
      }
    }, _this._handleDoneLeaving = function (key) {
      var component = _this.refs[key];

      if (component.componentDidLeave) {
        component.componentDidLeave();
      }

      delete _this.currentlyTransitioningKeys[key];

      var currentChildMapping = ReactTransitionChildMapping.getChildMapping(_this.props.children);

      if (currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
        // This entered again before it fully left. Add it again.
        _this.performEnter(key);
      } else {
        _this.setState(function (state) {
          var newChildren = _assign({}, state.children);
          delete newChildren[key];
          return { children: newChildren };
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ReactTransitionGroup.prototype.componentWillMount = function componentWillMount() {
    this.currentlyTransitioningKeys = {};
    this.keysToEnter = [];
    this.keysToLeave = [];
  };

  ReactTransitionGroup.prototype.componentDidMount = function componentDidMount() {
    var initialChildMapping = this.state.children;
    for (var key in initialChildMapping) {
      if (initialChildMapping[key]) {
        this.performAppear(key);
      }
    }
  };

  ReactTransitionGroup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var nextChildMapping = ReactTransitionChildMapping.getChildMapping(nextProps.children);
    var prevChildMapping = this.state.children;

    this.setState({
      children: ReactTransitionChildMapping.mergeChildMappings(prevChildMapping, nextChildMapping)
    });

    var key;

    for (key in nextChildMapping) {
      var hasPrev = prevChildMapping && prevChildMapping.hasOwnProperty(key);
      if (nextChildMapping[key] && !hasPrev && !this.currentlyTransitioningKeys[key]) {
        this.keysToEnter.push(key);
      }
    }

    for (key in prevChildMapping) {
      var hasNext = nextChildMapping && nextChildMapping.hasOwnProperty(key);
      if (prevChildMapping[key] && !hasNext && !this.currentlyTransitioningKeys[key]) {
        this.keysToLeave.push(key);
      }
    }

    // If we want to someday check for reordering, we could do it here.
  };

  ReactTransitionGroup.prototype.componentDidUpdate = function componentDidUpdate() {
    var keysToEnter = this.keysToEnter;
    this.keysToEnter = [];
    keysToEnter.forEach(this.performEnter);

    var keysToLeave = this.keysToLeave;
    this.keysToLeave = [];
    keysToLeave.forEach(this.performLeave);
  };

  ReactTransitionGroup.prototype.render = function render() {
    // TODO: we could get rid of the need for the wrapper node
    // by cloning a single child
    var childrenToRender = [];
    for (var key in this.state.children) {
      var child = this.state.children[key];
      if (child) {
        // You may need to apply reactive updates to a child as it is leaving.
        // The normal React way to do it won't work since the child will have
        // already been removed. In case you need this behavior you can provide
        // a childFactory function to wrap every child, even the ones that are
        // leaving.
        childrenToRender.push(React.cloneElement(this.props.childFactory(child), { ref: key, key: key }));
      }
    }

    // Do not forward ReactTransitionGroup props to primitive DOM nodes
    var props = _assign({}, this.props);
    delete props.transitionLeave;
    delete props.transitionName;
    delete props.transitionAppear;
    delete props.transitionEnter;
    delete props.childFactory;
    delete props.transitionLeaveTimeout;
    delete props.transitionEnterTimeout;
    delete props.transitionAppearTimeout;
    delete props.component;

    return React.createElement(this.props.component, props, childrenToRender);
  };

  return ReactTransitionGroup;
}(React.Component);

ReactTransitionGroup.displayName = 'ReactTransitionGroup';
ReactTransitionGroup.propTypes = {
  component: PropTypes.any,
  childFactory: PropTypes.func
};
ReactTransitionGroup.defaultProps = {
  component: 'span',
  childFactory: emptyFunction.thatReturnsArgument
};


module.exports = ReactTransitionGroup;

/***/ }),

/***/ 308:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var KeyEscapeUtils = __webpack_require__(140);
var traverseAllChildren = __webpack_require__(143);
var warning = __webpack_require__(2);

var ReactComponentTreeHook;

if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test') {
  // Temporary hack.
  // Inline requires don't work well with Jest:
  // https://github.com/facebook/react/issues/7240
  // Remove the inline requires when we don't need them anymore:
  // https://github.com/facebook/react/pull/7178
  ReactComponentTreeHook = __webpack_require__(8);
}

/**
 * @param {function} traverseContext Context passed through traversal.
 * @param {?ReactComponent} child React child component.
 * @param {!string} name String name of key path to child.
 * @param {number=} selfDebugID Optional debugID of the current internal instance.
 */
function flattenSingleChildIntoContext(traverseContext, child, name, selfDebugID) {
  // We found a component instance.
  if (traverseContext && typeof traverseContext === 'object') {
    var result = traverseContext;
    var keyUnique = result[name] === undefined;
    if (process.env.NODE_ENV !== 'production') {
      if (!ReactComponentTreeHook) {
        ReactComponentTreeHook = __webpack_require__(8);
      }
      if (!keyUnique) {
        process.env.NODE_ENV !== 'production' ? warning(false, 'flattenChildren(...): Encountered two children with the same key, ' + '`%s`. Child keys must be unique; when two children share a key, only ' + 'the first child will be used.%s', KeyEscapeUtils.unescape(name), ReactComponentTreeHook.getStackAddendumByID(selfDebugID)) : void 0;
      }
    }
    if (keyUnique && child != null) {
      result[name] = child;
    }
  }
}

/**
 * Flattens children that are typically specified as `props.children`. Any null
 * children will not be included in the resulting object.
 * @return {!object} flattened children keyed by name.
 */
function flattenChildren(children, selfDebugID) {
  if (children == null) {
    return children;
  }
  var result = {};

  if (process.env.NODE_ENV !== 'production') {
    traverseAllChildren(children, function (traverseContext, child, name) {
      return flattenSingleChildIntoContext(traverseContext, child, name, selfDebugID);
    }, result);
  } else {
    traverseAllChildren(children, flattenSingleChildIntoContext, result);
  }
  return result;
}

module.exports = flattenChildren;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 309:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(9);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(75);

var _reactRedux = __webpack_require__(76);

var _store = __webpack_require__(77);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// redux


var Header = function (_Component) {
	_inherits(Header, _Component);

	function Header() {
		_classCallCheck(this, Header);

		return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
	}

	_createClass(Header, [{
		key: 'pdMenu',
		value: function pdMenu() {
			this.props.getMenu ? this.props.setMenu(false) : this.props.setMenu(true);
		}
	}, {
		key: 'toCitys',
		value: function toCitys() {
			_reactRouter.browserHistory.push('/citys');
		}
	}, {
		key: 'toMine',
		value: function toMine() {
			_reactRouter.browserHistory.push('/mine');
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			console.log(this);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'header',
				null,
				_react2.default.createElement(
					'div',
					{ id: 'nav_bth', onClick: this.pdMenu.bind(this) },
					_react2.default.createElement('img', { src: 'src/images/icon/\u6211\u7684\u8BA2\u5355.png' })
				),
				_react2.default.createElement(
					'span',
					{ className: 'title' },
					this.props.getHeaderName
				),
				_react2.default.createElement(
					'div',
					{ id: 'mine_bth', onClick: this.toMine.bind(this) },
					_react2.default.createElement('img', { src: 'src/images/icon/\u6211\u7684\u805A\u5212\u7B97.png' })
				),
				_react2.default.createElement(
					'div',
					{ className: 'city', onClick: this.toCitys.bind(this) },
					_react2.default.createElement(
						'span',
						null,
						this.props.getCity
					),
					_react2.default.createElement('img', { src: 'src/images/icon/\u5411\u4E0B\u7BAD\u5934.png' })
				)
			);
		}
	}]);

	return Header;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(_store.mapStateToProps, _store.mapDispatchToProps)(Header);

/***/ }),

/***/ 310:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(9);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(75);

var _reactRedux = __webpack_require__(76);

var _store = __webpack_require__(77);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// redux ;


var Nav = function (_Component) {
	_inherits(Nav, _Component);

	function Nav(props) {
		_classCallCheck(this, Nav);

		var _this = _possibleConstructorReturn(this, (Nav.__proto__ || Object.getPrototypeOf(Nav)).call(this, props));

		_this.arr = ['首页', '影片', '影院', '商城', '我的', '卖座卡'];
		_this.link = ['/home', '/movie', '/cinema', '/shop', '/mine', '/card'];
		_this.headerName = ['卖座电影', '卖座电影', '全部影院', '卖座商城', '我的', '查询/绑定/激活卖座卡'];

		// 控制菜单动画
		_this.state = {
			display: 'none',
			trans: '-101%',
			opacity: '0.2'
		};
		return _this;
	}

	_createClass(Nav, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(next) {
			if (next.getMenu) {
				this.setState({ display: 'block', trans: '0%', opacity: '1' });
			} else {
				this.setState({ trans: '-101%', display: 'none', opacity: '0.2' });
			}
		}
	}, {
		key: 'closeMenu',
		value: function closeMenu(x) {
			this.props.setMenu(false);
			this.props.setHeaderName(x);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var lis = this.arr.map(function (v, k) {
				return _react2.default.createElement(
					'li',
					{ key: v },
					_react2.default.createElement(
						_reactRouter.Link,
						{ to: _this2.link[k], onClick: _this2.closeMenu.bind(_this2, _this2.headerName[k]) },
						v,
						_react2.default.createElement(
							'div',
							{ className: 'rt' },
							_react2.default.createElement('span', null)
						)
					)
				);
			});

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement('div', { id: 'mask', style: { display: this.state.display } }),
				_react2.default.createElement(
					'ul',
					{ id: 'menu', style: { transform: 'translate3d(' + this.state.trans + ',0,0)', opacity: this.state.opacity } },
					_react2.default.createElement('h1', null),
					lis
				)
			);
		}
	}]);

	return Nav;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(_store.mapStateToProps, _store.mapDispatchToProps)(Nav);

/***/ })

});