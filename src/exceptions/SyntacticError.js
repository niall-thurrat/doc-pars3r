export default class SyntacticError extends Error {
  constructor (message) {
    super(message)
    this.name = 'SyntacticError'
  }
}
