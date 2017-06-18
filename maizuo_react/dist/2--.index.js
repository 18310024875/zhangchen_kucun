webpackJsonp([2],{

/***/ 288:
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

var Shop = function (_Component) {
	_inherits(Shop, _Component);

	function Shop(props) {
		_classCallCheck(this, Shop);

		var _this = _possibleConstructorReturn(this, (Shop.__proto__ || Object.getPrototypeOf(Shop)).call(this, props));

		_this.types = [];
		_this.lis = [];

		_this.load = undefined;
		_this.ind = 0;
		return _this;
	}

	_createClass(Shop, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			var _this2 = this;

			$get('./src/json/shop_type.json', function (res) {
				_this2.types = res.data;
				_this2.setState({});
			});
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this3 = this;

			var dom = document.querySelector('#main');
			this.load = $load(dom, function () {
				_this3.ajax();
			});
		}
	}, {
		key: 'ajax',
		value: function ajax() {
			var _this4 = this;

			this.ind += 1;
			$get('./src/json/shop' + this.ind + '.json', function (res) {
				if (res.data.list.length == 0) {
					alert('没有更多了');return;
				};
				_this4.lis = _this4.lis.concat(res.data.list);
				_this4.setState({});
			});
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			this.load.once = true;
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.load.destroy();
		}
	}, {
		key: 'render',
		value: function render() {
			var types = this.types.map(function (v, k) {
				return _react2.default.createElement(
					'li',
					{ key: k },
					_react2.default.createElement('img', { src: v.image }),
					_react2.default.createElement(
						'p',
						null,
						v.name
					)
				);
			});
			var lis = this.lis.map(function (v, k) {
				return _react2.default.createElement(
					'li',
					{ key: k },
					_react2.default.createElement(
						'div',
						{ className: 'fl' },
						_react2.default.createElement('img', { src: v.skuList[0].image })
					),
					_react2.default.createElement(
						'div',
						{ className: 'fr' },
						_react2.default.createElement(
							'p',
							{ className: 'p1' },
							v.masterName
						),
						_react2.default.createElement(
							'p',
							{ className: 'p2' },
							v.slaveName
						),
						_react2.default.createElement(
							'p',
							{ className: 'p3' },
							_react2.default.createElement(
								'span',
								null,
								'\uFFE5',
								(v.skuList[0].price / 100).toFixed(2)
							),
							_react2.default.createElement(
								'span',
								null,
								'\u5DF2\u552E',
								v.displaySalesCount
							)
						)
					)
				);
			});
			return _react2.default.createElement(
				'div',
				{ id: 'shop' },
				_react2.default.createElement(
					'ul',
					{ className: 'tit' },
					types
				),
				_react2.default.createElement(
					'p',
					null,
					_react2.default.createElement(
						'span',
						null,
						'\u7CBE\u5F69\u63A8\u8350'
					)
				),
				_react2.default.createElement(
					'ul',
					{ className: 'box' },
					lis
				)
			);
		}
	}]);

	return Shop;
}(_react.Component);

exports.default = Shop;

/***/ })

});