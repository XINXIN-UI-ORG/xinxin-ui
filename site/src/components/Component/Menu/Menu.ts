import { MenuType, MenuListType } from "./Menu.typing";
import { Apps20Regular, AlertOn20Filled, FormNew48Regular } from "@vicons/fluent";

export const menuList: MenuListType[] = [
    {
        id: 100,
        type: MenuType.category,
        content: "通用组件",
        icon: Apps20Regular,
        size: 2,
    },
    {
        id: 101,
        type: MenuType.link,
        content: "按钮",
        name: "Button",
    },
    {
        id: 102,
        type: MenuType.link,
        content: "图标",
        name: "Icon",
    },
    {
        id: 300,
        type: MenuType.category,
        content: "表单组件",
        icon: FormNew48Regular,
        size: 5,
    },
    {
        id: 301,
        type: MenuType.link,
        content: "文本输入框",
        name: "Input",
    },
    {
        id: 302,
        type: MenuType.link,
        content: "数字输入框",
        name: "Input-Number",
    },
    {
        id: 303,
        type: MenuType.link,
        content: "单选框",
        name: "Radio",
    },
    {
        id: 304,
        type: MenuType.link,
        content: "复选框",
        name: "Checkbox",
    },
    {
        id: 305,
        type: MenuType.link,
        content: "选择器",
        name: "Select",
    },
    {
        id: 200,
        type: MenuType.category,
        content: "反馈组件",
        icon: AlertOn20Filled,
        size: 2,
    },
    {
        id: 201,
        type: MenuType.link,
        content: "消息提示",
        name: "Message",
    },
    {
        id: 202,
        type: MenuType.link,
        content: "加载中",
        name: "Loading",
    },
];
