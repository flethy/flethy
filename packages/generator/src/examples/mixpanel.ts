import Mixpanel from '@flethy/connectors/src/configs/mixpanel.config'

const trackEvents: Mixpanel.TrackEvents = {
  kind: 'mixpanel.events.track',
  'auth:token': process.env.MIXPANEL_TOKEN,
  baseId: 'api',
  'body:body': [
    {
      properties: {
        distinct_id: 'userId',
        time: Date.now(),
      },
      event: 'test',
    },
  ],
}

const configs = {
  trackEvents,
}

export default { configs }
