import Sentence from '../Sentence.js'

export default class RegularSentence extends Sentence {
  #endType = '.'

  constructor (tokenizer) {
    super(tokenizer)
    this.toString = function() {
      return `${this.words.toString()}${this.#endType}`
    }
  }

  getEndPunctuation() {
    return this.#endType
  }
}
  