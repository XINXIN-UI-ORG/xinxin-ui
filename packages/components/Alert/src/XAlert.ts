import { AlertOptions } from '@xinxin-ui/typings';
import { createVNode, render } from 'vue';
import XAlertComponent from './Alert.vue';


function XAlert(options: string | AlertOptions): void {
  if (typeof options === 'string') {
    options = {
      type: 'info',
      message: options,
    };
  }

  appendAlert(options);
}

function appendAlert(options: any): void {
  // 创建VNode
  const vm = createVNode(XAlertComponent, options);

  // 创建挂载点
  const container = document.createElement('div');

  // 将vdom渲染到挂载点下
  render(vm, container);

  // 将容器插入到body中
  document.body.appendChild(container.firstElementChild!);
}

export default XAlert;
