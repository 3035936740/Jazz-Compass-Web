import test from 'node:test';
import assert from 'node:assert/strict';
import { layoutNeoGraph } from './neo_canvas.js';

test('nodes stay inside the canvas and do not overlap across widths and sizes', () => {
  for (const width of [300, 390, 540, 600, 900]) {
    for (const size of [12, 22, 28, 36]) {
      for (const count of [1, 7, 11, 13, 30]) {
        for (const depth of [1, 3]) {
          const nodes = Array.from({ length: count }, (_, id) => ({ id, depth: id ? 1 + (id - 1) % depth : 0 }));
          const { positions, cardWidth, cardHeight, height } = layoutNeoGraph(nodes, width, size);
          const points = [...positions.values()];
          assert.equal(points.length, count);
          for (let i = 0; i < points.length; i++) {
            const p = points[i];
            assert(p.x - cardWidth / 2 >= 0 && p.x + cardWidth / 2 <= width);
            assert(p.y - cardHeight / 2 >= 0 && p.y + cardHeight / 2 <= height);
            for (const q of points.slice(i + 1)) {
              assert(Math.abs(p.x - q.x) >= cardWidth + 4 || Math.abs(p.y - q.y) >= cardHeight + 4,
                `overlap at width=${width} size=${size} count=${count} depth=${depth}`);
            }
          }
        }
      }
    }
  }
});

test('the first layer surrounds a centered root on desktop', () => {
  const nodes = Array.from({ length: 11 }, (_, id) => ({ id, depth: id ? 1 : 0 }));
  const { positions, height } = layoutNeoGraph(nodes, 600);
  assert.deepEqual(positions.get(0), { x: 300, y: height / 2 });
  assert([...positions.values()].some(p => p.x < 100));
  assert([...positions.values()].some(p => p.x > 500));
});
