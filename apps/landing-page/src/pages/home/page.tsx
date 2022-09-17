import { Box, Heading } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useMst } from '../../models/root'

export default observer(() => {
	const {
		root: {
			pages: { home: page },
		},
	} = useMst()

	return (
		<Box style={{ width: '100%', height: 'calc(100vh - 120px)' }}>
			<Heading as="h1" size="lg" mb={4}>
				flethy
			</Heading>
		</Box>
	)
})
