import {
	Checkbox,
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
			modals: { tokensCreate },
		},
	} = useMst()

	const form = (
		<VStack>
			<FormControl isInvalid={!tokensCreate.formValidation.isValid('name')}>
				<FormLabel>{t('modals.tokens.create.form.name.label')}</FormLabel>
				<Input
					type={'text'}
					value={tokensCreate.form.name}
					onChange={(event) =>
						tokensCreate.update({ name: event.target.value })
					}
				/>
				{!tokensCreate.formValidation.isValid('name') ? (
					<FormErrorMessage>
						{tokensCreate.formValidation.errorMessage('name')}
					</FormErrorMessage>
				) : (
					<FormHelperText>
						{t('modals.tokens.create.form.name.helperText')}
					</FormHelperText>
				)}
			</FormControl>
			<FormControl isInvalid={!tokensCreate.formValidation.isValid('scopes')}>
				<FormLabel>{t('modals.tokens.create.form.scopes.label')}</FormLabel>
				{api.tokens.availableScopes().map((scope) => (
					<Checkbox
						key={scope.replaceAll(':', '-')}
						isChecked={tokensCreate.isScopeChecked(scope)}
						onChange={() => tokensCreate.updateScopes(scope)}
					>
						{scope}
					</Checkbox>
				))}
				<Input
					type={'text'}
					value={tokensCreate.form.name}
					onChange={(event) =>
						tokensCreate.update({ name: event.target.value })
					}
				/>
				{!tokensCreate.formValidation.isValid('scopes') ? (
					<FormErrorMessage>
						{tokensCreate.formValidation.errorMessage('scopes')}
					</FormErrorMessage>
				) : (
					<FormHelperText>
						{t('modals.tokens.create.form.scopes.helperText')}
					</FormHelperText>
				)}
			</FormControl>
		</VStack>
	)

	const component = (
		<ModalWrapper
			title={t('modals.tokens.create.title')}
			isOpen={tokensCreate.isOpen}
			children={form}
			close={{
				label: t('modals.tokens.create.cancel') ?? '',
				onClick: () => {
					tokensCreate.close()
				},
			}}
			submit={{
				label: t('modals.tokens.create.submit') ?? '',
				disabled: !tokensCreate.formValidation.valid,
				onClick: () => {
					tokensCreate.submit()
				},
			}}
		/>
	)

	return component
})
