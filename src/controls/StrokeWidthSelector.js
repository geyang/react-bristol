/** Created by ge on 1/18/17. */
import React, {Component, PropTypes} from "react";
import Range from "../../../../form/Range";
import {autobind} from "core-decorators";

const {array, func, string, any} = PropTypes;
export default class StrokeWidthSelector extends Component {
  static propTypes = {
    value: any,
    strokeWidthList: array.isRequired,
    onChange: func.isRequired,
  };

  @autobind
  rangeToValue(range) {
    console.log(range);
    return this.props.strokeWidthList[range];
  }

  @autobind
  valueToRange(value) {
    console.log(value);
    // if range is not found, gooes to -1 then 0.
    return this.props.strokeWidthList.indexOf(value);
  }

  render() {
    return <Range className="stroke-width" name="stroke-width"
                  value={this.props.value}
                  min={this.props.strokeWidthList[0]}
                  max={this.props.strokeWidthList[this.props.strokeWidthList.length - 1]}
                  valueToRange={this.valueToRange} rangeToValue={this.rangeToValue}
                  onChange={this.props.onChange}/>;
  }

}
