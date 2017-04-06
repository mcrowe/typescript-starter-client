import Key from '../lib/key'
import ComputerController from '../lib/computer-controller'
import Vec from '../lib/vector'


const SPACE = Key.code('SPACE')
const ENTER = Key.code('ENTER')
const CANVAS_MIDDLE = Vec.make(300, 300)


class Controller {

  ctl: ComputerController

  constructor() {
    this.ctl = new ComputerController()
  }

  onHead(fn) {
    this.ctl.onClick(p => {
      fn(Vec.ray(CANVAS_MIDDLE, p))
    })
    return this
  }

}


export default Controller