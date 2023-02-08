import { Button, Spinner, Text, useColorMode, VStack } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import DataTable, {
	DataTableCell,
	DataTableProps,
} from '../../components/DataTable'
import PageWithTitle from '../../layouts/PageWithTitle'
import { useMst } from '../../models/root'

export default observer(() => {
	const { t } = useTranslation('app')
	const {
		router,
		root: {
			api,
			pages: { tokens: page },
			modals: { tokensCreate, tokensDelete },
		},
	} = useMst()
	const { colorMode } = useColorMode()

	const addButton = (
		<Button
			onClick={() =>
				tokensCreate.open({
					workspaceId: page.context.workspaceId,
					projectId: page.context.projectId,
				})
			}
			isDisabled={
				(page.getTokens()?.length ?? 0) >=
				api.workspaces.getLimits().projects.tokens.max
			}
		>
			Add
		</Button>
	)

	let content

	if (page.isLoading()) {
		content = <Spinner />
	} else if (page.tokensAvailable()) {
		const tokens = page.getTokens()
		const dataTableProps: DataTableProps = {
			headers: [
				{
					id: 'name',
					value: 'Name',
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
			content: tokens.map((token) => {
				const cells: DataTableCell[] = [
					{
						id: 'name',
						value: token.name,
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
							tokensDelete.open({
								workspaceId: page.context.workspaceId,
								projectId: page.context.projectId,
								tokenId: token.id,
								name: token.name,
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
				<Text>{t('app:pages.tokens.emptyState.heading')}</Text>
			</>
		)
	}

	const component = (
		<PageWithTitle
			title={t('app:pages.tokens.title')}
			subtitle={t('app:pages.tokens.subtitle') ?? ''}
		>
			<VStack>{content}</VStack>
		</PageWithTitle>
	)

	return component
})
