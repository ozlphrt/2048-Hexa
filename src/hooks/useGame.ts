import { useGameStore } from '../state/gameStore'
import type { Direction } from '../types'

export function useGame() {
  const store = useGameStore()

  return {
    tiles: store.tiles,
    cells: store.validCells,
    score: store.score,
    best: store.best,
    radius: store.radius,
    gameOver: store.gameOver,
    won: store.won,
    undo: store.undo,
    restart: store.restart,
    continueGame: store.continueGame,
    handleSwipe: (direction: Direction) => store.move(direction),
    setRadius: store.setRadius,
  }
}


