import {TextlintResult} from '@textlint/types/src/Message/TextlintResult'
import {Annotation} from './annotation'

export const parseReport = (json: string): Annotation[] => {
  const files: TextlintResult[] = JSON.parse(json)
  const annotations: Annotation[] = files.flatMap(file => {
    return file.messages.map(message => {
      return new Annotation(
        message.severity,
        `${message.message} (${message.ruleId})`,
        file.filePath,
        message.line,
        message.column
      )
    })
  })
  return annotations
}
