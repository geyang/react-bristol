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
      this.setState({ logs: this._logs });
    }
  }, {
    key: 'genericHandler',
    value: function genericHandler(event) {
      var type = event.type;
      var touches = event.touches;

      var force = void 0,
          x = void 0,
          y = void 0;
      if (touches && touches.length >= 1 && typeof touches[0].force !== 'undefined') {
        force = touches[0].force;
        var _touches$ = touches[0];
        x = _touches$.clientX;
        y = _touches$.clientY;
      } else if (type.match(/^mouse/)) {
        x = event.clientX;
        y = event.clientY;

        console.log(event);
      }
      this.log({ type: type, touches: touches, force: force, position: { x: x, y: y } });
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
      var _ref = data.touch || {};

      var pageX = _ref.pageX;
      var pageY = _ref.pageY;

      console.log({ pageX: pageX, pageY: pageY });
      this._logs.push(data);
      this.setState({ logs: this._logs });
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

      var logs = this.state.logs;

      return _react2.default.createElement(
        _layoutComponents.Flex,
        { row: true,
          style: { width: width, height: height } },
        _react2.default.createElement(_layoutComponents.FlexItem, _extends({ fluid: true, component: _Canvas2.default, style: { border: '2px solid pink' },
          onMouseDown: this.genericHandler,
          onMouseMove: this.genericHandler,
          onMouseUp: this.genericHandler,
          onTouchStart: this.genericHandler,
          onTouchMove: this.genericHandler,
          onTouchEnd: this.genericHandler,
          onTouchCancel: this.genericHandler
        }, _props)),
        _react2.default.createElement(
          _layoutComponents.FlexItem,
          { fixed: true, width: '400px' },
          _react2.default.createElement(
            'button',
            { onClick: this.clearLogs },
            'clear logs'
          ),
          _react2.default.createElement(
            'table',
            null,
            _react2.default.createElement(
              'thead',
              null,
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                  'th',
                  null,
                  'Event Type'
                ),
                _react2.default.createElement(
                  'th',
                  null,
                  'X'
                ),
                _react2.default.createElement(
                  'th',
                  null,
                  'Y'
                ),
                _react2.default.createElement(
                  'th',
                  null,
                  'force'
                )
              )
            ),
            _react2.default.createElement(
              'tbody',
              { style: {} },
              logs.map(function (log, $ind) {
                return _react2.default.createElement(
                  'tr',
                  { key: $ind },
                  _react2.default.createElement(
                    'td',
                    null,
                    log.type
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    log.position ? log.position.x : ''
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    log.position ? log.position.y : ''
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    log.touches ? log.force : 'x'
                  )
                );
              })
            )
          )
        )
      );
    }
  }]);

  return HappySandwichMaker;
}(_react.Component), _class2.propTypes = {}, _class2.defaultProps = {}, _temp), (_applyDecoratedDescriptor(_class.prototype, 'genericHandler', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'genericHandler'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'clearLogs', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'clearLogs'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'log', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'log'), _class.prototype)), _class);

// onGuestureStart={this.genericHandler}
// onGuestureChange={this.genericHandler}
// onGuestureEnd={this.genericHandler}

exports.default = HappySandwichMaker;
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(func, 'func', 'src/HappySandwichMaker.js');

  __REACT_HOT_LOADER__.register(bool, 'bool', 'src/HappySandwichMaker.js');

  __REACT_HOT_LOADER__.register(string, 'string', 'src/HappySandwichMaker.js');

  __REACT_HOT_LOADER__.register(oneOf, 'oneOf', 'src/HappySandwichMaker.js');

  __REACT_HOT_LOADER__.register(HappySandwichMaker, 'HappySandwichMaker', 'src/HappySandwichMaker.js');
})();

;