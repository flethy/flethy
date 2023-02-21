<h1 align="center">
  <br>
  <a href="http://flethy.com"><img src="https://flethy.com/favicon.png" alt="@flethy/connectors" width="200"></a>
  <br>
  @flethy/connectors
  <br>
</h1>

<h4 align="center">Zero-dependency library to connect to over 300 APIs.</h4>

<p align="center">
  <a href="https://badge.fury.io/js/@flethy%2Fconnectors">
    <img src="https://badge.fury.io/js/@flethy%2Fconnectors.svg"
         alt="npm">
  </a>
  <a href="https://flethy.com/integrations"><img src="https://img.shields.io/badge/integrations-308-blue" alt="integrations" /></a>
  <!-- <a href=""><img src="" alt="" /></a> -->
  <img src="https://img.shields.io/github/languages/top/flethy/flethy" alt="languages" />
  <img src="https://img.shields.io/bundlephobia/minzip/@flethy/connectors" alt="npm size" />
  <a href="https://gitter.im/flethy/community"><img src="https://badges.gitter.im/flethy/community.svg"></a>
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#cloud-execution">Cloud Execution</a> •
  <a href="#motivation">Motivation</a>
</p>

![screenshot](https://flethy.com/connectors.gif)

## Key Features

- Zero dependency library
- Fully typed
- Over 300 APIs integrated

## How to use

```bash
npm i @flethy/connectors
# or
yarn add @flethy/connectors
# or
pnpm add @flethy/connectors
```

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

You can find all integrations under [https://flethy.com/integrations](https://flethy.com/integrations).

## Cloud Execution

flethy is a package that can be easily integrated into your own application. However, there are use cases that are often not part of the business logic and do not necessarily have to be part of the own stack. For this, a cloud offering is currently in implementation, via which the flows can be easily deployed and started.

You can find more about this under [https://flethy.com](https://flethy.com).

## Motivation

flethy connectors is a zero-dependency library that provides http configs for a number of web3 (and web2) APIs in a simple way. The whole library is fully typed and gives easy access to the included APIs.

Motivated to implement for a simple reason: less dependencies in your own projects. What I have done so far:

1. I want to use a service.
2. I'm looking for a corresponding SDK or a suitable package that simplifies the integration with.
3. Profit

What I haven't done: examine each package for their deployed dependencies. The effect is that my own application gets unnecessarily many dependencies, and strictly speaking I can't be completely sure what happens inside the library. Of course, this also opens up some attack vectors.

With flethy you don't get any additional dependency. It just contains an easy to use and typed API to use services. It is ultimately up to the user which http client to use (`got`, `axios`, `fetch`, ...). The config is mapped to the config of the http client and done.

A significant advantage in my opinion are the provided interfaces. If I connect a new API, or connect an API that I already know but haven't used for a while, I always have to invest time to find out how to use the API: Authorization, headers, payload, paths, ... The types in flethy make the integration much more effective and efficient, because less mistakes happen and you get the expected result faster.

### Contribution

The number of integrated APIs is severely limited so far. Services that I need on a regular basis are integrated. More integrations happen on feedback basis, because I personally need another integration, or because someone implements an API configuration.

I'm very happy if you add more APIs and so more services can be easily connected via flethy. Just create a branch, and as soon as a configuration is ready create a new PR for it.

### Remark

I am of course aware that the approach I am taking with flethy is not complete or limited. It will be difficult with pure on-board tools to cover all conceivable scenarios. Take for example APIs that expect multiform data, or files to be transferred. Or header information for interaction with AWS services, where certain crypto signatures have to be used. In these cases, it must ultimately be decided what is more important: a simple API or no dependencies. But this question can be answered when the time comes ;)

To make the use of flethy as comfortable as possible, a lot of information is included in the API config. This includes for example the URL of the API. Of course you have to trust that this information is correct. In the first step, I will always manually check that a PR is **not** redirecting API endpoints to possibly malicious endpoints. In the future, I will think of an automated mechanism to validate this.
