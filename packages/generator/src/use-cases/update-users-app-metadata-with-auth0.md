---
section: Identity
title: Update Users App Metadata with Auth0
services:
  - auth0
tags:
  - identity
  - usermanagement
ts: 2022-11-23
---

When building a product or service that requires a user sign-up, it's necessary to interact with an identity management system. Identity is such a critical asset so you should rely on a mature and proven system.

A user record in Auth0 contains, among other things, user and app metadata that can be used flexibly. App Metadata are intended as special locations for the associated application, such as references to projects or workspaces. App Metadata can be updated very easily with flethy. The input payload is used to set the App Metadata.

The flethy engine takes care of the rest and executes the corresponding requests. The token received from the first node is used as an authorization header in the second node.
