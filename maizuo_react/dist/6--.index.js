webpackJsonp([6],{

/***/ 284:
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


var Citys = function (_Component) {
	_inherits(Citys, _Component);

	function Citys(props) {
		_classCallCheck(this, Citys);

		var _this = _possibleConstructorReturn(this, (Citys.__proto__ || Object.getPrototypeOf(Citys)).call(this, props));

		_this.imp = ['北京', '上海', '广州', '深圳'];
		_this.arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'];
		_this.citys = [];
		_this.arr.map(function (v, k) {
			_this.citys.push([]);
		});
		_this.lis = [];
		return _this;
	}

	_createClass(Citys, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			var _this2 = this;

			$get('./src/json/citys.json', function (res) {
				// 构造新数组
				res.data.cities.map(function (v, k) {
					var p = v.pinyin[0];
					var ind = _this2.arr.indexOf(p);
					_this2.citys[ind].push(v);
				});
				_this2.setState({});
			});
		}
	}, {
		key: 'scrollTo',
		value: function scrollTo(name) {
			var lis = this.lis;
			var top = undefined;
			lis.forEach(function (v, k) {
				if (v.innerHTML == name) {
					top = v.offsetTop;
				}
			});

			var stop;
			var dom = document.querySelector('#main');
			var i = 0;
			var speet = top / 30;
			function run() {
				i += 1;
				dom.scrollTop += speet;
				if (i == 30) {
					cancelAnimationFrame(stop);
					run = null;
					dom.scrollTop = top;
					return;
				}
				stop = requestAnimationFrame(run);
			}
			run();
		}
	}, {
		key: 'changeCity',
		value: function changeCity(x) {
			this.props.setCity(x);
			_reactRouter.browserHistory.push('/home');
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			this.lis = document.querySelectorAll('.citys_p');
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var citys = this.citys.map(function (v, k) {
				var cs = _this3.citys[k].map(function (v2, k2) {
					return _react2.default.createElement(
						'li',
						{ onClick: _this3.changeCity.bind(_this3, v2.name), key: v2.name },
						v2.name
					);
				});

				return _react2.default.createElement(
					'div',
					{ key: k },
					_react2.default.createElement(
						'p',
						{ className: 'citys_p' },
						_this3.arr[k]
					),
					_react2.default.createElement(
						'ul',
						null,
						' ',
						cs,
						' '
					)
				);
			});
			return _react2.default.createElement(
				'section',
				{ id: 'citys' },
				_react2.default.createElement(
					'p',
					null,
					'GPS\u5B9A\u4F4D\u4F60\u6240\u5728\u57CE\u5E02'
				),
				_react2.default.createElement(
					'p',
					null,
					this.props.getCity
				),
				_react2.default.createElement(
					'p',
					null,
					'\u70ED\u95E8\u57CE\u5E02'
				),
				_react2.default.createElement(
					'ul',
					null,
					this.imp.map(function (v, k) {
						return _react2.default.createElement(
							'li',
							{ key: v, onClick: _this3.changeCity.bind(_this3, v) },
							v
						);
					})
				),
				_react2.default.createElement(
					'p',
					null,
					'\u6309\u5B57\u6BCD\u6392\u5E8F'
				),
				_react2.default.createElement(
					'ul',
					null,
					this.arr.map(function (v, k) {
						return _react2.default.createElement(
							'li',
							{ key: v, onClick: _this3.scrollTo.bind(_this3, v) },
							v
						);
					})
				),
				_react2.default.createElement(
					'div',
					null,
					citys
				)
			);
		}
	}]);

	return Citys;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(_store.mapStateToProps, _store.mapDispatchToProps)(Citys);

/***/ })

});