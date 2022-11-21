import { observer } from 'mobx-react-lite'
import SecretsCreateModal from './secrets/create/page'
import SecretsDeleteModal from './secrets/delete/page'

export default observer(() => {
	const modals = (
		<>
			<SecretsCreateModal />
			<SecretsDeleteModal />
		</>
	)

	return modals
})
