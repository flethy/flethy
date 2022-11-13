import { Box, Show } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import React, { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { anOldHope } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { BOX, FONT_SIZE } from '../constants/style.const'
import { useMst } from '../models/root'

const SyntaxHighlighter = React.lazy(() => import('react-syntax-highlighter'))

export default observer((props: { code: string }) => {
	const { t } = useTranslation('app')
	const {
		router,
		root: {},
	} = useMst()

	const codeBox = (fontSize?: string) => (
		<Suspense>
			<SyntaxHighlighter
				language="typescript"
				style={anOldHope}
				customStyle={{
					borderRadius: BOX.borderRadius,
					borderColor: BOX.borderColor,
					borderWidth: BOX.borderWidth,
					margin: '2px',
					fontSize,
				}}
			>
				{props.code}
			</SyntaxHighlighter>
		</Suspense>
	)

	return (
		<>
			<Show above="sm">
				<Box textAlign={'left'}>{codeBox()}</Box>
			</Show>
			<Show below="sm">
				<Box textAlign={'left'}>{codeBox(FONT_SIZE.sm)}</Box>
			</Show>
		</>
	)
})
