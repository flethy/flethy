import { Container, Heading, Stack } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

export default observer(() => {
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
					404
				</Heading>
			</Stack>
		</Container>
	)
})
