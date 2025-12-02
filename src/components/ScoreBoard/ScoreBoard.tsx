import './ScoreBoard.css'

interface ScoreBoardProps {
  score: number
  best: number
  radius: number
  onRadiusChange: (radius: number) => void
}

export function ScoreBoard({ score, best, radius, onRadiusChange }: ScoreBoardProps) {
  return (
    <div className="score-board">
      <div className="score-box">
        <div className="score-label">Score</div>
        <div className="score-value">{score}</div>
      </div>
      <div className="score-box">
        <div className="score-label">Best</div>
        <div className="score-value">{best}</div>
      </div>
    </div>
  )
}

