import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { featuredProjectIds, orderProjects } from '../src/data/project-curation.ts';
import { createDemoTour } from '../src/data/demo-tour.ts';
const data = JSON.parse(readFileSync(new URL('../src/data/profile.json', import.meta.url), 'utf8'));
test('shared curation keeps all projects and source order intact while prioritizing the agreed work', () => {
  for (const lang of ['en', 'es']) {
    const original = [...data[lang].projects];
    const sorted = orderProjects(original);
    assert.deepEqual(sorted.slice(0, 4).map(project => project.id), [...featuredProjectIds]);
    assert.deepEqual(sorted.slice(4, 8).map(project => project.id), ['nicasource', 'dele-peso-tools', 'claris-health', 'time-weaver']);
    assert.equal(sorted.length, 30);
    assert.equal(new Set(sorted.map(project => project.id)).size, 30);
    assert.deepEqual(original, data[lang].projects);
    const featured = new Set(sorted.slice(0, 8).map(project => project.id));
    assert.deepEqual(sorted.slice(8), original.filter(project => !featured.has(project.id)));
  }
});
test('shipping portal retains its compatibility id, factual scope and localized demo provenance', () => {
  for (const [lang, name] of [['en', 'Shipping Portal'], ['es', 'Portal de envíos']]) {
    const project = data[lang].projects.find(project => project.id === 'pouch');
    assert.equal(project.name, name);
    assert.match(project.details.join(' '), /webhook/);
    assert.doesNotMatch([project.name, project.summary, ...project.details, ...project.media.map(media => media.alt)].join(' '), /Pouch|UI design|diseño de interfaz/i);
    assert.deepEqual(project.media.map(media => media.src), ['history', 'details'].map(view => `/images/projects/shipping-portal-${view}-${lang}.webp`));
    assert(project.media.every(media => media.type === 'demo'));
  }
});
test('the first demo rotation follows priority before the existing pools shuffle', () => {
  for (const lang of ['en', 'es']) {
    const tour = createDemoTour(lang, () => 0.42);
    const rounds = Array.from({ length: 4 }, () => tour.nextRound());
    assert.deepEqual(rounds.map(round => round[1].key), ['project-studio-ivl', 'project-pouch', 'project-depsaber', 'project-time-weaver']);
    assert.equal(rounds[0][4].key, 'project-nicasource');
    assert(rounds.flat().every(entry => !entry.query.includes('Pouch')));
  }
});
