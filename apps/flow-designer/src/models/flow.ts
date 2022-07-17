import { types } from 'mobx-state-tree'

export const FlowNode = types.model({
	id: types.string,
	data: types.model({
		label: types.string,
	}),
	position: types.model({
		x: types.number,
		y: types.number,
	}),
})

export const Edge = types.model({
	id: types.string,
	source: types.string,
	target: types.string,
})

export const Flow = types
	.model('Flow', {
		nodes: types.array(FlowNode),
		edges: types.array(Edge),
		selectedNodes: types.array(types.string),
		maxNodeId: types.optional(types.number, 0),
	})
	.actions((self) => ({
		// SELECTION
		clearSelected() {
			self.selectedNodes.clear()
		},

		addSelected(id: string) {
			self.selectedNodes.push(id)
		},

		// FLOW NODE OPERATIONS
		updateNodePosition(id: string, posX: number, posY: number) {
			const foundNode = self.nodes.find((currentNode) => currentNode.id === id)
			if (foundNode) {
				foundNode.position.x = posX
				foundNode.position.y = posY
			}
		},

		addNode(options?: { position?: { x: number; y: number }; label?: string }) {
			self.maxNodeId++
			const newNode = {
				id: String(self.maxNodeId),
				position: {
					x: 50,
					y: 50,
				},
				data: {
					label: `New Node ${self.maxNodeId}`,
				},
			}
			if (options) {
				if (options.position) {
					newNode.position = options.position
				}
				if (options.label) {
					newNode.data.label = options.label
				}
			}
			self.nodes.push(newNode)
			return newNode
		},

		// EDGES
		connect(connection: { source: string; target: string }) {
			self.edges.push({
				id: `${connection.source}-${connection.target}`,
				source: connection.source,
				target: connection.target,
			})
		},

		removeEdge(id: string) {
			const foundEdge = self.edges.find((edge) => edge.id === id)
			if (foundEdge) {
				self.edges.remove(foundEdge)
			}
		},
	}))
	.views((self) => ({
		isOneNodeSelected(): boolean {
			return self.selectedNodes.length === 1
		},

		getSelected(): string {
			return self.selectedNodes[0]
		},

		getNodes() {
			return self.nodes.map((node) => {
				return {
					id: node.id,
					data: {
						label: node.data.label,
					},
					position: {
						x: node.position.x,
						y: node.position.y,
					},
				}
			})
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
