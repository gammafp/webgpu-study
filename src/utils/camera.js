var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

var global = globalThis;

// node_modules/right-now/browser.js
var require_browser = __commonJS((exports, module) => {
  module.exports = global.performance && global.performance.now ? function now() {
    return performance.now();
  } : Date.now || function now() {
    return +new Date;
  };
});

// node_modules/cubic-hermite/hermite.js
var require_hermite = __commonJS((exports, module) => {
  var dcubicHermite = function(p0, v0, p1, v1, t, f) {
    var dh00 = 6 * t * t - 6 * t, dh10 = 3 * t * t - 4 * t + 1, dh01 = -6 * t * t + 6 * t, dh11 = 3 * t * t - 2 * t;
    if (p0.length) {
      if (!f) {
        f = new Array(p0.length);
      }
      for (var i = p0.length - 1;i >= 0; --i) {
        f[i] = dh00 * p0[i] + dh10 * v0[i] + dh01 * p1[i] + dh11 * v1[i];
      }
      return f;
    }
    return dh00 * p0 + dh10 * v0 + dh01 * p1[i] + dh11 * v1;
  };
  var cubicHermite = function(p0, v0, p1, v1, t, f) {
    var ti = t - 1, t2 = t * t, ti2 = ti * ti, h00 = (1 + 2 * t) * ti2, h10 = t * ti2, h01 = t2 * (3 - 2 * t), h11 = t2 * ti;
    if (p0.length) {
      if (!f) {
        f = new Array(p0.length);
      }
      for (var i = p0.length - 1;i >= 0; --i) {
        f[i] = h00 * p0[i] + h10 * v0[i] + h01 * p1[i] + h11 * v1[i];
      }
      return f;
    }
    return h00 * p0 + h10 * v0 + h01 * p1 + h11 * v1;
  };
  module.exports = cubicHermite;
  module.exports.derivative = dcubicHermite;
});

// node_modules/binary-search-bounds/search-bounds.js
var require_search_bounds = __commonJS((exports, module) => {
  var ge = function(a, y, c, l, h) {
    var i = h + 1;
    while (l <= h) {
      var m = l + h >>> 1, x = a[m];
      var p = c !== undefined ? c(x, y) : x - y;
      if (p >= 0) {
        i = m;
        h = m - 1;
      } else {
        l = m + 1;
      }
    }
    return i;
  };
  var gt = function(a, y, c, l, h) {
    var i = h + 1;
    while (l <= h) {
      var m = l + h >>> 1, x = a[m];
      var p = c !== undefined ? c(x, y) : x - y;
      if (p > 0) {
        i = m;
        h = m - 1;
      } else {
        l = m + 1;
      }
    }
    return i;
  };
  var lt = function(a, y, c, l, h) {
    var i = l - 1;
    while (l <= h) {
      var m = l + h >>> 1, x = a[m];
      var p = c !== undefined ? c(x, y) : x - y;
      if (p < 0) {
        i = m;
        l = m + 1;
      } else {
        h = m - 1;
      }
    }
    return i;
  };
  var le = function(a, y, c, l, h) {
    var i = l - 1;
    while (l <= h) {
      var m = l + h >>> 1, x = a[m];
      var p = c !== undefined ? c(x, y) : x - y;
      if (p <= 0) {
        i = m;
        l = m + 1;
      } else {
        h = m - 1;
      }
    }
    return i;
  };
  var eq = function(a, y, c, l, h) {
    while (l <= h) {
      var m = l + h >>> 1, x = a[m];
      var p = c !== undefined ? c(x, y) : x - y;
      if (p === 0) {
        return m;
      }
      if (p <= 0) {
        l = m + 1;
      } else {
        h = m - 1;
      }
    }
    return -1;
  };
  var norm = function(a, y, c, l, h, f) {
    if (typeof c === "function") {
      return f(a, y, c, l === undefined ? 0 : l | 0, h === undefined ? a.length - 1 : h | 0);
    }
    return f(a, y, undefined, c === undefined ? 0 : c | 0, l === undefined ? a.length - 1 : l | 0);
  };
  module.exports = {
    ge: function(a, y, c, l, h) {
      return norm(a, y, c, l, h, ge);
    },
    gt: function(a, y, c, l, h) {
      return norm(a, y, c, l, h, gt);
    },
    lt: function(a, y, c, l, h) {
      return norm(a, y, c, l, h, lt);
    },
    le: function(a, y, c, l, h) {
      return norm(a, y, c, l, h, le);
    },
    eq: function(a, y, c, l, h) {
      return norm(a, y, c, l, h, eq);
    }
  };
});

// node_modules/filtered-vector/fvec.js
var require_fvec = __commonJS((exports, module) => {
  var clamp = function(lo, hi, x) {
    return Math.min(hi, Math.max(lo, x));
  };
  var FilteredVector = function(state0, velocity0, t0) {
    this.dimension = state0.length;
    this.bounds = [new Array(this.dimension), new Array(this.dimension)];
    for (var i = 0;i < this.dimension; ++i) {
      this.bounds[0][i] = (-Infinity);
      this.bounds[1][i] = Infinity;
    }
    this._state = state0.slice().reverse();
    this._velocity = velocity0.slice().reverse();
    this._time = [t0];
    this._scratch = [state0.slice(), state0.slice(), state0.slice(), state0.slice(), state0.slice()];
  };
  var getZero = function(d) {
    var result = new Array(d);
    for (var i = 0;i < d; ++i) {
      result[i] = 0;
    }
    return result;
  };
  var createFilteredVector = function(initState, initVelocity, initTime) {
    switch (arguments.length) {
      case 0:
        return new FilteredVector([0], [0], 0);
      case 1:
        if (typeof initState === "number") {
          var zero = getZero(initState);
          return new FilteredVector(zero, zero, 0);
        } else {
          return new FilteredVector(initState, getZero(initState.length), 0);
        }
      case 2:
        if (typeof initVelocity === "number") {
          var zero = getZero(initState.length);
          return new FilteredVector(initState, zero, +initVelocity);
        } else {
          initTime = 0;
        }
      case 3:
        if (initState.length !== initVelocity.length) {
          throw new Error("state and velocity lengths must match");
        }
        return new FilteredVector(initState, initVelocity, initTime);
    }
  };
  module.exports = createFilteredVector;
  var cubicHermite = require_hermite();
  var bsearch = require_search_bounds();
  var proto = FilteredVector.prototype;
  proto.flush = function(t) {
    var idx = bsearch.gt(this._time, t) - 1;
    if (idx <= 0) {
      return;
    }
    this._time.splice(0, idx);
    this._state.splice(0, idx * this.dimension);
    this._velocity.splice(0, idx * this.dimension);
  };
  proto.curve = function(t) {
    var time = this._time;
    var n = time.length;
    var idx = bsearch.le(time, t);
    var result = this._scratch[0];
    var state = this._state;
    var velocity = this._velocity;
    var d = this.dimension;
    var bounds = this.bounds;
    if (idx < 0) {
      var ptr = d - 1;
      for (var i = 0;i < d; ++i, --ptr) {
        result[i] = state[ptr];
      }
    } else if (idx >= n - 1) {
      var ptr = state.length - 1;
      var tf = t - time[n - 1];
      for (var i = 0;i < d; ++i, --ptr) {
        result[i] = state[ptr] + tf * velocity[ptr];
      }
    } else {
      var ptr = d * (idx + 1) - 1;
      var t0 = time[idx];
      var t1 = time[idx + 1];
      var dt = t1 - t0 || 1;
      var x0 = this._scratch[1];
      var x1 = this._scratch[2];
      var v0 = this._scratch[3];
      var v1 = this._scratch[4];
      var steady = true;
      for (var i = 0;i < d; ++i, --ptr) {
        x0[i] = state[ptr];
        v0[i] = velocity[ptr] * dt;
        x1[i] = state[ptr + d];
        v1[i] = velocity[ptr + d] * dt;
        steady = steady && (x0[i] === x1[i] && v0[i] === v1[i] && v0[i] === 0);
      }
      if (steady) {
        for (var i = 0;i < d; ++i) {
          result[i] = x0[i];
        }
      } else {
        cubicHermite(x0, v0, x1, v1, (t - t0) / dt, result);
      }
    }
    var lo = bounds[0];
    var hi = bounds[1];
    for (var i = 0;i < d; ++i) {
      result[i] = clamp(lo[i], hi[i], result[i]);
    }
    return result;
  };
  proto.dcurve = function(t) {
    var time = this._time;
    var n = time.length;
    var idx = bsearch.le(time, t);
    var result = this._scratch[0];
    var state = this._state;
    var velocity = this._velocity;
    var d = this.dimension;
    if (idx >= n - 1) {
      var ptr = state.length - 1;
      var tf = t - time[n - 1];
      for (var i = 0;i < d; ++i, --ptr) {
        result[i] = velocity[ptr];
      }
    } else {
      var ptr = d * (idx + 1) - 1;
      var t0 = time[idx];
      var t1 = time[idx + 1];
      var dt = t1 - t0 || 1;
      var x0 = this._scratch[1];
      var x1 = this._scratch[2];
      var v0 = this._scratch[3];
      var v1 = this._scratch[4];
      var steady = true;
      for (var i = 0;i < d; ++i, --ptr) {
        x0[i] = state[ptr];
        v0[i] = velocity[ptr] * dt;
        x1[i] = state[ptr + d];
        v1[i] = velocity[ptr + d] * dt;
        steady = steady && (x0[i] === x1[i] && v0[i] === v1[i] && v0[i] === 0);
      }
      if (steady) {
        for (var i = 0;i < d; ++i) {
          result[i] = 0;
        }
      } else {
        cubicHermite.derivative(x0, v0, x1, v1, (t - t0) / dt, result);
        for (var i = 0;i < d; ++i) {
          result[i] /= dt;
        }
      }
    }
    return result;
  };
  proto.lastT = function() {
    var time = this._time;
    return time[time.length - 1];
  };
  proto.stable = function() {
    var velocity = this._velocity;
    var ptr = velocity.length;
    for (var i = this.dimension - 1;i >= 0; --i) {
      if (velocity[--ptr]) {
        return false;
      }
    }
    return true;
  };
  proto.jump = function(t) {
    var t0 = this.lastT();
    var d = this.dimension;
    if (t < t0 || arguments.length !== d + 1) {
      return;
    }
    var state = this._state;
    var velocity = this._velocity;
    var ptr = state.length - this.dimension;
    var bounds = this.bounds;
    var lo = bounds[0];
    var hi = bounds[1];
    this._time.push(t0, t);
    for (var j = 0;j < 2; ++j) {
      for (var i = 0;i < d; ++i) {
        state.push(state[ptr++]);
        velocity.push(0);
      }
    }
    this._time.push(t);
    for (var i = d;i > 0; --i) {
      state.push(clamp(lo[i - 1], hi[i - 1], arguments[i]));
      velocity.push(0);
    }
  };
  proto.push = function(t) {
    var t0 = this.lastT();
    var d = this.dimension;
    if (t < t0 || arguments.length !== d + 1) {
      return;
    }
    var state = this._state;
    var velocity = this._velocity;
    var ptr = state.length - this.dimension;
    var dt = t - t0;
    var bounds = this.bounds;
    var lo = bounds[0];
    var hi = bounds[1];
    var sf = dt > 0.000001 ? 1 / dt : 0;
    this._time.push(t);
    for (var i = d;i > 0; --i) {
      var xc = clamp(lo[i - 1], hi[i - 1], arguments[i]);
      state.push(xc);
      velocity.push((xc - state[ptr++]) * sf);
    }
  };
  proto.set = function(t) {
    var d = this.dimension;
    if (t < this.lastT() || arguments.length !== d + 1) {
      return;
    }
    var state = this._state;
    var velocity = this._velocity;
    var bounds = this.bounds;
    var lo = bounds[0];
    var hi = bounds[1];
    this._time.push(t);
    for (var i = d;i > 0; --i) {
      state.push(clamp(lo[i - 1], hi[i - 1], arguments[i]));
      velocity.push(0);
    }
  };
  proto.move = function(t) {
    var t0 = this.lastT();
    var d = this.dimension;
    if (t <= t0 || arguments.length !== d + 1) {
      return;
    }
    var state = this._state;
    var velocity = this._velocity;
    var statePtr = state.length - this.dimension;
    var bounds = this.bounds;
    var lo = bounds[0];
    var hi = bounds[1];
    var dt = t - t0;
    var sf = dt > 0.000001 ? 1 / dt : 0;
    this._time.push(t);
    for (var i = d;i > 0; --i) {
      var dx = arguments[i];
      state.push(clamp(lo[i - 1], hi[i - 1], state[statePtr++] + dx));
      velocity.push(dx * sf);
    }
  };
  proto.idle = function(t) {
    var t0 = this.lastT();
    if (t < t0) {
      return;
    }
    var d = this.dimension;
    var state = this._state;
    var velocity = this._velocity;
    var statePtr = state.length - d;
    var bounds = this.bounds;
    var lo = bounds[0];
    var hi = bounds[1];
    var dt = t - t0;
    this._time.push(t);
    for (var i = d - 1;i >= 0; --i) {
      state.push(clamp(lo[i], hi[i], state[statePtr] + dt * velocity[statePtr]));
      velocity.push(0);
      statePtr += 1;
    }
  };
});

// node_modules/gl-mat4/invert.js
var require_invert = __commonJS((exports, module) => {
  var invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15], b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12, b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32, det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det) {
      return null;
    }
    det = 1 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
    return out;
  };
  module.exports = invert;
});

// node_modules/gl-mat4/rotate.js
var require_rotate = __commonJS((exports, module) => {
  var rotate = function(out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2], len = Math.sqrt(x * x + y * y + z * z), s, c, t, a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, b00, b01, b02, b10, b11, b12, b20, b21, b22;
    if (Math.abs(len) < 0.000001) {
      return null;
    }
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;
    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    b00 = x * x * t + c;
    b01 = y * x * t + z * s;
    b02 = z * x * t - y * s;
    b10 = x * y * t - z * s;
    b11 = y * y * t + c;
    b12 = z * y * t + x * s;
    b20 = x * z * t + y * s;
    b21 = y * z * t - x * s;
    b22 = z * z * t + c;
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;
    if (a !== out) {
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }
    return out;
  };
  module.exports = rotate;
});

// node_modules/gl-vec3/cross.js
var require_cross = __commonJS((exports, module) => {
  var cross = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2], bx = b[0], by = b[1], bz = b[2];
    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
  };
  module.exports = cross;
});

// node_modules/gl-vec3/normalize.js
var require_normalize = __commonJS((exports, module) => {
  var normalize = function(out, a) {
    var x = a[0], y = a[1], z = a[2];
    var len = x * x + y * y + z * z;
    if (len > 0) {
      len = 1 / Math.sqrt(len);
      out[0] = a[0] * len;
      out[1] = a[1] * len;
      out[2] = a[2] * len;
    }
    return out;
  };
  module.exports = normalize;
});

// node_modules/gl-vec3/dot.js
var require_dot = __commonJS((exports, module) => {
  var dot = function(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  };
  module.exports = dot;
});

// node_modules/turntable-camera-controller/turntable.js
var require_turntable = __commonJS((exports, module) => {
  var len3 = function(x, y, z) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
  };
  var clamp1 = function(x) {
    return Math.min(1, Math.max(-1, x));
  };
  var findOrthoPair = function(v) {
    var vx = Math.abs(v[0]);
    var vy = Math.abs(v[1]);
    var vz = Math.abs(v[2]);
    var u = [0, 0, 0];
    if (vx > Math.max(vy, vz)) {
      u[2] = 1;
    } else if (vy > Math.max(vx, vz)) {
      u[0] = 1;
    } else {
      u[1] = 1;
    }
    var vv = 0;
    var uv = 0;
    for (var i = 0;i < 3; ++i) {
      vv += v[i] * v[i];
      uv += u[i] * v[i];
    }
    for (var i = 0;i < 3; ++i) {
      u[i] -= uv / vv * v[i];
    }
    normalize3(u, u);
    return u;
  };
  var TurntableController = function(zoomMin, zoomMax, center, up, right, radius, theta, phi) {
    this.center = filterVector(center);
    this.up = filterVector(up);
    this.right = filterVector(right);
    this.radius = filterVector([radius]);
    this.angle = filterVector([theta, phi]);
    this.angle.bounds = [[(-Infinity), -Math.PI / 2], [Infinity, Math.PI / 2]];
    this.setDistanceLimits(zoomMin, zoomMax);
    this.computedCenter = this.center.curve(0);
    this.computedUp = this.up.curve(0);
    this.computedRight = this.right.curve(0);
    this.computedRadius = this.radius.curve(0);
    this.computedAngle = this.angle.curve(0);
    this.computedToward = [0, 0, 0];
    this.computedEye = [0, 0, 0];
    this.computedMatrix = new Array(16);
    for (var i = 0;i < 16; ++i) {
      this.computedMatrix[i] = 0.5;
    }
    this.recalcMatrix(0);
  };
  var createTurntableController = function(options) {
    options = options || {};
    var center = options.center || [0, 0, 0];
    var up = options.up || [0, 1, 0];
    var right = options.right || findOrthoPair(up);
    var radius = options.radius || 1;
    var theta = options.theta || 0;
    var phi = options.phi || 0;
    center = [].slice.call(center, 0, 3);
    up = [].slice.call(up, 0, 3);
    normalize3(up, up);
    right = [].slice.call(right, 0, 3);
    normalize3(right, right);
    if ("eye" in options) {
      var eye = options.eye;
      var toward = [
        eye[0] - center[0],
        eye[1] - center[1],
        eye[2] - center[2]
      ];
      cross(right, toward, up);
      if (len3(right[0], right[1], right[2]) < 0.000001) {
        right = findOrthoPair(up);
      } else {
        normalize3(right, right);
      }
      radius = len3(toward[0], toward[1], toward[2]);
      var ut = dot3(up, toward) / radius;
      var rt = dot3(right, toward) / radius;
      phi = Math.acos(ut);
      theta = Math.acos(rt);
    }
    radius = Math.log(radius);
    return new TurntableController(options.zoomMin, options.zoomMax, center, up, right, radius, theta, phi);
  };
  module.exports = createTurntableController;
  var filterVector = require_fvec();
  var invert44 = require_invert();
  var rotateM = require_rotate();
  var cross = require_cross();
  var normalize3 = require_normalize();
  var dot3 = require_dot();
  var proto = TurntableController.prototype;
  proto.setDistanceLimits = function(minDist, maxDist) {
    if (minDist > 0) {
      minDist = Math.log(minDist);
    } else {
      minDist = (-Infinity);
    }
    if (maxDist > 0) {
      maxDist = Math.log(maxDist);
    } else {
      maxDist = Infinity;
    }
    maxDist = Math.max(maxDist, minDist);
    this.radius.bounds[0][0] = minDist;
    this.radius.bounds[1][0] = maxDist;
  };
  proto.getDistanceLimits = function(out) {
    var bounds = this.radius.bounds[0];
    if (out) {
      out[0] = Math.exp(bounds[0][0]);
      out[1] = Math.exp(bounds[1][0]);
      return out;
    }
    return [Math.exp(bounds[0][0]), Math.exp(bounds[1][0])];
  };
  proto.recalcMatrix = function(t) {
    this.center.curve(t);
    this.up.curve(t);
    this.right.curve(t);
    this.radius.curve(t);
    this.angle.curve(t);
    var up = this.computedUp;
    var right = this.computedRight;
    var uu = 0;
    var ur = 0;
    for (var i = 0;i < 3; ++i) {
      ur += up[i] * right[i];
      uu += up[i] * up[i];
    }
    var ul = Math.sqrt(uu);
    var rr = 0;
    for (var i = 0;i < 3; ++i) {
      right[i] -= up[i] * ur / uu;
      rr += right[i] * right[i];
      up[i] /= ul;
    }
    var rl = Math.sqrt(rr);
    for (var i = 0;i < 3; ++i) {
      right[i] /= rl;
    }
    var toward = this.computedToward;
    cross(toward, up, right);
    normalize3(toward, toward);
    var radius = Math.exp(this.computedRadius[0]);
    var theta = this.computedAngle[0];
    var phi = this.computedAngle[1];
    var ctheta = Math.cos(theta);
    var stheta = Math.sin(theta);
    var cphi = Math.cos(phi);
    var sphi = Math.sin(phi);
    var center = this.computedCenter;
    var wx = ctheta * cphi;
    var wy = stheta * cphi;
    var wz = sphi;
    var sx = -ctheta * sphi;
    var sy = -stheta * sphi;
    var sz = cphi;
    var eye = this.computedEye;
    var mat = this.computedMatrix;
    for (var i = 0;i < 3; ++i) {
      var x = wx * right[i] + wy * toward[i] + wz * up[i];
      mat[4 * i + 1] = sx * right[i] + sy * toward[i] + sz * up[i];
      mat[4 * i + 2] = x;
      mat[4 * i + 3] = 0;
    }
    var ax = mat[1];
    var ay = mat[5];
    var az = mat[9];
    var bx = mat[2];
    var by = mat[6];
    var bz = mat[10];
    var cx = ay * bz - az * by;
    var cy = az * bx - ax * bz;
    var cz = ax * by - ay * bx;
    var cl = len3(cx, cy, cz);
    cx /= cl;
    cy /= cl;
    cz /= cl;
    mat[0] = cx;
    mat[4] = cy;
    mat[8] = cz;
    for (var i = 0;i < 3; ++i) {
      eye[i] = center[i] + mat[2 + 4 * i] * radius;
    }
    for (var i = 0;i < 3; ++i) {
      var rr = 0;
      for (var j = 0;j < 3; ++j) {
        rr += mat[i + 4 * j] * eye[j];
      }
      mat[12 + i] = -rr;
    }
    mat[15] = 1;
  };
  proto.getMatrix = function(t, result) {
    this.recalcMatrix(t);
    var mat = this.computedMatrix;
    if (result) {
      for (var i = 0;i < 16; ++i) {
        result[i] = mat[i];
      }
      return result;
    }
    return mat;
  };
  var zAxis = [0, 0, 0];
  proto.rotate = function(t, dtheta, dphi, droll) {
    this.angle.move(t, dtheta, dphi);
    if (droll) {
      this.recalcMatrix(t);
      var mat = this.computedMatrix;
      zAxis[0] = mat[2];
      zAxis[1] = mat[6];
      zAxis[2] = mat[10];
      var up = this.computedUp;
      var right = this.computedRight;
      var toward = this.computedToward;
      for (var i = 0;i < 3; ++i) {
        mat[4 * i] = up[i];
        mat[4 * i + 1] = right[i];
        mat[4 * i + 2] = toward[i];
      }
      rotateM(mat, mat, droll, zAxis);
      for (var i = 0;i < 3; ++i) {
        up[i] = mat[4 * i];
        right[i] = mat[4 * i + 1];
      }
      this.up.set(t, up[0], up[1], up[2]);
      this.right.set(t, right[0], right[1], right[2]);
    }
  };
  proto.pan = function(t, dx, dy, dz) {
    dx = dx || 0;
    dy = dy || 0;
    dz = dz || 0;
    this.recalcMatrix(t);
    var mat = this.computedMatrix;
    var dist = Math.exp(this.computedRadius[0]);
    var ux = mat[1];
    var uy = mat[5];
    var uz = mat[9];
    var ul = len3(ux, uy, uz);
    ux /= ul;
    uy /= ul;
    uz /= ul;
    var rx = mat[0];
    var ry = mat[4];
    var rz = mat[8];
    var ru = rx * ux + ry * uy + rz * uz;
    rx -= ux * ru;
    ry -= uy * ru;
    rz -= uz * ru;
    var rl = len3(rx, ry, rz);
    rx /= rl;
    ry /= rl;
    rz /= rl;
    var vx = rx * dx + ux * dy;
    var vy = ry * dx + uy * dy;
    var vz = rz * dx + uz * dy;
    this.center.move(t, vx, vy, vz);
    var radius = Math.exp(this.computedRadius[0]);
    radius = Math.max(0.0001, radius + dz);
    this.radius.set(t, Math.log(radius));
  };
  proto.translate = function(t, dx, dy, dz) {
    this.center.move(t, dx || 0, dy || 0, dz || 0);
  };
  proto.setMatrix = function(t, mat, axes, noSnap) {
    var ushift = 1;
    if (typeof axes === "number") {
      ushift = axes | 0;
    }
    if (ushift < 0 || ushift > 3) {
      ushift = 1;
    }
    var vshift = (ushift + 2) % 3;
    var fshift = (ushift + 1) % 3;
    if (!mat) {
      this.recalcMatrix(t);
      mat = this.computedMatrix;
    }
    var ux = mat[ushift];
    var uy = mat[ushift + 4];
    var uz = mat[ushift + 8];
    if (!noSnap) {
      var ul = len3(ux, uy, uz);
      ux /= ul;
      uy /= ul;
      uz /= ul;
    } else {
      var ax = Math.abs(ux);
      var ay = Math.abs(uy);
      var az = Math.abs(uz);
      var am = Math.max(ax, ay, az);
      if (ax === am) {
        ux = ux < 0 ? -1 : 1;
        uy = uz = 0;
      } else if (az === am) {
        uz = uz < 0 ? -1 : 1;
        ux = uy = 0;
      } else {
        uy = uy < 0 ? -1 : 1;
        ux = uz = 0;
      }
    }
    var rx = mat[vshift];
    var ry = mat[vshift + 4];
    var rz = mat[vshift + 8];
    var ru = rx * ux + ry * uy + rz * uz;
    rx -= ux * ru;
    ry -= uy * ru;
    rz -= uz * ru;
    var rl = len3(rx, ry, rz);
    rx /= rl;
    ry /= rl;
    rz /= rl;
    var fx = uy * rz - uz * ry;
    var fy = uz * rx - ux * rz;
    var fz = ux * ry - uy * rx;
    var fl = len3(fx, fy, fz);
    fx /= fl;
    fy /= fl;
    fz /= fl;
    this.center.jump(t, ex, ey, ez);
    this.radius.idle(t);
    this.up.jump(t, ux, uy, uz);
    this.right.jump(t, rx, ry, rz);
    var phi, theta;
    if (ushift === 2) {
      var cx = mat[1];
      var cy = mat[5];
      var cz = mat[9];
      var cr = cx * rx + cy * ry + cz * rz;
      var cf = cx * fx + cy * fy + cz * fz;
      if (tu < 0) {
        phi = -Math.PI / 2;
      } else {
        phi = Math.PI / 2;
      }
      theta = Math.atan2(cf, cr);
    } else {
      var tx = mat[2];
      var ty = mat[6];
      var tz = mat[10];
      var tu = tx * ux + ty * uy + tz * uz;
      var tr = tx * rx + ty * ry + tz * rz;
      var tf = tx * fx + ty * fy + tz * fz;
      phi = Math.asin(clamp1(tu));
      theta = Math.atan2(tf, tr);
    }
    this.angle.jump(t, theta, phi);
    this.recalcMatrix(t);
    var dx = mat[2];
    var dy = mat[6];
    var dz = mat[10];
    var imat = this.computedMatrix;
    invert44(imat, mat);
    var w = imat[15];
    var ex = imat[12] / w;
    var ey = imat[13] / w;
    var ez = imat[14] / w;
    var gs = Math.exp(this.computedRadius[0]);
    this.center.jump(t, ex - dx * gs, ey - dy * gs, ez - dz * gs);
  };
  proto.lastT = function() {
    return Math.max(this.center.lastT(), this.up.lastT(), this.right.lastT(), this.radius.lastT(), this.angle.lastT());
  };
  proto.idle = function(t) {
    this.center.idle(t);
    this.up.idle(t);
    this.right.idle(t);
    this.radius.idle(t);
    this.angle.idle(t);
  };
  proto.flush = function(t) {
    this.center.flush(t);
    this.up.flush(t);
    this.right.flush(t);
    this.radius.flush(t);
    this.angle.flush(t);
  };
  proto.setDistance = function(t, d) {
    if (d > 0) {
      this.radius.set(t, Math.log(d));
    }
  };
  proto.lookAt = function(t, eye, center, up) {
    this.recalcMatrix(t);
    eye = eye || this.computedEye;
    center = center || this.computedCenter;
    up = up || this.computedUp;
    var ux = up[0];
    var uy = up[1];
    var uz = up[2];
    var ul = len3(ux, uy, uz);
    if (ul < 0.000001) {
      return;
    }
    ux /= ul;
    uy /= ul;
    uz /= ul;
    var tx = eye[0] - center[0];
    var ty = eye[1] - center[1];
    var tz = eye[2] - center[2];
    var tl = len3(tx, ty, tz);
    if (tl < 0.000001) {
      return;
    }
    tx /= tl;
    ty /= tl;
    tz /= tl;
    var right = this.computedRight;
    var rx = right[0];
    var ry = right[1];
    var rz = right[2];
    var ru = ux * rx + uy * ry + uz * rz;
    rx -= ru * ux;
    ry -= ru * uy;
    rz -= ru * uz;
    var rl = len3(rx, ry, rz);
    if (rl < 0.01) {
      rx = uy * tz - uz * ty;
      ry = uz * tx - ux * tz;
      rz = ux * ty - uy * tx;
      rl = len3(rx, ry, rz);
      if (rl < 0.000001) {
        return;
      }
    }
    rx /= rl;
    ry /= rl;
    rz /= rl;
    this.up.set(t, ux, uy, uz);
    this.right.set(t, rx, ry, rz);
    this.center.set(t, center[0], center[1], center[2]);
    this.radius.set(t, Math.log(tl));
    var fx = uy * rz - uz * ry;
    var fy = uz * rx - ux * rz;
    var fz = ux * ry - uy * rx;
    var fl = len3(fx, fy, fz);
    fx /= fl;
    fy /= fl;
    fz /= fl;
    var tu = ux * tx + uy * ty + uz * tz;
    var tr = rx * tx + ry * ty + rz * tz;
    var tf = fx * tx + fy * ty + fz * tz;
    var phi = Math.asin(clamp1(tu));
    var theta = Math.atan2(tf, tr);
    var angleState = this.angle._state;
    var lastTheta = angleState[angleState.length - 1];
    var lastPhi = angleState[angleState.length - 2];
    lastTheta = lastTheta % (2 * Math.PI);
    var dp = Math.abs(lastTheta + 2 * Math.PI - theta);
    var d0 = Math.abs(lastTheta - theta);
    var dn = Math.abs(lastTheta - 2 * Math.PI - theta);
    if (dp < d0) {
      lastTheta += 2 * Math.PI;
    }
    if (dn < d0) {
      lastTheta -= 2 * Math.PI;
    }
    this.angle.jump(this.angle.lastT(), lastTheta, lastPhi);
    this.angle.set(t, theta, phi);
  };
});

// node_modules/gl-mat4/identity.js
var require_identity = __commonJS((exports, module) => {
  var identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  };
  module.exports = identity;
});

// node_modules/gl-mat4/lookAt.js
var require_lookAt = __commonJS((exports, module) => {
  var lookAt = function(out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len, eyex = eye[0], eyey = eye[1], eyez = eye[2], upx = up[0], upy = up[1], upz = up[2], centerx = center[0], centery = center[1], centerz = center[2];
    if (Math.abs(eyex - centerx) < 0.000001 && Math.abs(eyey - centery) < 0.000001 && Math.abs(eyez - centerz) < 0.000001) {
      return identity(out);
    }
    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;
    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;
    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
      x0 = 0;
      x1 = 0;
      x2 = 0;
    } else {
      len = 1 / len;
      x0 *= len;
      x1 *= len;
      x2 *= len;
    }
    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;
    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
      y0 = 0;
      y1 = 0;
      y2 = 0;
    } else {
      len = 1 / len;
      y0 *= len;
      y1 *= len;
      y2 *= len;
    }
    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;
    return out;
  };
  var identity = require_identity();
  module.exports = lookAt;
});

// node_modules/gl-mat4/fromQuat.js
var require_fromQuat = __commonJS((exports, module) => {
  var fromQuat = function(out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3], x2 = x + x, y2 = y + y, z2 = z + z, xx = x * x2, yx = y * x2, yy = y * y2, zx = z * x2, zy = z * y2, zz = z * z2, wx = w * x2, wy = w * y2, wz = w * z2;
    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;
    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;
    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  };
  module.exports = fromQuat;
});

// node_modules/orbit-camera-controller/lib/quatFromFrame.js
var require_quatFromFrame = __commonJS((exports, module) => {
  var quatFromFrame = function(out, rx, ry, rz, ux, uy, uz, fx, fy, fz) {
    var tr = rx + uy + fz;
    if (l > 0) {
      var l = Math.sqrt(tr + 1);
      out[0] = 0.5 * (uz - fy) / l;
      out[1] = 0.5 * (fx - rz) / l;
      out[2] = 0.5 * (ry - uy) / l;
      out[3] = 0.5 * l;
    } else {
      var tf = Math.max(rx, uy, fz);
      var l = Math.sqrt(2 * tf - tr + 1);
      if (rx >= tf) {
        out[0] = 0.5 * l;
        out[1] = 0.5 * (ux + ry) / l;
        out[2] = 0.5 * (fx + rz) / l;
        out[3] = 0.5 * (uz - fy) / l;
      } else if (uy >= tf) {
        out[0] = 0.5 * (ry + ux) / l;
        out[1] = 0.5 * l;
        out[2] = 0.5 * (fy + uz) / l;
        out[3] = 0.5 * (fx - rz) / l;
      } else {
        out[0] = 0.5 * (rz + fx) / l;
        out[1] = 0.5 * (uz + fy) / l;
        out[2] = 0.5 * l;
        out[3] = 0.5 * (ry - ux) / l;
      }
    }
    return out;
  };
  module.exports = quatFromFrame;
});

// node_modules/orbit-camera-controller/orbit.js
var require_orbit = __commonJS((exports, module) => {
  var len3 = function(x, y, z) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
  };
  var len4 = function(w, x, y, z) {
    return Math.sqrt(Math.pow(w, 2) + Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
  };
  var normalize4 = function(out, a) {
    var ax = a[0];
    var ay = a[1];
    var az = a[2];
    var aw = a[3];
    var al = len4(ax, ay, az, aw);
    if (al > 0.000001) {
      out[0] = ax / al;
      out[1] = ay / al;
      out[2] = az / al;
      out[3] = aw / al;
    } else {
      out[0] = out[1] = out[2] = 0;
      out[3] = 1;
    }
  };
  var OrbitCameraController = function(initQuat, initCenter, initRadius) {
    this.radius = filterVector([initRadius]);
    this.center = filterVector(initCenter);
    this.rotation = filterVector(initQuat);
    this.computedRadius = this.radius.curve(0);
    this.computedCenter = this.center.curve(0);
    this.computedRotation = this.rotation.curve(0);
    this.computedUp = [0.1, 0, 0];
    this.computedEye = [0.1, 0, 0];
    this.computedMatrix = [0.1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.recalcMatrix(0);
  };
  var createOrbitController = function(options) {
    options = options || {};
    var center = options.center || [0, 0, 0];
    var rotation = options.rotation || [0, 0, 0, 1];
    var radius = options.radius || 1;
    center = [].slice.call(center, 0, 3);
    rotation = [].slice.call(rotation, 0, 4);
    normalize4(rotation, rotation);
    var result = new OrbitCameraController(rotation, center, Math.log(radius));
    result.setDistanceLimits(options.zoomMin, options.zoomMax);
    if ("eye" in options || "up" in options) {
      result.lookAt(0, options.eye, options.center, options.up);
    }
    return result;
  };
  module.exports = createOrbitController;
  var filterVector = require_fvec();
  var lookAt = require_lookAt();
  var mat4FromQuat = require_fromQuat();
  var invert44 = require_invert();
  var quatFromFrame = require_quatFromFrame();
  var proto = OrbitCameraController.prototype;
  proto.lastT = function() {
    return Math.max(this.radius.lastT(), this.center.lastT(), this.rotation.lastT());
  };
  proto.recalcMatrix = function(t) {
    this.radius.curve(t);
    this.center.curve(t);
    this.rotation.curve(t);
    var quat = this.computedRotation;
    normalize4(quat, quat);
    var mat = this.computedMatrix;
    mat4FromQuat(mat, quat);
    var center = this.computedCenter;
    var eye = this.computedEye;
    var up = this.computedUp;
    var radius = Math.exp(this.computedRadius[0]);
    eye[0] = center[0] + radius * mat[2];
    eye[1] = center[1] + radius * mat[6];
    eye[2] = center[2] + radius * mat[10];
    up[0] = mat[1];
    up[1] = mat[5];
    up[2] = mat[9];
    for (var i = 0;i < 3; ++i) {
      var rr = 0;
      for (var j = 0;j < 3; ++j) {
        rr += mat[i + 4 * j] * eye[j];
      }
      mat[12 + i] = -rr;
    }
  };
  proto.getMatrix = function(t, result) {
    this.recalcMatrix(t);
    var m = this.computedMatrix;
    if (result) {
      for (var i = 0;i < 16; ++i) {
        result[i] = m[i];
      }
      return result;
    }
    return m;
  };
  proto.idle = function(t) {
    this.center.idle(t);
    this.radius.idle(t);
    this.rotation.idle(t);
  };
  proto.flush = function(t) {
    this.center.flush(t);
    this.radius.flush(t);
    this.rotation.flush(t);
  };
  proto.pan = function(t, dx, dy, dz) {
    dx = dx || 0;
    dy = dy || 0;
    dz = dz || 0;
    this.recalcMatrix(t);
    var mat = this.computedMatrix;
    var ux = mat[1];
    var uy = mat[5];
    var uz = mat[9];
    var ul = len3(ux, uy, uz);
    ux /= ul;
    uy /= ul;
    uz /= ul;
    var rx = mat[0];
    var ry = mat[4];
    var rz = mat[8];
    var ru = rx * ux + ry * uy + rz * uz;
    rx -= ux * ru;
    ry -= uy * ru;
    rz -= uz * ru;
    var rl = len3(rx, ry, rz);
    rx /= rl;
    ry /= rl;
    rz /= rl;
    var fx = mat[2];
    var fy = mat[6];
    var fz = mat[10];
    var fu = fx * ux + fy * uy + fz * uz;
    var fr = fx * rx + fy * ry + fz * rz;
    fx -= fu * ux + fr * rx;
    fy -= fu * uy + fr * ry;
    fz -= fu * uz + fr * rz;
    var fl = len3(fx, fy, fz);
    fx /= fl;
    fy /= fl;
    fz /= fl;
    var vx = rx * dx + ux * dy;
    var vy = ry * dx + uy * dy;
    var vz = rz * dx + uz * dy;
    this.center.move(t, vx, vy, vz);
    var radius = Math.exp(this.computedRadius[0]);
    radius = Math.max(0.0001, radius + dz);
    this.radius.set(t, Math.log(radius));
  };
  proto.rotate = function(t, dx, dy, dz) {
    this.recalcMatrix(t);
    dx = dx || 0;
    dy = dy || 0;
    var mat = this.computedMatrix;
    var rx = mat[0];
    var ry = mat[4];
    var rz = mat[8];
    var ux = mat[1];
    var uy = mat[5];
    var uz = mat[9];
    var fx = mat[2];
    var fy = mat[6];
    var fz = mat[10];
    var qx = dx * rx + dy * ux;
    var qy = dx * ry + dy * uy;
    var qz = dx * rz + dy * uz;
    var bx = -(fy * qz - fz * qy);
    var by = -(fz * qx - fx * qz);
    var bz = -(fx * qy - fy * qx);
    var bw = Math.sqrt(Math.max(0, 1 - Math.pow(bx, 2) - Math.pow(by, 2) - Math.pow(bz, 2)));
    var bl = len4(bx, by, bz, bw);
    if (bl > 0.000001) {
      bx /= bl;
      by /= bl;
      bz /= bl;
      bw /= bl;
    } else {
      bx = by = bz = 0;
      bw = 1;
    }
    var rotation = this.computedRotation;
    var ax = rotation[0];
    var ay = rotation[1];
    var az = rotation[2];
    var aw = rotation[3];
    var cx = ax * bw + aw * bx + ay * bz - az * by;
    var cy = ay * bw + aw * by + az * bx - ax * bz;
    var cz = az * bw + aw * bz + ax * by - ay * bx;
    var cw = aw * bw - ax * bx - ay * by - az * bz;
    if (dz) {
      bx = fx;
      by = fy;
      bz = fz;
      var s = Math.sin(dz) / len3(bx, by, bz);
      bx *= s;
      by *= s;
      bz *= s;
      bw = Math.cos(dx);
      cx = cx * bw + cw * bx + cy * bz - cz * by;
      cy = cy * bw + cw * by + cz * bx - cx * bz;
      cz = cz * bw + cw * bz + cx * by - cy * bx;
      cw = cw * bw - cx * bx - cy * by - cz * bz;
    }
    var cl = len4(cx, cy, cz, cw);
    if (cl > 0.000001) {
      cx /= cl;
      cy /= cl;
      cz /= cl;
      cw /= cl;
    } else {
      cx = cy = cz = 0;
      cw = 1;
    }
    this.rotation.set(t, cx, cy, cz, cw);
  };
  proto.lookAt = function(t, eye, center, up) {
    this.recalcMatrix(t);
    center = center || this.computedCenter;
    eye = eye || this.computedEye;
    up = up || this.computedUp;
    var mat = this.computedMatrix;
    lookAt(mat, eye, center, up);
    var rotation = this.computedRotation;
    quatFromFrame(rotation, mat[0], mat[1], mat[2], mat[4], mat[5], mat[6], mat[8], mat[9], mat[10]);
    normalize4(rotation, rotation);
    this.rotation.set(t, rotation[0], rotation[1], rotation[2], rotation[3]);
    var fl = 0;
    for (var i = 0;i < 3; ++i) {
      fl += Math.pow(center[i] - eye[i], 2);
    }
    this.radius.set(t, 0.5 * Math.log(Math.max(fl, 0.000001)));
    this.center.set(t, center[0], center[1], center[2]);
  };
  proto.translate = function(t, dx, dy, dz) {
    this.center.move(t, dx || 0, dy || 0, dz || 0);
  };
  proto.setMatrix = function(t, matrix) {
    var rotation = this.computedRotation;
    quatFromFrame(rotation, matrix[0], matrix[1], matrix[2], matrix[4], matrix[5], matrix[6], matrix[8], matrix[9], matrix[10]);
    normalize4(rotation, rotation);
    this.rotation.set(t, rotation[0], rotation[1], rotation[2], rotation[3]);
    var mat = this.computedMatrix;
    invert44(mat, matrix);
    var w = mat[15];
    if (Math.abs(w) > 0.000001) {
      var cx = mat[12] / w;
      var cy = mat[13] / w;
      var cz = mat[14] / w;
      this.recalcMatrix(t);
      var r = Math.exp(this.computedRadius[0]);
      this.center.set(t, cx - mat[2] * r, cy - mat[6] * r, cz - mat[10] * r);
      this.radius.idle(t);
    } else {
      this.center.idle(t);
      this.radius.idle(t);
    }
  };
  proto.setDistance = function(t, d) {
    if (d > 0) {
      this.radius.set(t, Math.log(d));
    }
  };
  proto.setDistanceLimits = function(lo, hi) {
    if (lo > 0) {
      lo = Math.log(lo);
    } else {
      lo = (-Infinity);
    }
    if (hi > 0) {
      hi = Math.log(hi);
    } else {
      hi = Infinity;
    }
    hi = Math.max(hi, lo);
    this.radius.bounds[0][0] = lo;
    this.radius.bounds[1][0] = hi;
  };
  proto.getDistanceLimits = function(out) {
    var bounds = this.radius.bounds;
    if (out) {
      out[0] = Math.exp(bounds[0][0]);
      out[1] = Math.exp(bounds[1][0]);
      return out;
    }
    return [Math.exp(bounds[0][0]), Math.exp(bounds[1][0])];
  };
  proto.toJSON = function() {
    this.recalcMatrix(this.lastT());
    return {
      center: this.computedCenter.slice(),
      rotation: this.computedRotation.slice(),
      distance: Math.log(this.computedRadius[0]),
      zoomMin: this.radius.bounds[0][0],
      zoomMax: this.radius.bounds[1][0]
    };
  };
  proto.fromJSON = function(options) {
    var t = this.lastT();
    var c = options.center;
    if (c) {
      this.center.set(t, c[0], c[1], c[2]);
    }
    var r = options.rotation;
    if (r) {
      this.rotation.set(t, r[0], r[1], r[2], r[3]);
    }
    var d = options.distance;
    if (d && d > 0) {
      this.radius.set(t, Math.log(d));
    }
    this.setDistanceLimits(options.zoomMin, options.zoomMax);
  };
});

// node_modules/gl-vec3/lerp.js
var require_lerp = __commonJS((exports, module) => {
  var lerp = function(out, a, b, t) {
    var ax = a[0], ay = a[1], az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
  };
  module.exports = lerp;
});

// node_modules/gl-mat4/translate.js
var require_translate = __commonJS((exports, module) => {
  var translate = function(out, a, v) {
    var x = v[0], y = v[1], z = v[2], a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23;
    if (a === out) {
      out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
      out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
      out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
      out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
      a00 = a[0];
      a01 = a[1];
      a02 = a[2];
      a03 = a[3];
      a10 = a[4];
      a11 = a[5];
      a12 = a[6];
      a13 = a[7];
      a20 = a[8];
      a21 = a[9];
      a22 = a[10];
      a23 = a[11];
      out[0] = a00;
      out[1] = a01;
      out[2] = a02;
      out[3] = a03;
      out[4] = a10;
      out[5] = a11;
      out[6] = a12;
      out[7] = a13;
      out[8] = a20;
      out[9] = a21;
      out[10] = a22;
      out[11] = a23;
      out[12] = a00 * x + a10 * y + a20 * z + a[12];
      out[13] = a01 * x + a11 * y + a21 * z + a[13];
      out[14] = a02 * x + a12 * y + a22 * z + a[14];
      out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }
    return out;
  };
  module.exports = translate;
});

// node_modules/gl-mat4/multiply.js
var require_multiply = __commonJS((exports, module) => {
  var multiply = function(out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
  };
  module.exports = multiply;
});

// node_modules/gl-mat4/create.js
var require_create = __commonJS((exports, module) => {
  var create = function() {
    var out = new Float32Array(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  };
  module.exports = create;
});

// node_modules/gl-mat4/scale.js
var require_scale = __commonJS((exports, module) => {
  var scale = function(out, a, v) {
    var x = v[0], y = v[1], z = v[2];
    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  };
  module.exports = scale;
});

// node_modules/gl-mat4/fromRotationTranslation.js
var require_fromRotationTranslation = __commonJS((exports, module) => {
  var fromRotationTranslation = function(out, q, v) {
    var x = q[0], y = q[1], z = q[2], w = q[3], x2 = x + x, y2 = y + y, z2 = z + z, xx = x * x2, xy = x * y2, xz = x * z2, yy = y * y2, yz = y * z2, zz = z * z2, wx = w * x2, wy = w * y2, wz = w * z2;
    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  };
  module.exports = fromRotationTranslation;
});

// node_modules/mat4-recompose/index.js
var require_mat4_recompose = __commonJS((exports, module) => {
  var mat4 = {
    identity: require_identity(),
    translate: require_translate(),
    multiply: require_multiply(),
    create: require_create(),
    scale: require_scale(),
    fromRotationTranslation: require_fromRotationTranslation()
  };
  var rotationMatrix = mat4.create();
  var temp = mat4.create();
  module.exports = function recomposeMat4(matrix, translation, scale, skew, perspective, quaternion) {
    mat4.identity(matrix);
    mat4.fromRotationTranslation(matrix, quaternion, translation);
    matrix[3] = perspective[0];
    matrix[7] = perspective[1];
    matrix[11] = perspective[2];
    matrix[15] = perspective[3];
    mat4.identity(temp);
    if (skew[2] !== 0) {
      temp[9] = skew[2];
      mat4.multiply(matrix, matrix, temp);
    }
    if (skew[1] !== 0) {
      temp[9] = 0;
      temp[8] = skew[1];
      mat4.multiply(matrix, matrix, temp);
    }
    if (skew[0] !== 0) {
      temp[8] = 0;
      temp[4] = skew[0];
      mat4.multiply(matrix, matrix, temp);
    }
    mat4.scale(matrix, matrix, scale);
    return matrix;
  };
});

// node_modules/mat4-decompose/normalize.js
var require_normalize2 = __commonJS((exports, module) => {
  module.exports = function normalize(out, mat) {
    var m44 = mat[15];
    if (m44 === 0)
      return false;
    var scale = 1 / m44;
    for (var i = 0;i < 16; i++)
      out[i] = mat[i] * scale;
    return true;
  };
});

// node_modules/gl-mat4/clone.js
var require_clone = __commonJS((exports, module) => {
  var clone = function(a) {
    var out = new Float32Array(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  };
  module.exports = clone;
});

// node_modules/gl-mat4/determinant.js
var require_determinant = __commonJS((exports, module) => {
  var determinant = function(a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15], b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12, b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32;
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  };
  module.exports = determinant;
});

// node_modules/gl-mat4/transpose.js
var require_transpose = __commonJS((exports, module) => {
  var transpose = function(out, a) {
    if (out === a) {
      var a01 = a[1], a02 = a[2], a03 = a[3], a12 = a[6], a13 = a[7], a23 = a[11];
      out[1] = a[4];
      out[2] = a[8];
      out[3] = a[12];
      out[4] = a01;
      out[6] = a[9];
      out[7] = a[13];
      out[8] = a02;
      out[9] = a12;
      out[11] = a[14];
      out[12] = a03;
      out[13] = a13;
      out[14] = a23;
    } else {
      out[0] = a[0];
      out[1] = a[4];
      out[2] = a[8];
      out[3] = a[12];
      out[4] = a[1];
      out[5] = a[5];
      out[6] = a[9];
      out[7] = a[13];
      out[8] = a[2];
      out[9] = a[6];
      out[10] = a[10];
      out[11] = a[14];
      out[12] = a[3];
      out[13] = a[7];
      out[14] = a[11];
      out[15] = a[15];
    }
    return out;
  };
  module.exports = transpose;
});

// node_modules/gl-vec3/length.js
var require_length = __commonJS((exports, module) => {
  var length = function(a) {
    var x = a[0], y = a[1], z = a[2];
    return Math.sqrt(x * x + y * y + z * z);
  };
  module.exports = length;
});

// node_modules/mat4-decompose/index.js
var require_mat4_decompose = __commonJS((exports, module) => {
  var vec4multMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
  };
  var mat3from4 = function(out, mat4x4) {
    out[0][0] = mat4x4[0];
    out[0][1] = mat4x4[1];
    out[0][2] = mat4x4[2];
    out[1][0] = mat4x4[4];
    out[1][1] = mat4x4[5];
    out[1][2] = mat4x4[6];
    out[2][0] = mat4x4[8];
    out[2][1] = mat4x4[9];
    out[2][2] = mat4x4[10];
  };
  var combine = function(out, a, b, scale1, scale2) {
    out[0] = a[0] * scale1 + b[0] * scale2;
    out[1] = a[1] * scale1 + b[1] * scale2;
    out[2] = a[2] * scale1 + b[2] * scale2;
  };
  var normalize = require_normalize2();
  var create = require_create();
  var clone = require_clone();
  var determinant = require_determinant();
  var invert = require_invert();
  var transpose = require_transpose();
  var vec3 = {
    length: require_length(),
    normalize: require_normalize(),
    dot: require_dot(),
    cross: require_cross()
  };
  var tmp = create();
  var perspectiveMatrix = create();
  var tmpVec4 = [0, 0, 0, 0];
  var row = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  var pdum3 = [0, 0, 0];
  module.exports = function decomposeMat4(matrix, translation, scale, skew, perspective, quaternion) {
    if (!translation)
      translation = [0, 0, 0];
    if (!scale)
      scale = [0, 0, 0];
    if (!skew)
      skew = [0, 0, 0];
    if (!perspective)
      perspective = [0, 0, 0, 1];
    if (!quaternion)
      quaternion = [0, 0, 0, 1];
    if (!normalize(tmp, matrix))
      return false;
    clone(perspectiveMatrix, tmp);
    perspectiveMatrix[3] = 0;
    perspectiveMatrix[7] = 0;
    perspectiveMatrix[11] = 0;
    perspectiveMatrix[15] = 1;
    if (Math.abs(determinant(perspectiveMatrix) < 0.00000001))
      return false;
    var a03 = tmp[3], a13 = tmp[7], a23 = tmp[11], a30 = tmp[12], a31 = tmp[13], a32 = tmp[14], a33 = tmp[15];
    if (a03 !== 0 || a13 !== 0 || a23 !== 0) {
      tmpVec4[0] = a03;
      tmpVec4[1] = a13;
      tmpVec4[2] = a23;
      tmpVec4[3] = a33;
      var ret = invert(perspectiveMatrix, perspectiveMatrix);
      if (!ret)
        return false;
      transpose(perspectiveMatrix, perspectiveMatrix);
      vec4multMat4(perspective, tmpVec4, perspectiveMatrix);
    } else {
      perspective[0] = perspective[1] = perspective[2] = 0;
      perspective[3] = 1;
    }
    translation[0] = a30;
    translation[1] = a31;
    translation[2] = a32;
    mat3from4(row, tmp);
    scale[0] = vec3.length(row[0]);
    vec3.normalize(row[0], row[0]);
    skew[0] = vec3.dot(row[0], row[1]);
    combine(row[1], row[1], row[0], 1, -skew[0]);
    scale[1] = vec3.length(row[1]);
    vec3.normalize(row[1], row[1]);
    skew[0] /= scale[1];
    skew[1] = vec3.dot(row[0], row[2]);
    combine(row[2], row[2], row[0], 1, -skew[1]);
    skew[2] = vec3.dot(row[1], row[2]);
    combine(row[2], row[2], row[1], 1, -skew[2]);
    scale[2] = vec3.length(row[2]);
    vec3.normalize(row[2], row[2]);
    skew[1] /= scale[2];
    skew[2] /= scale[2];
    vec3.cross(pdum3, row[1], row[2]);
    if (vec3.dot(row[0], pdum3) < 0) {
      for (var i = 0;i < 3; i++) {
        scale[i] *= -1;
        row[i][0] *= -1;
        row[i][1] *= -1;
        row[i][2] *= -1;
      }
    }
    quaternion[0] = 0.5 * Math.sqrt(Math.max(1 + row[0][0] - row[1][1] - row[2][2], 0));
    quaternion[1] = 0.5 * Math.sqrt(Math.max(1 - row[0][0] + row[1][1] - row[2][2], 0));
    quaternion[2] = 0.5 * Math.sqrt(Math.max(1 - row[0][0] - row[1][1] + row[2][2], 0));
    quaternion[3] = 0.5 * Math.sqrt(Math.max(1 + row[0][0] + row[1][1] + row[2][2], 0));
    if (row[2][1] > row[1][2])
      quaternion[0] = -quaternion[0];
    if (row[0][2] > row[2][0])
      quaternion[1] = -quaternion[1];
    if (row[1][0] > row[0][1])
      quaternion[2] = -quaternion[2];
    return true;
  };
});

// node_modules/gl-quat/slerp.js
var require_slerp = __commonJS((exports, module) => {
  var slerp = function(out, a, b, t) {
    var ax = a[0], ay = a[1], az = a[2], aw = a[3], bx = b[0], by = b[1], bz = b[2], bw = b[3];
    var omega, cosom, sinom, scale0, scale1;
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    if (cosom < 0) {
      cosom = -cosom;
      bx = -bx;
      by = -by;
      bz = -bz;
      bw = -bw;
    }
    if (1 - cosom > 0.000001) {
      omega = Math.acos(cosom);
      sinom = Math.sin(omega);
      scale0 = Math.sin((1 - t) * omega) / sinom;
      scale1 = Math.sin(t * omega) / sinom;
    } else {
      scale0 = 1 - t;
      scale1 = t;
    }
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;
    return out;
  };
  module.exports = slerp;
});

// node_modules/mat4-interpolate/index.js
var require_mat4_interpolate = __commonJS((exports, module) => {
  var interpolate = function(out, start, end, alpha) {
    if (determinant(start) === 0 || determinant(end) === 0)
      return false;
    var r0 = decompose(start, state0.translate, state0.scale, state0.skew, state0.perspective, state0.quaternion);
    var r1 = decompose(end, state1.translate, state1.scale, state1.skew, state1.perspective, state1.quaternion);
    if (!r0 || !r1)
      return false;
    lerp(tmp.translate, state0.translate, state1.translate, alpha);
    lerp(tmp.skew, state0.skew, state1.skew, alpha);
    lerp(tmp.scale, state0.scale, state1.scale, alpha);
    lerp(tmp.perspective, state0.perspective, state1.perspective, alpha);
    slerp(tmp.quaternion, state0.quaternion, state1.quaternion, alpha);
    recompose(out, tmp.translate, tmp.scale, tmp.skew, tmp.perspective, tmp.quaternion);
    return true;
  };
  var state = function() {
    return {
      translate: vec3(),
      scale: vec3(1),
      skew: vec3(),
      perspective: vec4(),
      quaternion: vec4()
    };
  };
  var vec3 = function(n) {
    return [n || 0, n || 0, n || 0];
  };
  var vec4 = function() {
    return [0, 0, 0, 1];
  };
  var lerp = require_lerp();
  var recompose = require_mat4_recompose();
  var decompose = require_mat4_decompose();
  var determinant = require_determinant();
  var slerp = require_slerp();
  var state0 = state();
  var state1 = state();
  var tmp = state();
  module.exports = interpolate;
});

// node_modules/gl-mat4/rotateX.js
var require_rotateX = __commonJS((exports, module) => {
  var rotateX = function(out, a, rad) {
    var s = Math.sin(rad), c = Math.cos(rad), a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    if (a !== out) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
  };
  module.exports = rotateX;
});

// node_modules/gl-mat4/rotateY.js
var require_rotateY = __commonJS((exports, module) => {
  var rotateY = function(out, a, rad) {
    var s = Math.sin(rad), c = Math.cos(rad), a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    if (a !== out) {
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
  };
  module.exports = rotateY;
});

// node_modules/gl-mat4/rotateZ.js
var require_rotateZ = __commonJS((exports, module) => {
  var rotateZ = function(out, a, rad) {
    var s = Math.sin(rad), c = Math.cos(rad), a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    if (a !== out) {
      out[8] = a[8];
      out[9] = a[9];
      out[10] = a[10];
      out[11] = a[11];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
  };
  module.exports = rotateZ;
});

// node_modules/matrix-camera-controller/matrix.js
var require_matrix = __commonJS((exports, module) => {
  var MatrixCameraController = function(initialMatrix) {
    this._components = initialMatrix.slice();
    this._time = [0];
    this.prevMatrix = initialMatrix.slice();
    this.nextMatrix = initialMatrix.slice();
    this.computedMatrix = initialMatrix.slice();
    this.computedInverse = initialMatrix.slice();
    this.computedEye = [0, 0, 0];
    this.computedUp = [0, 0, 0];
    this.computedCenter = [0, 0, 0];
    this.computedRadius = [0];
    this._limits = [(-Infinity), Infinity];
  };
  var createMatrixCameraController = function(options) {
    options = options || {};
    var matrix = options.matrix || [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ];
    return new MatrixCameraController(matrix);
  };
  var bsearch = require_search_bounds();
  var m4interp = require_mat4_interpolate();
  var invert44 = require_invert();
  var rotateX = require_rotateX();
  var rotateY = require_rotateY();
  var rotateZ = require_rotateZ();
  var lookAt = require_lookAt();
  var translate = require_translate();
  var scale = require_scale();
  var normalize = require_normalize();
  var DEFAULT_CENTER = [0, 0, 0];
  module.exports = createMatrixCameraController;
  var proto = MatrixCameraController.prototype;
  proto.recalcMatrix = function(t) {
    var time = this._time;
    var tidx = bsearch.le(time, t);
    var mat = this.computedMatrix;
    if (tidx < 0) {
      return;
    }
    var comps = this._components;
    if (tidx === time.length - 1) {
      var ptr = 16 * tidx;
      for (var i = 0;i < 16; ++i) {
        mat[i] = comps[ptr++];
      }
    } else {
      var dt = time[tidx + 1] - time[tidx];
      var ptr = 16 * tidx;
      var prev = this.prevMatrix;
      var allEqual = true;
      for (var i = 0;i < 16; ++i) {
        prev[i] = comps[ptr++];
      }
      var next = this.nextMatrix;
      for (var i = 0;i < 16; ++i) {
        next[i] = comps[ptr++];
        allEqual = allEqual && prev[i] === next[i];
      }
      if (dt < 0.000001 || allEqual) {
        for (var i = 0;i < 16; ++i) {
          mat[i] = prev[i];
        }
      } else {
        m4interp(mat, prev, next, (t - time[tidx]) / dt);
      }
    }
    var up = this.computedUp;
    up[0] = mat[1];
    up[1] = mat[5];
    up[2] = mat[9];
    normalize(up, up);
    var imat = this.computedInverse;
    invert44(imat, mat);
    var eye = this.computedEye;
    var w = imat[15];
    eye[0] = imat[12] / w;
    eye[1] = imat[13] / w;
    eye[2] = imat[14] / w;
    var center = this.computedCenter;
    var radius = Math.exp(this.computedRadius[0]);
    for (var i = 0;i < 3; ++i) {
      center[i] = eye[i] - mat[2 + 4 * i] * radius;
    }
  };
  proto.idle = function(t) {
    if (t < this.lastT()) {
      return;
    }
    var mc = this._components;
    var ptr = mc.length - 16;
    for (var i = 0;i < 16; ++i) {
      mc.push(mc[ptr++]);
    }
    this._time.push(t);
  };
  proto.flush = function(t) {
    var idx = bsearch.gt(this._time, t) - 2;
    if (idx < 0) {
      return;
    }
    this._time.splice(0, idx);
    this._components.splice(0, 16 * idx);
  };
  proto.lastT = function() {
    return this._time[this._time.length - 1];
  };
  proto.lookAt = function(t, eye, center, up) {
    this.recalcMatrix(t);
    eye = eye || this.computedEye;
    center = center || DEFAULT_CENTER;
    up = up || this.computedUp;
    this.setMatrix(t, lookAt(this.computedMatrix, eye, center, up));
    var d2 = 0;
    for (var i = 0;i < 3; ++i) {
      d2 += Math.pow(center[i] - eye[i], 2);
    }
    d2 = Math.log(Math.sqrt(d2));
    this.computedRadius[0] = d2;
  };
  proto.rotate = function(t, yaw, pitch, roll) {
    this.recalcMatrix(t);
    var mat = this.computedInverse;
    if (yaw)
      rotateY(mat, mat, yaw);
    if (pitch)
      rotateX(mat, mat, pitch);
    if (roll)
      rotateZ(mat, mat, roll);
    this.setMatrix(t, invert44(this.computedMatrix, mat));
  };
  var tvec = [0, 0, 0];
  proto.pan = function(t, dx, dy, dz) {
    tvec[0] = -(dx || 0);
    tvec[1] = -(dy || 0);
    tvec[2] = -(dz || 0);
    this.recalcMatrix(t);
    var mat = this.computedInverse;
    translate(mat, mat, tvec);
    this.setMatrix(t, invert44(mat, mat));
  };
  proto.translate = function(t, dx, dy, dz) {
    tvec[0] = dx || 0;
    tvec[1] = dy || 0;
    tvec[2] = dz || 0;
    this.recalcMatrix(t);
    var mat = this.computedMatrix;
    translate(mat, mat, tvec);
    this.setMatrix(t, mat);
  };
  proto.setMatrix = function(t, mat) {
    if (t < this.lastT()) {
      return;
    }
    this._time.push(t);
    for (var i = 0;i < 16; ++i) {
      this._components.push(mat[i]);
    }
  };
  proto.setDistance = function(t, d) {
    this.computedRadius[0] = d;
  };
  proto.setDistanceLimits = function(a, b) {
    var lim = this._limits;
    lim[0] = a;
    lim[1] = b;
  };
  proto.getDistanceLimits = function(out) {
    var lim = this._limits;
    if (out) {
      out[0] = lim[0];
      out[1] = lim[1];
      return out;
    }
    return lim;
  };
});

// node_modules/3d-view/view.js
var require_view = __commonJS((exports, module) => {
  var ViewController = function(controllers, mode) {
    this._controllerNames = Object.keys(controllers);
    this._controllerList = this._controllerNames.map(function(n) {
      return controllers[n];
    });
    this._mode = mode;
    this._active = controllers[mode];
    if (!this._active) {
      this._mode = "turntable";
      this._active = controllers.turntable;
    }
    this.modes = this._controllerNames;
    this.computedMatrix = this._active.computedMatrix;
    this.computedEye = this._active.computedEye;
    this.computedUp = this._active.computedUp;
    this.computedCenter = this._active.computedCenter;
    this.computedRadius = this._active.computedRadius;
  };
  var createViewController = function(options) {
    options = options || {};
    var eye = options.eye || [0, 0, 1];
    var center = options.center || [0, 0, 0];
    var up = options.up || [0, 1, 0];
    var limits = options.distanceLimits || [0, Infinity];
    var mode = options.mode || "turntable";
    var turntable = createTurntable();
    var orbit = createOrbit();
    var matrix = createMatrix();
    turntable.setDistanceLimits(limits[0], limits[1]);
    turntable.lookAt(0, eye, center, up);
    orbit.setDistanceLimits(limits[0], limits[1]);
    orbit.lookAt(0, eye, center, up);
    matrix.setDistanceLimits(limits[0], limits[1]);
    matrix.lookAt(0, eye, center, up);
    return new ViewController({
      turntable,
      orbit,
      matrix
    }, mode);
  };
  module.exports = createViewController;
  var createTurntable = require_turntable();
  var createOrbit = require_orbit();
  var createMatrix = require_matrix();
  var proto = ViewController.prototype;
  proto.flush = function(a0) {
    var cc = this._controllerList;
    for (var i = 0;i < cc.length; ++i) {
      cc[i].flush(a0);
    }
  };
  proto.idle = function(a0) {
    var cc = this._controllerList;
    for (var i = 0;i < cc.length; ++i) {
      cc[i].idle(a0);
    }
  };
  proto.lookAt = function(a0, a1, a2, a3) {
    var cc = this._controllerList;
    for (var i = 0;i < cc.length; ++i) {
      cc[i].lookAt(a0, a1, a2, a3);
    }
  };
  proto.rotate = function(a0, a1, a2, a3) {
    var cc = this._controllerList;
    for (var i = 0;i < cc.length; ++i) {
      cc[i].rotate(a0, a1, a2, a3);
    }
  };
  proto.pan = function(a0, a1, a2, a3) {
    var cc = this._controllerList;
    for (var i = 0;i < cc.length; ++i) {
      cc[i].pan(a0, a1, a2, a3);
    }
  };
  proto.translate = function(a0, a1, a2, a3) {
    var cc = this._controllerList;
    for (var i = 0;i < cc.length; ++i) {
      cc[i].translate(a0, a1, a2, a3);
    }
  };
  proto.setMatrix = function(a0, a1) {
    var cc = this._controllerList;
    for (var i = 0;i < cc.length; ++i) {
      cc[i].setMatrix(a0, a1);
    }
  };
  proto.setDistanceLimits = function(a0, a1) {
    var cc = this._controllerList;
    for (var i = 0;i < cc.length; ++i) {
      cc[i].setDistanceLimits(a0, a1);
    }
  };
  proto.setDistance = function(a0, a1) {
    var cc = this._controllerList;
    for (var i = 0;i < cc.length; ++i) {
      cc[i].setDistance(a0, a1);
    }
  };
  proto.recalcMatrix = function(t) {
    this._active.recalcMatrix(t);
  };
  proto.getDistance = function(t) {
    return this._active.getDistance(t);
  };
  proto.getDistanceLimits = function(out) {
    return this._active.getDistanceLimits(out);
  };
  proto.lastT = function() {
    return this._active.lastT();
  };
  proto.setMode = function(mode) {
    if (mode === this._mode) {
      return;
    }
    var idx = this._controllerNames.indexOf(mode);
    if (idx < 0) {
      return;
    }
    var prev = this._active;
    var next = this._controllerList[idx];
    var lastT = Math.max(prev.lastT(), next.lastT());
    prev.recalcMatrix(lastT);
    next.setMatrix(lastT, prev.computedMatrix);
    this._active = next;
    this._mode = mode;
    this.computedMatrix = this._active.computedMatrix;
    this.computedEye = this._active.computedEye;
    this.computedUp = this._active.computedUp;
    this.computedCenter = this._active.computedCenter;
    this.computedRadius = this._active.computedRadius;
  };
  proto.getMode = function() {
    return this._mode;
  };
});

// node_modules/mouse-event/mouse.js
var require_mouse = __commonJS((exports) => {
  var mouseButtons = function(ev) {
    if (typeof ev === "object") {
      if ("buttons" in ev) {
        return ev.buttons;
      } else if ("which" in ev) {
        var b = ev.which;
        if (b === 2) {
          return 4;
        } else if (b === 3) {
          return 2;
        } else if (b > 0) {
          return 1 << b - 1;
        }
      } else if ("button" in ev) {
        var b = ev.button;
        if (b === 1) {
          return 4;
        } else if (b === 2) {
          return 2;
        } else if (b >= 0) {
          return 1 << b;
        }
      }
    }
    return 0;
  };
  var mouseElement = function(ev) {
    return ev.target || ev.srcElement || window;
  };
  var mouseRelativeX = function(ev) {
    if (typeof ev === "object") {
      if ("offsetX" in ev) {
        return ev.offsetX;
      }
      var target = mouseElement(ev);
      var bounds = target.getBoundingClientRect();
      return ev.clientX - bounds.left;
    }
    return 0;
  };
  var mouseRelativeY = function(ev) {
    if (typeof ev === "object") {
      if ("offsetY" in ev) {
        return ev.offsetY;
      }
      var target = mouseElement(ev);
      var bounds = target.getBoundingClientRect();
      return ev.clientY - bounds.top;
    }
    return 0;
  };
  exports.buttons = mouseButtons;
  exports.element = mouseElement;
  exports.x = mouseRelativeX;
  exports.y = mouseRelativeY;
});

// node_modules/mouse-change/mouse-listen.js
var require_mouse_listen = __commonJS((exports, module) => {
  var mouseListen = function(element, callback) {
    if (!callback) {
      callback = element;
      element = window;
    }
    var buttonState = 0;
    var x = 0;
    var y = 0;
    var mods = {
      shift: false,
      alt: false,
      control: false,
      meta: false
    };
    var attached = false;
    function updateMods(ev) {
      var changed = false;
      if ("altKey" in ev) {
        changed = changed || ev.altKey !== mods.alt;
        mods.alt = !!ev.altKey;
      }
      if ("shiftKey" in ev) {
        changed = changed || ev.shiftKey !== mods.shift;
        mods.shift = !!ev.shiftKey;
      }
      if ("ctrlKey" in ev) {
        changed = changed || ev.ctrlKey !== mods.control;
        mods.control = !!ev.ctrlKey;
      }
      if ("metaKey" in ev) {
        changed = changed || ev.metaKey !== mods.meta;
        mods.meta = !!ev.metaKey;
      }
      return changed;
    }
    function handleEvent(nextButtons, ev) {
      var nextX = mouse.x(ev);
      var nextY = mouse.y(ev);
      if ("buttons" in ev) {
        nextButtons = ev.buttons | 0;
      }
      if (nextButtons !== buttonState || nextX !== x || nextY !== y || updateMods(ev)) {
        buttonState = nextButtons | 0;
        x = nextX || 0;
        y = nextY || 0;
        callback && callback(buttonState, x, y, mods);
      }
    }
    function clearState(ev) {
      handleEvent(0, ev);
    }
    function handleBlur() {
      if (buttonState || x || y || mods.shift || mods.alt || mods.meta || mods.control) {
        x = y = 0;
        buttonState = 0;
        mods.shift = mods.alt = mods.control = mods.meta = false;
        callback && callback(0, 0, 0, mods);
      }
    }
    function handleMods(ev) {
      if (updateMods(ev)) {
        callback && callback(buttonState, x, y, mods);
      }
    }
    function handleMouseMove(ev) {
      if (mouse.buttons(ev) === 0) {
        handleEvent(0, ev);
      } else {
        handleEvent(buttonState, ev);
      }
    }
    function handleMouseDown(ev) {
      handleEvent(buttonState | mouse.buttons(ev), ev);
    }
    function handleMouseUp(ev) {
      handleEvent(buttonState & ~mouse.buttons(ev), ev);
    }
    function attachListeners() {
      if (attached) {
        return;
      }
      attached = true;
      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mousedown", handleMouseDown);
      element.addEventListener("mouseup", handleMouseUp);
      element.addEventListener("mouseleave", clearState);
      element.addEventListener("mouseenter", clearState);
      element.addEventListener("mouseout", clearState);
      element.addEventListener("mouseover", clearState);
      element.addEventListener("blur", handleBlur);
      element.addEventListener("keyup", handleMods);
      element.addEventListener("keydown", handleMods);
      element.addEventListener("keypress", handleMods);
      if (element !== window) {
        window.addEventListener("blur", handleBlur);
        window.addEventListener("keyup", handleMods);
        window.addEventListener("keydown", handleMods);
        window.addEventListener("keypress", handleMods);
      }
    }
    function detachListeners() {
      if (!attached) {
        return;
      }
      attached = false;
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mousedown", handleMouseDown);
      element.removeEventListener("mouseup", handleMouseUp);
      element.removeEventListener("mouseleave", clearState);
      element.removeEventListener("mouseenter", clearState);
      element.removeEventListener("mouseout", clearState);
      element.removeEventListener("mouseover", clearState);
      element.removeEventListener("blur", handleBlur);
      element.removeEventListener("keyup", handleMods);
      element.removeEventListener("keydown", handleMods);
      element.removeEventListener("keypress", handleMods);
      if (element !== window) {
        window.removeEventListener("blur", handleBlur);
        window.removeEventListener("keyup", handleMods);
        window.removeEventListener("keydown", handleMods);
        window.removeEventListener("keypress", handleMods);
      }
    }
    attachListeners();
    var result = {
      element
    };
    Object.defineProperties(result, {
      enabled: {
        get: function() {
          return attached;
        },
        set: function(f) {
          if (f) {
            attachListeners();
          } else {
            detachListeners();
          }
        },
        enumerable: true
      },
      buttons: {
        get: function() {
          return buttonState;
        },
        enumerable: true
      },
      x: {
        get: function() {
          return x;
        },
        enumerable: true
      },
      y: {
        get: function() {
          return y;
        },
        enumerable: true
      },
      mods: {
        get: function() {
          return mods;
        },
        enumerable: true
      }
    });
    return result;
  };
  module.exports = mouseListen;
  var mouse = require_mouse();
});

// node_modules/parse-unit/index.js
var require_parse_unit = __commonJS((exports, module) => {
  module.exports = function parseUnit(str, out) {
    if (!out)
      out = [0, ""];
    str = String(str);
    var num = parseFloat(str, 10);
    out[0] = num;
    out[1] = str.match(/[\d.\-\+]*\s*(.*)/)[1] || "";
    return out;
  };
});

// node_modules/to-px/browser.js
var require_browser2 = __commonJS((exports, module) => {
  var getPropertyInPX = function(element, prop) {
    var parts = parseUnit(getComputedStyle(element).getPropertyValue(prop));
    return parts[0] * toPX(parts[1], element);
  };
  var getSizeBrutal = function(unit, element) {
    var testDIV = document.createElement("div");
    testDIV.style["height"] = "128" + unit;
    element.appendChild(testDIV);
    var size = getPropertyInPX(testDIV, "height") / 128;
    element.removeChild(testDIV);
    return size;
  };
  var toPX = function(str, element) {
    if (!str)
      return null;
    element = element || document.body;
    str = (str + "" || "px").trim().toLowerCase();
    if (element === window || element === document) {
      element = document.body;
    }
    switch (str) {
      case "%":
        return element.clientHeight / 100;
      case "ch":
      case "ex":
        return getSizeBrutal(str, element);
      case "em":
        return getPropertyInPX(element, "font-size");
      case "rem":
        return getPropertyInPX(document.body, "font-size");
      case "vw":
        return window.innerWidth / 100;
      case "vh":
        return window.innerHeight / 100;
      case "vmin":
        return Math.min(window.innerWidth, window.innerHeight) / 100;
      case "vmax":
        return Math.max(window.innerWidth, window.innerHeight) / 100;
      case "in":
        return PIXELS_PER_INCH;
      case "cm":
        return PIXELS_PER_INCH / 2.54;
      case "mm":
        return PIXELS_PER_INCH / 25.4;
      case "pt":
        return PIXELS_PER_INCH / 72;
      case "pc":
        return PIXELS_PER_INCH / 6;
      case "px":
        return 1;
    }
    var parts = parseUnit(str);
    if (!isNaN(parts[0]) && parts[1]) {
      var px = toPX(parts[1], element);
      return typeof px === "number" ? parts[0] * px : null;
    }
    return null;
  };
  var parseUnit = require_parse_unit();
  module.exports = toPX;
  var PIXELS_PER_INCH = getSizeBrutal("in", document.body);
});

// node_modules/mouse-wheel/wheel.js
var require_wheel = __commonJS((exports, module) => {
  var mouseWheelListen = function(element, callback, noScroll) {
    if (typeof element === "function") {
      noScroll = !!callback;
      callback = element;
      element = window;
    }
    var lineHeight = toPX("ex", element);
    var listener = function(ev) {
      if (noScroll) {
        ev.preventDefault();
      }
      var dx = ev.deltaX || 0;
      var dy = ev.deltaY || 0;
      var dz = ev.deltaZ || 0;
      var mode = ev.deltaMode;
      var scale = 1;
      switch (mode) {
        case 1:
          scale = lineHeight;
          break;
        case 2:
          scale = window.innerHeight;
          break;
      }
      dx *= scale;
      dy *= scale;
      dz *= scale;
      if (dx || dy || dz) {
        return callback(dx, dy, dz, ev);
      }
    };
    element.addEventListener("wheel", listener);
    return listener;
  };
  var toPX = require_browser2();
  module.exports = mouseWheelListen;
});

// node_modules/mouse-event-offset/index.js
var require_mouse_event_offset = __commonJS((exports, module) => {
  var mouseEventOffset = function(ev, target, out) {
    target = target || ev.currentTarget || ev.srcElement;
    if (!Array.isArray(out)) {
      out = [0, 0];
    }
    var cx = ev.clientX || 0;
    var cy = ev.clientY || 0;
    var rect = getBoundingClientOffset(target);
    out[0] = cx - rect.left;
    out[1] = cy - rect.top;
    return out;
  };
  var getBoundingClientOffset = function(element) {
    if (element === window || element === document || element === document.body) {
      return rootPosition;
    } else {
      return element.getBoundingClientRect();
    }
  };
  var rootPosition = { left: 0, top: 0 };
  module.exports = mouseEventOffset;
});

// node_modules/is-browser/client.js
var require_client = __commonJS((exports, module) => {
  module.exports = true;
});

// node_modules/has-passive-events/index.js
var require_has_passive_events = __commonJS((exports, module) => {
  var detect = function() {
    var supported = false;
    try {
      var opts = Object.defineProperty({}, "passive", {
        get: function() {
          supported = true;
        }
      });
      window.addEventListener("test", null, opts);
      window.removeEventListener("test", null, opts);
    } catch (e) {
      supported = false;
    }
    return supported;
  };
  var isBrowser = require_client();
  module.exports = isBrowser && detect();
});

// camera.js
var require_camera = __commonJS((exports, module) => {
  var createCamera = function(element, options) {
    element = element || document.body;
    options = options || {};
    var limits = [0.01, Infinity];
    if ("distanceLimits" in options) {
      limits[0] = options.distanceLimits[0];
      limits[1] = options.distanceLimits[1];
    }
    if ("zoomMin" in options) {
      limits[0] = options.zoomMin;
    }
    if ("zoomMax" in options) {
      limits[1] = options.zoomMax;
    }
    var view = createView({
      center: options.center || [0, 0, 0],
      up: options.up || [0, 1, 0],
      eye: options.eye || [0, 0, 10],
      mode: options.mode || "orbit",
      distanceLimits: limits
    });
    var pmatrix = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var distance = 0;
    var width = element.clientWidth;
    var height = element.clientHeight;
    var camera = {
      view,
      element,
      delay: options.delay || 16,
      rotateSpeed: options.rotateSpeed || 1,
      zoomSpeed: options.zoomSpeed || 1,
      translateSpeed: options.translateSpeed || 1,
      flipX: !!options.flipX,
      flipY: !!options.flipY,
      modes: view.modes,
      tick: function() {
        var t = now();
        var delay = this.delay;
        view.idle(t - delay);
        view.flush(t - (100 + delay * 2));
        var ctime = t - 2 * delay;
        view.recalcMatrix(ctime);
        var allEqual = true;
        var matrix = view.computedMatrix;
        for (var i = 0;i < 16; ++i) {
          allEqual = allEqual && pmatrix[i] === matrix[i];
          pmatrix[i] = matrix[i];
        }
        var sizeChanged = element.clientWidth === width && element.clientHeight === height;
        width = element.clientWidth;
        height = element.clientHeight;
        if (allEqual) {
          return !sizeChanged;
        }
        distance = Math.exp(view.computedRadius[0]);
        return true;
      },
      lookAt: function(center, eye, up) {
        view.lookAt(view.lastT(), center, eye, up);
      },
      rotate: function(pitch, yaw, roll) {
        view.rotate(view.lastT(), pitch, yaw, roll);
      },
      pan: function(dx, dy, dz) {
        view.pan(view.lastT(), dx, dy, dz);
      },
      translate: function(dx, dy, dz) {
        view.translate(view.lastT(), dx, dy, dz);
      }
    };
    Object.defineProperties(camera, {
      matrix: {
        get: function() {
          return view.computedMatrix;
        },
        set: function(mat) {
          view.setMatrix(view.lastT(), mat);
          return view.computedMatrix;
        },
        enumerable: true
      },
      mode: {
        get: function() {
          return view.getMode();
        },
        set: function(mode) {
          view.setMode(mode);
          return view.getMode();
        },
        enumerable: true
      },
      center: {
        get: function() {
          return view.computedCenter;
        },
        set: function(ncenter) {
          view.lookAt(view.lastT(), ncenter);
          return view.computedCenter;
        },
        enumerable: true
      },
      eye: {
        get: function() {
          return view.computedEye;
        },
        set: function(neye) {
          view.lookAt(view.lastT(), null, neye);
          return view.computedEye;
        },
        enumerable: true
      },
      up: {
        get: function() {
          return view.computedUp;
        },
        set: function(nup) {
          view.lookAt(view.lastT(), null, null, nup);
          return view.computedUp;
        },
        enumerable: true
      },
      distance: {
        get: function() {
          return distance;
        },
        set: function(d) {
          view.setDistance(view.lastT(), d);
          return d;
        },
        enumerable: true
      },
      distanceLimits: {
        get: function() {
          return view.getDistanceLimits(limits);
        },
        set: function(v) {
          view.setDistanceLimits(v);
          return v;
        },
        enumerable: true
      }
    });
    element.addEventListener("contextmenu", function(ev) {
      ev.preventDefault();
      return false;
    });
    var lastX = 0, lastY = 0, lastMods = { shift: false, control: false, alt: false, meta: false };
    mouseChange(element, handleInteraction);
    element.addEventListener("touchstart", function(ev) {
      var xy = mouseOffset(ev.changedTouches[0], element);
      handleInteraction(0, xy[0], xy[1], lastMods);
      handleInteraction(1, xy[0], xy[1], lastMods);
      ev.preventDefault();
    }, hasPassive ? { passive: false } : false);
    element.addEventListener("touchmove", function(ev) {
      var xy = mouseOffset(ev.changedTouches[0], element);
      handleInteraction(1, xy[0], xy[1], lastMods);
      ev.preventDefault();
    }, hasPassive ? { passive: false } : false);
    element.addEventListener("touchend", function(ev) {
      var xy = mouseOffset(ev.changedTouches[0], element);
      handleInteraction(0, lastX, lastY, lastMods);
      ev.preventDefault();
    }, hasPassive ? { passive: false } : false);
    function handleInteraction(buttons, x, y, mods) {
      var scale = 1 / element.clientHeight;
      var dx = scale * (x - lastX);
      var dy = scale * (y - lastY);
      var flipX = camera.flipX ? 1 : -1;
      var flipY = camera.flipY ? 1 : -1;
      var drot = Math.PI * camera.rotateSpeed;
      var t = now();
      if (buttons & 1) {
        if (mods.shift) {
          view.rotate(t, 0, 0, -dx * drot);
        } else {
          view.rotate(t, flipX * drot * dx, -flipY * drot * dy, 0);
        }
      } else if (buttons & 2) {
        view.pan(t, -camera.translateSpeed * dx * distance, camera.translateSpeed * dy * distance, 0);
      } else if (buttons & 4) {
        var kzoom = camera.zoomSpeed * dy / window.innerHeight * (t - view.lastT()) * 50;
        view.pan(t, 0, 0, distance * (Math.exp(kzoom) - 1));
      }
      lastX = x;
      lastY = y;
      lastMods = mods;
    }
    mouseWheel(element, function(dx, dy, dz) {
      var flipX = camera.flipX ? 1 : -1;
      var flipY = camera.flipY ? 1 : -1;
      var t = now();
      if (Math.abs(dx) > Math.abs(dy)) {
        view.rotate(t, 0, 0, -dx * flipX * Math.PI * camera.rotateSpeed / window.innerWidth);
      } else {
        var kzoom = camera.zoomSpeed * flipY * dy / window.innerHeight * (t - view.lastT()) / 100;
        view.pan(t, 0, 0, distance * (Math.exp(kzoom) - 1));
      }
    }, true);
    return camera;
  };
  module.exports = createCamera;
  var now = require_browser();
  var createView = require_view();
  var mouseChange = require_mouse_listen();
  var mouseWheel = require_wheel();
  var mouseOffset = require_mouse_event_offset();
  var hasPassive = require_has_passive_events();
});
export default require_camera();
