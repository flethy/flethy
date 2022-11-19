import { Center, Spinner, Square, Text, VStack } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

export default observer((props: { message?: string }) => {
	return (
		<Center h="100vh">
			<Square>
				<VStack>
					<Spinner size={'xl'} color={'flethy.orange'} />
					{props.message && <Text>{props.message}</Text>}
				</VStack>
			</Square>
		</Center>
	)
})
