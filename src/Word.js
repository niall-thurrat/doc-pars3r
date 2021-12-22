export default class Word {
  #chars

  constructor (tokenizer) {
    this.#setChars(tokenizer)
  }
  
  getMatchedText() {
    return this.#chars
  }

  #setChars(tokenizer) {
    const matchedChars = tokenizer.getActiveToken().getValue()
    // TODO Throw exception if not a string or if not formatted as desired, ie contains invalid chars
    this.#chars = matchedChars
  }
}
  