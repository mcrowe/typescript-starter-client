import Regame from './lib/regame'
import Vec from './lib/vector'
import Game from './services/game'
import Renderer from './services/renderer'
import Controller from './services/controller'


const state = Game.getInitialState()


const controller = new Controller()


controller.onHead(h =>
  Game.setPlayerHead(state, h)
)


document.addEventListener('touchstart', e => {
  const touch = e.changedTouches[0]
  // console.log(touch.pageX, touch.pageY)
  const p = Vec.make(touch.pageX, touch.pageY)

  const h = Vec.ray(Vec.make(300, 300), p)

  Game.setPlayerHead(state, h)
})


Regame.makeGame(document.getElementById('canvas'),
                Game.update,
                Renderer.render,
                state)