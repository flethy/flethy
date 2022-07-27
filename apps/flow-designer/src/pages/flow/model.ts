import { nao } from '@web3nao/http-configs'
import { cast, types } from 'mobx-state-tree'
import { applyNodeChanges, Connection, NodeChange } from 'react-flow-renderer'
import { getRootStore } from '../../models/helpers'
import axios from 'axios'

export const FlowPage = types
	.model('FlowPage', {
		config: types.optional(
			types.model({
				nodeId: types.string,
				isOpen: types.boolean,
				selectedConfig: types.maybe(types.string),
				selectedConfigInterface: types.maybe(types.string),
				config: types.map(types.string),
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

		updateConfigInterfaceProperty(key: string, value: string) {
			self.config.config.set(key, value)
		},

		closeConfig: () => {
			self.config.nodeId = ''
			self.config.isOpen = false
			self.config.selectedConfig = undefined
			self.config.selectedConfigInterface = undefined
		},

		runConfig() {
			const requestConfig: any = {}
			const { configs } = getRootStore(self)
			if (self.config.selectedConfig && self.config.selectedConfigInterface) {
				const configInterface = configs.getConfigInterface(
					self.config.selectedConfig,
					self.config.selectedConfigInterface,
				)
				const kind = configInterface.props.find((prop) => prop.name === 'kind')
				if (kind) {
					requestConfig.kind = kind.types
				}
				for (const key of self.config.config.keys()) {
					requestConfig[key] = self.config.config.get(key)
				}
			}
			console.log(requestConfig)
			const naoConfig = nao(requestConfig)
			if (naoConfig.headers) {
				naoConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded'
			} else {
				naoConfig.headers = {
					'Content-Type': 'application/x-www-form-urlencoded',
				}
			}

			console.log(naoConfig)
			axios({
				method: naoConfig.method,
				headers: naoConfig.headers,
				url: naoConfig.url,
				data: naoConfig.body,
			}).then((response) => {
				console.log(response)
			})
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
