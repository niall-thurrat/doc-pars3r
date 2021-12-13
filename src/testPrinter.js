import Parser from './Parser.js'

const parser = new Parser()
let d = parser.parseDocument('Hello world. Hello again? Hello a third time!')
const s = d.getSentences() // throw exception if doc not parsed yet
const allSentences = s.getAll()

console.log(`Test - allSentences.length(): ${allSentences.length}`)
console.log(`Test - allSentences[0].toString(): ${allSentences[0].toString()}`)
console.log(`Test - allSentences[0].getEndPunctuation(): ${allSentences[0].getEndPunctuation()}`)
const sentence1Words = allSentences[0].getWords()
console.log(`Test - sentence1Words.toString(): ${sentence1Words.toString()}`)
const sentence1WordsAll = sentence1Words.getAll()
console.log(`Test - sentence1WordsAll[0].getMatchedText(): ${sentence1WordsAll[0].getMatchedText()}`)

console.log(`\nTest - allSentences[1].toString(): ${allSentences[1].toString()}`)
console.log(`Test - allSentences[1].getEndPunctuation(): ${allSentences[1].getEndPunctuation()}`)
const sentence2Words = allSentences[1].getWords()
console.log(`Test - sentence2Words.toString(): ${sentence2Words.toString()}`)
const sentence2WordsAll = sentence2Words.getAll()
console.log(`Test - sentence2WordsAll[0].getMatchedText(): ${sentence2WordsAll[0].getMatchedText()}`)

console.log(`\nTest - allSentences[2].toString(): ${allSentences[2].toString()}`)
console.log(`Test - allSentences[2].getEndPunctuation(): ${allSentences[2].getEndPunctuation()}`)
const sentence3Words = allSentences[2].getWords()
console.log(`Test - sentence3Words.toString(): ${sentence3Words.toString()}`)
const sentence3WordsAll = sentence3Words.getAll()
console.log(`Test - sentence3WordsAll[0].getMatchedText(): ${sentence3WordsAll[0].getMatchedText()}`)

const regSentences = s.getRegularSentences()

console.log(`\nTest - regSentences.length(): ${regSentences.length}`)
console.log(`Test - regSentences[0].toString(): ${regSentences[0].toString()}`)

const questions = s.getQuestions()

console.log(`\nTest - questions.length(): ${questions.length}`)
console.log(`Test - questions[0].toString(): ${questions[0].toString()}`)

const exs = s.getExclamations()

console.log(`\nTest - exs.length(): ${exs.length}`)
console.log(`Test - exs[0].toString(): ${exs[0].toString()}`)

d = parser.parseDocument('Goodbye world.')
const rewrittenSentences = d.getSentences()
const allRS = rewrittenSentences.getAll()

console.log(`\nTest - allRS.length(): ${allRS.length}`)
console.log(`Test - allRS[0].toString(): ${allRS[0].toString()}`)
console.log(`Test - allRS[0].getEndPunctuation(): ${allRS[0].getEndPunctuation()}`)
const allRS1Words =allRS[0].getWords()
console.log(`Test - allRS1Words.toString(): ${allRS1Words.toString()}`)
const allRS1WordsAll = allRS1Words.getAll()
console.log(`Test - allRS1WordsAll[0].getMatchedText(): ${allRS1WordsAll[0].getMatchedText()}`)