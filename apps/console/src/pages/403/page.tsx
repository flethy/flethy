import { Container, Heading, Stack } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useMst } from '../../models/root'

export default observer(() => {
	const {
		router,
		root: {
			pages: { unsufficientPermissions: page },
		},
	} = useMst()

	return (
		<Container maxW={'5xl'}>
			<Stack
				textAlign={'center'}
				align={'center'}
				spacing={{ base: 8, md: 10 }}
				py={{ base: 20, md: 28 }}
			>
				<Heading
					as={'h1'}
					fontWeight={600}
					fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
					lineHeight={'110%'}
				>
					403
				</Heading>
				<Heading
					as={'h3'}
					fontWeight={300}
					fontSize={{ base: '1xl', sm: '2xl', md: '4xl' }}
					lineHeight={'110%'}
				>
					You don't have permission to access this page.
				</Heading>
			</Stack>
		</Container>
	)
})
