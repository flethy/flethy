# Bootstrap Guide: New Connectors Monorepo

**Purpose:** Set up a new standalone monorepo for the @flethy/connectors rebuild  
**Tech Stack:** pnpm workspaces, Turborepo, Biome, TypeScript, ESM  
**Date:** 2025-12-10

---

## Overview

This guide provides step-by-step instructions to bootstrap a new monorepo from scratch for rebuilding the @flethy/connectors package using OpenAPI-driven code generation.

---

## Prerequisites

Ensure you have these tools installed:

```bash
# Node.js 18+ (LTS recommended)
node --version  # Should be >= 18.0.0

# pnpm 8+
npm install -g pnpm@latest
pnpm --version  # Should be >= 8.0.0

# Git
git --version
```

---

## Step-by-Step Bootstrap Process

### Step 1: Create Repository Structure

```bash
# Create and navigate to new repository
mkdir flethy-connectors
cd flethy-connectors

# Initialize git
git init
git branch -M main

# Initialize pnpm workspace
pnpm init

# Create directory structure
mkdir -p packages/connectors
mkdir -p packages/runtime
mkdir -p packages/cli
mkdir -p packages/types
mkdir -p tools/generators
mkdir -p tools/validators
mkdir -p apps/docs
mkdir -p apps/playground
mkdir -p .github/workflows
```

### Step 2: Configure pnpm Workspace

Create `pnpm-workspace.yaml`:

```bash
cat > pnpm-workspace.yaml << 'EOF'
packages:
  - "packages/*"
  - "tools/*"
  - "apps/*"
EOF
```

Create `.npmrc`:

```bash
cat > .npmrc << 'EOF'
# Use pnpm for all package management
auto-install-peers=true
strict-peer-dependencies=false

# Enable shamefully-hoist for better compatibility
shamefully-hoist=true

# Save exact versions
save-exact=true
EOF
```

### Step 3: Configure Root package.json

Update the root `package.json`:

```json
{
  "name": "@flethy/connectors-monorepo",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "packageManager": "pnpm@9.14.0",
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
    "generate": "turbo run generate"
  },
  "devDependencies": {
    "@biomejs/biome": "^1.9.0",
    "turbo": "^2.2.0",
    "typescript": "^5.6.0"
  }
}
```

### Step 4: Install Turborepo

```bash
pnpm add -D turbo@latest
```

Create `turbo.json`:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": [".env", "tsconfig.json"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "build/**"],
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
```

### Step 5: Install and Configure Biome

```bash
pnpm add -D @biomejs/biome@latest
```

Create `biome.json`:

```json
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
      ".next",
      ".turbo",
      "coverage",
      "**/generated/**",
      "pnpm-lock.yaml"
    ]
  }
}
```

### Step 6: Configure TypeScript

Create root `tsconfig.json`:

```json
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
```

Create `packages/tsconfig/base.json`:

```bash
mkdir -p packages/tsconfig
cat > packages/tsconfig/base.json << 'EOF'
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Base TypeScript Config",
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

cat > packages/tsconfig/package.json << 'EOF'
{
  "name": "@flethy/tsconfig",
  "version": "0.0.1",
  "private": true,
  "files": ["base.json"]
}
EOF
```

### Step 7: Create .gitignore

```bash
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
yarn-debug.log*
yarn-error.log*

# Generated files
**/generated/

# OS
Thumbs.db
EOF
```

### Step 8: Create Initial Package Structures

#### Runtime Package (Zero Dependencies)

```bash
mkdir -p packages/runtime/src
cat > packages/runtime/package.json << 'EOF'
{
  "name": "@flethy/runtime",
  "version": "0.0.1",
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "clean": "rm -rf dist",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {},
  "devDependencies": {
    "@flethy/tsconfig": "workspace:*",
    "typescript": "^5.6.0"
  }
}
EOF

cat > packages/runtime/tsconfig.json << 'EOF'
{
  "extends": "@flethy/tsconfig/base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
EOF

cat > packages/runtime/src/index.ts << 'EOF'
// Core runtime for request building (zero dependencies)
export * from './request-builder.js'
export * from './types.js'
EOF
```

#### Connectors Package (Main Package)

```bash
mkdir -p packages/connectors/src/generated
cat > packages/connectors/package.json << 'EOF'
{
  "name": "@flethy/connectors",
  "version": "0.1.0",
  "description": "Type-safe HTTP request builders for 300+ APIs (zero dependencies)",
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  },
  "files": ["dist"],
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
    "generate": "node --loader tsx ../generators/index.ts"
  },
  "dependencies": {
    "@flethy/runtime": "workspace:*"
  },
  "devDependencies": {
    "@flethy/tsconfig": "workspace:*",
    "typescript": "^5.6.0"
  },
  "publishConfig": {
    "access": "public"
  }
}
EOF

cat > packages/connectors/tsconfig.json << 'EOF'
{
  "extends": "@flethy/tsconfig/base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
EOF
```

#### Generator Tools Package

```bash
mkdir -p tools/generators/src
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
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@apidevtools/swagger-parser": "^10.1.0",
    "openapi-typescript": "^7.4.0",
    "zod": "^3.23.0"
  },
  "devDependencies": {
    "@flethy/tsconfig": "workspace:*",
    "@types/node": "^20.10.0",
    "tsx": "^4.7.0",
    "typescript": "^5.6.0"
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
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
EOF
```

### Step 9: Install Dependencies

```bash
# Install all dependencies across the monorepo
pnpm install
```

### Step 10: Create GitHub Actions CI/CD

```bash
mkdir -p .github/workflows
cat > .github/workflows/ci.yml << 'EOF'
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint-and-typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: pnpm/action-setup@v4
        with:
          version: 8
      
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Biome format check
        run: pnpm format:check
      
      - name: Biome lint
        run: pnpm check
      
      - name: Type check
        run: pnpm typecheck

  build:
    runs-on: ubuntu-latest
    needs: lint-and-typecheck
    steps:
      - uses: actions/checkout@v4
      
      - uses: pnpm/action-setup@v4
        with:
          version: 8
      
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Build
        run: pnpm build
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: packages/*/dist

  test:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/checkout@v4
      
      - uses: pnpm/action-setup@v4
        with:
          version: 8
      
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Run tests
        run: pnpm test
EOF
```

### Step 11: Create README.md

```bash
cat > README.md << 'EOF'
# @flethy/connectors

> Type-safe HTTP request builders for 300+ APIs with zero runtime dependencies

## Features

- ✅ **Zero Dependencies** - No runtime dependencies
- ✅ **Type-Safe** - Full TypeScript support with auto-generated types
- ✅ **Tree-Shakeable** - ESM-only, import only what you need (<5KB per service)
- ✅ **300+ APIs** - Auto-generated from official OpenAPI specifications
- ✅ **HTTP Client Agnostic** - Works with fetch, axios, got, etc.

## Quick Start

```bash
npm install @flethy/connectors
```

```typescript
import { GitHub } from '@flethy/connectors'

const request = GitHub.issues.list({
  owner: 'flethy',
  repo: 'flethy',
  state: 'open',
  auth: process.env.GITHUB_TOKEN
})

// Use with any HTTP client
const response = await fetch(request.url, {
  method: request.method,
  headers: request.headers
})
```

## Development

This is a monorepo managed with pnpm workspaces and Turborepo.

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run in development mode
pnpm dev

# Format code
pnpm format

# Lint code
pnpm check

# Type check
pnpm typecheck

# Run tests
pnpm test
```

## Packages

- `@flethy/connectors` - Main package with all API connectors
- `@flethy/runtime` - Zero-dependency runtime for request building
- `@flethy/generators` - Code generation tools (internal)

## License

MIT
EOF
```

### Step 12: Create Initial Commit

```bash
git add .
git commit -m "chore: initial monorepo setup with pnpm, turborepo, biome, typescript"
```

---

## Next Steps After Bootstrap

### 1. Implement Core Runtime (Week 1)

Follow the implementation in `packages/runtime/src/`:
- `request-builder.ts` - Core request building logic
- `auth-handlers.ts` - Authentication formatting
- `types.ts` - Base TypeScript types

Reference: See `POC_IMPLEMENTATION_GUIDE.md` Day 1 section

### 2. Implement Code Generators (Week 1-2)

Follow the implementation in `tools/generators/src/`:
- `fetch-specs.ts` - OpenAPI spec fetcher
- `generate-types.ts` - Type generation using openapi-typescript
- `generate-configs.ts` - Config generation

Reference: See `POC_IMPLEMENTATION_GUIDE.md` Days 2-3

### 3. Add Testing Infrastructure (Week 2)

Add testing packages:

```bash
pnpm add -D vitest @vitest/ui -w
```

Create test configuration and initial tests.

### 4. Generate First Connectors (Week 2)

Start with 3 pilot services:
- GitHub
- Stripe  
- OpenAI

Reference: See `POC_IMPLEMENTATION_GUIDE.md` for complete workflow

### 5. Documentation Site (Week 3+)

Set up documentation in `apps/docs/` using:
- Docusaurus, VitePress, or Nextra
- Auto-generated API docs from OpenAPI specs

---

## Repository Structure After Setup

```
flethy-connectors/
├── .github/
│   └── workflows/
│       └── ci.yml
├── packages/
│   ├── connectors/          # Main package
│   │   ├── src/
│   │   │   ├── generated/   # Auto-generated configs
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── runtime/             # Zero-dep runtime
│   │   ├── src/
│   │   │   ├── request-builder.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── tsconfig/            # Shared TS configs
│       ├── base.json
│       └── package.json
├── tools/
│   ├── generators/          # Code generation
│   │   ├── src/
│   │   │   ├── fetch-specs.ts
│   │   │   ├── generate-types.ts
│   │   │   ├── generate-configs.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── validators/          # Validation tools
├── apps/
│   ├── docs/               # Documentation site
│   └── playground/         # Interactive examples
├── .gitignore
├── .npmrc
├── biome.json
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
├── tsconfig.json
└── turbo.json
```

---

## Key Configuration Files Summary

| File | Purpose |
|------|---------|
| `pnpm-workspace.yaml` | Define workspace packages |
| `turbo.json` | Turborepo pipeline configuration |
| `biome.json` | Biome formatter/linter config |
| `tsconfig.json` | Root TypeScript config |
| `.npmrc` | pnpm configuration |
| `.gitignore` | Git ignore patterns |

---

## Verification Steps

After setup, verify everything works:

```bash
# 1. Check pnpm workspace
pnpm list --depth 0

# 2. Format code
pnpm format

# 3. Lint code
pnpm check

# 4. Type check
pnpm typecheck

# 5. Build all packages
pnpm build

# 6. Verify Turbo cache
pnpm build  # Should use cache on second run
```

---

## Troubleshooting

### Issue: pnpm install fails

```bash
# Clear cache and retry
pnpm store prune
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Issue: TypeScript errors

```bash
# Rebuild all packages
pnpm clean
pnpm build
```

### Issue: Biome not formatting

```bash
# Check Biome version
pnpm list @biomejs/biome

# Update Biome
pnpm update @biomejs/biome --latest
```

---

## Additional Resources

- [pnpm Workspaces](https://pnpm.io/workspaces)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Biome Documentation](https://biomejs.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Ready to start?** Copy this entire guide and execute step-by-step to bootstrap your new monorepo!
