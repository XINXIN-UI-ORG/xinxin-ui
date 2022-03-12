<script lang="ts">
import { defineComponent, ref } from "vue";
import XRadio from "../src/XRadio.vue";

export default defineComponent({
  components: { XRadio },
    setup() {
        let r3Disabled = ref(true);
        return {
            r1: ref("1"),
            r2: ref("1"),
            r3: ref("1"),
            r3Disabled,
            toogleDisabledClick() {
                r3Disabled.value = !r3Disabled.value;
            },
            radioValue: ref(""),
            r4: ref(1),
            r5: ref(1),
            r6: ref(1),
            r7: ref(1),
            r8: ref(1),
            blurEvent(event: Event) {
                console.log(event);
            },
            focusEvent(event: Event) {
                console.log(event);
            },
        };
    },
});
</script>
<template>
    <div style="border: 1px solid #aaa; padding: 10px; margin-top: 10px">
        <p>单选框：</p>
        <p>
            单选：
            <x-radio v-model="radioValue" value="1">单选</x-radio>
            {{radioValue}}
        </p>
        <p>
            基础使用：
            <x-radio v-model="r1" value="1" name="r1">允许取消选择</x-radio>
            &nbsp;
            <x-radio v-model="r1" value="2" name="r1">单选2</x-radio>
            &nbsp;
            {{ r1 }}
        </p>
        <div style="width: 300px;">
            带描述：
            <x-radio v-model="r2" value="2" name="r2">
                带描述
                <template #description>
                    这是一段描述，这是一段描述，这是一段描述，这是一段描述，这是一段描述，这是一段描述，这是一段描述。
                </template>
            </x-radio>
        </div>
        <p>
            禁用：
            <x-radio v-model="r3" value="2" name="disabled"
            :disabled="r3Disabled">
                禁用
            </x-radio>
            &nbsp;
            {{ r3 }}
            <x-button @click="toogleDisabledClick">Toogle Disabled</x-button>
            <br>
            <x-radio v-model="r3" value="3" name="disabledDescription"
            :disabled="r3Disabled">
                禁用
                <template #description>
                    禁用描述
                </template>
            </x-radio>
        </p>
        <div>
            卡片样式:
            <x-radio v-model="r4" :value="2" card>
                卡片样式
            </x-radio>
            <div>
                <div style="width: 300px;">
                    <x-radio v-model="r5" :value="1" card>
                        卡片样式
                        <template #description>
                            卡片样式卡片样式卡片样式卡片样式
                            卡片样式卡片样式卡片样式卡片样式
                            卡片样式卡片样式卡片样式卡片样式
                            卡片样式卡片样式卡片样式卡片样式
                        </template>
                    </x-radio>
                </div>
                <br>
                <div style="width: 300px;">
                    <x-radio v-model="r5" :value="2" card>
                        卡片样式
                        <template #description>
                            卡片样式卡片样式卡片样式卡片样式
                            卡片样式卡片样式卡片样式卡片样式
                            卡片样式卡片样式卡片样式卡片样式
                            卡片样式卡片样式卡片样式卡片样式
                        </template>
                    </x-radio>
                </div>
                <br>
                <div style="width: 300px;">
                    <x-radio v-model="r5" :value="3" card>
                        卡片样式
                        <template #description>
                            卡片样式卡片样式卡片样式卡片样式
                            卡片样式卡片样式卡片样式卡片样式
                            卡片样式卡片样式卡片样式卡片样式
                            卡片样式卡片样式卡片样式卡片样式
                        </template>
                    </x-radio>
                </div>
            </div>
        </div>
        <p>
            事件：
            <x-radio v-model="r6" :value="1" @blur="blurEvent" name="event">
                blur事件
            </x-radio>
            &nbsp;
            <x-radio v-model="r6" :value="2" name="event" @focus="focusEvent">
                focus事件
            </x-radio>
        </p>
    </div>
</template>
