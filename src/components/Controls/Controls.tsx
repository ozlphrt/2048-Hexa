import './Controls.css'

interface ControlsProps {
  onUndo: () => void
  onRestart: () => void
}

export function Controls({ onUndo, onRestart }: ControlsProps) {
  return (
    <div className="controls">
      <button className="control-btn" onClick={onUndo}>
        Undo
      </button>
      <button className="control-btn" onClick={onRestart}>
        New Game
      </button>
    </div>
  )
}

