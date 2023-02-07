import { Spinner, Text, useColorMode, VStack } from '@chakra-ui/react'
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
			pages: { crons: page },
			modals: { cronsDelete },
		},
	} = useMst()
	const { colorMode } = useColorMode()

	let content

	if (page.isLoading()) {
		content = <Spinner />
	} else if (page.cronsAvailable()) {
		const crons = page.getCrons()
		const dataTableProps: DataTableProps = {
			headers: [
				{
					id: 'name',
					value: 'Name',
				},
				{
					id: 'expression',
					value: 'expression',
				},
				{
					id: 'delete',
					value: '',
				},
			],
			content: crons.map((cron) => {
				const cells: DataTableCell[] = [
					{
						id: 'name',
						value: cron.name,
					},
					{
						id: 'expression',
						value: cron.expression,
					},
					{
						id: 'delete',
						value: 'delete-cron',
						type: 'MenuDelete',
						onClick: () => {
							cronsDelete.open({
								workspaceId: page.context.workspaceId,
								projectId: page.context.projectId,
								cronId: cron.cronId,
								name: cron.name,
							})
						},
					},
				]
				return cells
			}),
		}
		content = (
			<>
				<DataTable
					headers={dataTableProps.headers}
					content={dataTableProps.content}
				/>
			</>
		)
	} else {
		content = (
			<>
				<Text>{t('app:pages.crons.emptyState.heading')}</Text>
			</>
		)
	}

	const component = (
		<PageWithTitle
			title={t('app:pages.crons.title')}
			subtitle={t('app:pages.crons.subtitle') ?? ''}
		>
			<VStack>{content}</VStack>
		</PageWithTitle>
	)

	return component
})
