import {
	Box,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Tag,
	Text,
	useColorModeValue,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { useMst } from '../../models/root'

export default observer(() => {
	const { t } = useTranslation('app')
	const {
		root: {
			components: { quickSearch: component },
		},
	} = useMst()
	const bg = useColorModeValue('flethy.orange', 'flethy.purple')

	return (
		<Modal
			isOpen={component.isOpen}
			onClose={component.close}
			scrollBehavior={'inside'}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>
					<Input
						placeholder="Type to search"
						value={component.searchTerm}
						onChange={(event) => component.updateSearchTerm(event.target.value)}
					/>
				</ModalHeader>
				<ModalBody>
					{component.getSearchResults().map((action) => {
						return (
							<Box
								bg={component.selectedId === action.id ? bg : undefined}
								p={2}
								rounded={'md'}
								key={action.id}
								onClick={() => component.performAction(action.id)}
								cursor={'pointer'}
								_hover={{
									bg,
								}}
							>
								<Text>
									{action.title}
									{action.tag && (
										<Tag size={'sm'} ml={2}>
											{action.tag}
										</Tag>
									)}
								</Text>
								{action.subtitle && (
									<Text fontSize={'xs'}>{action.subtitle}</Text>
								)}
							</Box>
						)
					})}
				</ModalBody>
			</ModalContent>
		</Modal>
	)
})
