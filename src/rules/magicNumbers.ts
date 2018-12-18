import { 
	splitText, testRegex, findNumberInText, getIndexOfWordInText
} from '../utils'

export const magicNumbers = {
	rule: "magicNumbers",
	hoverMessage: () => 'Não use Magic Numbers. Crie constantes.',
	indexOfWord: (text, start) => {

		let textSlice = text.slice(start)
		let regexMagicNumber = /(\w{0,})((\s{0,}([\=]{2,}|[\\\*\-\+/\%\,\()])\s{0,})([+-]?([0-9]*[.])?[0-9]+)|([+-]?([0-9]*[.])?[0-9]+)(\s{0,}([\=]{2,}|[\\\*\-\+/\%\,\)])\s{0,}))/g
		let lines = splitText(textSlice, '\n')

		for(let i in lines){
			let line = lines[i]
			if(testRegex(line, regexMagicNumber)){
				let numberFound = findNumberInText(line)
				let indexOfWordInText = textSlice.indexOf(line)
				return {
					start: indexOfWordInText + start + numberFound.start,
					end:  indexOfWordInText + start + numberFound.end
				}
			}
		}

		return null
	}
}