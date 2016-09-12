/** Created by ge on 6/23/16. */
import React, {Component} from "react";
import autobind from 'autobind-decorator';
import Bristol from "./Bristol";

const style = {
  border: '10px solid pink'
};
export default class HappySandwichMakerExample extends Component {
  @autobind
  saveImage(image) {
    // do something with image
  }

  render() {
    return (
      <Bristol width={1000}
               height={400}
               style={style}
               onImageUpdate={this.saveImage}
      />
    );
  }
}
