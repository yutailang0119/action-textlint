import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {expect, test} from '@jest/globals'

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs with json file', () => {
  process.env['INPUT_REPORT-PATH'] = path.join(
    __dirname,
    'resource',
    'textlint-report.json'
  )
  process.env['INPUT_IGNORE-WARNINGS'] = 'false'
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  try {
    const stdout = cp.execFileSync(np, [ip], options)
    console.log(stdout.toString())
    expect.assertions(1)
  } catch (error: any) {
    console.log(error.stdout.toString())
    expect(error.status).toEqual(1)
  }
})

test('test runs with textlint output', () => {
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
        }
      ],
      "filePath":"Foo.md"
    }
  ]`
  process.env['INPUT_TEXTLINT-OUTPUT'] = json
  process.env['INPUT_IGNORE-WARNINGS'] = 'false'
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  console.log(cp.execFileSync(np, [ip], options).toString())
})
