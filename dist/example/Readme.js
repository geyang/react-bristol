"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Readme;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactMarkdownit = require("react-markdownit");

var _reactMarkdownit2 = _interopRequireDefault(_reactMarkdownit);

var _reactHighlight = require("@episodeyang/react-highlight.js");

var _reactHighlight2 = _interopRequireDefault(_reactHighlight);

var _reactComponentPropsTable = require("react-component-props-table");

var _reactComponentPropsTable2 = _interopRequireDefault(_reactComponentPropsTable);

var _HappySandwichMaker = require("../HappySandwichMaker.example");

var _HappySandwichMaker2 = _interopRequireDefault(_HappySandwichMaker);

var _HappySandwichMaker3 = require("!!raw!../HappySandwichMaker.example");

var _HappySandwichMaker4 = _interopRequireDefault(_HappySandwichMaker3);

var _Bristol = require("!!react-docgen!../Bristol");

var _Bristol2 = _interopRequireDefault(_Bristol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); } /**
                                                                                                                   * Created by ge on 6/24/16.
                                                                                                                   */


function Readme(_ref) {
  _objectDestructuringEmpty(_ref);

  return _react2.default.createElement(
    _reactMarkdownit2.default,
    { stripIndent: true },
    "\n      # React Bristol (Board)\n\n      [![github](https://img.shields.io/github/downloads/episodeyang/react-bristol/total.svg?style=flat-square&maxAge=2592000)]()\n\n      A HTML5 canvas component supporting Apple Pencil and force touch.\n\n      This is a quick proof-of-concept component I built to test out the performance of mobile safari's\n      input events, to see if I can build a Apple Pencil note taking app that lives inside the browser.\n      At the moment, the touch events mobile safari emits have integer coordinates, making the inputs\n      a bit jagged The input event frequency is also on the lower side.\n\n      There is currently a ticket in webkit that changes the input coordinates to `double`. Not sure\n      when it will land though.\n\n      We might be able to use a simple neural net to de-jag the hand writing.\n\n      - [ ] todo: need to publish as npm module.\n\n      ## Usage and Live Demo: `Bristol`\n      showing basic pointer events and force detection (with force touch and apple pencil)\n      ",
    _react2.default.createElement(_HappySandwichMaker2.default, null),
    "### Props",
    "This table below is generated automatically",
    _react2.default.createElement(
      "div",
      { className: "table-container horizontal-scroll flex-column center" },
      _react2.default.createElement(_reactComponentPropsTable2.default, { propMetaData: _Bristol2.default.props })
    ),
    "\n      ### Usage Example\n\n      The source code below of the example above is loaded using the webpack raw loader.",
    _react2.default.createElement(
      _reactHighlight2.default,
      null,
      _HappySandwichMaker4.default
    ),
    "\n      ## Develop\n\n      After cloning from gitHub, you can run the example by doing\n      ~~~shell\n      npm run serve-docs\n      ~~~\n\n      And then open your browser at [http://localhost:5000](http://localhost:5000).\n      "
  );
}
;

(function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Readme, "Readme", "src/example/Readme.js");
})();

;