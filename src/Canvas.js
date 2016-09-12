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
    const canvasRect = this.nativeElement.getBoundingClientRect();
    const pageRect = window.document.body.getBoundingClientRect();
    this._pageOffset = {
      left: canvasRect.left - pageRect.left,
      right: canvasRect.right - pageRect.right,
      top: canvasRect.top - pageRect.top,
      bottom: canvasRect.bottom - pageRect.bottom,
      width: canvasRect.width,
      height: canvasRect.height
    };
    return this._pageOffset;
  }

  clearPageOffset() {
    this._pageOffset = undefined;
    return this.pageOffset
  }

  render() {
    const {..._props} = this.props;
    return <canvas {..._props}/>
  }
}
