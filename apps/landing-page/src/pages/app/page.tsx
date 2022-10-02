import { Box, useColorMode } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { MobxRouter } from 'mobx-router'
import Navbar from '../../components/navbar'
import { rootStore } from '../../models/root'

export default observer(() => {
	// hack to force dark mode
	// const { colorMode, toggleColorMode } = useColorMode()
	// if (colorMode === 'light') {
	// 	toggleColorMode()
	// }

	const app = (
		<>
			<Navbar />
			<Box p={4} minHeight={{ md: 'calc(100vh - 415px)' }}>
				{/* <Box> */}
				<MobxRouter store={rootStore} />
			</Box>
		</>
	)
	return app
})
