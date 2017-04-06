export type Point = { x: number, y: number }


type Camera = { x: number, y: number, w: number }

export type Snake = {
  ps: Point[],
  h: Point,
  speed: number
}

export interface State {
  snakes: { [key: string]: Snake }
  camera: Camera
  playerId: string
}