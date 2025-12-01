import type { Tile, HexCell, Direction } from '../types'
import { getDirectionVector, isValidCell, getCellKey } from './utils'

export function getTileAt(tiles: Tile[], q: number, r: number): Tile | null {
  return tiles.find(t => t.q === q && t.r === r) || null
}

export function getOccupiedCells(tiles: Tile[]): Set<string> {
  return new Set(tiles.map(t => getCellKey(t.q, t.r)))
}

export function getEmptyCells(
  validCells: HexCell[],
  occupiedCells: Set<string>
): HexCell[] {
  return validCells.filter(cell => !occupiedCells.has(getCellKey(cell.q, cell.r)))
}

export function sortTilesForDirection(
  tiles: Tile[],
  direction: Direction,
  radius: number
): Tile[] {
  const [dq, dr] = getDirectionVector(direction)
  return [...tiles].sort((a, b) => {
    // Front-to-back: tiles closer to the swipe origin come first
    const dotA = a.q * dq + a.r * dr
    const dotB = b.q * dq + b.r * dr
    if (dotA !== dotB) {
      return dotB - dotA // Higher dot product = further in direction = process later
    }
    // Tie-breaker: use secondary axis
    const crossA = a.q * dr - a.r * dq
    const crossB = b.q * dr - b.r * dq
    return crossA - crossB
  })
}

export function canMove(
  tiles: Tile[],
  direction: Direction,
  radius: number
): boolean {
  const sortedTiles = sortTilesForDirection(tiles, direction, radius)
  const occupied = new Map<string, Tile>()
  tiles.forEach(t => {
    occupied.set(getCellKey(t.q, t.r), t)
  })

  for (const tile of sortedTiles) {
    const [dq, dr] = getDirectionVector(direction)
    let nextQ = tile.q + dq
    let nextR = tile.r + dr

    // Check if can slide
    if (isValidCell(nextQ, nextR, radius)) {
      const nextKey = getCellKey(nextQ, nextR)
      if (!occupied.has(nextKey)) {
        return true
      }
      const nextTile = occupied.get(nextKey)!
      if (nextTile.value === tile.value && !nextTile.merged && !tile.merged) {
        return true
      }
    }
  }

  return false
}

