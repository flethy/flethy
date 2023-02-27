import { Container } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import FancyHeading from '../../components/molecules/fancy-heading/FancyHeading'

export default observer((props: { title: string; subtitle: string }) => {
	const { t } = useTranslation('app')
	const app = (
		<Container>
			<FancyHeading textA={props.title} textB={props.subtitle} />
		</Container>
	)
	return app
})
