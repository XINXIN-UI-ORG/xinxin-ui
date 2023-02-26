import { createPopper } from "@popperjs/core";
import { PlacementType } from "@xinxin-ui/typings";

type Options = {
    placement: PlacementType,
    offset: number,
    boundary: HTMLElement | Document,
    arrowDom?: HTMLElement,
};

export function usePopper(referenceDom: HTMLElement, popperDom: HTMLElement, option: Options) {
    return createPopper(referenceDom, popperDom, {
        placement: option.placement,
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, option.offset ?? 12],
                },
            },
            {
                name: 'flip',
                options: {
                    padding: 5,
                    boundary: option.boundary,
                },
            },
            {
                name: 'preventOverflow',
                options: {
                    padding: 5,
                    boundary: option.boundary,
                },
            },
            {
                name: 'arrow',
                options: {
                    element: option.arrowDom,
                    padding: 3,
                },
            },
            {
                name: 'computeStyles',
                options: {
                    gpuAcceleration: false,
                },
            },
        ],
    });
}