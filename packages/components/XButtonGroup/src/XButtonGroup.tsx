import { defineComponent, PropType, ref, onMounted } from "vue";

type DirectionType = "horizontal" | "vertical";

const XButtonGroup = defineComponent({
    name: "x-button-group",
    props: {
        direction: {
            type: String as PropType<DirectionType>,
            default: "horizontal"
        }
    },
    setup(props, { slots }) {
        let xButtonGroupRef = ref<HTMLDivElement>();
        onMounted(() => {
            // 获取按钮组下所有的按钮
            let xButtonList: NodeListOf<HTMLButtonElement> | undefined;
            xButtonList = xButtonGroupRef.value?.querySelectorAll<HTMLButtonElement>(".x-button");
            if (xButtonList !== undefined && xButtonList.length > 0) {
                // 处理中间的按钮 将圆角都去掉
                xButtonList.forEach((item, index) => {
                    // 处理边框 防止两个按钮见的边框过宽 选择去掉一个按钮的边框
                    if (index !== xButtonList!.length - 1) {
                        props.direction === "horizontal"
                            ? item.style.borderRightWidth = "0"
                            : item.style.borderBottomWidth = "0";
                    }
                    if (index === 0 || index === xButtonList!.length - 1) {
                        // 首尾元素暂时不用处理
                        return;
                    }
                    item.style.borderRadius = "0";
                });
                // 处理首尾按钮 判断按钮排列方向去除不同位置的圆角
                if (props.direction === "horizontal") {
                    changeHorizontalStyle(xButtonList[0], xButtonList[xButtonList.length - 1]);
                    changeHorizontalStyle(xButtonList[0].querySelector(".x-button__click")!,
                        xButtonList[xButtonList.length - 1].querySelector(".x-button__click")!);
                }
                if (props.direction === "vertical") {
                    changeVerticalStyle(xButtonList[0], xButtonList[xButtonList.length - 1]);
                    changeVerticalStyle(xButtonList[0].querySelector(".x-button__click")!,
                        xButtonList[xButtonList.length - 1].querySelector(".x-button__click")!);
                }
            }
        });
        return () => (
            <div class="x-button-group" ref={xButtonGroupRef} style={groupStyle[props.direction]()}>
                {
                    slots.default ? slots.default()
                    : <span>放点东西吧~</span>
                }
            </div>
        );
    },
});

const groupStyle = {
    "common": {
        display: "inline-flex",
    },
    // 按钮组竖直排列
    vertical() {
        return {
            ...this.common,
            'flex-direction': 'column',
        };
    },
    // 按钮组横向排列
    horizontal() {
        return {
            ...this.common,
        }
    }
};

function changeHorizontalStyle(firstChangeDom: HTMLElement, lastChangeDom: HTMLElement) {
    firstChangeDom.style.borderTopRightRadius = "0";
    firstChangeDom.style.borderBottomRightRadius = "0";
    lastChangeDom.style.borderTopLeftRadius = "0";
    lastChangeDom.style.borderBottomLeftRadius = "0";
}

function changeVerticalStyle(firstChangeDom: HTMLElement, lastChangeDom: HTMLElement) {
    firstChangeDom.style.borderBottomLeftRadius = "0";
    firstChangeDom.style.borderBottomRightRadius = "0";
    lastChangeDom.style.borderTopLeftRadius = "0";
    lastChangeDom.style.borderTopRightRadius = "0";
}

export default XButtonGroup;
