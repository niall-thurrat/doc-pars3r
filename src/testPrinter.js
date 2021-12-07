import Document from './Document.js'

const doc = new Document()
doc.parse('Hello world. Hello again? Hello a third time!')
const sentences = doc.getAllSentences()

console.log(`Test - sentences[0].toString(): ${sentences[0].toString()}`)
console.log(`Test - sentences[0].getEndPunctuation(): ${sentences[0].getEndPunctuation()}`)
const sentence1Words = sentences[0].getWords()
console.log(`Test - sentence1Words.toString(): ${sentence1Words.toString()}`)
const sentence1WordsAll = sentence1Words.getAll()
console.log(`Test - sentence1WordsAll[0].getMatchedText(): ${sentence1WordsAll[0].getMatchedText()}`)

console.log(`\nTest - sentences[1].toString(): ${sentences[1].toString()}`)
console.log(`Test - sentences[1].getEndPunctuation(): ${sentences[1].getEndPunctuation()}`)
const sentence2Words = sentences[1].getWords()
console.log(`Test - sentence2Words.toString(): ${sentence2Words.toString()}`)
const sentence2WordsAll = sentence2Words.getAll()
console.log(`Test - sentence2WordsAll[0].getMatchedText(): ${sentence2WordsAll[0].getMatchedText()}`)

console.log(`\nTest - sentences[2].toString(): ${sentences[2].toString()}`)
console.log(`Test - sentences[2].getEndPunctuation(): ${sentences[2].getEndPunctuation()}`)
const sentence3Words = sentences[2].getWords()
console.log(`Test - sentence3Words.toString(): ${sentence3Words.toString()}`)
const sentence3WordsAll = sentence3Words.getAll()
console.log(`Test - sentence3WordsAll[0].getMatchedText(): ${sentence3WordsAll[0].getMatchedText()}`)
