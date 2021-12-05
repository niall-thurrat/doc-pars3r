import Document from './Document.js'

const doc = new Document()
doc.parse('Hello world.        Hello again.')
const sentences = doc.getAllSentences()

console.log(`Test sentences[0].toString(): ${sentences[0].toString()}`)

const sentence1Words = sentences[0].getWords()
console.log(`sentence1Words.toString(): ${sentence1Words.toString()}`)
const sentence1WordsAll = sentence1Words.getAll()
console.log(`sentence1WordsAll[0].getMatchedText(): ${sentence1WordsAll[0].getMatchedText()}`)
const sentence1End = sentences[0].getEndPunctuation()
console.log(`sentence1End: ${sentence1End}`)

console.log(`Test sentences[1].toString(): ${sentences[1].toString()}`)
