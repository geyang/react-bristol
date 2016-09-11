import React, {Component, PropTypes} from 'react';
import autobind from 'autobind-decorator';
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
  genericHandler(e) {
    const {type, touches} = e;
    let pressure;
    if (touches && touches.length >= 1 && typeof touches[0].pressure !== 'undefined') {
      pressure = touches[0].pressure;
    }
    this.log({type, touches, pressure});
  }

  @autobind
  clearLogs() {
    this._logs = [];
    this.setState({logs: this._logs});
  }

  @autobind
  log(data) {
    this._logs.push(data);
    this.setState({logs: this._logs});
  }

  render() {
    const {width, height, scale, offset, ..._props} = this.props;
    const {logs} = this.state;
    return (
      <Flex row
            style={{width, height}}>
        <FlexItem fluid component={'canvas'} style={{border: '2px solid pink'}}
                  onMouseDown={this.genericHandler}
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
              <th>First finger</th>
              <th>pressure</th>
            </tr>
            </thead>
            <tbody style={{}}>
            {logs.map(
              (log, $ind) =>
                <tr key={$ind}>
                  <td>{log.type}</td>
                  <td>{log.touches}</td>
                  <td>{log.touches ? log.pressure : 'x'}</td>
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
