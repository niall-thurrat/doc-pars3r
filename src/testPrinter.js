import Parser from './Parser.js'

const parser = new Parser()
let doc = parser.parseDocument('Hello world. Hello again? Hello a third time!')
const sentences = doc.getAllSentences() // throw exception if doc not parsed yet

console.log(`Test - sentences.length(): ${sentences.length}`)
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

const regSentences = doc.getRegularSentences()

console.log(`\nTest - regSentences.length(): ${regSentences.length}`)
console.log(`Test - regSentences[0].toString(): ${regSentences[0].toString()}`)

const questions = doc.getQuestions()

console.log(`\nTest - questions.length(): ${questions.length}`)
console.log(`Test - questions[0].toString(): ${questions[0].toString()}`)

const exs = doc.getExclamations()

console.log(`\nTest - exs.length(): ${exs.length}`)
console.log(`Test - exs[0].toString(): ${exs[0].toString()}`)

doc = parser.parseDocument('Goodbye world.')
const rewrittenSentences = doc.getAllSentences()

console.log(`\nTest - rewrittenSentences.length(): ${rewrittenSentences.length}`)
console.log(`Test - rewrittenSentences[0].toString(): ${rewrittenSentences[0].toString()}`)
console.log(`Test - rewrittenSentences[0].getEndPunctuation(): ${rewrittenSentences[0].getEndPunctuation()}`)
const rewrittenSentence1Words = rewrittenSentences[0].getWords()
console.log(`Test - rewrittenSentence1Words.toString(): ${rewrittenSentence1Words.toString()}`)
const rewrittenSentence1WordsAll = rewrittenSentence1Words.getAll()
console.log(`Test - rewrittenSentence1WordsAll[0].getMatchedText(): ${rewrittenSentence1WordsAll[0].getMatchedText()}`)