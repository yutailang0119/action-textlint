import {AnnotationSeverityLevel} from './annotation-severity-level'

export class Annotation {
  severityLevel: AnnotationSeverityLevel

  constructor(
    severity: number,
    public message: string,
    public file: string,
    public line: number,
    public column: number
  ) {
    this.severityLevel = severity === 2 ? 'error' : 'warning'
  }
}
