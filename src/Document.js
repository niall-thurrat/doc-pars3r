export default class Document {
  #sentences

  parse (inputStr) {
    this.#sentences = inputStr
  }

  getAllSentences () {
    return this.#sentences
  }
}
