// words should become a class of its own with word class objects within. right ???

export default class Sentence {
    #words
    #endType
  
    constructor (words, endType) {
      this.#words = words
      this.#endType = endType

      this.toString = function() {
        return `${this.#words}${this.#endType}`
      }
    }
  
    getBody() { // is this useful/necessary??
      return this.#words
    }

    getEndPunctuation() { // is this useful/necessary??
      return this.#endType
    }
  }
  