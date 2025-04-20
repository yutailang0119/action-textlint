import fs from 'fs'
import * as core from '@actions/core'
import {echoMessages} from './command.js'
import {parseReport} from './parser.js'

export async function run(): Promise<void> {
  try {
    let json: string
    const textlintOutput = core.getInput('textlint-output', {required: false})
    if (textlintOutput === '') {
      const reportPath = core.getInput('report-path', {required: false})
      json = fs.readFileSync(reportPath, 'utf-8')
    } else {
      json = textlintOutput
    }
    const ignoreWarnings = core.getBooleanInput('ignore-warnings')

    const annotations = parseReport(json, ignoreWarnings)
    echoMessages(annotations)

    const errors = annotations.filter(annotation => {
      return annotation.severityLevel === 'error'
    })
    if (errors.length) {
      const unit = errors.length === 1 ? 'error' : 'errors'
      throw Error(`textlint with ${errors.length} ${unit}`)
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
