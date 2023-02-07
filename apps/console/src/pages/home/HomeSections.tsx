import { Grid, Heading, VStack } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { useMst } from '../../models/root'
import routes from '../../routes'
import ActionCard from '../../components/ActionCard'

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
		<VStack w="full">
			<Heading as={'h2'}>What do you want to do next?</Heading>
			<Grid
				py={5}
				w="full"
				templateColumns={{
					base: '1fr',
					md: 'repeat(2, 1fr)',
					lg: 'repeat(3, 1fr)',
				}}
				gap={6}
			>
				<ActionCard
					avatar={{ name: 'Workflows', src: 'icons/workflows' }}
					title={'Manage Workflows'}
					subtitle={'config'}
					description={'Manage all your Workflows now.'}
					gridItem
					action={() =>
						router.goTo(routes.workflows, api.workspaces.getContext())
					}
				/>
				<ActionCard
					avatar={{ name: 'Secrets', src: 'icons/secrets' }}
					title={'Manage Secrets'}
					subtitle={'config'}
					description={'Manage all your Workflow Secrets now.'}
					gridItem
					action={() =>
						router.goTo(routes.secrets, api.workspaces.getContext())
					}
				/>
				<ActionCard
					avatar={{ name: 'Access Tokens', src: 'icons/accesstokens' }}
					title={'Manage Access Tokens'}
					subtitle={'config'}
					description={'Manage all your Access Tokens now.'}
					gridItem
					action={() => router.goTo(routes.tokens, api.workspaces.getContext())}
				/>
				<ActionCard
					avatar={{ name: 'Cron Triggers', src: 'icons/accesstokens' }}
					title={'Manage Cron Triggers'}
					subtitle={'config'}
					description={'Manage all your Cron Triggers now.'}
					gridItem
					action={() => router.goTo(routes.crons, api.workspaces.getContext())}
				/>
			</Grid>
		</VStack>
	)

	return content
})
