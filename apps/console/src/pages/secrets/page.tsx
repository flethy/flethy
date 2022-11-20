import {
	Box,
	Spinner,
	useColorMode,
	VStack,
	Text,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Tfoot,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react'
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
			pages: { secrets: page },
		},
	} = useMst()
	const { colorMode } = useColorMode()

	let content

	if (page.isLoading()) {
		content = <Spinner />
	} else if (page.secretsAvailable()) {
		content = (
			<TableContainer>
				<Table variant="simple">
					<TableCaption>Imperial to metric conversion factors</TableCaption>
					<Thead>
						<Tr>
							<Th>To convert</Th>
							<Th>into</Th>
							<Th isNumeric>multiply by</Th>
						</Tr>
					</Thead>
					<Tbody>
						<Tr>
							<Td>inches</Td>
							<Td>millimetres (mm)</Td>
							<Td isNumeric>25.4</Td>
						</Tr>
						<Tr>
							<Td>feet</Td>
							<Td>centimetres (cm)</Td>
							<Td isNumeric>30.48</Td>
						</Tr>
						<Tr>
							<Td>yards</Td>
							<Td>metres (m)</Td>
							<Td isNumeric>0.91444</Td>
						</Tr>
					</Tbody>
					<Tfoot>
						<Tr>
							<Th>To convert</Th>
							<Th>into</Th>
							<Th isNumeric>multiply by</Th>
						</Tr>
					</Tfoot>
				</Table>
			</TableContainer>
		)
	} else {
		content = <Text>{t('app:pages.secrets.emptyState.heading')}</Text>
	}

	const component = (
		<PageWithTitle
			title={t('app:pages.secrets.title')}
			subtitle={t('app:pages.secrets.subtitle')}
		>
			<VStack></VStack>
		</PageWithTitle>
	)

	return component
})
