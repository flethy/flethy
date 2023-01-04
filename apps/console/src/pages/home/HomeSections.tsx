import { Button, Grid, GridItem, Heading, VStack } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { useMst } from '../../models/root'
import routes from '../../routes'

export default observer(() => {
	const { t } = useTranslation('app')
	const {
		router,
		root: {
			api,
			pages: { home: page },
		},
	} = useMst()

	const Action = ({
		title,
		onClick,
	}: {
		title: string
		onClick: () => void
	}) => (
		<GridItem>
			<Button
				variant="outline"
				w="100%"
				h={{ base: 30, md: 50, lg: 100 }}
				onClick={() => onClick()}
			>
				{title}
			</Button>
		</GridItem>
	)

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
				<Action
					title="Manage Workflows"
					onClick={() =>
						router.goTo(routes.workflows, api.workspaces.getContext())
					}
				/>
				<Action
					title="Manage Secrets"
					onClick={() =>
						router.goTo(routes.secrets, api.workspaces.getContext())
					}
				/>
				<Action
					title="Manage Access Tokens"
					onClick={() =>
						router.goTo(routes.tokens, api.workspaces.getContext())
					}
				/>
			</Grid>
		</VStack>
	)

	return content
})
