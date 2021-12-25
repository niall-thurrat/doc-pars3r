import RegularSentence from './concrete-sentences/RegularSentence.js'
import Question from './concrete-sentences/Question.js'
import Exclamation from './concrete-sentences/Exclamation.js'

export default class SentenceFactory {
  #tokenIndex = 0
  #endType

  getSentence(tokenizer) {
    this.#setEndType(tokenizer)
    
    switch(this.#endType) {
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
        // throw exception // LEXICAL ERROR - remember this will pick up any symbol in the middle of sentences that is a no-match for the grammar
    }
  }

  #setEndType(tokenizer) {
    this.#setToEndOfSentence(tokenizer)
    this.#endType = tokenizer.getActiveToken().getType()
    this.#setToStartOfSentence(tokenizer)
  }

  #setToEndOfSentence(tokenizer) {
    while (tokenizer.getActiveToken().getType() === 'WORD') { 
      tokenizer.setActiveTokenToNext()
      this.#tokenIndex++
    }
  }

  #setToStartOfSentence(tokenizer) {
    while (this.#tokenIndex > 0) {
      tokenizer.setActiveTokenToPrevious()
      this.#tokenIndex--
    }
  }
}
