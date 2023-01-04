import { Center, Spinner, Square, Text, VStack } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useMst } from '../models/root'

export default observer((props: { message?: string; showBootup?: boolean }) => {
	const {
		root: { api },
	} = useMst()

	let message
	if (props.showBootup && api.appState.bootupStatus?.length > 0) {
		message = api.appState.bootupStatus
	} else if (props.message) {
		message = props.message
	}

	return (
		<Center h="100vh" w="100vw" pos="absolute" top={0} left={0}>
			<Square>
				<VStack>
					<Spinner size={'xl'} color={'flethy.orange'} />
					{message && <Text>{message}</Text>}
				</VStack>
			</Square>
		</Center>
	)
})
