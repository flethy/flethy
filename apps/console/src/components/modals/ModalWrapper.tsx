import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

export interface ModalProps {
	title: string
	isOpen: boolean
	isSubmitting: {
		loading: boolean
		loadingText: string
	}
	close: {
		label?: string
		variant?: string
		onClick: () => void
	}
	submit: {
		label?: string
		variant?: string
		isLoading?: boolean
		disabled?: boolean
		onClick: () => void
	}
	children: React.ReactNode
}

export default observer((props: ModalProps) => {
	const modal = (
		<Modal isOpen={props.isOpen} onClose={props.close.onClick}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{props.title}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>{props.children}</ModalBody>

				<ModalFooter>
					<Button
						color="flethy.orange"
						mr={3}
						variant={props.submit.variant}
						onClick={props.submit.onClick}
						disabled={props.submit.disabled || props.isSubmitting.loading}
						isLoading={props.isSubmitting.loading}
						loadingText={props.isSubmitting.loadingText}
					>
						{props.submit.label}
					</Button>
					{props.close.label && (
						<Button
							variant={props.close.variant}
							onClick={props.close.onClick}
							disabled={props.isSubmitting.loading}
						>
							{props.close.label}
						</Button>
					)}
				</ModalFooter>
			</ModalContent>
		</Modal>
	)

	return modal
})
