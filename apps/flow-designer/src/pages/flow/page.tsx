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
	ListItem,
	Select,
	UnorderedList,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import ReactFlow, { Controls, MiniMap } from 'react-flow-renderer'
import { useMst } from '../../models/root'

export default observer(() => {
	const {
		root: {
			pages: { flow: page },
			flow,
			configs,
		},
	} = useMst()

	return (
		<Box style={{ width: '100%', height: 'calc(100vh - 120px)' }}>
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
						<Select
							placeholder="Select Config"
							onChange={(event) => page.selectConfig(event.target.value)}
						>
							{configs.getConfigNames().map((name: string) => (
								<option key={name} value={name}>
									{name}
								</option>
							))}
						</Select>
						{page.config.selectedConfig && (
							<Select
								placeholder="Select Config Interface"
								onChange={(event) =>
									page.selectConfigInterface(event.target.value)
								}
							>
								{configs
									.getConfigInterfaces(page.config.selectedConfig)
									.map((name: string) => (
										<option key={name} value={name}>
											{name}
										</option>
									))}
							</Select>
						)}
						{page.config.selectedConfig && page.config.selectedConfigInterface && (
							<UnorderedList>
								{configs
									.getConfigInterface(
										page.config.selectedConfig,
										page.config.selectedConfigInterface,
									)
									.props.map((prop) => (
										<ListItem key={prop}>{prop}</ListItem>
									))}
							</UnorderedList>
						)}
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
