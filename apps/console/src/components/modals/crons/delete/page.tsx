import { Text, VStack } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { useMst } from '../../../../models/root'
import ModalWrapper from '../../ModalWrapper'

export default observer(() => {
	const { t } = useTranslation('app')
	const {
		router,
		root: {
			api,
			modals: { tokensDelete },
		},
	} = useMst()

	const form = (
		<VStack>
			<Text>{t('modals.tokens.delete.description')}</Text>
			<Text>{tokensDelete.form.name}</Text>
		</VStack>
	)

	const component = (
		<ModalWrapper
			title={t('modals.tokens.delete.title')}
			isOpen={tokensDelete.isOpen}
			children={form}
			isSubmitting={{
				loading: tokensDelete.isSubmitting,
				loadingText: t('modals.tokens.delete.submitting'),
			}}
			close={{
				label: t('modals.tokens.delete.cancel') ?? '',
				onClick: () => {
					tokensDelete.close()
				},
			}}
			submit={{
				label: t('modals.tokens.delete.submit') ?? '',
				onClick: () => {
					tokensDelete.submit()
				},
			}}
		/>
	)

	return component
})
