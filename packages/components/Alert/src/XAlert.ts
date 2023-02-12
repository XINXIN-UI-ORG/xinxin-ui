import { AlertOptions, AlertClose } from '@xinxin-ui/typings';
import { createVNode, render } from 'vue';
import XAlertComponent from './Alert.vue';


function XAlert(options: string | AlertOptions): AlertClose {
  if (typeof options === 'string') {
    options = {
      type: 'info',
      message: options,
    };
  }

  const container = appendAlert(options);

  return () => {
    render(null, container);
  };
}

function appendAlert(options: any): HTMLDivElement {
  // 创建VNode
  const vm = createVNode(XAlertComponent, options);

  // 创建挂载点
  const container = document.createElement('div');

  // 将vdom渲染到挂载点下
  render(vm, container);

  // 将容器插入到body中
  document.body.appendChild(container.firstElementChild!);
  return container;
}

export default XAlert;
