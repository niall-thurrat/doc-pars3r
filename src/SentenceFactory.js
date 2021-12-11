import RegularSentence from './concrete-sentences/RegularSentence.js'
import Question from './concrete-sentences/Question.js'
import Exclamation from './concrete-sentences/Exclamation.js'

export default class SentenceFactory {
  constructor(tokenizer) {
    if (this.#getType(tokenizer) === 'DOT')
      return new RegularSentence(tokenizer)
    else if (this.#getType(tokenizer) === 'QUESTION-MARK')
      return new Question(tokenizer)
    else if (this.#getType(tokenizer) === 'EXCLAMATION-MARK')
      return new Exclamation(tokenizer)
    // else throw exception
  }

  #getType(t) {
    let count = 0
    let endType

    while (t.getActiveToken().getType() === 'WORD') { 
      t.setActiveTokenToNext()
      count++
    }

    endType = t.getActiveToken().getType()
    this.#setTokenizerToStartOfSentence(t, count)
    
    return endType
  }

   #setTokenizerToStartOfSentence(t, count) {
    while (count > 0) {
      t.setActiveTokenToPrevious()
      count--
    }
  }
}
