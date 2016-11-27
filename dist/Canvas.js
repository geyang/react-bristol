'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /** Created by ge on 9/11/16. */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var bool = _react.PropTypes.bool;
var Canvas = (_temp = _class = function (_Component) {
  _inherits(Canvas, _Component);

  function Canvas() {
    _classCallCheck(this, Canvas);

    return _possibleConstructorReturn(this, (Canvas.__proto__ || Object.getPrototypeOf(Canvas)).apply(this, arguments));
  }

  _createClass(Canvas, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.nativeElement = (0, _reactDom.findDOMNode)(this);
      this.context = this.nativeElement.getContext('2d');
    }
  }, {
    key: 'clearPageOffset',
    value: function clearPageOffset() {
      this._pageOffset = undefined;
      return this.pageOffset;
    }
  }, {
    key: 'clear',
    value: function clear() {
      var _props2 = this.props;
      var width = _props2.width;
      var height = _props2.height;

      this.context.clearRect(0, 0, width, height);
    }
  }, {
    key: 'getImageData',
    value: function getImageData() {
      var _props3 = this.props;
      var width = _props3.width;
      var height = _props3.height;

      return this.context.getImageData(0, 0, width, height);
    }
  }, {
    key: 'saveImage',
    value: function saveImage() {
      this.image = this.getImageData();
    }
  }, {
    key: 'putImage',
    value: function putImage() {
      return this.context.putImageData(this.image, 0, 0);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props;
      var interpolation = _props4.interpolation;
      var style = _props4.style;

      var _props = _objectWithoutProperties(_props4, ['interpolation', 'style']);

      var _style = interpolation ? style : _extends({
        imageRendering: 'optimizeSpeed',
        // imageRendering: '-moz-crisp-edges',
        // imageRendering: '-webkit-optimize-contrast',
        // imageRendering: '-o-crisp-edges',
        // imageRendering: 'pixelated',
        msInterpolationMode: 'nearest-neighbor'
      }, style);
      return _react2.default.createElement('canvas', _extends({ style: _style }, _props));
    }
  }, {
    key: 'pageOffset',
    get: function get() {
      if (this._pageOffset) return this._pageOffset;
      var canvasRect = this.nativeElement.getBoundingClientRect();
      var pageRect = window.document.body.getBoundingClientRect();
      this._pageOffset = {
        left: canvasRect.left - pageRect.left,
        right: canvasRect.right - pageRect.right,
        top: canvasRect.top - pageRect.top,
        bottom: canvasRect.bottom - pageRect.bottom,
        width: canvasRect.width,
        height: canvasRect.height
      };
      return this._pageOffset;
    }
  }]);

  return Canvas;
}(_react.Component), _class.propTypes = {
  interpolation: bool
}, _class.defaultProps = {
  interpolation: true
}, _temp);
exports.default = Canvas;
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(bool, 'bool', 'src/Canvas.js');

  __REACT_HOT_LOADER__.register(Canvas, 'Canvas', 'src/Canvas.js');
})();

;