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
            <p>
                This is the first quad we are going to render. It is a simple
                quad with 4 vertices.
                <br />
                We are going to use index buffer how to use the vertice to
                render the quad.
            </p>
            <p>
                With this approach, we can reuse the vertices and reduce the
                number of vertices we need to render.
                <br />
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
                            We have this vertices array:
<!-- prettier ignore -->
<pre>
<code class="language-javascript">
// prettier-ignore
const vertexData = new Float32Array([
    // Position     // Color
    -0.5, -0.5,     1, 0, 0, // index 0 
    0.5, -0.5,      0, 1, 0, // index 1
    -0.5, 0.5,      1, 1, 0, // index 2
    0.5, 0.5,       0, 0, 1, // index 3
]);

// Create the index buffer to use (0, 1, 2, 1, 2, 3)
/*
-0.5, 0.5| 2-----3 0.5, 0.5
           |  \  |
           |    \|
-0.5,-0.5| 0-----1 0.5,-0.5
*/
const indexData = new Uint32Array([0, 1, 2, 1, 2, 3]);
const indexBuffer = device.createBuffer({
    size: indexData.byteLength,
    usage: GPUBufferUsage.INDEX,
    mappedAtCreation: true,
});
new Uint32Array(indexBuffer.getMappedRange()).set(indexData);
indexBuffer.unmap();

</code>
</pre>
                                
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr />
        <CanvasContainer />
    </div>
</template>
