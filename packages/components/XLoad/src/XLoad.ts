import { InputData } from "./XLoadOptions.types";
import XLoadComponent from "./XLoad.vue";
import { createVNode, render, VNode } from "vue";

export default function (
    args: InputData | string = "加载中..."
): XLoadHandler | null {
    let argsOption: InputData;
    if (typeof args === "string") {
        argsOption = {
            description: args,
        };
    } else {
        argsOption = args;
    }
    // 将load组件插入父级DOM下
    const vm: VNode = createVNode(XLoadComponent, argsOption);
    // 创建挂载点 将组件挂载到挂载点上
    const container = document.createElement("div");
    render(vm, container);
    if (container.firstElementChild === null) {
        return null;
    }
    return new XLoadHandler(container.firstElementChild as HTMLElement, vm);
}

/**
 * XLoad处理对象
 */
class XLoadHandler {
    private target: HTMLElement | string | undefined;
    private loadDom: HTMLElement | null;
    private loadVDom: VNode;

    constructor(loadDom: HTMLElement, loadVDom: VNode) {
        this.loadDom = loadDom;
        this.loadVDom = loadVDom;
    }
    /**
     * 将Xload组件挂载到对应的Dom下
     * @param target 挂载对象
     * @returns null
     */
    public show(target?: HTMLElement | string): void {
        if (this.loadDom === null) {
            return;
        }
        this.target = target;
        // 获取load组件要展示的父级对象
        let parentDom: HTMLElement = document.body;
        if (target !== undefined) {
            if (typeof target === "string") {
                let parDom = document.querySelector(target);
                if (parDom === null) {
                    return;
                }
                parentDom = parDom as HTMLElement;
            } else {
                parentDom = target;
            }
        }
        // 设置父级对象定位
        parentDom.style.position = "relative";
        if (target === undefined) {
            // 如果根节点是body需要特殊处理
            this.loadDom.style.position = "fixed";
            // 将body滚动条隐藏
            parentDom.style.overflow = "hidden";
        }
        parentDom.appendChild(this.loadDom);
        // 显示组件
        this.loadVDom.component?.exposed!.showLoad();
    }
    /**
     * 关闭加载组件
     */
    public close(): void {
        if (this.loadDom === null) {
            return;
        }
        this.loadVDom.component?.exposed!.hiddenLoad();
        if (this.target === undefined) {
            document.body.style.overflow = "auto";
        }
    }
    /**
     * 销毁加载组件
     */
    public destroy(): void {
        this.close();
        setTimeout(() => {
            this.loadDom && this.loadDom.remove();
            this.loadDom = null;
        }, 500);
    }
}

export { XLoadHandler };
