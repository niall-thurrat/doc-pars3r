import Tokenizer from 'tokeniz3r'
import Sentences from './Sentences.js'

export default class Document {
  #sentences

  constructor(tokenizer) {
    this.#sentences = new Sentences(tokenizer).getAll()
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
