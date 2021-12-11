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
  
  parse(inputStr) {
    const tokenizer = new Tokenizer(inputStr, this.#grammar)
    const sentences = new Sentences(tokenizer)

    this.#sentences = sentences.getAll()
  }

  getAllSentences() {
    return this.#sentences
  }

  getRegularSentences() {
    return this.#sentences.filter(s => s.getEndPunctuation() === '.')
  }

  getQuestions() {
    return this.#sentences.filter(s => s.getEndPunctuation() === '?')
  }

  getExclamations() {
    return this.#sentences.filter(s => s.getEndPunctuation() === '!')
  }
}