import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { HighlightBox } from '../../../components/HighlightBox'
import { EXTERNAL_LINKS } from '../../../constants/externallinks.const'
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
		<HighlightBox
			title={'Create your first workflow now'}
			description={`In less than 1 minute you have your first workflow. You can easily create your first workflow here so you can play around with the tooling. We've prepared some Tutorials so you have an easy start. All Tutorials can be found at the bottom of this page. A beginner tutorial is available to play around with WebhookSite. You can easily change API parameters and see the changes instantly on the WebhookSite dashboard.`}
			primaryAction={{
				label: 'Start Tutorial',
				onClick: () =>
					router.goTo(routes.workflowNew, {
						...api.workspaces.getContext(),
						tutorial: 'WebhookSite',
					}),
			}}
			secondaryAction={{
				label: 'Read the docs',
				onClick: () => window.open(EXTERNAL_LINKS.DOCS),
			}}
			img={{
				src: 'icons/beginner-tutorial.png',
				alt: 'beginner tutorial',
			}}
			options={{
				highlight: true,
			}}
		/>
	)

	return content
})
