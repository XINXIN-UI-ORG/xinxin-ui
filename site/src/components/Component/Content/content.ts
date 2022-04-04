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


const componentNameDesc = {
    "button": "一个好看的按钮会让人心情愉悦。",
};
