export type Direction = "N" | "NE" | "SE" | "S" | "SW" | "NW"

export interface Tile {
  id: string
  value: number
  q: number
  r: number
  merged: boolean
}

export interface HexCell {
  q: number
  r: number
}

export interface GameState {
  tiles: Tile[]
  score: number
  best: number
}


