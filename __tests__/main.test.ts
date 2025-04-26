import { jest } from '@jest/globals'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { expect } from '@jest/globals'
import * as core from '../__fixtures__/core.js'

jest.unstable_mockModule('@actions/core', () => core)

const { run } = await import('../src/main.js')

// shows how the runner will run a javascript action with env / stdout protocol
describe('main.ts', () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))

  beforeEach(() => {
    core.getBooleanInput.mockImplementation((name) => {
      switch (name) {
        case 'ignore-warnings':
          return false
        default:
          return false
      }
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('test runs with json file', async () => {
    core.getInput.mockImplementation((name) => {
      switch (name) {
        case 'report-path':
          return path.join(__dirname, 'resource', 'textlint-report.json')
        default:
          return ''
      }
    })

    await run()

    expect(core.setFailed).toHaveBeenNthCalledWith(1, 'textlint with 4 errors')
  })

  it('test runs with textlint output', async () => {
    core.getInput.mockImplementation((name) => {
      switch (name) {
        case 'textlint-output':
          return `[
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
        default:
          return ''
      }
    })

    await run()

    expect(core.setFailed).not.toHaveBeenCalled()
  })
})
