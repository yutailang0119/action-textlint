import * as core from '@actions/core'
import {TextlintResult} from '@textlint/types/src/Message/TextlintResult'
import {Annotation} from './annotation'

export const parseReport = (json: string): Annotation[] => {
  const files: TextlintResult[] = JSON.parse(json)
  const annotations: Annotation[] = []
  try {
    for (const file of files) {
      for (const message of file.messages) {
        const annotation = new Annotation(
          message.severity,
          `${message.message} (${message.ruleId})`,
          file.filePath,
          message.line,
          message.column
        )
        annotations.push(annotation)
      }
    }
  } catch (error) {
    core.debug(`failed to read ${error}`)
  }
  return annotations
}
