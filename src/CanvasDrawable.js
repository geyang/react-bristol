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
    scaleRatio: number
  };

  static defaultProps = {
    scaleRatio: 3
  };

  componentWillMount() {
    this._activePaths = {};
    this._allPaths = [];
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
    return {
      x: pageX - this.canvas.pageOffset.left - (this.canvas.pageOffset.width - this.props.width) / 2,
      y: pageY - this.canvas.pageOffset.top - (this.canvas.pageOffset.height - this.props.height) / 2
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
    this.drawActivePaths();
  }

  startPath({id, x, y, force, tilt}) {
    this._activePaths[id] = [{x, y, force, tilt}];
  }

  appendPathPoint({id, x, y, force, tilt}) {
    if (!this._activePaths[id]) return;
    this._activePaths[id].push({x, y, force, tilt});
  }

  completePath({id}) {
    this._allPaths.push(this._activePaths[id]);
    delete this._activePaths[id];
  }

  drawActivePaths() {
    for (let key in this._activePaths) {
      const path = this._activePaths[key];
      const context = this.activeContext;
      const {width, height} = this.props;
      simplePen(context, path)
    }
  }

  render() {
    const {width, height, scaleRatio, scale, offset, ..._props} = this.props;
    return (
      <Canvas ref="active"
              style={{border: '2px solid pink'}}
              width={width}
              height={height}
              onMouseDown={this.genericHandler}
              onMouseMove={this.genericHandler}
              onMouseUp={this.genericHandler}
              onTouchStart={this.genericHandler}
              onTouchMove={this.genericHandler}
              onTouchEnd={this.genericHandler}
              onTouchCancel={this.genericHandler}
              {..._props}/>
    );
  }
}
