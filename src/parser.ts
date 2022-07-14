import {TextlintResult} from '@textlint/types/src/Message/TextlintResult'
import {Annotation} from './annotation'

export const parseReport = (json: string): Annotation[] => {
  const results: TextlintResult[] = JSON.parse(json)
  const annotations: Annotation[] = results.flatMap(result => {
    return result.messages.map(message => {
      return new Annotation(
        message.severity,
        `${message.message} (${message.ruleId})`,
        result.filePath,
        message.line,
        message.column
      )
    })
  })
  return annotations
}
