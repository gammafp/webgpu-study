<script setup lang="ts">
import { onMounted } from "vue";

import CanvasCotainer from "@/components/CanvasContainer.vue";

const render = async () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("webgpu") as GPUCanvasContext;

    // ask about gpu
    const gpu = navigator.gpu;
    if (!gpu) {
        console.log("WebGPU not supported");
        return;
    }
    // ask about adapter
    const adapter = await gpu.requestAdapter();
    if (!adapter) {
        console.log("No adapter found");
        return;
    }
    // ask about device
    const device = await adapter.requestDevice();

    // config swapchain
    const swapChainFormat = "bgra8unorm";
    context.configure({
        device,
        format: navigator.gpu.getPreferredCanvasFormat() || swapChainFormat,
    });

    // create shader module
    const shaderModule = device.createShaderModule({
        code: `
            const pos_constant = array<vec3f, 3>(
                vec3f(0.0, 0.5, 0),
                vec3f(-0.5, -0.5, 0),
                vec3f(0.5, - 0.5, 0)
            );
            
            // Shader entry points can be named whatever you want, and you can have
            // as many as you want in a single shader module.
            @vertex
            fn vertexMain(@builtin(vertex_index) in: u32) -> @builtin(position) vec4<f32> {
                var position = vec4f(pos_constant[in], 1);
                return position;
            }

            @fragment
            fn fragmentMain() -> @location(0) vec4f {
                let new_color = vec4f(1, 0, 0, 1.0); 
                return new_color;
            }
        `,
    });

    // Create render pipeline
    const pipeline = device.createRenderPipeline({
        layout: "auto",
        vertex: {
            module: shaderModule,
            entryPoint: "vertexMain",
            buffers: [],
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
    });

    // Create command encoder
    const commandEncoder = device.createCommandEncoder();
    const renderPassDescriptor: GPURenderPassDescriptor = {
        colorAttachments: [
            {
                view: context.getCurrentTexture().createView(),
                clearValue: [0.6, 0.6, 0.6, 1],
                loadOp: "clear",
                storeOp: "store",
            },
        ],
    };

    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
    passEncoder.setPipeline(pipeline);
    passEncoder.draw(3, 1, 0, 0);
    passEncoder.end();

    const commandBuffer = commandEncoder.finish();
    device.queue.submit([commandBuffer]);
};

onMounted(() => {
    render();
});
</script>

<template>
    <div class="d-flex flex-column justify-content-center align-items-center">
        <p class="text-center">
            This is the first primitive example of a triangle using WebGPU.
            The triangle is drawn using a shader module that defines the vertex and fragment shaders.
        </p>
        <CanvasCotainer />
    </div>
</template>
