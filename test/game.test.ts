import assert = require('assert')
import Game from '../src/services/game'


test('moveSnake', () => {
  const snake = {
    speed: 1,
    h: {x: 0, y: 1},
    ps: [{x: 0, y: 100}, {x: 0, y: 80}, {x: 0, y: 60}, {x: 0, y: 40}]
  }

  Game.moveSnake(snake, 1)

  assert.deepEqual(
    [{x: 0, y: 101}, {x: 0, y: 80}, {x: 0, y: 60}, {x: 0, y: 41}],
    snake.ps
  )

  Game.moveSnake(snake, 20)

  assert.deepEqual(
    [{x: 0, y: 121}, {x: 0, y: 80}, {x: 0, y: 61}],
    snake.ps
  )


  snake.h = {x: 1, y: 0}

  Game.moveSnake(snake, 1)

  assert.deepEqual(
    [{x: 1, y: 121}, {x: 0, y: 121}, {x: 0, y: 80}, {x: 0, y: 62}],
    snake.ps
  )

  Game.moveSnake(snake, 20)

  assert.deepEqual(
    [{x: 21, y: 121}, {x: 0, y: 121}, {x: 0, y: 82}],
    snake.ps
  )
})