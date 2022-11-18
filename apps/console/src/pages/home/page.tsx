import { Button, Container, Stack, Text, useColorMode } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { useMst } from '../../models/root'
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react'

export default observer(() => {
	const { t } = useTranslation('app')
	const {
		router,
		root: {
			api,
			pages: { home: page },
		},
	} = useMst()
	const { colorMode } = useColorMode()

	return (
		<>
			<Container maxW={'7xl'}>
				<Stack
					align={'center'}
					spacing={{ base: 8, md: 10 }}
					py={{ base: 15, md: 20 }}
					direction={{ base: 'column', md: 'row' }}
				>
					<Text>todo...</Text>
					<Button
						onClick={() =>
							api.flethy.onboard({
								workspaceName: 'first workspace',
								projectName: 'first project',
							})
						}
					>
						Nice
					</Button>
				</Stack>
				<Stack>
					<Editor
						height="90vh"
						theme={colorMode === 'light' ? 'vs-light' : 'vs-dark'}
						defaultLanguage="json"
						defaultValue={`{ "hallo": "world" }`}
						onChange={(value, event) => {
							console.log(value)
							console.log(event)
						}}
					/>
				</Stack>
			</Container>
		</>
	)
})
