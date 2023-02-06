import {
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Input,
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
			modals: { cronsCreate: modal },
		},
	} = useMst()

	let form = (
		<VStack>
			<FormControl isInvalid={!modal.formValidation.isValid('name')}>
				<FormLabel>{t('modals.crons.create.form.name.label')}</FormLabel>
				<Input
					type={'text'}
					value={modal.form.name}
					onChange={(event) => modal.update({ name: event.target.value })}
				/>
				{!modal.formValidation.isValid('name') ? (
					<FormErrorMessage>
						{modal.formValidation.errorMessage('name')}
					</FormErrorMessage>
				) : (
					<FormHelperText>
						{t('modals.crons.create.form.name.helperText')}
					</FormHelperText>
				)}
			</FormControl>
			<FormControl isInvalid={!modal.formValidation.isValid('expression')}>
				<FormLabel>{t('modals.crons.create.form.expression.label')}</FormLabel>
				<Input
					type={'text'}
					value={modal.form.expression}
					onChange={(event) => modal.update({ expression: event.target.value })}
				/>
				{!modal.formValidation.isValid('expression') ? (
					<FormErrorMessage>
						{modal.formValidation.errorMessage('expression')}
					</FormErrorMessage>
				) : (
					<FormHelperText>
						{t('modals.crons.create.form.expression.helperText')}
					</FormHelperText>
				)}
			</FormControl>
		</VStack>
	)

	let submitLabel = t('modals.crons.create.submit') ?? ''

	const component = (
		<ModalWrapper
			title={t('modals.crons.create.title')}
			isOpen={modal.isOpen}
			children={form}
			isSubmitting={{
				loading: modal.isSubmitting,
				loadingText: t('modals.crons.create.submitting'),
			}}
			close={{
				label: t('modals.crons.create.cancel') ?? '',
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
