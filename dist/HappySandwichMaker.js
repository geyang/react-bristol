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

var _layoutComponents = require('layout-components');

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
      this._logs = [];
      this._paths = {};
      this.setState({ logs: this._logs });
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
      var type = event.type;
      var touches = event.touches;

      var pageX = void 0,
          pageY = void 0,
          force = void 0,
          tilt = void 0;
      if (touches && touches.length >= 1 && typeof touches[0].force !== 'undefined') {
        var _touches$ = touches[0];
        pageX = _touches$.pageX;
        pageY = _touches$.pageY;
        force = _touches$.force;
        tilt = _touches$.tilt;
      } else if (type.match(/^mouse/)) {
        pageX = event.pageX;
        pageY = event.pageY;
      }
      var x = pageX - this.canvas.pageOffset.left;
      var y = pageY - this.canvas.pageOffset.top;

      switch (type) {
        case 'mousedown':
          this.startDrawing({ id: 'mouse', x: x, y: y });
          break;
        case 'touchstart':
          this.startDrawing({ id: touch.identifier, x: x, y: y, force: force, tilt: tilt });
          break;
        case 'mousemove':
          this.appendDrawing({ id: 'mouse', x: x, y: y });
          break;
        case 'touchmove':
          this.appendDrawing({ id: touch.identifier, x: x, y: y, force: force, tilt: tilt });
          break;
        case 'mouseup':
          this.endDrawing({ id: 'mouse', x: x, y: y });
          break;
        case 'touchend':
          this.endDrawing({ id: touch.identifier, x: x, y: y, force: force, tilt: tilt });
          console.log('touchend', x, y);
          break;
      }
      this._throttledDraw();
    }
  }, {
    key: 'startPath',
    value: function startDrawing(_ref) {
      var id = _ref.id;
      var x = _ref.x;
      var y = _ref.y;
      var force = _ref.force;
      var tilt = _ref.tilt;

      this._paths[id] = [{ x: x, y: y, force: force, tilt: tilt }];
    }
  }, {
    key: 'appendPathPoint',
    value: function appendDrawing(_ref2) {
      var id = _ref2.id;
      var x = _ref2.x;
      var y = _ref2.y;
      var force = _ref2.force;
      var tilt = _ref2.tilt;

      if (!this._paths[id]) return;
      this._paths[id].push({ x: x, y: y, force: force, tilt: tilt });
    }
  }, {
    key: 'completePath',
    value: function endDrawing(_ref3) {
      var _this2 = this;

      var id = _ref3.id;
      var x = _ref3.x;
      var y = _ref3.y;
      var force = _ref3.force;
      var tilt = _ref3.tilt;

      this.appendDrawing({ id: id, x: x, y: y, force: force, tilt: tilt });
      setTimeout(function () {
        return delete _this2._paths[id];
      }, 16);
    }
  }, {
    key: 'clearLogs',
    value: function clearLogs() {
      this._logs = [];
      this.setState({ logs: this._logs });
    }
  }, {
    key: 'log',
    value: function log(data) {
      var _ref4 = data.position || {};

      var x = _ref4.x;
      var y = _ref4.y;

      this._logs.push(data);
      this.setState({ logs: this._logs });
    }
  }, {
    key: 'draw',
    value: function draw(path, stylus) {
      if (!path) return;
      var context = this.activeContext;
      context.beginPath();
      context.lineWidth = 1;
      context.strokeStyle = "red";
      context.moveTo(path[0].x, path[0].y);
      for (var i = 1; i < path.length; i++) {
        context.lineTo(path[i].x, path[i].y);
        // context.quadraticCurveTo(20,100,10,20);
      }
      context.stroke();
    }
  }, {
    key: '_throttledDraw',
    value: function _throttledDraw() {
      for (var key in this._paths) {
        var path = this._paths[key];
        this.draw(path);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var width = _props2.width;
      var height = _props2.height;
      var scale = _props2.scale;
      var offset = _props2.offset;

      var _props = _objectWithoutProperties(_props2, ['width', 'height', 'scale', 'offset']);

      return _react2.default.createElement(_Canvas2.default, _extends({ ref: 'active',
        style: { border: '2px solid pink' },
        width: width,
        height: height,
        onMouseDown: this.genericHandler,
        onMouseMove: this.genericHandler,
        onMouseUp: this.genericHandler,
        onTouchStart: this.genericHandler,
        onTouchMove: this.genericHandler,
        onTouchEnd: this.genericHandler,
        onTouchCancel: this.genericHandler
      }, _props));
    }
  }]);

  return HappySandwichMaker;
}(_react.Component), _class2.propTypes = {}, _class2.defaultProps = {}, _temp), (_applyDecoratedDescriptor(_class.prototype, 'genericHandler', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'genericHandler'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'clearLogs', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'clearLogs'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'log', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'log'), _class.prototype)), _class);
exports.default = HappySandwichMaker;
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(func, 'func', 'src/CanvasDrawable.js');

  __REACT_HOT_LOADER__.register(bool, 'bool', 'src/CanvasDrawable.js');

  __REACT_HOT_LOADER__.register(string, 'string', 'src/CanvasDrawable.js');

  __REACT_HOT_LOADER__.register(oneOf, 'oneOf', 'src/CanvasDrawable.js');

  __REACT_HOT_LOADER__.register(HappySandwichMaker, 'HappySandwichMaker', 'src/CanvasDrawable.js');
})();

;
