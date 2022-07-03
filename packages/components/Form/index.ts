import Form from "./src/Form.vue";
import FormItem from "./src/FormItem.vue";
import { App } from "vue";

Form.install = (app: App) => {};
FormItem.install = (app: App) => {};

export { Form, FormItem };

export default Form;
