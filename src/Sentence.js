import Words from './Words.js'

export default class Sentence {
  words

  constructor (tokenizer) {
    if (this.constructor === Sentence) {
      throw new Error("Can't instantiate abstract class Sentence")
    }

    this.words = this.#parseWords(tokenizer)
  }
  
  getWords() {
    return this.words
  }

  #parseWords(tokenizer) {
    return new Words(tokenizer)
  }
}
  