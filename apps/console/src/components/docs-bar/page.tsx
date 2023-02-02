import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Container,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { useMst } from '../../models/root'

export default observer(() => {
	const { t } = useTranslation('app')
	const {
		root: {
			components: { docsBar: component },
		},
	} = useMst()

	let content = null

	if (component.docItems.length > 0) {
		content = (
			<Container maxW={'7xl'} mb={5}>
				<Accordion allowMultiple>
					{component.getDocItems().map((item) => {
						return (
							<AccordionItem key={item.id}>
								<h2>
									<AccordionButton>
										<Box as="span" flex="1" textAlign="left">
											{item.title}
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel pb={4}>{item.description}</AccordionPanel>
							</AccordionItem>
						)
					})}
				</Accordion>
			</Container>
		)
	}

	return content
})
