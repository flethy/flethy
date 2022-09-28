import { Center, Image } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

export default observer((props: { marginTop?: string }) => {
	return (
		<Center marginTop={props.marginTop ?? undefined}>
			<Image src="/favicon.webp" alt="logo" width="100px" />
		</Center>
	)
})
