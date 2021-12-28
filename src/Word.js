export default class Word {
  #chars

  constructor(tokenizer) {
    this.#setChars(tokenizer)
  }
  
  getMatchedText() {
    return this.#chars
  }

  #setChars(tokenizer) {
    const matchedChars = tokenizer.getActiveToken().getValue()
    this.#chars = matchedChars
  }
}
  