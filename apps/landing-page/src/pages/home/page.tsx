import {
	Box,
	Center,
	Grid,
	GridItem,
	Heading,
	Image,
	Stack,
	Text,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import SyntaxHighlight from '../../components/SyntaxHighlight'
import { API_COUNT } from '../../constants/api.const'
import { CODE_EXAMPLES } from '../../constants/codeExamples.const'
import { INTEGRATIONS } from '../../constants/integrations.const'
import { BOX } from '../../constants/style.const'
import { useMst } from '../../models/root'

export default observer(() => {
	const { t } = useTranslation('app')
	const {
		root: {
			pages: { home: page },
		},
	} = useMst()

	return (
		<Center marginTop={'5rem'}>
			<Stack textAlign={'center'}>
				<Heading as="h1" size="lg" mb={4}>
					{t('title')}
				</Heading>
				<Text>{t('description')}</Text>
				<Text>{t('home.stayTuned')}</Text>
				<Box mb={'3rem'}>
					<SyntaxHighlight {...{ code: CODE_EXAMPLES.AUTH0 }} />
				</Box>
				<Heading as="h1" size="lg" mt={'3rem'}>
					{API_COUNT} {t('home.integrations')}
				</Heading>
				<Box mb={'3rem'}>
					<Grid
						templateColumns="repeat(5, 1fr)"
						gap={6}
						justifyItems={'center'}
						alignItems={'center'}
					>
						{INTEGRATIONS.map((integration) => (
							<GridItem
								key={integration.id}
								title={integration.id}
								width={{ base: '50px', md: '70px' }}
								height={{ base: '50px', md: '70px' }}
							>
								<Center
									width={'100%'}
									height={'100%'}
									bgColor={integration.light ? '#1A202C' : 'white'}
									borderRadius={BOX.borderRadius}
									borderColor={BOX.borderColor}
									borderWidth={BOX.borderWidth}
									padding={'0.5em'}
								>
									<Image
										src={`integrations/${integration.file}`}
										alt={integration.id}
										maxHeight={'100%'}
									/>
								</Center>
							</GridItem>
						))}
					</Grid>
				</Box>
			</Stack>
		</Center>
	)
})
