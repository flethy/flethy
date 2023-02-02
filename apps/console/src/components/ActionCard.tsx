import {
	Avatar,
	Badge,
	Box,
	Button,
	Center,
	GridItem,
	Heading,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { splitCamelCase } from '../helpers/ui'
import { useMst } from '../models/root'
import { InView } from 'react-intersection-observer'

export default observer(
	(props: {
		title: string
		subtitle: string
		description: string
		tags?: string[]
		avatar: {
			name: string
			src?: string
		}
		gridItem?: boolean
		infiniteScroll?: {
			loadMore: () => void
		}
		action: () => void
	}) => {
		const { t } = useTranslation('app')
		const {
			router,
			root: {
				api,
				pages: { home: page },
			},
		} = useMst()

		const content = (
			<Center py={6}>
				<Box
					maxW={'320px'}
					w={'full'}
					bg={useColorModeValue('white', 'gray.900')}
					boxShadow={'2xl'}
					rounded={'lg'}
					p={6}
					textAlign={'center'}
				>
					<Avatar
						size={'xl'}
						src={props.avatar.src}
						name={props.avatar.name}
						mb={4}
						pos={'relative'}
						border="2px solid"
						borderColor={useColorModeValue('gray.200', 'gray.700')}
					/>
					<Heading fontSize={'2xl'} fontFamily={'body'}>
						{splitCamelCase(props.title)}
					</Heading>
					<Text fontWeight={600} color={'gray.500'} mb={4}>
						{props.subtitle}
					</Text>
					<Text
						textAlign={'center'}
						color={useColorModeValue('gray.700', 'gray.400')}
						px={3}
					>
						{props.description}
					</Text>

					{props.tags && (
						<Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
							{props.tags.map((tag) => (
								<Badge
									key={tag}
									px={2}
									py={1}
									bg={useColorModeValue('gray.50', 'gray.800')}
									fontWeight={'400'}
								>
									#{tag}
								</Badge>
							))}
						</Stack>
					)}

					<Button
						w={'full'}
						mt={8}
						rounded={'md'}
						_hover={{
							transform: 'translateY(-2px)',
							boxShadow: 'lg',
						}}
						onClick={props.action}
					>
						Go
					</Button>
				</Box>
			</Center>
		)

		let component = content
		if (props.infiniteScroll && props.gridItem) {
			component = (
				<InView
					as="div"
					triggerOnce
					onChange={(inView, entry) => {
						if (inView) {
							props.infiniteScroll!.loadMore()
						}
					}}
				>
					<GridItem>{content}</GridItem>
				</InView>
			)
		} else if (props.infiniteScroll) {
			component = (
				<InView
					as="div"
					triggerOnce
					onChange={(inView, entry) => {
						if (inView) {
							props.infiniteScroll!.loadMore()
						}
					}}
				>
					{content}
				</InView>
			)
		} else if (props.gridItem) {
			component = <GridItem>{content}</GridItem>
		}

		return component
	},
)
