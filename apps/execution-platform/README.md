# Execution Platform

## Dev

### CloudFlare Workers

Create KV namespaces:

```bash
wrangler kv:namespace create "NAME"
wrangler kv:namespace create --preview "NAME"
```

Afterwards add to `wrangler.toml`:

```toml
kv_namespaces = [
    { binding = "NAME", id = "...", preview_id = "..." },
]
```

Secrets

Secrets need to be created/updated first for an environment before publishing workers.

```bash
wrangler secret:bulk flethy.secrets.dev.json
```

### Runbook new environment

- Auth0: Setup
  - Add API with audience `https://[stage].flethy.com`
    - Name `flethy-backend`
  - Add Application (SPA)
    - Name `flethy-console`
    - Get values for `CLIENT_ID` and update Frontend ENV VARS
    - Login URI: `https://dev.console.flethy.com`
    - Callback URLS:
    - `http://localhost:4200, https://flethy-console-dev.pages.dev, https://*.flethy-console-dev.pages.dev, https://dev.console.flethy.com`
  - M2M application `flethy-backend`
    - Add API access to management API with permission `update:user`
    - Get values for `CLIENT_ID` and `CLIENT_SECRET`
  - Update `JWK` in EP
  - Branding
    - Colors
      - Widget
        - Logo: https://flethy.com/favicon.png
        - Logo Height: 75px
      - Page background: `#A33792`
    - Texts
  - Authentication
    - Social:
      - Google: https://marketplace.auth0.com/integrations/google-social-connection
      - Github: https://marketplace.auth0.com/integrations/github-social-connection
  - Auth Action (Flow)
    - Login, name: `Enrich App Metadata Login`
- Console: Setup
  - `.env`
  - Update `_headers`
- Workers: create new service - name needs to be the same as in `wrangler.toml`
  - Add env vars
    - Bulk command: `wrangler secret:bulk SECRETS.json --env ENV`
    - SECRET_AUTH_AUDIENCE = "`AUDIENCE`" - use auth0 audience
    - SECRET_AUTH_CLIENT_ID = "`CLIENT_ID`"
    - SECRET_AUTH_CLIENT_SECRET = "`CLIENT_SECRET`"
    - SECRET_AUTH_TENANT = "`TENANT`" - use tenant subdomain
    - SECRET_SECRET
  - Add KV Namespaces
    - Update `wrangler.toml`
  - Publish
- Pages: create new project - direct upload
  - Add custom domain
