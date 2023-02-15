import {
	Button,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
	VStack,
	Text,
	Box,
	useColorModeValue,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { useMst } from '../../models/root'

export default observer(() => {
	const { t } = useTranslation('app')
	const {
		router,
		root: {
			api,
			pages: { home: page },
		},
	} = useMst()

	return (
		<VStack align={'left'}>
			<Heading as={'h2'} size={'md'}>
				Welcome to flethy!
			</Heading>
			<Text>
				We want to get you know! Fill in some basic information so we can
				personalize your experience.
			</Text>
			<Box
				p={10}
				border={'solid'}
				borderColor={useColorModeValue('gray.700', 'gray.300')}
				rounded={10}
			>
				<VStack>
					<FormControl>
						<FormLabel>Workspace Name</FormLabel>
						<Input
							type={'text'}
							value={page.onboarding.workspaceName}
							onChange={(event) =>
								page.updateOnboarding({ workspaceName: event.target.value })
							}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Project Name</FormLabel>
						<Input
							type={'text'}
							value={page.onboarding.projectName}
							onChange={(event) =>
								page.updateOnboarding({ projectName: event.target.value })
							}
						/>
					</FormControl>
					<Button
						onClick={() =>
							api.workspaces.onboard({
								workspaceName: page.onboarding.workspaceName,
								projectName: page.onboarding.projectName,
							})
						}
					>
						Let me in!
					</Button>
				</VStack>
			</Box>
		</VStack>
	)
})
