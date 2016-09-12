/**
 * Created by ge on 6/24/16.
 */
import React from "react";
import Markdown from "react-markdownit";

import Highlight from "@episodeyang/react-highlight.js";
import PropsTable from "react-component-props-table";

import HappySandwichMakerExample from "../HappySandwichMaker.example";
import HappySandwichMakerSource from "!!raw!../HappySandwichMaker.example";
import HappySandwichMakerAST from "!!react-docgen!../CanvasDrawable";

export default function Readme({}) {
  return (
    <Markdown stripIndent={true}>{`
      # React Canvas Paint Demo

      [![github](https://img.shields.io/github/downloads/episodeyang/react-bristol/total.svg?style=flat-square&maxAge=2592000)]()

      A HTML5 canvas component that allows you to draw inside the browser.

      ## Usage

      [ ] todo: need to publish as npm module.

      ## Develop

      After cloning from gitHub, you can run the example by doing
      ~~~shell
      npm run serve-docs
      ~~~

      And then open your browser at [http://localhost:5000](http://localhost:5000).

      ## Live Demo: \`Bristol\`
      showing basic pointer events and force detection (with force touch and apple pencil)
      `}
      <HappySandwichMakerExample/>
      ### Props
      {`This table below is generated automatically`}
      <div className="table-container horizontal-scroll flex-column center">
        <PropsTable propMetaData={HappySandwichMakerAST.props}/>
      </div>
      {`
      ### Usage Example

      The source code below of the example above is loaded using the webpack raw loader.`}
      <Highlight>{HappySandwichMakerSource}</Highlight>
      {`
      ## Develop

      1. First make your changes, then git commit. Use \`serve-docs\` to view live update at [http://localhost:5000](http://localhost:5000).
      2. run \`build-docs\`, \`build-static-docs\`, \`gh-pages\`
      3. Then remember to push to master.

      `}
    </Markdown>
  )
}
