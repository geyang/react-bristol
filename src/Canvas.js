/** Created by ge on 9/11/16. */
import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

const {number, bool, string, func} = PropTypes;
export default class Canvas extends Component {
  static propTypes = {
    width: number,
    height: number,
    interpolation: bool,
    backgroundColor: string,
    afterRender: func,
  };

  static defaultProps = {
    interpolation: true
  };

  componentWillReceiveProps({backgroundColor, width, height}) {
    let changed;
    if (width !== this.props.width || height !== this.props.height) {
      this.getContext();
      changed = true;
    }
    if (backgroundColor !== this.props.backgroundColor) {
      this.setBackgroundColor(backgroundColor);
      changed = true;
    }
    if (changed) this._cachedImage = this.getImageData();
  }

  getContext() {
    this.nativeElement = findDOMNode(this);
    this.context = this.nativeElement.getContext('2d');
  }

  shouldComponentUpdate({width, height, backgroundColor}) {
    return (width !== this.props.width || height !== this.props.height);
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
    if (isNaN(width) || isNaN(height)) return undefined;
    return this.context.getImageData(0, 0, width, height);
  }

  putImage(image, x = 0, y = 0) {
    this.context.putImageData(image, x, y);
  }

  setBackgroundColor(color) {
    if (!color) return;
    this.context.fillStyle = color;
    this.context.fillRect(0, 0, 10000, 10000);
  }

  toDataURL(type, options) {
    return this.nativeElement.toDataURL(type, options);
  }

  onRerenderCanvas(element) {
    this.getContext();
    if (this.props.backgroundColor) this.setBackgroundColor(this.props.backgroundColor);
    if (this.props.afterRender) this.props.afterRender(this.context);
    if (this._cachedImage) this.putImage(this._cachedImage);
  }

  render() {
    const {interpolation, style, backgroundColor, afterRender, ..._props} = this.props;
    const _style = interpolation ? style : {
        imageRendering: 'optimizeSpeed',
        // imageRendering: '-moz-crisp-edges',
        // imageRendering: '-webkit-optimize-contrast',
        // imageRendering: '-o-crisp-edges',
        // imageRendering: 'pixelated',
        msInterpolationMode: 'nearest-neighbor',
        ...style
      };
    return <canvas style={_style} ref={this.onRerenderCanvas.bind(this)} {..._props}/>
  }
}
