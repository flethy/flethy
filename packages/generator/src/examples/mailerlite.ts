import MailerLite from '@flethy/connectors/src/configs/mailerlite.config'

const listSubscribers: MailerLite.ListSubscribers = {
  kind: 'mailerlite.subscribers.list',
  'auth:Authorization': process.env.MAILERLITE_API_TOKEN,
}

const createSubscriber: MailerLite.CreateSubscriber = {
  kind: 'mailerlite.subscribers.create',
  'auth:Authorization': process.env.MAILERLITE_API_TOKEN,
  'body:email': 'adam.urban@gmail.com',
}

const configs = {
  listSubscribers,
  createSubscriber,
}

export default { configs }
