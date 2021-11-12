import Tokenizer from 'tokeniz3r'

export default class Document {
  #grammar
  #sentences

  constructor () {
    this.#grammar = [
      {
        tokenType: 'WORD',
        regex: /^[\w|åäöÅÄÖ]+/i
      },
      {
        tokenType: 'DOT',
        regex: /^\./
      }
    ]
  }
  
  parse (inputStr) {
    const tokenizer = new Tokenizer(inputStr, this.#grammar)

    console.log(`Tokenizer first token: ${tokenizer.getActiveToken().toString()}`)

    this.#sentences = inputStr
  }

  getAllSentences () {
    return this.#sentences
  }
}
