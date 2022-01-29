import RegularSentence from './concrete-sentences/RegularSentence.js'
import Question from './concrete-sentences/Question.js'
import Exclamation from './concrete-sentences/Exclamation.js'
import SyntacticError from './exceptions/SyntacticError.js'

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
        this.#throwSyntacticErrorIfNotAcceptedEndType()
    }
  }

  #setEndType(tokenizer) {
    this.#setToEndOfSentence(tokenizer)
    this.#endType = this.#getActiveTokenType(tokenizer)
    this.#setToStartOfSentence(tokenizer)
  }

  #getActiveTokenType(tokenizer) {
    const activeToken = tokenizer.getActiveToken()
    return this.#getTokenType(activeToken)
  }

  #getTokenType(token) {
    return token.getType()
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

  #throwSyntacticErrorIfNotAcceptedEndType() {
    throw new SyntacticError('Token found after words is not an accepted sentence end type')
  }
}
