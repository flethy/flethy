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
  | 'books'
  | 'finance'
  | 'data'
  | 'cloud'
  | 'search'
  | 'network'
  | 'identity'
  | 'career'
  | 'news'
  | 'infra'
  | 'machinelearning'
  | 'community'
  | 'business'
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
  | BOOKS_TYPE
  | FINANCE_TYPE
  | DATA_TYPE
  | CLOUD_TYPE
  | SEARCH_TYPE
  | NETWORK_TYPE
  | IDENTITY_TYPE
  | CAREER_TYPE
  | NEWS_TYPE
  | INFRA_TYPE
  | MACHINE_LEARNING_TYPE
  | COMMUNITY_TYPE
  | BUSINESS_TYPE

export type COMM_TYPE = 'email' | 'messenger' | 'multichannel'
export type STORAGE_TYPE = 'ipfs' | 'database'
export type AGGREGATION_TYPE =
  | 'indexer'
  | 'transactions'
  | 'prices'
  | 'businessdata'
export type GATEWAY_TYPE = 'httpProvider'
export type VERSION_CONTROL_TYPE = 'hosted'
export type COLLAB_TYPE =
  | 'spreadsheet'
  | 'notes'
  | 'issueticketing'
  | 'forum'
  | 'events'
  | 'translations'
export type ANALYTICS_TYPE = 'webinsights'
export type TOOLS_TYPE = 'cron' | 'hr'
export type MARKETING_TYPE =
  | 'inbound'
  | 'content'
  | 'socialmedia'
  | 'crm'
  | 'media'
  | 'blogging'
export type AUTOMATION_TYPE = 'workflows' | 'decisions'
export type UTILS_TYPE =
  | 'emailverification'
  | 'documentsigning'
  | 'other'
  | 'calendar'
  | 'url-shortener'
  | 'survey'
  | 'translation'
  | 'domains'
  | 'time-tracking'
  | 'image-processing'
  | 'delivery-tracking'
  | 'api-wrapper'
  | 'web-scraping'
  | 'web-analyzer'
  | 'pdf-generation'
  | 'avatar'
export type DEFI_TYPE = 'liquidity'
export type BOOKS_TYPE = 'index'
export type FINANCE_TYPE = 'currency' | 'payment'
export type DATA_TYPE =
  | 'validation'
  | 'resolution'
  | 'image-provider'
  | 'brands'
export type CLOUD_TYPE = 'services'
export type SEARCH_TYPE = 'serp'
export type NETWORK_TYPE = 'cdn'
export type IDENTITY_TYPE = 'identitymanagement'
export type CAREER_TYPE = 'job-listings'
export type NEWS_TYPE = 'software' | 'everything'
export type INFRA_TYPE = 'logging' | 'monitoring' | 'serverless'
export type MACHINE_LEARNING_TYPE = 'platform'
export type COMMUNITY_TYPE = 'user-feedback'
export type BUSINESS_TYPE = 'subscription-analytics'
