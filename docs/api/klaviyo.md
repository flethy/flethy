# Klaviyo

## Links

* URL: [https://www.klaviyo.com](https://www.klaviyo.com)
* Documentation: [https://developers.klaviyo.com](https://developers.klaviyo.com)
* Tags: web2
* Category: marketing
* Type: inbound

## API

### track

#### trackProfile

##### Authentication

* token: body

##### Track Profile Activity

* Description: This endpoint is used to track a profile's activity. The following data is encoded in a JSON object. NOTE: an account can have up to 200 unique metrics (event types). This endpoint can accept payloads up to approximately 1MB.
* Docs: [https://developers.klaviyo.com/en/reference/track-post](https://developers.klaviyo.com/en/reference/track-post)

#### identifyProfile

##### Authentication

* token: body

##### Identify Profile

* Description: This endpoint is used to track and update properties about an individual without tracking an associated event. The following data is stored in a JSON object.
* Docs: [https://developers.klaviyo.com/en/reference/identify-post](https://developers.klaviyo.com/en/reference/identify-post)

### profiles

#### getProfileId

##### Authentication

* api_key: query

##### Get Profile Id

* Description: Get a profile's Klaviyo ID given exactly one corresponding identifier: email, phone_number, or external_id. NOTE: calling this endpoint with multiple identifiers will result in an error.
* Docs: [https://developers.klaviyo.com/en/reference/get-profile-id](https://developers.klaviyo.com/en/reference/get-profile-id)

#### getProfile

##### Authentication

* api_key: query

##### Get Profile

* Description: Retrieves all the data attributes for a person, based on the Klaviyo Person ID.
* Docs: [https://developers.klaviyo.com/en/reference/get-profile](https://developers.klaviyo.com/en/reference/get-profile)
