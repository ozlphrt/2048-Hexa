import type { Tile, Direction } from '../types'
import { getDirectionVector, isValidCell, getCellKey } from './utils'
import { getTileAt, sortTilesForDirection } from './board'

export interface MoveResult {
  tiles: Tile[]
  scoreDelta: number
  moved: boolean
}

export function moveTiles(
  tiles: Tile[],
  direction: Direction,
  radius: number
): MoveResult {
  const sortedTiles = sortTilesForDirection(tiles, direction, radius)
  const [dq, dr] = getDirectionVector(direction)
  const occupied = new Map<string, Tile>()
  const newTiles: Tile[] = []
  let scoreDelta = 0
  let moved = false

  // Initialize occupied map
  tiles.forEach(t => {
    occupied.set(getCellKey(t.q, t.r), t)
  })

  for (const tile of sortedTiles) {
    if (occupied.get(getCellKey(tile.q, tile.r)) !== tile) {
      continue // Already processed/merged
    }

    let currentQ = tile.q
    let currentR = tile.r
    let nextQ = currentQ + dq
    let nextR = currentR + dr

    // Slide until blocked
    while (
      isValidCell(nextQ, nextR, radius) &&
      !occupied.has(getCellKey(nextQ, nextR))
    ) {
      currentQ = nextQ
      currentR = nextR
      nextQ += dq
      nextR += dr
      moved = true
    }

    // Check for merge
    if (isValidCell(nextQ, nextR, radius)) {
      const nextTile = occupied.get(getCellKey(nextQ, nextR))
      if (
        nextTile &&
        nextTile.value === tile.value &&
        !nextTile.merged &&
        !tile.merged
      ) {
        // Merge
        const mergedValue = tile.value * 2
        scoreDelta += mergedValue
        const mergedTile: Tile = {
          id: `tile-${Date.now()}-${Math.random()}`,
          value: mergedValue,
          q: nextQ,
          r: nextR,
          merged: true,
        }
        newTiles.push(mergedTile)
        occupied.set(getCellKey(nextQ, nextR), mergedTile)
        occupied.delete(getCellKey(tile.q, tile.r))
        moved = true
        continue
      }
    }

    // No merge, just move
    if (currentQ !== tile.q || currentR !== tile.r) {
      const movedTile: Tile = {
        ...tile,
        q: currentQ,
        r: currentR,
      }
      newTiles.push(movedTile)
      occupied.set(getCellKey(currentQ, currentR), movedTile)
      occupied.delete(getCellKey(tile.q, tile.r))
    } else {
      newTiles.push(tile)
    }
  }

  // Clear merged flags for next move
  newTiles.forEach(t => {
    t.merged = false
  })

  return {
    tiles: newTiles,
    scoreDelta,
    moved,
  }
}

