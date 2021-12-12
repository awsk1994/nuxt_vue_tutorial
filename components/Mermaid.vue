<template>
  <div id="app">
    <h1>t1</h1>
    <vue-mermaid-string :value="diagram" />
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
        ${style("Frameworks", 0)}
        ${style("DateTime", 1)}
        JavaScript --> Frameworks
        Frameworks --> DateTime
        DateTime --> 3D
    `

export default {
  computed: {
    diagram: () => graphB,
  },
  components: {
    VueMermaidString,
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
</style>
