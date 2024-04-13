<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { render } from "./cap3";
import CanvasContainer from "@/components/CanvasContainer.vue";

onMounted(() => {
    render();
});

</script>

<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
        <p class="text-center">
            In this example, we draw a little points in the screen.
            This is another primitive of WebGPU.
            <br />
            
            the passEncoder.draw has been changed to accept 6 points, 1 instance, 0 offset, 0 offset.
<pre>
    <code class="language-javascript">
        const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
        passEncoder.draw(6, 1, 0, 0);
    </code>
</pre>
        </p>
        <CanvasContainer />
    </div>
</template>

