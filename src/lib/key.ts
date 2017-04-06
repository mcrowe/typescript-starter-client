const CODES = {
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
}


function code(name) {
  const code = CODES[name]
  if (code) {
    return code
  } else {
    throw new Error('Unrecognized key name: ' + name)
  }
}


export default { code }