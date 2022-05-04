import type { PropType } from "vue";
import type { NormalType } from "@xinxin-ui/typings";

export const tagProps = {
    type: {
        type: String as PropType<NormalType>,
        default: "default"
    },
};