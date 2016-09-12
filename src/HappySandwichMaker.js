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
    const {type, touches} = event;
    let pageX, pageY, force, tilt;
    if (touches && touches.length >= 1 && typeof touches[0].force !== 'undefined') {
      ({pageX, pageY, force, tilt} = touches[0]);
    } else if (type.match(/^mouse/)) {
      ({pageX, pageY} = event);
    }
    const x = pageX - this.canvas.pageOffset.left;
    const y = pageY - this.canvas.pageOffset.top;

    switch (type) {
      case 'mousedown':
        this.startDrawing({id: 'mouse', x, y});
        break;
      case 'touchstart':
        this.startDrawing({id: touch.identifier, x, y, force, tilt});
        break;
      case 'mousemove':
        this.appendDrawing({id: 'mouse', x, y});
        break;
      case 'touchmove':
        this.appendDrawing({id: touch.identifier, x, y, force, tilt});
        break;
      case 'mouseup':
        this.endDrawing({id: 'mouse', x, y});
        break;
      case 'touchend':
        this.endDrawing({id: touch.identifier, x, y, force, tilt});
        console.log('touchend', x, y);
        break;
    }
    this._throttledDraw();
  }

  startDrawing({id, x, y, force, tilt}) {
    this._paths[id] = [{x, y, force, tilt}];
  }

  appendDrawing({id, x, y, force, tilt}) {
    if (!this._paths[id]) return;
    this._paths[id].push({x, y, force, tilt});
  }

  endDrawing({id, x, y, force, tilt}) {
    this.appendDrawing({id, x, y, force, tilt});
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

  draw(path, stylus) {
    if (!path) return;
    let context = this.activeContext;
    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = "red";
    context.moveTo(path[0].x, path[0].y);
    for (var i = 1; i < path.length; i++) {
      context.lineTo(path[i].x, path[i].y);
      // context.quadraticCurveTo(20,100,10,20);
    }
    context.stroke();
  }

  _throttledDraw() {
    for (let key in this._paths) {
      const path = this._paths[key];
      this.draw(path)
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
