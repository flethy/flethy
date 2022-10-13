import { Box, Container, Image, Link } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import FancyHeading from '../../components/molecules/fancy-heading/FancyHeading'
import { EXTERNAL_LINKS } from '../../constants/externallinks.const'
import { useTranslation } from 'react-i18next'

export default observer(() => {
	const { t } = useTranslation('app')
	const app = (
		<Container>
			<FancyHeading
				textA={t('pages.pitchdeck.title')}
				textB={t('pages.pitchdeck.subtitle')}
			/>
			<Link href={EXTERNAL_LINKS.PITCHDECK} target={'_blank'}>
				<Box
					position={'relative'}
					rounded={4}
					boxShadow={'2xl'}
					overflow={'hidden'}
				>
					<Image src="/pitchdeck.webp" alt="pitch deck" />
				</Box>
			</Link>
		</Container>
	)
	return app
})
