import { FlowNode } from '../src/types/flow.types'

export const TWITTERTHREAD_FLOW: FlowNode[] = [
  {
    id: 'first',
    next: [
      {
        id: 'reply',
        condition: {
          filter: '$count(context.input.thread) > 1',
        },
      },
    ],
    config: {
      namespace: 'tweet',
      postAssignments: [
        {
          namespace: 'thread',
          key: 'counter',
          valueToEvaluate: '$number(1)',
        },
      ],
    },
    kind: 'twitter.manage.postTweets',
    'auth:Authorization': {
      consumerKey: '==>secrets==>CONSUMER_KEY',
      consumerSecret: '==>secrets==>CONSUMER_SECRET',
      accessKey: '==>secrets==>ACCESS_TOKEN',
      accessSecret: '==>secrets==>ACCESS_TOKEN_SECRET',
    },
    'body:text': '->context.input.thread[0]->string',
  },
  {
    id: 'reply',
    next: [
      {
        id: 'reply',
        condition: {
          filter:
            '$number(context.thread.counter) < $count(context.input.thread)',
        },
      },
    ],
    config: {
      namespace: 'tweet',
      postAssignments: [
        {
          namespace: 'thread',
          key: 'counter',
          valueToEvaluate: '$number(context.thread.counter) + 1',
        },
      ],
    },
    kind: 'twitter.manage.postTweets',
    'auth:Authorization': {
      consumerKey: '==>secrets==>CONSUMER_KEY',
      consumerSecret: '==>secrets==>CONSUMER_SECRET',
      accessKey: '==>secrets==>ACCESS_TOKEN',
      accessSecret: '==>secrets==>ACCESS_TOKEN_SECRET',
    },
    'body:text':
      '->context.input.thread[$number(context.thread.counter)]->string',
    'body:reply': {
      in_reply_to_tweet_id: '->context.tweet.data.id->string',
    },
  },
]
