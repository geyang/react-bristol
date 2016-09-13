"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class; /** Created by ge on 6/23/16. */


var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _autobindDecorator = require("autobind-decorator");

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

var _Bristol = require("./Bristol");

var _Bristol2 = _interopRequireDefault(_Bristol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var style = {
  border: '10px solid pink'
};
var HappySandwichMakerExample = (_class = function (_Component) {
  _inherits(HappySandwichMakerExample, _Component);

  function HappySandwichMakerExample() {
    _classCallCheck(this, HappySandwichMakerExample);

    return _possibleConstructorReturn(this, (HappySandwichMakerExample.__proto__ || Object.getPrototypeOf(HappySandwichMakerExample)).apply(this, arguments));
  }

  _createClass(HappySandwichMakerExample, [{
    key: "saveImage",
    value: function saveImage(image) {
      // do something with image
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(_Bristol2.default, { width: 1000,
        height: 400,
        style: style,
        onImageUpdate: this.saveImage
      });
    }
  }]);

  return HappySandwichMakerExample;
}(_react.Component), (_applyDecoratedDescriptor(_class.prototype, "saveImage", [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, "saveImage"), _class.prototype)), _class);
exports.default = HappySandwichMakerExample;
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(style, "style", "src/Bristol.example.js");

  __REACT_HOT_LOADER__.register(HappySandwichMakerExample, "HappySandwichMakerExample", "src/Bristol.example.js");
})();

;
