import { Button, Container, Stack, Text } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { useMst } from '../../models/root'

export default observer(() => {
	const { t } = useTranslation('app')
	const {
		router,
		root: {
			api,
			pages: { home: page },
		},
	} = useMst()

	return (
		<>
			<Container maxW={'7xl'}>
				<Stack
					align={'center'}
					spacing={{ base: 8, md: 10 }}
					py={{ base: 15, md: 20 }}
					direction={{ base: 'column', md: 'row' }}
				>
					<Text>todo...</Text>
					<Button
						onClick={() =>
							api.flethy.onboard({
								workspaceName: 'first workspace',
								projectName: 'first project',
							})
						}
					>
						Nice
					</Button>
				</Stack>
			</Container>
		</>
	)
})
