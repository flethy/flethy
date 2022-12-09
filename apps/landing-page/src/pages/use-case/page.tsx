import {
	Button,
	Center,
	Stack,
	VStack,
	Text,
	Container,
	Heading,
	Tag,
	Box,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import FancyHeading from '../../components/molecules/fancy-heading/FancyHeading'
import SyntaxHighlight from '../../components/SyntaxHighlight'
import { USECASES } from '../../constants/usecases.const'
import { useMst } from '../../models/root'
import routes from '../../routes'

export default observer(() => {
	const { t } = useTranslation('app')
	const {
		root: {
			pages: { useCase: page },
		},
		router,
	} = useMst()

	const content = page.getContent()

	if (!content) {
		return (
			<Center>
				<Stack textAlign={'center'}>
					<FancyHeading
						textA="Sorry, use case not found"
						textB="Try another one!"
					/>
				</Stack>
			</Center>
		)
	}

	const otherUseCases = (
		<VStack>
			{USECASES.filter((useCase) => useCase.id !== content.id).map(
				(useCase) => (
					<Button
						key={useCase.id}
						variant="link"
						onClick={() => router.goTo(routes.useCase, { id: useCase.id })}
					>
						{useCase.title}
					</Button>
				),
			)}
		</VStack>
	)

	return (
		<Container>
			<Center>
				<Stack textAlign={'center'}>
					<FancyHeading textA={content.title} textB="with flethy" />
					<Center py={5}>
						<VStack gap={5} textAlign={'left'}>
							{content.contents.map((item, index) => (
								<Text key={index}>{item}</Text>
							))}
							<VStack gap={2}>
								<Heading size={'md'} as={'h3'}>
									Use the following kinds
								</Heading>
								{content.kinds.map((item, index) => (
									<Tag>{item}</Tag>
								))}
							</VStack>
							{content.flow && (
								<VStack gap={2}>
									<Heading size={'md'} as={'h3'}>
										Flow
									</Heading>
									<SyntaxHighlight
										code={JSON.stringify(content.flow, null, 2)}
										language="json"
									/>
								</VStack>
							)}
							<VStack gap={2}>
								<Heading size={'md'} as={'h3'}>
									Other use cases for flethy
								</Heading>
								{otherUseCases}
							</VStack>
						</VStack>
					</Center>
				</Stack>
			</Center>
		</Container>
	)
})
