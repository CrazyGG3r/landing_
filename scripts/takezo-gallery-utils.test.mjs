import assert from 'node:assert/strict';
import test from 'node:test';
import { groupNumberedImages } from './takezo-gallery-utils.mjs';

const entry = (stem) => ({ stem, name: `${stem}.jpg` });

test('groups a base image with parenthesized numbered siblings in order', () => {
  const [group] = groupNumberedImages([
    entry('Portrait (2)'),
    entry('Portrait'),
    entry('Portrait (1)'),
  ]);
  assert.equal(group.title, 'Portrait');
  assert.deepEqual(group.entries.map(({ stem }) => stem), ['Portrait', 'Portrait (1)', 'Portrait (2)']);
});

test('groups repeated plain suffixes and x-of-y suffixes', () => {
  const groups = groupNumberedImages([
    entry('Study 2'),
    entry('Study 1'),
    entry('Meme 2 of 3'),
    entry('Meme 1 of 3'),
  ]);
  assert.deepEqual(groups.map(({ title }) => title), ['Study', 'Meme']);
  assert.deepEqual(groups[0].entries.map(({ stem }) => stem), ['Study 1', 'Study 2']);
  assert.deepEqual(groups[1].entries.map(({ stem }) => stem), ['Meme 1 of 3', 'Meme 2 of 3']);
});

test('does not strip an isolated meaningful number', () => {
  const [group] = groupNumberedImages([entry('C418 Disc 11')]);
  assert.equal(group.title, 'C418 Disc 11');
});
