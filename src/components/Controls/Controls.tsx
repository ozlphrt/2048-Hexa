import { useState } from 'react'
import { soundManager } from '../../utils/sounds'
import './Controls.css'

interface ControlsProps {
  onUndo: () => void
  onRestart: () => void
}

export function Controls({ onUndo, onRestart }: ControlsProps) {
  const [soundEnabled, setSoundEnabled] = useState(soundManager.isEnabled())

  const handleSoundToggle = () => {
    const newState = soundManager.toggle()
    setSoundEnabled(newState)
  }

  return (
    <div className="controls">
      <button className="control-btn" onClick={onUndo}>
        Undo
      </button>
      <button className="control-btn" onClick={onRestart}>
        New Game
      </button>
      <button 
        className={`control-btn sound-toggle ${soundEnabled ? 'sound-on' : 'sound-off'}`}
        onClick={handleSoundToggle}
        title={soundEnabled ? 'Sound On' : 'Sound Off'}
        aria-label={soundEnabled ? 'Disable sound' : 'Enable sound'}
      >
        {soundEnabled ? '🔊' : '🔇'}
      </button>
    </div>
  )
}

