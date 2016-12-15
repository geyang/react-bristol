/** Created by ge on 9/12/16. */
import {rangedTaper} from "./utils";
const FLOOR = 0.2;
const CEILING = 1.5;
const DEFAULT_FORCE = 0.5;
export default class Eraser {
  static type = "Eraser";

  constructor(config) {
    if (config) {
      const {type, alpha, strokeWidth = 1} = config;
      this.config({type, alpha, strokeWidth});
    }
  }

  config(configuration) {
    if (!configuration) throw Error("configuration options is " + (typeof configuration));
    if (configuration.type !== Eraser.type) throw Error('configuration is for a different pen ' + configuration.type);
    if (configuration) this._config = configuration
  }

  _getWidth(force, renderRatio) {
    return this._config.strokeWidth * renderRatio * rangedTaper(FLOOR, CEILING, force);
  }

  _getColor(force) {
    return `rgba(255, 255, 255, ${Math.max(force / 0.0125, 0.25)})`;
  }

  draw(context, {config, data:{xs, ys, configs, forces, tilts}}, options = {active: false}) {
    if (!xs || xs.length == 0) return;
    const renderRatio = context.renderRatio;

    const oldComposition = context.globalCompositeOperation;
    // kind of a dicey implementation.
    context.globalCompositeOperation = options.active ? "source-over" : "destination-out";

    context.beginPath();
    context.lineCap = 'round';
    console.log('context.lineCap', context.lineCap);

    if (options.active) {
      xs = xs.slice(-2);
      ys = ys.slice(-2);
      if (configs) configs = configs.slice(-2);
      if (forces) forces = forces.slice(-2);
      if (tilts) tilts = tilts.slice(-2);
    } else {
      // // context.lineCap = 'butt';
      // context.lineCap = 'round';
      if (xs.length == 1) {

        let halfWidth = this._getWidth(forces ? forces[0] : DEFAULT_FORCE, renderRatio) / 10;
        xs = [xs[0] - halfWidth, xs[0] + halfWidth];
        ys = [ys[0] - halfWidth, ys[0] + halfWidth];
        if (configs) configs = [configs[0], configs[0]];
        if (forces) forces = [forces[0], forces[0]];
        if (tilts) tilts = [tilts[0], tilts[0]];
      }
    }

    this.config(config);
    context.moveTo(xs[0], ys[0]);
    // default force is no force information is available from the path.
    let force = DEFAULT_FORCE;
    for (let i = 1; i < xs.length; i++) {
      // reconfig the pen, in case the config changes.
      if (configs) this.config(configs[i]);
      if (forces) force = forces[i];
      context.lineWidth = this._getWidth(force, renderRatio);
      context.strokeStyle = this._getColor(force);
      context.lineTo(xs[i], ys[i]);
      context.stroke();
      if (!options.active) {
        context.beginPath();
        context.moveTo(xs[i], ys[i]);
      }
    }
    context.globalCompositionOperation = oldComposition;
  }
}
