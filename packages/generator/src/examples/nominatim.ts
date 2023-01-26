import Nominatim from '@flethy/connectors/src/configs/nominatim.config'

const search: Nominatim.Search = {
  kind: 'nominatim.core.search',
  'query:q': '135+pilkington+avenue,+birmingham',
  'query:format': 'json',
}

const configs = {
  search,
}

export default { configs }
