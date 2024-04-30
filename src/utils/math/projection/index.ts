import { mat4, type vec3 } from 'gl-matrix';

export const CameraPosition: vec3 = [2, 2, 4];
export const LookDirection: vec3 = [0, 0, 0];
export const UpDirection: vec3 = [0, 1, 0];

export const createViewProjection = (isPerspective: boolean, respectRation: number) => {

    const viewMatrix = mat4.create();
    const projectionMatrix = mat4.create();
    const viewProjectionMatrix = mat4.create();

    if (isPerspective) {
        mat4.perspective(projectionMatrix, 2*Math.PI / 5, respectRation, 0.1, 100);
    } else {
        mat4.ortho(projectionMatrix, -2, 2, -2, 2, 0.1, 100);
    }

    mat4.lookAt(viewMatrix, CameraPosition, LookDirection, UpDirection);
    mat4.multiply(viewProjectionMatrix, projectionMatrix, viewMatrix);

    const cameraOption = {
        eye: CameraPosition,
        center: LookDirection,
        zoomMax: 100,
        zoomMin: 2,
    }

    return {
        viewMatrix,
        projectionMatrix,
        viewProjectionMatrix,
        cameraOption
    };

}