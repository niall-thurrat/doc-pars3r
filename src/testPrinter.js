import Parser from './Parser.js'

const parser = new Parser()
let d = parser.parseDocument('+.')
const s = d.getSentences()

// console.log(`Test - s.length(): ${s.length}`)
// console.log(`Test - s[0].toString(): ${s[0].toString()}`)
// console.log(`Test - s[0].getEndPunctuation(): ${s[0].getEndPunctuation()}`)
// const s1Words = s[0].getWords()
// console.log(`Test - s1Words.toString(): ${s1Words.toString()}`)
// const s1WordsAll = s1Words.getAll()
// console.log(`Test - s1WordsAll[0].getMatchedText(): ${s1WordsAll[0].getMatchedText()}`)

// console.log(`\nTest - s[1].toString(): ${s[1].toString()}`)
// console.log(`Test - s[1].getEndPunctuation(): ${s[1].getEndPunctuation()}`)
// const s2Words = s[1].getWords()
// console.log(`Test - s2Words.toString(): ${s2Words.toString()}`)
// const s2WordsAll = s2Words.getAll()
// console.log(`Test - s2WordsAll[0].getMatchedText(): ${s2WordsAll[0].getMatchedText()}`)

// console.log(`\nTest - s[2].toString(): ${s[2].toString()}`)
// console.log(`Test - s[2].getEndPunctuation(): ${s[2].getEndPunctuation()}`)
// const s3Words = s[2].getWords()
// console.log(`Test - s3Words.toString(): ${s3Words.toString()}`)
// const s3WordsAll = s3Words.getAll()
// console.log(`Test - s3WordsAll[0].getMatchedText(): ${s3WordsAll[0].getMatchedText()}`)

// const regSentences = d.getRegularSentences()

// console.log(`\nTest - regSentences.length(): ${regSentences.length}`)
// console.log(`Test - regSentences[0].toString(): ${regSentences[0].toString()}`)

// const questions = d.getQuestions()

// console.log(`\nTest - questions.length(): ${questions.length}`)
// console.log(`Test - questions[0].toString(): ${questions[0].toString()}`)

// const exs = d.getExclamations()

// console.log(`\nTest - exs.length(): ${exs.length}`)
// console.log(`Test - exs[0].toString(): ${exs[0].toString()}`)

// d = parser.parseDocument('Goodbye world.')
// const rewrittenS = d.getSentences()

// console.log(`\nTest - rewrittenS.length(): ${rewrittenS.length}`)
// console.log(`Test - rewrittenS[0].toString(): ${rewrittenS[0].toString()}`)
// console.log(`Test - rewrittenS[0].getEndPunctuation(): ${rewrittenS[0].getEndPunctuation()}`)
// const rewrittenS1Words = rewrittenS[0].getWords()
// console.log(`Test - rewrittenS1Words.toString(): ${rewrittenS1Words.toString()}`)
// const rewrittenS1WordsAll = rewrittenS1Words.getAll()
// console.log(`Test - rewrittenS1WordsAll[0].getMatchedText(): ${rewrittenS1WordsAll[0].getMatchedText()}`)