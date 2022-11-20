import { types } from 'mobx-state-tree'

export const FlethyContext = types.model('FlethyContext', {
	workspaceId: types.optional(types.string, ''),
	projectId: types.optional(types.string, ''),
})
