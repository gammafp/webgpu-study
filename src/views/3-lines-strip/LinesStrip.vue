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
        <div>
            <p>
                In this example, we draw a little lines in the screen.
                This is another primitive of webGPU.
            <br />
                You can choose between Line List and Line Strip.
            </p>
        </div>
        <hr>
        <div class="options m-2">
            <label class="mx-2">
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
