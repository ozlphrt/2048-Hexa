import { create } from 'zustand'
import type { Tile, GameState, Direction } from '../types'
import { generateValidCells } from '../logic/utils'
import { moveTiles } from '../logic/merge'
import { spawnTile } from '../logic/spawn'
import { canMove } from '../logic/board'
import { soundManager } from '../utils/sounds'

interface GameStore extends GameState {
  radius: number
  validCells: Array<{ q: number; r: number }>
  history: GameState[]
  gameOver: boolean
  won: boolean
  winModalShown: boolean
  setRadius: (radius: number) => void
  move: (direction: Direction) => void
  undo: () => void
  restart: () => void
  continueGame: () => void
  saveBest: () => void
}

const DEFAULT_RADIUS = 2

function loadBest(): number {
  if (typeof window === 'undefined') return 0
  const stored = localStorage.getItem('hex2048-best')
  return stored ? parseInt(stored, 10) : 0
}

function saveBest(score: number): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('hex2048-best', score.toString())
}

function createInitialTiles(validCells: Array<{ q: number; r: number }>): Tile[] {
  const tiles: Tile[] = []
  const occupied = new Set<string>()
  
  // Spawn 2 initial tiles
  for (let i = 0; i < 2; i++) {
    const empty = validCells.filter(
      cell => !occupied.has(`${cell.q},${cell.r}`)
    )
    if (empty.length === 0) break
    
    const cell = empty[Math.floor(Math.random() * empty.length)]
    occupied.add(`${cell.q},${cell.r}`)
    tiles.push({
      id: `tile-init-${i}-${Date.now()}`,
      value: 2,
      q: cell.q,
      r: cell.r,
      merged: false,
    })
  }
  
  return tiles
}

const initialValidCells = generateValidCells(DEFAULT_RADIUS)
const initialTiles = createInitialTiles(initialValidCells)

export const useGameStore = create<GameStore>((set, get) => ({
  tiles: initialTiles,
  score: 0,
  best: loadBest(),
  radius: DEFAULT_RADIUS,
  validCells: initialValidCells,
  history: [],
  gameOver: false,
  won: false,
  winModalShown: false,

  setRadius: (radius: number) => {
    const validCells = generateValidCells(radius)
    const tiles = createInitialTiles(validCells)
    set({
      radius,
      validCells,
      tiles,
      score: 0,
      history: [],
      gameOver: false,
      won: false,
      winModalShown: false,
    })
  },

  move: (direction: Direction) => {
    const state = get()
    if (state.gameOver) return

    // Save history before move
    const currentState: GameState = {
      tiles: JSON.parse(JSON.stringify(state.tiles)),
      score: state.score,
      best: state.best,
    }
    set({ history: [currentState, ...state.history.slice(0, 9)] })

    const result = moveTiles(state.tiles, direction, state.radius)

    if (!result.moved) {
      // Restore history if no move occurred
      set({ history: state.history })
      return
    }

    let newTiles = result.tiles
    let newScore = state.score + result.scoreDelta
    let newBest = Math.max(state.best, newScore)

    // Play merge sound if tiles merged
    if (result.scoreDelta > 0) {
      soundManager.playMerge()
    }

    // Spawn new tile
    const newTile = spawnTile(newTiles, state.validCells)
    if (newTile) {
      newTiles = [...newTiles, newTile]
    }

    // Check win condition - only show modal once per game session
    const has2048 = newTiles.some(t => t.value >= 2048)
    const won = has2048 && !state.winModalShown

    // Check game over
    const emptyCells = state.validCells.filter(
      cell => !newTiles.some(t => t.q === cell.q && t.r === cell.r)
    )
    const hasMoves = ['N', 'NE', 'SE', 'S', 'SW', 'NW'].some(dir =>
      canMove(newTiles, dir as Direction, state.radius)
    )
    const gameOver = emptyCells.length === 0 && !hasMoves

    if (newBest > state.best) {
      saveBest(newBest)
    }

    set({
      tiles: newTiles,
      score: newScore,
      best: newBest,
      won,
      winModalShown: won ? true : state.winModalShown,
      gameOver,
    })
  },

  undo: () => {
    const state = get()
    if (state.history.length === 0 || state.gameOver) return

    const previousState = state.history[0]
    set({
      tiles: previousState.tiles,
      score: previousState.score,
      history: state.history.slice(1),
      gameOver: false,
    })
  },

  restart: () => {
    const state = get()
    const tiles = createInitialTiles(state.validCells)
    set({
      tiles,
      score: 0,
      history: [],
      gameOver: false,
      won: false,
      winModalShown: false,
    })
  },

  continueGame: () => {
    set({ won: false })
  },

  saveBest: () => {
    const state = get()
    if (state.best > loadBest()) {
      saveBest(state.best)
    }
  },
}))

