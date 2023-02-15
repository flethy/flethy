import {
	Box,
	Button,
	Grid,
	GridItem,
	Heading,
	Hide,
	HStack,
	Image,
	Text,
	useColorModeValue,
	VStack,
} from '@chakra-ui/react'

export interface HighlightBoxProps {
	title: string
	description: string
	img: {
		src: string
		alt: string
	}
	primaryAction: {
		label: string
		onClick: () => void
	}
	secondaryAction?: {
		label: string
		onClick: () => void
	}
	options?: {
		highlight?: boolean
	}
}

export const HighlightBox = (props: HighlightBoxProps) => {
	const bagroundColor = props.options?.highlight
		? useColorModeValue('gray.200', 'gray.700')
		: undefined

	return (
		<Box
			w={'full'}
			p={10}
			border={'solid'}
			borderColor={useColorModeValue('gray.700', 'gray.300')}
			rounded={10}
			bg={bagroundColor}
		>
			<Grid
				w="full"
				templateColumns={{
					base: '1fr',
					md: 'repeat(2, 1fr)',
				}}
				gap={6}
				justifyItems={'center'}
				alignItems={'center'}
			>
				<GridItem>
					<VStack align={'left'} w={'full'} gap={3}>
						<Heading as={'h3'} size={'md'}>
							{props.title}
						</Heading>
						<Text>{props.description}</Text>
						<HStack>
							<Button
								onClick={props.primaryAction.onClick}
								colorScheme={'purple'}
							>
								{props.primaryAction.label}
							</Button>
							{props.secondaryAction && (
								<Button
									onClick={props.secondaryAction.onClick}
									variant={'outline'}
								>
									{props.secondaryAction.label}
								</Button>
							)}
						</HStack>
					</VStack>
				</GridItem>
				<Hide below={'md'}>
					<GridItem>
						<Image src={props.img.src} alt={props.img.alt} height={'70%'} />
					</GridItem>
				</Hide>
			</Grid>
		</Box>
	)
}

export interface MediumHighlightBoxProps {
	title: string
	description: string
	icon: {
		src: string
		alt: string
	}
	hightlight: {
		img?: {
			src: string
			alt: string
		}
		action?: {
			label: string
			onClick: () => void
		}
	}
	primaryAction?: {
		label: string
		onClick: () => void
	}
	secondaryAction?: {
		label: string
		onClick: () => void
	}
	options?: {
		highlight?: boolean
	}
}

export const MediumHighlightBox = (props: MediumHighlightBoxProps) => {
	const bagroundColor = props.options?.highlight
		? useColorModeValue('gray.200', 'gray.700')
		: undefined

	return (
		<Box
			w={'full'}
			p={10}
			border={'solid'}
			borderColor={useColorModeValue('gray.700', 'gray.300')}
			rounded={10}
			bg={bagroundColor}
		>
			<Grid
				w="full"
				templateColumns={{
					base: '1fr',
					md: '150px 1fr 250px',
				}}
				gap={6}
				justifyItems={'center'}
				alignItems={'center'}
			>
				<Hide below={'md'}>
					<GridItem>
						<Image src={props.icon.src} alt={props.icon.alt} />
					</GridItem>
				</Hide>
				<GridItem>
					<VStack align={'left'} w={'full'} gap={3}>
						<Heading as={'h3'} size={'md'}>
							{props.title}
						</Heading>
						<Text>{props.description}</Text>
						<HStack>
							{props.primaryAction && (
								<Button
									onClick={props.primaryAction.onClick}
									colorScheme={'purple'}
									variant={'ghost'}
								>
									{props.primaryAction.label}
								</Button>
							)}
							{props.secondaryAction && (
								<Button
									onClick={props.secondaryAction.onClick}
									variant={'ghost'}
								>
									{props.secondaryAction.label}
								</Button>
							)}
						</HStack>
					</VStack>
				</GridItem>
				<GridItem>
					{props.hightlight.img && (
						<Image
							src={props.hightlight.img.src}
							alt={props.hightlight.img.alt}
							height={'200px'}
						/>
					)}
					{props.hightlight.action && (
						<Button onClick={props.hightlight.action.onClick} variant={'ghost'}>
							{props.hightlight.action.label}
						</Button>
					)}
				</GridItem>
			</Grid>
		</Box>
	)
}
