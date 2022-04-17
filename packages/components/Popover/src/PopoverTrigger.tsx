import type { VNode, ExtractPropTypes, SetupContext } from "vue";
import { h, Comment, defineComponent, Fragment, inject, Text, withDirectives } from "vue";
import { isObject } from "@vue/shared";
import { ReferenceInjectKey } from "@xinxin-ui/symbols";
import { isBoolean } from "@vueuse/core";

const triggerProps = {
    popoverShow: Boolean,

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
        let { checkPopoverShow } = useTrigger(props, emit);
        return () => {
            // 绑定指令 在指令中将真实dom传出去
            return withDirectives(h(defaultSlot!, {
                onClick: checkPopoverShow,
            }), [
                [{
                    mounted(el) {
                        fatherReferenceGather && (fatherReferenceGather.triggerRef.value = el);
                    },
                    updated(el) {
                        fatherReferenceGather && (fatherReferenceGather.triggerRef.value = el);
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
    emit: SetupContext<typeof triggerEmit>['emit']
) {
    // 切换popover的显示状态
    let checkPopoverShow = () => {
        emit("update:popoverShow", !props.popoverShow);
    };
    return {
        checkPopoverShow,
    };
}

