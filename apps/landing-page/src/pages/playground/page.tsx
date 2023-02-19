import {
	Button,
	Code,
	Container,
	Heading,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	useColorMode,
	VStack,
	Text,
} from '@chakra-ui/react'
import Editor from '@monaco-editor/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import FancyHeading from '../../components/molecules/fancy-heading/FancyHeading'
import { useMst } from '../../models/root'

export default observer(() => {
	const { t } = useTranslation('app')
	const {
		root: {
			pages: { playground: page },
		},
	} = useMst()
	const { colorMode } = useColorMode()

	let content = (
		<VStack gap={2} w={'full'}>
			<FancyHeading textA={`Playground`} textB={`Try out flethy here`} />
			<Text>
				Here you can try out flethy flows. Three templates are already prepared,
				but you can change them as you like. flethy runs entirely in the
				browser, which means that if you change any data in the flow, it does
				not go to the server.
			</Text>
			<Text>As soon as you want to start the flow, click on run.</Text>
			<Button isDisabled={page.status === 'running'} onClick={() => page.run()}>
				Run
			</Button>
			<Tabs onChange={(index) => page.updateTabIndex(index)} w={'full'}>
				<TabList>
					{page.getTemplates().map((template, index) => (
						<Tab key={template.id}>{template.name}</Tab>
					))}
				</TabList>

				<TabPanels>
					{page.getTemplates().map((template, index) => (
						<TabPanel key={template.id}>
							<Editor
								height="50vh"
								theme={colorMode === 'light' ? 'vs-light' : 'vs-dark'}
								defaultLanguage="json"
								defaultValue={template.workflow}
								onChange={(value: string | undefined, _event) => {
									page.updateTemplate(template.id, value ?? '')
								}}
							/>
						</TabPanel>
					))}
				</TabPanels>
			</Tabs>
			{page.response && (
				<VStack>
					<Heading as={'h3'} size={'md'}>
						Response
					</Heading>
					<Code>{page.response}</Code>
				</VStack>
			)}
		</VStack>
	)

	return <Container maxW={'7xl'}>{content}</Container>
})
