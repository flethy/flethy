import { Box, Center, Heading, Stack, Text } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useMst } from '../../models/root'
import { useTranslation } from 'react-i18next'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { anOldHope } from 'react-syntax-highlighter/dist/esm/styles/hljs'

export default observer(() => {
	const { t } = useTranslation('app')
	const {
		root: {
			pages: { home: page },
		},
	} = useMst()

	const codeString = `import { nao, Web3Storage } from '@flethy/connectors'

const requestConfig = nao<Web3Storage.UploadContent>({
	kind: 'web3storage.upload.content',
	'auth:Authorization': process.env.WEB3_STORAGE_API_TOKEN,
	'body:content': {
		testString: 'testString',
		testNumber: 1,
		testBoolean: true,
	},
})`

	return (
		<Center h="100vh">
			<Stack textAlign={'center'}>
				<Heading as="h1" size="lg" mb={4}>
					{t('title')}
				</Heading>
				<Text>{t('description')}</Text>
				<Text>{t('home.stayTuned')}</Text>
				<Box textAlign={'left'}>
					<SyntaxHighlighter
						language="typescript"
						style={anOldHope}
						customStyle={{
							borderRadius: '5px',
							borderColor: 'yellow',
							borderWidth: '1px',
							margin: '2px',
						}}
					>
						{codeString}
					</SyntaxHighlighter>
				</Box>
			</Stack>
		</Center>
	)
})
