interface MediaSource {
	id: string
	path: string
	filename: string
	size: 'sm' | 'md' | 'lg'
	type?: 'png' | 'webp'
}

enum MEDIA_PATH {
	ICONS = 'icons',
	TUTORIALS = 'tutorials',
	BASE = '',
}

export const IMAGE_DUMMY: MediaSource = {
	id: 'logo',
	path: MEDIA_PATH.BASE,
	filename: 'favicon',
	size: 'lg',
	type: 'webp',
}

export const MEDIA_SOURCES: MediaSource[] = [
	{
		id: 'logo',
		path: MEDIA_PATH.BASE,
		filename: 'favicon',
		size: 'lg',
		type: 'webp',
	},
	{
		id: 'icon-tokens',
		path: MEDIA_PATH.ICONS,
		filename: 'accesstokens',
		size: 'lg',
		type: 'png',
	},
	{
		id: 'icon-beginner-tutorial',
		path: MEDIA_PATH.ICONS,
		filename: 'beginner-tutorial',
		size: 'lg',
		type: 'png',
	},
	{
		id: 'icon-crons',
		path: MEDIA_PATH.ICONS,
		filename: 'crons',
		size: 'lg',
		type: 'png',
	},
	{
		id: 'icon-use-cases',
		path: MEDIA_PATH.ICONS,
		filename: 'explore',
		size: 'lg',
		type: 'png',
	},
	{
		id: 'icon-secrets',
		path: MEDIA_PATH.ICONS,
		filename: 'secrets',
		size: 'lg',
		type: 'png',
	},
	{
		id: 'icon-template',
		path: MEDIA_PATH.ICONS,
		filename: 'template',
		size: 'lg',
		type: 'png',
	},
	{
		id: 'icon-workflows',
		path: MEDIA_PATH.ICONS,
		filename: 'workflows',
		size: 'lg',
		type: 'png',
	},
]

export function getMedia(id: string, size?: 'sm' | 'md' | 'lg'): string {
	const medias = MEDIA_SOURCES.filter((media) => media.id === id)
	let media: MediaSource = IMAGE_DUMMY
	if (medias.length > 0) {
		media = medias.find((media) => media.size === size) || medias[0]
	}
	return `/${media.path}${media.path.length > 0 ? '/' : ''}${media.filename}.${
		media.type || 'png'
	}`
}
