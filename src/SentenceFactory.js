import RegularSentence from './concrete-sentences/RegularSentence.js'
import Question from './concrete-sentences/Question.js'
import Exclamation from './concrete-sentences/Exclamation.js'

export default class SentenceFactory {
  getSentence(tokenizer) {
    const endType = this.#getType(tokenizer)
    
    switch(endType) {
      case 'DOT':
        return new RegularSentence(tokenizer)
        break
      case 'QUESTION-MARK':
        return new Question(tokenizer)
        break
      case 'EXCLAMATION-MARK':
        return new Exclamation(tokenizer)
        break
      default:
        // throw exception
    }
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
