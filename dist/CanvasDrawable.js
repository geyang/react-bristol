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
      this._activePaths = {};
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
      var _this2 = this;

      event.preventDefault();
      var type = event.type;
      var changedTouches = event.changedTouches;

      if (type === 'mousedown' || type === 'touchstart') this.canvas.pageOffset = {};
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
      this._throttledDraw();
    }
  }, {
    key: 'recordTouch',
    value: function recordTouch(_ref2) {
      var eventType = _ref2.eventType;
      var id = _ref2.id;
      var pageX = _ref2.pageX;
      var pageY = _ref2.pageY;
      var force = _ref2.force;
      var tilt = _ref2.tilt;

      var x = pageX - this.canvas.pageOffset.left;
      var y = pageY - this.canvas.pageOffset.top;

      switch (eventType) {
        case 'mousedown':
        case 'touchstart':
          this.startPath({ id: id, x: x, y: y, force: force, tilt: tilt });
          break;
        case 'mousemove':
        case 'touchmove':
          this.appendPathPoint({ id: id, x: x, y: y, force: force, tilt: tilt });
          break;
        case 'mouseup':
        case 'touchend':
          this.completePath({ id: id, x: x, y: y, force: force, tilt: tilt });
          break;
      }
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
      var _this3 = this;

      var id = _ref5.id;
      var x = _ref5.x;
      var y = _ref5.y;
      var force = _ref5.force;
      var tilt = _ref5.tilt;

      this.appendPathPoint({ id: id, x: x, y: y, force: force, tilt: tilt });
      setTimeout(function () {
        return delete _this3._activePaths[id];
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
      var _ref6 = data.position || {};

      var x = _ref6.x;
      var y = _ref6.y;

      this._logs.push(data);
      this.setState({ logs: this._logs });
    }
  }, {
    key: 'simplePen',
    value: function draw(context, path, stylus) {
      if (!path) return;
      context.beginPath();
      context.moveTo(path[0].x, path[0].y);
      for (var i = 1; i < path.length; i++) {
        var force = path.slice(-1)[0].force;
        if (typeof force === 'undefined') force = 1;
        context.lineTo(path[i].x, path[i].y);
        context.lineWidth = force * 1;
        context.strokeStyle = 'rgba(40, 200, 255, ' + force + ')';
        // context.quadraticCurveTo(20,100,10,20);
      }
      context.stroke();
    }
  }, {
    key: 'drawActivePaths',
    value: function _throttledDraw() {
      for (var key in this._activePaths) {
        var path = this._activePaths[key];
        var context = this.activeContext;
        var _props2 = this.props;
        var width = _props2.width;
        var height = _props2.height;

        context.clearRect(0, 0, width, height);
        this.draw(context, path);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var width = _props3.width;
      var height = _props3.height;
      var scale = _props3.scale;
      var offset = _props3.offset;

      var _props = _objectWithoutProperties(_props3, ['width', 'height', 'scale', 'offset']);

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
