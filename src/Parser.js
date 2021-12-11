import Tokenizer from 'tokeniz3r'
import Document from './Document.js'

export default class Parser {
  #grammar

  constructor() {
    this.#grammar = [
      {
        tokenType: 'WORD',
        regex: /^[\w|åäöÅÄÖ]+/i
      },
      {
        tokenType: 'DOT',
        regex: /^\./
      },
      {
        tokenType: 'QUESTION-MARK',
        regex: /^\?/
      },
      {
        tokenType: 'EXCLAMATION-MARK',
        regex: /^\!/
      }
    ]
  }

  parseDocument(inputStr) {
    const t = new Tokenizer(inputStr, this.#grammar)
    return new Document(t)
  }
}
