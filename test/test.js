import { expect } from 'chai'
import Parser from '../src/Parser.js'
import RegularSentence from '../src/concrete-sentences/RegularSentence.js'
import Question from '../src/concrete-sentences/Question.js'
import Exclamation from '../src/concrete-sentences/Exclamation.js'
import SyntacticError from '../src/exceptions/SyntacticError.js'
import LexicalInputError from '../src/exceptions/LexicalInputError.js'

describe('Document.getSentences()', () => {
  describe('TC1_Find_a_regular_sentence (Indata: \'a.\')', () => {
    it('Expected outcome: an array with a single RegularSentence object', () => {
      const doc = new Parser().parseDocument('a.')

      const sentences = doc.getSentences()

      expect(sentences).to.be.an('array').to.have.lengthOf(1)
      expect(sentences[0] instanceof RegularSentence).to.be.true
    })
  })

  describe('TC2_Find_a_question (Indata: \'a?\')', () => {
    it('Expected outcome: an array with a single Question object', () => {
      const doc = new Parser().parseDocument('a?')

      const sentences = doc.getSentences()

      expect(sentences).to.be.an('array').to.have.lengthOf(1)
      expect(sentences[0] instanceof Question).to.be.true
    })
  })

  describe('TC3_Find_an_exclamation (Indata: \'a!\')', () => {
    it('Expected outcome: an array with a single Exclamation object', () => {
      const doc = new Parser().parseDocument('a!')

      const sentences = doc.getSentences()

      expect(sentences).to.be.an('array').to.have.lengthOf(1)
      expect(sentences[0] instanceof Exclamation).to.be.true
    })
  })

  describe('TC4_Find_multiple_sentences_of_different_types (Indata: \'a. b? c!\')', () => {
    it('Expected outcome: an array with 3 different type objects: RegularSentence, Question and Exclamation', () => {
      const doc = new Parser().parseDocument('a. b? c!')

      const sentences = doc.getSentences()

      expect(sentences).to.be.an('array').to.have.lengthOf(3)
      expect(sentences[0] instanceof RegularSentence).to.be.true
      expect(sentences[1] instanceof Question).to.be.true
      expect(sentences[2] instanceof Exclamation).to.be.true
    })
  })

  describe('TC5_Correct_number_of_words_in_first_sentence (Indata: \'a b.\')', () => {
    it('Expected outcome: a sentence with 2 words', () => {
      const doc = new Parser().parseDocument('a b.')

      const sentences = doc.getSentences()
      const words = sentences[0].getWords()
      const wordArr = words.getAll()

      expect(wordArr).to.have.lengthOf(2)
    })
  })

  describe('TC6_Correct_number_of_words_in_second_sentence (Indata: \'a. b c.\')', () => {
    it('Expected outcome: a sentence with 2 words', () => {
      const doc = new Parser().parseDocument('a. b c.')

      const sentences = doc.getSentences()
      const words = sentences[1].getWords()
      const wordArr = words.getAll()

      expect(wordArr).to.have.lengthOf(2)
    })
  })

  describe('TC7_First_word_has_the_correct_letters (Indata: \'ab.\')', () => {
    it('Expected outcome: the word \'ab\'', () => {
      const doc = new Parser().parseDocument('ab.')

      const sentences = doc.getSentences()
      const words = sentences[0].getWords()
      const wordArr = words.getAll()
      const firstWordText = wordArr[0].getMatchedText()

      expect(firstWordText).to.equal('ab')
    })
  })

  describe('TC8_Second_word_has_the_correct_letters (Indata: \'a bc.\')', () => {
    it('Expected outcome: the word \'bc\'', () => {
      const doc = new Parser().parseDocument('a bc.')

      const sentences = doc.getSentences()
      const words = sentences[0].getWords()
      const wordArr = words.getAll()
      const secondWordText = wordArr[1].getMatchedText()

      expect(secondWordText).to.equal('bc')
    })
  })

  describe('TC9_Find_no_sentences (Indata: \'\')', () => {
    it('Expected outcome: an empty array', () => {
      const doc = new Parser().parseDocument('')

      const sentences = doc.getSentences()

      expect(sentences).to.be.an('array').to.have.lengthOf(0)
    })
  })

  describe('TC10_Get_exception_for_first_sentence_with_no_words (Indata: \'.\')', () => {
    it('Expected outcome: a SyntacticError', () => {
      expect(() => new Parser().parseDocument('.')).to.throw(SyntacticError)
    })
  })

  describe('TC11_Get_exception_for_second_sentence_with_no_words (Indata: \'a. .\')', () => {
    it('Expected outcome: a SyntacticError', () => {
      expect(() => new Parser().parseDocument('a. .')).to.throw(SyntacticError)
    })
  })

  describe('TC12_Get_exception_for_non_word_symbol (Indata: \'+.\')', () => {
    it('Expected outcome: a LexicalInputError', () => {
      expect(() => new Parser().parseDocument('+.')).to.throw(LexicalInputError)
    })
  })
})

describe('Document.getRegularSentences()', () => {
  describe('TC13_Find_a_regular_sentence_without_excluding_other_types (Indata: \'a.\')', () => {
    it('Expected outcome: an array with a single RegularSentence object', () => {
      const doc = new Parser().parseDocument('a.')

      const regSentences = doc.getRegularSentences()

      expect(regSentences).to.be.an('array').to.have.lengthOf(1)
      expect(regSentences[0] instanceof RegularSentence).to.be.true
    })
  })

  describe('TC14_Find_2_regular_sentences_without_excluding_other_types (Indata: \'a. b.\')', () => {
    it('Expected outcome: an array with 2 RegularSentence objects', () => {
      const doc = new Parser().parseDocument('a. b.')

      const regSentences = doc.getRegularSentences()

      expect(regSentences).to.be.an('array').to.have.lengthOf(2)
      regSentences.forEach(rs => {
        expect(rs instanceof RegularSentence).to.be.true
      })
    })
  })

  describe('TC15_Find_a_regular_sentence_and_exclude_other_types_after (Indata: \'a. b? c!\')', () => {
    it('Expected outcome: an array with a single RegularSentence object', () => {
      const doc = new Parser().parseDocument('a. b? c!')

      const regSentences = doc.getRegularSentences()

      expect(regSentences).to.be.an('array').to.have.lengthOf(1)
      expect(regSentences[0] instanceof RegularSentence).to.be.true
    })
  })

  describe('TC16_Find_a_regular_sentence_and_exclude_other_types_before (Indata: \'a! b? c.\')', () => {
    it('Expected outcome: an array with a single RegularSentence object', () => {
      const doc = new Parser().parseDocument('a! b? c.')

      const regSentences = doc.getRegularSentences()

      expect(regSentences).to.be.an('array').to.have.lengthOf(1)
      expect(regSentences[0] instanceof RegularSentence).to.be.true
    })
  })

  describe('TC17_Find_2_regular_sentences_and_exclude_other_types_inbetween (Indata: \'a. b? c! d.\')', () => {
    it('Expected outcome: an array with 2 RegularSentence objects', () => {
      const doc = new Parser().parseDocument('a. b? c! d.')

      const regSentences = doc.getRegularSentences()

      expect(regSentences).to.be.an('array').to.have.lengthOf(2)
      regSentences.forEach(rs => {
        expect(rs instanceof RegularSentence).to.be.true
      })
    })
  })

  describe('TC18_Find_no_regular_sentences_and_exclude_other_types (Indata: \'a? b!\')', () => {
    it('Expected outcome: an empty array', () => {
      const doc = new Parser().parseDocument('a? b!')

      const regSentences = doc.getRegularSentences()

      expect(regSentences).to.be.an('array').to.have.lengthOf(0)
    })
  })
})

describe('Document.getQuestions()', () => {
  describe('TC19_Find_a_question_without_excluding_other_types (Indata: \'a?\')', () => {
    it('Expected outcome: an array with a single Question object', () => {
      const doc = new Parser().parseDocument('a?')

      const questions = doc.getQuestions()

      expect(questions).to.be.an('array').to.have.lengthOf(1)
      expect(questions[0] instanceof Question).to.be.true
    })
  })

  describe('TC20_Find_2_questions_without_excluding_other_types (Indata: \'a? b?\')', () => {
    it('Expected outcome: an array with 2 Question objects', () => {
      const doc = new Parser().parseDocument('a? b?')

      const questions = doc.getQuestions()

      expect(questions).to.be.an('array').to.have.lengthOf(2)
      questions.forEach(q => {
        expect(q instanceof Question).to.be.true
      })
    })
  })

  describe('TC21_Find_a_question_and_exclude_other_types_After (Indata: \'a? b. c!\')', () => {
    it('Expected outcome: an array with a single Question object', () => {
      const doc = new Parser().parseDocument('a? b. c!')

      const questions = doc.getQuestions()

      expect(questions).to.be.an('array').to.have.lengthOf(1)
      expect(questions[0] instanceof Question).to.be.true
    })
  })

  describe('TC22_Find_a_question_and_exclude_other_types_before (Indata: \'a. b! c?\')', () => {
    it('Expected outcome: an array with a single Question object', () => {
      const doc = new Parser().parseDocument('a. b! c?')

      const questions = doc.getQuestions()

      expect(questions).to.be.an('array').to.have.lengthOf(1)
      expect(questions[0] instanceof Question).to.be.true
    })
  })

  describe('TC23_Find_2_questions_and_exclude_other_types_inbetween (Indata: \'a? b. c! d?\')', () => {
    it('Expected outcome: an array with 2 Question objects', () => {
      const doc = new Parser().parseDocument('a? b. c! d?')

      const questions = doc.getQuestions()

      expect(questions).to.be.an('array').to.have.lengthOf(2)
      questions.forEach(q => {
        expect(q instanceof Question).to.be.true
      })
    })
  })

  describe('TC24_Find_no_questions_and_exclude_other_types (Indata: \'a. b!\')', () => {
    it('Expected outcome: an empty array', () => {
      const doc = new Parser().parseDocument('a. b!')

      const questions = doc.getQuestions()

      expect(questions).to.be.an('array').to.have.lengthOf(0)
    })
  })
})

describe('Document.getExclamations()', () => {
  describe('TC25_Find_an_exclamation_without_excluding_other_types (Indata: \'a!\')', () => {
    it('Expected outcome: an array with a single Exclamation object', () => {
      const doc = new Parser().parseDocument('a!')

      const exclamations = doc.getExclamations()

      expect(exclamations).to.be.an('array').to.have.lengthOf(1)
      expect(exclamations[0] instanceof Exclamation).to.be.true
    })
  })

  describe('TC26_Find_2_exclamations_without_excluding_other_types (Indata: \'a! b!\')', () => {
    it('Expected outcome: an array with 2 Exclamation objects', () => {
      const doc = new Parser().parseDocument('a! b!')

      const exclamations = doc.getExclamations()

      expect(exclamations).to.be.an('array').to.have.lengthOf(2)
      exclamations.forEach(e => {
        expect(e instanceof Exclamation).to.be.true
      })
    })
  })

  describe('TC27_Find_an_exclamation_and_exclude_other_types_After (Indata: \'a! b. c?\')', () => {
    it('Expected outcome: an array with a single Exclamation object', () => {
      const doc = new Parser().parseDocument('a! b. c?')

      const exclamations = doc.getExclamations()

      expect(exclamations).to.be.an('array').to.have.lengthOf(1)
      expect(exclamations[0] instanceof Exclamation).to.be.true
    })
  })

  describe('TC28_Find_an_exclamation_and_exclude_other_types_before (Indata: \'a? b. c!\')', () => {
    it('Expected outcome: an array with a single Exclamation object', () => {
      const doc = new Parser().parseDocument('a. b? c!')

      const exclamations = doc.getExclamations()

      expect(exclamations).to.be.an('array').to.have.lengthOf(1)
      expect(exclamations[0] instanceof Exclamation).to.be.true
    })
  })

  describe('TC29_Find_2_exclamations_and_exclude_other_types_inbetween (Indata: \'a! b. c? d!\')', () => {
    it('Expected outcome: an array with 2 Exclamation objects', () => {
      const doc = new Parser().parseDocument('a! b. c? d!')

      const exclamations = doc.getExclamations()

      expect(exclamations).to.be.an('array').to.have.lengthOf(2)
      exclamations.forEach(e => {
        expect(e instanceof Exclamation).to.be.true
      })
    })
  })

  describe('TC30_Find_no_exclamations_and_exclude_other_types (Indata: \'a. b?\')', () => {
    it('Expected outcome: an empty array', () => {
      const doc = new Parser().parseDocument('a. b?')

      const exclamations = doc.getExclamations()

      expect(exclamations).to.be.an('array').to.have.lengthOf(0)
    })
  })
})
