import SentenceFactory from './SentenceFactory.js'
import Sentence from './Sentence.js'
import RegularSentence from './concrete-sentences/RegularSentence.js'
import Question from './concrete-sentences/Question.js'
import Exclamation from './concrete-sentences/Exclamation.js'

export default class Sentences {
  #sentences = []
  #acceptedEndTypes = ['DOT', 'QUESTION-MARK', 'EXCLAMATION-MARK'] // not good cohesion but good not to bury this?

  constructor (tokenizer) {
    this.#setSentences(tokenizer)
  }

  getAll() {
    return this.#sentences
  }

  getRegular() {
    return this.#sentences.filter(s => s instanceof RegularSentence)
  }

  getQuestions() {
    return this.#sentences.filter(s => s instanceof Question)
  }

  getExclamations() {
    return this.#sentences.filter(s => s instanceof Exclamation)
  }

  #setSentences(tokenizer) {
    while (tokenizer.getActiveToken().getType() !== 'END') {
      this.#addSentence(tokenizer)
      this.#setToNextSentence(tokenizer)
      // TODO throw exception if ActiveToken type is not a word (beginning of a sentence) or END
    }
  }

  #addSentence(tokenizer) {
    if (tokenizer.getActiveToken().getType() === 'WORD') {
      this.#add(this.#parseSentence(tokenizer))
    }
  }

  #parseSentence(tokenizer) {
    return new SentenceFactory().getSentence(tokenizer)
  }

  #add(sentence) {
    if (sentence instanceof Sentence) {
      this.#sentences.push(sentence)
    } else {
      // throw exception - trying to add non-Sentence item to Sentences
    }
  }

  #setToNextSentence(tokenizer) {
    this.#setActiveTokenAfterWords(tokenizer)
    this.#setActiveTokenAfterSentenceEndType(tokenizer)
  }

  #setActiveTokenAfterWords(tokenizer) {
    while (tokenizer.getActiveToken().getType() === 'WORD') {
      tokenizer.setActiveTokenToNext()
    }
  }

  #setActiveTokenAfterSentenceEndType(tokenizer) {
    const tokenType = tokenizer.getActiveToken().getType()

    if (this.#acceptedEndTypes.includes(tokenType)) {
      tokenizer.setActiveTokenToNext()
    } else {
      // throw exception if acceptable end type not found after word(s)
    }
  }
}
