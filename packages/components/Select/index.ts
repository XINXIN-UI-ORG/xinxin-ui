import { App } from "vue";
import Select from "./src/Select.vue";
import { SelectTypeEnum } from "./src/select";

Select.install = (app: App) => {};

export default Select;

export { Select, SelectTypeEnum };