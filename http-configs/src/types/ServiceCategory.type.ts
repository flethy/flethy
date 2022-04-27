export type TAG = 'web2' | 'web3' | 'nft'
export type CATEGORY =
  | 'communication'
  | 'storage'
  | 'aggregation'
  | 'gateway'
  | 'versioncontrol'
  | 'collaboration'
export type TYPE =
  | COMM_TYPE
  | STORAGE_TYPE
  | AGGREGATION_TYPE
  | GATEWAY_TYPE
  | VERSION_CONTROL_TYPE
  | COLLAB_TYPE

export type COMM_TYPE = 'email' | 'messenger'
export type STORAGE_TYPE = 'ipfs'
export type AGGREGATION_TYPE = 'indexer' | 'transactions'
export type GATEWAY_TYPE = 'httpProvider'
export type VERSION_CONTROL_TYPE = 'hosted'
export type COLLAB_TYPE = 'spreadsheet' | 'notes'
