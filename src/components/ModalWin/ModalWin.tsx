import './ModalWin.css'

interface ModalWinProps {
  onContinue: () => void
  onRestart: () => void
}

export function ModalWin({ onContinue, onRestart }: ModalWinProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>You Win!</h2>
        <p>You reached 2048!</p>
        <div className="modal-buttons">
          <button className="modal-btn primary" onClick={onContinue}>
            Continue
          </button>
          <button className="modal-btn" onClick={onRestart}>
            New Game
          </button>
        </div>
      </div>
    </div>
  )
}


