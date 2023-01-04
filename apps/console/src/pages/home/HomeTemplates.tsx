import { Button, Grid, GridItem, Heading, VStack } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { WORKFLOW_TUTORIALS } from '../../constants/tutorials.const'
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
			<Heading as={'h2'}>Use one of our Templates</Heading>
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
				{Object.keys(WORKFLOW_TUTORIALS).map((key) => {
					const tutorial = WORKFLOW_TUTORIALS[key]
					return (
						<Action
							title={tutorial.name}
							key={key}
							onClick={() =>
								router.goTo(routes.workflowNew, {
									...api.workspaces.getContext(),
									tutorial: key,
								})
							}
						/>
					)
				})}
			</Grid>
		</VStack>
	)

	return content
})
