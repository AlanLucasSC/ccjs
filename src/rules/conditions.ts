import { 
	getIfsInText, isEncapsulated, getArguments
} from '../utils'

export const conditions = {
	rule: "conditions",
	hoverMessage: () => 'Encapsule esta condicional.',
	indexOfWord: (text, start) => {

		let textSlice = text.slice(start)

		let indexOfIfs = getIfsInText(textSlice)
		for(let index in indexOfIfs){
			let indexOfIf = indexOfIfs[index]
			if( isEncapsulated(textSlice, indexOfIf) ){
				let argumentsOnIf = getArguments(textSlice, indexOfIf)
				let lengthOfText = argumentsOnIf.length
				let indexOfWordInText = textSlice.indexOf(argumentsOnIf)
				return {
					start: indexOfWordInText + start, 
					end: indexOfWordInText + start + lengthOfText
				}
			}
		}

		return null
	}
}