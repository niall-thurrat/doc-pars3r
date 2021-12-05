export default class Word {
    #chars
  
    constructor (tokenizer) {
      this.#setChars(tokenizer)
    }

    #setChars(t) {
      const matchedChars = t.getActiveToken().getValue()
      // TODO Throw exception if not a string or if not formatted as desired, ie contains invalid chars
      this.#chars = matchedChars
    }
  
    getMatchedText() {
      return this.#chars
    }
  }
  