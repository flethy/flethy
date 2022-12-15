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
			modals: { secretsDelete },
		},
	} = useMst()

	const form = (
		<VStack>
			<Text>{t('modals.secrets.delete.description')}</Text>
			<Text>{secretsDelete.form.key}</Text>
		</VStack>
	)

	const component = (
		<ModalWrapper
			title={t('modals.secrets.delete.title')}
			isOpen={secretsDelete.isOpen}
			children={form}
			isSubmitting={{
				loading: secretsDelete.isSubmitting,
				loadingText: t('modals.secrets.delete.submitting'),
			}}
			close={{
				label: t('modals.secrets.delete.cancel') ?? '',
				onClick: () => {
					secretsDelete.close()
				},
			}}
			submit={{
				label: t('modals.secrets.delete.submit') ?? '',
				onClick: () => {
					secretsDelete.submit()
				},
			}}
		/>
	)

	return component
})
