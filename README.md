<div data-reactroot=""><h1>React Bristol (Board)</h1><!-- react-text: 3 -->
<!-- /react-text --><p><a href=""><img src="https://img.shields.io/github/downloads/episodeyang/react-bristol/total.svg?style=flat-square&amp;maxAge=2592000" alt="github"></a></p><!-- react-text: 5 -->
<!-- /react-text --><p>A HTML5 canvas component supporting Apple Pencil and force touch.</p><!-- react-text: 7 -->
<!-- /react-text --><p>This is a quick proof-of-concept component I built to test out the performance of mobile safari's
input events, to see if I can build a Apple Pencil note taking app that lives inside the browser.
At the moment, the touch events mobile safari emits have integer coordinates, making the inputs
a bit jagged The input event frequency is also on the lower side.</p><!-- react-text: 9 -->
<!-- /react-text --><p>There is currently a ticket in webkit that changes the input coordinates to <code>double</code>. Not sure
when it will land though.</p><!-- react-text: 11 -->
<!-- /react-text --><p>We might be able to use a simple neural net to de-jag the hand writing.</p><!-- react-text: 13 -->
<!-- /react-text --><ul>
<li>[ ] todo: need to publish as npm module.</li>
</ul><!-- react-text: 206 -->
<!-- /react-text --><h2>Usage and Live Demo: <code>Bristol</code></h2><!-- react-text: 252 -->
<!-- /react-text --><p>showing basic pointer events and force detection (with force touch and apple pencil)</p><div style="width: 1000px; height: 400px; position: relative; border: 10px solid rgb(255, 192, 203);"><canvas width="3000" height="1200" style="position: absolute; top: 0px; left: 0px; transform: scale(0.3333333333333333, 0.3333333333333333) translate(-3000px, -1200px);"></canvas><canvas width="3000" height="1200" style="position: absolute; top: 0px; left: 0px; transform: scale(0.3333333333333333, 0.3333333333333333) translate(-3000px, -1200px); z-index: -1;"></canvas></div><h3>Props</h3><p>This table below is generated automatically</p><div class="table-container horizontal-scroll flex-column center"><table class="" src="some list"><thead><tr><th>Prop Name</th><th>Type</th><th>Is Required</th><th>Default Value</th><th>Description</th></tr></thead><tbody><tr><td style="color: rgb(17, 147, 154);">width</td><td>number</td><td style="color: rgb(198, 198, 198);">optional</td><td style="color: rgb(198, 198, 198);">none</td><td></td></tr><tr><td style="color: rgb(17, 147, 154);">height</td><td>number</td><td style="color: rgb(198, 198, 198);">optional</td><td style="color: rgb(198, 198, 198);">none</td><td></td></tr><tr><td style="color: rgb(17, 147, 154);">renderRatio</td><td>number</td><td style="color: rgb(198, 198, 198);">optional</td><td style="color: rgb(236, 171, 32);">3</td><td></td></tr><tr><td style="color: rgb(17, 147, 154);">onImageUpdate</td><td>func</td><td style="color: rgb(198, 198, 198);">optional</td><td style="color: rgb(198, 198, 198);">none</td><td></td></tr></tbody></table></div><h3>Usage Example</h3><!-- react-text: 291 -->
<!-- /react-text --><p>The source code below of the example above is loaded using the webpack raw loader.</p><pre><code class="hljs scala"><span class="hljs-comment">/** Created by ge on 6/23/16. */</span>
<span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, {<span class="hljs-type">Component</span>} from <span class="hljs-string">"react"</span>;
<span class="hljs-keyword">import</span> autobind from <span class="hljs-symbol">'autobind</span>-decorator';
<span class="hljs-keyword">import</span> <span class="hljs-type">Bristol</span> from <span class="hljs-string">"./Bristol"</span>;

const style = {
  border: <span class="hljs-symbol">'10px</span> solid pink'
};
export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HappySandwichMakerExample</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-meta">@autobind</span>
  saveImage(image) {
    <span class="hljs-comment">// do something with image</span>
  }

  render() {
    <span class="hljs-keyword">return</span> (
      &lt;<span class="hljs-type">Bristol</span> width={<span class="hljs-number">1000</span>}
               height={<span class="hljs-number">400</span>}
               style={style}
               onImageUpdate={<span class="hljs-keyword">this</span>.saveImage}
      /&gt;
    );
  }
}
</code></pre><h2>Develop</h2><!-- react-text: 64 -->
<!-- /react-text --><p>After cloning from gitHub, you can run the example by doing</p><!-- react-text: 248 -->
<!-- /react-text --><pre><code class="language-shell">npm run serve-docs
</code></pre><!-- react-text: 294 -->
<!-- /react-text --><p>And then open your browser at <a href="http://localhost:5000">http://localhost:5000</a>.</p></div>
