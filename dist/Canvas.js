'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /** Created by ge on 9/11/16. */


var propTypes = {};
var defaultProps = {};
function Canvas(_ref) {
  var _props = _objectWithoutProperties(_ref, []);

  return _react2.default.createElement('canvas', _props);
}

Canvas.propTypes = propTypes;
Canvas.defaultProps = defaultProps;
var _default = Canvas;
exports.default = _default;
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(propTypes, 'propTypes', 'src/Canvas.js');

  __REACT_HOT_LOADER__.register(defaultProps, 'defaultProps', 'src/Canvas.js');

  __REACT_HOT_LOADER__.register(Canvas, 'Canvas', 'src/Canvas.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/Canvas.js');
})();

;