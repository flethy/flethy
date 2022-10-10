import { Box, Container, Flex, Image, Stack, Text } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import FancyHeading from '../../components/molecules/fancy-heading/FancyHeading'
import { useMst } from '../../models/root'

export default observer(() => {
	const { t } = useTranslation('app')
	const {
		root: {
			pages: { integration: page },
		},
	} = useMst()

	let content = (
		<FancyHeading textA={`${page.id} not available`} textB={`Sorry!`} />
	)

	if (page.get()) {
		content = (
			<Container>
				<Stack gap={6} direction={{ base: 'column', md: 'row' }}>
					<FancyHeading textA={page.get()?.name ?? ''} textB={`...`} />
					<Flex
						flex={1}
						justify={'center'}
						align={'center'}
						position={'relative'}
						w={'full'}
					>
						<Box
							position={'relative'}
							bgColor={page.get()?.light ? '#1A202C' : 'white'}
							// height={'300px'}
							rounded={'2xl'}
							boxShadow={'2xl'}
							width={'full'}
							overflow={'hidden'}
						>
							<Image
								alt={page.get()?.id}
								fit={'cover'}
								align={'center'}
								w={'100%'}
								// h={'100%'}
								src={`/integrations/${page.get()?.logo}`}
							/>
						</Box>
					</Flex>
				</Stack>
				<Stack>
					<Stack direction={'column'}>
						{page.get()?.interfaces.map((serviceInterface: any) => (
							<Box key={serviceInterface}>
								<Text>{serviceInterface}</Text>
							</Box>
						))}
					</Stack>
				</Stack>
			</Container>
		)
	}

	return content
})
