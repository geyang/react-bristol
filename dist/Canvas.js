'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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
    key: 'render',
    value: function render() {
      var _props = _objectWithoutProperties(this.props, []);

      return _react2.default.createElement('canvas', _props);
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
}(_react.Component), _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = Canvas;
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Canvas, 'Canvas', 'src/Canvas.js');
})();

;