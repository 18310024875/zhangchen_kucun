webpackJsonp([7],{

/***/ 283:
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

var Cinema = function (_Component) {
	_inherits(Cinema, _Component);

	function Cinema(props) {
		_classCallCheck(this, Cinema);

		var _this = _possibleConstructorReturn(this, (Cinema.__proto__ || Object.getPrototypeOf(Cinema)).call(this, props));

		_this.address = ['密云县', '朝阳区', '西城区', '海淀区', '大兴区', '东城区', '昌平区', '丰台区', '房山区', '平谷区', '顺义区', '石景山区', '门头沟区', '通州区', '黄岛区', '怀柔区', '下城区', '延庆县'];
		_this.cs = [];
		for (var i = 0; i < 18; i++) {
			_this.cs.push([]);
		}
		return _this;
	}

	_createClass(Cinema, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			var _this2 = this;

			$get('./src/json/cinema.json', function (res) {
				// 构造新数组 ;
				res.data.cinemas.map(function (v, k) {
					var ind = _this2.address.indexOf(v.district.name);
					if (ind != -1) {
						_this2.cs[ind].push(v);
					}
				});
				console.log(_this2.cs);
				_this2.setState({});
			});
		}
	}, {
		key: 'pd',
		value: function pd(x, e) {
			console.log(x);
			x.open = !x.open;
			var n = e.target.nextElementSibling;
			if (x.open) {
				n.style.display = "block";
			} else {
				n.style.display = "none";
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var ads = this.address.map(function (v, k) {
				var cs = _this3.cs[k].map(function (v2, k2) {
					var active = '';
					if (v2.labels[0]) {
						if (v2.labels[0].name == "优惠活动") {
							active = _react2.default.createElement(
								'h5',
								{ className: 'h2' },
								'\u4F18\u60E0\u6D3B\u52A8'
							);
						} else if (v2.labels.length == 2) {
							active = _react2.default.createElement(
								'div',
								null,
								_react2.default.createElement(
									'h5',
									{ className: 'h1' },
									'\u53EF\u4E50\u7206\u7C73\u82B1'
								),
								' ',
								_react2.default.createElement(
									'h5',
									{ className: 'h2' },
									'\u4F18\u60E0\u6D3B\u52A8'
								)
							);
						}
					}
					return _react2.default.createElement(
						'li',
						{ key: k2 },
						_react2.default.createElement('h6', null),
						_react2.default.createElement(
							'div',
							null,
							_react2.default.createElement(
								'p',
								null,
								v2.name
							),
							_react2.default.createElement(
								'span',
								null,
								'\u5EA7'
							),
							_react2.default.createElement(
								'span',
								null,
								'\u901A'
							)
						),
						active,
						_react2.default.createElement(
							'p',
							{ className: 'p1' },
							v2.address
						),
						_react2.default.createElement(
							'p',
							{ className: 'p2' },
							'\u4F4D\u7F6E\u8DDD\u79BB'
						)
					);
				});
				return _react2.default.createElement(
					'div',
					{ key: v },
					_react2.default.createElement(
						'div',
						{ className: 'div', onClick: _this3.pd.bind(_this3, { open: false }) },
						v
					),
					_react2.default.createElement(
						'ul',
						null,
						cs
					)
				);
			});
			return _react2.default.createElement(
				'div',
				{ id: 'cinema' },
				ads
			);
		}
	}]);

	return Cinema;
}(_react.Component);

exports.default = Cinema;

/***/ })

});