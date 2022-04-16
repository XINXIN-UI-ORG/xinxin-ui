import { createPopper } from "@popperjs/core";
import { PlacementType } from "@xinxin-ui/typings";

type Options = {
    placement: PlacementType,
    offset: number,
};

export function usePopper(referenceDom: HTMLElement, popperDom: HTMLElement, option: Options): void {
    createPopper(referenceDom, popperDom, {
        placement: option.placement,
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: [0, option.offset ?? 12],
                },
            },
        ],
    });
}