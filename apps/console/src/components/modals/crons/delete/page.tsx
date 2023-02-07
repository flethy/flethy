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
			modals: { cronsDelete },
		},
	} = useMst()

	const form = (
		<VStack>
			<Text>{t('modals.crons.delete.description')}</Text>
			<Text>{cronsDelete.form.name}</Text>
		</VStack>
	)

	const component = (
		<ModalWrapper
			title={t('modals.crons.delete.title')}
			isOpen={cronsDelete.isOpen}
			children={form}
			isSubmitting={{
				loading: cronsDelete.isSubmitting,
				loadingText: t('modals.crons.delete.submitting'),
			}}
			close={{
				label: t('modals.crons.delete.cancel') ?? '',
				onClick: () => {
					cronsDelete.close()
				},
			}}
			submit={{
				label: t('modals.crons.delete.submit') ?? '',
				onClick: () => {
					cronsDelete.submit()
				},
			}}
		/>
	)

	return component
})
