import { Button, Container, Stack } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { useMst } from '../../models/root'
import routes from '../../routes'
import Onboarding from './Onboarding'

export default observer(() => {
	const { t } = useTranslation('app')
	const {
		router,
		root: {
			api,
			pages: { home: page },
		},
	} = useMst()

	let content = <></>

	if (!api.workspaces.isOnboarded()) {
		content = <Onboarding />
	} else {
		content = (
			<Stack
				align={'center'}
				spacing={{ base: 8, md: 10 }}
				py={{ base: 15, md: 20 }}
				direction={{ base: 'column', md: 'row' }}
			>
				<Button
					onClick={() =>
						router.goTo(routes.secrets, api.workspaces.getContext())
					}
				>
					Secrets
				</Button>
				<Button
					onClick={() =>
						router.goTo(routes.workflows, api.workspaces.getContext())
					}
				>
					Workflows
				</Button>
			</Stack>
		)
	}

	return (
		<>
			<Container maxW={'7xl'}>{content}</Container>
		</>
	)
})
