/** Created by ge on 9/11/16. */
import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

const {bool} = PropTypes;
export default class Canvas extends Component {
  static propTypes = {
    interpolation: bool
  };
  static defaultProps = {
    interpolation: true
  };

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

  clear() {
    const {width, height} = this.props;
    this.context.clearRect(0, 0, width, height);
  }

  getImageData() {
    const {width, height} = this.props;
    return this.context.getImageData(0, 0, width, height);
  }

  toDataURL(type, options){
    return this.nativeElement.toDataURL(type, options);
  }

  render() {
    const {interpolation, style, ..._props} = this.props;
    const _style = interpolation ? style : {
      imageRendering: 'optimizeSpeed',
      // imageRendering: '-moz-crisp-edges',
      // imageRendering: '-webkit-optimize-contrast',
      // imageRendering: '-o-crisp-edges',
      // imageRendering: 'pixelated',
      msInterpolationMode: 'nearest-neighbor',
      ...style
    };
    return <canvas style={_style} {..._props}/>
  }
}
