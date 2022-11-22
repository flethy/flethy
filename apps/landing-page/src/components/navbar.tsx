import { EmailIcon, MoonIcon, SearchIcon, SunIcon } from '@chakra-ui/icons'
import {
	Box,
	Button,
	Flex,
	HStack,
	Kbd,
	Link,
	Stack,
	Text,
	useColorMode,
	useColorModeValue,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { useMst } from '../models/root'
import routes from '../routes'
import Logo from './Logo'

const NavbarLinks = [
	{
		id: 'integrations',
		name: 'Integrations',
		route: routes.integrations,
	},
	{
		id: 'roadmap',
		name: 'Roadmap',
		route: routes.roadmap,
	},
	{
		id: 'usecases',
		name: 'Use Cases',
		route: routes.useCases,
	},
]

export default observer(() => {
	const { colorMode, toggleColorMode } = useColorMode()
	const { t } = useTranslation('app')
	const {
		router,
		root: {
			pages: { home },
			components: { quickSearch },
		},
	} = useMst()

	const bgLink = useColorModeValue('gray.200', 'gray.700')
	const bgBox = useColorModeValue('gray.100', 'gray.900')

	return (
		<>
			<Box bg={bgBox} px={4}>
				<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
					<HStack>
						<HStack
							style={{ cursor: 'pointer' }}
							onClick={() => router.goTo(routes.home)}
						>
							<Logo width={'12'} />
							<Text fontWeight={'bold'}>{t('title')}</Text>
						</HStack>
						<HStack
							as={'nav'}
							spacing={4}
							display={{ base: 'none', md: 'flex' }}
						>
							{NavbarLinks.map((link) => (
								<Link
									key={link.id}
									px={2}
									py={1}
									rounded={'md'}
									href="#"
									_hover={{
										textDecoration: 'none',
										bg: bgLink,
									}}
									onClick={() => {
										router.goTo(link.route)
									}}
								>
									{link.name}
								</Link>
							))}
						</HStack>
					</HStack>

					<Flex alignItems={'center'}>
						<Stack direction={'row'} spacing={7}>
							<Button onClick={quickSearch.open}>
								<SearchIcon />
								<HStack ml={2} display={{ base: 'none', md: 'inline-flex' }}>
									<Kbd>ctrl</Kbd> <Text>+</Text> <Kbd>k</Kbd>
								</HStack>
							</Button>
							<Button onClick={toggleColorMode}>
								{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
							</Button>
							<Button
								display={{ base: 'none', md: 'inline-flex' }}
								fontSize={'sm'}
								fontWeight={600}
								color={'white'}
								bg={'flethy.orange'}
								_hover={{
									bg: 'flethy.purple',
								}}
								onClick={() => home.initialisePage({ emailSubscription: true })}
							>
								Subscribe
							</Button>
							<Button
								display={{ base: 'inline-flex', md: 'none' }}
								fontSize={'sm'}
								fontWeight={600}
								color={'white'}
								bg={'flethy.orange'}
								_hover={{
									bg: 'flethy.purple',
								}}
								onClick={() => home.initialisePage({ emailSubscription: true })}
							>
								<EmailIcon />
							</Button>
						</Stack>
					</Flex>
				</Flex>
			</Box>
		</>
	)
})
