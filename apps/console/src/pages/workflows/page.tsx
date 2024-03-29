import { Button, Spinner, Text, useColorMode, VStack } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import DataTable, {
	DataTableCell,
	DataTableProps,
} from '../../components/DataTable'
import PageWithTitle from '../../layouts/PageWithTitle'
import { useMst } from '../../models/root'
import routes from '../../routes'

export default observer(() => {
	const { t } = useTranslation('app')
	const {
		router,
		root: {
			api,
			pages: { workflows: page },
			modals: { instancesCreate, cronsCreate },
		},
	} = useMst()
	const { colorMode } = useColorMode()

	let content

	const addButton = (
		<Button
			onClick={() => {
				router.goTo(routes.workflowNew, {
					workspaceId: page.context.workspaceId,
					projectId: page.context.projectId,
				})
			}}
			isDisabled={
				(page.getWorkflows()?.length ?? 0) >=
				api.workspaces.getLimits().projects.workflows.max
			}
		>
			Add
		</Button>
	)

	if (page.isLoading()) {
		content = <Spinner />
	} else if (page.workflowsAvailable()) {
		const workflows = page.getWorkflows()
		const dataTableProps: DataTableProps = {
			headers: [
				{
					id: 'name',
					value: 'Name',
				},
				{
					id: 'id',
					value: 'ID',
				},
				{
					id: 'delete',
					value: '',
				},
				{
					id: 'play',
					value: '',
				},
				{
					id: 'cron',
					value: '',
				},
			],
			content: workflows.map((workflow) => {
				const cells: DataTableCell[] = [
					{
						id: 'name',
						value: workflow.name,
						route: {
							route: routes.workflowExisting,
							params: {
								workspaceId: page.context.workspaceId,
								projectId: page.context.projectId,
								workflowId: workflow.workflowId,
							},
						},
					},
					{
						id: 'id',
						value: workflow.workflowId,
						clipboard: true,
					},
					{
						id: 'delete',
						value: 'delete-workflow',
						type: 'MenuDelete',
						onClick: () => {
							api.workflows.del({
								workspaceId: page.context.workspaceId,
								projectId: page.context.projectId,
								workflowId: workflow.workflowId,
							})
						},
					},
					{
						id: 'play',
						value: 'play-workflow',
						type: 'MenuPlay',
						onClick: () => {
							instancesCreate.open({
								workspaceId: page.context.workspaceId,
								projectId: page.context.projectId,
								workflowId: workflow.workflowId,
							})
						},
					},
					{
						id: 'cron',
						value: 'create-cron',
						type: 'RepeatClockIcon',
						disabled:
							api.crons.getCronCountForCurrentWorkspace() >=
							api.workspaces.getLimits().projects.crons.max,
						onClick: () => {
							cronsCreate.open({
								workspaceId: page.context.workspaceId,
								projectId: page.context.projectId,
								workflowId: workflow.workflowId,
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
				<Text>{t('app:pages.workflows.emptyState.heading')}</Text>
			</>
		)
	}

	const component = (
		<PageWithTitle
			title={t('app:pages.workflows.title')}
			subtitle={t('app:pages.workflows.subtitle')!}
		>
			<VStack>{content}</VStack>
		</PageWithTitle>
	)

	return component
})
