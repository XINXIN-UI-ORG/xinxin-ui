import { MenuType, MenuListType } from "./Menu/Menu.typing";
import { ActionType } from "./Action/Action.typing";
import { Apps20Regular } from "@vicons/fluent";

export const menuList: MenuListType[] = [
    {
        id: 0,
        type: MenuType.category,
        content: "通用组件",
        icon: Apps20Regular,
        size: 1,
    },
    {
        id: 1,
        type: MenuType.link,
        content: "按钮",
        name: "Button",
    },
];

export const actionList: { [propName: string]: ActionType[] } = {
    "button": [
        {
            name: "基础用法",
            link: "/component/button#base",
            key: 0
        },
        {
            name: "二级按钮",
            link: "/component/button#second",
            key: 1
        },
        {
            name: "三级按钮",
            link: "/component/button#third",
            key: 2
        },
        {
            name: "四级按钮",
            link: "/component/button#fourth",
            key: 3
        },
        {
            name: "虚线边框",
            link: "/component/button#dotted",
            key: 4
        },
        {
            name: "透明背景",
            link: "/component/button#plain",
            key: 5
        },
        {
            name: "圆角按钮",
            link: "/component/button#round",
            key: 6
        },
        {
            name: "圆形按钮",
            link: "/component/button#circle",
            key: 7
        },
        {
            name: "无背景",
            link: "/component/button#ghost",
            key: 8
        },
        {
            name: "按钮尺寸",
            link: "/component/button#size",
            key: 9
        },
        {
            name: "禁用按钮",
            link: "/component/button#disabled",
            key: 10
        },
        {
            name: "加载按钮",
            link: "/component/button#loading",
            key: 11
        },
        {
            name: "自定义颜色",
            link: "/component/button#customer",
            key: 12
        },
        {
            name: "块级按钮",
            link: "/component/button#block",
            key: 13
        },
        {
            name: "按钮组",
            link: "/component/button#buttonGroup",
            key: 14
        },
        {
            name: "带图标的按钮",
            link: "/component/button#icons",
            key: 15
        },
    ],
};
