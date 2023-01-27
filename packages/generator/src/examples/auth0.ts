import { Auth0 } from '../../../connectors/src/configs/auth0.config'

const token: Auth0.GetAuthAccessToken = {
  kind: 'auth0.auth.accesstoken',
  'body:audience': process.env.AUTH0_AUDIENCE,
  'body:grant_type': 'client_credentials',
  'body:client_id': process.env.AUTH0_CLIENT_ID,
  'body:client_secret': process.env.AUTH0_CLIENT_SECRET,
  'subdomain:tenant': process.env.AUTH0_TENANT,
}

const configureCustomDomains: Auth0.ConfigureNewCustomDomains = {
  kind: 'auth0.domains.configureNew',
  'auth:Authorization': process.env.AUTH0_JWT,
  'subdomain:tenant': process.env.AUTH0_TENANT,
  'body:domain': 'login.flethy.com',
  'body:type': 'auth0_managed_certs',
}

// auth0UpdateUser: nao<Auth0.UpdateUser>({
//   kind: 'auth0.users.update',
//   'auth:Authorization': process.env.AUTH0_JWT,
//   'param:id': process.env.AUTH0_USER_ID,
//   'subdomain:tenant': process.env.AUTH0_TENANT,
//   'body:app_metadata': {
//     ws: [
//       {
//         id: '123',
//         r: ['o'],
//         p: [
//           {
//             id: '456',
//             r: ['o'],
//           },
//         ],
//       },
//     ],
//   },
// }),
// auth0CreateUser: nao<Auth0.CreateUser>({
//   kind: 'auth0.users.create',
//   'auth:Authorization': process.env.AUTH0_JWT,
//   'subdomain:tenant': process.env.AUTH0_TENANT,
//   'body:email': '',
//   'body:family_name': '',
//   'body:given_name': '',
// }),
// auth0SearchUsers: nao<Auth0.ListOrSearchUsers>({
//   kind: 'auth0.users.listOrSearch',
//   'auth:Authorization': process.env.AUTH0_JWT,
//   'query:search_engine': 'v3',
//   'query:q': 'email:web3nao@gmail.com',
//   'subdomain:tenant': process.env.AUTH0_TENANT,
// }),
// auth0GetUser: nao<Auth0.GetUser>({
//   kind: 'auth0.users.get',
//   'auth:Authorization': process.env.AUTH0_JWT,
//   'subdomain:tenant': process.env.AUTH0_TENANT,
//   'param:id': process.env.AUTH0_USER_ID,
// }),
// auth0GetUsersByEmail: nao<Auth0.GetUsersByEmail>({
//   kind: 'auth0.usersByEmail.get',
//   'auth:Authorization': process.env.AUTH0_JWT,
//   'subdomain:tenant': process.env.AUTH0_TENANT,
//   'query:email': 'adam@flethy.com',
// }),

const configs = {
  token,
  configureCustomDomains,
}

export default { configs }
