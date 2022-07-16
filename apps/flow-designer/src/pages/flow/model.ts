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
	.model('CatsPage', {
		data: types.optional(
			types.model({
				test: types.optional(types.string, ''),
			}),
			{},
		),
		nnodes: types.frozen<Node[]>(),
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
	})
	.actions((self) => ({
		// INITIALIZATION
		initialisePage() {
			self.data.test = 'test'
			self.nodes = cast([
				{ id: '1', data: { label: 'Node yay' }, position: { x: 100, y: 100 } },
				{ id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
			])
			self.edges = cast([{ id: 'e1-2', source: '1', target: '2' }])
		},

		updateFirstNode() {
			self.nodes[0].position.x += 50
		},

		onNodesChange: (changes: NodeChange[]) => {
			const updatedNodes = applyNodeChanges(changes, self.nodes)
			for (const updatedNode of updatedNodes) {
				for (const node of self.nodes) {
					if (updatedNode.id === node.id) {
						// console.log(`changing node ${node.id}`)
						node.position.x = updatedNode.position.x
						node.position.y = updatedNode.position.y
					}
				}
			}
			// self.nodes.push(...updatedNodes)
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
			// applyEdgeChanges()
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
			// console.log(JSON.stringify(self.nodes))
			// return self.nodes
			return JSON.parse(JSON.stringify(self.nodes))
		},

		getEdges() {
			// return JSON.parse(JSON.stringify(self.edges))
			return self.edges.map((edge) => {
				return {
					id: edge.id,
					source: edge.source,
					target: edge.target,
				}
			})
		},
	}))
