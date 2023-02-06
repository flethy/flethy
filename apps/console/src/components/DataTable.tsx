import {
	ArrowForwardIcon,
	CopyIcon,
	DeleteIcon,
	RepeatClockIcon,
} from '@chakra-ui/icons'
import {
	IconButton,
	Table,
	TableContainer,
	Tbody,
	Td,
	Tfoot,
	Th,
	Thead,
	Tr,
	useClipboard,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { Link } from 'mobx-router'
import { useMst } from '../models/root'

export interface DataTableCell {
	id: string
	value: any
	route?: {
		route: any
		params?: any
	}
	clipboard?: boolean
	isNumeric?: boolean
	type?: 'value' | 'MenuDelete' | 'MenuPlay' | 'RepeatClockIcon'
	onClick?: () => void
}

export interface DataTableProps {
	headers: DataTableCell[]
	showFooter?: boolean
	content: DataTableCell[][]
}

export default observer((props: DataTableProps) => {
	const { router } = useMst()
	const { onCopy, setValue, hasCopied } = useClipboard('')
	const headers = props.headers.map((header) => (
		<Th key={header.id} isNumeric={header.isNumeric}>
			{header.value}
		</Th>
	))
	const cell = (row: DataTableCell[], id: string) => {
		return row.find((cell) => cell.id === id)
	}
	const cellContent = (currentCell: DataTableCell) => {
		if (!currentCell.type || currentCell.type === 'value') {
			return (
				<>
					{currentCell.route ? (
						<Link
							router={router}
							route={currentCell.route.route}
							params={currentCell.route.params}
						>
							{currentCell.value}
						</Link>
					) : (
						<>{currentCell.value}</>
					)}
					{currentCell.clipboard && (
						<IconButton
							mx={1}
							aria-label="Copy to Clipboard"
							icon={<CopyIcon />}
							disabled={hasCopied}
							size={'xs'}
							onClick={() => {
								setValue(currentCell.value)
								onCopy()
							}}
						/>
					)}
				</>
			)
		} else {
			switch (currentCell.type) {
				case 'MenuDelete':
					return (
						<IconButton
							colorScheme="red"
							aria-label="Delete"
							size="sm"
							icon={<DeleteIcon />}
							onClick={currentCell.onClick}
						/>
					)
				case 'MenuPlay':
					return (
						<IconButton
							aria-label="Play"
							size="sm"
							icon={<ArrowForwardIcon />}
							onClick={currentCell.onClick}
						/>
					)
				case 'RepeatClockIcon':
					return (
						<IconButton
							aria-label="Cron"
							size="sm"
							icon={<RepeatClockIcon />}
							onClick={currentCell.onClick}
						/>
					)
				default:
					return null
			}
		}
	}

	return (
		<TableContainer>
			<Table variant="simple">
				<Thead>
					<Tr>{headers}</Tr>
				</Thead>
				<Tbody>
					{props.content.map((row, index) => (
						<Tr key={`row-${index}`}>
							{props.headers.map((header) => {
								const foundCell = cell(row, header.id)
								return foundCell ? (
									<Td
										key={`${header.id}-${index}`}
										isNumeric={foundCell.isNumeric}
									>
										{cellContent(foundCell)}
									</Td>
								) : (
									<Td></Td>
								)
							})}
						</Tr>
					))}
				</Tbody>
				{props.showFooter && (
					<Tfoot>
						<Tr>
							<Tr>{headers}</Tr>
						</Tr>
					</Tfoot>
				)}
			</Table>
		</TableContainer>
	)
})
