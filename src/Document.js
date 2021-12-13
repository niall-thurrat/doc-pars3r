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

  #parseSentences(t) {
    return new Sentences(t)
  }

  getSentences() {
    return this.#sentences
  }
}
