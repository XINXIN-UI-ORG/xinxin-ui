<script lang="ts">
import { defineComponent } from "vue";
import { Star } from "@xinxin-ui/xinxin-icons";

export default defineComponent({
    setup() {
        
    },
    components: {
        Star,
    },
})
</script>
<template>
    <div class="wrap">
        <Star class="star" />
        <Star class="star" />
        <Star class="star" />
        <Star class="star" />
        <Star class="star" />
    </div>
</template>
<style scoped>
.wrap {
    display: flex;
    justify-content: space-between;
}
.wrap .star {
    color: #f5a31f;
    width: 26px;
    height: 26px;
}

.wrap .star:nth-of-type(2) {
    color: #0077fa;
}
.wrap .star:nth-of-type(3) {
    color: #41b883;
}
.wrap .star:nth-of-type(4) {
    color: #d03050;
}
</style>