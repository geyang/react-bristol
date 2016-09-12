/** Created by ge on 9/12/16. */
import Color from 'color';
const {PI, sin, cos, arctan, max} = Math;
export default function CalligraphyPen({color, strokeWidth, angle = -45, epsilon = 0.5, blur = 1}) {
  const offsetX = strokeWidth / 2 * cos(PI * angle / 180);
  const offsetY = strokeWidth / 2 * sin(PI * angle / 180);

  function calligraphyPen(context, pathData) {
    if (!pathData) return;
    context.beginPath();
    context.lineWidth = strokeWidth;
    context.shadowBlur = strokeWidth * blur / 2;
    context.shadowColor = color;
    const points = [];
    pathData.forEach(
      ({x, y, force, tilt}, ind) => {
        // const {x: _x, y: _y} = pathData[ind - 1] || {x, y};
        // const theta = arctan((y - _y) / (x - _x));
        points.push(
          {x: x + max(offsetX, strokeWidth / 2 * epsilon, 0.5), y: max(y + offsetY, strokeWidth / 2 * epsilon, 0.5)}
        );
        points.unshift(
          {x: x - max(offsetX, strokeWidth / 2 * epsilon, 0.5), y: y - max(offsetY, strokeWidth / 2 * epsilon, 0.5)},
        );
      }
    );

    context.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      const point = points[i];
      let _color = Color(color).clearer(point.force / 0.5);
      context.fillStyle = _color;
      context.strokeStyle = `${_color}`;
      context.lineTo(point.x + offsetX, point.y + offsetY);
      context.strokeStyle = `${Color(color).clearer(point.force / 0.5)}`;
    }
    context.closePath();
    context.fill();
  }
  return calligraphyPen;
}
