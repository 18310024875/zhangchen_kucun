webpackJsonp([5],{

/***/ 285:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(9);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(75);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Details = function (_Component) {
	_inherits(Details, _Component);

	function Details() {
		_classCallCheck(this, Details);

		return _possibleConstructorReturn(this, (Details.__proto__ || Object.getPrototypeOf(Details)).apply(this, arguments));
	}

	_createClass(Details, [{
		key: 'toCinema',
		value: function toCinema() {
			_reactRouter.browserHistory.push('/cinema');
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			console.log(this.props.location);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ id: 'details' },
				_react2.default.createElement('img', { src: this.props.location.state.imgUrl }),
				_react2.default.createElement(
					'div',
					{ className: 'part1' },
					_react2.default.createElement(
						'span',
						null,
						'\xA0'
					),
					'\u5F71\u7247\u7B80\u4ECB'
				),
				_react2.default.createElement(
					'p',
					null,
					_react2.default.createElement(
						'span',
						null,
						'\u5BFC\xA0\xA0\xA0\xA0\xA0\xA0\u6F14 :'
					),
					'\u90B1\u793C\u6D9B'
				),
				_react2.default.createElement(
					'p',
					null,
					_react2.default.createElement(
						'span',
						null,
						'\u4E3B\xA0\xA0\xA0\xA0\xA0\xA0\u6F14 :'
					),
					'\u5218\u5FB7\u534E | \u59DC\u6B66 | \u5B8B\u4F73'
				),
				_react2.default.createElement(
					'p',
					null,
					_react2.default.createElement(
						'span',
						null,
						'\u5730\u533A\u8BED\u8A00 :'
					),
					'\u9999\u6E2F(\u666E\u901A\u8BDD\u3001\u7CA4\u8BED)'
				),
				_react2.default.createElement(
					'p',
					null,
					_react2.default.createElement(
						'span',
						null,
						'\u7C7B\xA0\xA0\xA0\xA0\xA0\xA0\u578B :'
					),
					'\u52A8\u4F5C|\u60AC\u7591|\u72AF\u7F6A'
				),
				_react2.default.createElement(
					'p',
					null,
					_react2.default.createElement(
						'span',
						null,
						'\u4E0A\u6620\u65F6\u95F4'
					),
					'4\u670828\u65E5\u4E0A\u6620'
				),
				_react2.default.createElement(
					'div',
					{ className: 'part2' },
					'\u6700\u65B0\u8B66\u532A\u52A8\u4F5C\u7535\u5F71\u300A\u62C6\u5F39\u4E13\u5BB6\u300B\uFF08Shock Wave\uFF09\u5C06\u4E8E4\u6708\u4EFD\u5F00\u62CD\uFF0C\u5218\u5FB7\u534E\u62C5\u4EFB\u5236\u4F5C\u4EBA\u548C\u4E3B\u6F14\uFF0C\u7531\u5BF0\u5B87\u516C\u53F8\u3001\u535A\u7EB3\u5F71\u4E1A\u548C\u5218\u5FB7\u534E\u7684\u65B0\u516C\u53F8\u68A6\u9020\u8005\u8054\u5408\u5236\u4F5C\uFF0C\u90B1\u793C\u6D9B\u62C5\u4EFB\u5BFC\u6F14\uFF0C\u6295\u8D442300\u4E07\u7F8E\u5143\u3002\u7247\u4E2D\u5218\u5FB7\u534E\u5C06\u9970\u6F14\u4E00\u540D\u5367\u5E95\uFF0C\u8FFD\u7F09\u70B8\u5F39\u72C2\u5F92\u3002\u9884\u8BA1\u5C06\u57282017\u5E74\u4E2D\u671F\u4E0A\u6620\u3002\u4E4B\u524D\u8BE5\u7247\u66FE\u66DD\u51FA\u7684\u9635\u5BB9\u4E3A\u5F20\u5BB6\u8F89\u3001\u8C22\u9706\u950B\uFF08\u53CD\u6D3E\uFF09\u3001\u5F20\u667A\u9716\u3002'
				),
				_react2.default.createElement(
					'div',
					{ className: 'bth', onClick: this.toCinema.bind(this) },
					'\u7ACB\u5373\u8D2D\u7968'
				)
			);
		}
	}]);

	return Details;
}(_react.Component);

exports.default = Details;

/***/ })

});