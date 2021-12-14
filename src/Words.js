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

  #setWords(t) {
    while (t.getActiveToken().getType() === 'WORD') {
      this.#addWord(this.#parseWord(t))
      t.setActiveTokenToNext()
    }
    // throw exception if empty - a sentence cant exist without words
  }

  #parseWord(t) {
    return new Word(t)
  }

  #addWord(w) {
    if (w instanceof Word) {
      this.#words.push(w)
    }
  }
}
