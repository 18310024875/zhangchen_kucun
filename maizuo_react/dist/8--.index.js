webpackJsonp([8],{

/***/ 282:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(9);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Card = function (_Component) {
	_inherits(Card, _Component);

	function Card(props) {
		_classCallCheck(this, Card);

		var _this = _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this, props));

		_this.act = ['active', '']; // tab切换
		return _this;
	}

	_createClass(Card, [{
		key: 'tab',
		value: function tab(x) {
			var arr = ['', ''];
			arr[x] = 'active';
			this.act = arr;
			this.setState({});
		}
	}, {
		key: 'render',
		value: function render() {
			var card = void 0;
			if (this.act[0] == 'active') {
				card = _react2.default.createElement(
					'div',
					{ className: 'box' },
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'div',
							null,
							_react2.default.createElement(
								'p',
								null,
								'\u5361\u53F7:'
							),
							_react2.default.createElement('input', { placeholder: '\u8BF7\u8F93\u5165\u5361\u53F7' })
						),
						_react2.default.createElement('h5', null)
					),
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'div',
							null,
							_react2.default.createElement(
								'p',
								null,
								'\u5BC6\u7801:'
							),
							_react2.default.createElement('input', { placeholder: '\u8BF7\u8F93\u5165\u5BC6\u7801' })
						),
						_react2.default.createElement('h5', null)
					),
					_react2.default.createElement(
						'div',
						{ className: 'bth' },
						'\u67E5\u8BE2'
					)
				);
			} else {
				card = _react2.default.createElement(
					'div',
					{ className: 'box' },
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'div',
							null,
							_react2.default.createElement(
								'p',
								null,
								'\u5361\u53F7:'
							),
							_react2.default.createElement('input', { placeholder: '\u8BF7\u8F93\u516515\u4F4D\u7535\u5B50\u5361\u53F7' })
						),
						_react2.default.createElement('h5', null)
					),
					_react2.default.createElement(
						'div',
						{ className: 'bth' },
						'\u67E5\u8BE2'
					)
				);
			}

			return _react2.default.createElement(
				'section',
				{ id: 'card' },
				_react2.default.createElement(
					'div',
					{ className: 'card_wrapper' },
					_react2.default.createElement(
						'ul',
						{ className: 'tit' },
						_react2.default.createElement(
							'li',
							{ className: this.act[0], onClick: this.tab.bind(this, 0) },
							'\u5356\u5EA7\u5361'
						),
						_react2.default.createElement(
							'li',
							{ className: this.act[1], onClick: this.tab.bind(this, 1) },
							'\u7535\u5B50\u5356\u5EA7\u5361'
						)
					),
					card
				)
			);
		}
	}]);

	return Card;
}(_react.Component);

exports.default = Card;

/***/ })

});