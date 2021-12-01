import Tokenizer from 'tokeniz3r'
import Sentences from './Sentences.js'

export default class Document {
  #grammar
  #sentences

  constructor() {
    this.#grammar = [
      {
        tokenType: 'WORD',
        regex: /^[\w|åäöÅÄÖ]+/i
      },
      {
        tokenType: 'DOT',
        regex: /^\./
      }
    ]
  }
  
  parse(inputStr) {
    const tokenizer = new Tokenizer(inputStr, this.#grammar)
    const sentences = new Sentences(tokenizer)

    this.#sentences = sentences.getAll()
  }

  getAllSentences() {
    return this.#sentences
  }
}
