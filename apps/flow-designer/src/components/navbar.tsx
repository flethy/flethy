import { HStack } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { Link } from 'mobx-router'
import { useMst } from '../models/root'
import routes from '../routes'
import { useTranslation } from 'react-i18next'

export default observer(() => {
	const { t } = useTranslation('app')
	const {
		router,
		root: {},
	} = useMst()

	return (
		<div>
			<h1 className="text-3xl font-bold">{t('title')}</h1>
			<div>
				<HStack gap={3}>
					<Link className="underline" route={routes.home} router={router}>
						{t('navbar.home')}
					</Link>
					<Link className="underline" route={routes.cats} router={router}>
						{t('navbar.cats')}
					</Link>
				</HStack>
			</div>
		</div>
	)
})
