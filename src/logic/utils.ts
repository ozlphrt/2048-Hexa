import type { Direction, HexCell } from '../types'

export const DIRECTIONS: Record<Direction, [number, number]> = {
  N: [0, -1],
  NE: [1, -1],
  SE: [1, 0],
  S: [0, 1],
  SW: [-1, 1],
  NW: [-1, 0],
}

export function isValidCell(q: number, r: number, radius: number): boolean {
  return (
    Math.abs(q) <= radius &&
    Math.abs(r) <= radius &&
    Math.abs(q + r) <= radius
  )
}

export function generateValidCells(radius: number): HexCell[] {
  const cells: HexCell[] = []
  for (let q = -radius; q <= radius; q++) {
    for (let r = -radius; r <= radius; r++) {
      if (isValidCell(q, r, radius)) {
        cells.push({ q, r })
      }
    }
  }
  return cells
}

export function getDirectionVector(direction: Direction): [number, number] {
  return DIRECTIONS[direction]
}

export function hexToPixel(q: number, r: number, size: number = 50): [number, number] {
  const x = size * (Math.sqrt(3) * q + (Math.sqrt(3) / 2) * r)
  const y = size * ((3 / 2) * r)
  return [x, y]
}

export function getCellKey(q: number, r: number): string {
  return `${q},${r}`
}

export function parseCellKey(key: string): [number, number] {
  const [q, r] = key.split(',').map(Number)
  return [q, r]
}


