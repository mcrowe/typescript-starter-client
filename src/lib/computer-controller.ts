import Util from '../lib/util'


class ComputerController {

  constructor() {
  }

  onClick(fn) {
    document.addEventListener('click', e => {
      fn({x: e.clientX, y: e.clientY})
    })
  }

  onMouseMove(fn, period) {
    const handler = function (e) {
      fn({x: e.clientX, y: e.clientY})
    }
    document.addEventListener('mousemove', Util.throttle(handler, period))
  }

  onKeyDown(code, fn) {
    document.addEventListener('keydown', e => {
      if (e.which == code) {
        fn()
      }
    })
  }

  onKeyUp(code, fn) {
    document.addEventListener('keyup', e => {
      if (e.which == code) {
        fn()
      }
    })
  }
}


export default ComputerController