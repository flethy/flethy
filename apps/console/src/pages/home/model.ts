import { types } from 'mobx-state-tree'
import { getRootStore, getRouter } from '../../models/helpers'
import routes from '../../routes'

export const HomePage = types
	.model('HomePage', {
		codeExample: types.optional(types.number, 0),
		showMore: types.optional(types.boolean, false),
		onboarding: types.optional(
			types.model({
				workspaceName: types.optional(types.string, ''),
				projectName: types.optional(types.string, ''),
			}),
			{},
		),
	})
	.actions((self) => {
		// INITIALIZATION
		const initialisePage = (options?: { emailSubscription?: boolean }) => {
			const { api } = getRootStore(self)
			api.helmet.defaultTitle()
			if (options?.emailSubscription === true) {
				const router = getRouter()
				router.goTo(routes.home)
				setTimeout(() => {
					const emailSubscription = document.querySelector(
						'#email-subscription',
					)
					if (emailSubscription) {
						emailSubscription.scrollIntoView({ behavior: 'smooth' })
					}
				}, 100)
			}
		}

		const toggleShowMore = () => {
			self.showMore = !self.showMore
		}

		const updateOnboarding = (
			params: Partial<{ workspaceName: string; projectName: string }>,
		) => {
			self.onboarding = { ...self.onboarding, ...params }
		}

		return { initialisePage, toggleShowMore, updateOnboarding }
	})
	.views((self) => {
		return {}
	})
