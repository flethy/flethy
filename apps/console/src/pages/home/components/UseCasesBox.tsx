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
			title={'Find the right use case'}
			description={`flethy integrates with hundreds of services, and every service provides lots of endpoints. So there are plenty of use cases available to start with. You can create contacts in CRMs, get content from CMSs, send messages or get any kind of validation data. Navigate all the use cases and find inspiration for your next project.`}
			primaryAction={{
				label: 'Explore',
				onClick: () => router.goTo(routes.explore),
			}}
			secondaryAction={{
				label: 'Read the docs',
				onClick: () => window.open(EXTERNAL_LINKS.DOCS),
			}}
			img={{
				src: 'icons/explore.png',
				alt: 'explore use cases',
			}}
			options={{
				highlight: true,
			}}
		/>
	)

	return content
})
