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
	VStack,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { useMst } from '../../models/root'
import routes from '../../routes'

interface MenuItemProps {
	id: string
	label: string
	route: any
	params?: any
}

export default observer(() => {
	const { t } = useTranslation('app')
	const {
		root: {
			api,
			components: { menu: component },
			pages: { home },
		},
		router,
	} = useMst()

	const MenuItems: MenuItemProps[] = [
		{
			id: 'home',
			label: t('menu.home'),
			route: routes.home,
			params: api.workspaces.getContext(),
		},
		{
			id: 'secrets',
			label: t('menu.secrets'),
			route: routes.secrets,
			params: api.workspaces.getContext(),
		},
		{
			id: 'workflows',
			label: t('menu.workflows'),
			route: routes.workflows,
			params: api.workspaces.getContext(),
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
				<DrawerHeader>{t('menu.title')}</DrawerHeader>

				<DrawerBody>
					<VStack>
						{MenuItems.map((item) => (
							<Box w={'full'} key={item.id}>
								<Button
									variant={'link'}
									onClick={() => {
										router.goTo(item.route, item.params)
										component.toggle(false)
									}}
								>
									{item.label}
								</Button>
							</Box>
						))}
					</VStack>
				</DrawerBody>

				<DrawerFooter>
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
