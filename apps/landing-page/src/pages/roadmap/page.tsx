import {
	Box,
	Button,
	Container,
	Heading,
	HStack,
	Stack,
	Tag,
	Text,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { Link } from 'mobx-router'
import { useTranslation } from 'react-i18next'
import roadmap from '../../../../../docs/meta/roadmap.json'
import FancyHeading from '../../components/molecules/fancy-heading/FancyHeading'
import { formatDate, formatDay, formatMonth } from '../../helpers/ui'
import { useMst } from '../../models/root'
import routes from '../../routes'

export default observer(() => {
	const { t } = useTranslation('app')
	const { router } = useMst()

	const Title = (item: any) => {
		if (item.item.route) {
			const route = item.item.route
			switch (route.type) {
				case 'integration':
					return (
						<Button
							variant={'link'}
							onClick={() => router.goTo(routes.integration, { id: route.id })}
						>
							{item.item.title}
						</Button>
					)
				case 'usecase':
					return (
						<Button
							variant={'link'}
							onClick={() => router.goTo(routes.useCase, { id: route.id })}
						>
							{item.item.title}
						</Button>
					)
			}
		}
		return <Text>{item.item.title}</Text>
	}

	const app = (
		<Container>
			<FancyHeading
				textA={t('pages.roadmap.title')}
				textB={t('pages.roadmap.subtitle')}
			/>
			<Stack mt={6} gap={2}>
				{upcoming().length > 0 && (
					<>
						<Heading>{String(t('pages.roadmap.upcoming'))}</Heading>
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
						<Heading>{String(t('pages.roadmap.completed'))}</Heading>
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
									<HStack>
										<Title item={item} />
										<Text fontWeight={'bold'}>
											{item.tags.map((tag, tagIndex) => {
												let bg = 'flethy.orange'
												switch (tag) {
													case 'flow':
													case 'designer':
													case 'execution':
														bg = 'flethy.lightpurple'
														break
													case 'landingpage':
														bg = 'flethy.purple'
														break
													case 'usecase':
														bg = 'blue.500'
														break
												}
												return (
													<Tag key={tagIndex} mx={1} bg={bg}>
														{tag}
													</Tag>
												)
											})}
										</Text>
									</HStack>
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
