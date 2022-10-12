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

	return (
		<>
			<Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
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
							<Link
								px={2}
								py={1}
								rounded={'md'}
								_hover={{
									textDecoration: 'none',
									bg: useColorModeValue('gray.200', 'gray.700'),
								}}
								onClick={() => {
									console.log('test')
									router.goTo(routes.integrations)
								}}
							>
								Integrations
							</Link>
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
