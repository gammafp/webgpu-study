export const initGPU = async (id: string) => {
        // First part   
        const canvas = document.querySelector(`#${id}`) as HTMLCanvasElement;
        const context = canvas.getContext('webgpu') as GPUCanvasContext; 
        const gpu = navigator.gpu as GPU;
    
        const adapter = await gpu.requestAdapter();
        const device = await adapter?.requestDevice();
        if(!device) return;
    
        const swapFormat = gpu.getPreferredCanvasFormat();
    
        context.configure({
            device,
            format: swapFormat
        });

        // create view from the canvas
        const viewTexture = context.getCurrentTexture().createView();
        return { device, context, swapFormat, viewTexture };
}