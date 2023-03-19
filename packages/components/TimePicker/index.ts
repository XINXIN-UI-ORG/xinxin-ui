import TimePicker from './src/TimePicker.vue';
import { withInstall } from '@xinxin-ui/utils';

TimePicker.name = 'x-time-picker';
export const XTimePicker = withInstall(TimePicker, {});

export default XTimePicker;
