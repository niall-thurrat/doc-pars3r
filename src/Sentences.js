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

  #setSentences(tokenizer) {
    const sentences = []
    let isEndToken = false

    while (!isEndToken) {
      let words = ''
      let endType = ''

      while (tokenizer.getActiveToken().getType() === 'WORD') {
        words += tokenizer.getActiveToken().getValue() + ' '
        tokenizer.setActiveTokenToNext()
      }

      if (tokenizer.getActiveToken().getType() === 'DOT') {
          words = words.substring(0, words.length - 1)
          endType = tokenizer.getActiveToken().getValue()
          tokenizer.setActiveTokenToNext()
      }

      if (tokenizer.getActiveToken().getType() === 'END') {
        isEndToken = true
      }

      // TODDO handle if exception

      sentences.push(new Sentence(words, endType))
      words = ''
      endType = ''
    }

    this.#sentences = sentences
  }
}
