# Detailed Prompt: Bootstrap flethy-connectors-v2 Monorepo

**Goal:** Create a new standalone monorepo from scratch for the @flethy/connectors v2 rebuild  
**Tech Stack:** pnpm workspaces, Turborepo, Biome (format/lint/check), TypeScript, ESM-only

---

## Executive Command Sequence

Run these commands in order to bootstrap the entire monorepo:

```bash
#!/bin/bash
set -e

echo "🚀 Bootstrapping flethy-connectors-v2 monorepo..."

# 1. Create project directory
mkdir -p flethy-connectors-v2
cd flethy-connectors-v2

# 2. Initialize git
git init
git branch -M main

# 3. Create directory structure
mkdir -p packages/{connectors,runtime,tsconfig,types}
mkdir -p tools/{generators,validators}
mkdir -p apps/{docs,playground}
mkdir -p .github/workflows
mkdir -p specs/{cache,manual,overrides}

# 4. Initialize pnpm
pnpm init

# 5. Create workspace configuration
cat > pnpm-workspace.yaml << 'EOF'
packages:
  - "packages/*"
  - "tools/*"
  - "apps/*"
EOF

# 6. Create .npmrc
cat > .npmrc << 'EOF'
auto-install-peers=true
strict-peer-dependencies=false
shamefully-hoist=true
save-exact=true
EOF

# 7. Update root package.json
cat > package.json << 'EOF'
{
  "name": "@flethy/connectors-monorepo",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "packageManager": "pnpm@8.15.0",
  "engines": {
    "node": ">=18.0.0",
    "pnpm": ">=8.0.0"
  },
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "format": "biome format --write .",
    "format:check": "biome format .",
    "check": "biome check .",
    "check:fix": "biome check --apply .",
    "test": "turbo run test",
    "clean": "turbo run clean && rm -rf node_modules .turbo",
    "typecheck": "turbo run typecheck",
    "generate": "turbo run generate",
    "generate:specs": "tsx tools/generators/src/fetch-specs.ts",
    "generate:types": "tsx tools/generators/src/generate-types.ts",
    "generate:configs": "tsx tools/generators/src/generate-configs.ts"
  },
  "devDependencies": {
    "@biomejs/biome": "1.4.1",
    "turbo": "1.11.3",
    "typescript": "5.3.3",
    "tsx": "4.7.0"
  }
}
EOF

# 8. Install root dependencies
pnpm install

# 9. Create turbo.json
cat > turbo.json << 'EOF'
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": [".env", "tsconfig.json"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "build/**"],
      "env": ["NODE_ENV"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^build"],
      "outputs": []
    },
    "typecheck": {
      "dependsOn": ["^build"],
      "outputs": []
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"],
      "env": ["NODE_ENV"]
    },
    "generate": {
      "cache": false,
      "outputs": ["**/generated/**"]
    },
    "clean": {
      "cache": false
    }
  }
}
EOF

# 10. Create biome.json
cat > biome.json << 'EOF'
{
  "$schema": "https://biomejs.dev/schemas/1.4.1/schema.json",
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "style": {
        "useImportType": "error",
        "useNodejsImportProtocol": "error"
      },
      "suspicious": {
        "noExplicitAny": "warn"
      }
    }
  },
  "formatter": {
    "enabled": true,
    "formatWithErrors": false,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100,
    "lineEnding": "lf"
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "trailingComma": "es5",
      "semicolons": "asNeeded",
      "arrowParentheses": "asNeeded"
    }
  },
  "json": {
    "formatter": {
      "trailingCommas": "none"
    }
  },
  "files": {
    "ignore": [
      "node_modules",
      "dist",
      "build",
      ".turbo",
      "coverage",
      "**/generated/**",
      "pnpm-lock.yaml"
    ]
  }
}
EOF

# 11. Create root tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Default",
  "compilerOptions": {
    "composite": false,
    "declaration": true,
    "declarationMap": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "inlineSources": false,
    "isolatedModules": true,
    "moduleResolution": "bundler",
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "preserveWatchOutput": true,
    "skipLibCheck": true,
    "strict": true,
    "strictNullChecks": true,
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022"],
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true
  },
  "exclude": ["node_modules", "dist", "build", ".turbo"]
}
EOF

# 12. Create .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnp
.pnp.js

# Build outputs
dist/
build/
.next/
out/
*.tsbuildinfo

# Turbo
.turbo/

# Testing
coverage/
.nyc_output/

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store

# Logs
*.log
npm-debug.log*
pnpm-debug.log*

# Generated files
**/generated/

# OS
Thumbs.db

# Specs cache
specs/cache/*.json
specs/cache/*.yaml
EOF

# 13. Create tsconfig package
cat > packages/tsconfig/package.json << 'EOF'
{
  "name": "@flethy/tsconfig",
  "version": "0.0.1",
  "private": true,
  "files": ["base.json", "library.json"]
}
EOF

cat > packages/tsconfig/base.json << 'EOF'
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "moduleResolution": "bundler",
    "preserveWatchOutput": true,
    "skipLibCheck": true,
    "strict": true,
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022"],
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true
  },
  "exclude": ["node_modules", "dist", "build"]
}
EOF

cat > packages/tsconfig/library.json << 'EOF'
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "./base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "composite": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.spec.ts"]
}
EOF

# 14. Create runtime package
cat > packages/runtime/package.json << 'EOF'
{
  "name": "@flethy/runtime",
  "version": "0.0.1",
  "description": "Zero-dependency runtime for building HTTP requests",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  },
  "files": ["dist", "README.md"],
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "clean": "rm -rf dist",
    "typecheck": "tsc --noEmit",
    "lint": "biome check src",
    "test": "vitest"
  },
  "keywords": ["http", "request", "builder", "zero-dependencies"],
  "dependencies": {},
  "devDependencies": {
    "@flethy/tsconfig": "workspace:*",
    "@biomejs/biome": "1.4.1",
    "typescript": "5.3.3",
    "vitest": "1.1.0"
  }
}
EOF

cat > packages/runtime/tsconfig.json << 'EOF'
{
  "extends": "@flethy/tsconfig/library.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  }
}
EOF

mkdir -p packages/runtime/src
cat > packages/runtime/src/index.ts << 'EOF'
export * from './request-builder.js'
export * from './types.js'
export * from './auth-handlers.js'
EOF

cat > packages/runtime/src/types.ts << 'EOF'
export interface RequestConfig {
  method: string
  url: string
  headers?: Record<string, string>
  body?: unknown
}

export interface APIConfig {
  id: string
  name: string
  baseUrl: string
  auth?: AuthConfig
  endpoints: Record<string, EndpointConfig>
}

export interface AuthConfig {
  type: 'bearer' | 'basic' | 'apikey'
  header: string
}

export interface EndpointConfig {
  method: string
  path: string
  parameters?: {
    path?: string[]
    query?: string[]
    body?: string[]
  }
}
EOF

cat > packages/runtime/src/request-builder.ts << 'EOF'
import type { APIConfig, RequestConfig } from './types.js'
import { formatAuth } from './auth-handlers.js'

export function buildRequest(
  config: APIConfig,
  endpointId: string,
  params: Record<string, unknown>
): RequestConfig {
  const endpoint = config.endpoints[endpointId]
  if (!endpoint) {
    throw new Error(\`Unknown endpoint: \${endpointId}\`)
  }

  let url = config.baseUrl + endpoint.path

  // Replace path parameters
  if (endpoint.parameters?.path) {
    for (const param of endpoint.parameters.path) {
      const value = params[param]
      if (value === undefined) {
        throw new Error(\`Missing required path parameter: \${param}\`)
      }
      url = url.replace(\`{\${param}}\`, encodeURIComponent(String(value)))
    }
  }

  // Build query string
  if (endpoint.parameters?.query) {
    const queryParams = new URLSearchParams()
    for (const param of endpoint.parameters.query) {
      if (params[param] !== undefined) {
        queryParams.append(param, String(params[param]))
      }
    }
    const queryString = queryParams.toString()
    if (queryString) {
      url += \`?\${queryString}\`
    }
  }

  // Build headers
  const headers: Record<string, string> = {}
  if (config.auth && params.auth) {
    headers[config.auth.header] = formatAuth(config.auth.type, String(params.auth))
  }

  // Build body
  let body: unknown
  if (endpoint.method !== 'GET' && endpoint.parameters?.body) {
    body = {}
    for (const param of endpoint.parameters.body) {
      if (params[param] !== undefined) {
        ;(body as Record<string, unknown>)[param] = params[param]
      }
    }
  }

  return {
    method: endpoint.method,
    url,
    headers: Object.keys(headers).length > 0 ? headers : undefined,
    body
  }
}
EOF

cat > packages/runtime/src/auth-handlers.ts << 'EOF'
export function formatAuth(type: string, value: string): string {
  switch (type) {
    case 'bearer':
      return \`Bearer \${value}\`
    case 'basic':
      return \`Basic \${btoa(value)}\`
    case 'apikey':
      return value
    default:
      return value
  }
}
EOF

# 15. Create connectors package
cat > packages/connectors/package.json << 'EOF'
{
  "name": "@flethy/connectors",
  "version": "2.0.0-alpha.1",
  "description": "Type-safe HTTP request builders for 300+ APIs (zero dependencies)",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  },
  "files": ["dist", "README.md"],
  "keywords": [
    "api",
    "http",
    "rest",
    "openapi",
    "typescript",
    "zero-dependencies"
  ],
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "clean": "rm -rf dist src/generated",
    "typecheck": "tsc --noEmit",
    "lint": "biome check src",
    "generate": "tsx ../../tools/generators/src/index.ts",
    "test": "vitest"
  },
  "dependencies": {
    "@flethy/runtime": "workspace:*"
  },
  "devDependencies": {
    "@flethy/tsconfig": "workspace:*",
    "@biomejs/biome": "1.4.1",
    "typescript": "5.3.3",
    "tsx": "4.7.0",
    "vitest": "1.1.0"
  },
  "publishConfig": {
    "access": "public"
  }
}
EOF

cat > packages/connectors/tsconfig.json << 'EOF'
{
  "extends": "@flethy/tsconfig/library.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "references": [
    {
      "path": "../runtime"
    }
  ]
}
EOF

mkdir -p packages/connectors/src/generated
cat > packages/connectors/src/index.ts << 'EOF'
// Main entry point - will export generated connectors
export { buildRequest } from '@flethy/runtime'
EOF

# 16. Create generators package
cat > tools/generators/package.json << 'EOF'
{
  "name": "@flethy/generators",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "tsc",
    "dev": "tsx watch src/index.ts",
    "generate": "tsx src/index.ts",
    "clean": "rm -rf dist",
    "typecheck": "tsc --noEmit",
    "lint": "biome check src"
  },
  "dependencies": {
    "@apidevtools/swagger-parser": "10.1.0",
    "openapi-typescript": "6.7.3",
    "zod": "3.22.4"
  },
  "devDependencies": {
    "@flethy/tsconfig": "workspace:*",
    "@biomejs/biome": "1.4.1",
    "@types/node": "20.10.6",
    "tsx": "4.7.0",
    "typescript": "5.3.3"
  }
}
EOF

cat > tools/generators/tsconfig.json << 'EOF'
{
  "extends": "@flethy/tsconfig/base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "types": ["node"]
  },
  "include": ["src/**/*"]
}
EOF

mkdir -p tools/generators/src
cat > tools/generators/src/index.ts << 'EOF'
console.log('🔧 Code generators ready')
console.log('Run specific generators:')
console.log('  - pnpm generate:specs')
console.log('  - pnpm generate:types')
console.log('  - pnpm generate:configs')
EOF

# 17. Create GitHub Actions
cat > .github/workflows/ci.yml << 'EOF'
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm format:check
      - run: pnpm check

  build:
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm typecheck
      - run: pnpm build

  test:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm test
EOF

# 18. Create README
cat > README.md << 'EOF'
# @flethy/connectors v2

Type-safe HTTP request builders for 300+ APIs with zero runtime dependencies.

## Quick Start

\`\`\`bash
pnpm install
pnpm build
\`\`\`

## Development

\`\`\`bash
pnpm dev          # Watch mode
pnpm format       # Format code
pnpm check        # Lint code
pnpm typecheck    # Type check
pnpm test         # Run tests
\`\`\`

## Packages

- \`@flethy/connectors\` - Main package
- \`@flethy/runtime\` - Zero-dep runtime

## License

MIT
EOF

# 19. Install all workspace dependencies
pnpm install

# 20. Initial commit
git add .
git commit -m "chore: initial monorepo setup

- pnpm workspaces + turborepo
- biome for formatting/linting
- typescript ESM-only
- packages: runtime, connectors
- tools: generators
- ci/cd with github actions"

echo "✅ Monorepo bootstrap complete!"
echo ""
echo "Next steps:"
echo "  cd flethy-connectors-v2"
echo "  pnpm build"
echo "  pnpm dev"
```

---

## Post-Bootstrap Validation

Run these commands to verify the setup:

```bash
# Navigate to repo
cd flethy-connectors-v2

# List all workspaces
pnpm list --depth 0

# Format code
pnpm format

# Lint code
pnpm check

# Type check
pnpm typecheck

# Build all packages
pnpm build

# Verify turbo cache (second build should be instant)
pnpm build
```

Expected output:
- ✅ No format/lint errors
- ✅ No type errors
- ✅ All packages build successfully
- ✅ Second build uses turbo cache

---

## File Checklist

After running the script, verify these files exist:

```
✅ pnpm-workspace.yaml
✅ .npmrc
✅ package.json
✅ turbo.json
✅ biome.json
✅ tsconfig.json
✅ .gitignore
✅ README.md
✅ packages/tsconfig/base.json
✅ packages/runtime/package.json
✅ packages/runtime/src/index.ts
✅ packages/connectors/package.json
✅ packages/connectors/src/index.ts
✅ tools/generators/package.json
✅ tools/generators/src/index.ts
✅ .github/workflows/ci.yml
```

---

Save this script as `bootstrap.sh` and run:

```bash
chmod +x bootstrap.sh
./bootstrap.sh
```

**Estimated time:** 5-10 minutes (including npm installs)
