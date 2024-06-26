import { shaders } from "./shaders";

export const render = async () => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const context = canvas.getContext('webgpu') as GPUCanvasContext;

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
    const swapChainFormat = 'bgra8unorm';
    context.configure({
        device,
        format: navigator.gpu.getPreferredCanvasFormat() || swapChainFormat
    });

    // create shader module
    const shaderModuleVertex = device.createShaderModule({
        code: shaders.wgsl.vertexPoints
    });
    
    const shaderModuleFragment = device.createShaderModule({
        code: shaders.wgsl.fragment
    });

    // Create render pipeline
    const pipeline = device.createRenderPipeline({
        layout: 'auto',
        primitive: {
            topology: 'point-list'
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

    // Create command encoder
    const commandEncoder = device.createCommandEncoder();
    const renderPassDescriptor: GPURenderPassDescriptor = {
        colorAttachments: [
            {
                view: context.getCurrentTexture().createView(),
                clearValue: [0, 0, 0, 1],
                loadOp: 'clear',
                storeOp: 'store'
            }
        ]
    };

    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
    passEncoder.setPipeline(pipeline);
    passEncoder.draw(6, 1, 0, 0);
    passEncoder.end();

    const commandBuffer = commandEncoder.finish();
    device.queue.submit([commandBuffer]);   
}
