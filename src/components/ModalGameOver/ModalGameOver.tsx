import './ModalGameOver.css'

interface ModalGameOverProps {
  onRestart: () => void
}

export function ModalGameOver({ onRestart }: ModalGameOverProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Game Over!</h2>
        <p>No more moves available.</p>
        <div className="modal-buttons">
          <button className="modal-btn primary" onClick={onRestart}>
            Try Again
          </button>
        </div>
      </div>
    </div>
  )
}


