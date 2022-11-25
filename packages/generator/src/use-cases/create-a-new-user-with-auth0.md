---
section: Identity
title: Create a new User with Auth0
services:
  - auth0
tags:
  - identity
  - usermanagement
ts: 2022-11-22
---

When building a product or service that requires a user sign-up, it's necessary to interact with an identity management system. Identity is such a critical asset so you should rely on a mature and proven system.

If you're using Auth0 as user management and want to create a new user via the API it's quite easy by using flethy. First, you need to request a token, and second you use this token to create the user.

The flethy engine takes care of the rest and executes the corresponding requests. The token received from the first node is used as an authorization header in the second node.
