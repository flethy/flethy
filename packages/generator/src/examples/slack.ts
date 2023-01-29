import Slack from '@flethy/connectors/src/configs/slack.config'

const incomingWebhook: Slack.IncomingWebhooksMessage = {
  kind: 'slack.incomingWebhooks.message',
  'auth:webhookid': process.env.SLACK_WEBHOOK_ID,
  'body:text': 'Hello, world!',
  'body:blocks': [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'Hello, *world*!',
      },
    },
  ],
}

const publishMessage: Slack.ChatPostMessage = {
  kind: 'slack.chat.postMessage',
  'auth:Authorization': process.env.SLACK_BOT_TOKEN,
  'body:text': 'Hello, world!',
  'body:channel': process.env.SLACK_CHANNEL_ID,
}

const listConversations: Slack.ConversationsList = {
  kind: 'slack.conversations.list',
  'auth:Authorization': process.env.SLACK_BOT_TOKEN,
}

const configs = {
  incomingWebhook,
  publishMessage,
  listConversations,
}

export default { configs }
