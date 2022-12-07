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
