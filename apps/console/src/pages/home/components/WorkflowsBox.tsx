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
			title="Create a workflow"
			description={`Workflows are the main building blocks of flethy. There you define what services you want to use and how they should interact with each other. You can also define how the data should be transformed between the services. Of course it's also possible to just add one node. In this case just one service will be used.`}
			icon={{
				src: 'icons/workflows.png',
				alt: 'workflows',
			}}
			hightlight={{
				action: {
					label: 'Create a workflow',
					onClick: () =>
						router.goTo(routes.workflowNew, {
							...api.workspaces.getContext(),
						}),
				},
			}}
		/>
	)

	return content
})
