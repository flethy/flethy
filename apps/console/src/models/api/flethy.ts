import { flow, types } from 'mobx-state-tree'
import { request } from '../../helpers/api'

export const FlethyModel = types
	.model('FlethyModel', {
		testdata: types.optional(types.string, ''),
	})
	.actions((self) => {
		const test = flow(function* () {
			try {
				const response = yield request({
					base: 'flethy',
					method: 'get',
					auth: true,
					url: `api/test`,
				})
				console.log(response)
			} catch (error) {
				console.log(error)
			}
		})

		return { test }
	})
