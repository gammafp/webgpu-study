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

            const vertexPositions: array<vec2f, 9> = array<vec2f, 9>(
                vec2<f32>(-0.63, 0.80),
                vec2<f32>(-0.65, 0.20),
                vec2<f32>(-0.20, 0.60),
                vec2<f32>(-0.37, -0.07),
                vec2<f32>( 0.05, 0.18),
                vec2<f32>(-0.13, -0.40),
                vec2<f32>( 0.30, -0.13),
                vec2<f32>( 0.13, -0.64),
                vec2<f32>( 0.70, -0.30)
            );

            @vertex
            fn vertexMain(@builtin(vertex_index) vIndex: u32) -> @builtin(position) vec4f {
                return vec4f(vertexPositions[vIndex], 0.0, 1.0);
            }

            @fragment
            fn fragmentMain() -> @location(0) vec4f {
                let new_color = vec4f(0.98, 0.52, 0.447, 1.0); 
                return new_color;
            }
        `,
    });

    console.log("Triangle Options", triangleOption)

    // Create render pipeline
    const renderPipeline = device.createRenderPipeline({
        layout: "auto",
        vertex: {
            module: shaderModule,
            entryPoint: "vertexMain",
        },
        fragment: {
            module: shaderModule,
            entryPoint: "fragmentMain",
            targets: [
                {
                    format: swapChainFormat,
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

    passEncoder.setPipeline(renderPipeline);
    passEncoder.draw(9, 1, 0, 0);

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
        <CanvasContainer />
    </div>
</template>
