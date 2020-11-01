import * as core from '@actions/core'
import fs from 'fs'
import {parseReport} from './parser'
import {echoMessages} from './command'

async function run(): Promise<void> {
  try {
    let json: string
    const textlintOutput = core.getInput('textlint_output', {required: false})
    if (textlintOutput === '') {
      const jsonPath = core.getInput('json_path', {required: false})
      json = fs.readFileSync(jsonPath, 'utf-8')
    } else {
      json = textlintOutput
    }
    const annotations = await parseReport(json)
    await echoMessages(annotations)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
