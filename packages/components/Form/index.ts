import Form from "./src/Form.vue";
import FormItem from "./src/FormItem.vue";
import { withInstall, withNoopInstall } from "@xinxin-ui/utils";


export const XForm = withInstall(Form, { FormItem });

export default XForm;

export const XFormItem = withNoopInstall(FormItem);
