import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            redirect: "/homepage"
        },
        // 首页
        {
            path: "/homepage",
            name: 'homepage',
            components: {
                default: () => import("../components/Homepage/Homepage.vue"),
                Nav: () => import("../components/Nav/Nav.vue"),
            },
        },
        // 安装使用
        {
            path: "/install",
            name: "install",
            components: {
                default: () => import("../components/Install/Install.vue"),
                Nav: () => import("../components/Nav/Nav.vue"),
            },
        },
        // 组件
        {
            path: "/component",
            name: "component",
            redirect: "/component/button",
            components: {
                default: () => import("../components/Component/Component.vue"),
                Nav: () => import("../components/Nav/Nav.vue"),
            },
            children: [
                {
                    path: ":componentName",
                    props: true,
                    name: "componentItem",
                    components: {
                        default: () => import("../components/Component/Content/Content.vue"),
                        componentMenu: () => import("../components/Component/Menu/Menu.vue"),
                        componentAction: () => import("../components/Component/Action/Action.vue"),
                    },
                },
            ],
        },
    ],
});

export default router;
