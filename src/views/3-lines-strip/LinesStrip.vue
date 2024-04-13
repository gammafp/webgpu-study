<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import { render } from "./render";
import CanvasContainer from "../../components/CanvasContainer.vue";

const lineOption = ref("line-list");

onMounted(() => {
    render(lineOption.value);
});

watch(lineOption, (newVal) => {
    render(newVal);
});
</script>

<template>
    <div>
        <div class="options">
            <label>
                <input type="radio" value="line-list" v-model="lineOption" />
                Line List
            </label>
            <label>
                <input type="radio" value="line-strip" v-model="lineOption" />
                Line Strip
            </label>
        </div>
    </div>
    <CanvasContainer />
</template>
