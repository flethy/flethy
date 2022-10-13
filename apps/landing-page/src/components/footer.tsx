import {
	Box,
	Button,
	Container,
	Link,
	Stack,
	Text,
	useColorMode,
	useColorModeValue,
	VisuallyHidden,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { FaTwitter } from 'react-icons/fa'
import { EXTERNAL_LINKS } from '../constants/externallinks.const'
import { useMst } from '../models/root'
import routes from '../routes'

const SocialButton = ({
	children,
	label,
	href,
}: {
	children: ReactNode
	label: string
	href: string
}) => {
	return (
		<Button
			bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
			rounded={'full'}
			w={8}
			h={8}
			cursor={'pointer'}
			as={'a'}
			href={href}
			display={'inline-flex'}
			alignItems={'center'}
			justifyContent={'center'}
			transition={'background 0.3s ease'}
			_hover={{
				bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
			}}
		>
			<VisuallyHidden>{label}</VisuallyHidden>
			{children}
		</Button>
	)
}

export default observer(() => {
	const { colorMode, toggleColorMode } = useColorMode()
	const { t } = useTranslation('app')
	const {
		router,
		root: {},
	} = useMst()

	return (
		<>
			<Box
				borderTopWidth={1}
				borderStyle={'solid'}
				borderColor={useColorModeValue('gray.200', 'gray.700')}
			>
				<Container
					as={Stack}
					maxW={'6xl'}
					py={4}
					direction={{ base: 'column', md: 'row' }}
					spacing={4}
					justify={{ md: 'space-between' }}
					align={{ md: 'center' }}
				>
					<Text>© {new Date().getFullYear()} flethy. All rights reserved</Text>
					<Link
						px={2}
						py={1}
						rounded={'md'}
						href="#"
						_hover={{
							textDecoration: 'none',
							bg: useColorModeValue('gray.200', 'gray.700'),
						}}
						onClick={() => {
							router.goTo(routes.pitch)
						}}
					>
						{t('footer.pitchdeck')}
					</Link>
					<Stack direction={'row'} spacing={6}>
						<SocialButton label={'Twitter'} href={EXTERNAL_LINKS.TWITTER}>
							<FaTwitter />
						</SocialButton>
						{/* <SocialButton label={'YouTube'} href={'#'}>
							<FaYoutube />
						</SocialButton>
						<SocialButton label={'Instagram'} href={'#'}>
							<FaInstagram />
						</SocialButton> */}
					</Stack>
				</Container>
			</Box>
		</>
		// <div>
		// 	<h1 className="text-3xl font-bold">{t('title')}</h1>
		// 	<div>
		// 		<HStack gap={3}>
		// 			<Link className="underline" route={routes.home} router={router}>
		// 				{t('navbar.home')}
		// 			</Link>
		// 		</HStack>
		// 	</div>
		// </div>
	)
})
