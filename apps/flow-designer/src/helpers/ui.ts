export const formatDateTime = (date: Date) => {
	return Intl.DateTimeFormat("en-US", {
		hour12: true,
		day: "2-digit",
		month: "long",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	}).format(date)
}

export const formatDate = (date: Date) => {
	return Intl.DateTimeFormat("en-US", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	}).format(date)
}
