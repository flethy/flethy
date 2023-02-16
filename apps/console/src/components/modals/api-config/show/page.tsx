import { VStack } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { useMst } from '../../../../models/root'
import CopyInput from '../../../CopyInput'
import ModalWrapper from '../../ModalWrapper'

export default observer(() => {
	const { t } = useTranslation('app')
	const {
		router,
		root: {
			api,
			modals: { apiConfigShow: modal },
		},
	} = useMst()

	const infos = (
		<VStack spacing={4} w={'full'}>
			<CopyInput label={'Workspace Id'} value={modal.context.workspaceId} />
			<CopyInput label={'Project Id'} value={modal.context.projectId} />
			{modal.context.workflowId && (
				<CopyInput label={'Workflow Id'} value={modal.context.workflowId} />
			)}
		</VStack>
	)

	const component = (
		<ModalWrapper
			title={t('modals.apiConfig.show.title')}
			isOpen={modal.isOpen}
			children={infos}
			isSubmitting={{
				loading: false,
				loadingText: '',
			}}
			close={{
				onClick: () => {
					modal.close()
				},
			}}
			submit={{
				label: 'Close',
				variant: 'solid',
				onClick: () => {
					modal.close()
				},
			}}
		/>
	)

	return component
})
