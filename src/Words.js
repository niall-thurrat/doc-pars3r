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
    if (tokenizer.getActiveToken().getType() !== 'WORD') {
      // throw ParsingGrammarError exception - No words found to parse
    }
    while (tokenizer.getActiveToken().getType() === 'WORD') {
      this.#add(this.#parseWord(tokenizer))
      tokenizer.setActiveTokenToNext()
    }
  }

  #parseWord(tokenizer) {
    return new Word(tokenizer)
  }

  #add(word) {
    if (word instanceof Word) {
      this.#words.push(word)
    } else {
      // throw TypeError exception - Cannot add a non-Word object to Words
    }
  }
}
