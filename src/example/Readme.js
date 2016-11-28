/**
 * Created by ge on 6/24/16.
 */
import React from "react";
import Markdown from "react-markdownit";

import Highlight from "@episodeyang/react-highlight.js";
import PropsTable from "react-component-props-table";

import HappySandwichMakerExample from "../Bristol.example";
import HappySandwichMakerSource from "!!raw!../Bristol.example.js";
import HappySandwichMakerAST from "!!react-docgen!../Bristol";

export default function Readme({}) {
  return (
    <Markdown stripIndent={true}>{`
      # React Bristol (Board)

      [![github](https://img.shields.io/github/downloads/episodeyang/react-bristol/total.svg?style=flat-square&maxAge=2592000)]()

      A HTML5 canvas component supporting Apple Pencil and force touch.

      This is a quick proof-of-concept component I built to test out the performance of mobile safari's
      input events, to see if I can build a Apple Pencil note taking app that lives inside the browser.
      At the moment, the touch events mobile safari emits have integer coordinates, making the inputs
      a bit jagged. The input event frequency is also on the lower side, but as of now
      I have improved the rendering speed, making the hand writing much more responsive
      and natural!

      **Status:** User experience is good enough for me to use personally!

      There is currently a ticket in webkit that changes the input coordinates to \`double\`. Not sure
      when it will land though.

      We might be able to use a simple neural net to de-jag the hand writing.

      - [ ] todo: need to publish as npm module.

      ## Usage and Live Demo: \`Bristol\`
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

      After cloning from gitHub, you can run the example by doing
      ~~~shell
      npm run serve-docs
      ~~~

      And then open your browser at [http://localhost:5000](http://localhost:5000).
      `}
    </Markdown>
  )
}
