import Word from './Word.js'

export default class Words {
  #words

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
    const words = []

    while (t.getActiveToken().getType() === 'WORD') {
      words.push(new Word(t))
      t.setActiveTokenToNext()
    }

    // throw exception if empty - a sentence cant exist without words

    this.#words = words
  }
}
