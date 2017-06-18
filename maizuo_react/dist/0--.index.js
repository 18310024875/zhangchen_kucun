webpackJsonp([0],{

/***/ 74:
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


var Home = function (_Component) {
	_inherits(Home, _Component);

	function Home(props) {
		_classCallCheck(this, Home);

		var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));

		_this.swiper = undefined;
		_this.swiper_arr = [];
		_this.now = [];
		_this.will = [];
		return _this;
	}

	_createClass(Home, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			var _this2 = this;

			console.log(this);
			$get('./src/json/banner.json', function (res) {
				_this2.swiper_arr = res.data.billboards;
				_this2.setState({});
			});
			$get('./src/json/now_movie.json', function (res) {
				_this2.now = res.data.films;
				_this2.setState({});
			});
			$get('./src/json/will_movie.json', function (res) {
				_this2.will = res.data.films;
				_this2.setState({});
			});
		}
	}, {
		key: 'addSwiper',
		value: function addSwiper() {
			this.swiper = new Swiper('.swiper-container', {
				loop: true,
				autoplay: 3000,
				autoplayDisableOnInteraction: false,
				pagination: '.swiper-pagination', // 如果需要分页器
				paginationClickable: true
			});
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			!this.swiper ? this.addSwiper() : null;
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.swiper.destroy(false);
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
		key: 'toMovie',
		value: function toMovie(x) {
			x == 'now' ? _reactRouter.browserHistory.push({ pathname: '/movie', state: { arr: ['active', ''] } }) : _reactRouter.browserHistory.push({ pathname: '/movie', state: { arr: ['', 'active'] } });
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var s_imgs = this.swiper_arr.map(function (v, k) {
				return _react2.default.createElement(
					'div',
					{ className: 'swiper-slide', key: k },
					_react2.default.createElement('img', { src: v.imageUrl })
				);
			});
			var now = this.now.map(function (v, k) {
				return _react2.default.createElement(
					'li',
					{ key: v.name, onClick: _this3.toDetails.bind(_this3, v.cover.origin, v.name) },
					_react2.default.createElement('img', { src: v.cover.origin }),
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'p',
							{ className: 'p1' },
							v.name
						),
						_react2.default.createElement(
							'p',
							{ className: 'p2' },
							v.watchCount,
							'\u5BB6\u5F71\u9662\u4E0A\u6620 ',
							v.cinemaCount,
							'\u4EBA\u8D2D\u7968'
						),
						_react2.default.createElement(
							'span',
							{ className: 'fen' },
							v.grade
						)
					)
				);
			});
			var will = this.will.map(function (v, k) {
				return _react2.default.createElement(
					'li',
					{ key: v.name, onClick: _this3.toDetails.bind(_this3, v.cover.origin) },
					_react2.default.createElement('img', { src: v.cover.origin }),
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'p',
							{ className: 'p1' },
							v.name
						),
						_react2.default.createElement(
							'p',
							{ className: 'p2' },
							v.watchCount,
							'\u5BB6\u5F71\u9662\u4E0A\u6620 ',
							v.cinemaCount,
							'\u4EBA\u8D2D\u7968'
						),
						_react2.default.createElement(
							'span',
							{ className: 'fen' },
							v.grade
						)
					)
				);
			});
			return _react2.default.createElement(
				'div',
				{ id: 'home' },
				_react2.default.createElement(
					'div',
					{ className: 'swiper-container' },
					_react2.default.createElement(
						'div',
						{ className: 'swiper-wrapper' },
						s_imgs
					),
					_react2.default.createElement('div', { className: 'swiper-pagination' })
				),
				_react2.default.createElement(
					'ul',
					{ className: 'm_box' },
					now,
					_react2.default.createElement(
						'button',
						{ className: 'more', onClick: this.toMovie.bind(this, 'now') },
						'\u66F4\u591A\u70ED\u6620\u7535\u5F71'
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'cut' },
					'\u5373\u5C06\u4E0A\u6620'
				),
				_react2.default.createElement('div', { className: 'cut_after' }),
				_react2.default.createElement(
					'ul',
					{ className: 'm_box' },
					will,
					_react2.default.createElement(
						'button',
						{ className: 'more', onClick: this.toMovie.bind(this, 'will') },
						'\u66F4\u591A\u5373\u5C06\u4E0A\u6620\u7535\u5F71'
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'up' },
					_react2.default.createElement('img', { src: './src/images/up.png' })
				)
			);
		}
	}]);

	return Home;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(_store.mapStateToProps, _store.mapDispatchToProps)(Home);

/***/ })

});