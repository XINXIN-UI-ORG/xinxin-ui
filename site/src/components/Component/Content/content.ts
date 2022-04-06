import { computed, h, VNode } from "vue";
import * as Examples from "../../examples";

export const useContent = (componentName: () => string) => {
    // 待返回的VNode
    let contentVNode = computed<VNode>(() => {
        // 构建描述信息
        const descContent: VNode = h('div', {
            class: "content__wrap__desc"
        }, componentNameDesc[componentName()]);
        // 构建组件演示区域
        const componentDisplayArea: VNode = h(Examples[componentName()], {});
        // 构建api说明区域
        
        return h('div', {
            class: "content__wrap",
        }, [
            descContent,
            componentDisplayArea,
        ]);
    });
    
    return {
        content: contentVNode,
    };
};

/**
 * 记录描述工具
 */
const componentNameDesc = {
    "button": "一个好看的按钮会让人心情愉悦。",
    "message": "常用于操作后不需要与用户交互的信息提示。",
    "loading": "加载数据时不枯燥。",
};
