import { InjectionKey, Ref } from "vue";

export interface ReferenceGather {
    triggerRef: Ref<HTMLElement| null>,
}

export const ReferenceInjectKey: InjectionKey<ReferenceGather> = Symbol("xPopover");