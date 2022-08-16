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
									.props.map((prop, index) => {
										if (
											(Array.isArray(prop.types) && prop.types.length === 1) ||
											typeof prop.types === 'string'
										) {
											return (
												<p key={`${prop.name}-${index}`}>
													<strong>{prop.name}:</strong>{' '}
													{Array.isArray(prop.types)
														? prop.types[0]
														: prop.types}
												</p>
											)
										} else if (
											Array.isArray(prop.types) &&
											prop.types.length > 1
										) {
											return (
												<div key={`${prop.name}-${index}`}>
													<p>
														<strong>{prop.name}</strong>
													</p>
													<Select
														placeholder="Select Value"
														onChange={(event) =>
															// console.log(event.target.value)
															page.updateConfigInterfaceProperty(
																prop.name,
																event.target.value,
															)
														}
													>
														{prop.types.map((propType) => (
															<option key={propType} value={propType}>
																{propType}
															</option>
														))}
													</Select>
												</div>
											)
										} else {
											return (
												<p key={`${prop.name}-${index}`}>
													<strong>
														{prop.name} ({prop.type}){prop.optional ? '' : ' *'}
													</strong>{' '}
													<Input
														placeholder={`Enter ${prop.name}`}
														onChange={(event) =>
															page.updateConfigInterfaceProperty(
																prop.name,
																event.target.value,
															)
														}
													/>
												</p>
											)
										}
									})}
							</UnorderedList>
						)}
					</DrawerBody>

					<DrawerFooter>
						<Button variant="outline" mr={3} onClick={() => page.closeConfig()}>
							Cancel
						</Button>
						<Button colorScheme="blue" mr={3}>
							Save
						</Button>
						<Button colorScheme="orange" onClick={() => page.runConfig()}>
							Run
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</Box>
	)
})
