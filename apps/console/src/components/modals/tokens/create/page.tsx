import {
	Checkbox,
	Code,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	IconButton,
	Input,
	Text,
	useClipboard,
	VStack,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { useMst } from '../../../../models/root'
import ModalWrapper from '../../ModalWrapper'
import { CopyIcon, DeleteIcon, ArrowForwardIcon } from '@chakra-ui/icons'

export default observer(() => {
	const { t } = useTranslation('app')
	const {
		router,
		root: {
			api,
			modals: { tokensCreate },
		},
	} = useMst()
	const { onCopy, setValue, hasCopied } = useClipboard('')

	let form = (
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
						onChange={(event) =>
							tokensCreate.updateScopes(scope, event.target.checked)
						}
					>
						{scope}
					</Checkbox>
				))}
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

	let submitLabel = t('modals.tokens.create.submit') ?? ''

	if (tokensCreate.state === 'show') {
		submitLabel = t('modals.tokens.create.close') ?? ''
		form = (
			<VStack>
				<Text>{t('modals.tokens.create.show.notice')}</Text>
				<Code maxW={'100%'}>{tokensCreate.token}</Code>
				<IconButton
					mx={1}
					aria-label="Copy to Clipboard"
					icon={<CopyIcon />}
					disabled={hasCopied}
					size={'xs'}
					onClick={() => {
						setValue(tokensCreate.token)
						onCopy()
					}}
				/>
			</VStack>
		)
	}

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
				label: submitLabel,
				disabled: !tokensCreate.formValidation.valid,
				onClick: () => {
					if (tokensCreate.state === 'show') {
						tokensCreate.close()
					} else {
						tokensCreate.submit()
					}
				},
			}}
		/>
	)

	return component
})
