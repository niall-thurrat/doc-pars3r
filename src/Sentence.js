// TODO make this an abstract class with Regular, Question and Exclamation sub-classes inheriting from it

import Words from './Words.js'

export default class Sentence {
    #words
    #endType
  
    constructor (tokenizer) {
      this.#words = new Words(tokenizer)
      this.#setEndType(tokenizer)

      this.toString = function() {
        return `${this.#words.toString()}${this.#endType}`
      }
    }

    #setEndType(t) {
      while (t.getActiveToken().getType() === 'WORD') { 
        t.setActiveTokenToNext()
      }

      if (t.getActiveToken().getType() === 'DOT') { // change to allow for ? and !
        this.#endType = t.getActiveToken().getValue()
      } else {
        // TODO throw exception here for non appropriate token after words
      }
    }
  
    getWords() {
      return this.#words
    }

    getEndPunctuation() {
      return this.#endType
    }
  }
  