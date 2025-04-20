import {expect, test} from '@jest/globals'
import {Annotation} from '../src/annotation.js'

test('test Annotation.constructor with warning', () => {
  const annotation = new Annotation(
    1,
    'adverbs can weaken meaning (sample-rule/no-weak-phrase)',
    'Foo.md',
    {
      start: {
        line: 3,
        column: 6
      },
      end: {
        line: 3,
        column: 7
      }
    }
  )
  expect(annotation.severityLevel).toEqual('warning')
  expect(annotation.message).toEqual(
    'adverbs can weaken meaning (sample-rule/no-weak-phrase)'
  )
  expect(annotation.properties).toEqual({
    file: 'Foo.md',
    startLine: 3,
    startColumn: 6,
    endLine: 3,
    endColumn: 7
  })
})

test('test Annotation.constructor with error', () => {
  const annotation = new Annotation(
    2,
    'This is a commonly misspelled word. Correct it to useful (sample-rule/misspellings)',
    'Foo.md',
    {
      start: {
        line: 22,
        column: 7
      },
      end: {
        line: 22,
        column: 8
      }
    }
  )
  expect(annotation.severityLevel).toEqual('error')
  expect(annotation.message).toEqual(
    'This is a commonly misspelled word. Correct it to useful (sample-rule/misspellings)'
  )
  expect(annotation.properties).toEqual({
    file: 'Foo.md',
    startLine: 22,
    startColumn: 7,
    endLine: 22,
    endColumn: 8
  })
})

test('test Annotation.constructor with other', () => {
  const annotation1 = new Annotation(NaN, '', 'Foo.md', {
    start: {line: 0, column: 0},
    end: {line: 0, column: 1}
  })
  expect(annotation1.severityLevel).toEqual('warning')

  const annotation2 = new Annotation(0, '', 'Bar.md', {
    start: {line: 0, column: 0},
    end: {line: 0, column: 1}
  })
  expect(annotation2.severityLevel).toEqual('warning')

  const annotation3 = new Annotation(3, '', 'Baz.md', {
    start: {line: 0, column: 0},
    end: {line: 0, column: 1}
  })
  expect(annotation3.severityLevel).toEqual('warning')
})
