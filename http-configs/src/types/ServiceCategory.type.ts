export type TAG = 'web2' | 'web3' | 'nft'
export type CATEGORY =
  | 'communication'
  | 'storage'
  | 'aggregation'
  | 'gateway'
  | 'versioncontrol'
  | 'collaboration'
  | 'analytics'
  | 'tools'
  | 'marketing'
  | 'automation'
  | 'utils'
  | 'defi'
export type TYPE =
  | COMM_TYPE
  | STORAGE_TYPE
  | AGGREGATION_TYPE
  | GATEWAY_TYPE
  | VERSION_CONTROL_TYPE
  | COLLAB_TYPE
  | ANALYTICS_TYPE
  | TOOLS_TYPE
  | MARKETING_TYPE
  | AUTOMATION_TYPE
  | UTILS_TYPE
  | DEFI_TYPE

export type COMM_TYPE = 'email' | 'messenger'
export type STORAGE_TYPE = 'ipfs'
export type AGGREGATION_TYPE = 'indexer' | 'transactions' | 'prices'
export type GATEWAY_TYPE = 'httpProvider'
export type VERSION_CONTROL_TYPE = 'hosted'
export type COLLAB_TYPE = 'spreadsheet' | 'notes' | 'issueticketing'
export type ANALYTICS_TYPE = 'webinsights'
export type TOOLS_TYPE = 'cron'
export type MARKETING_TYPE = 'inbound'
export type AUTOMATION_TYPE = 'workflows' | 'decisions'
export type UTILS_TYPE = 'emailverification'
export type DEFI_TYPE = 'liquidity'
