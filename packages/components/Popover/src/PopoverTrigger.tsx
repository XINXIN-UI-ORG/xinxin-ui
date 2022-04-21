import type { VNode, ExtractPropTypes, SetupContext } from "vue";
import { h, Comment, defineComponent, Fragment, inject, Text, withDirectives } from "vue";
import { isObject } from "@vue/shared";
import { ReferenceInjectKey, ReferenceGather } from "@xinxin-ui/symbols";
import { isBoolean } from "@vueuse/core";

const triggerProps = {
    popoverShow: Boolean,
    show: Boolean,
    trigger: String,
    ignoreContent: Boolean,
};

const triggerEmit = {
    "update:popoverShow": (val) => {
        return isBoolean(val);
    },
};

export default defineComponent({
    props: triggerProps,
    emits: triggerEmit,
    setup(props, { slots, emit }) {
        const defaultSlot = findFirstLegitChild(slots.default?.());
        if (defaultSlot === null) {
            console.warn("popover未传入合法触发器！");
            return null;
        }
        // 获取父组件传过来的triggerRef对象 将真实trigger dom赋值给父组件的对象供父组件操作
        const fatherReferenceGather = inject(ReferenceInjectKey, undefined);
        let { checkPopoverShow, openPopper, closePopper, clickOtherToClosePopper } = useTrigger(props, emit, fatherReferenceGather);
        // 绑定popover触发展示的事件
        let directiveFunc = (el: HTMLElement) => {
            fatherReferenceGather && (fatherReferenceGather.triggerRef.value = el);
            if (props.show === undefined) {
                // 当用户设置了show属性，则不触发click和hover等事件
                if (props.trigger === 'click' || props.trigger === 'contextmenu') {
                    el.addEventListener(props.trigger, checkPopoverShow, false);
                } else if (props.trigger === 'focus') {
                    el.addEventListener('focus', openPopper, false);
                    el.addEventListener('blur', closePopper, false);
                } else if (props.trigger === 'hover') {
                    el.addEventListener('mouseenter', openPopper, false);
                    el.addEventListener('mouseleave', closePopper, false);
                    if (!props.ignoreContent) {
                        // 设置鼠标停留在reference和popper上都显示
                        fatherReferenceGather?.popperRef.value?.addEventListener("mouseenter", openPopper, false);
                        fatherReferenceGather?.popperRef.value?.addEventListener("mouseleave", closePopper, false);
                    }
                }
                // 点击其他地方隐藏popover
                document.addEventListener('click', clickOtherToClosePopper);
            }
        };
        return () => {
            // 绑定指令 在指令中将真实dom传出去
            return withDirectives(h(defaultSlot!, null), [
                [{
                    mounted(el) {
                        directiveFunc(el);
                    },
                    updated(el) {
                        directiveFunc(el);
                    }
                }]
            ]);
        };
    }
});

/**
 * 获取slot中第一个VNode
 * @param nodeList slot集合
 */
function findFirstLegitChild(nodeList: VNode[] | undefined): VNode | null {
    if (!nodeList) {
        return null;
    }
    for (let i = 0; i < nodeList.length; i++) {
        let currentChild = nodeList[i];
        if (isObject(currentChild)) {
            switch (currentChild.type) {
                case Comment:
                    // 注释VDom，跳过
                    continue;
                case Text:
                case "svg":
                    // 文本节点 包裹span返回
                    return wrapTextChild(currentChild);
                case Fragment:
                    return findFirstLegitChild(currentChild.children as Array<VNode>);
                default:
                    return currentChild;
            }
        }
        // 如果内容是字符串，则使用span包裹后返回
        return wrapTextChild(currentChild);
    }
    return null;
}

function wrapTextChild(s: string | VNode) {
    return (<span class="x-popover-trigger">{s}</span>);
}


function useTrigger(
    props: ExtractPropTypes<typeof triggerProps>,
    emit: SetupContext<typeof triggerEmit>['emit'],
    fatherReferenceGather: ReferenceGather | undefined,
) {
    // 切换popover的显示状态
    let checkPopoverShow = (e?: Event) => {
        e?.preventDefault();
        emit("update:popoverShow", !props.popoverShow);
    };
    let timer: NodeJS.Timer;
    let closePopper = () => {
        if (!props.popoverShow) {
            return;
        }
        timer = setTimeout(() => {
            emit("update:popoverShow", false);
        }, 200);
    };
    let openPopper = () => {
        // 对于hover触发的popover 如果鼠标移动到popover上需要保证popover不能消失 所以当检测到closePopper操作在200ms内则立即清除
        clearTimeout(timer);
        if (props.popoverShow) {
            return;
        }
        emit("update:popoverShow", true);
    };
    let clickOtherToClosePopper = (e: Event) => {
        const path = (e as any).path || (e.composedPath && e.composedPath());
        let stopPrevent = path.some((item: Element) => item === fatherReferenceGather?.popperRef.value || item === fatherReferenceGather?.triggerRef.value);
        if (stopPrevent) {
            // 如果点在了popover或者reference上 则不关闭
            return;
        }
        closePopper();
    };
    return {
        checkPopoverShow,
        openPopper,
        closePopper,
        clickOtherToClosePopper,
    };
}

