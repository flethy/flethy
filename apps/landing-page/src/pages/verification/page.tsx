import { Center, Heading, Stack, Text } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
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
		<Center marginTop={'5rem'}>
			<Stack textAlign={'center'}>
				<Heading as="h1" size="lg" mb={4}>
					{t('pages.verification.heading')}
				</Heading>
				{content}
			</Stack>
		</Center>
	)
})
