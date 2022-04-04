import { Component } from "vue";

/**
 * 菜单类型
 * 分为与类目与能点击的单元
 */
export enum MenuType {
    category,
    link
};

export type MenuListType = {
    id: number,
    /**
     * 菜单类型
     */
    type: MenuType,
    /**
     * 菜单内容
     */
    content: string,
    /**
     * 组件名称 类目菜单不需要
     */
    name?: string,
    /**
     * 当前类目下的组件个数
     */
    size?: number,
    /**
     * 组件图标 类目类需要
     */
    icon?: Component,
    /**
     * 是否选中
     */
    active?: boolean,
};
