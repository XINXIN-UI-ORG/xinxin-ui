import type { XMessageOptionsType } from "./XMessageOptions.types";
import XMessageComponent from "./XMessage.vue";
import { createVNode, render, VNode } from "vue";

// 储存页面上的消息节点
const messageInstance: Array<VNode> = [];
let defaultOffset = 20;

const AsMessage = (options: XMessageOptionsType): void => {
    if (options === undefined) {
        options = {
            message: "XinXin-UI Message!",
        };
    }

    if (typeof options === "string") {
        options = {
            message: options,
        };
    }
    // 到此options一定是一个XMessageOptionsType类型的对象
    // 计算消息的偏移量 后面的消息需要与前面的消息拉开距离
    let userOffset = options.offset || defaultOffset;
    let offset = userOffset;
    messageInstance.forEach((instance) => {
        // 将该消息之前的所有消息的高度以及偏移值加起来得到目前消息的偏移量
        offset += instance.el!.offsetHeight + userOffset;
    });
    const userOnClose = options.onClose;
    let id = `x_message_${messageInstance.length}`;
    // 劫持用户传入的options
    const innerOptions = {
        ...options,
        offset,
        id,
        onClose: () => {
            // 从集合中将该messageNode移除
            const removeInstanceId = messageInstance.findIndex(
                (instance) => instance.component!.props.id === id
            );
            if (removeInstanceId === -1) {
                return;
            }
            const removeVm = messageInstance[removeInstanceId];
            if (!removeVm) {
                return;
            }
            const removeVmHeight = removeVm.el!.offsetHeight;
            // 调整后续的messageNode的偏移量
            messageInstance.forEach((instance: VNode, index: number) => {
                if (index <= removeInstanceId) {
                    return;
                }
                let top =
                    parseInt(instance.el!.style["top"], 10) -
                    userOffset -
                    removeVmHeight;
                instance.component!.props.offset = top;
            });
            messageInstance.splice(removeInstanceId, 1);
            // 执行用户的方法
            userOnClose?.();
        },
    };
    // createVNode将XMessageComponent转换为虚拟节点  然后由render将虚拟节点转换为真实节点 最后插入到body下
    // 转换虚拟节点
    const vm = createVNode(XMessageComponent, innerOptions as any);
    // 创建挂载点
    const container = document.createElement("div");
    // 将虚拟节点转换为真实节点并挂载到div下
    render(vm, container);
    // 将真实节点插入到body中
    document.body.appendChild(container.firstElementChild!);
    // 创建销毁方法
    vm.props!.onDestory = () => {
        // 将message从页面中移出
        render(null, container);
    };
    messageInstance.push(vm);
};

export default AsMessage;
