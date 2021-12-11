import SentenceFactory from './SentenceFactory.js'

export default class Sentences {
  #sentences

  constructor (tokenizer) {
    this.#setSentences(tokenizer)
  }

  getAll() {
    return this.#sentences
  }

  #setSentences(t) {
    const sentences = []
    let isEndToken = false

    while (!isEndToken) {
      if (t.getActiveToken().getType() === 'WORD') {
        sentences.push(this.#createSentence(t))
        this.#setTokenizerToNextSentence(t)
      }

      if (t.getActiveToken().getType() === 'END') {
        isEndToken = true
      }

      // TODO throw exception if ActiveToken is not a word (beginning of a sentence) or END
    }

    this.#sentences = sentences
  }

  #createSentence(t) {
    return new SentenceFactory(t)
  }

  #setTokenizerToNextSentence(t) {
    while (t.getActiveToken().getType() === 'WORD') {
      t.setActiveTokenToNext()
    }

    const tokenType = t.getActiveToken().getType()
    
    if (tokenType === 'DOT' || tokenType === 'QUESTION-MARK' || tokenType === 'EXCLAMATION-MARK') {
      t.setActiveTokenToNext()
    } else {
      // throw exception if dot not found after word(s)
    }
  }
}
