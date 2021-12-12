<template>
  <div id="app">
    <button @click="change(); forceRerender()">Change</button>
    <vue-mermaid-string :value="graphData" v-if="renderComponent" />
  </div>
</template>

<script>
import VueMermaidString from "vue-mermaid-string";
import endent from "endent";
import tinycolor from "tinycolor2";
// https://www.paletton.com/#uid=73+1p0k2O++00++00++7n++be+Z
let colorDefs = [
  { color: "#FFE9F0", saturateStroke: -5 },
  { color: "#F3FFE9", darkenStroke: 60, saturateStroke: -5 },
  { color: "#FFF9E9", darkenStroke: 50, saturateStroke: 10 },
];
colorDefs = colorDefs.map((colorDef) => ({
  darkenStroke: 20,
  saturateStroke: 0,
  ...colorDef,
}));

const style = (node, colorIndex) => {
  const colorDef = colorDefs[colorIndex];
  const fill = colorDef.color;
  const stroke = tinycolor(colorDef.color)
      .darken(colorDef.darkenStroke)
      .saturate(colorDef.saturateStroke)
      .toString();
  return `style ${node} fill: ${fill}, stroke: ${stroke}`;
};

const graphA = endent`
      graph TD
        DateTime[Date and time]
        ${style("Frameworks", 0)}
        ${style("Vue.js", 0)}
        ${style("React", 0)}
        ${style("DateTime", 1)}
        ${style("Moment.js", 1)}
        ${style("date-fns", 1)}
        ${style("3D", 2)}
        ${style("Three.js", 2)}
        ${style("Babylon.js", 2)}
        JavaScript --> Frameworks
        JavaScript --> DateTime
        JavaScript --> 3D
        Frameworks --> Vue.js
        Frameworks --> React
        DateTime --> Moment.js
        DateTime --> date-fns
        3D --> Three.js
        3D --> Babylon.js
    `

const graphB = endent`
      graph TD
        DateTime[Date and time]
        Frameworks((Frameworks))
        JavaScript(Javascript)
        ${style("Frameworks", 0)}
        ${style("DateTime", 1)}
        JavaScript --> Frameworks
        Frameworks --> DateTime
        DateTime --> 3D
    `

const graphC = endent`
 graph TB
         subgraph one
         a1-->a2
         end
         subgraph two
         b1-->b2
         end
         subgraph three
         c1-->c2
         end
         c1-->a2
`

const graphD = endent`
graph TB;
    A-->B;
    click A callback "Tooltip for a callback\nabc\tok"
    click B "http://www.github.com" "This is a tooltip for a link"
`

const graphs = [graphD, graphA, graphB, graphC]

export default {
  data() {
    return {
      renderComponent: true,
      idx: 0,
      graphData: graphs[0],
      graphs: graphs,
    }
  },
  components: {
    VueMermaidString,
  },
  methods: {
    change() {
      this.idx += 1
      if (this.idx > this.graphs.length-1) {
        this.idx = 0
      }
      this.graphData = this.graphs[this.idx]
    },
    // https://michaelnthiessen.com/force-re-render/
    forceRerender() {
      this.renderComponent = false;
      this.$nextTick(() => this.renderComponent = true)
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
div.mermaidTooltip {
  position: absolute;
  text-align: center;
  max-width: 200px;
  padding: 2px;
  margin-left: 30px;
  font-family: 'trebuchet ms', verdana, arial;
  font-family: var(--mermaid-font-family);
  font-size: 12px;
  background: #73DBF9;
  border: 1px solid black;
  border-radius: 2px;
  pointer-events: none;
  z-index: 100;
}

</style>
