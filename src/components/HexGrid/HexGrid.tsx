import { useRef, useEffect, useState } from 'react'
import type { Tile, HexCell, Direction } from '../../types'
import { hexToPixel } from '../../logic/utils'
import { HexTile } from '../HexTile/HexTile'
import './HexGrid.css'

interface HexGridProps {
  cells: HexCell[]
  tiles: Tile[]
  onSwipe: (direction: Direction) => void
  radius: number
}

export function HexGrid({ cells, tiles, onSwipe, radius }: HexGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const SWIPE_THRESHOLD = 30
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const updateScale = () => {
      if (gridRef.current) {
        const containerWidth = gridRef.current.offsetWidth
        const baseWidth = 800
        const newScale = containerWidth / baseWidth
        setScale(newScale)
      }
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyMap: Record<string, Direction> = {
        ArrowUp: 'N',
        'w': 'N',
        'W': 'N',
        ArrowRight: 'SE',
        'd': 'SE',
        'D': 'SE',
        'e': 'NE',
        'E': 'NE',
        ArrowDown: 'S',
        's': 'S',
        'S': 'S',
        ArrowLeft: 'NW',
        'a': 'NW',
        'A': 'NW',
        'q': 'SW',
        'Q': 'SW',
      }
      const direction = keyMap[e.key]
      if (direction) {
        e.preventDefault()
        onSwipe(direction)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onSwipe])

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return

    const touch = e.changedTouches[0]
    const dx = touch.clientX - touchStartRef.current.x
    const dy = touch.clientY - touchStartRef.current.y
    const absDx = Math.abs(dx)
    const absDy = Math.abs(dy)

    if (Math.max(absDx, absDy) < SWIPE_THRESHOLD) {
      touchStartRef.current = null
      return
    }

    let direction: Direction | null = null

    if (absDx > absDy) {
      direction = dx > 0 ? 'SE' : 'NW'
    } else {
      direction = dy > 0 ? 'S' : 'N'
    }

    // Diagonal detection for NE/SW
    if (absDx > absDy * 0.5 && absDy > absDx * 0.5) {
      if (dx > 0 && dy < 0) direction = 'NE'
      if (dx < 0 && dy > 0) direction = 'SW'
    }

    if (direction) {
      onSwipe(direction)
    }

    touchStartRef.current = null
  }

  const centerX = 400
  const centerY = 400

  return (
    <div
      ref={gridRef}
      className="hex-grid"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <svg className="hex-grid-bg" width="800" height="800" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid meet">
        {cells.map((cell) => {
          const hexSize = radius === 2 ? 80 : 50
          const [px, py] = hexToPixel(cell.q, cell.r, hexSize)
          const x = centerX + px
          const y = centerY + py
          const hexRadius = hexSize

          // Pointy-top hexagon: start at top (π/2) and rotate
          const points = []
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 6
            points.push(
              `${x + hexRadius * Math.cos(angle)},${y + hexRadius * Math.sin(angle)}`
            )
          }

          return (
            <polygon
              key={`cell-${cell.q}-${cell.r}`}
              points={points.join(' ')}
              className="hex-cell"
            />
          )
        })}
      </svg>
      <div 
        className="hex-tiles-container"
        style={{ 
          transform: `scale(${scale})`,
          transformOrigin: '0 0'
        }}
      >
        {tiles.map(tile => (
          <HexTile
            key={tile.id}
            value={tile.value}
            q={tile.q}
            r={tile.r}
            merged={tile.merged}
            spawned={tile.spawned}
            id={tile.id}
            radius={radius}
          />
        ))}
      </div>
    </div>
  )
}

