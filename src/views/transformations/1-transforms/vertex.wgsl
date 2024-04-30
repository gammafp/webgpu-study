struct Uniforms {
    mvpMatrix: mat4x4<f32>,
}
@binding(0) @group(0) var<uniform> uniforms: Uniforms;

struct VertexIn {
    @location(0) position: vec4<f32>,
}

@vertex
fn vertex_main(config: VertexIn) -> @builtin(position) vec4f {
    var out: vec4<f32> = uniforms.mvpMatrix * config.position;

    return out;
}
