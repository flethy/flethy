import { Container, Heading, VStack } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import React from 'react'

export default observer(
	(props: { title: string; subtitle?: string; children: React.ReactNode }) => {
		const layout = (
			<Container maxW={'7xl'} textAlign={'left'}>
				<VStack gap={3} textAlign={'left'}>
					<Heading size={'xl'} as={'h1'}>
						{props.title}
					</Heading>
					{props.subtitle && (
						<Heading size={'md'} as={'h2'}>
							{props.subtitle}
						</Heading>
					)}
					{props.children}
				</VStack>
			</Container>
		)

		return layout
	},
)
