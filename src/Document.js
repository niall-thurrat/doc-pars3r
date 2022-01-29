import Tokenizer from 'tokeniz3r'
import Sentences from './Sentences.js'
import TokenizerError from './exceptions/TokenizerError.js'

export default class Document {
  #sentences

  constructor(tokenizer) {
    this.#sentences = this.#parseSentences(tokenizer)
    this.#throwTokenizerErrorIfNoEndToken(tokenizer)
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

  #throwTokenizerErrorIfNoEndToken(tokenizer) {
    const activeToken = tokenizer.getActiveToken()
    
    if (this.#getTokenType(activeToken) !== 'END')
      throw new TokenizerError('No END token after Sentences parsed')
  }

  #getTokenType(token) {
    return token.getType()
  }
}
