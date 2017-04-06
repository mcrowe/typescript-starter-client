import Vec from './vector'


const CANVAS_WIDTH = 600


function mod(num,modulus) {
  return ((num<0) ? Math.abs(modulus) : 0) + (num % modulus);
}



function drawCircle(ctx, props, camera) {
  const { x, y, r } = props

  const cx = camera.x - camera.w/2
  const cy = camera.y - camera.w/2

  const sx = mod(x - cx, 1000) * CANVAS_WIDTH/camera.w
  const sy = mod(y - cy, 1000) * CANVAS_WIDTH/camera.w
  const sr = r * CANVAS_WIDTH/camera.w

  ctx.beginPath()
  ctx.fillStyle = props.color
  ctx.arc(sx, sy, sr, 0, 2 * Math.PI)
  ctx.fill()
}


function drawText(ctx, props, _camera) {
  var opts = Object.assign({}, {x: 0, y: 0, message: 'Text', size: 50, color: 'black'}, props)
  ctx.font = opts.size + 'px "Comic Sans MS"'
  ctx.fillStyle = opts.color
  ctx.fillText(opts.message, opts.x, opts.y)
}


function drawLine(ctx, props, camera) {
  const { start, end, r, color } = props

  const n = Math.round(Vec.distance(start, end) * 1)

  for (let i = 0; i < n; i++) {
    const p = Vec.interpolate(start, end, i/n)
    drawCircle(ctx, {x: p.x, y: p.y, r: r, color: color}, camera)
  }
}


// TODO: Draw a proper path, for efficiency
function drawPath(ctx, props, camera) {
  const { path, r, color } = props
  for (let i = 0; i < path.length - 1; i++) {
    drawLine(ctx, {start: path[i], end: path[i+1], r: r, color: color}, camera)
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
      drawCircle(ctx, model.props, camera)
      break
    case 'text':
      drawText(ctx, model.props, camera)
      break
    case 'path':
      drawPath(ctx, model.props, camera)
      break
    default:
      throw new Error('Unexpected model type: ' + model.type)
  }
}


function paintScene(ctx, scene) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH)

  ctx.fillStyle = '#000000'

  for (let model of scene.models) {
    drawModel(ctx, model, scene.camera)
  }
}


function makeGame(el, update, render, initialState) {
  const ctx = el.getContext('2d')

  let t = Date.now()
  const state = initialState

  function loop() {
    const now = Date.now()
    const dt = now - t
    t = now

    update(state, dt)

    const scene = render(state)

    paintScene(ctx, scene)

    requestAnimationFrame(loop)
  }

  loop()
}



function makeModel(type, props) {
  return { type, props }
}


function makeCircle(props) {
  return makeModel('circle', props)
}


function makePath(props) {
  return makeModel('path', props)
}


function makeText(props) {
  return makeModel('text', props)
}


export default { makeGame, makeCircle, makeText, makePath }