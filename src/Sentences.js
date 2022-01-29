import SentenceFactory from './SentenceFactory.js'
import Sentence from './Sentence.js'
import RegularSentence from './concrete-sentences/RegularSentence.js'
import Question from './concrete-sentences/Question.js'
import Exclamation from './concrete-sentences/Exclamation.js'
import SyntacticError from './exceptions/SyntacticError.js'

export default class Sentences {
  #sentences = []

  constructor(tokenizer) {
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
    while (this.#getActiveTokenType(tokenizer) !== 'END') {
      this.#addSentence(tokenizer)
      this.#setToFirstTokenAfterSentence(tokenizer)
    }
  }

  #getActiveTokenType(tokenizer) {
    const activeToken = tokenizer.getActiveToken()
    return this.#getTokenType(activeToken)
  }

  #getTokenType(token) {
    return token.getType()
  }

  #addSentence(tokenizer) {
    if (this.#getActiveTokenType(tokenizer) === 'WORD') {
      const parsedSentence = this.#parseSentence(tokenizer)
      this.#add(parsedSentence)
    }
    else
      this.#throwSyntacticErrorIfFirstTokenIsNotAWord()
  }

  #parseSentence(tokenizer) {
    return new SentenceFactory().getSentence(tokenizer)
  }

  #add(sentence) {
    if (sentence instanceof Sentence)
      this.#sentences.push(sentence)
    else
      this.#throwTypeErrorIfTryingToAddNonSentence()
  }

  #setToFirstTokenAfterSentence(tokenizer) {
    while (this.#getActiveTokenType(tokenizer) === 'WORD') {
      tokenizer.setActiveTokenToNext()
    }
    tokenizer.setActiveTokenToNext()
  }

  #throwSyntacticErrorIfFirstTokenIsNotAWord() {
    throw new SyntacticError('Error parsing sentence: first token is not a word')
  }

  #throwTypeErrorIfTryingToAddNonSentence() {
    throw new TypeError('Cannot add a non-Sentence object to Sentences')
  }
}
