/** Created by ge on 6/23/16. */
import React, {Component, PropTypes} from "react";
import CanvasDrawable from "./CanvasDrawable";

const style = {
  border: '10px solid pink'
};
var {number, string} = PropTypes;
export default class HappySandwichMakerExample extends Component {
  render() {
    return (
      <CanvasDrawable width={1000}
                      height={400}
                      style={style}
      />
    );
  }
}
