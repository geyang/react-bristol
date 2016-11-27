'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = StencilPen;
/** Created by ge on 9/12/16. */
function StencilPen(_ref) {
  var color = _ref.color;
  var _ref$alpha = _ref.alpha;
  var alpha = _ref$alpha === undefined ? 1 : _ref$alpha;
  var strokeWidth = _ref.strokeWidth;


  return function stencilPen(context, pathData, _ref2) {
    var _ref2$active = _ref2.active;
    var active = _ref2$active === undefined ? false : _ref2$active;

    if (!pathData) return;
    context.beginPath();
    context.lineWidth = strokeWidth;
    if (pathData.length < 2) return;else if (active) pathData = pathData.slice(-2);

    context.moveTo(pathData[0].x, pathData[0].y);
    for (var i = 1; i < pathData.length; i++) {
      var force = pathData.slice(-1)[0].force;
      if (typeof force === 'undefined') force = 1;
      context.lineTo(pathData[i].x, pathData[i].y);
      context.strokeStyle = 'rgba(40, 200, 255, ' + alpha * force / 0.5 + ')';
      // context.quadraticCurveTo(20,100,10,20);
    }
    context.stroke();
  };
}
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(StencilPen, 'StencilPen', 'src/extensions/stencilPen.js');
})();

;