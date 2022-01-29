import Word from './Word.js'

export default class Words {
  #words = []

  constructor(tokenizer) {
    this.#setWords(tokenizer)

    this.toString = function() {
      return this.#words.map(w => w.getMatchedText()).join(' ').trim()
    }
  }

  getAll() { 
    return this.#words
  }

  #setWords(tokenizer) {
    while (this.#getActiveTokenType(tokenizer) === 'WORD') {
      this.#add(this.#parseWord(tokenizer))
      tokenizer.setActiveTokenToNext()
    }
  }

  #getActiveTokenType(tokenizer) {
    const activeToken = tokenizer.getActiveToken()
    return this.#getTokenType(activeToken)
  }

  #getTokenType(token) {
    return token.getType()
  }

  #parseWord(tokenizer) {
    return new Word(tokenizer)
  }

  #add(word) {
    if (word instanceof Word)
      this.#words.push(word)
    else
      this.#throwTypeErrorIfTryingToAddNonWord()
  }

  #throwTypeErrorIfTryingToAddNonWord() {
    throw new TypeError('Cannot add a non-Word object to Words')
  }
}
