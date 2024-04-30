<script setup lang="ts">
import CanvasContainer from '@/components/CanvasContainer.vue';
import { createBuffer } from '@/utils/gpu/createBuffer';
import { initGPU } from '@/utils/gpu/initGPU';
import { onMounted } from 'vue';

const render = async () => {
    const gpu = await initGPU('canvas');
    const device = gpu!.device;
    const viewTexture = gpu!.viewTexture;
    const swapchainFormat = gpu!.swapFormat;


    // Color uniform
    // TODO: 1) Se crea el buffer de color a usar en el uniform
    const colorData = new Float32Array([1.0, 0.0, 1.0, 1.0]);
    const colorUniformBuffer = createBuffer(device, colorData, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST);



    // Second part triangle buffer
    const triangleData = new Float32Array([
        0.0, 0.5, 0.0,
        -0.5, -0.5, 0.0,
        0.5, -0.5, 0.0
    ]);
    const triangleBuffer = createBuffer(device, triangleData, GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST);



    // Third part render pipeline
    const renderPipeline = device.createRenderPipeline({
        label: 'sexy-pipeline',
        // TODO: 2 se crea el layout dentro del createRenderPipeline
        layout: device.createPipelineLayout({
            bindGroupLayouts: [
                device.createBindGroupLayout({
                    entries: [
                        {
                            binding: 0,
                            visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
                            buffer: {
                                type: 'uniform'
                            }
                        }
                    ]
                })
            ]
        
        }),
        // layout:'auto',
        vertex: {
            module: device.createShaderModule({
                code: `
                    struct VertexInput {
                        @location(0) position: vec3<f32>
                    }

                    struct VertexOutput {
                        @builtin(position) position: vec4<f32>,
                        @location(1) color: vec4<f32>
                    }

                    @vertex
                    fn vertexMain(input: VertexInput) -> VertexOutput {
                        var output: VertexOutput;
                        output.color = vec4<f32>(1.0, 1.0, 0.0, 1.0);
                        output.position = vec4<f32>(input.position, 1.0);
                        return output;
                    }
                `
            }),
            entryPoint: 'vertexMain',
            buffers: [
                {
                    arrayStride: Float32Array.BYTES_PER_ELEMENT * 3,
                    attributes: [
                        {
                            shaderLocation: 0,
                            offset: 0,
                            format: 'float32x3'
                        }
                    ]
                }
            ]
        },
        fragment: {
            module: device.createShaderModule({
                code: `
                    // TODO: 4 se crea las entradas del uniform asignando su grupo y binding
                    struct Uniforms {
                        color: vec4<f32>
                    }
                    @group(0) @binding(0)
                    var<uniform> uniforms: Uniforms;

                    @fragment
                    fn fragmentMain() -> @location(0) vec4<f32> {
                        return uniforms.color;
                    }     
                `
            }),
            entryPoint: 'fragmentMain',
            targets: [
                {
                    format: swapchainFormat
                }
            ]
        },
        primitive: {
            topology: 'triangle-list'
        }
    });

    // TODO: 3 Se conecta el uniform buffer con el pipeline y el shader (se hace el BINDGROUP)
    // Conecta el uniform buffer con el pipeline y el shader
    const bindGroup = device.createBindGroup({
        layout: renderPipeline.getBindGroupLayout(0),
        entries: [{
            binding: 0,
            resource: {
                buffer: colorUniformBuffer
            }
        }]
    })
    // Get vertexShader error notification herer
    console.log(renderPipeline);


    // Fourth part render pass
    const commandEnconder = device.createCommandEncoder();
    const textureView = viewTexture;
    const renderPassDescriptor: GPURenderPassDescriptor = {
        colorAttachments: [
            {
                view: textureView,
                loadOp: 'clear',
                storeOp: 'store',
                clearValue: [0.1, 0.1, 0.1, 1]
            }
        ]
    }

    
    const passEncoder = commandEnconder.beginRenderPass(renderPassDescriptor);
    
    // Start the party
    passEncoder.setPipeline(renderPipeline);

    // TODO: 5 Se asigna el bindgroup al passEncoder
    passEncoder.setBindGroup(0, bindGroup);


    passEncoder.setVertexBuffer(0, triangleBuffer);
    passEncoder.draw(3, 1, 0, 0);
    passEncoder.end();

    const commandBuffer = commandEnconder.finish();
    device.queue.submit([commandBuffer]);

}

onMounted(() => {
    render();
});
    
</script>

<template>
    <div>
        <h1>Sandbox</h1>
        <p>Here you can test your code</p>
    </div>
    <CanvasContainer />
</template>