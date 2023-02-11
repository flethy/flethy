import IPApi from '@flethy/connectors/src/configs/ipapi.config'

const completeLocation: IPApi.CompleteLocation = {
  kind: 'ipapi.core.completeLocation',
  'param:ip': '',
  'param:format': 'json',
}

const configs = {
  completeLocation,
}

export default { configs }
