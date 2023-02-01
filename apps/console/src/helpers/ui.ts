export const formatDateTime = (date: Date) => {
	return Intl.DateTimeFormat('en-US', {
		hour12: true,
		day: '2-digit',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	}).format(date)
}

export const formatDate = (date: Date) => {
	return Intl.DateTimeFormat('en-US', {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
	}).format(date)
}

export const formatDay = (date: Date) => {
	return Intl.DateTimeFormat('en-US', {
		day: '2-digit',
	}).format(date)
}

export const formatMonth = (date: Date) => {
	return Intl.DateTimeFormat('en-US', {
		month: 'short',
	}).format(date)
}

export const splitCamelCase = (value: string) => {
	return value.replace(/([a-z])([A-Z])/g, '$1 $2')
}
