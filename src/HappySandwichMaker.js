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
    const {type} = e;
    this.log({type});
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
      <Flex row>
        <FlexItem fluid component='canvas'
                  width={width}
                  height={height}
                  onMouseDown={this.genericHandler}
                  onMouseUp={this.genericHandler}
                  onTouchStart={this.genericHandler}
                  onTouchMove={this.genericHandler}
                  onTouchEnd={this.genericHandler}
                  onTouchCancel={this.genericHandler} {..._props}
        />
        <FlexItem fixed width="200px">
          <button onClick={this.clearLogs}>clear logs</button>
          <table>
            <thead>
            <tr>
              <td>Event Type</td>
            </tr>
            </thead>
            <tbody style={{
              display: 'block',
              height: "400px",
              overflowY: 'auto'
            }}>
            {logs.map(
              (log, $ind) =>
                <tr key={$ind}>
                  <td>{log.type}</td>
                </tr>
            )}
            </tbody>
          </table>
        </FlexItem>
      </Flex>
    );
  }
}
