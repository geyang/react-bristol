/** Created by ge on 9/12/16. */
import Color from 'color';
export default function SimplePen({color, strokeWidth = 1}) {

  let floor = 0.5;

  function getWidth(force) {
    return strokeWidth * Math.max(Math.min(1.5, force / 0.065), floor);
  }

  function getColor(force) {
    return Color(color).alpha(Math.max(force / 0.0125, 0.5)).hslaString();
  }

  return function simplePen(context, pathData, options = {active: false}) {
    if (!pathData) return;
    context.beginPath();
    if (pathData.length == 0)
      return;

    if (options.active) {
      pathData = pathData.slice(-2);
      context.lineCap = 'butt';
    } else {
      context.lineCap = 'butt';
      // context.lineCap = 'round';
      if (pathData.length == 1) {
        let point = pathData[0];
        let halfWidth = getWidth(point.force) / 4;
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
    for (let i = 1; i < pathData.length; i++) {
      let point = pathData[i];
      let force = point.force;
      if (typeof force === 'undefined') force = 1;
      context.lineWidth = getWidth(force);
      context.strokeStyle = `${getColor(force)}`;
      context.lineTo(point.x, point.y);
      context.stroke();
      if (!options.active) {
        context.beginPath();
        context.moveTo(point.x, point.y);
      }
    }
  }
}
