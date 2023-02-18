import { MoonIcon, SearchIcon, SunIcon } from '@chakra-ui/icons'
import {
	Avatar,
	Box,
	Button,
	Flex,
	HStack,
	Icon,
	IconButton,
	Kbd,
	Link,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Stack,
	Tag,
	Text,
	useColorMode,
	useColorModeValue,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { CgMenuGridR } from 'react-icons/cg'
import { useMst } from '../models/root'
import routes from '../routes'
import Logo from './Logo'

const NavbarLinks: any[] = [
	// {
	// 	id: 'integrations',
	// 	name: 'Integrations',
	// 	route: routes.integrations,
	// },
]

export default observer(() => {
	const { colorMode, toggleColorMode } = useColorMode()
	const { t } = useTranslation('app')
	const {
		router,
		root: {
			auth,
			api,
			pages: { home },
			components: { quickSearch, menu },
			modals: { apiConfigShow },
		},
	} = useMst()

	const bgLink = useColorModeValue('gray.200', 'gray.700')
	const bgBox = useColorModeValue('gray.100', 'gray.900')

	if (auth.isAuthenticated && auth.user) {
		api.user.init(auth.user)
	}

	return (
		<>
			<Box bg={bgBox} px={4}>
				<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
					<HStack>
						<IconButton
							aria-label="Open menu"
							icon={<Icon width={'8'} height={'8'} as={CgMenuGridR} />}
							onClick={() => menu.toggle()}
						/>
						<HStack
							style={{ cursor: 'pointer' }}
							onClick={() => router.goTo(routes.home)}
						>
							<Logo width={'12'} />
							<Text fontWeight={'bold'}>{t('title')}</Text>
							{api.workspaces.getEnrichedContext() && (
								<Text>
									{api.workspaces.getEnrichedContext()?.workspace.name} /{' '}
									{api.workspaces.getEnrichedContext()?.project.name}
								</Text>
							)}
						</HStack>
						<HStack
							as={'nav'}
							spacing={4}
							display={{ base: 'none', md: 'flex' }}
						>
							<Button onClick={() => apiConfigShow.open({})}>API</Button>
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

							<Menu>
								<MenuButton>
									<Avatar
										size={'sm'}
										src={api.user.picture ?? undefined}
										cursor={'pointer'}
									/>
								</MenuButton>
								<MenuList>
									<MenuItem as="a" onClick={() => auth.logout()}>
										Logout
									</MenuItem>
								</MenuList>
							</Menu>
						</Stack>
					</Flex>
				</Flex>
			</Box>
		</>
	)
})
