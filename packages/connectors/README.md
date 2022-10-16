# flethy connectors

Supporting 188 APIs. Find all APIs [here](https://github.com/flethy/flethy/tree/main/docs).

## What and Why?

flethy connectors is a zero-dependency library that provides http configs for a number of web3 (and web2) APIs in a simple way. The whole library is fully typed and gives easy access to the included APIs.

Motivated to implement for a simple reason: less dependencies in your own projects. What I have done so far:

1. I want to use a service.
2. I'm looking for a corresponding SDK or a suitable package that simplifies the integration with.
3. Profit

What I haven't done: examine each package for their deployed dependencies. The effect is that my own application gets unnecessarily many dependencies, and strictly speaking I can't be completely sure what happens inside the library. Of course, this also opens up some attack vectors.

With flethy you don't get any additional dependency. It just contains an easy to use and typed API to use services. It is ultimately up to the user which http client to use (`got`, `axios`, `fetch`, ...). The config is mapped to the config of the http client and done.

A significant advantage in my opinion are the provided interfaces. If I connect a new API, or connect an API that I already know but haven't used for a while, I always have to invest time to find out how to use the API: Authorization, headers, payload, paths, ... The types in flethy make the integration much more effective and efficient, because less mistakes happen and you get the expected result faster.

[![flethy in action](https://img.youtube.com/vi/icKIxm2hwPI/0.jpg)](https://www.youtube.com/watch?v=icKIxm2hwPI '@flethy/connectors')

## Installation

```bash
npm i @flethy/connectors
# or
yarn add @flethy/connectors
```

## Usage

The package consists of one function, and various namespaces that abstract the service APIs. Below is an example of uploading a JSON file to [Web3Storage](https://web3.storage/):

```ts
import { nao, Web3Storage } from '@flethy/connectors'

const requestConfig = nao<Web3Storage.UploadContent>({
  kind: 'web3storage.upload.content',
  'auth:Authorization': process.env.WEB3_STORAGE_API_TOKEN,
  'body:content': {
    testString: 'testString',
    testNumber: 1,
    testBoolean: true,
  },
})
```

The following JSON represents the content of `requestConfig`:

```json
{
  "method": "POST",
  "url": "https://api.web3.storage/upload",
  "headers": {
    "Authorization": "Bearer WEB3_STORAGE_TOKEN"
  },
  "body": {
    "content": {
      "testString": "testString",
      "testNumber": 1,
      "testBoolean": true
    }
  }
}
```

Find all available service API configurations [here](./src/configs/).

### Integrate with http client (axios)

With the above example it's just the following code to execute the http request by using [axios](https://axios-http.com/):

Install `axios`:

```bash
npm i axios
# or
yarn add axios
```

Use it the following way:

```ts
import axios from 'axios'
import { nao, Web3Storage } from '@flethy/connectors'

// create your request config

const requestConfig = nao<...>({...})

// execute http request

async function main() {
  const response = await axios({
    method: requestConfig.method,
    url: requestConfig.url,
    headers: requestConfig.headers,
    data: requestConfig.body,
  })
  return response
}

main()
```

## Supported Endpoints

Find a list of all supported endpoints [here](../docs/README.md).

## Contribution

The number of integrated APIs is severely limited so far. Services that I need on a regular basis are integrated. More integrations happen on feedback basis, because I personally need another integration, or because someone implements an API configuration.

I'm very happy if you add more APIs and so more services can be easily connected via flethy. Just create a branch, and as soon as a configuration is ready create a new PR for it.

## Remark

I am of course aware that the approach I am taking with flethy is not complete or limited. It will be difficult with pure on-board tools to cover all conceivable scenarios. Take for example APIs that expect multiform data, or files to be transferred. Or header information for interaction with AWS services, where certain crypto signatures have to be used. In these cases, it must ultimately be decided what is more important: a simple API or no dependencies. But this question can be answered when the time comes ;)

To make the use of flethy as comfortable as possible, a lot of information is included in the API config. This includes for example the URL of the API. Of course you have to trust that this information is correct. In the first step, I will always manually check that a PR is **not** redirecting API endpoints to possibly malicious endpoints. In the future, I will think of an automated mechanism to validate this.
