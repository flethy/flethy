export type FetchMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD'

export interface FetchParams {
  method: FetchMethod
  url: string
}
