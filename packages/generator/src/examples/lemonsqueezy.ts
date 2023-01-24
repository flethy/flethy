import LemonSqueezy from '@flethy/connectors/src/configs/lemonsqueezy.config'
import { nao } from '@flethy/connectors/src/utils/Request.utils'

const usersMe: LemonSqueezy.RetrieveUser = {
  kind: 'lemonsqueezy.users.me',
  'content-type': 'application/vnd.api+json',
  accept: 'application/vnd.api+json',
  'auth:Authorization': process.env.LEMONSQUEEZY_API_KEY,
}

const subscriptionsList: LemonSqueezy.ListSubscriptions = {
  kind: 'lemonsqueezy.subscriptions.list',
  'content-type': 'application/vnd.api+json',
  accept: 'application/vnd.api+json',
  'auth:Authorization': process.env.LEMONSQUEEZY_API_KEY,
}

const productsList: LemonSqueezy.ListProducts = {
  kind: 'lemonsqueezy.products.list',
  'content-type': 'application/vnd.api+json',
  accept: 'application/vnd.api+json',
  'auth:Authorization': process.env.LEMONSQUEEZY_API_KEY,
}

const configs = {
  usersMe,
  subscriptionsList,
  productsList,
}

export default { configs }
