import { FlowEngine } from '@flethy/flow'
import { flow, types } from 'mobx-state-tree'
import { WORKFLOW_TUTORIALS } from '../../constants/tutorials.const'
import { getRootStore } from '../../models/helpers'

export const PlaygroundPage = types
	.model('PlaygroundPage', {
		templates: types.array(
			types.model({
				id: types.string,
				name: types.string,
				description: types.string,
				workflow: types.string,
			}),
		),
		tabIndex: types.optional(types.number, 0),
		response: types.maybe(types.string),
		status: types.optional(types.string, 'idle'),
	})
	.actions((self) => {
		// INITIALIZATION
		const initialisePage = () => {
			self.tabIndex = 0
			self.response = undefined
			self.status = 'idle'
			const { api } = getRootStore(self)
			api.helmet.updateTitle({ title: 'Playground' })
			self.templates.clear()
			WORKFLOW_TUTORIALS.forEach((template) => {
				self.templates.push({
					id: template.id,
					name: template.name,
					description: template.description,
					workflow: JSON.stringify(template.workflow, null, 2),
				})
			})
		}

		const updateTemplate = (id: string, workflow: string) => {
			const template = self.templates.find((template) => template.id === id)
			if (template) {
				template.workflow = workflow
			}
		}

		const updateTabIndex = (index: number) => {
			self.tabIndex = index
		}

		const run = flow(function* () {
			self.status = 'running'
			try {
				const engine = new FlowEngine({
					env: {
						env: {},
						secrets: {},
					},
					flow: JSON.parse(self.templates[self.tabIndex].workflow),
				})
				yield engine.start()
				self.response = JSON.stringify(engine.getResponse(), null, 2)
				self.status = 'idle'
			} catch (error) {
				self.response = undefined
				self.status = 'error'
			}
		})

		return { initialisePage, updateTemplate, updateTabIndex, run }
	})
	.views((self) => {
		const isLoading = () => {
			return false
		}

		const getTemplates = () => {
			return self.templates
		}

		return { isLoading, getTemplates }
	})
