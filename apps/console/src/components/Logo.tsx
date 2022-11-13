import { Center, Image } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

export default observer((props: { marginTop?: string; width?: string }) => {
	return (
		<Center marginTop={props.marginTop ?? undefined}>
			<Image src="/favicon.webp" alt="logo" width={props.width} />
		</Center>
	)
})
