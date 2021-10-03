import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs with json file', () => {
  process.env['INPUT_JSON_PATH'] = path.join(
    __dirname,
    'resource',
    'textlint-report.json'
  )
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecSyncOptions = {
    env: process.env
  }
  try {
    const stdout = cp.execSync(`node ${ip}`, options)
    console.log(stdout)
    expect.assertions(1)
  } catch (err) {
    console.log('stdout: ', err.stdout.toString())
    expect(err.status).toEqual(1)
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
          "severity":1
        }
      ],
      "filePath":"Foo.md"
    }
  ]`
  process.env['INPUT_TEXTLINT_OUTPUT'] = json
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecSyncOptions = {
    env: process.env
  }
  console.log(cp.execSync(`node ${ip}`, options).toString())
})
