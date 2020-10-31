import * as core from '@actions/core'
import fs from 'fs'
import {parseReport} from './parser'
import {echoMessages} from './command'

async function run(): Promise<void> {
  try {
    const reportPath = core.getInput('json_path', {required: true})
    const json = fs.readFileSync(reportPath, 'utf-8')
    const annotations = await parseReport(json)
    await echoMessages(annotations)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
