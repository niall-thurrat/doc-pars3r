import Sentence from './Sentence.js'

export default class Sentences {
  #sentences

  constructor (tokenizer) {
    this.#setSentences(tokenizer)
  }

  getAll() {
    return this.#sentences
  }

//   getRegular() {
//     return this.#sentences
//   }

//   getQuestions() {
//     return this.#sentences
//   }

//   getExclamations() {
//     return this.#sentences
//   }

  #setSentences(t) {
    const sentences = []
    let isEndToken = false

    while (!isEndToken) {
      if (t.getActiveToken().getType() === 'WORD') {
        sentences.push(new Sentence(t))
        this.#setTokenizerToNextSentence(t)
      }

      if (t.getActiveToken().getType() === 'END') {
        isEndToken = true
      }

      // TODO throw exception if ActiveToken is not a word (beginning of a sentence) or END
    }

    this.#sentences = sentences
  }

  #setTokenizerToNextSentence(t) {
    while (t.getActiveToken().getType() === 'WORD') {
      t.setActiveTokenToNext()
    }
    
    if (t.getActiveToken().getType() === 'DOT') {
      t.setActiveTokenToNext()
    } else {
      // throw exception if dot not found after word(s)
    }
  }
}
