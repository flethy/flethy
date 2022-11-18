import { Box, useColorMode } from '@chakra-ui/react'
import Editor from '@monaco-editor/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
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
		},
	} = useMst()
	const { colorMode } = useColorMode()

	const component = (
		<PageWithTitle
			title={i18n.t('app:pages.workflowEditor.title')}
			subtitle={page.name}
		>
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
		</PageWithTitle>
	)

	return component
})
