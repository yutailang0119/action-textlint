import { AnnotationProperties } from '@actions/core'
import { AnnotationSeverityLevel } from './annotation-severity-level.js'

export class Annotation {
  severityLevel: AnnotationSeverityLevel
  message: string
  properties: AnnotationProperties

  constructor(
    severity: number,
    message: string,
    file: string,
    loc: {
      start: {
        line: number
        column: number
      }
      end: {
        line: number
        column: number
      }
    }
  ) {
    this.severityLevel = severity === 2 ? 'error' : 'warning'
    this.message = message
    this.properties = {
      file,
      startLine: loc.start.line,
      endLine: loc.end.line,
      startColumn: loc.start.column,
      endColumn: loc.end.column
    }
  }
}
