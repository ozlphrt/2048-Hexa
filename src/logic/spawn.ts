import type { Tile, HexCell } from '../types'
import { getEmptyCells, getOccupiedCells } from './board'

export function spawnTile(
  tiles: Tile[],
  validCells: HexCell[]
): Tile | null {
  const occupied = getOccupiedCells(tiles)
  const empty = getEmptyCells(validCells, occupied)

  if (empty.length === 0) {
    return null
  }

  const randomCell = empty[Math.floor(Math.random() * empty.length)]
  const value = Math.random() < 0.9 ? 2 : 4

  return {
    id: `tile-${Date.now()}-${Math.random()}`,
    value,
    q: randomCell.q,
    r: randomCell.r,
    merged: false,
  }
}


