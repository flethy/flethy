import { types } from 'mobx-state-tree'
import { MediumHighlightBoxProps } from '../../components/HighlightBox'
import { WORKFLOW_TUTORIALS } from '../../constants/tutorials.const'
import { PAGE_CONTEXT } from '../../models/api/context'
import { getRootStore, getRouter } from '../../models/helpers'
import routes from '../../routes'

export const TutorialsPage = types
	.model('TutorialsPage', {})
	.actions((self) => {
		// INITIALIZATION
		const init = (options?: {}) => {
			const { api } = getRootStore(self)
			api.context.setPage(PAGE_CONTEXT.EXPLORE)
		}

		return { init }
	})
	.views((self) => {
		const getTutorials = (): MediumHighlightBoxProps[] => {
			const props: MediumHighlightBoxProps[] = []
			const { api } = getRootStore(self)
			for (const tutorialKey of Object.keys(WORKFLOW_TUTORIALS)) {
				props.push({
					title: WORKFLOW_TUTORIALS[tutorialKey].name,
					description: WORKFLOW_TUTORIALS[tutorialKey].description,
					icon: {
						src:
							WORKFLOW_TUTORIALS[tutorialKey].icon ?? 'tutorials/generic.png',
						alt: WORKFLOW_TUTORIALS[tutorialKey].name,
					},
					hightlight: {
						action: {
							label: 'Start tutorial',
							onClick: () => {
								getRouter().goTo(routes.workflowNew, {
									...api.workspaces.getContext(),
									tutorial: tutorialKey,
								})
							},
						},
					},
				})
			}
			return props
		}

		return { getTutorials }
	})
