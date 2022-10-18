import { Box, Container, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import roadmap from '../../../../../docs/meta/roadmap.json'
import FancyHeading from '../../components/molecules/fancy-heading/FancyHeading'
import { formatDate, formatDay, formatMonth } from '../../helpers/ui'

export default observer(() => {
	const { t } = useTranslation('app')
	const app = (
		<Container>
			<FancyHeading
				textA={t('pages.roadmap.title')}
				textB={t('pages.roadmap.subtitle')}
			/>
			<Stack mt={6} gap={2}>
				{upcoming().length > 0 && (
					<>
						<Heading>{t('pages.roadmap.upcoming')}</Heading>
						{upcoming().map((item, index) => (
							<Box key={index}>
								<Text fontWeight={'bold'}>{item.title}</Text>
								<Text>{item.description}</Text>
							</Box>
						))}
					</>
				)}
				{past().length > 0 && (
					<>
						<Heading>{t('pages.roadmap.completed')}</Heading>
						{past().map((item, index) => (
							<HStack key={index} gap={2}>
								<Box textAlign={'center'} w={'5rem'}>
									<Text fontWeight={'bold'} fontSize={'4xl'}>
										{formatDay(new Date(item.date))}
									</Text>
									<Text fontWeight={'bold'} fontSize={'xs'}>
										{formatMonth(new Date(item.date))} /{' '}
										{new Date(item.date).getFullYear()}
									</Text>
								</Box>
								<Box w={'25rem'}>
									<Text fontWeight={'bold'}>{item.title}</Text>
									<Text>{item.description}</Text>
								</Box>
							</HStack>
						))}
					</>
				)}
			</Stack>
		</Container>
	)
	return app
})

function upcoming() {
	return roadmap
		.filter((item) => new Date(item.date).getTime() > Date.now())
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

function past() {
	return roadmap
		.filter((item) => new Date(item.date).getTime() < Date.now())
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
