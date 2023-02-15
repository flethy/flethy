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
			title="Tutorials"
			description={`There are lots of tutorials available to help you get started with your first flethy. Levels are from beginner to advanced.`}
			icon={{
				src: 'tutorials/generic.png',
				alt: 'tutorials',
			}}
			hightlight={{
				action: {
					label: 'Explore Tutorials',
					onClick: () => router.goTo(routes.tutorials),
				},
			}}
		/>
	)

	return content
})
