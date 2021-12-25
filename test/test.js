import { expect } from 'chai'
import Parser from '../src/Parser.js'
import RegularSentence from '../src/concrete-sentences/RegularSentence.js'

describe("getSentences()", () => {
  describe("TC1_FindARegularSentence", () => {
    it('should be an array with a single RegularSentence object', () => {
      const inputStr = 'a.'

      const d = new Parser().parseDocument(inputStr)
      const s = d.getSentences() // breaking law of Demeter

      expect(s).to.be.an('array').to.have.lengthOf(1)
      expect(s[0] instanceof RegularSentence).to.be.true
    })
  })
})
