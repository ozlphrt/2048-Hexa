# GAME_DESIGN.md — Hex 2048

## 1. Core Concept
Classic 2048 extended to a hexagonal grid with six swipe directions.
Goal: merge identical tiles to reach 2048 or higher.

## 2. Grid & Coordinates
- Grid shape: Hexagon (pointy-top).
- Sizes:
  - Radius 3 → 19 cells.
  - Radius 4 → 37 cells.
- Coordinate system: Axial (q, r).
- Valid cells stored as a predefined list.

## 3. Input / Movement
Swipe directions:
N, NE, SE, S, SW, NW.

Rules:
- Tiles slide until blocked.
- Same-value neighbors merge.
- One merge per tile per move.
- Order based on swipe direction (front-to-back).

## 4. Tile Spawning
After each valid move:
- Spawn: 90% chance 2, 10% chance 4.
- Random empty cell.

## 5. Game Flow
Lose:
- No empty cells AND no merges possible.

Win:
- Reach 2048.
- Optional endless mode.

## 6. Scoring
Score increases by merge sums.
Local high score via storage.

## 7. Visual Style
- Hex cells with slight inset.
- Smooth sliding animations.
- Merge pop animation.
- Themes: Classic / Neon / Minimal.

## 8. Extra (Optional)
- Rock tile.
- Bomb tile.
- Themes.
- Multi-undo.

## 9. MVP Checklist
- Hex radius selector.
- Board logic.
- Movement + merge.
- Undo (1 step).
- High score.
- Basic theme.
- Animations.
