import React, {Component, PropTypes} from 'react';
import autobind from 'autobind-decorator';
import Canvas from './Canvas';
import {Flex, FlexItem} from 'layout-components';

var {func, bool, string, oneOf} = PropTypes;
/**
 * description of the component
 */
export default class HappySandwichMaker extends Component {

  static propTypes = {};

  static defaultProps = {};

  componentWillMount() {
    this._logs = [];
    this._paths = {};
    this.setState({logs: this._logs});
  }

  componentDidMount() {
    this.canvas = this.refs['active'];
    this.activeContext = this.canvas.context;
  }

  @autobind
  genericHandler(event) {
    event.preventDefault();
    const {type, changedTouches} = event;
    if (type === 'mousedown' || type === 'touchstart') this.canvas.pageOffset = {};
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
    this._throttledDraw();
  }

  recordTouch({eventType, id, pageX, pageY, force, tilt}) {
    const x = pageX - this.canvas.pageOffset.left;
    const y = pageY - this.canvas.pageOffset.top;

    switch (eventType) {
      case 'mousedown':
      case 'touchstart':
        this.startPath({id, x, y, force, tilt});
        break;
      case 'mousemove':
      case 'touchmove':
        this.appendPathPoint({id, x, y, force, tilt});
        break;
      case 'mouseup':
      case 'touchend':
        this.completePath({id, x, y, force, tilt});
        break;
    }
  }

  startPath({id, x, y, force, tilt}) {
    this._paths[id] = [{x, y, force, tilt}];
  }

  appendPathPoint({id, x, y, force, tilt}) {
    if (!this._paths[id]) return;
    this._paths[id].push({x, y, force, tilt});
  }

  completePath({id, x, y, force, tilt}) {
    this.appendPathPoint({id, x, y, force, tilt});
    setTimeout(() => delete this._paths[id], 16);
  }

  @autobind
  clearLogs() {
    this._logs = [];
    this.setState({logs: this._logs});
  }

  @autobind
  log(data) {
    const {x, y} = (data.position || {});
    this._logs.push(data);
    this.setState({logs: this._logs});
  }

  draw(context, path, stylus) {
    if (!path) return;
    context.beginPath();
    context.moveTo(path[0].x, path[0].y);
    for (var i = 1; i < path.length; i++) {
      let force = path.slice(-1)[0].force;
      if (typeof force === 'undefined') force = 1;
      context.lineTo(path[i].x, path[i].y);
      context.lineWidth = force * 1;
      context.strokeStyle = `rgba(40, 200, 255, ${force})`;
      // context.quadraticCurveTo(20,100,10,20);
    }
    context.stroke();
  }

  _throttledDraw() {
    for (let key in this._paths) {
      const path = this._paths[key];
      const context = this.activeContext;
      const {width, height} = this.props;
      context.clearRect(0, 0, width, height);
      this.draw(context, path)
    }
  }

  render() {
    const {width, height, scale, offset, ..._props} = this.props;
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
