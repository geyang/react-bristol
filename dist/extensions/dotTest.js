'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DotTest;
/** Created by ge on 9/12/16. */
function DotTest(_ref) {
  var color = _ref.color;

  return function dotTest(context, pathData) {
    if (!pathData) return;
    context.strokeStyle = 'none';
    context.lineWidth = 0;
    for (var i = 0; i < pathData.length; i++) {
      context.fillStyle = color;
      context.fillRect(pathData[i].x, pathData[i].y, 1, 1);
    }
  };
}
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(DotTest, 'DotTest', 'src/extensions/dotTest.js');
})();

;