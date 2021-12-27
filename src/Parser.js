import Tokenizer from 'tokeniz3r'
import Document from './Document.js'
import LexicalInputError from './exceptions/LexicalInputError.js'

export default class Parser {
  #grammar

  constructor() {
    this.#grammar = [
      {
        tokenType: 'WORD',
        regex: /^[\w|åäöÅÄÖ]+/i
      },
      {
        tokenType: 'DOT',
        regex: /^\./
      },
      {
        tokenType: 'QUESTION-MARK',
        regex: /^\?/
      },
      {
        tokenType: 'EXCLAMATION-MARK',
        regex: /^\!/
      }
    ]
  }

  parseDocument(inputStr) {
    try {
      const tokenizer = new Tokenizer(inputStr, this.#grammar)
      return new Document(tokenizer)
    } 
    catch(err) {
      this.#throwLexicalInputErrorIfTokenizerThrowsLexicalError(err)
      throw err
    }
  }

  #throwLexicalInputErrorIfTokenizerThrowsLexicalError(err) {
    if (err.name === 'LexicalError')
      throw new LexicalInputError('Character(s) found that do not follow DocPars3rs grammar rules')
  }
}
