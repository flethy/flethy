export type FetchMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD'
export type FetchResponseType =
  | 'arraybuffer'
  | 'blob'
  | 'document'
  | 'json'
  | 'text'
  | 'stream'

export interface FetchParams {
  method: FetchMethod
  url: string
  body?: any
  headers?: { [key: string]: string }
  responseType?: FetchResponseType
}
