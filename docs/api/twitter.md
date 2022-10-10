# Twitter

## Links

* URL: [https://twitter.com](https://twitter.com)
* Documentation: [https://developer.twitter.com/en/docs/twitter-api](https://developer.twitter.com/en/docs/twitter-api)
* Tags: web2
* Category: marketing
* Type: socialmedia

## API

### auth

#### bearer

##### Authentication

* Authorization: header:basic
* grant_type: body:form

##### Bearer Token

* Description: Bearer Token
* Docs: [https://developer.twitter.com/en/docs/authentication/oauth-2-0/bearer-tokens](https://developer.twitter.com/en/docs/authentication/oauth-2-0/bearer-tokens)

#### oAuth2AuthorizationCode

##### Authentication

* grant_type: body:form
* refresh_token: body:form
* client_id: body:form
* client_secret: body:form

##### OAuth2 Authorization Code

* Description: OAuth2 Authorization Code
* Docs: [https://developer.twitter.com/en/docs/authentication/oauth-2-0/authorization-code](https://developer.twitter.com/en/docs/authentication/oauth-2-0/authorization-code)

### manage

#### postTweets

##### Authentication

* Authorization: header:basic

##### Post Tweets

* Description: Creates a Tweet on behalf of an authenticated user.
* Docs: [https://developer.twitter.com/en/docs/twitter-api/tweets/manage-tweets/api-reference/post-tweets](https://developer.twitter.com/en/docs/twitter-api/tweets/manage-tweets/api-reference/post-tweets)

### v1status

#### update

##### Authentication

* Authorization: header:basic

##### Status Update

* Description: Updates the authenticating user's current status, also known as Tweeting.
* Docs: [https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/post-statuses-update](https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/post-statuses-update)
