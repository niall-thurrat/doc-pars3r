import { expect } from 'chai'
import Parser from '../src/Parser.js'
import RegularSentence from '../src/concrete-sentences/RegularSentence.js'
import Question from '../src/concrete-sentences/Question.js'
import Exclamation from '../src/concrete-sentences/Exclamation.js'

describe("Document.getSentences()", () => {
  describe("TC1_Find_a_regular_sentence", () => {
    it('should be an array with a single RegularSentence object', () => {
      const inputStr = 'a.'

      const d = new Parser().parseDocument(inputStr)
      const s = d.getSentences() // breaking law of Demeter

      expect(s).to.be.an('array').to.have.lengthOf(1)
      expect(s[0] instanceof RegularSentence).to.be.true
    })
  })

  describe("TC2_Find_a_question", () => {
    it('should be an array with a single Question object', () => {
      const inputStr = 'a?'

      const d = new Parser().parseDocument(inputStr)
      const s = d.getSentences() // breaking law of Demeter

      expect(s).to.be.an('array').to.have.lengthOf(1)
      expect(s[0] instanceof Question).to.be.true
    })
  })

  describe("TC3_Find_an_exclamation", () => {
    it('should be an array with a single Exclamation object', () => {
      const inputStr = 'a!'

      const d = new Parser().parseDocument(inputStr)
      const s = d.getSentences() // breaking law of Demeter

      expect(s).to.be.an('array').to.have.lengthOf(1)
      expect(s[0] instanceof Exclamation).to.be.true
    })
  })

  describe("TC4_Find_multiple_sentences_of_different_types", () => {
    it('should be an array with 3 different type objects: RegularSentence, Question and Exclamation', () => {
      const inputStr = 'a. b? c!'

      const d = new Parser().parseDocument(inputStr)
      const s = d.getSentences() // breaking law of Demeter

      expect(s).to.be.an('array').to.have.lengthOf(3)
      expect(s[0] instanceof RegularSentence).to.be.true
      expect(s[1] instanceof Question).to.be.true
      expect(s[2] instanceof Exclamation).to.be.true
    })
  })

  describe("TC5_Correct_number_of_words_in_first_sentence", () => {
    it('should be a sentence with 2 words', () => {
      const inputStr = 'a b.'

      const d = new Parser().parseDocument(inputStr)
      const s = d.getSentences() // breaking law of Demeter
      const w = s[0].getWords() // breaking law of Demeter again
      const wordArr = w.getAll() // and again. Seriously consider cleaner names here!

      expect(wordArr).to.have.lengthOf(2)
    })
  })

  describe("TC6_Correct_number_of_words_in_second_sentence", () => {
    it('should be a sentence with 2 words', () => {
      const inputStr = 'a. b c.'

      const d = new Parser().parseDocument(inputStr)
      const s = d.getSentences() // breaking law of Demeter
      const w = s[1].getWords() // breaking law of Demeter again
      const wordArr = w.getAll() // and again. Seriously consider cleaner names here!

      expect(wordArr).to.have.lengthOf(2)
    })
  })

  describe("TC7_First_word_has_the_correct_letters", () => {
    it('should be the word \'ab\'', () => {
      const inputStr = 'ab.'

      const d = new Parser().parseDocument(inputStr)
      const s = d.getSentences() // breaking law of Demeter
      const w = s[0].getWords() // breaking law of Demeter again
      const wordArr = w.getAll() // and again. Seriously consider cleaner names here!
      const firstWordText = wordArr[0].getMatchedText()

      expect(firstWordText).to.equal('ab')
    })
  })

  describe("TC8_Second_word_has_the_correct_letters", () => {
    it('should be the word \'bc\'', () => {
      const inputStr = 'a bc.'

      const d = new Parser().parseDocument(inputStr)
      const s = d.getSentences() // breaking law of Demeter
      const w = s[0].getWords() // breaking law of Demeter again
      const wordArr = w.getAll() // and again. Seriously consider cleaner names here!
      const secondWordText = wordArr[1].getMatchedText()

      expect(secondWordText).to.equal('bc')
    })
  })
})

describe("Document.getRegularSentences()", () => {
  describe("TC9_Find_a_regular_sentence_without_excluding_other_types", () => {
    it('should be an array with a single RegularSentence object', () => {
      const inputStr = 'a.'

      const d = new Parser().parseDocument(inputStr)
      const rs = d.getRegularSentences() // breaking law of Demeter

      expect(rs).to.be.an('array').to.have.lengthOf(1)
      expect(rs[0] instanceof RegularSentence).to.be.true
    })
  })
  
  describe("TC10_Find_2_regular_sentences_without_excluding_other_types", () => {
    it('should be an array with 2 RegularSentence objects', () => {
      const inputStr = 'a. b.'

      const d = new Parser().parseDocument(inputStr)
      const rs = d.getRegularSentences() // breaking law of Demeter

      expect(rs).to.be.an('array').to.have.lengthOf(2)
      rs.forEach((s, index) => {
        expect(
          s instanceof RegularSentence, 
          `s[${index}] is not a RegularSentence`
        ).to.be.true
      })
    })
  })

  describe("TC11_Find_a_regular_sentence_and_exclude_other_types_after", () => {
    it('should be an array with a single RegularSentence object', () => {
      const inputStr = 'a. b? c!'

      const d = new Parser().parseDocument(inputStr)
      const rs = d.getRegularSentences() // breaking law of Demeter

      expect(rs).to.be.an('array').to.have.lengthOf(1)
      expect(rs[0] instanceof RegularSentence).to.be.true
    })
  })

  describe("TC12_Find_a_regular_sentence_and_exclude_other_types_before", () => {
    it('should be an array with a single RegularSentence object', () => {
      const inputStr = 'a! b? c.'

      const d = new Parser().parseDocument(inputStr)
      const rs = d.getRegularSentences() // breaking law of Demeter

      expect(rs).to.be.an('array').to.have.lengthOf(1)
      expect(rs[0] instanceof RegularSentence).to.be.true
    })
  })

  describe("TC13_Find_2_regular_sentences_and_exclude_other_types_inbetween", () => {
    it('should be an array with 2 RegularSentence objects', () => {
      const inputStr = 'a. b? c! d.'

      const d = new Parser().parseDocument(inputStr)
      const rs = d.getRegularSentences() // breaking law of Demeter

      expect(rs).to.be.an('array').to.have.lengthOf(2)
      rs.forEach((s, index) => {
        expect(
          s instanceof RegularSentence, 
          `s[${index}] is not a RegularSentence`
        ).to.be.true
      })
    })
  })

  describe("TC14_Find_no_regular_sentences_and_exclude_other_types", () => {
    it('should be an empty array', () => {
      const inputStr = 'a? b!'

      const d = new Parser().parseDocument(inputStr)
      const rs = d.getRegularSentences() // breaking law of Demeter

      expect(rs).to.be.an('array').to.have.lengthOf(0)
    })
  })
})

describe("Document.getQuestions()", () => {
  describe("TC15_Find_a_question_without_excluding_other_types", () => {
    it('should be an array with a single Question object', () => {
      const inputStr = 'a?'

      const d = new Parser().parseDocument(inputStr)
      const rs = d.getQuestions() // breaking law of Demeter

      expect(rs).to.be.an('array').to.have.lengthOf(1)
      expect(rs[0] instanceof Question).to.be.true
    })
  })
  
  describe("TC16_Find_2_questions_without_excluding_other_types", () => {
    it('should be an array with 2 Question objects', () => {
      const inputStr = 'a? b?'

      const d = new Parser().parseDocument(inputStr)
      const rs = d.getQuestions() // breaking law of Demeter

      expect(rs).to.be.an('array').to.have.lengthOf(2)
      rs.forEach((s, index) => {
        expect(
          s instanceof Question, 
          `s[${index}] is not a Question`
        ).to.be.true
      })
    })
  })

  describe("TC17_Find_a_question_and_exclude_other_types_After", () => {
    it('should be an array with a single Question object', () => {
      const inputStr = 'a? b. c!'

      const d = new Parser().parseDocument(inputStr)
      const rs = d.getQuestions() // breaking law of Demeter

      expect(rs).to.be.an('array').to.have.lengthOf(1)
      expect(rs[0] instanceof Question).to.be.true
    })
  })

  describe("TC18_Find_a_question_and_exclude_other_types_before", () => {
    it('should be an array with a single Question object', () => {
      const inputStr = 'a? b. c!'

      const d = new Parser().parseDocument(inputStr)
      const rs = d.getQuestions() // breaking law of Demeter

      expect(rs).to.be.an('array').to.have.lengthOf(1)
      expect(rs[0] instanceof Question).to.be.true
    })
  })

  describe("TC19_Find_2_questions_and_exclude_other_types_inbetween", () => {
    it('should be an array with 2 Question objects', () => {
      const inputStr = 'a? b. c! d?'

      const d = new Parser().parseDocument(inputStr)
      const rs = d.getQuestions() // breaking law of Demeter

      expect(rs).to.be.an('array').to.have.lengthOf(2)
      rs.forEach((s, index) => {
        expect(
          s instanceof Question, 
          `s[${index}] is not a Question`
        ).to.be.true
      })
    })
  })

  describe("TC20_Find_no_questions_and_exclude_other_types", () => {
    it('should be an empty array', () => {
      const inputStr = 'a. b!'

      const d = new Parser().parseDocument(inputStr)
      const rs = d.getQuestions() // breaking law of Demeter

      expect(rs).to.be.an('array').to.have.lengthOf(0)
    })
  })
})

describe("Document.getExclamations()", () => {
  describe("TC15_Find_an_exclamation_without_excluding_other_types", () => {
    it('should be an array with a single Exclamation object', () => {
      const inputStr = 'a!'

      const d = new Parser().parseDocument(inputStr)
      const rs = d.getExclamations() // breaking law of Demeter

      expect(rs).to.be.an('array').to.have.lengthOf(1)
      expect(rs[0] instanceof Exclamation).to.be.true
    })
  })
  
  describe("TC16_Find_2_exclamations_without_excluding_other_types", () => {
    it('should be an array with 2 Exclamation objects', () => {
      const inputStr = 'a! b!'

      const d = new Parser().parseDocument(inputStr)
      const rs = d.getExclamations() // breaking law of Demeter

      expect(rs).to.be.an('array').to.have.lengthOf(2)
      rs.forEach((s, index) => {
        expect(
          s instanceof Exclamation, 
          `s[${index}] is not a Exclamation`
        ).to.be.true
      })
    })
  })

  describe("TC17_Find_an_exclamation_and_exclude_other_types_After", () => {
    it('should be an array with a single Exclamation object', () => {
      const inputStr = 'a! b. c?'

      const d = new Parser().parseDocument(inputStr)
      const rs = d.getExclamations() // breaking law of Demeter

      expect(rs).to.be.an('array').to.have.lengthOf(1)
      expect(rs[0] instanceof Exclamation).to.be.true
    })
  })

  describe("TC18_Find_an_exclamation_and_exclude_other_types_before", () => {
    it('should be an array with a single Exclamation object', () => {
      const inputStr = 'a! b. c?'

      const d = new Parser().parseDocument(inputStr)
      const rs = d.getExclamations() // breaking law of Demeter

      expect(rs).to.be.an('array').to.have.lengthOf(1)
      expect(rs[0] instanceof Exclamation).to.be.true
    })
  })

  describe("TC19_Find_2_exclamations_and_exclude_other_types_inbetween", () => {
    it('should be an array with 2 Exclamation objects', () => {
      const inputStr = 'a! b. c? d!'

      const d = new Parser().parseDocument(inputStr)
      const rs = d.getExclamations() // breaking law of Demeter

      expect(rs).to.be.an('array').to.have.lengthOf(2)
      rs.forEach((s, index) => {
        expect(
          s instanceof Exclamation, 
          `s[${index}] is not a Exclamation`
        ).to.be.true
      })
    })
  })

  describe("TC20_Find_no_exclamations_and_exclude_other_types", () => {
    it('should be an empty array', () => {
      const inputStr = 'a. b?'

      const d = new Parser().parseDocument(inputStr)
      const rs = d.getExclamations() // breaking law of Demeter

      expect(rs).to.be.an('array').to.have.lengthOf(0)
    })
  })
})