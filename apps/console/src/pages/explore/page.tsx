import { Container, Grid, Heading, VStack } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import ActionCard from '../../components/ActionCard'
import { useMst } from '../../models/root'

export default observer(() => {
	const { t } = useTranslation('app')
	const {
		router,
		root: {
			api,
			pages: { home: page },
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
					const properties = api.integrations.getExampleConfigByInterface(
						integrationId,
						currentInterface.name,
					)
					console.log(properties)
				}}
			/>
		)
	}

	const content = (
		<Container maxW={'7xl'}>
			{/* <VStack w="full"> */}
			<Heading as={'h2'}>Explore Use Cases</Heading>
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
				{api.integrations.ids.map((integrationId) => {
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
			{/* </VStack> */}
		</Container>
	)

	return content
})
