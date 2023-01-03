import { observer } from 'mobx-react-lite'
import SecretsCreateModal from './secrets/create/page'
import SecretsDeleteModal from './secrets/delete/page'
import TokensCreateModal from './tokens/create/page'
import TokensDeleteModal from './tokens/delete/page'
import InstancesCreateModal from './instances/create/page'

export default observer(() => {
	const modals = (
		<>
			<SecretsCreateModal />
			<SecretsDeleteModal />
			<TokensCreateModal />
			<TokensDeleteModal />
			<InstancesCreateModal />
		</>
	)

	return modals
})
