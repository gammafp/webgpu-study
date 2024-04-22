struct Uniforms {
    color: vec4<f32>,
    resolution: vec2f
}

struct VertexIn {
    @location(0) position: vec2<f32>,
    @location(1) color: vec3<f32>
}

struct VertexOut {
    @builtin(position) position: vec4<f32>,
    @location(0) color: vec3<f32>
}

@group(0) @binding(0) var<uniform> uni: Uniforms;

@vertex
fn vertex_main(config: VertexIn) -> VertexOut {
    var out: VertexOut;
    var zeroToOne = config.position * vec2<f32>(2.0, -2.0) - vec2<f32>(1.0, -1.0);

    out.position = vec4<f32>(zeroToOne, 0.0, 1.0);
    out.color = config.color;
    return out;
}
