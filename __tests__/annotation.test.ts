import {Annotation} from '../src/annotation'

test('test Annotation.constructor with warning', () => {
  const annotation = new Annotation(
    1,
    'adverbs can weaken meaning (sample-rule/no-weak-phrase)',
    'Foo.md',
    3,
    6
  )
  expect(annotation.severityLevel).toEqual('warning')
  expect(annotation.message).toEqual(
    'adverbs can weaken meaning (sample-rule/no-weak-phrase)'
  )
  expect(annotation.file).toEqual('Foo.md')
  expect(annotation.line).toEqual(3)
  expect(annotation.column).toEqual(6)
})

test('test Annotation.constructor with error', () => {
  const annotation = new Annotation(
    2,
    'This is a commonly misspelled word. Correct it to useful (sample-rule/misspellings)',
    'Foo.md',
    22,
    7
  )
  expect(annotation.severityLevel).toEqual('error')
  expect(annotation.message).toEqual(
    'This is a commonly misspelled word. Correct it to useful (sample-rule/misspellings)'
  )
  expect(annotation.file).toEqual('Foo.md')
  expect(annotation.line).toEqual(22)
  expect(annotation.column).toEqual(7)
})

test('test Annotation.constructor with other', () => {
  const annotation = new Annotation(0, '', 'Bar.md', 0, 0)
  expect(annotation.severityLevel).toEqual('warning')
})
