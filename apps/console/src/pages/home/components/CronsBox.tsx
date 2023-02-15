import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { MediumHighlightBox } from '../../../components/HighlightBox'
import { useMst } from '../../../models/root'
import routes from '../../../routes'

export default observer(() => {
	const { t } = useTranslation('app')
	const {
		router,
		root: {
			api,
			pages: { home: page },
		},
	} = useMst()

	const content = (
		<MediumHighlightBox
			title="Schedule your workflow"
			description={`With Cron Triggers you can define scheduled starts of a worklfow. Use the regular cron syntax to define the scheduler. Please note that the scheduler will only run once per hour. That means that if you want to start a workflow at minute 42 it will start at the next full hour.`}
			icon={{
				src: 'icons/crons.png',
				alt: 'workflows',
			}}
			hightlight={{
				action: {
					label: 'Create a cron trigger',
					onClick: () =>
						router.goTo(routes.crons, {
							...api.workspaces.getContext(),
						}),
				},
			}}
		/>
	)

	return content
})
