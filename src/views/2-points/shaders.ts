export const shaders = {
    "wgsl": {
        "vertex": `
        const pos_constant: array<vec3f, 3>  = array<vec3<f32>, 3>(
            vec3f(0.0, 0.5, 0),
            vec3f(-0.5, -0.5, 0),
            vec3f(0.5, - 0.5, 0)
        );

        // Shader entry points can be named whatever you want, and you can have
        // as many as you want in a single shader module.
        @vertex
        fn main(@builtin(vertex_index) in: u32) -> @builtin(position) vec4f {
            var pos = vec4f(pos_constant[in], 1);
            return pos;
        }
        `,
        "vertexPoints": `

        const pos_constant = array<vec2f, 6>(
            vec2f(-0.5, 0.7),
            vec2f(0.3, 0.6),
            vec2f(0.5, 0.3),
            vec2f(0.4, -0.5),
            vec2f(-0.4, -0.4),
            vec2f(-0.3, 0.2)
        );

        @vertex
        fn main(@builtin(vertex_index) index: u32) -> @builtin(position) vec4f {
            var pos = vec4f(pos_constant[index], 0, 1);
            return pos;
        }
        `,
        "fragment": `
        @fragment
        fn main() -> @location(0) vec4f {
            let new_color = vec4f(1, 1, 0, 1.0); 
            return new_color;
        }
    `,

    }
}