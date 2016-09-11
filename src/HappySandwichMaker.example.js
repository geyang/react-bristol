/**
 * Created by ge on 6/23/16.
 */
import React, {Component, PropTypes} from "react";
import HappySandwichMaker from "./HappySandwichMaker";

const style = {
  border: ' 1px solid pink'
};
var {number, string} = PropTypes;
export default class HappySandwichMakerExample extends Component {
  render() {
    return (
      <HappySandwichMaker width={1000}
                          height={800}
                          style={style}
      />
    );
  }
}
