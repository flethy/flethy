import APITable from '@flethy/connectors/src/configs/apitable.config'

const getRecords: APITable.GetRecords = {
  kind: 'apitable.records.get',
  'auth:Authorization': process.env.APITABLE_API_KEY,
  'param:tableId': process.env.APITABLE_TABLE_ID,
}

const configs = {
  getRecords,
}

export default { configs }
