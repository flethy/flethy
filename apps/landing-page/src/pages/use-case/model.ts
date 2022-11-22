import { types } from 'mobx-state-tree'
import { USECASES } from '../../constants/usecases.const'

export const UseCasePage = types
	.model('UseCasePage', {
		id: types.optional(types.string, ''),
	})
	.actions((self) => {
		// INITIALIZATION
		const initialisePage = (useCaseId: string) => {
			self.id = useCaseId
		}

		return { initialisePage }
	})
	.views((self) => {
		const getContent = () => {
			return USECASES.find((useCase) => useCase.id === self.id)
		}

		return { getContent }
	})
