import { types } from 'mobx-state-tree'
import { USECASES } from '../../constants/usecases.const'
import { getRootStore } from '../../models/helpers'

export const UseCasePage = types
	.model('UseCasePage', {
		id: types.optional(types.string, ''),
	})
	.actions((self) => {
		// INITIALIZATION
		const initialisePage = (useCaseId: string) => {
			self.id = useCaseId
			const useCase = USECASES.find((useCase) => useCase.id === self.id)
			const services = useCase?.services ?? []
			const { api } = getRootStore(self)
			api.helmet.usecase({ usesCaseServices: services })
		}

		return { initialisePage }
	})
	.views((self) => {
		const getContent = () => {
			return USECASES.find((useCase) => useCase.id === self.id)
		}

		return { getContent }
	})
