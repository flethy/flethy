import { Container, Heading, VStack } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { MediumHighlightBox } from '../../components/HighlightBox'
import { useMst } from '../../models/root'

export default observer(() => {
	const { t } = useTranslation('app')
	const {
		router,
		root: {
			api,
			pages: { tutorials: page },
		},
	} = useMst()

	const content = (
		<VStack w="full" align={'left'}>
			{page.getTutorials().map((tutorial) => (
				<MediumHighlightBox {...tutorial} />
			))}
		</VStack>
	)

	return (
		<>
			<Container maxW={'7xl'}>
				<VStack gap={6} align={'left'}>
					<Heading as={'h1'} size="xl">
						Tutorials
					</Heading>
					{content}
				</VStack>
			</Container>
		</>
	)
})
