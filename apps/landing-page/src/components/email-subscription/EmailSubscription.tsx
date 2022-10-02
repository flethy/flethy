import { EmailIcon } from '@chakra-ui/icons'
import {
	Button,
	Container,
	HStack,
	Input,
	InputGroup,
	InputLeftElement,
	Text,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { useMst } from '../../models/root'

export default observer(() => {
	const { t } = useTranslation('app')
	const {
		router,
		root: {
			components: { emailSubscription: component },
		},
	} = useMst()

	let content = (
		<HStack>
			<InputGroup>
				<InputLeftElement
					pointerEvents="none"
					children={<EmailIcon color="gray.300" />}
				/>
				<Input
					type="email"
					placeholder={t('general.email')}
					onChange={(event) =>
						component.setFormValues({ email: event.target.value })
					}
					isInvalid={!component.form.emailValid}
				/>
			</InputGroup>
			<Button
				rounded={'full'}
				size={'lg'}
				fontWeight={'normal'}
				px={6}
				colorScheme={'orange'}
				bg={'flethy.orange'}
				_hover={{ bg: 'flethy.purple' }}
				onClick={() => component.submit()}
				isLoading={component.state === 'pending'}
			>
				{t('general.subscribe')}
			</Button>
		</HStack>
	)

	switch (component.state) {
		case 'done':
			content = <Text>{t('components.emailSubscription.thanks')}</Text>
			break
		case 'error':
			content = <Text>{t('components.emailSubscription.error')}</Text>
			break
	}

	return <Container>{content}</Container>
})
