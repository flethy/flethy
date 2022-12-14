---
section: docs
title: Update OpenAPI spec to ReadMe
services:
  - readme
tags:
  - docs
  - openapi
ts: 2022-12-14
---

Documentation is an essential part for the adoptation and success of products. API descriptions are a concrete part of this. A standard has established itself in the scene: OpenAPI. An API can specify all endpoints, parameters, authentication and more. This specification can be read by machines on one side and used to render it on a web page on the other side.

One service in this category is ReadMe. ReadMe not only allows a visually sophisticated representation of the specification, but also provides automated examples for many programming languages. An API allows automated updating of the OpenAPI specification so that it can be part of a CI pipeline.

flethy offers a very simple way to update the OpenAPI specification to ReadMe. Just configure the node accordingly with the API key and the OpenAPI specification and the flethy engine takes care of the rest.
