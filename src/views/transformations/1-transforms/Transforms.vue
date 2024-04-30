<script setup lang="ts">
import { vec3, mat4, vec4 } from "gl-matrix";
import { render } from './TransformWebGPU';
import { onMounted } from "vue";
import CanvasContainer from "@/components/CanvasContainer.vue";


const scaleVec = vec3.fromValues(0.5, 0.5, 2.5);
const outMat = mat4.create();
const testMat4 = mat4.fromScaling(
    outMat,
    scaleVec
);

const rotateVec = mat4.fromRotation(
    outMat,
    Math.PI / 4,
    vec3.fromValues(0, 1, 0)
);

const rotateX = mat4.fromXRotation(
    outMat,
    Math.PI / 4
);

onMounted(() => {
    render();
})

</script>
<template>
    <div>
        <h1>Transforms</h1>
    </div>
    <CanvasContainer />
</template>