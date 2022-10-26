# Prerender

## Links

* URL: [https://prerender.io/](https://prerender.io/)
* Documentation: [https://docs.prerender.io/docs](https://docs.prerender.io/docs)
* Tags: web2
* Category: marketing
* Type: seo

## API

### Authentication

* prerenderToken: body

### core

#### recache

##### Recache

* Description: You can use the recache API to cache a URL for the first time or recache a URL cached previously. This POST request needs to be in JSON format; otherwise, it won't work.
* Docs: [https://docs.prerender.io/docs/6-api](https://docs.prerender.io/docs/6-api)

#### recacheMultiple

##### Recache Multiple

* Description: The recache API can take up to 1,000 URLs per request. Make sure to change the parameter to "urls" if you want to add more than 1 url per request.
* Docs: [https://docs.prerender.io/docs/6-api](https://docs.prerender.io/docs/6-api)

#### search

##### Search

* Description: The search API lets you search for cached URLs within your account and see their cache status.
* Docs: [https://docs.prerender.io/docs/6-api](https://docs.prerender.io/docs/6-api)

#### sitemap

##### Sitemap

* Description: The sitemap API lets you add new URLs via sitemap XML files. Existing URLs will not be recached.
* Docs: [https://docs.prerender.io/docs/6-api](https://docs.prerender.io/docs/6-api)

#### clearCache

##### Clear Cache

* Description: This API will enable you to clear your cache, totally or partially. It is only available for users in our current plans. Users in our legacy plans will not have access to this API and should reach out to us to clear their cache. This call schedules a clear job. The job usually runs quite fast, but it is dependent on the size of the cache. It’s possible to check the job’s status, as shown below. There can only be one scheduled job per user. This is a POST request with two parameters.
* Docs: [https://docs.prerender.io/docs/6-api](https://docs.prerender.io/docs/6-api)
