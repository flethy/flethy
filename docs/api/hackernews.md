# HackerNews

## Links

* URL: [https://news.ycombinator.com/](https://news.ycombinator.com/)
* Documentation: [https://github.com/HackerNews/API](https://github.com/HackerNews/API)
* Tags: web2
* Category: news
* Type: everything

## API

### core

#### item

##### Items

* Description: Stories, comments, jobs, Ask HNs and even polls are just items. They're identified by their ids, which are unique integers, and live under /v0/item/<id>.
* Docs: [https://github.com/HackerNews/API#items](https://github.com/HackerNews/API#items)

#### user

##### Users

* Description: Users are identified by case-sensitive ids, and live under /v0/user/. Only users that have public activity (comments or story submissions) on the site are available through the API.
* Docs: [https://github.com/HackerNews/API#users](https://github.com/HackerNews/API#users)

#### live

##### Live Data

* Description: The coolest part of Firebase is its support for change notifications. While you can subscribe to individual items and profiles, you'll need to use the following to observe front page ranking, new items, and new profiles.
* Docs: [https://github.com/HackerNews/API#live-data](https://github.com/HackerNews/API#live-data)
