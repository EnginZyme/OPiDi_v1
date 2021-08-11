import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Button from "primevue/button";
import SplitButton from "primevue/splitbutton";
import OverlayPanel from "primevue/overlaypanel";
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import Textarea from "primevue/textarea";
import TabView from "primevue/tabview";
import Dropdown from "primevue/dropdown";
import InputNumber from "primevue/inputnumber";
import BadgeDirective from "primevue/badgedirective";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import SelectButton from "primevue/selectbutton";
import ProgressSpinner from "primevue/progressspinner";
import MultiSelect from "primevue/multiselect";
import FileUpload from "primevue/fileupload";
import Chips from "primevue/chips";
import Inplace from "primevue/inplace";
import Menu from "primevue/menu";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import Tooltip from "primevue/tooltip";
import Panel from "primevue/panel";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "./main.css";
import "primeicons/primeicons.css";


Vue.component("Button", Button);
Vue.component("Inplace", Inplace);
Vue.component("OverlayPanel", OverlayPanel);
Vue.component("SplitButton", SplitButton);
Vue.component("InputText", InputText);
Vue.component("ProgressSpinner", ProgressSpinner);
Vue.component("Textarea", Textarea);
Vue.component("TabView", TabView);
Vue.component("Dropdown", Dropdown);
Vue.component("Dialog", Dialog);
Vue.component("Accordion", Accordion);
Vue.component("AccordionTab", AccordionTab);
Vue.component("SelectButton", SelectButton);
Vue.component("Menu", Menu);
Vue.component("MultiSelect", MultiSelect);
Vue.component("FileUpload", FileUpload);
Vue.component("InputNumber", InputNumber);
Vue.component("Panel", Panel);
Vue.component("Chips", Chips);
Vue.component("Toast", Toast);
Vue.directive("tooltip", Tooltip);
Vue.directive("badge", BadgeDirective);
Vue.use(ToastService);
Vue.use(PrimeVue, { ripple: true });
Vue.config.productionTip = false; // disables development tips in production console

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
