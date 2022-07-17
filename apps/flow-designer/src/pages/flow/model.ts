import { types, cast } from 'mobx-state-tree'
import { getRootStore } from '../../models/helpers'
import ReactFlow, {
	MiniMap,
	Controls,
	useNodesState,
	useEdgesState,
	applyEdgeChanges,
	applyNodeChanges,
	NodeChange,
	EdgeChange,
	Node,
	Connection,
} from 'react-flow-renderer'

export const FlowPage = types
	.model('FlowPage', {
		config: types.optional(
			types.model({
				nodeId: types.string,
				isOpen: types.boolean,
			}),
			{ nodeId: '-1', isOpen: false },
		),
		data: types.optional(
			types.model({
				test: types.optional(types.string, ''),
				test2: types.optional(types.model({}), {}),
			}),
			{},
		),
		nodes: types.array(
			types.model({
				id: types.string,
				data: types.model({
					label: types.string,
				}),
				position: types.model({
					x: types.number,
					y: types.number,
				}),
			}),
		),
		edges: types.array(
			types.model({
				id: types.string,
				source: types.string,
				target: types.string,
			}),
		),
		selectedNodes: types.array(types.string),
	})
	.actions((self) => ({
		openConfig: (id?: string) => {
			const selectedId = id ?? self.selectedNodes[0]
			self.config.nodeId = selectedId
			self.config.isOpen = true
		},

		closeConfig: () => {
			self.config.nodeId = ''
			self.config.isOpen = false
		},
	}))
	.actions((self) => ({
		// INITIALIZATION
		initialisePage() {
			self.data.test = 'test'
			self.data.test2 = {}
			self.nodes = cast([
				{ id: '1', data: { label: 'Node yay' }, position: { x: 100, y: 100 } },
				{ id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
			])
			self.edges = cast([{ id: 'e1-2', source: '1', target: '2' }])
			self.config = cast({
				nodeId: '-1',
				isOpen: false,
			})
		},

		onNodesChange: (changes: NodeChange[]) => {
			const updatedNodes = applyNodeChanges(changes, self.nodes)
			self.selectedNodes.clear()
			for (const updatedNode of updatedNodes) {
				if (updatedNode.selected === true) {
					console.log(updatedNode)
					self.selectedNodes.push(updatedNode.id)
				}
				for (const node of self.nodes) {
					if (updatedNode.id === node.id) {
						node.position.x = updatedNode.position.x
						node.position.y = updatedNode.position.y
					}
				}
			}
		},

		onEdgeChange: (changes: any[]) => {
			for (const edge of self.edges) {
				if (edge.id === changes[0].id) {
					self.edges.remove(edge)
					return
				}
			}
		},

		onConnect: (connection: Connection) => {
			self.edges.push({
				id: `${connection.source}-${connection.target}`,
				source: String(connection.source),
				target: String(connection.target),
			})
		},

		addNode: () => {
			const ids: number[] = self.nodes.map((node) => Number(node.id))
			const maxId = Math.max(...ids)
			const newId = String(maxId + 1)
			self.nodes.push({
				id: newId,
				data: {
					label: `Node ${newId}`,
				},
				position: {
					x: 50,
					y: 50,
				},
			})
			self.openConfig(newId)
		},

		removeEdge: (id: string) => {
			for (const edge of self.edges) {
				if (edge.id === id) {
					self.edges.remove(edge)
					return
				}
			}
		},
	}))
	.views((self) => ({
		pageModelFetching() {
			return true
		},

		getNodes() {
			return JSON.parse(JSON.stringify(self.nodes))
		},

		getEdges() {
			return self.edges.map((edge) => {
				return {
					id: edge.id,
					source: edge.source,
					target: edge.target,
				}
			})
		},
	}))
