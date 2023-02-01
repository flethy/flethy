import { Container, Heading, VStack } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import Loading from '../../components/Loading'
import { useMst } from '../../models/root'
import HomeSections from './HomeSections'
import HomeTemplates from './HomeTemplates'
import Onboarding from './Onboarding'

export default observer(() => {
	const { t } = useTranslation('app')
	const {
		router,
		root: {
			api,
			pages: { home: page },
		},
	} = useMst()

	let content = <></>

	if (page.isLoading()) {
		content = <Loading />
	} else {
		if (!page.isOnboarded()) {
			content = <Onboarding />
		} else {
			content = (
				<>
					<HomeSections />
					<HomeTemplates />
					{/* <HomeUseCases /> */}
				</>
			)
		}
	}

	return (
		<>
			<Container maxW={'7xl'}>
				<VStack gap={6}>
					<Heading as={'h1'} size="4xl">
						Welcome to the Console
					</Heading>
					{content}
				</VStack>
			</Container>
		</>
	)
})
