/** Created by ge on 9/12/16. */
import Color from 'color';
import {limit, rangedTaper} from "./utils";
const DEFAULT_FORCE = 0.5;
export default class SimplePen {
  static type = "SimplePen";

  constructor(config) {
    if (config) this.config = config;
  }

  set config(configuration) {
    const {
      type, color, strokeWidth = 1,
      strokeFloor = 0.5, strokeCeiling = 1, strokeScale = 10,
      alphaFloor = 0.2, alphaCeiling = 1.5, alphaScale = 10,
    } = configuration;
    if (!configuration) throw Error("configuration options is " + (typeof configuration));
    if (configuration.type !== SimplePen.type) throw Error('configuration is for a different pen ' + configuration.type);
    this._config = {
      type, color, strokeWidth,
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
    return Color(this.config.color).alpha(limit(0, 1, rangedTaper(this.config.alphaFloor, this.config.alphaCeiling, this.config.alphaScale, force))).hslaString();
  }

  draw(context, {config, data:{xs, ys, configs, forces, tilts}}, options = {active: false}) {
    if (!xs || xs.length == 0) return;
    const renderRatio = context.renderRatio;

    const oldComposition = context.globalCompositeOperation;
    // kind of a dicey implementation.
    context.globalCompositeOperation = "source-over";

    context.beginPath();
    context.lineCap = 'butt';

    if (options.active) {
      xs = xs.slice(-2);
      ys = ys.slice(-2);
      if (configs) configs = configs.slice(-2);
      if (forces) forces = forces.slice(-2);
      if (tilts) tilts = tilts.slice(-2);
    } else {
      context.lineCap = 'butt';
      // context.lineCap = 'round';
      if (xs.length == 1) {

        let halfWidth = this._getWidth(forces ? forces[0] : DEFAULT_FORCE, renderRatio) / 4;
        xs = [xs[0] - halfWidth, xs[0] + halfWidth];
        ys = [ys[0] - halfWidth, ys[0] + halfWidth];
        if (configs) configs = [configs[0], configs[0]];
        if (forces) forces = [forces[0], forces[0]];
        if (tilts) tilts = [tilts[0], tilts[0]];
      }
    }

    this.config = config;
    context.moveTo(xs[0], ys[0]);
    // default force is no force information is available from the path.
    let force = DEFAULT_FORCE;
    for (let i = 1; i < xs.length; i++) {
      // reconfig the pen, in case the config changes.
      if (configs) this.config = configs[i];
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
