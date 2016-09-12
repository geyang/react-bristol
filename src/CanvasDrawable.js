import React, {Component, PropTypes} from 'react';
import autobind from 'autobind-decorator';
import Canvas from './Canvas';
import simplePen from './extensions/simplePen';

var {number, func, bool, string, oneOf} = PropTypes;
/**
 * description of the component
 */
export default class HappySandwichMaker extends Component {

  static propTypes = {
    width: number,
    height: number,
    renderRatio: number
  };

  static defaultProps = {
    renderRatio: 3
  };

  componentWillMount() {
    this._activePaths = {};
    this._paintStack = [];
  }

  componentDidMount() {
    this.canvas = this.refs['active'];
    this.activeContext = this.canvas.context;
  }

  @autobind
  genericHandler(event) {
    event.preventDefault();
    const {type, changedTouches} = event;
    // strokeChange
    if (changedTouches && changedTouches.length >= 1 && typeof changedTouches[0].force !== 'undefined') {
      Array.from(changedTouches)
        .forEach(
          ({identifier, pageX, pageY, force, tilt}) =>
            this.recordTouch({eventType: type, id: identifier, pageX, pageY, force, tilt})
        );
    } else if (type.match(/^mouse/)) {
      let {pageX, pageY} = event;
      this.recordTouch({eventType: type, id: 'mouse', pageX, pageY});
    }
  }

  getDressedCursorPosition(pageX, pageY, refreshOffset = false) {
    if (refreshOffset) this.canvas.clearPageOffset();
    const {renderRatio} =  this.props;
    return {
      x: (pageX - this.canvas.pageOffset.left - (this.canvas.pageOffset.width - this.props.width) / 2) * renderRatio,
      y: (pageY - this.canvas.pageOffset.top - (this.canvas.pageOffset.height - this.props.height) / 2) * renderRatio
    };
  }

  recordTouch({eventType, id, pageX, pageY, force, tilt}) {
    let x, y;
    switch (eventType) {
      case 'mousedown':
      case 'touchstart':
        ({x, y} = this.getDressedCursorPosition(pageX, pageY, true));
        this.startPath({id, x, y, force, tilt});
        break;
      case 'mousemove':
      case 'touchmove':
        ({x, y} = this.getDressedCursorPosition(pageX, pageY));
        this.appendPathPoint({id, x, y, force, tilt});
        break;
      case 'mouseup':
      case 'touchend':
        ({x, y} = this.getDressedCursorPosition(pageX, pageY));
        this.appendPathPoint({id, x, y, force, tilt});
        setTimeout(() => this.completePath({id}), 16);
        break;
    }
    this.draw();
  }

  startPath({id, x, y, force, tilt}) {
    this._activePaths[id] = [{x, y, force, tilt}];
  }

  appendPathPoint({id, x, y, force, tilt}) {
    if (!this._activePaths[id]) return;
    this._activePaths[id].push({x, y, force, tilt});
  }

  completePath({id}) {
    // this need to go into a function
    this._paintStack.push(this._activePaths[id]);
    delete this._activePaths[id];
  }

  draw() {
    //1. draw existing
    //2. draw active
    this.drawActivePaths();
    //3. rescale
    // todo: use inactiveContext
    const {renderRatio} = this.props;
    // console.log(renderRatio);
    this.activeContext.scale(1, 1);
  }

  drawActivePaths() {
    for (let key in this._activePaths) {
      const path = this._activePaths[key];
      const context = this.activeContext;
      simplePen(context, path)
    }
  }

  render() {
    const {width, height, renderRatio, scale, offset, style, ..._props} = this.props;
    return (
      <div style={{width, height, ...style}}>
        <Canvas ref="active"
                style={{
                  transform: `scale(${1 / renderRatio}, ${1 / renderRatio})` +
                  `translate(${-width * renderRatio}px, ${-height * renderRatio}px)`
                }}
                width={width * renderRatio}
                height={height * renderRatio}
                onMouseDown={this.genericHandler}
                onMouseMove={this.genericHandler}
                onMouseUp={this.genericHandler}
                onTouchStart={this.genericHandler}
                onTouchMove={this.genericHandler}
                onTouchEnd={this.genericHandler}
                onTouchCancel={this.genericHandler}
                {..._props}/>

      </div>
    );
  }
}
