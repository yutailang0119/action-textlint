import {parseReport} from '../src/parser'
import {Annotation} from '../src/annotation'

test('test parse', () => {
  const json = `[
    {
      "messages":[
        {
          "type":"lint",
          "ruleId":"sample-rule/no-weak-phrase",
          "message":"adverbs can weaken meaning",
          "index":12,
          "line":3,
          "column":6,
          "severity":1
        },
        {
          "type":"lint",
          "ruleId":"sample-rule/misspellings",
          "message":"This is a commonly misspelled word. Correct it to useful",
          "index":13,
          "line":22,
          "column":7,
          "severity":2
        }
      ],
      "filePath":"Foo.md"
    },
    {
      "messages":[
        {
          "type":"lint",
          "ruleId":"sample-rule/sentence:uppercase",
          "message":"sentence should start with an uppercase letter",
          "index":7,
          "line":3,
          "column":1,
          "severity":2,
          "fix":{
            "range":[1,4],
            "text":"This"
          }
        }
      ],
      "filePath":"Bar.md"
    }
  ]`
  const annotation1 = new Annotation(
    1,
    'Foo.md',
    3,
    6,
    'adverbs can weaken meaning (sample-rule/no-weak-phrase)'
  )
  const annotation2 = new Annotation(
    2,
    'Foo.md',
    22,
    7,
    'This is a commonly misspelled word. Correct it to useful (sample-rule/misspellings)'
  )
  const annotation3 = new Annotation(
    2,
    'Bar.md',
    3,
    1,
    'sentence should start with an uppercase letter (sample-rule/sentence:uppercase)'
  )

  expect(parseReport(json)).resolves.toEqual([
    annotation1,
    annotation2,
    annotation3
  ])
})
