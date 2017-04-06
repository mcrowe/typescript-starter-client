/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

"use strict";
"use strict";
function make(x, y) {
    return { x: x, y: y };
}
function add(a, b) {
    return make(a.x + b.x, a.y + b.y);
}
function scale(a, s) {
    return make(a.x * s, a.y * s);
}
function sub(a, b) {
    return add(a, scale(b, -1));
}
function len(a) {
    return Math.sqrt(a.x * a.x + a.y * a.y);
}
function normalize(a) {
    var l = len(a);
    if (l == 0) {
        return make(1, 0);
    }
    else {
        return scale(a, 1 / l);
    }
}
function distance(a, b) {
    return len(sub(b, a));
}
// Ray from a to b
function ray(a, b) {
    return normalize(sub(b, a));
}
function dot(a, b) {
    return a.x * b.x + a.y * b.y;
}
// Rotate vector v by t radians
function rotate(v, t) {
    var ct = Math.cos(t);
    var st = Math.sin(t);
    return make(ct * v.x - st * v.y, st * v.x + ct * v.y);
}
// Angle between two normalized vectors with sign
function angle(a, b) {
    var t = Math.atan2(b.y, b.x) - Math.atan2(a.y, a.x);
    if (t < 0) {
        return 2 * Math.PI + t;
    }
    else {
        return t;
    }
}
function rayFromAngle(t) {
    return make(Math.cos(t), Math.sin(t));
}
// Rotate from a towards b, by a maximum of 't' radians.
function rotateToward(a, b, t) {
    var full = angle(a, b);
    if (full == 0 || Math.abs(full) < t) {
        return b;
    }
    else {
        if (full > Math.PI) {
            return rotate(a, -t);
        }
        else {
            return rotate(a, t);
        }
    }
}
function interpolate(a, b, t) {
    var d = sub(b, a);
    return add(a, scale(d, t));
}
function isEqual(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) < 0.000001;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    make: make,
    add: add,
    scale: scale,
    sub: sub,
    len: len,
    normalize: normalize,
    distance: distance,
    ray: ray,
    dot: dot,
    rotate: rotate,
    angle: angle,
    rayFromAngle: rayFromAngle,
    rotateToward: rotateToward,
    interpolate: interpolate,
    isEqual: isEqual
};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var vector_1 = __webpack_require__(0);
var CANVAS_WIDTH = 600;
function mod(num, modulus) {
    return ((num < 0) ? Math.abs(modulus) : 0) + (num % modulus);
}
function drawCircle(ctx, props, camera) {
    var x = props.x, y = props.y, r = props.r;
    var cx = camera.x - camera.w / 2;
    var cy = camera.y - camera.w / 2;
    var sx = mod(x - cx, 1000) * CANVAS_WIDTH / camera.w;
    var sy = mod(y - cy, 1000) * CANVAS_WIDTH / camera.w;
    var sr = r * CANVAS_WIDTH / camera.w;
    ctx.beginPath();
    ctx.fillStyle = props.color;
    ctx.arc(sx, sy, sr, 0, 2 * Math.PI);
    ctx.fill();
}
function drawText(ctx, props, _camera) {
    var opts = Object.assign({}, { x: 0, y: 0, message: 'Text', size: 50, color: 'black' }, props);
    ctx.font = opts.size + 'px "Comic Sans MS"';
    ctx.fillStyle = opts.color;
    ctx.fillText(opts.message, opts.x, opts.y);
}
function drawLine(ctx, props, camera) {
    var start = props.start, end = props.end, r = props.r, color = props.color;
    var n = Math.round(vector_1.default.distance(start, end) * 1);
    for (var i = 0; i < n; i++) {
        var p = vector_1.default.interpolate(start, end, i / n);
        drawCircle(ctx, { x: p.x, y: p.y, r: r, color: color }, camera);
    }
}
// TODO: Draw a proper path, for efficiency
function drawPath(ctx, props, camera) {
    var path = props.path, r = props.r, color = props.color;
    for (var i = 0; i < path.length - 1; i++) {
        drawLine(ctx, { start: path[i], end: path[i + 1], r: r, color: color }, camera);
    }
}
// function drawPath(ctx, props, camera) {
//   ctx.strokeStyle = props.color
//   ctx.r = props.r
//   const { path } = props
//   ctx.beginPath()
//   ctx.moveTo(path[0].x, path[0].y)
//   for (let p of props.path) {
//     ctx.lineTo(p.x, p.y)
//   }
//   ctx.stroke()
// }
function drawModel(ctx, model, camera) {
    switch (model.type) {
        case 'circle':
            drawCircle(ctx, model.props, camera);
            break;
        case 'text':
            drawText(ctx, model.props, camera);
            break;
        case 'path':
            drawPath(ctx, model.props, camera);
            break;
        default:
            throw new Error('Unexpected model type: ' + model.type);
    }
}
function paintScene(ctx, scene) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH);
    ctx.fillStyle = '#000000';
    for (var _i = 0, _a = scene.models; _i < _a.length; _i++) {
        var model = _a[_i];
        drawModel(ctx, model, scene.camera);
    }
}
function makeGame(el, update, render, initialState) {
    var ctx = el.getContext('2d');
    var t = Date.now();
    var state = initialState;
    function loop() {
        var now = Date.now();
        var dt = now - t;
        t = now;
        update(state, dt);
        var scene = render(state);
        paintScene(ctx, scene);
        requestAnimationFrame(loop);
    }
    loop();
}
function makeModel(type, props) {
    return { type: type, props: props };
}
function makeCircle(props) {
    return makeModel('circle', props);
}
function makePath(props) {
    return makeModel('path', props);
}
function makeText(props) {
    return makeModel('text', props);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { makeGame: makeGame, makeCircle: makeCircle, makeText: makeText, makePath: makePath };


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var regame_1 = __webpack_require__(1);
var vector_1 = __webpack_require__(0);
var game_1 = __webpack_require__(7);
var renderer_1 = __webpack_require__(8);
var controller_1 = __webpack_require__(6);
var state = game_1.default.getInitialState();
var controller = new controller_1.default();
controller.onHead(function (h) {
    return game_1.default.setPlayerHead(state, h);
});
document.addEventListener('touchstart', function (e) {
    var touch = e.changedTouches[0];
    // console.log(touch.pageX, touch.pageY)
    var p = vector_1.default.make(touch.pageX, touch.pageY);
    var h = vector_1.default.ray(vector_1.default.make(300, 300), p);
    game_1.default.setPlayerHead(state, h);
});
regame_1.default.makeGame(document.getElementById('canvas'), game_1.default.update, renderer_1.default.render, state);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var util_1 = __webpack_require__(5);
var ComputerController = (function () {
    function ComputerController() {
    }
    ComputerController.prototype.onClick = function (fn) {
        document.addEventListener('click', function (e) {
            fn({ x: e.clientX, y: e.clientY });
        });
    };
    ComputerController.prototype.onMouseMove = function (fn, period) {
        var handler = function (e) {
            fn({ x: e.clientX, y: e.clientY });
        };
        document.addEventListener('mousemove', util_1.default.throttle(handler, period));
    };
    ComputerController.prototype.onKeyDown = function (code, fn) {
        document.addEventListener('keydown', function (e) {
            if (e.which == code) {
                fn();
            }
        });
    };
    ComputerController.prototype.onKeyUp = function (code, fn) {
        document.addEventListener('keyup', function (e) {
            if (e.which == code) {
                fn();
            }
        });
    };
    return ComputerController;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ComputerController;


/***/ },
/* 4 */
/***/ function(module, exports) {

"use strict";
"use strict";
var CODES = {
    LEFT: 37,
    DOWN: 38,
    RIGHT: 39,
    UP: 40,
    SPACE: 32,
    ENTER: 13,
    A: 65,
    S: 87,
    D: 68,
    W: 83,
    R: 82,
    F: 70,
    ONE: 49
};
function code(name) {
    var code = CODES[name];
    if (code) {
        return code;
    }
    else {
        throw new Error('Unrecognized key name: ' + name);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { code: code };


/***/ },
/* 5 */
/***/ function(module, exports) {

"use strict";
"use strict";
function throttle(fn, threshhold) {
    var last, deferTimer;
    return function () {
        var context = this;
        var now = +new Date, args = arguments;
        if (last && now < last + threshhold) {
            // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                last = now;
                fn.apply(context, args);
            }, threshhold);
        }
        else {
            last = now;
            fn.apply(context, args);
        }
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { throttle: throttle };


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var key_1 = __webpack_require__(4);
var computer_controller_1 = __webpack_require__(3);
var vector_1 = __webpack_require__(0);
var SPACE = key_1.default.code('SPACE');
var ENTER = key_1.default.code('ENTER');
var CANVAS_MIDDLE = vector_1.default.make(300, 300);
var Controller = (function () {
    function Controller() {
        this.ctl = new computer_controller_1.default();
    }
    Controller.prototype.onHead = function (fn) {
        this.ctl.onClick(function (p) {
            fn(vector_1.default.ray(CANVAS_MIDDLE, p));
        });
        return this;
    };
    return Controller;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Controller;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var vector_1 = __webpack_require__(0);
// function makeSnake(p: Point, h: Point, speed: number, length: number): Snake {
//   return {
//     ps: [p, Vec.sub(p, Vec.scale(h, length/2)), Vec.sub(p, Vec.scale(h, length))],
//     h: h,
//     speed: speed
//   }
// }
function getInitialState() {
    return {
        snakes: {
            1: {
                speed: 0.10,
                h: { x: 0, y: 1 },
                ps: [{ x: 0, y: 100 }, { x: 0, y: 80 }, { x: 0, y: 60 }, { x: 0, y: 40 }, { x: 0, y: 0 }]
            }
        },
        camera: {
            x: 0, y: 0, w: 200
        },
        playerId: '1'
    };
}
function gaussian(mu, sigma, x) {
    var s2 = 2 * sigma * sigma;
    var d = x - mu;
    return Math.exp(-(d * d) / s2);
}
function turnSpeedUp(snake, h) {
    var dot = vector_1.default.dot(snake.h, h);
    var d = vector_1.default.distance(snake.ps[0], snake.ps[1]);
    var t = gaussian(500 * snake.speed, 5, d);
    var f = 0.6 * (1 - Math.abs(dot)) * t;
    console.log(dot, d, t, f);
    return snake.speed * f;
}
function turnSnake(snake, h) {
    snake.speed += turnSpeedUp(snake, h);
    snake.h = h;
}
function setPlayerHead(state, h) {
    turnSnake(getPlayerSnake(state), h);
    var snake = getPlayerSnake(state);
    var dot = vector_1.default.dot(snake.h, h);
}
function getPlayerSnake(state) {
    return state.snakes[state.playerId];
}
function focusCamera(state) {
    var snake = getPlayerSnake(state);
    state.camera = {
        x: snake.ps[0].x % 1000,
        y: snake.ps[0].y % 1000,
        w: 200
    };
}
function moveSnake(snake, dt) {
    var d = snake.speed * dt;
    var h = vector_1.default.ray(snake.ps[1], snake.ps[0]);
    if (vector_1.default.isEqual(h, snake.h)) {
        snake.ps[0] = vector_1.default.add(snake.ps[0], vector_1.default.scale(snake.h, d));
    }
    else {
        snake.ps.unshift(vector_1.default.add(snake.ps[0], vector_1.default.scale(snake.h, d)));
    }
    var n = snake.ps.length;
    var t = vector_1.default.distance(snake.ps[n - 1], snake.ps[n - 2]);
    if (d < t) {
        var h_1 = vector_1.default.ray(snake.ps[n - 1], snake.ps[n - 2]);
        snake.ps[n - 1] = vector_1.default.add(snake.ps[n - 1], vector_1.default.scale(h_1, d));
    }
    else {
        var h_2 = vector_1.default.ray(snake.ps[n - 2], snake.ps[n - 3]);
        snake.ps[n - 2] = vector_1.default.add(snake.ps[n - 2], vector_1.default.scale(h_2, d - t));
        snake.ps.pop();
    }
}
function dragSnake(snake, dt) {
    var s = snake.speed;
    if (snake.speed > 0.05)
        snake.speed -= 0.0001 * s * dt + 0.001 * s * s * dt;
    // console.log('s', snake.speed)
}
function moveSnakes(state, dt) {
    for (var id in state.snakes) {
        var snake = state.snakes[id];
        moveSnake(snake, dt);
        dragSnake(snake, dt);
    }
}
function update(state, dt) {
    moveSnakes(state, dt);
    focusCamera(state);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getInitialState: getInitialState,
    setPlayerHead: setPlayerHead,
    update: update,
    moveSnake: moveSnake
};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var regame_1 = __webpack_require__(1);
function render(state) {
    var models = [];
    // draw a grid
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 20; j++) {
            models.push(regame_1.default.makeCircle({ x: i * 50, y: j * 50, r: 0.5, color: '#999' }));
        }
    }
    for (var id in state.snakes) {
        var snake = state.snakes[id];
        models.push(regame_1.default.makePath({ path: snake.ps, r: 5, color: '#000' }));
    }
    return {
        models: models,
        camera: state.camera
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { render: render };


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map