<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ApiTable, ApiEvent, ApiProps } from "../examples/example.typing";

export default defineComponent({
    props: {
        apiProps: {
            type: Object as PropType<ApiTable<ApiProps>>
        },
        apiEvent: {
            type: Object as PropType<ApiTable<ApiEvent>>
        }
    },
    setup() {
        
    },
})
</script>

<template>
    <div class="footer">
        <div class="api" v-if="apiProps!.content.length !== 0 || apiEvent!.content.length !== 0">
            <h2 id="api">API</h2>
            <div class="attr" v-if="apiProps!.content.length !== 0">
                <h3 id="props">属性</h3>
                <n-table striped :single-line="false">
                    <thead>
                        <tr>
                            <th v-for="(item, index) in apiProps!.header" :key="index"
                            style="font-weight: bolder;">
                                {{ item }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, key) in apiProps!.content" :key="key">
                            <td>{{item.props || '--'}}</td>
                            <td>{{item.describe || '--'}}</td>
                            <td>
                                <x-tag type="success">{{item.type}}</x-tag>
                            </td>
                            <td>{{item.defaultValue || '--'}}</td>
                            <td>
                                <template v-if="item.selectList">
                                    <n-space>
                                        <x-tag type="info" v-for="(item, id) in item.selectList" :key="id">
                                            {{item}}
                                        </x-tag>
                                    </n-space>
                                </template>
                                <template v-else>
                                    --
                                </template>
                            </td>
                        </tr>
                    </tbody>
                </n-table>
            </div>
            <div class="event" v-if="apiEvent!.content.length !== 0">
                <h3 id="event">事件</h3>
                <n-table striped :single-line="false">
                    <thead>
                        <tr>
                            <th v-for="(item, index) in apiEvent!.header" :key="index"
                            style="font-weight: bolder;">
                                {{ item }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, key) in apiEvent!.content" :key="key">
                            <td>{{item.event}}</td>
                            <td>{{item.describe}}</td>
                            <td>
                                <template v-if="item.result">
                                    <n-space>
                                        <x-tag type="warning" v-for="(item, id) in item.result" :key="id">
                                            {{item}}
                                        </x-tag>
                                    </n-space>
                                </template>
                                <template v-else>
                                    --
                                </template>
                            </td>
                            <td>
                                <template v-if="item.props">
                                    <n-space>
                                        <x-tag type="error" v-for="(item, id) in item.props" :key="id">
                                            {{item}}
                                        </x-tag>
                                    </n-space>
                                </template>
                                <template v-else>
                                    --
                                </template>
                            </td>
                        </tr>
                    </tbody>
                </n-table>
            </div>
        </div>
    </div>
</template>
<style lang="stylus" scoped>
#api, #props, #event
    margin 20px 0
.footer
    .api
        h2, h3
            font-weight 400
</style>