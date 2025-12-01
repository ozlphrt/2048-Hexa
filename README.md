# Hex 2048

A hexagonal variant of the classic 2048 game built with React and TypeScript.

## Features

- Hexagonal grid (radius 3 or 4)
- Six-directional movement (N, NE, SE, S, SW, NW)
- Smooth tile animations
- Undo functionality (1 step)
- Local high score storage
- Keyboard and touch controls
- Win/Game Over modals

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

## Controls

- **Arrow Keys** or **WASD/QE**: Swipe in different directions
- **Touch**: Swipe on mobile devices
- **Undo**: Revert last move
- **New Game**: Restart the game

## Game Rules

1. Swipe tiles in one of six directions
2. Tiles slide until blocked
3. Same-value tiles merge when they collide
4. New tiles (2 or 4) spawn after each move
5. Reach 2048 to win!
6. Game over when no moves are possible

