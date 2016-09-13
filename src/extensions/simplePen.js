/** Created by ge on 9/12/16. */
import Color from 'color';
export default function SimplePen({color, strokeWidth = 1, blur = 0}) {

  return function simplePen(context, pathData) {
    if (!pathData) return;
    context.beginPath();
    context.lineWidth = strokeWidth;
    context.shadowBlur = blur;
    context.shadowColor = color;
    context.moveTo(pathData[0].x, pathData[0].y);
    for (var i = 1; i < pathData.length; i++) {
      let force = pathData.slice(-1)[0].force;
      if (typeof force === 'undefined') force = 1;
      context.lineTo(pathData[i].x, pathData[i].y);
      context.strokeStyle = `${Color(color).clearer(force / 0.5)}`;
      // context.quadraticCurveTo(20,100,10,20);
    }
    context.stroke();
  }
}
