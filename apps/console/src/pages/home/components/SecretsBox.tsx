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
			title="Use Secrets"
			description={`If you want to interact with an API regularly an Authentication is needed. Every service has its own Authentication method. To not place credentials in plain text into the workflow and to re-use existing credentials for several workflows use Secrets.`}
			icon={{
				src: 'icons/secrets.png',
				alt: 'workflows',
			}}
			hightlight={{
				action: {
					label: 'Create a secret',
					onClick: () =>
						router.goTo(routes.secrets, {
							...api.workspaces.getContext(),
						}),
				},
			}}
		/>
	)

	return content
})
