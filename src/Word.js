export default class Word {
  #chars

  constructor(tokenizer) {
    this.#setChars(tokenizer)
  }
  
  getMatchedText() {
    return this.#chars
  }

  #setChars(tokenizer) {
    const activeToken = tokenizer.getActiveToken()
    const matchedChars = this.#getTokenValue(activeToken)
    
    this.#chars = matchedChars
  }

  #getTokenValue(token) {
    return token.getValue()
  }
}
  