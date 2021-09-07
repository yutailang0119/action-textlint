import * as core from '@actions/core'
import {TextlintResult} from '@textlint/types/src/Message/TextlintResult'
import {Annotation} from './annotation'

export async function parseReport(json: string): Promise<Annotation[]> {
  const files: TextlintResult[] = JSON.parse(json)
  return new Promise(resolve => {
    try {
      const annotations: Annotation[] = []
      for (const file of files) {
        for (const message of file.messages) {
          const annotation = new Annotation(
            message.severity,
            file.filePath,
            message.line,
            message.column,
            `${message.message} (${message.ruleId})`
          )
          annotations.push(annotation)
        }
      }
      resolve(annotations)
    } catch (error) {
      core.debug(`failed to read ${error}`)
    }
  })
}
