import { observer } from 'mobx-react-lite'
import { useMst } from '../../models/root'

export default observer(() => {
	const {
		root: {
			pages: { cats: page },
		},
	} = useMst()

	if (page.pageModelFetching()) {
		return <div>Loading...</div>
	}

	return (
		<>
			{page.randomCats().map((cat) => {
				return (
					<div key={cat.id}>
						<p>{cat.id}</p>
						<img src={cat.url} />
					</div>
				)
			})}
		</>
	)
})
