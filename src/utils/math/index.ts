import {} from "gl-matrix";

export const Round = (vecOrMat: any, precision: number) => {
    const result = vecOrMat.map((value: number) => {
        return Number(value.toFixed(precision));
    });
    return result;
};
