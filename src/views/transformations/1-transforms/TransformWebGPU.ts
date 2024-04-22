import VertexShaderSourcec from './vertex.wgsl?raw';

export const render = async () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("webgpu") as GPUCanvasContext;

    const gpu = navigator.gpu as GPU;
    const adapter = await gpu.requestAdapter();
    const device = await adapter?.requestDevice();

    const swapChainFormat = "bgra8unorm";
    context.configure({
        device: device!,
        format: swapChainFormat,
    });

    if (!device) {
        return;
    }

    // prettier-ignore
    const vertexData = new Float32Array([
        // Position     // Color
        -0.5, -0.5,     1, 0, 0, 
        0.5, -0.5,      0, 1, 0,
        -0.5, 0.5,      1, 1, 0,
        -0.5, 0.5,      1, 1, 0,
        0.5, -0.5,      0, 1, 0,
        0.5, 0.5,       0, 0, 1,
    ]);

    const vertexBuffer = device.createBuffer({
        size: vertexData.byteLength,
        usage: GPUBufferUsage.VERTEX,
        mappedAtCreation: true,
    });

    new Float32Array(vertexBuffer.getMappedRange()).set(vertexData);
    vertexBuffer.unmap();


    const shaderModule = device.createShaderModule({
        code: `
            @fragment
            fn fragment_main(@location(0) color: vec3<f32>) -> @location(0) vec4<f32> {
                return vec4<f32>(color, 1.0);
            }
        `
    });


    const vertexShaderModule = device.createShaderModule({
        code: VertexShaderSourcec
    });


    const renderPipeline = device.createRenderPipeline({
        label: "render for quad",
        layout: "auto",
        vertex: {
            module: vertexShaderModule,
            entryPoint: "vertex_main",
            buffers: [
                {
                    arrayStride: Float32Array.BYTES_PER_ELEMENT * 5,
                    attributes: [
                        {
                            shaderLocation: 0,
                            offset: 0,
                            format: "float32x2"
                        },
                        {
                            shaderLocation: 1,
                            offset: Float32Array.BYTES_PER_ELEMENT * 2,
                            format: "float32x3"
                        }
                    ]
                }
            ],
        },
        fragment: {
            module: shaderModule,
            entryPoint: "fragment_main",
            targets: [
                {
                    format: "bgra8unorm",
                },
            ],
        },
    });

    const commandEncoder = device.createCommandEncoder();
    const textureView = context.getCurrentTexture().createView();
    const passEncoder = commandEncoder.beginRenderPass({
        colorAttachments: [
            {
                view: textureView,
                clearValue: [.7, .7, .7, 1],
                loadOp: "clear",
                storeOp: "store"
            }
        ]
    });

    passEncoder.setPipeline(renderPipeline);
    passEncoder.setVertexBuffer(0, vertexBuffer);
    passEncoder.draw(6, 1, 0, 0);

    passEncoder.end();

    const commandBuffer = commandEncoder.finish();
    device.queue.submit([commandBuffer])

    console.log(4 * (2 + 3) * 3 * 2);
};