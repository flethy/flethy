export enum CODE_EXAMPLES {
	WEB3_STORAGE = `import { nao, Web3Storage } from '@flethy/connectors'

const requestConfig = nao<Web3Storage.UploadContent>({
  kind: 'web3storage.upload.content',
  'auth:Authorization': process.env.API_TOKEN,
  'body:content': {
    testString: 'testString',
    testNumber: 1,
    testBoolean: true,
  },
})`,
	AUTH0 = `import { nao, Auth0 } from '@flethy/connectors'

const requestConfig = nao<Auth0.ListOrSearchUsers>({
  kind: 'auth0.users.listOrSearch',
  'auth:Authorization': process.env.JWT,
  'query:search_engine': 'v3',
  'query:q': 'email:adam@flethy.com',
  'subdomain:tenant': process.env.TENANT,
})`,

	SUPABASE = `import { nao, Supabase } from '@flethy/connectors'

nao<Supabase.ReadRows>({
  kind: 'supabase.core.read',
  'auth:apikey': process.env.API_KEY,
  'auth:Authorization': process.env.API_KEY,
  'subdomain:postgres-ref': process.env.POSTGRES_REF,
  'param:table': 'flethy',
  'query:select': '*',
  'customQuery:filter': {
    id: 'eq.1',
  },
})`,
}
