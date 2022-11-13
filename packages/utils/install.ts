import type { Plugin } from 'vue';
import { NOOP } from '@vue/shared';

export type SFCWithInstall<T> = T & Plugin;

export const withInstall = <T, E extends Record<string, any>>(main: T, extra: E) => {
    // 给组件添加install方法
    (main as SFCWithInstall<T>).install = (app) => {
        for (const comp of [main, ...Object.values(extra ?? {})]) {
            app.component(comp.name, comp);
        }
    };

    if (extra) {
        for (const [key, comp] of Object.entries(extra)) {
            (<any>main)[key] = comp;
        }
    }

    return main as SFCWithInstall<T> & E;
}

export const withNoopInstall = <T>(component: T) => {
    (component as SFCWithInstall<T>).install = NOOP;

    return component as SFCWithInstall<T>;
};