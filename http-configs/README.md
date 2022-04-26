# Websiteshot NodeJS Client

<hr />

<div align="center">
    <a href="https://websiteshot.app/">
        <img src="https://websiteshot-docs.s3.eu-central-1.amazonaws.com/logopublicsmall.png" width="100">
    </a>
</div>

<div align="center">
<p>Never spend time again to create awesome screenshots of your websites.</p>
</div>

<div align="center">
<a style="margin: 1em;" href="https://websiteshot.app">Website</a> | <a style="margin: 1em;" href="https://console.websiteshot.app">Console</a> | <a style="margin: 1em;" href="https://github.com/websiteshot/community/discussions">Community</a> | <a style="margin: 1em;" href="https://docs.websiteshot.app">Documentation</a>
</div>

<hr />

## Installation

```bash
npm i @websiteshot/nodejs-client --save
```

## Usage

### Import Controller and Types

```js
import {
  Config,
  CreateRequest,
  ScreenshotParameter,
  Url,
  WebsiteshotController,
} from '@websiteshot/nodejs-client'
```

### Init Client

```js
const config: Config = {
  projectId: '...',
  apikey: '...',
}

const websiteshotController = new WebsiteshotController(config)
```

### Create Screenshot Job

```js
const screenshotParameter: ScreenshotParameter = {
  width: 1200,
  height: 720,
}

const urls: Url[] = [
  {
    url: 'https://websiteshot.app',
    name: 'Websiteshot',
  },
]

const createRequest: CreateRequest = {
  screenshotParameter,
  urls,
}

await websiteshotController.create(createRequest)
```

### Create Screenshot Job with Template

```js
const createRequest: CreateRequest = {
  templateId: '...',
}

await websiteshotController.create(createRequest)
```

### Get Screenshot Jobs

```js
const config: Config = {
  projectId: '...',
  apikey: '...',
}

const websiteshotController = new WebsiteshotController(config)

const response: GetResponse = await websiteshotController.get(jobId)
```
