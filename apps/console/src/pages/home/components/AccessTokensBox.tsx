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
			title="Access the API"
			description={`As soon as you're familiar with the basics you can interact with flethy via API. You can manage workflows and start new instances by using Access Tokens . For example you can keep your workflow definitions in a git repository and use a CI/CD pipeline to sync it with flehty. Your applications can start to integrate with flethy by starting new workflows and listening for the response.`}
			icon={{
				src: 'icons/accesstokens.png',
				alt: 'workflows',
			}}
			hightlight={{
				action: {
					label: 'Create an Access Token',
					onClick: () =>
						router.goTo(routes.tokens, {
							...api.workspaces.getContext(),
						}),
				},
			}}
		/>
	)

	return content
})
