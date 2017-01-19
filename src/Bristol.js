import React, {Component, PropTypes} from 'react';
import {autobind} from "core-decorators";
import Canvas from './Canvas';

const ALLOWED_MODES = ['png', 'ink'];

const {number, func, bool, string, object, array, oneOf, oneOfType, any} = PropTypes;
/**
 * description of the component
 */
export default class Bristol extends Component {

  static propTypes = {
    style: object,
    width: number,
    height: number,
    renderRatio: number,
    mode: oneOf(ALLOWED_MODES),
    onChange: func,
    pen: object.isRequired,
    palette: any.isRequired,
    /** todo: use correct type for image */
    data: oneOfType([array, string]),
    image: any,
    backgroundImage: any,
    backgroundColor: string,
    interpolation: bool
  };

  static defaultProps = {
    renderRatio: 3,
    interpolation: true,
    backgroundColor: "#f6f2e5"
  };

  componentWillMount() {
    this._activePaths = {};
    if (typeof this.props.data == "string") {
      try {
        this._paintStack = JSON.parse(this.props.data)
      } catch (e) {
        console.warn(e);
        //todo: this is questionable decision
        this._paintStack = [];
      }
    } else {
      this._paintStack = this.props.data || [];
    }
    this._instantiatePalette(this.props.palette)
  }


  get data() {
    return this._paintStack;
  }

  componentDidMount() {
    try {
      this._drawPaintStack(false);
    } catch (e) {
      console.error(e);
      // this.props.dispatch({
      //   type: "NOTICE_ERROR",
      //   errorType: "mounting_error",
      //   error: e
      // })
    }
  }

  componentWillReceiveProps({width, height, pen, palette, data, backgroundColor}) {
    if (this.props.palette !== palette) {
      this._instantiatePalette(palette)
    }
    if (width !== this.props.width ||
      height !== this.props.height ||
      (data !== this.props.data && data !== this._paintStack)) {
      setTimeout(() => {
        this._paintStack = data;
        this._drawPaintStack(false)
      }, 0);
    }
  }

  shouldComponentUpdate({pen, palette, width, height, data}, newState) {
    // a conservative
    return (data !== this.props.data && data !== this._paintStack) ||
      this.props.height !== height ||
      this.props.width !== width;
  }

  _instantiatePalette(palette) {
    this._palette = {};
    Object.keys(palette).forEach(key => {
      this._palette[key] = new palette[key]
    })
  }

  /** gets the image data as a DataURI (zoom is not yet supported) */
  toDataURI(type, options) {
    return this.inactive.toDataURI(type, options);
  }

  /** gets the 2D RGBA image array data. */
  getImage() {
    return this.inactive.getImageData()
  }

  @autobind
  genericHandler(event) {
    event.preventDefault();
    const {type, changedTouches} = event;
    const penConfig = this.props.pen;
    // strokeChange
    if (changedTouches && changedTouches.length >= 1 && typeof changedTouches[0].force !== 'undefined') {
      Array.from(changedTouches)
        .forEach(
          ({identifier, pageX, pageY, force, tilt}) =>
            this._recordTouch({
              eventType: type,
              id: identifier,
              config: penConfig,
              pageX,
              pageY,
              force,
              tilt
            })
        );
    } else if (type.match(/^mouse/)) {
      let {pageX, pageY} = event;
      this._recordTouch({
        eventType: type,
        id: 'mouse',
        config: penConfig,
        pageX,
        pageY
      });
    }
  }

  _recordTouch({eventType, id, config, pageX, pageY, force, tilt}) {
    let x, y;
    switch (eventType) {
      case 'mousedown':
      case 'touchstart':
        ({x, y} = this._getDressedCursorPosition(pageX, pageY, true));
        this._startPath({id, config, x, y, force, tilt});
        this._drawActivePaths();
        break;
      case 'mousemove':
      case 'touchmove':
        if (!this._getActivePath(id)) return;
        ({x, y} = this._getDressedCursorPosition(pageX, pageY));
        this._appendPathPoint({id, config, x, y, force, tilt});
        this._drawActivePaths();
        break;
      case 'touchcancel':
        this._removeActivePath({id});
        break;
      case 'mouseup':
      case 'touchend':
        ({x, y} = this._getDressedCursorPosition(pageX, pageY));
        const newPath = this._completePath({id});
        if (newPath) this._patchPaintStack(newPath);
        this._clearActive();
        setTimeout(() => {
          if (this.props.onChange) this.props.onChange(this._paintStack, newPath);
        }, 0);
        break;
    }
  }

  _getDressedCursorPosition(pageX, pageY, refreshOffset = false) {
    if (refreshOffset) this.active.clearPageOffset();
    const {renderRatio} =  this.props;
    const pos = {
      x: (pageX - this.active.pageOffset.left
        - (this.active.pageOffset.width - this.props.width) / 2
      ) * renderRatio,
      y: (pageY - this.active.pageOffset.top
        - (this.active.pageOffset.height - this.props.height) / 2
      ) * renderRatio
    };
    return pos;
  }

  static _isPressureSensitive(force) {
    return !!force; // 0 => false, undefined => false, 0.20 => true
  }

  _startPath({id, config, x, y, force, tilt}) {
    let newPath = {
      config,
      x,
      y,
      data: {
        xs: [],
        ys: [],
        configs: []
      }
    };
    this._activePaths[id] = newPath;
    console.log('1. adding path');
    if (Bristol._isPressureSensitive(force)) {
      newPath.force = force;
      newPath.tilt = tilt;
      newPath.data.forces = [];
      newPath.data.tilts = [];
      // this._appendPathPoint({id, config, x, y, force, tilt});
    } else {
      // this._appendPathPoint({id, config, x, y});
    }
  }

  _getActivePath(id) {
    return this._activePaths[id];
  }

  _appendPathPoint({id, config, x, y, force, tilt}) {
    console.log('2. append to path', force);
    const path = this._getActivePath(id);
    if (!path) return;
    path.data.xs = path.data.xs.concat(x - path.x);
    path.x = x;
    path.data.ys = path.data.ys.concat(y - path.y);
    path.y = y;
    path.data.configs = path.data.configs.concat(config);
    if (config !== path.config) path._configDirty = true;
    if (typeof force !== "undefined" && typeof path.force !== "undefined") {
      path.data.forces = path.data.forces.concat(force - path.force);
      path.force = force
    }
    if (typeof tilt !== "undefined" && typeof path.tilt !== "undefined") {
      path.data.tilts = path.data.tilts.concat(tilt - path.tilt);
      path.tilt = tilt
    }
  }

  static _compressPath({x, y, force, tilt, config, _configDirty, data}) {
    // remove data config field is all config are the same
    let compressed = {x, y, config, data: {xs: data.xs, ys: data.ys}};
    if (_configDirty) compressed.data.configs = data.configs;
    if (typeof force !== "undefined") compressed.force = force, compressed.data.forces = data.forces;
    if (typeof tilt !== "undefined") compressed.tilt = tilt, compressed.data.tilts = data.tilts;
    return compressed;
  }

  _completePath({id}) {
    console.log('3. complete path', this._activePaths[id]);
    let compressedPath = Bristol._compressPath(this._activePaths[id]);
    if (!compressedPath) console.warn(`compressed path has ${compressedPath} value`);
    else this._paintStack = (this._paintStack || []).concat(compressedPath);
    this._removeActivePath({id});
    return compressedPath;
  }

  _removeActivePath({id}) {
    let newActivePaths = {...this._activePaths};
    delete newActivePaths[id];
    console.log(newActivePaths);
    this._activePaths = newActivePaths;
  }

  _clearActive() {
    this.active.clear();
  }

  draw(context, path, options = {}) {
    if (!path) return console.warn('path is not defined. Might be a problem with Bristol component.');
    context.renderRatio = this.props.renderRatio;
    this._palette[path.config.type].draw(context, path, {...options});
  }

  _patchPaintStack(newPath) {
    this.draw(this.inactive.context, newPath);
  }

  _drawPaintStack(adaptive = true) {
    if (!this._paintStack || !this._paintStack.forEach)
      return console.warn("_paintStack is ill-formed: ", this._paintStack);
    if (adaptive && this._oldPaintStack) {
      this._paintStack.forEach((path, ind) => {
        if (this._oldPaintStack[ind] !== path) {
          this.draw(this.inactive.context, path);
        }
      });
    } else {
      //note: always clear, to prevent bugs with semi-transparent colors.
      this.inactive.clear();
      this._paintStack.forEach((path) => {
        this.draw(this.inactive.context, path);
      });
    }
    this._oldPaintStack = this._paintStack;
  }

  _drawActivePaths() {
    for (let key in this._activePaths) {
      const activePath = this._activePaths[key];
      this.draw(this.active.context, activePath, {active: true})
    }
  }

  // todo: move this to somewhere else. Make more flexible and modular.
  @autobind
  _drawBackground(context) {
    // this.background is still undefined at this point.
    let margin = 10;
    let spacing = 30 * this.props.renderRatio;
    let width = this.props.width * this.props.renderRatio;
    let height = this.props.height * this.props.renderRatio;
    context.strokeStyle = "#e0dcd1";
    context.strokeWidth = 4.5 * this.props.renderRatio;
    for (let i = 1; i < 100; i++) {
      context.beginPath();
      context.moveTo(margin, i * spacing);
      context.lineTo(width - margin, i * spacing);
      context.stroke();
      context.closePath();

      context.beginPath();
      context.moveTo(i * spacing, margin);
      context.lineTo(i * spacing, height - margin);
      context.stroke();
      context.closePath();
    }
  }

  render() {
    const {
      width, height, renderRatio, onChange, pen, palette, data, image,
      backgroundImage, backgroundColor,
      interpolation, scale, offset, style, ..._props
    } = this.props;
    const canvasStyle = {
      position: 'absolute',
      top: 0, left: 0,
      transform: `scale(${1 / renderRatio}, ${1 / renderRatio})` +
      `translate(${-width * (renderRatio - 1) * renderRatio / 2}px, ${-height * (renderRatio - 1) * renderRatio / 2}px)`,
      ...style
    };
    return (
      <div style={{width, height, position: 'relative', ...style}}>
        <Canvas ref={(e) => this.active = e}
                style={canvasStyle}
                width={width * renderRatio}
          // always interpolate for otherwise won't show on mobile safari.
                height={height * renderRatio}
                onMouseDown={this.genericHandler}
                onMouseMove={this.genericHandler}
                onMouseUp={this.genericHandler}
                onTouchStart={this.genericHandler}
                onTouchMove={this.genericHandler}
                onTouchEnd={this.genericHandler}
                onTouchCancel={this.genericHandler}
                interpolation={false}
                {..._props}/>
        <Canvas ref={(e) => this.inactive = e}
                style={{...canvasStyle, zIndex: -1}}
                width={width * renderRatio}
                height={height * renderRatio}
                interpolation={interpolation}
                {..._props}/>
        {backgroundImage || backgroundColor ?
          <Canvas ref={(e) => this.background = e}
                  backgroundColor={backgroundColor}
                  afterRender={this._drawBackground}
                  style={{...canvasStyle, zIndex: -2}}
                  width={width * renderRatio}
                  height={height * renderRatio}
                  interpolation={interpolation}/> : null}
      </div>
    );
  }
}
