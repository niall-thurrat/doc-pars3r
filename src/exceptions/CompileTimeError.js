export default class CompileTimeError extends Error {
  constructor (message) {
    super(message)
    this.name = 'CompileTimeError'
  }
}
