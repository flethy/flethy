import {
	Button,
	Input,
	InputGroup,
	InputRightElement,
	Text,
	useClipboard,
	VStack,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

export default observer((props: { label: string; value: string }) => {
	const { onCopy, setValue, hasCopied } = useClipboard('')
	return (
		<VStack align={'left'} gap={0} w={'full'}>
			<Text>{props.label}</Text>
			<InputGroup size="md">
				<Input pr="4.5rem" type={'text'} value={props.value} isDisabled />
				<InputRightElement width="4.5rem">
					<Button
						h="1.75rem"
						size="sm"
						onClick={() => {
							setValue(props.value)
							onCopy()
						}}
					>
						{hasCopied ? 'Copied' : 'Copy'}
					</Button>
				</InputRightElement>
			</InputGroup>
		</VStack>
	)
})
