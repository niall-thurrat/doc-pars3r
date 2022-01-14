# Doc-pars3r

A module that parses text documents!!!

## What is a Document Parser?

A parser is used to give syntactic meaning to the various parts of a language. Doc-pars3r uses Tokenis3r to break an input text into tokens (words and closing punctuations), then builds a document from these that consists of various sentence types.

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

3. Import Doc-pars3r to your desired Node.js project.

```javascript
import Parser from 'doc-pars3r'
```

4. Use a Doc-pars3r instance to generate a parsed document.

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
