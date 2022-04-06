<script lang="ts">
import { computed, defineComponent } from 'vue';
import { ActionType } from "./Action.typing";
import * as Examples from "../../examples";

export default defineComponent({
    props: {
        componentName: {
            type: String
        },
    },
    setup(props) {
        return {
            "actions": computed<ActionType[]>(() => Examples[`${props.componentName!}Action`]),
        };
    },
})
</script>
<template>
    <div class="action">
        <n-anchor :show-rail="true" :show-background="true">
            <n-anchor-link
                v-for="item in actions"
                :title="item.name"
                :href="item.link" 
                :key="item.key"
            />
        </n-anchor>
    </div>
</template>
<style lang="stylus" scoped>
.action
    margin-top 26px
</style>