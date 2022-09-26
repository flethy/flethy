import {
	Box,
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
import EmailSubscription from '../../components/email-subscription/EmailSubscription'
import { API_COUNT } from '../../constants/api.const'
import { INTEGRATIONS } from '../../constants/integrations.const'
import { BOX } from '../../constants/style.const'
import { useMst } from '../../models/root'

export default observer(() => {
	const { t } = useTranslation('app')
	const {
		root: {
			pages: { home: page },
		},
	} = useMst()

	return (
		<Center>
			<Stack textAlign={'center'}>
				<Center marginTop={'5em'}>
					<Image src="favicon.webp" alt="logo" width="100px" />
				</Center>
				<Box
					padding={'2em'}
					background={
						' linear-gradient(30deg, rgba(238,117,36,1) 0%, rgba(204,63,107,1) 35%, rgba(163,55,146,1) 100%)'
					}
					width={{ base: '100vw', md: 'calc(100vw - 15px)' }}
				>
					<Heading as="h1" size="lg" mb={4}>
						{t('title')}
					</Heading>
					<Text>{t('description')}</Text>
					<Text>{t('home.stayTuned')}</Text>
				</Box>
				<Center>
					<Container>
						<Box mb={'1rem'}>
							<Image src="code-auth0.svg" alt="code example auth0" />
						</Box>
						<EmailSubscription />

						<Heading as="h1" size="lg" mt={'3rem'}>
							{API_COUNT} {t('home.integrations')}
						</Heading>
						<Box mt={'3rem'} mb={'3rem'}>
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
											borderRadius={BOX.borderRadius}
											borderColor={BOX.borderColor}
											borderWidth={BOX.borderWidth}
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
						</Box>
					</Container>
				</Center>
			</Stack>
		</Center>
	)
})
