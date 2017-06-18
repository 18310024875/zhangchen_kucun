webpackJsonp([3],{

/***/ 287:
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


var Movie = function (_Component) {
	_inherits(Movie, _Component);

	function Movie(props) {
		_classCallCheck(this, Movie);

		var _this = _possibleConstructorReturn(this, (Movie.__proto__ || Object.getPrototypeOf(Movie)).call(this, props));

		_this.act = ['active', '']; // tab切换
		_this.box = []; // 电影box
		_this.page = 0; // 页数
		_this.load = undefined; // 下拉实例
		if (_this.props.location.state) {
			if (_this.props.location.state.arr instanceof Array) {
				_this.act = _this.props.location.state.arr;
			}
		}
		return _this;
	}

	_createClass(Movie, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			var dom = document.querySelector('#main');

			this.load = $load(dom, function () {
				_this2.ajax();
			});
		}
		// table 切换

	}, {
		key: 'tab',
		value: function tab(x) {
			var _this3 = this;

			// 过滤 active!!!
			if (this.act[x] == 'active') {
				return;
			}

			// 切换class
			var arr = ['', ''];
			arr[x] = 'active';
			this.act = arr;

			// 重置数据
			this.box = [];
			this.page = 0;
			this.setState({});

			// 重置load实例
			this.load.destroy();
			var dom = document.querySelector('#main');
			this.load = $load(dom, function () {
				_this3.ajax();
			});
		}
	}, {
		key: 'ajax',
		value: function ajax() {
			var _this4 = this;

			this.page += 1;
			if (this.act[0] == 'active') {
				$get('./src/json/now' + this.page + '.json', function (res) {
					if (res.data.films.length == 0) {
						alert('没有数据了');return;
					}
					_this4.box = _this4.box.concat(res.data.films);
					_this4.setState({});
				});
			} else {
				$get('./src/json/will' + this.page + '.json', function (res) {
					if (res.data.films.length == 0) {
						alert('没有数据了');return;
					}
					_this4.box = _this4.box.concat(res.data.films);
					_this4.setState({});
				});
			}
		}

		// dom 更新后

	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			// 刷新
			this.load.once = true;
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.load.destroy();
		}
	}, {
		key: 'time',
		value: function time(shijianchuo) {
			//shijianchuo是整数，否则要parseInt转换
			var time = new Date(shijianchuo);
			var y = time.getFullYear();
			var m = time.getMonth() + 1;
			var d = time.getDate();
			var h = time.getHours();
			var mm = time.getMinutes();
			var s = time.getSeconds();
			var week;
			switch (time.getDay()) {
				case 0:
					week = "星期天";break;
				case 1:
					week = "星期一";break;
				case 2:
					week = "星期二";break;
				case 3:
					week = "星期三";break;
				case 4:
					week = "星期四";break;
				case 5:
					week = "星期五";break;
				case 6:
					week = "星期六";break;
			}
			//return y+'-'+m+'-'+d+' '+h+':'+mm+':'+s+week;
			return {
				day: m + '月' + d + '日',
				week: week
			};
		}
	}, {
		key: 'toDetails',
		value: function toDetails(url, name) {
			this.props.setHeaderName(name);
			_reactRouter.browserHistory.push({
				pathname: '/details',
				state: {
					imgUrl: url
				}
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this5 = this;

			var lis = this.box.map(function (v, k) {
				if (_this5.act[0] == 'active') {
					return _react2.default.createElement(
						'li',
						{ key: k, onClick: _this5.toDetails.bind(_this5, v.cover.origin, v.name) },
						_react2.default.createElement(
							'div',
							{ className: 'fen' },
							_react2.default.createElement(
								'span',
								null,
								v.grade
							),
							_react2.default.createElement('i', null)
						),
						_react2.default.createElement(
							'div',
							{ className: 'fl' },
							_react2.default.createElement('img', { src: v.poster.origin })
						),
						_react2.default.createElement(
							'div',
							{ className: 'fr' },
							_react2.default.createElement(
								'p',
								{ className: 'p1' },
								v.name
							),
							_react2.default.createElement(
								'p',
								{ className: 'p2' },
								v.intro
							),
							_react2.default.createElement(
								'div',
								{ className: 'div' },
								_react2.default.createElement(
									'div',
									null,
									_react2.default.createElement(
										'span',
										null,
										v.cinemaCount
									),
									'\u5BB6\u5F71\u9662\u4E0A\u6620'
								),
								_react2.default.createElement(
									'div',
									null,
									_react2.default.createElement(
										'span',
										null,
										v.watchCount
									),
									'\u4EBA\u8D2D\u7968'
								)
							)
						)
					);
				} else {
					return _react2.default.createElement(
						'li',
						{ key: k, onClick: _this5.toDetails.bind(_this5, v.cover.origin, v.name) },
						_react2.default.createElement(
							'div',
							{ className: 'fen' },
							_react2.default.createElement('span', null),
							_react2.default.createElement('i', null)
						),
						_react2.default.createElement(
							'div',
							{ className: 'fl' },
							_react2.default.createElement('img', { src: v.poster.origin })
						),
						_react2.default.createElement(
							'div',
							{ className: 'fr' },
							_react2.default.createElement(
								'p',
								{ className: 'p1' },
								v.name
							),
							_react2.default.createElement(
								'p',
								{ className: 'p2' },
								v.intro
							),
							_react2.default.createElement(
								'div',
								{ className: 'div2' },
								_react2.default.createElement(
									'div',
									null,
									_react2.default.createElement(
										'span',
										null,
										_this5.time(v.premiereAt).day
									),
									'\u4E0A\u6620'
								),
								_react2.default.createElement(
									'div',
									null,
									_react2.default.createElement(
										'span',
										null,
										_this5.time(v.premiereAt).week
									)
								)
							)
						)
					);
				}
			});

			return _react2.default.createElement(
				'div',
				{ id: 'movie' },
				_react2.default.createElement(
					'div',
					{ className: 'movie_wrapper' },
					_react2.default.createElement(
						'ul',
						{ className: 'tit' },
						_react2.default.createElement(
							'li',
							{ className: this.act[0], onClick: this.tab.bind(this, 0) },
							'\u6B63\u5728\u70ED\u6620'
						),
						_react2.default.createElement(
							'li',
							{ className: this.act[1], onClick: this.tab.bind(this, 1) },
							'\u5373\u5C06\u4E0A\u6620'
						)
					),
					_react2.default.createElement(
						'ul',
						{ className: 'box' },
						lis
					)
				)
			);
		}
	}]);

	return Movie;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(_store.mapStateToProps, _store.mapDispatchToProps)(Movie);

/***/ })

});