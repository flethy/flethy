import { Box } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { MobxRouter } from 'mobx-router'
import Footer from '../../components/footer'
import Menu from '../../components/menu/page'
import Modals from '../../components/modals/Modals'
import Navbar from '../../components/navbar'
import QuickSearch from '../../components/quicksearch/page'
import { rootStore } from '../../models/root'

export default observer(() => {
	const app = (
		<>
			<QuickSearch />
			<Navbar />
			<Menu />
			<Box p={4} minHeight={{ md: 'calc(100vh - 130px)' }}>
				<MobxRouter store={rootStore} />
			</Box>
			<Modals />
			<Footer />
		</>
	)

	return app
})
