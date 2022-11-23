import { types } from 'mobx-state-tree'

const ProjectModel = types.model({
	id: types.identifier,
})

const WorkspaceModel = types.model({
	id: types.identifier,
	name: types.optional(types.string, ''),
	roles: types.array(types.enumeration(['owner', 'admin', 'member'])),
	projects: types.array(ProjectModel),
})

export const UserModel = types
	.model('UserModel', {
		isAuthenticated: types.optional(types.boolean, false),
		email: types.optional(types.string, ''),
		first: types.optional(types.string, ''),
		last: types.optional(types.string, ''),
		picture: types.optional(types.string, ''),
		userId: types.optional(types.string, ''),
		workspaces: types.array(WorkspaceModel),
	})
	.actions((self) => {
		const init = (user: any) => {
			self.isAuthenticated = true
			self.email = user.email
			self.first = user.given_name
			self.last = user.family_name
			self.picture = user.picture
			self.userId = user.userId
			self.workspaces = user['https://flethy.com/ws'].map((workspace: any) => {
				return {
					id: workspace.id,
					name: workspace.name,
					roles: workspace.r.map((role: any) => {
						switch (role) {
							case 'o':
								return 'owner'
							case 'a':
								return 'admin'
							case 'm':
								return 'member'
							default:
								return 'member'
						}
					}),
					projects: workspace.p,
				}
			})
		}

		return { init }
	})
	.views((self) => {
		const workspaceById = (id: string) => {
			const workspace = self.workspaces.find((workspace) => workspace.id === id)
			return workspace
		}

		const projectById = (workspaceId: string, id: string) => {
			const workspace = workspaceById(workspaceId)
			const project = workspace?.projects.find((project) => project.id === id)
			return project
		}

		return { workspaceById, projectById }
	})
