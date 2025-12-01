# LOGIC.md — Core Game Logic (Hex 2048)

## 1. Coordinate System (Axial)
We use axial coordinates `(q, r)` with the six directions:

```
N  = ( 0, -1 )
NE = ( 1, -1 )
SE = ( 1,  0 )
S  = ( 0,  1 )
SW = (-1,  1 )
NW = (-1,  0 )
```

---

## 2. Valid Board Generation
For radius R, all valid cells satisfy:

```
abs(q) <= R AND abs(r) <= R AND abs(q + r) <= R
```

Store them as an array for iteration and rendering.

---

## 3. Move Pipeline

### move(direction):
1. Convert direction into `(dq, dr)`.
2. Sort tiles **front-to-back** relative to swipe direction.
3. For each tile:
   - Slide until blocked by boundary or another tile.
   - If next tile has the same value and not merged this move:
     - Merge them → new tile at that position (`value * 2`).
4. Mark merged tiles.
5. Remove old merged tiles.
6. Spawn a new random tile (if move changed board).

---

## 4. Slide Logic

```
while next cell is valid AND empty:
    move tile forward
if next tile has same value AND not merged:
    merge
```

---

## 5. Merge Logic

### merge(tileA, tileB):
- Only allowed if:
  - Same value
  - Both not merged this turn
- Result:
  - Create new tile with `value = tileA.value * 2`
  - Mark new tile as `merged = true`
  - Remove tileA and tileB from active tiles
- Score += new value

---

## 6. Tile Spawning

```
emptyCells = validCells - occupiedCells
spawn at random empty
value = 2 (90%) or 4 (10%)
```

---

## 7. Undo System
Store deep copy of:

```
{
  tiles,
  score,
  best
}
```

Before every move:
```
history.push(currentState)
```

Undo:
```
restore previous state
```

---

## 8. Game Over Detection

### No empty cells:
```
if emptyCells.length === 0
```

### No merges possible:
For every direction:
- Simulate the merge check without performing move.
- If any merges possible → not game over.

If all six directions are blocked → game over.

---

## 9. Performance Notes
- Keep tiles in a dict keyed by `"q,r"` for O(1) lookup.
- Batch updates to reduce re-renders.
- Precompute cell order for each direction to avoid sorting repeatedly.

