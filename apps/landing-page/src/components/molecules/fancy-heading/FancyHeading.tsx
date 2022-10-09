import { Heading, Stack, Text } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

export default observer((props: { textA: string; textB: string }) => {
	return (
		<Stack flex={1} spacing={{ base: 5, md: 10 }}>
			<Heading
				lineHeight={1.1}
				fontWeight={600}
				fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
			>
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
