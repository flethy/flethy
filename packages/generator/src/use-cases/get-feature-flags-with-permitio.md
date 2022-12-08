---
section: CMS
title: Get feature flags with Permit.io
services:
  - permitio
tags:
  - utils
  - featureflags
ts: 2022-12-08
---

The use of feature flags is a technique to enable or disable certain functionalities of an application for certain user groups. The technique allows a continued development of new functionality in the current application without working in a forked branch. Many companies use this technique to try out new features for specific cohorts or to slowly release them to all users, confirming that this increases the stability and completeness of the features.

One service in this category is Permit.io. The structure of the feature flags can be configured via the front end, and the API can be used to read the feature flags per user.

flethy offers a very simple way to read feature flags from Permit.io. Just configure the node accordingly with the query information and the API token and the flethy engine takes care of the rest.
