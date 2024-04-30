export const createLine = () => {
    let data = [];
    for (let i = 0; i < 300; i++) {
        let t = 0.1 * i / 30;
        let x = Math.exp(-t) * Math.sin(30 * t);
        let z = Math.exp(-t) * Math.cos(30 * t);
        let y = 2 * t - 1;
        data.push(x, y, z);
    }

    return new Float32Array(data.flat(1));
};
