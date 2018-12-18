import { wrongNames } from './rules/wrongNames'
import { magicNumbers } from './rules/magicNumbers'
import { implicitWords } from './rules/implicitWords'
import { conditions } from './rules/conditions'

export const CLEAR_CODE_RULES = [
	wrongNames,
	magicNumbers,
	implicitWords,
	conditions
]