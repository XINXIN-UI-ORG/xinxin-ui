import type { PropType, ExtractPropTypes } from 'vue';
import type { AlertType } from '@xinxin-ui/typings';

export const alertProps = {
  type: {
    type: String as PropType<AlertType>,
    default: 'info',
  },
};

export type AlertProps = ExtractPropTypes<typeof alertProps>;
