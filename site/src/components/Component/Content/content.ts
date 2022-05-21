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
        const componentDisplayArea: VNode = h(Examples[componentName().replace("-", "")], {});
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
    "input": "接收用户输入。",
    "input-number": "也是文本输入框，但是只能输入数字哦。",
    "radio": "备胎有很多，只能选一个。",
    "checkbox": "你选这么多不怕我伤心嘛？",
    "icon": "图标是灵魂。",
    "select": "下拉菜单选择数据。",
    "popover": "点击目标元素弹出气泡卡片。",
    "back-top": "返回页面顶部。",
    "scrollbar": "默认的滚动条也太难看了，不过这个肯定没有默认的好用~~",
    "tag": "加了个皮肤，你还认识它嘛？",
    "switch-input": "它是没有组织的checkbox。",
};
