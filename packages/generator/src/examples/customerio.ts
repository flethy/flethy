import CustomerIo from '@flethy/connectors/src/configs/customerio.config'

const trackSingleEvent: CustomerIo.TrackSingleEntity = {
  kind: 'customerio.track.single',
  'auth:Authorization': {
    username: process.env.CUSTOMERIO_SITE_ID,
    password: process.env.CUSTOMERIO_API_KEY,
  },
  'body:body': {
    type: 'object',
    action: 'identify',
    identifiers: {
      object_id: 'flethy',
      object_type_id: '1',
    },
    cio_relationships: [
      {
        identifiers: {
          email: 'adam@flethy.com',
        },
      },
    ],
  },
}

const configs = {
  trackSingleEvent,
}

export default { configs }
