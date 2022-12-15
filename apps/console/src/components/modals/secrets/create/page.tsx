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
			modals: { secretsCreate },
		},
	} = useMst()

	const form = (
		<VStack>
			<FormControl isInvalid={!secretsCreate.formValidation.isValid('key')}>
				<FormLabel>{t('modals.secrets.create.form.key.label')}</FormLabel>
				<Input
					type={'text'}
					value={secretsCreate.form.key}
					onChange={(event) =>
						secretsCreate.update({ key: event.target.value })
					}
				/>
				{!secretsCreate.formValidation.isValid('key') ? (
					<FormErrorMessage>
						{secretsCreate.formValidation.errorMessage('key')}
					</FormErrorMessage>
				) : (
					<FormHelperText>
						{t('modals.secrets.create.form.key.helperText')}
					</FormHelperText>
				)}
			</FormControl>
			<FormControl isInvalid={!secretsCreate.formValidation.isValid('value')}>
				<FormLabel>{t('modals.secrets.create.form.value.label')}</FormLabel>
				<Input
					type={'password'}
					value={secretsCreate.form.value}
					onChange={(event) =>
						secretsCreate.update({ value: event.target.value })
					}
				/>
				{!secretsCreate.formValidation.isValid('value') ? (
					<FormErrorMessage>
						{secretsCreate.formValidation.errorMessage('value')}
					</FormErrorMessage>
				) : (
					<FormHelperText>
						{t('modals.secrets.create.form.value.helperText')}
					</FormHelperText>
				)}
			</FormControl>
		</VStack>
	)

	const component = (
		<ModalWrapper
			title={t('modals.secrets.create.title')}
			isOpen={secretsCreate.isOpen}
			children={form}
			isSubmitting={{
				loading: secretsCreate.isSubmitting,
				loadingText: t('modals.secrets.create.submitting'),
			}}
			close={{
				label: t('modals.secrets.create.cancel') ?? '',
				onClick: () => {
					secretsCreate.close()
				},
			}}
			submit={{
				label: t('modals.secrets.create.submit') ?? '',
				disabled: !secretsCreate.formValidation.valid,
				onClick: () => {
					secretsCreate.submit()
				},
			}}
		/>
	)

	return component
})
