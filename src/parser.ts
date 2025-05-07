import { TextlintResult } from '@textlint/types'
import { Annotation } from './annotation.js'

export const parseReport = (
  json: string,
  ignoreWarnings: boolean
): Annotation[] => {
  const results: TextlintResult[] = JSON.parse(json)
  const annotations: Annotation[] = results.flatMap((result) => {
    return result.messages.map((message) => {
      return new Annotation(
        message.severity,
        `${message.message} (${message.ruleId})`,
        result.filePath,
        {
          start: {
            line: message.loc.start.line,
            column: message.loc.start.column
          },
          end: {
            line: message.loc.end.line,
            column: message.loc.end.column
          }
        }
      )
    })
  })
  if (ignoreWarnings === true) {
    return annotations.filter((annotation) => {
      return annotation.severityLevel !== 'warning'
    })
  } else {
    return annotations
  }
}
