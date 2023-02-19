import { ChevronDownIcon, CopyIcon } from '@chakra-ui/icons'
import {
	Box,
	Button,
	Code,
	Heading,
	HStack,
	IconButton,
	Image,
	Stack,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	useClipboard,
	useColorModeValue,
	VStack,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { useMst } from '../../models/root'
import routes from '../../routes'

export default observer(() => {
	const { t } = useTranslation('app')
	const { onCopy, setValue, hasCopied } = useClipboard('')
	const {
		router,
		root: {
			pages: { home: page },
		},
	} = useMst()

	return (
		<Box minHeight={{ md: 'calc(100vh - 64px)' }}>
			<VStack gap={3} mt={12}>
				<Heading
					as={'h1'}
					lineHeight={1.1}
					fontWeight={'extrabold'}
					fontSize={{ base: '3xl', sm: '5xl', lg: '7xl' }}
					width={'full'}
				>
					<VStack>
						<HStack>
							<Text>{t('home.hero.headline1')}</Text>
							<Text> </Text>
							<Text color={'flethy.purple'}>{t('home.hero.headline2')}</Text>
						</HStack>
						<HStack>
							<Text textAlign={'center'}>{t('home.hero.subheadline')}</Text>
						</HStack>
					</VStack>
				</Heading>
				<VStack>
					<Text
						fontSize={{ base: 'xl', sm: '2xl', lg: '3xl' }}
						textAlign={'center'}
					>
						{t('home.hero.subsubheadline')}
					</Text>
				</VStack>
				<Stack direction={{ base: 'column', md: 'row' }}>
					<Button
						rounded={'full'}
						size={'lg'}
						fontWeight={'normal'}
						px={6}
						colorScheme={'orange'}
						bg={'flethy.orange'}
						_hover={{ bg: 'flethy.purple' }}
						onClick={() => router.goTo(routes.playground)}
						// onClick={() =>
						// 	window.open(
						// 		UTMUtils.assign(EXTERNAL_LINKS.FLETHY_CONNECTORS_NPM, {
						// 			utm_source: 'flethy',
						// 			utm_medium: 'landingpage',
						// 			utm_content: 'buttonlink',
						// 		}),
						// 	)
						// }
					>
						{t('home.hero.cta.playground')}
					</Button>
					<Button
						rounded={'full'}
						size={'lg'}
						fontWeight={'normal'}
						px={6}
						colorScheme={'orange'}
						variant={'outline'}
						_hover={{ bg: 'flethy.purple' }}
						onClick={() => page.initialisePage({ emailSubscription: true })}
					>
						{t('home.hero.cta.earlyAccess')}
					</Button>
				</Stack>

				<Tabs>
					<TabList>
						{page.installScripts().map((script) => (
							<Tab key={script.manager}>{script.manager}</Tab>
						))}
					</TabList>

					<TabPanels>
						{page.installScripts().map((script) => (
							<TabPanel key={script.manager}>
								<Code p={3}>{script.script}</Code>
								<IconButton
									mx={1}
									aria-label="Copy to Clipboard"
									icon={<CopyIcon />}
									disabled={hasCopied}
									size={'xs'}
									onClick={() => {
										setValue(script.script)
										onCopy()
									}}
								/>
							</TabPanel>
						))}
					</TabPanels>
				</Tabs>

				<Image
					src={useColorModeValue('home-light.png', 'home-dark.png')}
					alt="Home"
				/>

				<Box pt={20} display={{ base: 'none', md: 'inline-flex' }}>
					<ChevronDownIcon fontSize={'5xl'} />
				</Box>
			</VStack>
		</Box>
	)
})
