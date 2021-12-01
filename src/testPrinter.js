import Document from './Document.js'

const doc = new Document()
doc.parse('Hello world.        Hello again.')
const sentences = doc.getAllSentences()

console.log(`Test sentences[0].toString(): ${sentences[0].toString()}`)
console.log(`Test sentences[1].toString(): ${sentences[1].toString()}`)
