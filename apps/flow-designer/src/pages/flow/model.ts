import { cast, types } from 'mobx-state-tree'
import { applyNodeChanges, Connection, NodeChange } from 'react-flow-renderer'
import { getRootStore } from '../../models/helpers'

export const FlowPage = types
	.model('FlowPage', {
		config: types.optional(
			types.model({
				nodeId: types.string,
				isOpen: types.boolean,
				selectedConfig: types.maybe(types.string),
				selectedConfigInterface: types.maybe(types.string),
			}),
			{ nodeId: '-1', isOpen: false },
		),
	})
	.actions((self) => ({
		openConfig: (id?: string) => {
			const { flow } = getRootStore(self)
			const selectedId = id ?? flow.getSelected()
			self.config.nodeId = selectedId
			self.config.isOpen = true
		},

		selectConfig(name: string) {
			self.config.selectedConfigInterface = undefined
			self.config.selectedConfig = name
		},

		selectConfigInterface(name: string) {
			self.config.selectedConfigInterface = name
		},

		closeConfig: () => {
			self.config.nodeId = ''
			self.config.isOpen = false
			self.config.selectedConfig = undefined
			self.config.selectedConfigInterface = undefined
		},
	}))
	.actions((self) => ({
		// INITIALIZATION
		initialisePage() {
			const { flow, configs } = getRootStore(self)
			configs.init()

			flow.addNode({
				position: {
					x: 100,
					y: 100,
				},
				label: `Node Yay`,
			})

			flow.addNode({
				position: {
					x: 100,
					y: 200,
				},
				label: `Node 2`,
			})

			flow.connect({
				source: '1',
				target: '2',
			})

			self.config = cast({
				nodeId: '-1',
				isOpen: false,
			})
		},

		onNodesChange: (changes: NodeChange[]) => {
			const { flow } = getRootStore(self)
			const updatedNodes = applyNodeChanges(changes, flow.getNodes())
			flow.clearSelected()
			for (const updatedNode of updatedNodes) {
				if (updatedNode.selected === true) {
					flow.addSelected(updatedNode.id)
				}
				flow.updateNodePosition(
					updatedNode.id,
					updatedNode.position.x,
					updatedNode.position.y,
				)
			}
		},

		onEdgeChange: (changes: any[]) => {
			const { flow } = getRootStore(self)
			flow.removeEdge(changes[0].id)
		},

		onConnect: (connection: Connection) => {
			const { flow } = getRootStore(self)
			flow.connect({
				source: String(connection.source),
				target: String(connection.target),
			})
		},
	}))
	.views((self) => ({}))
