<script lang="ts">
import {
    computed,
    defineComponent,
    onMounted,
    onUnmounted,
    PropType,
    ref,
    Component,
} from "vue";
import { MessageType } from "./XMessageOptions.types";
import {
    InfoMessage,
    ErrorMessage,
    SuccessMessage,
    WarningMessage,
    Close,
} from "@xinxin-ui/xinxin-icons";

const MessageIconMap = {
    success: SuccessMessage,
    error: ErrorMessage,
    warning: WarningMessage,
    info: InfoMessage,
};

export default defineComponent({
    props: {
        offset: Number,
        message: {
            type: String,
            default: "",
        },
        onClose: Function as PropType<() => void>,
        id: String,
        type: {
            type: String as PropType<MessageType>,
            default: "info",
        },
        duration: {
            type: Number,
            default: 3000,
        },
        closable: {
            type: Boolean,
            default: false,
        },
        icon: Object as PropType<Component>,
    },
    setup(props) {
        let messageShow = ref(false);
        let timer: number;
        onMounted(() => {
            messageShow.value = true;
            timer = setTimeout(() => {
                messageShow.value = false;
            }, props.duration);
        });
        onUnmounted(() => {
            clearTimeout(timer);
        });
        let closeMessage = () => {
            messageShow.value = false;
            props.onClose?.();
        };
        return {
            messageShow,
            styles: computed(() => ({
                top: `${props.offset}px`,
            })),
            iconComponent: computed(
                () => props.icon ?? MessageIconMap[props.type]
            ),
            iconClass: computed(() => ["message-icon", "icon-" + props.type]),
            closeMessage,
        };
    },
    components: { Close },
});
</script>
<template>
    <transition
        name="x-message-fade"
        @before-leave="onClose"
        @after-leave="$emit('destory')"
    >
        <div class="x-message" v-show="messageShow" :style="styles">
            <component :class="iconClass" :is="iconComponent" />
            <span class="x-message__text">
                {{ message }}
            </span>
            <span
                class="x-message__close"
                v-if="closable"
                @click="closeMessage"
            >
                <Close class="x-message__close__icon" />
            </span>
        </div>
    </transition>
</template>
<style lang="stylus" scoped>
.x-message
    position fixed
    z-index 10000
    left 50%
    transform translateX(-50%)
    background-color #fff
    box-shadow 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)
    border-radius 5px
    transition-property opacity, transform, top
    transition-duration .4s
    padding 10px 15px
    .message-icon
        vertical-align -14%
        padding-right 5px
        width 18px
        height 18px
        &.icon-info
            color #1890ff
        &.icon-success
            color #52c41a
        &.icon-warning
            color #faad14
        &.icon-error
            color #f5222d
    .x-message__text
        font-size 14px
        color #606266
    .x-message__close
        vertical-align -20%
        margin-left 10px
        border-radius 3px
        cursor pointer
        padding 2px
        width 18px
        height 18px
        display inline-block
        &:hover
            background-color #efefef
            .x-message__close__icon
                color #424242
        .x-message__close__icon
            width 18px
            height 18px
            color #767676
            margin-bottom 1px
.x-message-fade-enter-from, .x-message-fade-leave-to
    transform translate(-50%, -100%)
    opacity 0
</style>
