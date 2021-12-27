import { expect } from 'chai'
import Parser from '../src/Parser.js'
import RegularSentence from '../src/concrete-sentences/RegularSentence.js'
import Question from '../src/concrete-sentences/Question.js'
import Exclamation from '../src/concrete-sentences/Exclamation.js'
import SyntacticError from '../src/exceptions/SyntacticError.js'

describe("Document.getSentences()", () => {
  describe("TC1_Find_a_regular_sentence", () => {
    it('should be an array with a single RegularSentence object', () => {
      const doc = new Parser().parseDocument('a.')

      const sentences = doc.getSentences()

      expect(sentences).to.be.an('array').to.have.lengthOf(1)
      expect(sentences[0] instanceof RegularSentence).to.be.true
    })
  })

  describe("TC2_Find_a_question", () => {
    it('should be an array with a single Question object', () => {
      const doc = new Parser().parseDocument('a?')

      const sentences = doc.getSentences()

      expect(sentences).to.be.an('array').to.have.lengthOf(1)
      expect(sentences[0] instanceof Question).to.be.true
    })
  })

  describe("TC3_Find_an_exclamation", () => {
    it('should be an array with a single Exclamation object', () => {
      const doc = new Parser().parseDocument('a!')

      const sentences = doc.getSentences()

      expect(sentences).to.be.an('array').to.have.lengthOf(1)
      expect(sentences[0] instanceof Exclamation).to.be.true
    })
  })

  describe("TC4_Find_multiple_sentences_of_different_types", () => {
    it('should be an array with 3 different type objects: RegularSentence, Question and Exclamation', () => {
      const doc = new Parser().parseDocument('a. b? c!')

      const sentences = doc.getSentences()

      expect(sentences).to.be.an('array').to.have.lengthOf(3)
      expect(sentences[0] instanceof RegularSentence).to.be.true
      expect(sentences[1] instanceof Question).to.be.true
      expect(sentences[2] instanceof Exclamation).to.be.true
    })
  })

  describe("TC5_Correct_number_of_words_in_first_sentence", () => {
    it('should be a sentence with 2 words', () => {
      const doc = new Parser().parseDocument('a b.')

      const sentences = doc.getSentences()
      const words = sentences[0].getWords()
      const wordArr = words.getAll()

      expect(wordArr).to.have.lengthOf(2)
    })
  })

  describe("TC6_Correct_number_of_words_in_second_sentence", () => {
    it('should be a sentence with 2 words', () => {
      const doc = new Parser().parseDocument('a. b c.')

      const sentences = doc.getSentences()
      const words = sentences[1].getWords()
      const wordArr = words.getAll()

      expect(wordArr).to.have.lengthOf(2)
    })
  })

  describe("TC7_First_word_has_the_correct_letters", () => {
    it('should be the word \'ab\'', () => {
      const doc = new Parser().parseDocument('ab.')

      const sentences = doc.getSentences()
      const words = sentences[0].getWords()
      const wordArr = words.getAll()
      const firstWordText = wordArr[0].getMatchedText()

      expect(firstWordText).to.equal('ab')
    })
  })

  describe("TC8_Second_word_has_the_correct_letters", () => {
    it('should be the word \'bc\'', () => {
      const doc = new Parser().parseDocument('a bc.')

      const sentences = doc.getSentences()
      const words = sentences[0].getWords()
      const wordArr = words.getAll()
      const secondWordText = wordArr[1].getMatchedText()

      expect(secondWordText).to.equal('bc')
    })
  })

  describe("TCX_Find_no_sentences", () => {
    it('should be an empty array', () => {
      const doc = new Parser().parseDocument('')

      const sentences = doc.getSentences()

      expect(sentences).to.be.an('array').to.have.lengthOf(0)
    })
  })

  describe("TCX_Get_exception_for_first_sentence_with_no_words", () => {
    it('should be a SyntacticError', () => {
      expect(() => new Parser().parseDocument('.')).to.throw(SyntacticError)
    })
  })

  describe("TCX_Get_exception_for_second_sentence_with_no_words", () => {
    it('should be a SyntacticError', () => {
      expect(() => new Parser().parseDocument('a. .')).to.throw(SyntacticError)
    })
  })
})

describe("Document.getRegularSentences()", () => {
  describe("TC9_Find_a_regular_sentence_without_excluding_other_types", () => {
    it('should be an array with a single RegularSentence object', () => {
      const doc = new Parser().parseDocument('a.')

      const regSentences = doc.getRegularSentences()

      expect(regSentences).to.be.an('array').to.have.lengthOf(1)
      expect(regSentences[0] instanceof RegularSentence).to.be.true
    })
  })
  
  describe("TC10_Find_2_regular_sentences_without_excluding_other_types", () => {
    it('should be an array with 2 RegularSentence objects', () => {
      const doc = new Parser().parseDocument('a. b.')

      const regSentences = doc.getRegularSentences()

      expect(regSentences).to.be.an('array').to.have.lengthOf(2)
      regSentences.forEach(rs => {
        expect(rs instanceof RegularSentence).to.be.true
      })
    })
  })

  describe("TC11_Find_a_regular_sentence_and_exclude_other_types_after", () => {
    it('should be an array with a single RegularSentence object', () => {
      const doc = new Parser().parseDocument('a. b? c!')

      const regSentences = doc.getRegularSentences()

      expect(regSentences).to.be.an('array').to.have.lengthOf(1)
      expect(regSentences[0] instanceof RegularSentence).to.be.true
    })
  })

  describe("TC12_Find_a_regular_sentence_and_exclude_other_types_before", () => {
    it('should be an array with a single RegularSentence object', () => {
      const doc = new Parser().parseDocument('a! b? c.')

      const regSentences = doc.getRegularSentences()

      expect(regSentences).to.be.an('array').to.have.lengthOf(1)
      expect(regSentences[0] instanceof RegularSentence).to.be.true
    })
  })

  describe("TC13_Find_2_regular_sentences_and_exclude_other_types_inbetween", () => {
    it('should be an array with 2 RegularSentence objects', () => {
      const doc = new Parser().parseDocument('a. b? c! d.')

      const regSentences = doc.getRegularSentences()

      expect(regSentences).to.be.an('array').to.have.lengthOf(2)
      regSentences.forEach(rs => {
        expect(rs instanceof RegularSentence).to.be.true
      })
    })
  })

  describe("TC14_Find_no_regular_sentences_and_exclude_other_types", () => {
    it('should be an empty array', () => {
      const doc = new Parser().parseDocument('a? b!')

      const regSentences = doc.getRegularSentences()

      expect(regSentences).to.be.an('array').to.have.lengthOf(0)
    })
  })
})

describe("Document.getQuestions()", () => {
  describe("TC15_Find_a_question_without_excluding_other_types", () => {
    it('should be an array with a single Question object', () => {
      const doc = new Parser().parseDocument('a?')

      const questions = doc.getQuestions()

      expect(questions).to.be.an('array').to.have.lengthOf(1)
      expect(questions[0] instanceof Question).to.be.true
    })
  })
  
  describe("TC16_Find_2_questions_without_excluding_other_types", () => {
    it('should be an array with 2 Question objects', () => {
      const doc = new Parser().parseDocument('a? b?')

      const questions = doc.getQuestions()

      expect(questions).to.be.an('array').to.have.lengthOf(2)
      questions.forEach(q => {
        expect(q instanceof Question).to.be.true
      })
    })
  })

  describe("TC17_Find_a_question_and_exclude_other_types_After", () => {
    it('should be an array with a single Question object', () => {
      const doc = new Parser().parseDocument('a? b. c!')

      const questions = doc.getQuestions()

      expect(questions).to.be.an('array').to.have.lengthOf(1)
      expect(questions[0] instanceof Question).to.be.true
    })
  })

  describe("TC18_Find_a_question_and_exclude_other_types_before", () => {
    it('should be an array with a single Question object', () => {
      const doc = new Parser().parseDocument('a? b. c!')

      const questions = doc.getQuestions()

      expect(questions).to.be.an('array').to.have.lengthOf(1)
      expect(questions[0] instanceof Question).to.be.true
    })
  })

  describe("TC19_Find_2_questions_and_exclude_other_types_inbetween", () => {
    it('should be an array with 2 Question objects', () => {
      const doc = new Parser().parseDocument('a? b. c! d?')

      const questions = doc.getQuestions()

      expect(questions).to.be.an('array').to.have.lengthOf(2)
      questions.forEach(q => {
        expect(q instanceof Question).to.be.true
      })
    })
  })

  describe("TC20_Find_no_questions_and_exclude_other_types", () => {
    it('should be an empty array', () => {
      const doc = new Parser().parseDocument('a. b!')

      const questions = doc.getQuestions()

      expect(questions).to.be.an('array').to.have.lengthOf(0)
    })
  })
})

describe("Document.getExclamations()", () => {
  describe("TC15_Find_an_exclamation_without_excluding_other_types", () => {
    it('should be an array with a single Exclamation object', () => {
      const doc = new Parser().parseDocument('a!')

      const exclamations = doc.getExclamations()

      expect(exclamations).to.be.an('array').to.have.lengthOf(1)
      expect(exclamations[0] instanceof Exclamation).to.be.true
    })
  })
  
  describe("TC16_Find_2_exclamations_without_excluding_other_types", () => {
    it('should be an array with 2 Exclamation objects', () => {
      const doc = new Parser().parseDocument('a! b!')

      const exclamations = doc.getExclamations()

      expect(exclamations).to.be.an('array').to.have.lengthOf(2)
      exclamations.forEach(e => {
        expect(e instanceof Exclamation).to.be.true
      })
    })
  })

  describe("TC17_Find_an_exclamation_and_exclude_other_types_After", () => {
    it('should be an array with a single Exclamation object', () => {
      const doc = new Parser().parseDocument('a! b. c?')

      const exclamations = doc.getExclamations()

      expect(exclamations).to.be.an('array').to.have.lengthOf(1)
      expect(exclamations[0] instanceof Exclamation).to.be.true
    })
  })

  describe("TC18_Find_an_exclamation_and_exclude_other_types_before", () => {
    it('should be an array with a single Exclamation object', () => {
      const doc = new Parser().parseDocument('a! b. c?')

      const exclamations = doc.getExclamations()

      expect(exclamations).to.be.an('array').to.have.lengthOf(1)
      expect(exclamations[0] instanceof Exclamation).to.be.true
    })
  })

  describe("TC19_Find_2_exclamations_and_exclude_other_types_inbetween", () => {
    it('should be an array with 2 Exclamation objects', () => {
      const doc = new Parser().parseDocument('a! b. c? d!')

      const exclamations = doc.getExclamations()

      expect(exclamations).to.be.an('array').to.have.lengthOf(2)
      exclamations.forEach(e => {
        expect(e instanceof Exclamation).to.be.true
      })
    })
  })

  describe("TC20_Find_no_exclamations_and_exclude_other_types", () => {
    it('should be an empty array', () => {
      const doc = new Parser().parseDocument('a. b?')

      const exclamations = doc.getExclamations()

      expect(exclamations).to.be.an('array').to.have.lengthOf(0)
    })
  })
})
