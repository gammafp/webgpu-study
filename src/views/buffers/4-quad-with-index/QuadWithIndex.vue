<script setup lang="ts">
import CanvasContainer from "@/components/CanvasContainer.vue";
import { onMounted } from "vue";
import { render } from "./FirstQuatRender";

onMounted(() => {
    render();
});
</script>
<template>
    <div class="d-flex flex-column justify-content-center align-items-center">
        <div>
            <h3>First Quad with Index</h3>
        </div>
        <CanvasContainer />
    </div>
</template>
