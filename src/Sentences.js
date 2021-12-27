import SentenceFactory from './SentenceFactory.js'
import Sentence from './Sentence.js'
import RegularSentence from './concrete-sentences/RegularSentence.js'
import Question from './concrete-sentences/Question.js'
import Exclamation from './concrete-sentences/Exclamation.js'
import SyntacticError from './exceptions/SyntacticError.js'

export default class Sentences {
  #sentences = []

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
      this.#setToFirstTokenAfterSentence(tokenizer)
    }
  }

  #addSentence(tokenizer) {
    if (tokenizer.getActiveToken().getType() === 'WORD') {
      this.#add(this.#parseSentence(tokenizer))
    } else {
      this.#throwSyntacticErrorIfFirstTokenIsNotAWord()
    }
  }

  #parseSentence(tokenizer) {
    return new SentenceFactory().getSentence(tokenizer)
  }

  #add(sentence) {
    if (sentence instanceof Sentence) {
      this.#sentences.push(sentence)
    } else {
      // throw TypeError exception - Cannot add a non-Sentence object to Sentences
    }
  }

  #setToFirstTokenAfterSentence(tokenizer) {
    while (tokenizer.getActiveToken().getType() === 'WORD') {
      tokenizer.setActiveTokenToNext()
    }
    tokenizer.setActiveTokenToNext()
  }

  #throwSyntacticErrorIfFirstTokenIsNotAWord() {
    throw new SyntacticError('Error parsing sentence: first token is not a word')
  }
}
