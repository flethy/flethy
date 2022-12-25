import {
	Box,
	Button,
	Container,
	Flex,
	Heading,
	Image,
	Stack,
	Text,
	useClipboard,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import EmailSubscription from '../../components/email-subscription/EmailSubscription'
import { EXTERNAL_LINKS } from '../../constants/externallinks.const'
import { UTMUtils } from '../../helpers/utm'
import { useMst } from '../../models/root'
import routes from '../../routes'
import Hero from './hero'

export default observer(() => {
	const { t } = useTranslation('app')
	const {
		router,
		root: {
			pages: { home: page },
		},
	} = useMst()

	return (
		<>
			<Container maxW={'7xl'}>
				<Hero />
				<Stack
					align={'center'}
					spacing={{ base: 8, md: 10 }}
					py={{ base: 15, md: 20 }}
					direction={{ base: 'column', md: 'row' }}
				>
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
								{String(t('pages.home.sections.connectors.heading1'))}
							</Text>
							<br />
							<Text as={'span'} color={'flethy.purple'}>
								{String(t('pages.home.sections.connectors.heading2'))}
							</Text>
						</Heading>
						<Text color={'gray.500'}>
							{String(t('pages.home.sections.connectors.description'))}
						</Text>
						<Stack
							spacing={{ base: 4, sm: 6 }}
							direction={{ base: 'column', sm: 'row' }}
						>
							<Button
								rounded={'full'}
								size={'lg'}
								fontWeight={'normal'}
								px={6}
								colorScheme={'orange'}
								bg={'flethy.orange'}
								_hover={{ bg: 'flethy.purple' }}
								onClick={() =>
									window.open(
										UTMUtils.assign(EXTERNAL_LINKS.FLETHY_CONNECTORS_NPM, {
											utm_source: 'flethy',
											utm_medium: 'landingpage',
											utm_content: 'buttonlink',
										}),
									)
								}
							>
								Get started
							</Button>
							<Button
								rounded={'full'}
								size={'lg'}
								fontWeight={'normal'}
								px={6}
								onClick={() => router.goTo(routes.integrations)}
							>
								Show Integrations
							</Button>
						</Stack>
					</Stack>
					<Flex
						flex={1}
						justify={'center'}
						align={'center'}
						position={'relative'}
						w={'full'}
					>
						<Box
							position={'relative'}
							// height={'300px'}
							rounded={'2xl'}
							boxShadow={'2xl'}
							width={'full'}
							overflow={'hidden'}
						>
							<Image
								alt={'Code Example'}
								fit={'cover'}
								align={'center'}
								w={'100%'}
								// h={'100%'}
								src={'/code-auth0.webp'}
							/>
						</Box>
					</Flex>
				</Stack>
			</Container>
			<Container maxW={'7xl'}>
				<Stack
					align={'center'}
					spacing={{ base: 8, md: 10 }}
					direction={{ base: 'column', md: 'row' }}
				>
					<Flex
						flex={1}
						justify={'center'}
						align={'center'}
						position={'relative'}
						w={'full'}
					>
						<Box
							position={'relative'}
							// height={'300px'}
							rounded={'2xl'}
							boxShadow={'2xl'}
							width={'full'}
							overflow={'hidden'}
						>
							<Image
								alt={'Code Example'}
								fit={'cover'}
								align={'center'}
								w={'100%'}
								// h={'100%'}
								src={'/code-flow-example.webp'}
							/>
						</Box>
					</Flex>
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
								{String(t('pages.home.sections.flow.heading1'))}
							</Text>
							<br />
							<Text as={'span'} color={'flethy.purple'}>
								{String(t('pages.home.sections.flow.heading2'))}
							</Text>
						</Heading>
						<Text color={'gray.500'}>
							{String(t('pages.home.sections.flow.description'))}
						</Text>
						<Stack
							spacing={{ base: 4, sm: 6 }}
							direction={{ base: 'column', sm: 'row' }}
						>
							<Button
								rounded={'full'}
								size={'lg'}
								fontWeight={'normal'}
								px={6}
								colorScheme={'orange'}
								bg={'flethy.orange'}
								_hover={{ bg: 'flethy.purple' }}
								onClick={() =>
									window.open(
										UTMUtils.assign(EXTERNAL_LINKS.FLETHY_FLOW_NPM, {
											utm_source: 'flethy',
											utm_medium: 'landingpage',
											utm_content: 'buttonlink',
										}),
									)
								}
							>
								Get started
							</Button>
							{/* <Button rounded={'full'} size={'lg'} fontWeight={'normal'} px={6}>
							How It Works
						</Button> */}
						</Stack>
					</Stack>
				</Stack>
			</Container>
			<Container maxW={'7xl'}>
				<Stack
					align={'center'}
					spacing={{ base: 8, md: 10 }}
					py={{ base: 15, md: 20 }}
					direction={{ base: 'column', md: 'row' }}
				>
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
								{String(t('pages.home.sections.saas.heading1'))}
							</Text>
							<br />
							<Text as={'span'} color={'flethy.purple'}>
								{String(t('pages.home.sections.saas.heading2'))}
							</Text>
						</Heading>
						<Text color={'gray.500'}>
							{String(t('pages.home.sections.saas.description'))}
						</Text>
					</Stack>
					<Flex
						flex={1}
						justify={'center'}
						align={'center'}
						position={'relative'}
						w={'full'}
					>
						<Box
							position={'relative'}
							// height={'300px'}
							rounded={'2xl'}
							boxShadow={'2xl'}
							width={'full'}
							overflow={'hidden'}
						>
							<Image
								alt={'Code Example'}
								fit={'cover'}
								align={'center'}
								w={'100%'}
								// h={'100%'}
								src={'/flowdesigner.webp'}
							/>
						</Box>
					</Flex>
				</Stack>
			</Container>
			<Container maxW={'7xl'} id="email-subscription">
				<Stack
					align={'center'}
					spacing={{ base: 8, md: 10 }}
					direction={{ base: 'column', md: 'row' }}
				>
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
								{String(t('pages.home.sections.subscription.heading1'))}
							</Text>
							<br />
							<Text as={'span'} color={'flethy.purple'}>
								{String(t('pages.home.sections.subscription.heading2'))}
							</Text>
						</Heading>
					</Stack>
					<EmailSubscription />
				</Stack>
			</Container>
		</>
	)
})
