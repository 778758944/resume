webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(159);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * 
	 * @authors Your Name (you@example.org)
	 * @date    2016-03-02 11:55:59
	 * @version $Id$
	 */
	__webpack_require__(177);
	__webpack_require__(181);

	var star = __webpack_require__(190);
	console.log(star);

	$(function () {
		var CommentFrom = (function (_React$Component) {
			_inherits(CommentFrom, _React$Component);

			function CommentFrom(props) {
				_classCallCheck(this, CommentFrom);

				var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CommentFrom).call(this, props));

				_this.state = {
					star: "0px",
					name: "",
					worktime: "",
					company: "",
					real_star: ""
				};
				var that = _this;
				_this.start_pos = 0;
				_this.down = false;
				_this.handleHover = function (e) {
					if (!that.down) {
						var mouse_x = e.pageX;
						var ele = e.target;
						if (!that.start_pos) {
							that.start_pos = ele.offsetLeft + ele.parentNode.offsetLeft;
						}
						var dif = mouse_x - that.start_pos + "px";
						that.setState({
							star: dif
						});
					}
				};

				_this.handleOut = function () {
					if (!that.down) {
						that.setState({
							star: "0px"
						});
					}
				};

				_this.handleClick = function () {
					that.down = true;
					var num = parseInt(that.state.star.replace("px", "")) / 21.2;
					var tmp_num = Math.round(num);
					if (tmp_num < num) {
						num = tmp_num + 0.5;
					} else {
						num = tmp_num;
					}
					that.setState({
						star: num * 21.2 + "px",
						final: num + "星",
						real_star: num
					});
				};
				return _this;
			}

			_createClass(CommentFrom, [{
				key: "componentWillMount",
				value: function componentWillMount() {
					var search = decodeURI(location.search).substr(1);
					var arr = search.split("&");
					var obj = {};
					for (var i = 0; i < arr.length; i++) {
						var tmp_arr = arr[i].split("=");
						obj[tmp_arr[0]] = tmp_arr[1];
					}

					this.setState({
						name: obj.name,
						worktime: obj.worktime,
						company: obj.company,
						id: obj.id
					});
				}
			}, {
				key: "render",
				value: function render() {
					return _react2.default.createElement(
						"div",
						{ className: "form-wrap" },
						_react2.default.createElement(
							"form",
							{ className: "form-horizontal", role: "form", action: "/uploadcomment", method: "POST" },
							_react2.default.createElement(
								"div",
								{ className: "form-group" },
								_react2.default.createElement(
									"label",
									{ "for": "title", className: "col-xs-2 control-label" },
									"标题"
								),
								_react2.default.createElement(
									"div",
									{ className: "col-xs-10" },
									_react2.default.createElement("input", { type: "text", className: "form-control", name: "title", id: "title", placeholder: "用几个词总结一下我的贵司的表现" })
								)
							),
							_react2.default.createElement(
								"div",
								{ className: "form-group" },
								_react2.default.createElement(
									"label",
									{ "for": "star", className: "col-xs-2 control-label" },
									"星级"
								),
								_react2.default.createElement(
									"div",
									{ className: "col-xs-10 bottom-color" },
									_react2.default.createElement(
										"div",
										{ className: "backColor" },
										_react2.default.createElement("div", { className: "backColor-inner", style: { width: this.state.star } })
									),
									_react2.default.createElement("img", { src: star, height: "20", className: "front_img", onMouseMove: this.handleHover, onMouseOut: this.handleOut, onClick: this.handleClick }),
									_react2.default.createElement(
										"div",
										{ className: "star_final" },
										this.state.final
									)
								)
							),
							_react2.default.createElement(
								"div",
								{ className: "form-group" },
								_react2.default.createElement(
									"label",
									{ "for": "pl", className: "col-xs-2 control-label" },
									"评价"
								),
								_react2.default.createElement(
									"div",
									{ className: "col-xs-10" },
									_react2.default.createElement("textarea", { type: "text", className: "form-control", name: "desc", id: "pl", placeholder: "描述一下我在贵司的表现" })
								)
							),
							_react2.default.createElement(
								"div",
								{ className: "form-group" },
								_react2.default.createElement(
									"div",
									{ className: "col-xs-offset-2 col-xs-10" },
									_react2.default.createElement(
										"button",
										{ type: "submit", className: "btn btn-primary" },
										"提交"
									)
								)
							),
							_react2.default.createElement("input", { type: "hidden", name: "star", value: this.state.real_star }),
							_react2.default.createElement("input", { type: "hidden", name: "company", value: this.state.company }),
							_react2.default.createElement("input", { type: "hidden", name: "workTime", value: this.state.worktime }),
							_react2.default.createElement("input", { type: "hidden", name: "name", value: this.state.name }),
							_react2.default.createElement("input", { type: "hidden", name: "id", value: this.state.id })
						)
					);
				}
			}]);

			return CommentFrom;
		})(_react2.default.Component);

		(0, _reactDom.render)(_react2.default.createElement(CommentFrom, null), document.getElementById("wrap"));
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 190:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "imgs/star-e44068e74ef8a39179aabc9c8b5f3043.png";

/***/ }

});