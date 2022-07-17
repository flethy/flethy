import {
	Box,
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Input,
} from '@chakra-ui/react'
import { CONFIG_TYPES } from '@web3nao/http-configs'
import { observer } from 'mobx-react-lite'
import ReactFlow, { Controls, MiniMap } from 'react-flow-renderer'
import { useMst } from '../../models/root'

export default observer(() => {
	const {
		root: {
			pages: { flow: page },
			flow,
		},
	} = useMst()

	const web3nao = getWeb3nao({ name: 'Courier' })
	const web3naoInterfaces = web3nao?.interfaces ?? []

	return (
		<Box style={{ width: '100%', height: '100vh' }}>
			{/* <div>
				{web3naoInterfaces.length > 0 &&
					web3naoInterfaces[0].properties.map((currentProp) => (
						<div>
							{currentProp.name} | {currentProp.type}{' '}
							{Array.isArray(currentProp.types)
								? currentProp.types.join(',')
								: currentProp.types}{' '}
							| {currentProp.optional === true ? 'optional' : 'mandatory'}
						</div>
					))}
			</div> */}
			<Button onClick={() => flow.addNode()}>Add Node</Button>
			<Button
				onClick={() => page.openConfig()}
				disabled={!flow.isOneNodeSelected()}
			>
				Open Config
			</Button>
			<ReactFlow
				nodes={flow.getNodes()}
				edges={flow.getEdges()}
				style={{ width: '100%', height: '100%' }}
				onNodesChange={(event) => {
					page.onNodesChange(event)
				}}
				onEdgesChange={(event: any) => page.onEdgeChange(event)}
				onConnect={(event) => page.onConnect(event)}
			>
				<MiniMap />
				<Controls />
			</ReactFlow>
			<Drawer
				isOpen={page.config.isOpen}
				placement="right"
				onClose={() => page.closeConfig()}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Selected: {page.config.nodeId}</DrawerHeader>

					<DrawerBody>
						<Input placeholder="Type here..." />
					</DrawerBody>

					<DrawerFooter>
						<Button variant="outline" mr={3} onClick={() => page.closeConfig()}>
							Cancel
						</Button>
						<Button colorScheme="blue">Save</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</Box>
	)
})

function getWeb3nao(options: { name: string }) {
	const foundType = CONFIG_TYPES.find(
		(currentType) => currentType.name === options.name,
	)
	return foundType
}
