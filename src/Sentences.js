import RegularSentence from './concrete-sentences/RegularSentence.js'
import Question from './concrete-sentences/Question.js'
import Exclamation from './concrete-sentences/Exclamation.js'

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
    const endType = this.#getEndType(t)

    if (endType === 'DOT') {
      return new RegularSentence(t)
    } else if (endType === 'QUESTION-MARK') {
      return new Question(t)
    } else if (endType === 'EXCLAMATION-MARK') {
      return new Exclamation(t)
    } 
    // else {
    //   // throw exception if endType not appropriate
    // }
  }

  #getEndType(t) {
    let count = 0
    let endType

    while (t.getActiveToken().getType() === 'WORD') { 
      t.setActiveTokenToNext()
      count++
    }

    const tokenType = t.getActiveToken().getType()
    
    if (tokenType === 'DOT' || tokenType === 'QUESTION-MARK' || tokenType === 'EXCLAMATION-MARK') {
      endType = tokenType
      this.#setTokenizerToStartOfSentence(t, count)
    } else {
      // TODO throw exception here for non appropriate token after words
    }
    
    return endType
  }

  #setTokenizerToStartOfSentence(t, count) {
    while (count > 0) {
      t.setActiveTokenToPrevious()
      count--
    }
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
