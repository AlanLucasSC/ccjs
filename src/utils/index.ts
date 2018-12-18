export const NOT_FOUND = -1;

export const NO_EXIST = undefined;

export const existWordInDictionary = (dictionary, word) => {
	return dictionary.indexOf(word)
}

export const getIndexOfWordInText = (text, word) => {
	let regex = new RegExp("\\b"+word+"\\b", "g")
	return regexMatch(text, regex).index
}

export const isNumber = (word) => {
	let regexNumber = /[a-zA-z]/g
	return !testRegex(word, regexNumber)
}

export const findNumberInText = (text) => {
	let startIndexOfNumber, endIndexOfNumber = text.length - 1
	let regexNumber = /[0-9]/ 
	for(let index in text){
		let character = text[index]
		let nextCharacter = text[index + 1]
		if(startIndexOfNumber == NO_EXIST && testRegex(character, regexNumber)){
			startIndexOfNumber = parseInt(index)
		} else if(
				endIndexOfNumber == parseInt(index) 
				&&
				(
					testRegex(nextCharacter, regexNumber)
					||
					nextCharacter == NO_EXIST
				)
			){
			endIndexOfNumber = parseInt(index)
			return {
				start: startIndexOfNumber,
				end: endIndexOfNumber
			}
		}
	}
}

export const testRegex = (text, regex) => {
	return regex.test(text) 
}

export const regexMatch = (text, regex) => {
	return regex.exec(text)
}

export const splitText = (text, condition) => {
	let words = text.split(condition), index
	while( (index = words.indexOf("")) != -1 )
		words.splice(index, 1)
	return words
}

export const splitCamenCaseTextInTinyWords = (text, regex) => {
	let startIndexOfWord = 0, endIndexOfWord = text.length, matchWord, words = [] 

	while ((matchWord = regexMatch(text, regex)) != NO_EXIST) {
		let lastIndexOfMatchWord = matchWord.index + 1
		words.push(
			text.slice(startIndexOfWord, lastIndexOfMatchWord).toLowerCase()
		)
		startIndexOfWord = lastIndexOfMatchWord
	}
	words.push(
		text.slice(startIndexOfWord, endIndexOfWord).toLowerCase()
	)
	return words
}

export const textToTinyWords = (text, regex) => {
	let words = text.split(regex), index
	while( (index = words.indexOf("")) != -1 )
		words.splice(index, 1)

	let lengthWords = words.length
	
	for(let i in words){
		let word = words[i]
		let matchCamelCase = /[a-z][A-Z]/g
		let newWords = splitCamenCaseTextInTinyWords(word, matchCamelCase)

		for(let j in newWords){
			words.push(newWords[j])
		}
	}
	
	words = words.slice(lengthWords)
	return words
}

export const getIfsInText = (text) => {
	let regexIf = /if/g
	let match, indexOfIfs = []
	while(match = regexMatch(text, regexIf)){
		indexOfIfs.push(match.index)
	}

	return indexOfIfs
}

export const getArguments = (text, indexOfIf) => {
	let startTextOnIf = text.slice(indexOfIf)
	let regexParentesis = /(\()|(\))/g
	let firstParentheses = regexMatch(startTextOnIf, regexParentesis)
	let secondParentheses = regexMatch(startTextOnIf, regexParentesis)

	return startTextOnIf.slice(firstParentheses.index + 1, secondParentheses.index)
}

export const isEncapsulated = (text, indexOfIf) => {
	let argumentsOnIf = getArguments(text, indexOfIf)
	let regexSpaceAndPeriod = /[\. ]/g
	let regexNoWordCharacter = /\W{2,}/g
	let textWithoutSpaceAndPeriod = argumentsOnIf.replace(regexSpaceAndPeriod, '')
	return testRegex(textWithoutSpaceAndPeriod, regexNoWordCharacter)
}