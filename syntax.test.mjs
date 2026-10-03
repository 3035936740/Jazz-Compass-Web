import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

// 界面模块不在逻辑测试里加载，语法错误会让整个面板打不开：每个 .js 都先过一遍 node --check
test('every module parses', () => {
  const failed = [];
  for (const file of readdirSync('.').filter((f) => f.endsWith('.js'))) {
    try { execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' }); } catch (error) { failed.push(`${file}: ${String(error.stderr).split('\n').slice(0, 5).join(' ')}`); }
  }
  assert.deepEqual(failed, []);
});
