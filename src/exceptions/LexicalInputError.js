export default class LexicalInputError extends Error {
  constructor(message) {
    super(message)
    this.name = 'LexicalInputError'
  }
}
