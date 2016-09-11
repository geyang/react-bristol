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
    this.setState({logs: this._logs});
  }

  @autobind
  genericHandler(event) {
    const {type, touches} = event;
    let force, x, y;
    if (touches && touches.length >= 1 && typeof touches[0].force !== 'undefined') {
      force = touches[0].force;
      ({clientX: x, clientY: y} = touches[0]);
    } else if (type.match(/^mouse/)) {
      ({layerX: x, layerY: y} = event);
      console.log(event);
    }
    this.log({type, touches, force, position: {x, y}});
  }

  @autobind
  clearLogs() {
    this._logs = [];
    this.setState({logs: this._logs});
  }

  @autobind
  log(data) {
    const {pageX, pageY} = (data.touch || {});
    console.log({pageX, pageY});
    this._logs.push(data);
    this.setState({logs: this._logs});
  }

  render() {
    const {width, height, scale, offset, ..._props} = this.props;
    const {logs} = this.state;
    return (
      <Flex row
            style={{width, height}}>
        <FlexItem fluid component={Canvas} style={{border: '2px solid pink'}}
                  onMouseDown={this.genericHandler}
                  onMouseMove={this.genericHandler}
                  onMouseUp={this.genericHandler}
                  onTouchStart={this.genericHandler}
                  onTouchMove={this.genericHandler}
                  onTouchEnd={this.genericHandler}
                  onTouchCancel={this.genericHandler}
                  {..._props}/>
        <FlexItem fixed width="400px">
          <button onClick={this.clearLogs}>clear logs</button>
          <table>
            <thead>
            <tr>
              <th>Event Type</th>
              <th>X</th>
              <th>Y</th>
              <th>force</th>
            </tr>
            </thead>
            <tbody style={{}}>
            {logs.map(
              (log, $ind) =>
                <tr key={$ind}>
                  <td>{log.type}</td>
                  <td>{log.position ? log.position.x : ''}</td>
                  <td>{log.position ? log.position.y : ''}</td>
                  <td>{log.touches ? log.force : 'x'}</td>
                </tr>
            )}
            </tbody>
          </table>
        </FlexItem>
      </Flex>
    );
  }
}

// onGuestureStart={this.genericHandler}
// onGuestureChange={this.genericHandler}
// onGuestureEnd={this.genericHandler}
