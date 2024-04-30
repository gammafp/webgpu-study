import { createLine } from "@/utils/shapes/createLine";
import VertexShaderSourcec from "./vertex.wgsl?raw";
import { mat4, vec3 } from "gl-matrix";
import { createViewProjection } from "@/utils/math/projection";
// @ts-expect-error Camera ya está definida
import createCamera from "../../../utils/camera";
import { CreateTransforms, CreateViewProjection } from "@/utils/math/helper";

console.log(createCamera);

export const render = async (isPerspective = true, isAnimation = true) => {
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

    // uniform data
    const modelMatrix = mat4.create();
    const mvpMatrix = mat4.create();
    let vMatrix = mat4.create();
    let vpMatrix = mat4.create();

    // const vp = createViewProjection(
    //     isPerspective,
    //     canvas.width / canvas.height
    // );
    const vp = CreateViewProjection(.5, [1.0, 200.0, 1.0])

    vpMatrix = vp.projectionMatrix;

    let rotation = vec3.fromValues(0, 0, 0);
    var camera = createCamera(canvas, vp.cameraOption);

    // Vertex shapes

    // prettier-ignore
    const lineData = createLine();

    const vertexBuffer = device.createBuffer({
        size: lineData.byteLength,
        usage: GPUBufferUsage.VERTEX,
        mappedAtCreation: true,
    });

    new Float32Array(vertexBuffer.getMappedRange()).set(lineData);
    vertexBuffer.unmap();

    // TODO: ESTO ES NUEVO
    // create uniform buffer and layout
    const sceneUniformBuffer = device.createBuffer({
        size: 64,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    const sceneUniformBindGroupLayout = device.createBindGroupLayout({
        entries: [
            {
                binding: 0,
                visibility: GPUShaderStage.VERTEX,
                buffer: {
                    type: "uniform",
                },
            },
        ],
    });

    const sceneUniformBindGroupd = device.createBindGroup({
        layout: sceneUniformBindGroupLayout,
        entries: [
            {
                binding: 0,
                resource: {
                    buffer: sceneUniformBuffer,
                },
            },
        ],
    });

    const shaderModule = device.createShaderModule({
        code: `
            @fragment
            fn fragment_main() -> @location(0) vec4<f32> {
                return vec4<f32>(1.0, 1.0, 0.0, 1.0);
            }
        `,
    });

    const vertexShaderModule = device.createShaderModule({
        code: VertexShaderSourcec,
    });




    const renderPipeline = device.createRenderPipeline({
        label: "render for quad",
        layout: device.createPipelineLayout({
            bindGroupLayouts: [sceneUniformBindGroupLayout],
        }),
        primitive: {
            topology: "line-strip",
         
        },
        
        vertex: {
            module: vertexShaderModule,
            entryPoint: "vertex_main",
            buffers: [
                {
                    arrayStride: 12,
                    attributes: [
                        {
                            shaderLocation: 0,
                            offset: 0,
                            format: "float32x3",
                            
                        },
                        
                    ],
                    
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

    const draw = () => {
        if(!isAnimation) {
            if(camera.tick()) {
                const pMatrix = vp.projectionMatrix;
                vMatrix = camera.viewMatrix;
                mat4.multiply(vpMatrix, pMatrix, vMatrix);
            }
        }

        const scale = 1;

        CreateTransforms(modelMatrix, [0, 0, 0], rotation, [scale, scale, scale]);

        mat4.multiply(mvpMatrix, vpMatrix, modelMatrix);

        //TODO: ESTO ES NUEVO
        device.queue.writeBuffer(sceneUniformBuffer, 0, mvpMatrix as ArrayBuffer);
        
        const commandEncoder = device.createCommandEncoder();
        const textureView = context.getCurrentTexture().createView();
        const passEncoder = commandEncoder.beginRenderPass({
            colorAttachments: [
                {
                    view: textureView,
                    clearValue: [0.1, 0.1, 0.1, 1],
                    loadOp: "clear",
                    storeOp: "store",
                },
            ],
        });
    
        passEncoder.setPipeline(renderPipeline);
        passEncoder.setVertexBuffer(0, vertexBuffer);

        // TODO: ESTO ES NUEVO
        passEncoder.setBindGroup(0, sceneUniformBindGroupd);
        passEncoder.draw(300, 1, 0, 0);
    
        passEncoder.end();
    
        const commandBuffer = commandEncoder.finish();
        device.queue.submit([commandBuffer]);

        requestAnimationFrame(draw);
    }

    draw();

    console.log(4 * (2 + 3) * 3 * 2);
};
