export function id(base: string, ...texts: string[]) {
	return `app-${base}-${texts
		.map((text) => text.replaceAll(' ', '-').toLowerCase())
		.join('-')}`
}
