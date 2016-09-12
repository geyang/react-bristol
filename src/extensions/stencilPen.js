/** Created by ge on 9/12/16. */
export default function StencilPen({color, alpha = 1, strokeWidth}) {

  return function stencilPen(context, pathData) {
    if (!pathData) return;
    context.beginPath();
    context.lineWidth = strokeWidth;
    context.moveTo(pathData[0].x, pathData[0].y);
    for (var i = 1; i < pathData.length; i++) {
      let force = pathData.slice(-1)[0].force;
      if (typeof force === 'undefined') force = 1;
      context.lineTo(pathData[i].x, pathData[i].y);
      context.strokeStyle = `rgba(40, 200, 255, ${alpha * force / 0.5})`;
      // context.quadraticCurveTo(20,100,10,20);
    }
    context.stroke();
  }
}
