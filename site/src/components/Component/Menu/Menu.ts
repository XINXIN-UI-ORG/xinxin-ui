import { MenuType, MenuListType } from "./Menu.typing";
import { Apps20Regular, AlertOn20Filled } from "@vicons/fluent";

export const menuList: MenuListType[] = [
    {
        id: 100,
        type: MenuType.category,
        content: "通用组件",
        icon: Apps20Regular,
        size: 1,
    },
    {
        id: 101,
        type: MenuType.link,
        content: "按钮",
        name: "Button",
    },
    {
        id: 200,
        type: MenuType.category,
        content: "反馈组件",
        icon: AlertOn20Filled,
        size: 1,
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
