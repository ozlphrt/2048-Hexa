import { useEffect, useState } from 'react'
import { hexToPixel } from '../../logic/utils'
import './HexTile.css'

interface HexTileProps {
  value: number
  q: number
  r: number
  merged: boolean
  id: string
  radius: number
}

export function HexTile({ value, q, r, merged }: HexTileProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [pixelPos, setPixelPos] = useState(() => hexToPixel(q, r, 50))

  useEffect(() => {
    setIsAnimating(true)
    const newPos = hexToPixel(q, r, 50)
    setPixelPos(newPos)
    const timer = setTimeout(() => setIsAnimating(false), 200)
    return () => clearTimeout(timer)
  }, [q, r])

  const getValueColor = (val: number): string => {
    if (val >= 2048) return '#f9f6f2'
    if (val >= 1024) return '#edc22e'
    if (val >= 512) return '#edc850'
    if (val >= 256) return '#edcc61'
    if (val >= 128) return '#edcf72'
    if (val >= 64) return '#f65e3b'
    if (val >= 32) return '#f67c5f'
    if (val >= 16) return '#f59563'
    if (val >= 8) return '#f2b179'
    return '#eee4da'
  }

  const getTextColor = (val: number): string => {
    return val >= 8 ? '#f9f6f2' : '#776e65'
  }

  const hexSize = 50
  const tileRadius = hexSize * 0.85 // Slightly smaller than cell for visual spacing
  const centerX = 400
  const centerY = 400
  const offset = -tileRadius
  const tileSize = tileRadius * 2

  // Calculate font size based on tile size and number of digits
  const digitCount = value.toString().length
  // Base font size is ~40% of tile size, adjusted for digit count
  const baseFontSize = tileSize * 0.4
  const fontSize = baseFontSize / Math.max(1, digitCount * 0.7)

  // Calculate hexagon points for clip-path (pointy-top, centered at 50%, 50%)
  // For a hexagon in a square: center (50%, 50%) + radius offset
  const hexPoints = []
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6
    // Percentage: 50% (center) + 50% * cos/sin for full radius
    const px = 50 + 50 * Math.cos(angle)
    const py = 50 + 50 * Math.sin(angle)
    hexPoints.push(`${px}% ${py}%`)
  }
  const clipPath = `polygon(${hexPoints.join(', ')})`

  // Position tile to match SVG coordinate system (centered at 400, 400)
  const tileX = centerX + pixelPos[0] + offset
  const tileY = centerY + pixelPos[1] + offset

  return (
    <div
      className={`hex-tile ${isAnimating ? 'animating' : ''} ${merged ? 'merged' : ''}`}
      style={{
        left: `${tileX}px`,
        top: `${tileY}px`,
        backgroundColor: getValueColor(value),
        color: getTextColor(value),
        clipPath: clipPath,
        width: `${tileSize}px`,
        height: `${tileSize}px`,
        fontSize: `${fontSize}px`,
      }}
    >
      {value}
    </div>
  )
}

