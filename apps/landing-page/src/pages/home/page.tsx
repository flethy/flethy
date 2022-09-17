import { Box, Center, Heading, Stack, Text } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useMst } from '../../models/root'
import { useTranslation } from 'react-i18next'

export default observer(() => {
	const { t } = useTranslation('app')
	const {
		root: {
			pages: { home: page },
		},
	} = useMst()

	return (
		<Center h="100vh">
			<Stack textAlign={'center'}>
				<Heading as="h1" size="lg" mb={4}>
					{t('title')}
				</Heading>
				<Text>{t('description')}</Text>
				<Text>{t('home.stayTuned')}</Text>
			</Stack>
		</Center>
	)
})
