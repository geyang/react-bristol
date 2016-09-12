'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _autobindDecorator = require('autobind-decorator');

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

var _Canvas = require('./Canvas');

var _Canvas2 = _interopRequireDefault(_Canvas);

var _simplePen = require('./extensions/simplePen');

var _simplePen2 = _interopRequireDefault(_simplePen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var number = _react.PropTypes.number;
var func = _react.PropTypes.func;
var bool = _react.PropTypes.bool;
var string = _react.PropTypes.string;
var oneOf = _react.PropTypes.oneOf;
/**
 * description of the component
 */

var HappySandwichMaker = (_class = (_temp = _class2 = function (_Component) {
  _inherits(HappySandwichMaker, _Component);

  function HappySandwichMaker() {
    _classCallCheck(this, HappySandwichMaker);

    return _possibleConstructorReturn(this, (HappySandwichMaker.__proto__ || Object.getPrototypeOf(HappySandwichMaker)).apply(this, arguments));
  }

  _createClass(HappySandwichMaker, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._activePaths = {};
      this._paintStack = [];
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.canvas = this.refs['active'];
      this.activeContext = this.canvas.context;
    }
  }, {
    key: 'genericHandler',
    value: function genericHandler(event) {
      var _this2 = this;

      event.preventDefault();
      var type = event.type;
      var changedTouches = event.changedTouches;
      // strokeChange

      if (changedTouches && changedTouches.length >= 1 && typeof changedTouches[0].force !== 'undefined') {
        Array.from(changedTouches).forEach(function (_ref) {
          var identifier = _ref.identifier;
          var pageX = _ref.pageX;
          var pageY = _ref.pageY;
          var force = _ref.force;
          var tilt = _ref.tilt;
          return _this2.recordTouch({ eventType: type, id: identifier, pageX: pageX, pageY: pageY, force: force, tilt: tilt });
        });
      } else if (type.match(/^mouse/)) {
        var pageX = event.pageX;
        var pageY = event.pageY;

        this.recordTouch({ eventType: type, id: 'mouse', pageX: pageX, pageY: pageY });
      }
    }
  }, {
    key: 'getDressedCursorPosition',
    value: function getDressedCursorPosition(pageX, pageY) {
      var refreshOffset = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

      if (refreshOffset) this.canvas.clearPageOffset();
      var renderRatio = this.props.renderRatio;

      return {
        x: (pageX - this.canvas.pageOffset.left - (this.canvas.pageOffset.width - this.props.width) / 2) * renderRatio,
        y: (pageY - this.canvas.pageOffset.top - (this.canvas.pageOffset.height - this.props.height) / 2) * renderRatio
      };
    }
  }, {
    key: 'recordTouch',
    value: function recordTouch(_ref2) {
      var _this3 = this;

      var eventType = _ref2.eventType;
      var id = _ref2.id;
      var pageX = _ref2.pageX;
      var pageY = _ref2.pageY;
      var force = _ref2.force;
      var tilt = _ref2.tilt;

      var x = void 0,
          y = void 0;
      switch (eventType) {
        case 'mousedown':
        case 'touchstart':
          var _getDressedCursorPosi = this.getDressedCursorPosition(pageX, pageY, true);

          x = _getDressedCursorPosi.x;
          y = _getDressedCursorPosi.y;

          this.startPath({ id: id, x: x, y: y, force: force, tilt: tilt });
          break;
        case 'mousemove':
        case 'touchmove':
          var _getDressedCursorPosi2 = this.getDressedCursorPosition(pageX, pageY);

          x = _getDressedCursorPosi2.x;
          y = _getDressedCursorPosi2.y;

          this.appendPathPoint({ id: id, x: x, y: y, force: force, tilt: tilt });
          break;
        case 'mouseup':
        case 'touchend':
          var _getDressedCursorPosi3 = this.getDressedCursorPosition(pageX, pageY);

          x = _getDressedCursorPosi3.x;
          y = _getDressedCursorPosi3.y;

          this.appendPathPoint({ id: id, x: x, y: y, force: force, tilt: tilt });
          setTimeout(function () {
            return _this3.completePath({ id: id });
          }, 16);
          break;
      }
      this.draw();
    }
  }, {
    key: 'startPath',
    value: function startPath(_ref3) {
      var id = _ref3.id;
      var x = _ref3.x;
      var y = _ref3.y;
      var force = _ref3.force;
      var tilt = _ref3.tilt;

      this._activePaths[id] = [{ x: x, y: y, force: force, tilt: tilt }];
    }
  }, {
    key: 'appendPathPoint',
    value: function appendPathPoint(_ref4) {
      var id = _ref4.id;
      var x = _ref4.x;
      var y = _ref4.y;
      var force = _ref4.force;
      var tilt = _ref4.tilt;

      if (!this._activePaths[id]) return;
      this._activePaths[id].push({ x: x, y: y, force: force, tilt: tilt });
    }
  }, {
    key: 'completePath',
    value: function completePath(_ref5) {
      var id = _ref5.id;

      // this need to go into a function
      this._paintStack.push(this._activePaths[id]);
      delete this._activePaths[id];
    }
  }, {
    key: 'draw',
    value: function draw() {
      //1. draw existing
      //2. draw active
      this.drawActivePaths();
      //3. rescale
      // todo: use inactiveContext
      var renderRatio = this.props.renderRatio;
      // console.log(renderRatio);

      this.activeContext.scale(1, 1);
    }
  }, {
    key: 'drawActivePaths',
    value: function drawActivePaths() {
      for (var key in this._activePaths) {
        var path = this._activePaths[key];
        var context = this.activeContext;
        (0, _simplePen2.default)(context, path);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var width = _props2.width;
      var height = _props2.height;
      var renderRatio = _props2.renderRatio;
      var scale = _props2.scale;
      var offset = _props2.offset;
      var style = _props2.style;

      var _props = _objectWithoutProperties(_props2, ['width', 'height', 'renderRatio', 'scale', 'offset', 'style']);

      return _react2.default.createElement(
        'div',
        { style: _extends({ width: width, height: height }, style) },
        _react2.default.createElement(_Canvas2.default, _extends({ ref: 'active',
          style: {
            transform: 'scale(' + 1 / renderRatio + ', ' + 1 / renderRatio + ')' + ('translate(' + -width * renderRatio + 'px, ' + -height * renderRatio + 'px)')
          },
          width: width * renderRatio,
          height: height * renderRatio,
          onMouseDown: this.genericHandler,
          onMouseMove: this.genericHandler,
          onMouseUp: this.genericHandler,
          onTouchStart: this.genericHandler,
          onTouchMove: this.genericHandler,
          onTouchEnd: this.genericHandler,
          onTouchCancel: this.genericHandler
        }, _props))
      );
    }
  }]);

  return HappySandwichMaker;
}(_react.Component), _class2.propTypes = {
  width: number,
  height: number,
  renderRatio: number
}, _class2.defaultProps = {
  renderRatio: 3
}, _temp), (_applyDecoratedDescriptor(_class.prototype, 'genericHandler', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'genericHandler'), _class.prototype)), _class);
exports.default = HappySandwichMaker;
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(number, 'number', 'src/CanvasDrawable.js');

  __REACT_HOT_LOADER__.register(func, 'func', 'src/CanvasDrawable.js');

  __REACT_HOT_LOADER__.register(bool, 'bool', 'src/CanvasDrawable.js');

  __REACT_HOT_LOADER__.register(string, 'string', 'src/CanvasDrawable.js');

  __REACT_HOT_LOADER__.register(oneOf, 'oneOf', 'src/CanvasDrawable.js');

  __REACT_HOT_LOADER__.register(HappySandwichMaker, 'HappySandwichMaker', 'src/CanvasDrawable.js');
})();

;