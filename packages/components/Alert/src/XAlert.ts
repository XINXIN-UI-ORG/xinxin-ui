import { AlertOptions, AlertClose, AlertStyle } from '@xinxin-ui/typings';
import { createVNode, render } from 'vue';
import TechnologyComponent from './Alert.vue';
import SimpleComponent from './Simple.vue';

const template = {
  'technology': TechnologyComponent,
  'simple': SimpleComponent,
};

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
  // 判断使用哪个模板
  const component = template[options.style || 'technology'];

  // 创建VNode
  const vm = createVNode(component, options);

  // 创建挂载点
  const container = document.createElement('div');

  // 将vdom渲染到挂载点下
  render(vm, container);
  vm.props!.onDestory = () => {
    render(null, container);
  };

  // 将容器插入到body中
  document.body.appendChild(container.firstElementChild!);
  return container;
}

export default XAlert;
