import Vue from "vue";
import Mermaid from "./index.vue";

Vue.config.productionTip = false;

new Vue({
    render: h => h(Mermaid)
}).$mount("#app");
