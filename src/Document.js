import Tokenizer from 'tokeniz3r'
import Sentences from './Sentences.js'

export default class Document {
  #sentences

  constructor(tokenizer) {
    this.#sentences = this.#parseSentences(tokenizer)
    
    if (tokenizer.getActiveToken().getType() !== 'END') {
      // TODO throw exception
    }
  }

  getSentences() {
    return this.#sentences.getAll()
  }

  getRegularSentences() {
    return this.#sentences.getRegular()
  }

  getQuestions() {
    return this.#sentences.getQuestions()
  }

  getExclamations() {
    return this.#sentences.getExclamations()
  }
  
  #parseSentences(tokenizer) {
    return new Sentences(tokenizer)
  }
}
