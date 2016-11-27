'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _class2, _temp;
// import DotTest from './extensions/dotTest';
// const pen = DotTest({color: '#003bff'});


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

var pen = (0, _simplePen2.default)({ color: '#003BFF', strokeWidth: 2 });
// import CalligraphyPen from './extensions/calligraphyPen';
// const pen = CalligraphyPen({color: 'blue', strokeWidth: 10, angle: -45, epsilon: 0.1, blur: 1});


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
      this.active = this.refs['active'];
      this.inactive = this.refs['inactive'];
      this.updatePaintStack();
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

      var _ret = function () {
        switch (eventType) {
          case 'mousedown':
          case 'touchstart':
            var _getDressedCursorPosi = _this3.getDressedCursorPosition(pageX, pageY, true);

            x = _getDressedCursorPosi.x;
            y = _getDressedCursorPosi.y;

            _this3.startPath({ id: id, x: x, y: y, force: force, tilt: tilt });
            _this3.drawActivePaths();
            break;
          case 'mousemove':
          case 'touchmove':
            if (!_this3.getActivePath(id)) return {
                v: void 0
              };

            var _getDressedCursorPosi2 = _this3.getDressedCursorPosition(pageX, pageY);

            x = _getDressedCursorPosi2.x;
            y = _getDressedCursorPosi2.y;

            _this3.appendPathPoint({ id: id, x: x, y: y, force: force, tilt: tilt });
            _this3.drawActivePaths();
            break;
          case 'mouseup':
          case 'touchend':
            var _getDressedCursorPosi3 = _this3.getDressedCursorPosition(pageX, pageY);

            x = _getDressedCursorPosi3.x;
            y = _getDressedCursorPosi3.y;

            var path = _this3.completePath({ id: id });
            setTimeout(function () {
              _this3.drawActivePaths(true);
              _this3.patchPaintStack(path);
            }, 16);
            break;
        }
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
  }, {
    key: 'getDressedCursorPosition',
    value: function getDressedCursorPosition(pageX, pageY) {
      var refreshOffset = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

      if (refreshOffset) this.active.clearPageOffset();
      var renderRatio = this.props.renderRatio;

      var pos = {
        x: (pageX - this.active.pageOffset.left - (this.active.pageOffset.width - this.props.width) / 2) * renderRatio,
        y: (pageY - this.active.pageOffset.top - (this.active.pageOffset.height - this.props.height) / 2) * renderRatio
      };
      return pos;
    }
  }, {
    key: 'startPath',
    value: function startPath(_ref3) {
      var id = _ref3.id;
      var x = _ref3.x;
      var y = _ref3.y;
      var force = _ref3.force;
      var tilt = _ref3.tilt;

      this._activePaths[id] = {
        pressureSensitive: !!force, // 0 => false, undefined => false, 0.20 => true
        data: []
      };
      this.appendPathPoint({ id: id, x: x, y: y, force: force, tilt: tilt });
    }
  }, {
    key: 'getActivePath',
    value: function getActivePath(id) {
      return this._activePaths[id];
    }
  }, {
    key: 'appendPathPoint',
    value: function appendPathPoint(_ref4) {
      var id = _ref4.id;
      var x = _ref4.x;
      var y = _ref4.y;
      var force = _ref4.force;
      var tilt = _ref4.tilt;

      var path = this.getActivePath(id);
      if (!path) return;
      if (!path.pressureSensitive) force = 1;
      path.data.push({ x: x, y: y, force: force, tilt: tilt });
    }
  }, {
    key: 'completePath',
    value: function completePath(_ref5) {
      var id = _ref5.id;

      var path = this._activePaths[id];
      this._paintStack.push(path);
      delete this._activePaths[id];
      return path;
    }
  }, {
    key: 'patchPaintStack',
    value: function patchPaintStack(newPath) {
      var save = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

      pen(this.inactive.context, newPath.data);
      if (save) this.inactive.saveImage();
      var onImageUpdate = this.props.onImageUpdate;

      if (onImageUpdate) onImageUpdate(this.inactive.image);
    }
  }, {
    key: 'updatePaintStack',
    value: function updatePaintStack() {
      var _this4 = this;

      // this.putImage();
      this.inactive.clear();
      this._paintStack.forEach(function (_ref6) {
        var data = _ref6.data;

        // todo: get pen info from path meta data next time.
        pen(_this4.inactive.context, data);
      });
      this.inactive.saveImage();
    }
  }, {
    key: 'drawActivePaths',
    value: function drawActivePaths() {
      var clearFirst = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

      if (clearFirst) this.active.clear();
      for (var key in this._activePaths) {
        var pathData = this._activePaths[key].data;
        pen(this.active.context, pathData, { active: true });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var width = _props2.width;
      var height = _props2.height;
      var renderRatio = _props2.renderRatio;
      var onImageUpdate = _props2.onImageUpdate;
      var interpolation = _props2.interpolation;
      var scale = _props2.scale;
      var offset = _props2.offset;
      var style = _props2.style;

      var _props = _objectWithoutProperties(_props2, ['width', 'height', 'renderRatio', 'onImageUpdate', 'interpolation', 'scale', 'offset', 'style']);

      var canvasStyle = {
        position: 'absolute',
        top: 0, left: 0,
        transform: 'scale(' + 1 / renderRatio + ', ' + 1 / renderRatio + ')' + ('translate(' + -width * (renderRatio - 1) * renderRatio / 2 + 'px, ' + -height * (renderRatio - 1) * renderRatio / 2 + 'px)')
      };
      console.log(-width, renderRatio, -width * renderRatio);
      return _react2.default.createElement(
        'div',
        { style: _extends({ width: width, height: height, position: 'relative' }, style) },
        _react2.default.createElement(_Canvas2.default, _extends({ ref: 'active',
          style: canvasStyle,
          width: width * renderRatio
          // always interpolate for otherwise won't show on mobile safari.
          , height: height * renderRatio,
          onMouseDown: this.genericHandler,
          onMouseMove: this.genericHandler,
          onMouseUp: this.genericHandler,
          onTouchStart: this.genericHandler,
          onTouchMove: this.genericHandler,
          onTouchEnd: this.genericHandler,
          onTouchCancel: this.genericHandler
        }, _props)),
        _react2.default.createElement(_Canvas2.default, _extends({ ref: 'inactive',
          style: _extends({}, canvasStyle, { zIndex: -1 }),
          width: width * renderRatio,
          height: height * renderRatio,
          interpolation: interpolation
        }, _props))
      );
    }
  }]);

  return HappySandwichMaker;
}(_react.Component), _class2.propTypes = {
  width: number,
  height: number,
  renderRatio: number,
  onImageUpdate: func,
  interpolation: bool
}, _class2.defaultProps = {
  renderRatio: 3,
  interpolation: true
}, _temp), (_applyDecoratedDescriptor(_class.prototype, 'genericHandler', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'genericHandler'), _class.prototype)), _class);
exports.default = HappySandwichMaker;
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(pen, 'pen', 'src/Bristol.js');

  __REACT_HOT_LOADER__.register(number, 'number', 'src/Bristol.js');

  __REACT_HOT_LOADER__.register(func, 'func', 'src/Bristol.js');

  __REACT_HOT_LOADER__.register(bool, 'bool', 'src/Bristol.js');

  __REACT_HOT_LOADER__.register(string, 'string', 'src/Bristol.js');

  __REACT_HOT_LOADER__.register(oneOf, 'oneOf', 'src/Bristol.js');

  __REACT_HOT_LOADER__.register(HappySandwichMaker, 'HappySandwichMaker', 'src/Bristol.js');
})();

;