import { Box } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { MobxRouter } from 'mobx-router'
import Footer from '../../components/footer'
import Navbar from '../../components/navbar'
import QuickSearch from '../../components/quicksearch/page'
import { rootStore } from '../../models/root'

export default observer(() => {
	// hack to force dark mode
	// const { colorMode, toggleColorMode } = useColorMode()
	// if (colorMode === 'light') {
	// 	toggleColorMode()
	// }

	const app = (
		<>
			<QuickSearch />
			<Navbar />
			<Box p={4} minHeight={{ md: 'calc(100vh - 415px)' }}>
				{/* <Box> */}
				<MobxRouter store={rootStore} />
			</Box>
			<Footer />
		</>
	)
	return app
})
