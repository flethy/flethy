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
	Button,
} from '@chakra-ui/react'
import Editor from '@monaco-editor/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import DataTable, {
	DataTableCell,
	DataTableProps,
} from '../../components/DataTable'
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
			modals: { secretsCreate, secretsDelete },
		},
	} = useMst()
	const { colorMode } = useColorMode()

	const addButton = (
		<Button
			onClick={() =>
				secretsCreate.open({
					workspaceId: page.context.workspaceId,
					projectId: page.context.projectId,
				})
			}
			isDisabled={
				(page.getSecrets()?.keys.length ?? 0) >=
				api.workspaces.getLimits().projects.secrets.max
			}
		>
			Add
		</Button>
	)

	let content

	if (page.isLoading()) {
		content = <Spinner />
	} else if (page.secretsAvailable()) {
		const secrets = page.getSecrets()
		const dataTableProps: DataTableProps = {
			headers: [
				{
					id: 'key',
					value: 'Key',
				},
				{
					id: 'value',
					value: 'Value',
				},
				{
					id: 'delete',
					value: '',
				},
			],
			content: secrets.keys.map((secretKey) => {
				const cells: DataTableCell[] = [
					{
						id: 'key',
						value: secretKey,
						clipboard: true,
					},
					{
						id: 'value',
						value: '********',
					},
					{
						id: 'delete',
						value: 'delete-secret',
						type: 'MenuDelete',
						onClick: () => {
							secretsDelete.open({
								workspaceId: page.context.workspaceId,
								projectId: page.context.projectId,
								key: secretKey,
							})
						},
					},
				]
				return cells
			}),
		}
		content = (
			<>
				{addButton}
				<DataTable
					headers={dataTableProps.headers}
					content={dataTableProps.content}
				/>
			</>
		)
	} else {
		content = (
			<>
				{addButton}
				<Text>{t('app:pages.secrets.emptyState.heading')}</Text>
			</>
		)
	}

	const component = (
		<PageWithTitle
			title={t('app:pages.secrets.title')}
			subtitle={String(t('app:pages.secrets.subtitle'))}
		>
			<VStack>{content}</VStack>
		</PageWithTitle>
	)

	return component
})
