import { useEffect } from 'react'
import { useGame } from './hooks/useGame'
import { HexGrid } from './components/HexGrid/HexGrid'
import { ScoreBoard } from './components/ScoreBoard/ScoreBoard'
import { Controls } from './components/Controls/Controls'
import { ModalWin } from './components/ModalWin/ModalWin'
import { ModalGameOver } from './components/ModalGameOver/ModalGameOver'
import './App.css'

function App() {
  const {
    tiles,
    cells,
    score,
    best,
    radius,
    gameOver,
    won,
    undo,
    restart,
    continueGame,
    handleSwipe,
    setRadius,
  } = useGame()

  useEffect(() => {
    // Initialize game on mount
    setRadius(radius)
  }, [])

  return (
    <div className="app">
      <div className="app-header">
        <h1>Hex 2048</h1>
      </div>
      <ScoreBoard score={score} best={best} />
      <HexGrid cells={cells} tiles={tiles} onSwipe={handleSwipe} radius={radius} />
      <Controls onUndo={undo} onRestart={restart} />
      {won && <ModalWin onContinue={continueGame} onRestart={restart} />}
      {gameOver && <ModalGameOver onRestart={restart} />}
      <div className="instructions">
        <p>Use arrow keys or WASD/QE to swipe</p>
        <p>Touch swipe supported on mobile</p>
      </div>
    </div>
  )
}

export default App

