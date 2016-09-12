'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = simplePen;
/** Created by ge on 9/12/16. */
function simplePen(context, path) {
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
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(simplePen, 'simplePen', 'src/extensions/simplePen.js');
})();

;