import { Template } from '../types/template.types'

export const TwitterThread: Template = {
  id: 'twitter-thread',
  level: 'Intermediate',
  meta: {
    name: 'Building your own Twitter Thread Generator',
    description: `Twitter threads have become quite popular. A lot of information can be packed into one thread, and in my opinion, Twitter threads are quite enjoyable to read.`,
    prereq: [
      {
        text: 'Create a Twitter Developer Account',
        link: {
          href: 'https://developer.twitter.com',
          label: 'Twitter Developer',
        },
      },
      {
        text: 'Create a Twitter App and get the keys. Make sure that you create a Twitter app that has read and write permissions.',
        link: {
          href: 'https://developer.twitter.com/en/portal/dashboard',
          label: 'Twitter Developer',
        },
        secrets: [
          'CONSUMER_KEY',
          'CONSUMER_SECRET',
          'ACCESS_TOKEN',
          'ACCESS_TOKEN_SECRET',
        ],
      },
    ],
    docs: [
      {
        type: 'docs',
        href: 'https://docs.flethy.com/docs/guides/tutorials/twitter-thread',
        label: 'flethy docs',
      },
      {
        type: 'blog',
        href: 'https://dev.to/urbanisierung/building-your-own-twitter-thread-generator-12fm',
        label: 'dev.to',
      },
    ],
    services: ['twitter'],
    category: 'social-media',
    tags: ['twitter', 'thread', 'automation'],
  },
  flow: {
    nodes: [
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
          '->context.input.thread[$$.context.thread.counter]->string',
        'body:reply': {
          in_reply_to_tweet_id: '->context.tweet.data.id->string',
        },
      },
    ],
  },
}
