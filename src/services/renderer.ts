import Regame from '../lib/regame'
import Vec from '../lib/vector'
import { State, Snake } from '../types'


function render(state: State) {
  const models: any[] = []

  // draw a grid

  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
      models.push( Regame.makeCircle({x: i * 50, y: j * 50, r: 0.5, color: '#999'}))
    }
  }

  for (let id in state.snakes) {
    const snake = state.snakes[id]
    models.push( Regame.makePath({path: snake.ps, r: 5, color: '#000'}) )
  }



  return {
    models: models,
    camera: state.camera
  }
}


export default { render }