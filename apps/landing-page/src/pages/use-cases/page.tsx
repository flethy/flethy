import { Button, Center, Stack, VStack } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import FancyHeading from '../../components/molecules/fancy-heading/FancyHeading'
import { USECASES } from '../../constants/usecases.const'
import { useMst } from '../../models/root'
import routes from '../../routes'

export default observer(() => {
	const { t } = useTranslation('app')
	const { router } = useMst()

	const content = (
		<>
			{USECASES.map((useCase) => (
				<Button
					key={useCase.id}
					variant="link"
					onClick={() => router.goTo(routes.useCase, { id: useCase.id })}
				>
					{useCase.title}
				</Button>
			))}
		</>
	)

	return (
		<Center>
			<Stack textAlign={'center'}>
				<FancyHeading
					textA={t('pages.useCases.title')}
					textB={t('pages.useCases.subtitle')}
				/>
				<Center py={5}>
					<VStack gap={5}>{content}</VStack>
				</Center>
			</Stack>
		</Center>
	)
})
