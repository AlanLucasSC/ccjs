import { 
	NOT_FOUND, 
	testRegex, existWordInDictionary, textToTinyWords, isNumber
} from '../utils'

import { IGNORE_WORDS } from '../dictionaryRightWords'

export const wrongNames = {
	rule: "wrongNames",
	hoverMessage: () => 'Não pode nomes abreviados.',
	indexOfWord: (text, start) => {

		let textSlice = text.slice(start)
		let regexWord = /\W|\s/
		let words = textToTinyWords(textSlice, regexWord)
		let regexAbbreviatedWord = /(?:[^aeiouy{}\(\)\s]{4,})/g

		for(let i in words){
			let word = words[i]
			if(
				testRegex(word, regexAbbreviatedWord) 
				&& existWordInDictionary(IGNORE_WORDS, word) == NOT_FOUND
				&& !isNumber(word)
			){
				let textSliceInLowerCase = textSlice.toLowerCase()
				let lengthOfWord = word.length
				let indexOfWordInText = textSliceInLowerCase.indexOf(word)
				return {
					start: indexOfWordInText + start, 
					end: indexOfWordInText + start + lengthOfWord
				}
			}
		}

		return null
	}
}