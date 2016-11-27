/** Created by ge on 9/12/16. */
export default function DotTest({color}) {
  return function dotTest(context, pathData) {
    if (!pathData) return;
    context.strokeStyle = 'none';
    context.lineWidth = 0;
    for (var i = 0; i < pathData.length; i++) {
      context.fillStyle = color;
      context.fillRect(pathData[i].x, pathData[i].y, 1, 1);
    }
  }
}
