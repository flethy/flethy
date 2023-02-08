import PlausibleAnalytics from '@flethy/connectors/src/configs/plausibleanalytics.config'

const sendEvent: PlausibleAnalytics.SendEvent = {
  kind: 'plausibleanalytics.events.send',
  'header:User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
  'header:X-Forwarded-For': '127.0.0.1',
  'body:domain': 'flethy.com',
  'body:name': 'pageview',
  'body:url': 'https://flethy.com/roadmap',
}

const configs = {
  sendEvent,
}

export default { configs }
