import { Button, Center, Grid, GridItem, Stack } from '@chakra-ui/react'
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
				<GridItem w="100%" h="20" key={useCase.id}>
					<Button
						key={useCase.id}
						variant="outline"
						w="100%"
						h="100%"
						onClick={() => router.goTo(routes.useCase, { id: useCase.id })}
					>
						{useCase.title}
					</Button>
				</GridItem>
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
				<Grid
					py={5}
					templateColumns={{
						base: '1fr',
						md: 'repeat(2, 1fr)',
						lg: 'repeat(3, 1fr)',
						xl: 'repeat(4, 1fr)',
					}}
					gap={6}
				>
					{content}
				</Grid>
			</Stack>
		</Center>
	)
})
