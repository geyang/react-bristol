/** Created by ge on 9/12/16. */
import {limit, rangedTaper} from "./utils";
const DEFAULT_FORCE = 0.5;
const DEFAULT_TILT = 0.5;
export default class Eraser {
  static type = "Eraser";

  constructor(config) {
    if (config) this.config = config;
  }

  set config(configuration) {
    const {
      type, alpha, strokeWidth = 1,
      strokeFloor = 0.6, strokeCeiling = 1.5, strokeScale = 10,
      alphaFloor = 0.4, alphaCeiling = 1.0, alphaScale = 10,
    } = configuration;
    if (!configuration) throw Error("configuration options is " + (typeof configuration));
    if (configuration.type !== Eraser.type) throw Error('configuration is for a different pen ' + configuration.type);
    this._config = {
      type, alpha, strokeWidth,
      strokeFloor, strokeCeiling, strokeScale,
      alphaFloor, alphaCeiling, alphaScale,
    };
  }

  get config() {
    return this._config
  }

  _getWidth(force, renderRatio) {
    return this.config.strokeWidth * renderRatio * rangedTaper(
        this.config.strokeFloor, this.config.strokeCeiling, this.config.strokeScale,
        force);
  }

  _getColor(force) {
    return `rgba(255, 255, 255, ${limit(0, 1, rangedTaper(this.config.alphaFloor, this.config.alphaCeiling, this.config.alphaScale, force))})`;
  }

  draw(context, {config, x, y, force = DEFAULT_FORCE, tilt = DEFAULT_TILT, data:{xs, ys, configs, forces, tilts}}, options = {active: false}) {
    if (!xs || xs.length == 0) return;
    const renderRatio = context.renderRatio;

    const oldComposition = context.globalCompositeOperation;
    // kind of a dicey implementation.
    context.globalCompositeOperation = options.active ? "source-over" : "destination-out";

    context.beginPath();
    context.lineCap = 'round';

    this.config = config;
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
        x = xs[0] - halfWidth, xs = [xs[0] + halfWidth];
        y = ys[0] - halfWidth, ys = [ys[0] + halfWidth];
        if (configs) config = configs[0], configs = configs.slice(-1);
        if (forces) force = forces[0], forces = forces.slice(-1);
        if (tilts) tilt = tilts[0], tilts = tilts.slice(-1);
      }
    }

    for (let i = xs.length - 1; i >= 0; i--) {
      context.moveTo(x, y);
      // reconfig the pen, in case the config changes.
      if (configs) this.config = configs[i];
      if (forces) force -= forces[i];
      if (tilts) tilt -= tilts[i];

      context.lineWidth = this._getWidth(force, renderRatio);
      context.strokeStyle = this._getColor(force);

      // now finish the stroke
      x -= xs[i];
      y -= ys[i];
      context.lineTo(x, y);
      // // todo: this is wrong. It prevents the stroke from having variable width.
      context.stroke();
      // if (i === 0) context.stroke();
      // if (options.active) {
      context.beginPath();
      context.moveTo(x, y);
      // }
    }
    context.globalCompositionOperation = oldComposition;
  }
}
