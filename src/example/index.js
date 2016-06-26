/**
 * Created by ge on 6/23/16.
 */
require('./typesetting-basic.css');

import React from "react";
import {render} from "react-dom";
import Readme from "./Readme";

document.addEventListener("DOMContentLoaded", function (event) {
  render(<Readme/>, document.body.querySelector('#readme-container'));
});

