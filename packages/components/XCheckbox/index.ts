import { App } from "vue";
import XCheckbox from "./src/XCheckbox.vue";
import XCheckboxGroup from "./src/XCheckboxGroup.vue";
import CheckboxButton from "./src/CheckboxButton.vue"

XCheckbox.install = (app: App) => {};

XCheckboxGroup.install = (app: App) => {};

CheckboxButton.install = (app: App) => {};

export { XCheckbox, XCheckboxGroup, CheckboxButton };

export default XCheckbox;

export * from "./src/CheckboxGroup";
