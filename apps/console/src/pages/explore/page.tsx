import {
	Button,
	Center,
	Container,
	Grid,
	Heading,
	useColorModeValue,
	VStack,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import ActionCard from '../../components/ActionCard'
import { useMst } from '../../models/root'
import routes from '../../routes'

export default observer(() => {
	const { t } = useTranslation('app')
	const {
		router,
		root: {
			api,
			pages: { exploreUseCases: page },
		},
	} = useMst()

	const UseCaseCard = ({
		integrationId,
		currentInterface,
	}: {
		integrationId: string
		currentInterface: any
	}) => {
		const integration = api.integrations.getIntegrationById(integrationId)
		return (
			<ActionCard
				avatar={{
					src: `integrations/${integration.integration.file}`,
					name: integration.configType.name,
				}}
				title={currentInterface.name}
				subtitle={integrationId}
				description={integration.integration.description}
				tags={[integration.config.meta.category, integration.config.meta.type]}
				gridItem
				action={() => {
					router.goTo(routes.workflowNew, {
						...api.workspaces.getContext(),
						useCaseIntegrationId: integrationId,
						useCaseInterface: currentInterface.name,
					})
				}}
			/>
		)
	}

	const content = (
		<Container maxW={'7xl'}>
			<VStack w="full">
				<Heading as={'h2'}>Explore Use Cases</Heading>
				<Center>
					<div>
						{api.integrations.categories.map((category) => {
							return (
								<Button
									key={category}
									px={2}
									py={1}
									m={1}
									colorScheme={
										page.selectedTags.includes(category) ? 'purple' : 'gray'
									}
									fontWeight={'400'}
									onClick={() => page.toggleTag(category)}
								>
									#{category}
								</Button>
							)
						})}
					</div>
				</Center>
				<Grid
					py={5}
					w="full"
					templateColumns={{
						base: '1fr',
						sm: 'repeat(2, 1fr)',
						md: 'repeat(3, 1fr)',
					}}
					gap={6}
				>
					{api.integrations
						.getIntegrationIds({ categories: page.selectedTags })
						.map((integrationId) => {
							if (!api.integrations.configTypes) {
								return null
							}
							return api.integrations.configTypes
								.get(integrationId)
								.interfaces.map((currentInterface: any, index: any) => {
									return (
										<UseCaseCard
											integrationId={integrationId}
											currentInterface={currentInterface}
											key={`${integrationId}-${index}`}
										/>
									)
								})
						})}
				</Grid>
			</VStack>
		</Container>
	)

	return content
})
