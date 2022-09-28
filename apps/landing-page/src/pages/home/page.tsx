import {
	Box,
	Button,
	Center,
	Collapse,
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
import Carousel, { ImageSource } from '../../components/carousel/Carousel'
import EmailSubscription from '../../components/email-subscription/EmailSubscription'
import Logo from '../../components/Logo'
import { API_COUNT } from '../../constants/api.const'
import { INTEGRATIONS } from '../../constants/integrations.const'
import { BOX } from '../../constants/style.const'
import { useMst } from '../../models/root'

const images: ImageSource[] = [
	{
		src: 'code-auth0.webp',
		alt: 'Code Example for auth0',
		id: 'auth0',
	},
	{
		src: 'code-supabase.webp',
		alt: 'Code Example for SupaBase',
		id: 'supabase',
	},
	{
		src: 'code-web3storage.webp',
		alt: 'Code Example for Web3.Storage',
		id: 'web3storage',
	},
]

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
				<Logo marginTop="5em" />
				<Center>
					<Box
						padding={'2em'}
						background={'flethy.bannerbg'}
						width={{ base: '100vw', md: 'calc(100vw - 15px)' }}
					>
						<Heading as="h1" size="lg" mb={4}>
							{t('title')}
						</Heading>
						<Text>{t('description')}</Text>
						<Text mb={2}>{t('home.stayTuned')}</Text>
						<EmailSubscription />
					</Box>
				</Center>
				<Center>
					<Container>
						<Carousel images={images} />
						<Heading as="h1" size="lg">
							{API_COUNT} {t('home.integrations')}
						</Heading>
						<Box mt={'3rem'} mb={'3rem'}>
							<Collapse startingHeight={500} in={page.showMore}>
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
							</Collapse>
						</Box>
						<Button onClick={() => page.toggleShowMore()} mb={5}>
							{page.showMore ? t('general.showLess') : t('general.showMore')}
						</Button>
					</Container>
				</Center>
			</Stack>
		</Center>
	)
})
