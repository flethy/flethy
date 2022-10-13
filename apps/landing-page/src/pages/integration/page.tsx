import {
	Box,
	Container,
	Flex,
	Image,
	Link,
	Stack,
	Table,
	TableCaption,
	TableContainer,
	Tag,
	Tbody,
	Td,
	Text,
	Tfoot,
	Th,
	Thead,
	Tr,
	useColorModeValue,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import FancyHeading from '../../components/molecules/fancy-heading/FancyHeading'
import { useMst } from '../../models/root'

export default observer(() => {
	const { t } = useTranslation('app')
	const {
		root: {
			pages: { integration: page },
		},
	} = useMst()
	const bg = useColorModeValue('gray.200', 'gray.700')

	let content = (
		<FancyHeading textA={`${page.id} not available`} textB={`Sorry!`} />
	)

	if (page.get()) {
		content = (
			<Container>
				<Stack gap={6} direction={{ base: 'column', md: 'row' }}>
					<FancyHeading
						textA={page.get()?.name ?? ''}
						textB={t('pages.integration.subtitle')}
					/>
					<Flex
						flex={1}
						justify={'center'}
						align={'center'}
						position={'relative'}
						w={'full'}
					>
						<Box
							position={'relative'}
							bgColor={page.get()?.light ? '#1A202C' : 'white'}
							// height={'300px'}
							rounded={4}
							boxShadow={'2xl'}
							width={'70px'}
							overflow={'hidden'}
						>
							<Image
								p={2}
								alt={page.get()?.id}
								fit={'cover'}
								align={'center'}
								w={'100%'}
								// h={'100%'}
								src={`/integrations/${page.get()?.logo}`}
							/>
						</Box>
					</Flex>
				</Stack>
				<Stack mt={5}>
					<Flex
						flex={1}
						justify={'center'}
						align={'center'}
						position={'relative'}
						w={'full'}
					>
						{page.urls().map((url) => (
							<Link
								key={url.labelId}
								px={2}
								py={2}
								rounded={'md'}
								href={url.url}
								target={'_blank'}
								_hover={{
									textDecoration: 'none',
									bg,
								}}
							>
								{t(url.labelId)}
							</Link>
						))}
					</Flex>
					<Flex
						flex={1}
						justify={'center'}
						align={'center'}
						position={'relative'}
						w={'full'}
					>
						{page.get()?.auth.map((auth) => (
							<Tag key={auth.replaceAll(':', '.')} px={2} py={2} mx={1}>
								{t(auth)}
							</Tag>
						))}
					</Flex>
					<TableContainer>
						<Table variant="simple" size="sm" my={5}>
							<Thead>
								<Tr>
									<Th>{t('pages.integration.endpoints.title')}</Th>
									<Th>{t('pages.integration.endpoints.docs')}</Th>
									<Th>{t('pages.integration.endpoints.method')}</Th>
								</Tr>
							</Thead>
							<Tbody>
								{page.get()?.endpoints.map((endpoint) => (
									<Tr key={endpoint.id}>
										<Td>{endpoint.title}</Td>
										<Td>
											<Tag p={2}>
												<Link href={endpoint.docs} target={'_blank'}>
													{t('pages.integration.endpoints.docslabel')}
												</Link>
											</Tag>
										</Td>
										<Td>
											<Tag p={2}>{endpoint.method}</Tag>
										</Td>
									</Tr>
								))}
							</Tbody>
							<Tfoot>
								<Tr>
									<Th>{t('pages.integration.endpoints.title')}</Th>
									<Th>{t('pages.integration.endpoints.docs')}</Th>
									<Th>{t('pages.integration.endpoints.method')}</Th>
								</Tr>
							</Tfoot>
						</Table>
					</TableContainer>
				</Stack>
			</Container>
		)
	}

	return content
})
