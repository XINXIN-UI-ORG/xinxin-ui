import { ExtractPropTypes, computed, onMounted, watchEffect, onUnmounted } from "vue";
import type { Ref, SetupContext } from "vue";
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

export const scrollbarEmits = {
    scroll: null,
};

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

export type ScrollPosition = {
    scrollTop: number,
    scrollLeft: number,
};

export function useScrollbar(
    props: ScrollbarPropsType,
    refObject: RefObject,
    expose: (exposed?: Record<string, any>) => void,
    emit: SetupContext<typeof scrollbarEmits>['emit'],
) {
    // 滚动条是否初始化
    let verticalInitialize = false;
    let horizontalInitialize = false;
    // 重新计算滚动条事件以及位置
    let scrollbarInitGather = () => {
        // 计算是否需要显示滚动条
        if (showVerticalBar(refObject)) {
            recomputedScrollBarVertical(refObject);
            // 判断滚动条是否初始化过 长度超过了且没有初始化过才执行初始化方法
            if (!verticalInitialize) {
                initVerticalScrollBar(refObject);
                verticalInitialize = true;
            }
        }
        if (showHorizontalBar(refObject, props)) {
            recomputedScrollBarHorizontal(refObject);
            // 判断滚动条是否初始化过 长度超过了且没有初始化过才执行初始化方法
            if (!horizontalInitialize) {
                initHorizontalScrollBar(refObject);
                horizontalInitialize = true;
            }
        }
    };
    onMounted(() => {
        watchEffect(scrollbarInitGather);
        // 监听容器高度的变化 同步更新滚动条的长度
        const observe = new ResizeObserver(scrollbarInitGather);
        observe.observe(refObject.scrollbarContentRef.value!);

        // 监听页面是否变化
        window.addEventListener("resize", scrollbarInitGather);

        // 监听滚动方法
        refObject.scrollbarContainerRef.value?.addEventListener("scroll", () => {
            emit("scroll", {
                "scrollTop": refObject.scrollbarContainerRef.value?.scrollTop,
                "scrollLeft": refObject.scrollbarContainerRef.value?.scrollLeft,
            } as ScrollPosition);
        });

        onUnmounted(() => {
            observe.disconnect();
            window.removeEventListener("resize", scrollbarInitGather);
        });
    });
    // 导出方法
    expose({
        getContainerDom(): HTMLDivElement {
            return refObject.scrollbarContainerRef.value!;
        },
        scrollTo(options: ScrollToOptions) {
            refObject.scrollbarContainerRef.value && refObject.scrollbarContainerRef.value.scrollTo(options);
        },
        scrollBy(options: ScrollToOptions) {
            refObject.scrollbarContainerRef.value && refObject.scrollbarContainerRef.value.scrollBy(options);
        },
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
        }))
    };
}

function showVerticalBar(refObject: RefObject): boolean {
    let result = false;
    if (refObject.scrollbarContainerRef.value && refObject.scrollbarContentRef.value) {
        result = refObject.scrollbarContentRef.value.clientHeight > refObject.scrollbarContainerRef.value.clientHeight;
    }
    refObject.scrollVerticalTrackRef.value && (refObject.scrollVerticalTrackRef.value.style.display = result ? 'block' : 'none');
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
    refObject.scrollHorizontalTrackRef.value && (refObject.scrollHorizontalTrackRef.value.style.display = result ? 'block' : 'none');
    return result;
}

/**
 * 横向滚动
 * @param refObject dom集合
 */
function initHorizontalScrollBar(refObject: RefObject) {
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
    let trackWidth = refObject.scrollbarContainerRef.value!.clientWidth - 4;
    // 滚动条相对于文档的缩小率
    let narrowRate = trackWidth / refObject.scrollbarContentRef.value!.clientWidth;
    // 计算并设置横向滚动条长度
    let horizontalScrollLength = refObject.scrollbarContainerRef.value!.clientWidth * narrowRate;
    refObject.scrollHorizontalBarRef.value!.style.width = `${horizontalScrollLength}px`;
    // 计算滚动条的偏移量
    let horizontalScrollLeft = refObject.scrollbarContainerRef.value!.scrollLeft * narrowRate;
    horizontalScrollLeft = Math.max(0, horizontalScrollLeft);
    horizontalScrollLeft = Math.min(horizontalScrollLeft, trackWidth - refObject.scrollHorizontalBarRef.value!.clientWidth);
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
        let cancelEvent = (e: Event) => {
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
    let trackHeight = refObject.scrollbarContainerRef.value!.clientHeight - 4;
    // 滚动条相对于文档的缩小率
    let narrowRate = trackHeight / refObject.scrollbarContentRef.value!.clientHeight;
    // 计算并设置竖向滚动条长度
    let verticalScrollLength = refObject.scrollbarContainerRef.value!.clientHeight * narrowRate;
    refObject.scrollVerticalBarRef.value!.style.height = `${verticalScrollLength}px`;
    // 计算滚动条的高度
    let verticalScrollTop = refObject.scrollbarContainerRef.value!.scrollTop * narrowRate;
    verticalScrollTop = Math.max(0, verticalScrollTop);
    verticalScrollTop = Math.min(verticalScrollTop, trackHeight - refObject.scrollVerticalBarRef.value!.clientHeight);
    refObject.scrollVerticalBarRef.value!.style.marginTop = `${verticalScrollTop}px`;
}
