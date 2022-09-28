import { Box, Center, Heading, Stack, Text } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import Logo from '../../components/Logo'
import { useMst } from '../../models/root'

export default observer(() => {
	const { t } = useTranslation('app')
	const {
		root: {
			pages: { verification: page },
		},
	} = useMst()

	let content = <Text>{t('pages.verification.loading')}</Text>
	if (!page.isLoading()) {
		content = <Text>{t('pages.verification.thanks')}</Text>
	}

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
							{t('pages.verification.heading')}
						</Heading>
						{content}
					</Box>
				</Center>
			</Stack>
		</Center>
	)
})
