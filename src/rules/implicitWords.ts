import { 
	NOT_FOUND,
	splitText, existWordInDictionary, isNumber, getIndexOfWordInText
} from '../utils'

import { METHODS_WITH_LESS_THAN_TREE_CHARACTERS } from '../dictionaryRightWords'

export const implicitWords = {
	rule: "implicitWords",
	hoverMessage: () => 'Explicito é melhor que implícito. Ex: b => batataAssada.',
	indexOfWord: (text, start) => {

		let textSlice = text.slice(start)
		let regexWord = /\W|\s/g
		let words = splitText(textSlice, regexWord)
		let MaxLengthOfImplicitWord = 3

		for(let index in words){
			let word = words[index]
			let lengthOfWord = word.length
			if(
				lengthOfWord <= MaxLengthOfImplicitWord && 
				existWordInDictionary(METHODS_WITH_LESS_THAN_TREE_CHARACTERS, word) == NOT_FOUND && 
				!isNumber(word)
			){
				/*
				* 	Arrumar o getIndexOfWordInText, só está pegando palavras isoladas. ex: i
				* 	Não usar o indexOf pois pega qualquer palavra que tenha a letra ou palavra. ex: Batata (vai pegar o index
				* de qualquer palavra que estiver iqual a ele, se fosse 'a' ele iria pegar o todos os a da palavra 'Batata')
				*/
				let indexOfWordInText = getIndexOfWordInText(textSlice, word)
				return {
					start: indexOfWordInText + start, 
					end: indexOfWordInText + start + lengthOfWord
				}
			}
		}

		return null
	}
}