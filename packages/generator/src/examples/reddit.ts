import Reddit from '@flethy/connectors/src/configs/reddit.config'
import { nao } from '../../../connectors/src/utils/Request.utils'

const listTopPosts: Reddit.ListTopPosts = {
  kind: 'reddit.posts.listTop',
  'param:subreddit': 'nodejs',
}

const configs = {
  listTopPosts,
}

export default { configs }
