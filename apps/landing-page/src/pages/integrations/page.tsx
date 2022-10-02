import {
	Center,
	Container,
	Grid,
	GridItem,
	Heading,
	Image,
	Stack,
	Text,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { API_COUNT, API_ENDPOINT_COUNT } from '../../constants/api.const'
import { INTEGRATIONS } from '../../constants/integrations.const'
import { useMst } from '../../models/root'

export default observer(() => {
	const { t } = useTranslation('app')
	const {
		root: {
			pages: { integrations: page },
		},
	} = useMst()

	return (
		<Container>
			<Stack gap={6}>
				<Stack flex={1} spacing={{ base: 5, md: 10 }}>
					<Heading
						lineHeight={1.1}
						fontWeight={600}
						fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
					>
						<Text
							as={'span'}
							position={'relative'}
							_after={{
								content: "''",
								width: 'full',
								height: '30%',
								position: 'absolute',
								bottom: 1,
								left: 0,
								bg: 'flethy.orange',
								zIndex: -1,
							}}
						>
							{API_COUNT} Integrations,
						</Text>
						<br />
						<Text as={'span'} color={'flethy.purple'}>
							{API_ENDPOINT_COUNT} endpoints.
						</Text>
					</Heading>
				</Stack>
				<Grid
					templateColumns="repeat(5, 1fr)"
					gap={6}
					justifyItems={'center'}
					alignItems={'center'}
				>
					{INTEGRATIONS.map((integration) => (
						<GridItem
							key={integration.id}
							title={integration.id}
							width={{ base: '50px', md: '70px' }}
							height={{ base: '50px', md: '70px' }}
						>
							<Center
								width={'100%'}
								height={'100%'}
								bgColor={integration.light ? '#1A202C' : 'white'}
								borderRadius={10}
								borderColor="flethy.purple"
								borderWidth={3}
								padding={'0.5em'}
							>
								<Image
									src={`integrations/${integration.file}`}
									alt={integration.id}
									maxHeight={'100%'}
								/>
							</Center>
						</GridItem>
					))}
				</Grid>
			</Stack>
		</Container>
	)
})
