import { expect } from '@jest/globals'
import { Annotation } from '../src/annotation.js'
import { parseReport } from '../src/parser.js'

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
        "range":[
          12,
          13
        ],
        "loc":{
          "start":{
            "line":3,
            "column":6
          },
          "end":{
            "line":3,
            "column":7
          }
        },
        "severity":1
      },
      {
        "type":"lint",
        "ruleId":"sample-rule/misspellings",
        "message":"This is a commonly misspelled word. Correct it to useful",
        "index":13,
        "line":22,
        "column":7,
        "range":[
          13,
          14
        ],
        "loc":{
          "start":{
            "line":22,
            "column":7
          },
          "end":{
            "line":22,
            "column":8
          }
        },
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
        "range":[
          7,
          8
        ],
        "loc":{
          "start":{
            "line":3,
            "column":1
          },
          "end":{
            "line":3,
            "column":2
          }
        },
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

describe('parser.ts', () => {
  it('test parse', () => {
    const annotation1 = new Annotation(
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
    const annotation2 = new Annotation(
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
    const annotation3 = new Annotation(
      2,
      'sentence should start with an uppercase letter (sample-rule/sentence:uppercase)',
      'Bar.md',
      {
        start: {
          line: 3,
          column: 1
        },
        end: {
          line: 3,
          column: 2
        }
      }
    )

    expect(parseReport(json, false)).toEqual([
      annotation1,
      annotation2,
      annotation3
    ])
  })

  it('test parse and ignore warnings', () => {
    const annotation2 = new Annotation(
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
    const annotation3 = new Annotation(
      2,
      'sentence should start with an uppercase letter (sample-rule/sentence:uppercase)',
      'Bar.md',
      {
        start: {
          line: 3,
          column: 1
        },
        end: {
          line: 3,
          column: 2
        }
      }
    )

    expect(parseReport(json, true)).toEqual([annotation2, annotation3])
  })
})
