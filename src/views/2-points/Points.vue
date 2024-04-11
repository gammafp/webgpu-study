<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { render } from "./cap3";
import CanvasContainer from "@/components/CanvasContainer.vue";

onMounted(() => {
    render();
});

</script>

<template>
    <div>
        
    </div>
    <CanvasContainer />
</template>

