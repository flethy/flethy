import { types } from 'mobx-state-tree'
import i18next from '../../i18n/config'

export const HelmetModel = types
	.model('HelmetModel', {
		title: types.maybe(types.string),
	})
	.actions((self) => ({
		updateTitle(options: { title: string; concatenateAppname?: boolean }) {
			const titleParts: string[] = [options.title]
			if (options.concatenateAppname) {
				titleParts.push(i18next.t('title'))
			}
			self.title = titleParts.join(' | ')
		},

		integration(options: { integration: string }) {
			const titleParts: string[] = [i18next.t('title'), options.integration]
			self.title = titleParts.join(' + ')
			console.log(self.title)
		},

		usecase(options: { usesCaseServices: string[] }) {
			const titleParts: string[] = [
				i18next.t('title'),
				...options.usesCaseServices,
			]
			self.title = titleParts.join(' + ')
			console.log(self.title)
		},

		defaultTitle() {
			self.title = `${i18next.t('title')} | ${i18next.t('description')}`
		},
	}))
