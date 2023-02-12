import Dune from '@flethy/connectors/src/configs/dune.config'

const executeQuery: Dune.ExecuteQuery = {
  kind: 'dune.query.execute',
  'auth:x-dune-api-key': process.env.DUNE_API_KEY,
  'param:queryId': '1',
}

const configs = {
  executeQuery,
}

export default { configs }
