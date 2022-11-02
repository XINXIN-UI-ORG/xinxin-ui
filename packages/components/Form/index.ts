import Form from "./src/Form.vue";
import FormItem from "./src/FormItem.vue";
import { withIntsall, withNoopInstall } from "@xinxin-ui/utils";


export const XForm = withIntsall(Form, { FormItem });

export default XForm;

export const XFormItem = withNoopInstall(FormItem);
