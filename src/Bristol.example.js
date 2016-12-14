/** Created by ge on 6/23/16. */
import React, {Component} from "react";
import autobind from 'autobind-decorator';
import Bristol from "./Bristol";

const style = {
  border: '10px solid pink'
};
export default class HappySandwichMakerExample extends Component {
  @autobind
  onChange(vectorData, operation) {
    console.log(vectorData, operation);
  }
  /** API plans:
   * 1. enable background image
   * 2. add a set of tools
   * 3. add eraser to the mix
   * <Canvas /> need to be able to pass in an image.
   * data, activeStylus, windowsize etc., etc..
   */

  render() {
    return (
      <Bristol width={1000}
               height={400}
               style={style}
               renderRatio={2}
               interpolation={false}
               backgroundImage={null}
               onChange={this.onChange}
      />
    );
  }
}
