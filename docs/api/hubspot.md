# Hubspot

## Links

* URL: [https://hubspot.com](https://hubspot.com)
* Documentation: [https://developers.hubspot.com/docs/api/overview](https://developers.hubspot.com/docs/api/overview)
* Tags: web2
* Category: marketing
* Type: inbound

## API

### Authentication

* Authorization: header:bearer

### auth

#### token

##### Authentication

* grant_type: body:form
* client_id: body:form
* client_secret: body:form
* refresh_token: body:form

##### Get OAuth 2.0 access and refresh tokens

* Description: Use the code you get after a user authorizes your app to get an access token and refresh token. The access token will be used to authenticate requests that your app makes. Access tokens are short lived, so you can use the refresh token to get a new access token when the current access token expires.
* Docs: [https://legacydocs.hubspot.com/docs/methods/oauth2/get-access-and-refresh-tokens](https://legacydocs.hubspot.com/docs/methods/oauth2/get-access-and-refresh-tokens)

### forms

#### submit

##### Submit data to a form

* Description: This endpoint is used to send form submission data to HubSpot.
* Docs: [https://developers.hubspot.com/docs/api/marketing/forms](https://developers.hubspot.com/docs/api/marketing/forms)

### contacts

#### createOrUpdate

##### Create or update a contact

* Description: The create or update a contact endpoint is used to create a new HubSpot contact or update an existing one. 
* Docs: [https://legacydocs.hubspot.com/docs/methods/contacts/create_or_update](https://legacydocs.hubspot.com/docs/methods/contacts/create_or_update)
