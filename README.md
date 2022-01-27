# Doc-pars3r

A module that parses text documents!!!

## What is a Document Parser?

A parser is used to analyse the various parts of a language or data structure. Doc-pars3r uses Tokenis3r to break an input text into tokens (words and closing punctuations), then builds a document from these that consists of various sentence types.

Note: Doc-pars3r is very much a work in progress and at present only parses 3 different sentence types: regular sentences, questions and exclamations. It requires further work to handle other aspects of written documents, such as mid-sentence punctuation, paragraphs, titles, etc. It is for this reason that the module has not been published to npm.

## How does Doc-pars3r work?

The Doc-pars3r module provides a Parser class through its interface. To use the module, simply create a parser instance and call the parseDocument(inputStr) method.

Doc-pars3r is dependent on Tokeniz3r. It generates a tokenizer object internally, passing your input string and it's own grammar rules as arguments, then utilizes the various tokens generated to assemble a tree-like map of objects with syntactic meaning, starting with a document, which contains sentences, which in turn consist of words and sentence end types.

## Prerequisites

- Node.js [installed](https://nodejs.org/en/download/)
- NPM installed (this comes with node.js)

## Using Doc-pars3r

1. Clone the Doc-pars3r repository to your local machine.

```
git clone git@gitlab.lnu.se:1dv610/student/nt222fc/l2.git
```

2. Install npm dependencies from the root directory

```
npm install
```

3. Make your Doc-pars3r module available to link locally to other projects as a dependency. Run the following command from the root of your Doc-pars3r module:
```
npm link
```

NOTE: Steps 3 and 4 here are required because doc-pars3r is under development and is not published to npm. THEREFORE, DOC-PARS3R SHOULD NOT AT PRESENT BE USED IN A PRODUCTION ENVIRONMENT.

4. Link Doc-pars3r locally to your own npm project. Run the following command from the root of your project:
```
npm link doc-pars3r
```

5. Import Doc-pars3r to your desired Node.js project.

```javascript
import Parser from 'doc-pars3r'
```

6. Use a Doc-pars3r instance to generate a parsed document.

```javascript
const parser = new Parser()
const inputStr = 'One sentence. Two sentences? Three sentences!'
const doc = parser.parseDocument(inputStr)
```

## Doc-pars3r's public interface

### Parser

A Parser class is exposed through the public interface. It has one public method that returns a Document object:

- parseDocument(inputStr)

### Document

The Document object has four public methods:

- getSentences() - returns an array of all Sentence type objects.
- getRegularSentences() - returns an array of all RegularSentence objects.
- getQuestions() - returns an array of all Question objects.
- getExclamations() - returns an array of all Exclamation objects.

Sentences are always returned in the order they were found in the input string.

### Sentence

Sentence type objects (RegularSentence, Question and Exclamation) have three public methods:

- getWords() - returns a Words collection class
- getEndPunctuation() - returns the closing punctuation as a string
- toString() - returns the sentence as a string

### Words

This object has two public methods:

- getAll() - returns an array of Word objects
- toString() - returns a string of words seperated by single spaces and with no trailing space.

### Word

This object has one public method:

- getMatchedText() - returns a string of characters that have matched the WORD grammar rule.

## Example use

```javascript
import Parser from 'doc-pars3r'

const parser = new Parser()
const inputStr = 'One sentence. Two sentences? Three sentences!'
const doc = parser.parseDocument(inputStr)

const sentencesArr = doc.getSentences()

console.log(`Number of all sentences: ${sentencesArr.length}`)
console.log(`First sentence words: ${sentencesArr[0].getWords()}`)
console.log(`First sentence closing punctuation: ${sentencesArr[0].getEndPunctuation()}`)
console.log(`First sentence: ${sentencesArr[0].toString()}`)

const sentence3WordsObj = sentencesArr[2].getWords()
const wordsArr = sentence3WordsObj.getAll()

console.log(`First word of third sentence: ${wordsArr[0].getMatchedText()}`)

const questionsArr = doc.getQuestions()

console.log(`First question: ${questionsArr[0].toString()}`)

// Number of all sentences: 3
// First sentence words: One sentence
// First sentence closing punctuation: .
// First sentence: One sentence.
// First word of third sentence: Three
// First question: Two sentences?
```

## How to test Doc-Pars3r

When you have completed steps 1 and 2 under *Using Doc-pars3r* above, use the following command to run the mocha test suite:

```
npm test
```
