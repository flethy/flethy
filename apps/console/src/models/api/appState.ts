import { types } from 'mobx-state-tree'
import i18next from '../../i18n/config'

export enum BootupStatus {
	NOAUTH,
	AUTH_AND_USER,
	ROUTER,
	WORKSPACES,
	DONE,
	AUTH_NO_USER,
	USER,
	LOGIN,
}

export const AppStateModel = types
	.model('AppStateModel', {
		bootupStatus: types.optional(types.string, ''),
	})
	.actions((self) => {
		const updateStatus = (status: BootupStatus | string) => {
			if (typeof status === 'string') {
				self.bootupStatus = status
				return
			}
			switch (status) {
				case BootupStatus.NOAUTH:
					self.bootupStatus = i18next.t('appStatus.bootup.noAuth')
					break
				case BootupStatus.AUTH_AND_USER:
					self.bootupStatus = i18next.t('appStatus.bootup.authAndUser')
					break
				case BootupStatus.ROUTER:
					self.bootupStatus = i18next.t('appStatus.bootup.router')
					break
				case BootupStatus.WORKSPACES:
					self.bootupStatus = i18next.t('appStatus.bootup.workspaces')
					break
				case BootupStatus.DONE:
					self.bootupStatus = i18next.t('appStatus.bootup.done')
					break
				case BootupStatus.AUTH_NO_USER:
					self.bootupStatus = i18next.t('appStatus.bootup.authNoUser')
					break
				case BootupStatus.USER:
					self.bootupStatus = i18next.t('appStatus.bootup.user')
					break
				case BootupStatus.LOGIN:
					self.bootupStatus = i18next.t('appStatus.bootup.login')
					break
				default:
					self.bootupStatus = ''
			}
		}

		return { updateStatus }
	})
