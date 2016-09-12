/** Created by ge on 9/11/16. */
import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';

export default class Canvas extends Component {
  static propTypes = {};
  static defaultProps = {};

  componentDidMount() {
    this.nativeElement = findDOMNode(this);
    this.context = this.nativeElement.getContext('2d');
  }

  get pageOffset() {
    if (this._pageOffset) return this._pageOffset;
    this._pageOffset = this.nativeElement.getBoundingClientRect();
    return this._pageOffset;
  }

  set pageOffset(value) {
    this._pageOffset = undefined;
    return this.pageOffset
  }

  render() {
    const {..._props} = this.props;
    return <canvas {..._props}/>
  }
}
