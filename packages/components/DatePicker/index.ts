import { withInstall } from '@xinxin-ui/utils';
import DatePicker from './src/DatePicker.vue';

DatePicker.name = 'x-date-picker';
export const XDatePicker = withInstall(DatePicker, {});

export default XDatePicker;