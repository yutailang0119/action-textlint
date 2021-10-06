import {AnnotationProperties} from '@actions/core'
import {AnnotationSeverityLevel} from './annotation-severity-level'

export class Annotation {
  severityLevel: AnnotationSeverityLevel
  message: string
  properties: AnnotationProperties

  constructor(
    severity: number,
    message: string,
    file: string,
    line: number,
    column: number
  ) {
    this.severityLevel = severity === 2 ? 'error' : 'warning'
    this.message = message
    this.properties = {
      file,
      startLine: line,
      startColumn: column
    }
  }
}
