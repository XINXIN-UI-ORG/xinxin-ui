<script lang="ts">
import { defineComponent, ref } from "vue";
import XMessage from "@xinxin-ui/components/XMessage";
import { RadioGroupProps } from "@xinxin-ui/main"


export default defineComponent({
    setup() {
        let r3Disabled = ref(true);
        let r13Disabled = ref(true);
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
            r9: ref(1),
            r10: ref(2),
            r11: ref(1),
            r12: ref(1),
            r13: ref(2),
            r13Disabled,
            r13ToogleDisabledClick() {
                r13Disabled.value = !r13Disabled.value;
            },
            blurEvent(event: Event) {
                console.log(event);
            },
            focusEvent(event: Event) {
                console.log(event);
            },
            changeEvent(value: RadioGroupProps['modelValue']) {
                XMessage({
                    message: '' + value,
                    closable: true,
                });
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
        <hr>
        <p>
            按钮组：
            <x-radio-group name="test" v-model="r9">
                <x-radio :value="1">组1</x-radio>
                <x-radio :value="2">组2</x-radio>
                <x-radio :value="3">组3</x-radio>
            </x-radio-group>
            &nbsp;
            {{r9}}
        </p>
        <p>
            按钮组禁用：
            <x-radio-group name="test1" v-model="r10" :disabled="r3Disabled">
                <x-radio :value="1">组1</x-radio>
                <x-radio :value="2">组2</x-radio>
                <x-radio :value="3">组3</x-radio>
            </x-radio-group>
            &nbsp;
            {{r10}}
            <x-button type="success" @click="toogleDisabledClick">Toogle Disabled</x-button>
        </p>
        <p>
            卡片按钮组：
            <x-radio-group name="test1" v-model="r10"
                style="width: 250px;">
                <x-radio :value="1" card>
                    组1
                    <template #description>
                        组1组1组1组1组1组1
                        组1组1组1组1组1组1
                        组1组1组1组1组1组1
                    </template>
                </x-radio>
                <x-radio :value="2" card>
                    组2
                    <template #description>
                        组2组2组2组2组2组2
                        组2组2组2组2组2组2
                        组2组2组2组2组2组2
                    </template>
                </x-radio>
                <x-radio :value="3" card>
                    组3
                    <template #description>
                        组3组3组3组3组3组3
                        组3组3组3组3组3组3
                        组3组3组3组3组3组3
                    </template>
                </x-radio>
            </x-radio-group>
            &nbsp;
            {{r10}}
        </p>
        <p>
            change事件：
            <x-radio-group name="test2" v-model="r11"
                @change="changeEvent">
                <x-radio :value="1">
                    组1
                </x-radio>
                <x-radio :value="2">
                    组2
                </x-radio>
                <x-radio :value="3">
                    组3
                </x-radio>
            </x-radio-group>
        </p>
        <hr>
        <p>
            radio button组合：
            <x-radio-group name="test button" v-model="r12">
                <x-radio-button :value="1">
                    动态推送
                </x-radio-button>
                <x-radio-button :value="2">
                    即时推送
                </x-radio-button>
                <x-radio-button :value="3">
                    定时推送
                </x-radio-button>
            </x-radio-group>
            &nbsp;
            {{r12}}
        </p>
        <p>
            radio button size：
            <br>
            <x-radio-group name="test button" v-model="r12" size="small">
                <x-radio-button :value="1">
                    动态推送
                </x-radio-button>
                <x-radio-button :value="2">
                    即时推送
                </x-radio-button>
                <x-radio-button :value="3">
                    定时推送
                </x-radio-button>
            </x-radio-group>
            <br><br>
            <x-radio-group name="test button" v-model="r12">
                <x-radio-button :value="1">
                    动态推送
                </x-radio-button>
                <x-radio-button :value="2">
                    即时推送
                </x-radio-button>
                <x-radio-button :value="3">
                    定时推送
                </x-radio-button>
            </x-radio-group>
            <br><br>
            <x-radio-group name="test button" v-model="r12" size="large">
                <x-radio-button :value="1">
                    动态推送
                </x-radio-button>
                <x-radio-button :value="2">
                    即时推送
                </x-radio-button>
                <x-radio-button :value="3">
                    定时推送
                </x-radio-button>
            </x-radio-group>
        </p>
        <p>
            radio button禁用：
            <x-radio-group name="test button" v-model="r13"
            :disabled="r13Disabled">
                <x-radio-button :value="1">
                    动态推送
                </x-radio-button>
                <x-radio-button :value="2">
                    即时推送
                </x-radio-button>
                <x-radio-button :value="3">
                    定时推送
                </x-radio-button>
            </x-radio-group>
            &nbsp;
            {{r13}}
            &nbsp;
            <x-button type="warning" @click="r13ToogleDisabledClick">Disabled Toggle</x-button>
        </p>
        <p>
            radio button change事件：
            <x-radio-group name="test button" v-model="r13"
            @change="changeEvent">
                <x-radio-button :value="1">
                    动态推送
                </x-radio-button>
                <x-radio-button :value="2">
                    即时推送
                </x-radio-button>
                <x-radio-button :value="3">
                    定时推送
                </x-radio-button>
            </x-radio-group>
        </p>
    </div>
</template>
