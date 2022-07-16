import { types } from 'mobx-state-tree'

export const Cat = types.model('Cat', {
	id: types.identifier,
	url: types.string,
	width: types.number,
	height: types.number,
})
