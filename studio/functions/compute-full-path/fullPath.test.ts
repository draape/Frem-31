import {test} from 'node:test'
import assert from 'node:assert/strict'
import {computeFullPath, computePathUpdates, type PageRow} from './fullPath.ts'

// home -> about -> team, plus contact directly under home
const tree: PageRow[] = [
  {_id: 'home', slug: 'home', parent: null, fullPath: null},
  {_id: 'about', slug: 'about', parent: 'home', fullPath: null},
  {_id: 'team', slug: 'team', parent: 'about', fullPath: null},
  {_id: 'contact', slug: 'contact', parent: 'home', fullPath: null},
]
const byId = new Map(tree.map((p) => [p._id, p]))

test('front page (no parent) resolves to /', () => {
  assert.equal(computeFullPath('home', byId), '/')
})

test('child of front page drops the root slug', () => {
  assert.equal(computeFullPath('about', byId), '/about')
  assert.equal(computeFullPath('contact', byId), '/contact')
})

test('deeper pages concatenate ancestor slugs', () => {
  assert.equal(computeFullPath('team', byId), '/about/team')
})

test('a reference cycle cannot cause infinite recursion', () => {
  const cyclic: PageRow[] = [
    {_id: 'a', slug: 'a', parent: 'b', fullPath: null},
    {_id: 'b', slug: 'b', parent: 'a', fullPath: null},
  ]
  const cyclicById = new Map(cyclic.map((p) => [p._id, p]))
  assert.doesNotThrow(() => computeFullPath('a', cyclicById))
})

test('computePathUpdates returns only the pages whose path drifted', () => {
  const pages: PageRow[] = [
    {_id: 'home', slug: 'home', parent: null, fullPath: '/'}, // already correct
    {_id: 'about', slug: 'about', parent: 'home', fullPath: '/old'}, // drifted
    {_id: 'team', slug: 'team', parent: 'about', fullPath: null}, // never set
  ]
  const updates = computePathUpdates(pages)
  assert.deepEqual(updates, [
    {_id: 'about', fullPath: '/about'},
    {_id: 'team', fullPath: '/about/team'},
  ])
})
