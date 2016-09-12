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

var _HappySandwichMaker5 = require("!!react-docgen!../HappySandwichMaker");

var _HappySandwichMaker6 = _interopRequireDefault(_HappySandwichMaker5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); } /**
                                                                                                                   * Created by ge on 6/24/16.
                                                                                                                   */


function Readme(_ref) {
  _objectDestructuringEmpty(_ref);

  return _react2.default.createElement(
    _reactMarkdownit2.default,
    { stripIndent: true },
    "\n      # React Canvas Paint Demo\n\n      [![github](https://img.shields.io/github/downloads/episodeyang/react-bristol/total.svg?style=flat-square&maxAge=2592000)]()\n\n      A HTML5 canvas component that allows you to draw inside the browser.\n\n      ## Usage\n\n      [ ] todo: need to publish as npm module.\n\n      ## Develop\n\n      After cloning from gitHub, you can run the example by doing\n      ~~~shell\n      npm run serve-docs\n      ~~~\n\n      And then open your browser at [http://localhost:5000](http://localhost:5000).\n\n      ## Live Demo: `Bristol`\n      showing basic pointer events and force detection (with force touch and apple pencil)\n      ",
    _react2.default.createElement(_HappySandwichMaker2.default, null),
    "### Props",
    "This table below is generated automatically",
    _react2.default.createElement(
      "div",
      { className: "table-container horizontal-scroll flex-column center" },
      _react2.default.createElement(_reactComponentPropsTable2.default, { propMetaData: _HappySandwichMaker6.default.props })
    ),
    "\n      ### Usage Example\n\n      The source code below of the example above is loaded using the webpack raw loader.",
    _react2.default.createElement(
      _reactHighlight2.default,
      null,
      _HappySandwichMaker4.default
    ),
    "\n      ## Develop\n\n      1. First make your changes, then git commit. Use `serve-docs` to view live update at [http://localhost:5000](http://localhost:5000).\n      2. run `build-docs`, `build-static-docs`, `gh-pages`\n      3. Then remember to push to master.\n\n      "
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