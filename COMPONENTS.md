# COMPONENTS.md — Hex 2048 App Architecture

## 1. App Structure (React / React Native compatible)

```
/src
  /components
    HexGrid/
    HexTile/
    ScoreBoard/
    Controls/
    ModalWin/
    ModalGameOver/
  /logic
    board.ts
    merge.ts
    spawn.ts
    utils.ts
  /hooks
    useGame.ts
  /state
    gameStore.ts
```

---

## 2. Components

### 2.1 <HexGrid />
**Purpose:** Renders board, tiles, and handles tile animations.  
**Props:**
- `cells: HexCell[]`  
- `tiles: Tile[]`  
- `onSwipe(direction: Direction): void`  
- `radius: number`

### 2.2 <HexTile />
**Purpose:** Single tile renderer.  
**Props:**
- `value: number`
- `q: number`
- `r: number`
- `merged: boolean`
- `id: string`

### 2.3 <ScoreBoard />
**Props:**
- `score: number`
- `best: number`

### 2.4 <Controls />
**Props:**
- `onUndo(): void`
- `onRestart(): void`

### 2.5 <ModalWin />
**Props:**
- `onContinue(): void`
- `onRestart(): void`

### 2.6 <ModalGameOver />
**Props:**
- `onRestart(): void`

---

## 3. Hooks

### useGame()
Handles entire game lifecycle.

**Returns:**
- `tiles`
- `cells`
- `score`
- `best`
- `undo()`
- `restart()`
- `handleSwipe(direction)`

---

## 4. State

### gameStore.ts
- `tiles: Tile[]`
- `history: GameState[]`
- `score: number`
- `best: number`
- Actions:
  - `move(dir)`
  - `spawnTile()`
  - `saveHistory()`
  - `undo()`
  - `restart()`

---

## 5. Types

```
type Direction = "N" | "NE" | "SE" | "S" | "SW" | "NW"

interface Tile {
  id: string
  value: number
  q: number
  r: number
  merged: boolean
}

interface HexCell {
  q: number
  r: number
}

interface GameState {
  tiles: Tile[]
  score: number
}
```
