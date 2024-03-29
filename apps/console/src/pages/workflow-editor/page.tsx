import { DeleteIcon } from '@chakra-ui/icons'
import {
	Box,
	Button,
	Heading,
	HStack,
	IconButton,
	Input,
	Stack,
	Tag,
	Text,
	useColorMode,
	VStack,
} from '@chakra-ui/react'
import Editor from '@monaco-editor/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Canvas } from 'reaflow'
import i18n from '../../i18n/config'
import PageWithTitle from '../../layouts/PageWithTitle'
import { useMst } from '../../models/root'

// https://github.com/suren-atoyan/monaco-react
// https://monaco-react.surenatoyan.com/

export default observer(() => {
	const { t } = useTranslation('app')
	const {
		router,
		root: {
			api,
			pages: { workflowEditor: page },
			modals: { instancesCreate },
		},
	} = useMst()
	const { colorMode } = useColorMode()
	const tutorial = page.checkAndReturnTutorial()

	const component = (
		<PageWithTitle
			title={i18n.t('app:pages.workflowEditor.title')}
			subtitle={page.name}
		>
			{tutorial && (
				<Box>
					<VStack>
						<Tag>{tutorial.level}</Tag>
						<Text>{tutorial.description}</Text>
						{tutorial.prerequisites.map((prereq, index) => (
							<Text key={String(index)}>{prereq}</Text>
						))}
					</VStack>
				</Box>
			)}
			<HStack>
				<Button onClick={() => page.save()}>Save</Button>
				<Button
					isDisabled={!page.isSaved()}
					onClick={() =>
						instancesCreate.open({
							projectId: page.context.projectId,
							workspaceId: page.context.workspaceId,
							workflowId: page.workflowId,
						})
					}
				>
					Start
				</Button>
				{page.isOauth() && (
					<Button
						isDisabled={!page.isSaved()}
						onClick={() => page.startAuthorize()}
					>
						Authorize
					</Button>
				)}
			</HStack>
			<Stack>
				<Text>Name:</Text>
				<Input
					placeholder="Name"
					value={page.name}
					onChange={(event) => page.updateName(event.target.value)}
				/>
			</Stack>
			<Stack>
				<Button onClick={() => page.addEnv()}>Add Environment Variable</Button>
				{page.envs.map((env) => (
					<HStack key={env.id}>
						<Input
							placeholder="Key"
							value={env.key}
							onChange={(event) =>
								page.updateEnv({ id: env.id, key: event.target.value })
							}
						/>
						<Input
							placeholder="Value"
							value={env.value}
							onChange={(event) =>
								page.updateEnv({ id: env.id, value: event.target.value })
							}
						/>
						<IconButton
							aria-label="Remove Env Var"
							icon={<DeleteIcon />}
							onClick={() => page.removeEnv({ id: env.id })}
						/>
					</HStack>
				))}
			</Stack>
			{page.state === 'idle' && (
				<Box w={'full'} borderColor={'flethy.orange'} border={'2px'}>
					<Editor
						height="50vh"
						theme={colorMode === 'light' ? 'vs-light' : 'vs-dark'}
						defaultLanguage="json"
						defaultValue={page.workflow}
						onChange={(value: string | undefined, _event) => {
							page.updateWorkflow(value ?? '')
						}}
					/>
				</Box>
			)}
			<Heading as="h3" size={'lg'}>
				Visualization
			</Heading>
			<Box w={'full'} h={'3xl'} borderColor={'flethy.orange'} border={'2px'}>
				{page.getNodes().length > 0 ? (
					<Canvas nodes={page.getNodes()} edges={page.getEdges()} />
				) : (
					<Text>Invalid Workflow</Text>
				)}
			</Box>
		</PageWithTitle>
	)

	return component
})
