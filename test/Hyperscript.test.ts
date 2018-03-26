import {createTestScheduler, EVENT} from 'observable-air/test'
import {h} from '../src/Hyperscript'
import {assert} from 'chai'
import {html} from '../src/internal/html'

describe('Hyperscript', () => {
  it('should create a dom tree', () => {
    const SH = createTestScheduler()
    const view$ = h('div.ab.cd', [h('h1', ['This is a test'])])
    const {results} = SH.start(() => view$)
    const output = html(
      `<div class="ab cd"><h1><span>This is a test</span></h1></div>`
    )
    assert.deepEqual(results, [EVENT.next(201, output), EVENT.complete(201)])
  })

  it('should create a empty tree', () => {
    const SH = createTestScheduler()
    const view$ = h('div.ab.cd')
    const {results} = SH.start(() => view$)
    const output = html(`<div class="ab cd"></div>`)
    assert.deepEqual(results, [EVENT.next(201, output), EVENT.complete(201)])
  })

  it('should create create node with attributes', () => {
    const SH = createTestScheduler()
    const view$ = h('a.link', {attrs: {href:'/home.html'}})
    const {results} = SH.start(() => view$)
    const output = html(`<a class="link" href="/home.html"></a>`)
    assert.deepEqual(results, [EVENT.next(201, output), EVENT.complete(201)])
  })
})
