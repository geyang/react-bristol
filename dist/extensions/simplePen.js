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
  var _ref$strokeWidth = _ref.strokeWidth;
  var strokeWidth = _ref$strokeWidth === undefined ? 1 : _ref$strokeWidth;


  var floor = 0.5;

  function getWidth(force) {
    return strokeWidth * Math.max(Math.min(1.5, force / 0.065), floor);
  }

  function getColor(force) {
    return (0, _color2.default)(color).alpha(Math.max(force / 0.0125, 0.5)).hslaString();
  }

  return function simplePen(context, pathData) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? { active: false } : arguments[2];

    if (!pathData) return;
    context.beginPath();
    if (pathData.length == 0) return;

    if (options.active) {
      pathData = pathData.slice(-2);
      context.lineCap = 'butt';
    } else {
      context.lineCap = 'butt';
      // context.lineCap = 'round';
      if (pathData.length == 1) {
        var point = pathData[0];
        var halfWidth = getWidth(point.force) / 4;
        pathData = [{
          x: point.x - halfWidth,
          y: point.y - halfWidth,
          tilt: point.tilt,
          force: point.force
        }, {
          x: point.x + halfWidth,
          y: point.y + halfWidth,
          tilt: point.tilt,
          force: point.force
        }];
      }
    }

    context.moveTo(pathData[0].x, pathData[0].y);
    for (var i = 1; i < pathData.length; i++) {
      var _point = pathData[i];
      var force = _point.force;
      if (typeof force === 'undefined') force = 1;
      context.lineWidth = getWidth(force);
      context.strokeStyle = '' + getColor(force);
      context.lineTo(_point.x, _point.y);
      context.stroke();
      if (!options.active) {
        context.beginPath();
        context.moveTo(_point.x, _point.y);
      }
    }
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