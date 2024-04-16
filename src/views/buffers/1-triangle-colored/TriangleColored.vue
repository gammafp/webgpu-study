<script setup lang="ts">
import CanvasContainer from "@/components/CanvasContainer.vue";
import { onMounted, ref, watch } from "vue";

const render = async (triangleOption: GPUPrimitiveTopology = 'triangle-list') => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("webgpu") as GPUCanvasContext;

    let stripTriangleFormat: GPUIndexFormat | undefined = (triangleOption === 'triangle-strip') ? 'uint32': undefined ;

    const gpu = navigator.gpu;
    if (!gpu) {
        console.log("WebGPU not supported");
        return;
    }

    const adapter = await gpu.requestAdapter();
    if (!adapter) {
        console.log("No adapter found");
        return;
    }
    const device = await adapter.requestDevice();

    const swapChainFormat = "bgra8unorm";
    context.configure({
        device,
        format: navigator.gpu.getPreferredCanvasFormat() || swapChainFormat,
    });

    // Create shader module
    const shaderModule = device.createShaderModule({
        code: `

            struct VertexIn {
                @location(0) position: vec2<f32>,
                @location(1) color: vec4f,
            }

            struct VertexOut {
                @builtin(position) position: vec4<f32>,
                @location(0) color: vec4<f32>,
            };

            @vertex
            fn vertexMain(entrada: VertexIn) -> VertexOut {
                var output: VertexOut;
                output.position = vec4<f32>(entrada.position, 0.0, 1.0);
                output.color = entrada.color;
                return output;
            }

            @fragment
            fn fragmentMain(@location(0) color: vec4f) -> @location(0) vec4f {
                return color;
            }
        `,
    });


    const vertexData = new Float32Array([
        -0.63, 0.80,
        -0.65, 0.20,
        -0.20, 0.60
    ]);

    const vertexBuffer = device.createBuffer({
        size: vertexData.byteLength * 3,
        usage: GPUBufferUsage.VERTEX,
        mappedAtCreation: true,
    });

    new Float32Array(vertexBuffer.getMappedRange()).set(vertexData);
    vertexBuffer.unmap();

    // Color buffer
    const colorData = new Uint8Array([
        250, 255, 0, 255,
        250, 0, 0, 255,
        0, 255, 255, 255,
    ]);
    const colorBuffer = device.createBuffer({
        size: colorData.byteLength * 3,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
        mappedAtCreation: true,
    });

    new Uint8Array(colorBuffer.getMappedRange()).set(colorData);
    colorBuffer.unmap();

    // Create render pipeline
    const renderPipeline = device.createRenderPipeline({
        layout: "auto",
        vertex: {
            module: shaderModule,
            entryPoint: "vertexMain",
            buffers: [
                {
                    arrayStride: Float32Array.BYTES_PER_ELEMENT * 2,
                    attributes: [
                        {
                            shaderLocation: 0,
                            offset: 0,
                            format: "float32x2",
                        }
                    ]
                }, 
                {
                    arrayStride: Uint8Array.BYTES_PER_ELEMENT * 4,
                    attributes: [
                        {
                            shaderLocation: 1,
                            offset: 0,
                            format: "unorm8x4",
                        }
                    ]
                }
            ],
        },
        fragment: {
            module: shaderModule,
            entryPoint: "fragmentMain",
            targets: [
                {
                    format: 'bgra8unorm',
                },
            ],
        },
        primitive: {
            topology: triangleOption,
            stripIndexFormat: stripTriangleFormat
        },
    });

    const commandEncoder = device.createCommandEncoder();
    const textureView = context.getCurrentTexture().createView();

    const renderPassDescriptor: GPURenderPassDescriptor = {
        colorAttachments: [
            {
                view: textureView,
                clearValue: [0.0, 0.0, 0.0, 1.0],
                storeOp: "store",
                loadOp: 'clear'
            },
        ],
    };


    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);

    passEncoder.setVertexBuffer(0, vertexBuffer);
    passEncoder.setVertexBuffer(1, colorBuffer);

    passEncoder.setPipeline(renderPipeline);
    passEncoder.draw(3, 1, 0, 0);

    passEncoder.end();

    const endBuffer = commandEncoder.finish();
    device.queue.submit([endBuffer]);

}
const triangleOption = ref("triangle-list");

watch(triangleOption, (newVal) => {
    render(newVal as GPUPrimitiveTopology);
});

onMounted(() => {
    render(triangleOption.value as GPUPrimitiveTopology);
});

</script>

<template>
    <div class="d-flex flex-column justify-content-center align-items-center">
        <p class="text-center"><h3>Triangle Colored</h3></p>

        <p>
                In this example, we draw a triangle with colors in the screen.
                <br />
                You can use a different buffer for the colors in this case we use a uint8Array like data source.
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
                                The triangle have a different buffer to print the colors and the fragment shader receive this color from the vertext (and the buffer set).
                                <br />
                                code:
<pre>
<code class="language-javascript">
// The color buffer creation:
const colorBuffer = device.createBuffer({
    size: colorData.byteLength * 3,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    mappedAtCreation: true,
});

new Uint8Array(colorBuffer.getMappedRange()).set(colorData);
colorBuffer.unmap();

...

// The render pipeline buffer description (for the color buffer):
device.createRenderPipeline({
    layout: "auto",
    vertex: {
        module: shaderModule,
        entryPoint: "vertexMain",
        buffers: [{
            arrayStride: Uint8Array.BYTES_PER_ELEMENT * 4,
            attributes: [
                {
                    shaderLocation: 1,
                    offset: 0,
                    format: "unorm8x4",
                }
            ]
        }]
    }
});

...

// The shaders:
struct VertexIn {
    @location(0) position: vec2f,
    @location(1) color: vec4f,
}

struct VertexOut {
    @builtin(position) position: vec4f,
    @location(0) color: vec4f,
};

@vertex
fn vertexMain(entrada: VertexIn) -> VertexOut {
    var output: VertexOut;
    output.position = vec4f(entrada.position, 0.0, 1.0);
    output.color = entrada.color;
    return output;
}

@fragment
fn fragmentMain(@location(0) color: vec4f) -> @location(0) vec4f {
    return color;
}

...

// Set the color buffer in the passEncoder:
passEncoder.setVertexBuffer(1, colorBuffer);
</code>
</pre>
                               </p>
                        </div>
                    </div>
                </div>


            </div>
        
        <CanvasContainer />
    </div>
</template>
