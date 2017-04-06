import Vec from '../lib/vector'
import { State, Point, Snake } from '../types'


// function makeSnake(p: Point, h: Point, speed: number, length: number): Snake {
//   return {
//     ps: [p, Vec.sub(p, Vec.scale(h, length/2)), Vec.sub(p, Vec.scale(h, length))],
//     h: h,
//     speed: speed
//   }
// }


function getInitialState(): State {
  return {
    snakes: {
      1: {
        speed: 0.10,
        h: {x: 0, y: 1},
        ps: [{x: 0, y: 100}, {x: 0, y: 80}, {x: 0, y: 60}, {x: 0, y: 40}, {x: 0, y: 0}]
      }
    },
    camera: {
      x: 0, y: 0, w: 200
    },
    playerId: '1'
  }
}


function gaussian(mu, sigma, x) {
  const s2 = 2 * sigma * sigma
  const d = x - mu
  return Math.exp(-(d * d)/s2)
}


function turnSpeedUp(snake: Snake, h: Point): number {
  const dot = Vec.dot(snake.h, h)
  const d = Vec.distance(snake.ps[0], snake.ps[1])


  const t = gaussian(500 * snake.speed, 5, d)

  const f = 0.6 * (1 - Math.abs(dot)) * t

  console.log(dot, d, t, f)

  return snake.speed * f
}


function turnSnake(snake: Snake, h: Point) {
  snake.speed += turnSpeedUp(snake, h)
  snake.h = h
}


function setPlayerHead(state: State, h: Point) {
  turnSnake(getPlayerSnake(state), h)
  const snake = getPlayerSnake(state)
  const dot = Vec.dot(snake.h, h)
}


function getPlayerSnake(state: State) {
  return state.snakes[state.playerId]
}


function focusCamera(state: State) {
  const snake = getPlayerSnake(state)

  state.camera = {
    x: snake.ps[0].x % 1000,
    y: snake.ps[0].y % 1000,
    w: 200
  }
}


function moveSnake(snake: Snake, dt: number) {
  const d = snake.speed * dt

  const h = Vec.ray(snake.ps[1], snake.ps[0])

  if (Vec.isEqual(h, snake.h)) {
    snake.ps[0] = Vec.add(snake.ps[0], Vec.scale(snake.h, d))
  } else {
    snake.ps.unshift( Vec.add(snake.ps[0], Vec.scale(snake.h, d)) )
  }

  const n = snake.ps.length
  const t = Vec.distance(snake.ps[n - 1], snake.ps[n - 2])

  if (d < t) {
    const h = Vec.ray(snake.ps[n - 1], snake.ps[n - 2])
    snake.ps[n - 1] = Vec.add(snake.ps[n - 1], Vec.scale(h, d))
  } else {
    const h = Vec.ray(snake.ps[n - 2], snake.ps[n - 3])
    snake.ps[n - 2] = Vec.add(snake.ps[n - 2], Vec.scale(h, d - t))
    snake.ps.pop()
  }
}


function dragSnake(snake: Snake, dt: number) {
  const s = snake.speed

  if (snake.speed > 0.05)
  snake.speed -= 0.0001 * s * dt + 0.001 * s * s * dt
  // console.log('s', snake.speed)
}


function moveSnakes(state: State, dt: number) {
  for (let id in state.snakes) {
    const snake = state.snakes[id]
    moveSnake(snake, dt)
    dragSnake(snake, dt)
  }
}


function update(state: State, dt: number) {
  moveSnakes(state, dt)
  focusCamera(state)
}


export default {
  getInitialState,
  setPlayerHead,
  update,
  moveSnake
}