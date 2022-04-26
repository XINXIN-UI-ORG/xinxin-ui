import { ExtractPropTypes, computed, onMounted, watchEffect, ref } from "vue";
import type { Ref } from "vue";
import { numberReg, matchNumberReg } from "@xinxin-ui/utils";

export const scrollbarProps = {
    maxHeight: {
        type: [Number, String],
        default: undefined
    },
    color: {
        type: String,
        default: "#bfbfbf"
    },
    hoverColor: {
        type: String,
        default: "#999"
    },
    horizontal: {
        type: Boolean,
        default: false,
    },
};

export type ScrollbarPropsType = ExtractPropTypes<typeof scrollbarProps>;

type RefName = {
    scrollbarContainerRef: string;
    scrollbarContentRef: string;
    scrollVerticalBarRef: string;
    scrollVerticalTrackRef: string;
    scrollHorizontalTrackRef: string;
    scrollHorizontalBarRef: string;
};

type RefObject = {
    [key in keyof RefName]: Ref<HTMLDivElement | null>;
};

export function useScrollbar(
    props: ScrollbarPropsType,
    refObject: RefObject,
    expose: (exposed?: Record<string, any>) => void,
) {
    // 滚动条是否初始化
    let verticalInitialize = false;
    let horizontalInitialize = false;
    // 滚动条是否显示
    let verticalBarDisplay = ref<boolean>(false);
    let horizontalBarDisplay = ref<boolean>(false);
    onMounted(() => {
        watchEffect(() => {
            // 竖向滚动
            (verticalBarDisplay.value = showVerticalBar(refObject)) && initVerticalScrollBar(refObject) && (verticalInitialize = true);
            // 横向滚动
            (horizontalBarDisplay.value = showHorizontalBar(refObject, props)) && initHorizontalScrollBar(refObject) && (horizontalInitialize = true);
        });
        let scrollbarInitGather = () => {
            // 计算是否需要显示滚动条
            if (verticalBarDisplay.value = showVerticalBar(refObject)) {
                recomputedScrollBarVertical(refObject);
                // 判断滚动条是否初始化过 长度超过了且没有初始化过才执行初始化方法
                if (!verticalInitialize) {
                    initVerticalScrollBar(refObject);
                    verticalInitialize = false;
                }
            }
            if (horizontalBarDisplay.value = showHorizontalBar(refObject, props)) {
                recomputedScrollBarHorizontal(refObject);
                // 判断滚动条是否初始化过 长度超过了且没有初始化过才执行初始化方法
                if (!horizontalInitialize) {
                    initHorizontalScrollBar(refObject);
                    horizontalInitialize = false;
                }
            }
        };
        // 监听容器高度的变化 同步更新滚动条的长度
        const observer = new MutationObserver(scrollbarInitGather);
        observer.observe(refObject.scrollbarContentRef.value!, { attributes: true, childList: true, subtree: true, characterData: true });
        // 监听页面是否变化
        window.addEventListener("resize", scrollbarInitGather);
    });
    // 导出方法
    expose({
        getContainerDom(): HTMLDivElement {
            return refObject.scrollbarContainerRef.value!;
        },
        scrollTo(options: { top?: number, left?: number }) {
            if (options.top) {
                refObject.scrollbarContainerRef.value && (refObject.scrollbarContainerRef.value.scrollTop = options.top);
            }
            if (options.left) {
                refObject.scrollbarContainerRef.value && (refObject.scrollbarContainerRef.value.scrollLeft = options.left);
            }
        }
    });
    return {
        scrollStyle: computed(() => {
            let height: string;
            if (props.maxHeight === undefined) {
                height = "none";
            } else if (typeof props.maxHeight === "number" || numberReg.test(props.maxHeight)) {
                // 如果是数值类型或者字符串只有数字时则默认单位是pixel
                height = `${props.maxHeight}px`;
            } else {
                height = props.maxHeight;
            }
            return {
                "max-height": height,
            };
        }),
        contentStyle: computed(() => ({
            "width": props.horizontal ? "fit-content" : "auto",
        })),
        barStyle: computed(() => ({
            "--backgroundColor": props.color,
            "--backgroundColorHover": props.hoverColor,
        })),
        verticalBarDisplay,
        horizontalBarDisplay
    };
}

function showVerticalBar(refObject: RefObject): boolean {
    let result = false;
    if (refObject.scrollbarContainerRef.value && refObject.scrollbarContentRef.value) {
        result = refObject.scrollbarContentRef.value.clientHeight > refObject.scrollbarContainerRef.value.clientHeight;
    }
    return result;
}

function showHorizontalBar(refObject: RefObject, props: ScrollbarPropsType): boolean {
    if (!props.horizontal) {
        return false;
    }
    let result = false;
    if (refObject.scrollbarContainerRef.value && refObject.scrollbarContentRef.value) {
        result = refObject.scrollbarContentRef.value.clientWidth > refObject.scrollbarContainerRef.value.clientWidth;
    }
    return result;
}

/**
 * 横向滚动
 * @param refObject dom集合
 */
function initHorizontalScrollBar(refObject: RefObject) {
    recomputedScrollBarHorizontal(refObject);
    // 监听滚动条 实时计算滚动条位置
    let recomputedScrollBarHBind = recomputedScrollBarHorizontal.bind(null, refObject);
    refObject.scrollbarContainerRef.value?.addEventListener("scroll", recomputedScrollBarHBind);
    // 监听横向滚动条拖拽事件
    refObject.scrollHorizontalBarRef.value?.addEventListener("mousedown", (e: MouseEvent) => {
        // 禁用滚动事件
        refObject.scrollbarContainerRef.value?.removeEventListener("scroll", recomputedScrollBarHBind);
        // 记录初始偏移量
        const startOffset = e.pageX;
        // 记录滚动条初始位置
        const originMarginLeft = matchNumberReg.exec(refObject.scrollHorizontalBarRef.value!.style.marginLeft)?.[0];
        const originScrollLeft = refObject.scrollbarContainerRef.value!.scrollLeft;
        let scrollbarMoveEventBind = scrollbarHorizontalMoveEvent.bind(null, startOffset, refObject, originMarginLeft, originScrollLeft);
        document.addEventListener("mousemove", scrollbarMoveEventBind, false);
        // 取消事件
        let cancelEvent = () => {
            document.removeEventListener("mousemove", scrollbarMoveEventBind);
            document.removeEventListener("mouseup", cancelEvent);
            // 开启滚动监听
            refObject.scrollbarContainerRef.value?.addEventListener("scroll", recomputedScrollBarHBind);
        };
        document.addEventListener("mouseup", cancelEvent);
    }, false);
}

function recomputedScrollBarHorizontal(refObject: RefObject): void {
    if (!refObject.scrollHorizontalTrackRef.value) {
        return;
    }
    // 滚动条相对于文档的缩小率
    let narrowRate = refObject.scrollHorizontalTrackRef.value.clientWidth / refObject.scrollbarContentRef.value!.clientWidth;
    // 计算并设置横向滚动条长度
    let horizontalScrollLength = refObject.scrollbarContainerRef.value!.clientWidth * narrowRate;
    refObject.scrollHorizontalBarRef.value!.style.width = `${horizontalScrollLength}px`;
    // 计算滚动条的偏移量
    let horizontalScrollLeft = refObject.scrollbarContainerRef.value!.scrollLeft * narrowRate;
    horizontalScrollLeft = Math.max(0, horizontalScrollLeft);
    horizontalScrollLeft = Math.min(horizontalScrollLeft, refObject.scrollHorizontalTrackRef.value!.clientWidth - refObject.scrollHorizontalBarRef.value!.clientWidth);
    refObject.scrollHorizontalBarRef.value!.style.marginLeft = `${horizontalScrollLeft}px`;
}

// 驱动滚动条移动
function scrollbarHorizontalMoveEvent(
    startOffset: number,
    refObject: RefObject,
    originMarginLeft: string | undefined,
    originScrollLeft: number,
    e: MouseEvent
): void {
    let moveLength = e.pageX - startOffset;
    if (originMarginLeft) {
        let scrollLength = parseFloat(originMarginLeft) + moveLength;
        scrollLength = Math.max(0, scrollLength);
        scrollLength = Math.min(scrollLength, refObject.scrollHorizontalTrackRef.value!.clientWidth - refObject.scrollHorizontalBarRef.value!.clientWidth);
        refObject.scrollHorizontalBarRef.value!.style.marginLeft = `${scrollLength}px`;
        // 移动滚动条
        let narrowRate = refObject.scrollHorizontalTrackRef.value!.clientWidth / refObject.scrollbarContentRef.value!.clientWidth;
        refObject.scrollbarContainerRef.value!.scrollLeft = originScrollLeft + moveLength / narrowRate;
    }
}

/**
 * 竖向滚动
 * @param refObject dom集合 
 */
function initVerticalScrollBar(refObject: RefObject) {
    recomputedScrollBarVertical(refObject);
    // 监听滚动条 实时计算滚动条位置
    let recomputedScrollBarHBind = recomputedScrollBarVertical.bind(null, refObject);
    refObject.scrollbarContainerRef.value?.addEventListener("scroll", recomputedScrollBarHBind);
    // 监听竖向滚动条拖拽事件
    refObject.scrollVerticalBarRef.value?.addEventListener("mousedown", (e: MouseEvent) => {
        // 禁用滚动事件
        refObject.scrollbarContainerRef.value?.removeEventListener("scroll", recomputedScrollBarHBind);
        // 记录初始高度
        const startHeight = e.pageY;
        // 记录滚动条初始位置
        const originMargin = matchNumberReg.exec(refObject.scrollVerticalBarRef.value!.style.marginTop)?.[0];
        const originScroll = refObject.scrollbarContainerRef.value!.scrollTop;
        let scrollbarMoveEventBind = scrollbarVerticalMoveEvent.bind(null, startHeight, refObject, originMargin, originScroll);
        document.addEventListener("mousemove", scrollbarMoveEventBind, false);
        // 取消事件
        let cancelEvent = () => {
            document.removeEventListener("mousemove", scrollbarMoveEventBind);
            document.removeEventListener("mouseup", cancelEvent);
            // 开启滚动监听
            refObject.scrollbarContainerRef.value?.addEventListener("scroll", recomputedScrollBarHBind);
        };
        document.addEventListener("mouseup", cancelEvent);
    }, false);
}

// 驱动滚动条移动
function scrollbarVerticalMoveEvent(
    startHeight: number,
    refObject: RefObject,
    originMargin: string | undefined,
    originScroll: number,
    e: MouseEvent
): void {
    let moveLength = e.pageY - startHeight;
    // 获取滚动条原始的高度
    if (originMargin) {
        let scrollLength = parseFloat(originMargin) + moveLength;
        scrollLength = Math.max(0, scrollLength);
        scrollLength = Math.min(scrollLength, refObject.scrollVerticalTrackRef.value!.clientHeight - refObject.scrollVerticalBarRef.value!.clientHeight);
        refObject.scrollVerticalBarRef.value!.style.marginTop = `${scrollLength}px`;
        // 移动滚动条
        let narrowRate = refObject.scrollVerticalTrackRef.value!.clientHeight / refObject.scrollbarContentRef.value!.clientHeight;
        refObject.scrollbarContainerRef.value!.scrollTop = originScroll + moveLength / narrowRate;
    }
}

function recomputedScrollBarVertical(refObject: RefObject): void {
    if (!refObject.scrollVerticalTrackRef.value) {
        return;
    }
    // 滚动条相对于文档的缩小率
    let narrowRate = refObject.scrollVerticalTrackRef.value.clientHeight / refObject.scrollbarContentRef.value!.clientHeight;
    // 计算并设置竖向滚动条长度
    let verticalScrollLength = refObject.scrollbarContainerRef.value!.clientHeight * narrowRate;
    refObject.scrollVerticalBarRef.value!.style.height = `${verticalScrollLength}px`;
    // 计算滚动条的高度
    let verticalScrollTop = refObject.scrollbarContainerRef.value!.scrollTop * narrowRate;
    verticalScrollTop = Math.max(0, verticalScrollTop);
    verticalScrollTop = Math.min(verticalScrollTop, refObject.scrollVerticalTrackRef.value!.clientHeight - refObject.scrollVerticalBarRef.value!.clientHeight);
    refObject.scrollVerticalBarRef.value!.style.marginTop = `${verticalScrollTop}px`;
}