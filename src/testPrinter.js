import Document from './Document.js'

const doc = new Document()
doc.parse('Hello world.')
const sentences = doc.getAllSentences()

console.log(`Test sentecnces: ${sentences}`)