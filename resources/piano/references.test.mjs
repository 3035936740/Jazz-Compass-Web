import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { REFERENCES, REFERENCE_TOPICS } from './references.js';
import { renderReferencesMarkdown, START, END } from './scripts/sync-references.mjs';

const sourceFiles = () => {
  const out = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      if (name.startsWith('.') || name === 'node_modules') continue;
      const path = join(dir, name);
      if (statSync(path).isDirectory()) walk(path);
      else if (/\.(js|mjs|html|md|css|json)$/.test(name) && name !== 'references.js' && name !== 'README.md') out.push(path);
    }
  };
  walk('.');
  return out;
};

test('every reference is complete and uniquely identified', () => {
  const ids = new Set();
  const topics = new Set(REFERENCE_TOPICS.map((topic) => topic.id));
  for (const r of REFERENCES) {
    assert.ok(!ids.has(r.id), `duplicate id ${r.id}`);
    ids.add(r.id);
    assert.ok(topics.has(r.topic), `${r.id} has unknown topic ${r.topic}`);
    for (const key of ['title', 'author', 'url', 'accessed']) assert.ok(r[key], `${r.id} missing ${key}`);
    assert.match(r.url, /^https?:\/\//, `${r.id} url must be http(s)`);
    assert.match(r.accessed, /^\d{4}-\d{2}-\d{2}$/);
    for (const lang of ['zh', 'ja', 'en']) assert.ok(r.usedFor?.[lang], `${r.id} usedFor.${lang}`);
    assert.ok(r.usedIn?.length, `${r.id} has no usedIn`);
  }
});

test('each reference is annotated where it is used', () => {
  for (const r of REFERENCES) {
    for (const file of r.usedIn) {
      assert.ok(existsSync(file), `${r.id}: ${file} does not exist`);
      assert.ok(readFileSync(file, 'utf8').includes(`ref:${r.id}`), `${file} lacks ref:${r.id}`);
    }
  }
});

test('every ref:<id> annotation points to a registered reference', () => {
  const ids = new Set(REFERENCES.map((r) => r.id));
  for (const file of sourceFiles()) {
    for (const [, id] of readFileSync(file, 'utf8').matchAll(/ref:([a-z0-9-]+)/g)) {
      assert.ok(ids.has(id), `${file} cites unknown ref:${id}`);
    }
  }
});

test('README acknowledgements are in sync with references.js', () => {
  const readme = readFileSync('README.md', 'utf8');
  const block = readme.slice(readme.indexOf(START), readme.indexOf(END) + END.length);
  assert.equal(block, renderReferencesMarkdown(), 'run: node scripts/sync-references.mjs');
});
