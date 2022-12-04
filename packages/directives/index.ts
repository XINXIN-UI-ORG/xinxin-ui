import type { ObjectDirective } from 'vue';

export interface CustomerDirective<T = any, V = any> extends ObjectDirective<T, V> {
    name: string;
}

export { default as ClickHidden } from './clickHidden';