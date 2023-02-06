import { observer } from 'mobx-react-lite'
import CronsCreateModal from './crons/create/page'
import CronsDeleteModal from './crons/delete/page'
import InstancesCreateModal from './instances/create/page'
import SecretsCreateModal from './secrets/create/page'
import SecretsDeleteModal from './secrets/delete/page'
import TokensCreateModal from './tokens/create/page'
import TokensDeleteModal from './tokens/delete/page'

export default observer(() => {
	const modals = (
		<>
			<SecretsCreateModal />
			<SecretsDeleteModal />
			<TokensCreateModal />
			<TokensDeleteModal />
			<InstancesCreateModal />
			<CronsCreateModal />
			<CronsDeleteModal />
		</>
	)

	return modals
})
