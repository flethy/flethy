import { Heading, Stack, Text } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

export default observer((props: { textA: string; textB: string }) => {
	const shortText = props.textA.length <= 20 && props.textA.length <= 20
	const fontSize = shortText
		? { base: '3xl', sm: '4xl', lg: '6xl' }
		: { base: 'xl', sm: '2xl', lg: '4xl' }
	return (
		<Stack flex={1} spacing={{ base: 5, md: 10 }}>
			<Heading lineHeight={1.1} fontWeight={600} fontSize={fontSize}>
				<Text
					as={'span'}
					position={'relative'}
					_after={{
						content: "''",
						width: 'full',
						height: '30%',
						position: 'absolute',
						bottom: 1,
						left: 0,
						bg: 'flethy.orange',
						zIndex: -1,
					}}
				>
					{props.textA}
				</Text>
				<br />
				<Text as={'span'} color={'flethy.purple'}>
					{props.textB}
				</Text>
			</Heading>
		</Stack>
	)
})
