# CURSOR_KICKOFF_PROMPT.md — Hex 2048

Use this prompt inside Cursor to start the project with full context.

---

# Hex 2048 — Project Kickoff Prompt (For Cursor AI)

You are building a **hexagonal 2048 game** with React (or React Native), using a clean modular structure.

Follow the rules below exactly:

## 1. Core Requirements
- Hexagonal board (radius 3 or 4).
- Axial coordinates `(q, r)`.
- Six movement directions: N, NE, SE, S, SW, NW.
- Standard 2048 mechanics:
  - slide
  - merge (once per tile)
  - spawn 2 or 4
- One-step undo.
- Local high score.
- Smooth animations.

## 2. Architecture
Use the following file structure:

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
  /types
    index.ts
```

## 3. What Cursor Must Generate
- All components (empty shells first).
- Board + merge logic.
- Swipe handler.
- Theme + animations.
- Minimal UI to start playing immediately.

## 4. Interaction Rules
When generating code:
- Never rewrite everything unless explicitly asked.
- Only modify requested files.
- Maintain strict modularity.

## 5. Definitions to Include
### Directions:
```
N  = ( 0, -1 )
NE = ( 1, -1 )
SE = ( 1,  0 )
S  = ( 0,  1 )
SW = (-1,  1 )
NW = (-1,  0 )
```

### Valid cell rule:
```
abs(q) <= R AND abs(r) <= R AND abs(q + r) <= R
```

## 6. Deliverables Cursor Should Produce
1. Scaffold project.
2. Implement hex grid renderer.
3. Implement slide & merge logic.
4. Implement spawn logic.
5. UI + animations.
6. Undo + restart.
7. Local storage high score.

---

This is the complete kickoff prompt. Feed the entire file into Cursor.
