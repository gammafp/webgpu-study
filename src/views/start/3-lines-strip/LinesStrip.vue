<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import { render } from "./render";
import CanvasContainer from "@/components/CanvasContainer.vue";

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
                In this example, we draw a little lines in the screen. This is
                another primitive of webGPU.
                <br />
                You can choose between Line List and Line Strip.
            </p>
            <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                        <button
                            class="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                        >
                            Notes:
                        </button>
                    </h2>
                    <div
                        id="collapseOne"
                        class="accordion-collapse collapse"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                    >
                        <div class="accordion-body">
                            <p>
                                The line-strip have a different strip index format, this format is include inside the renderPipeline.
                                <br />
                                If you use topology without -strip you can't use strip index format and you need set this stripIndexFormat to undefined.
                                <br />
                                If you use topology with -strip you need set the stripIndexFormat to the correct format (uint16 or uint32).
                                <br />
                                The type of stripIndexFormat is GPUIndexFormat.
                                <br />
                                <br />
                                code:
<pre>
<code class="language-javascript">
const pipeline = device.createRenderPipeline({
layout: 'auto',
primitive: {
    topology: lineOption === "line-strip" ? 'line-strip' : 'line-list',
    
},
vertex: {
    module: shaderModuleVertex,
    entryPoint: 'main'
},
fragment: {
    module: shaderModuleFragment,
    entryPoint: 'main',
    targets: [
        {
            format: swapChainFormat
        }
    ]
},
});
</code>
</pre>
                                <a href="https://pub.dev/documentation/js_bindings/latest/webgpu/GPUIndexFormat.html">To more info CLICK HERE.</a>
                            </p>
                        </div>
                    </div>
                </div>


            </div>
        </div>
        <hr />
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
