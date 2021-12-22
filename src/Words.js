import Word from './Word.js'

export default class Words {
  #words = []

  constructor (tokenizer) {
    this.#setWords(tokenizer)

    this.toString = function() {
      return this.#words.map(w => w.getMatchedText()).join(' ').trim()
    }
  }

  getAll() { 
    return this.#words
  }

  #setWords(tokenizer) {
    while (tokenizer.getActiveToken().getType() === 'WORD') {
      this.#add(this.#parseWord(tokenizer))
      tokenizer.setActiveTokenToNext()
    }
    // throw exception if empty - a sentence cant exist without words
  }

  #parseWord(tokenizer) {
    return new Word(tokenizer)
  }

  #add(word) {
    if (word instanceof Word) {
      this.#words.push(word)
    }
  }
}
