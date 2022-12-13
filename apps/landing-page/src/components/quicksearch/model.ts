import { types } from 'mobx-state-tree'
import { USECASES } from '../../constants/usecases.const'
import { getRouter } from '../../models/helpers'
import routes from '../../routes'

export const SEARCH_ID = '_search_'

export interface QuickSearchAction {
	id: string
	title: string
	subtitle?: string
	description?: string
	tags?: string[]
	icon?: string
	action: () => {}
}

const ACTIONS: QuickSearchAction[] = []

export const QuickSearchActionModel = types.model({
	title: types.string,
	subtitle: types.maybe(types.string),
	icon: types.maybe(types.string),
	action: types.frozen<any>(),
})

export const QuickSearchComponent = types
	.model('QuickSearchComponent', {
		initStatus: types.optional(
			types.enumeration(['loading', 'init', 'success']),
			'init',
		),
		isOpen: types.optional(types.boolean, false),
		searchTerm: types.optional(types.string, ''),
		searchResults: types.array(types.string),
		selectedId: types.optional(types.string, SEARCH_ID),
	})
	.actions((self) => ({
		// INITIALIZATION
		initialise() {
			self.isOpen = false
			self.searchTerm = ''
			self.selectedId = SEARCH_ID
			if (!self.initStatus || self.initStatus === 'init') {
				self.initStatus = 'loading'
				window.addEventListener('keydown', (event: KeyboardEvent) => {
					this.act(event)
				})
				this.addAction({
					id: 'navigateHome',
					title: 'Home',
					subtitle: 'Go back to Home Screen',
					action: () => getRouter().goTo(routes.home),
				})
				this.addAction({
					id: 'navigatePitchDeck',
					title: 'Pitch Deck',
					subtitle: 'Show the Pitch Deck',
					action: () => getRouter().goTo(routes.pitch),
				})
				this.addAction({
					id: 'navigateIntegrations',
					title: 'Integrations',
					subtitle: 'See all Integrations',
					action: () => getRouter().goTo(routes.integrations),
				})
				this.addAction({
					id: 'navigateRoadmap',
					title: 'Roadmap',
					subtitle: 'Always progress!',
					action: () => getRouter().goTo(routes.roadmap),
				})
				USECASES.forEach((useCase) => {
					this.addAction({
						id: useCase.id,
						title: useCase.title,
						subtitle: 'flethy Use Case',
						tags: useCase.tags,
						action: () => getRouter().goTo(routes.useCase, { id: useCase.id }),
					})
				})

				self.initStatus = 'success'
			}
		},

		act(event: KeyboardEvent) {
			if (event.key === 'k' && event.ctrlKey) {
				event.preventDefault()
				this.open()
				return
			}
			if (event.key === 'ArrowDown') {
				if (self.selectedId === SEARCH_ID && self.searchResults.length > 0) {
					self.selectedId = self.searchResults[0]
				} else {
					const currentIndex = self.searchResults.indexOf(self.selectedId)
					if (currentIndex < self.searchResults.length - 1) {
						self.selectedId = self.searchResults[currentIndex + 1]
					}
				}
			}
			if (event.key === 'ArrowUp') {
				if (self.selectedId !== SEARCH_ID) {
					const currentIndex = self.searchResults.indexOf(self.selectedId)
					if (currentIndex > 0) {
						self.selectedId = self.searchResults[currentIndex - 1]
					} else {
						self.selectedId = SEARCH_ID
					}
				}
			}
			if (event.key === 'Enter') {
				this.performAction(self.selectedId)
			}
		},

		performAction(id: string) {
			const action = ACTIONS.find((currentAction) => currentAction.id === id)
			if (action) {
				action.action()
			}
			this.close()
		},

		addAction(action: QuickSearchAction) {
			ACTIONS.push(action)
		},

		updateSearchTerm(searchTerm: string) {
			self.searchTerm = searchTerm
			self.searchResults.clear()

			if (searchTerm.length === 0) {
				return
			}

			ACTIONS.forEach((action) => {
				const actionTitle = action.title.toLowerCase()
				const actionSubtitle = action.subtitle?.toLowerCase()
				const searchTermLowerCase = searchTerm.toLowerCase()
				if (
					actionTitle.includes(searchTermLowerCase) ||
					(actionSubtitle && actionSubtitle.includes(searchTermLowerCase)) ||
					(action.tags &&
						action.tags.some((tag) =>
							tag.toLowerCase().includes(searchTermLowerCase),
						)) ||
					(action.description &&
						action.description.toLowerCase().includes(searchTermLowerCase))
				) {
					self.searchResults.push(action.id)
				}
			})
			if (self.searchResults.length > 0) {
				self.selectedId = self.searchResults[0]
			}
		},

		open() {
			self.selectedId = SEARCH_ID
			self.searchTerm = ''
			self.searchResults.clear()
			self.isOpen = true
		},

		close() {
			self.isOpen = false
		},
	}))
	.views((self) => ({
		getSearchResults() {
			const actions: QuickSearchAction[] = []
			for (const searchResult of self.searchResults) {
				const action = ACTIONS.find((action) => action.id === searchResult)
				if (action) {
					actions.push(action)
				}
			}
			return actions
		},
	}))
