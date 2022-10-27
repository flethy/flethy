// ?utm_source=stefanjudis&utm_medium=email#L6-L8

export type UTM_SOURCE = 'flethy'
export type UTM_MEDIUM = 'landingpage'
export type UTM_CAMPAIGN = 'flethy'
export type UTM_TERM = 'flethy'
export type UTM_CONTENT = 'textlink' | 'footerlink' | 'buttonlink'

export interface UtmParameters {
	utm_source?: UTM_SOURCE
	utm_medium?: UTM_MEDIUM
	utm_campaign?: UTM_CAMPAIGN
	utm_term?: Array<UTM_TERM | string>
	utm_content?: UTM_CONTENT
}

export class UTMUtils {
	public static assign(url: string, parameters: UtmParameters): string {
		let searchParams = new URLSearchParams()

		if (parameters.utm_source) {
			searchParams.append('utm_source', parameters.utm_source)
		}
		if (parameters.utm_medium) {
			searchParams.append('utm_medium', parameters.utm_medium)
		}
		if (parameters.utm_campaign) {
			searchParams.append('utm_campaign', parameters.utm_campaign)
		}
		if (parameters.utm_term && parameters.utm_term.length > 0) {
			searchParams.append('utm_term', parameters.utm_term.join('+'))
		}
		if (parameters.utm_content) {
			searchParams.append('utm_content', parameters.utm_content)
		}

		const utm = searchParams.toString()

		return `${url}${utm.length > 0 ? `?${utm}` : ''}`
	}
}
