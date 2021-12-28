import Words from './Words.js'
import CompileTimeError from './exceptions/CompileTimeError.js'

export default class Sentence {
  words

  constructor (tokenizer) {
    this.#throwCompileTimeErrorIfAbstractClassInstantiated()
    this.words = this.#parseWords(tokenizer)
  }
  
  getWords() {
    return this.words
  }

  #parseWords(tokenizer) {
    return new Words(tokenizer)
  }

  #throwCompileTimeErrorIfAbstractClassInstantiated() {
    if (this.constructor === Sentence)
      throw new CompileTimeError('Can\'t instantiate abstract class Sentence')
  }
}
  