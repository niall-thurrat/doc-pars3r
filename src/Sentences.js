import SentenceFactory from './SentenceFactory.js'
import Sentence from './Sentence.js'
import RegularSentence from './concrete-sentences/RegularSentence.js'
import Question from './concrete-sentences/Question.js'
import Exclamation from './concrete-sentences/Exclamation.js'

export default class Sentences {
  #sentences = []
  #endTypes = ['DOT', 'QUESTION-MARK', 'EXCLAMATION-MARK']

  constructor (tokenizer) {
    this.#setSentences(tokenizer)
  }

  getAll() {
    return this.#sentences
  }

  getRegularSentences() {
    return this.#sentences.filter(s => s instanceof RegularSentence)
  }

  getQuestions() {
    return this.#sentences.filter(s => s instanceof Question)
  }

  getExclamations() {
    return this.#sentences.filter(s => s instanceof Exclamation)
  }

  #setSentences(t) {
    let isAtEndToken = false

    while (!isAtEndToken) {
      if (t.getActiveToken().getType() === 'WORD') {
        this.#addSentence(this.#parseSentence(t))
        this.#setTokenizerToNextSentence(t)
      }

      if (t.getActiveToken().getType() === 'END') {
        isAtEndToken = true
      }
      // TODO throw exception if ActiveToken type is not a word (beginning of a sentence) or END
    }
  }

  #parseSentence(t) {
    return new SentenceFactory().getSentence(t)
  }

  #addSentence(s) {
    if (s instanceof Sentence) {
      this.#sentences.push(s)
    }
  }

  #setTokenizerToNextSentence(t) {
    while (t.getActiveToken().getType() === 'WORD') {
      t.setActiveTokenToNext()
    }

    const tokenType = t.getActiveToken().getType()

    if (this.#endTypes.includes(tokenType)) {
      t.setActiveTokenToNext()
    } else {
      // throw exception if acceptable end type not found after word(s)
    }
  }
}
