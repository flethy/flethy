import { Container, Heading, VStack } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import Loading from '../../components/Loading'
import { useMst } from '../../models/root'
import AccessTokensBox from './components/AccessTokensBox'
import BeginnerTutorialBox from './components/BeginnerTutorialBox'
import CronsBox from './components/CronsBox'
import SecretsBox from './components/SecretsBox'
import TutorialsBox from './components/TutorialsBox'
import UseCasesBox from './components/UseCasesBox'
import WorkflowsBox from './components/WorkflowsBox'
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
				<VStack w="full" align={'left'}>
					{page.gettingStartedState('fresh') && (
						<>
							<BeginnerTutorialBox />
							<Heading as={'h2'} size={'md'}>
								Next
							</Heading>
						</>
					)}
					{page.gettingStartedState('workflows') && (
						<>
							<UseCasesBox />
							<Heading as={'h2'} size={'md'}>
								Next
							</Heading>
						</>
					)}
					<WorkflowsBox />
					<SecretsBox />
					<CronsBox />
					<AccessTokensBox />
					<TutorialsBox />
				</VStack>
			)
		}
	}

	return (
		<>
			<Container maxW={'7xl'}>
				<VStack gap={6} align={'left'}>
					<Heading as={'h1'} size="xl">
						Getting started
					</Heading>
					{content}
				</VStack>
			</Container>
		</>
	)
})
