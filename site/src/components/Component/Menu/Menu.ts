import { MenuType, MenuListType } from "./Menu.typing";
import { Apps20Regular, AlertOn20Filled, FormNew48Regular, NavigationUnread24Regular, WindowWrench32Filled, WeatherRainShowersDay20Filled } from "@vicons/fluent";

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
        size: 8,
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
        id: 306,
        type: MenuType.link,
        content: "开关",
        name: "Switch-Input",
    },
    {
        id: 307,
        type: MenuType.link,
        content: "表单",
        name: "Form",
    },
    {
        id: 308,
        type: MenuType.link,
        content: "上传",
        name: "Upload",
    },


    {
        id: 600,
        type: MenuType.category,
        content: "展示组件",
        icon: WeatherRainShowersDay20Filled,
        size: 1,
    },
    {
        id: 601,
        type: MenuType.link,
        content: "标签",
        name: "Tag",
    },


    {
        id: 400,
        type: MenuType.category,
        content: "导航组件",
        icon: NavigationUnread24Regular,
        size: 1,
    },
    {
        id: 401,
        type: MenuType.link,
        content: "回到顶部",
        name: "Back-Top",
    },


    {
        id: 200,
        type: MenuType.category,
        content: "反馈组件",
        icon: AlertOn20Filled,
        size: 3,
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
    {
        id: 203,
        type: MenuType.link,
        content: "气泡卡片",
        name: "Popover",
    },
    {
        id: 204,
        type: MenuType.link,
        content: '警告提示',
        name: "Alert",
    },
    {
        id: 205,
        type: MenuType.link,
        content: '模态对话框',
        name: "Modal",
    },
    {
        id: 206,
        type: MenuType.link,
        content: "进度条",
        name: "Progress",
    },


    {
        id: 500,
        type: MenuType.category,
        content: "工具组件",
        icon: WindowWrench32Filled,
        size: 1,
    },
    {
        id: 501,
        type: MenuType.link,
        content: "滚动条",
        name: "Scrollbar",
    },
];
