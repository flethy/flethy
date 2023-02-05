import Cronitor from '@flethy/connectors/src/configs/cronitor.config'

const sendEvent: Cronitor.SendEvent = {
  kind: 'cronitor.telemetry.sendEvent',
  'auth:apikey': process.env.CRONITOR_API_KEY,
  'param:monitorKey': 'flethy-monitor',
}

const configs = {
  sendEvent,
}

export default { configs }
