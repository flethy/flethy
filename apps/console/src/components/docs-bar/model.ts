import { types } from 'mobx-state-tree'
import { getRootStore, getRouter } from '../../models/helpers'
import routes from '../../routes'

export interface DocItem {
	id: string
	title: string
	description: string
	href: string
}

const DOC_ITEMS: { [key: string]: DocItem } = {
	integrations: {
		id: 'integrations',
		title: 'Integrations',
		description: 'Explore all available integrations in the Documentaion.',
		href: 'https://docs.flethy.com/docs/integrations/start',
	},
	api: {
		id: 'api',
		title: 'Learn about the API',
		description:
			'The flethy API is the easiest way to use workflows. Via the API you can create and update workflows, list existing ones and delete workflows. The most important part is, of course, starting a workflow.',
		href: 'https://docs.flethy.com/docs/api/flethy-execution-platform',
	},
	flows: {
		id: 'flows',
		title: 'Flows',
		description:
			'Learn how to design flows and how you can manage data from one node in another.',
		href: 'https://docs.flethy.com',
	},
}

export const DocsBarComponent = types
	.model('DocsBarComponent', {
		docItems: types.array(types.string),
	})
	.actions((self) => {
		const init = () => {
			self.docItems.clear()
		}

		const setDocItems = (docItems: string[]) => {
			self.docItems.clear()
			self.docItems.push(...docItems)
		}

		return { init, setDocItems }
	})
	.views((self) => {
		const getDocItems = (): DocItem[] => {
			return self.docItems.map((docItem) => DOC_ITEMS[docItem])
		}

		return {
			getDocItems,
		}
	})
