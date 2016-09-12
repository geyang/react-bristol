'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SimplePen;

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SimplePen(_ref) {
  var color = _ref.color;
  var strokeWidth = _ref.strokeWidth;


  return function simplePen(context, pathData) {
    if (!pathData) return;
    context.beginPath();
    context.lineWidth = strokeWidth;
    context.shadowBlur = strokeWidth * 1.5;
    context.shadowColor = color;
    context.moveTo(pathData[0].x, pathData[0].y);
    for (var i = 1; i < pathData.length; i++) {
      var force = pathData.slice(-1)[0].force;
      if (typeof force === 'undefined') force = 1;
      context.lineTo(pathData[i].x, pathData[i].y);
      context.strokeStyle = '' + (0, _color2.default)(color).clearer(force / 0.5);
      // context.quadraticCurveTo(20,100,10,20);
    }
    context.stroke();
  };
} /** Created by ge on 9/12/16. */
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(SimplePen, 'SimplePen', 'src/extensions/simplePen.js');
})();

;