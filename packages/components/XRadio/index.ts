import { App } from "vue";
import XRadio from "./src/XRadio.vue";
import XRadioGroup from "./src/XRadioGroup.vue";
import XRadioButton from "./src/XRadioButton.vue";

XRadio.install = (app: App) => {};
XRadioGroup.install = (app: App) => {};
XRadioButton.install = (app: App) => {};

export { XRadio, XRadioGroup, XRadioButton };

export default XRadio;

export * from "./src/XRadioGroup";

export * from "./src/XRadio";
