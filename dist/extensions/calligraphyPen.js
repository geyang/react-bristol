'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CalligraphyPen;

var _color2 = require('color');

var _color3 = _interopRequireDefault(_color2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PI = Math.PI; /** Created by ge on 9/12/16. */

var sin = Math.sin;
var cos = Math.cos;
var arctan = Math.arctan;
var max = Math.max;
function CalligraphyPen(_ref) {
  var color = _ref.color;
  var strokeWidth = _ref.strokeWidth;
  var _ref$angle = _ref.angle;
  var angle = _ref$angle === undefined ? -45 : _ref$angle;
  var _ref$epsilon = _ref.epsilon;
  var epsilon = _ref$epsilon === undefined ? 0.5 : _ref$epsilon;
  var _ref$blur = _ref.blur;
  var blur = _ref$blur === undefined ? 1 : _ref$blur;

  var offsetX = strokeWidth / 2 * cos(PI * angle / 180);
  var offsetY = strokeWidth / 2 * sin(PI * angle / 180);

  function calligraphyPen(context, pathData) {
    if (!pathData) return;
    context.beginPath();
    context.lineWidth = strokeWidth;
    context.shadowBlur = strokeWidth * blur / 2;
    context.shadowColor = color;
    var points = [];
    pathData.forEach(function (_ref2, ind) {
      var x = _ref2.x;
      var y = _ref2.y;
      var force = _ref2.force;
      var tilt = _ref2.tilt;

      // const {x: _x, y: _y} = pathData[ind - 1] || {x, y};
      // const theta = arctan((y - _y) / (x - _x));
      points.push({ x: x + max(offsetX, strokeWidth / 2 * epsilon, 0.5), y: max(y + offsetY, strokeWidth / 2 * epsilon, 0.5) });
      points.unshift({ x: x - max(offsetX, strokeWidth / 2 * epsilon, 0.5), y: y - max(offsetY, strokeWidth / 2 * epsilon, 0.5) });
    });

    context.moveTo(points[0].x, points[0].y);
    for (var i = 1; i < points.length; i++) {
      var point = points[i];
      var _color = (0, _color3.default)(color).clearer(point.force / 0.5);
      context.fillStyle = _color;
      context.strokeStyle = '' + _color;
      context.lineTo(point.x + offsetX, point.y + offsetY);
      context.strokeStyle = '' + (0, _color3.default)(color).clearer(point.force / 0.5);
    }
    context.closePath();
    context.fill();
  }
  return calligraphyPen;
}
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(PI, 'PI', 'src/extensions/calligraphyPen.js');

  __REACT_HOT_LOADER__.register(sin, 'sin', 'src/extensions/calligraphyPen.js');

  __REACT_HOT_LOADER__.register(cos, 'cos', 'src/extensions/calligraphyPen.js');

  __REACT_HOT_LOADER__.register(arctan, 'arctan', 'src/extensions/calligraphyPen.js');

  __REACT_HOT_LOADER__.register(max, 'max', 'src/extensions/calligraphyPen.js');

  __REACT_HOT_LOADER__.register(CalligraphyPen, 'CalligraphyPen', 'src/extensions/calligraphyPen.js');
})();

;