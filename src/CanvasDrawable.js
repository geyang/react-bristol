import React, {Component, PropTypes} from 'react';
import autobind from 'autobind-decorator';
import Canvas from './Canvas';
// import SimplePen from './extensions/simplePen';
// const simplePen = SimplePen({color: 'blue', strokeWidth: 1});
import CalligraphyPen from './extensions/calligraphyPen';
const pen = CalligraphyPen({color: 'blue', strokeWidth: 10,  angle: -45, epsilon: 0.1, blur: 0});


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
    this._activePaths[id] = {
      pressureSensitive: !!force, // 0 => false, undefined => false, 0.20 => true
      data: []
    };
    this.appendPathPoint({id, x, y, force, tilt});
  }

  appendPathPoint({id, x, y, force, tilt}) {
    const path = this._activePaths[id];
    if (!path) return;
    else if (!path.pressureSensitive) force = 1;
    path.data.push({x, y, force, tilt});
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
  }

  drawActivePaths() {
    for (let key in this._activePaths) {
      const pathData = this._activePaths[key].data;
      const context = this.activeContext;
      pen(context, pathData)
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
