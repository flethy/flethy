import {
	ChatIcon,
	InfoOutlineIcon,
	PlusSquareIcon,
	SettingsIcon,
	StarIcon,
} from '@chakra-ui/icons'
import {
	Box,
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Grid,
	GridItem,
	HStack,
	Image,
	Text,
	VStack,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { EXTERNAL_LINKS } from '../../constants/externallinks.const'
import { getMedia } from '../../constants/media.const'
import { useMst } from '../../models/root'
import routes from '../../routes'

interface MenuItemProps {
	id: string
	label: string
	onClick: () => void
	icon: React.ReactElement
}

export default observer(() => {
	const { t } = useTranslation('app')
	const {
		root: {
			api,
			components: { menu: component },
			modals: { apiConfigShow },
			pages: { home },
		},
		router,
	} = useMst()

	const MenuItems: MenuItemProps[] = [
		{
			id: 'home',
			label: t('menu.home'),
			onClick: () => {
				router.goTo(routes.home, api.workspaces.getContext())
			},
			icon: <Image src={getMedia('logo')} w={5} />,
		},
		{
			id: 'secrets',
			label: t('menu.secrets'),
			onClick: () => {
				router.goTo(routes.secrets, api.workspaces.getContext())
			},
			icon: <Image src={getMedia('icon-secrets')} w={5} />,
		},
		{
			id: 'workflows',
			label: t('menu.workflows'),
			onClick: () => {
				router.goTo(routes.workflows, api.workspaces.getContext())
			},
			icon: <Image src={getMedia('icon-workflows')} w={5} />,
		},
		{
			id: 'tokens',
			label: t('menu.tokens'),
			onClick: () => {
				router.goTo(routes.tokens, api.workspaces.getContext())
			},
			icon: <Image src={getMedia('icon-tokens')} w={5} />,
		},
		{
			id: 'crons',
			label: t('menu.crons'),
			onClick: () => {
				router.goTo(routes.crons, api.workspaces.getContext())
			},
			icon: <Image src={getMedia('icon-crons')} w={5} />,
		},
	]

	const MenuBottomItems: MenuItemProps[] = [
		{
			id: 'docs',
			label: t('menu.docs'),
			onClick: () => {
				window.open(EXTERNAL_LINKS.DOCS)
			},
			icon: <InfoOutlineIcon />,
		},
		{
			id: 'feedback',
			label: t('menu.feedback'),
			onClick: () => {
				window.open(EXTERNAL_LINKS.FEEDBACK)
			},
			icon: <ChatIcon />,
		},
		{
			id: 'api',
			label: t('menu.api'),
			onClick: () => {
				apiConfigShow.open({})
			},
			icon: <SettingsIcon />,
		},
		{
			id: 'new',
			label: t('menu.new'),
			onClick: () => {
				window.open(EXTERNAL_LINKS.NEW_GITHUB_ISSUE)
			},
			icon: <PlusSquareIcon />,
		},
		{
			id: 'star',
			label: t('menu.star'),
			onClick: () => {
				window.open(EXTERNAL_LINKS.GITHUB)
			},
			icon: <StarIcon />,
		},
	]

	const menu = (
		<Drawer
			isOpen={component.isOpen}
			placement="left"
			onClose={() => component.toggle(false)}
		>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>
					<HStack>
						<Image src={getMedia('logo')} w={5} />
						<Text>{t('menu.title')}</Text>
					</HStack>
				</DrawerHeader>

				<DrawerBody h={'full'}>
					<Grid
						templateColumns="1fr"
						justifyContent={'space-between'}
						h={'full'}
					>
						<GridItem>
							<VStack>
								{MenuItems.map((item) => {
									return (
										<Box w={'full'} key={item.id}>
											<Button
												justifyContent={'flex-start'}
												w={'full'}
												variant={'outline'}
												leftIcon={item.icon}
												onClick={() => {
													item.onClick()
													component.toggle(false)
												}}
											>
												{item.label}
											</Button>
										</Box>
									)
								})}
							</VStack>
						</GridItem>
						<GridItem>
							<VStack>
								{MenuBottomItems.map((item) => {
									return (
										<Box w={'full'} key={item.id}>
											<Button
												justifyContent={'flex-start'}
												w={'full'}
												variant={'outline'}
												leftIcon={item.icon}
												onClick={() => {
													item.onClick()
													component.toggle(false)
												}}
											>
												{item.label}
											</Button>
										</Box>
									)
								})}
							</VStack>
						</GridItem>
					</Grid>
				</DrawerBody>

				<DrawerFooter>
					{/* Feedback, Docs, etc */}
					{/* <Text>nice</Text> */}
					<Button
						variant="outline"
						mr={3}
						onClick={() => component.toggle(false)}
					>
						{t('buttons.close')}
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)

	return menu
})
