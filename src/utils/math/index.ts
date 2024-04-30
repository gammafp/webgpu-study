import {} from "gl-matrix";

export const Round = (vecOrMat: any, precision: number) => {
    const result = vecOrMat.map((value: number) => {
        return Number(value.toFixed(precision));
    });
    return result;
};

export const Translate = (vec: any, x: number, y: number, z: number) => {
    vec[0] += x;
    vec[1] += y;
    vec[2] += z;
    return vec;
}

export const Scale = (vec: any, x: number, y: number, z: number) => {
    vec[0] *= x;
    vec[1] *= y;
    vec[2] *= z;
    return vec;
}

