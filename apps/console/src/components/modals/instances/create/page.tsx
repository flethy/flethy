import {
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Textarea,
	VStack,
} from '@chakra-ui/react'
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
			modals: { instancesCreate: modal },
		},
	} = useMst()

	let form = (
		<VStack>
			<FormControl isInvalid={!modal.formValidation.isValid('payload')}>
				<FormLabel>{t('modals.instances.create.form.payload.label')}</FormLabel>
				<Textarea
					placeholder={String(
						t('modals.instances.create.form.payload.placeholder'),
					)}
					value={modal.form.payload}
					onChange={(event) => modal.update({ payload: event.target.value })}
				/>
				{!modal.formValidation.isValid('payload') ? (
					<FormErrorMessage>
						{modal.formValidation.errorMessage('payload')}
					</FormErrorMessage>
				) : (
					<FormHelperText>
						{t('modals.instances.create.form.payload.helperText')}
					</FormHelperText>
				)}
			</FormControl>
		</VStack>
	)

	let submitLabel = t('modals.instances.create.submit') ?? ''

	const component = (
		<ModalWrapper
			title={t('modals.instances.create.title')}
			isOpen={modal.isOpen}
			children={form}
			isSubmitting={{
				loading: modal.isSubmitting,
				loadingText: t('modals.instances.create.submitting'),
			}}
			close={{
				label: t('modals.instances.create.cancel') ?? '',
				onClick: () => {
					modal.close()
				},
			}}
			submit={{
				label: submitLabel,
				disabled: !modal.formValidation.valid,
				onClick: () => {
					modal.submit()
				},
			}}
		/>
	)

	return component
})
