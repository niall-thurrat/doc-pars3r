export default class TokenizerError extends Error {
  constructor (message) {
    super(message)
    this.name = 'TokenizerError'
  }
}
