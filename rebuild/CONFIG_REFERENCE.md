# Configuration Reference: New Monorepo

Complete configuration files for the flethy-connectors monorepo.

---

## Directory Structure

```
flethy-connectors/
├── .github/workflows/ci.yml
├── .gitignore
├── .npmrc
├── biome.json
├── package.json
├── pnpm-workspace.yaml
├── README.md
├── tsconfig.json
├── turbo.json
├── packages/
│   ├── connectors/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── index.ts
│   │       └── generated/ (auto-generated)
│   ├── runtime/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── index.ts
│   │       ├── types.ts
│   │       ├── request-builder.ts
│   │       └── auth-handlers.ts
│   └── tsconfig/
│       ├── package.json
│       ├── base.json
│       └── library.json
├── tools/
│   ├── generators/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── index.ts
│   │       ├── fetch-specs.ts
│   │       ├── generate-types.ts
│   │       └── generate-configs.ts
│   └── validators/
├── apps/
│   ├── docs/
│   └── playground/
└── specs/
    ├── cache/
    ├── manual/
    └── overrides/
```

---

## Root Configuration Files

### package.json (Root)

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
    "test:watch": "turbo run test:watch",
    "clean": "turbo run clean && rm -rf node_modules .turbo",
    "typecheck": "turbo run typecheck",
    "generate": "turbo run generate",
    "generate:specs": "tsx tools/generators/src/fetch-specs.ts",
    "generate:types": "tsx tools/generators/src/generate-types.ts",
    "generate:configs": "tsx tools/generators/src/generate-configs.ts",
    "publish:check": "pnpm build && pnpm test && pnpm check",
    "changeset": "changeset",
    "version": "changeset version",
    "release": "pnpm publish:check && changeset publish"
  },
  "devDependencies": {
    "@biomejs/biome": "^1.9.0",
    "@changesets/cli": "^2.27.0",
    "turbo": "^2.2.0",
    "typescript": "^5.6.0",
    "tsx": "^4.19.0",
    "vitest": "^2.1.0"
  }
}
```

### pnpm-workspace.yaml

```yaml
packages:
  - "packages/*"
  - "tools/*"
  - "apps/*"
```

### .npmrc

```
# Peer dependencies
auto-install-peers=true
strict-peer-dependencies=false

# Hoisting for better compatibility
shamefully-hoist=true

# Save exact versions
save-exact=true

# Registry (optional - for private registry)
# registry=https://registry.npmjs.org/
```

### turbo.json

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": [".env", "tsconfig.json", "biome.json"],
  "globalEnv": ["NODE_ENV"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "build/**", ".next/**"],
      "env": ["NODE_ENV"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^build"],
      "outputs": [],
      "cache": true
    },
    "typecheck": {
      "dependsOn": ["^build"],
      "outputs": [],
      "cache": true
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"],
      "env": ["NODE_ENV", "CI"],
      "cache": true
    },
    "test:watch": {
      "cache": false,
      "persistent": true
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

### biome.json

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
      "correctness": {
        "noUnusedVariables": "error",
        "useExhaustiveDependencies": "warn"
      },
      "style": {
        "useImportType": "error",
        "useNodejsImportProtocol": "error",
        "useConst": "error"
      },
      "suspicious": {
        "noExplicitAny": "warn",
        "noConsoleLog": "warn"
      },
      "complexity": {
        "noForEach": "off"
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
      "arrowParentheses": "asNeeded",
      "bracketSpacing": true,
      "bracketSameLine": false
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
      "pnpm-lock.yaml",
      "*.tsbuildinfo"
    ],
    "include": ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx", "**/*.json"]
  }
}
```

### tsconfig.json (Root)

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Root TypeScript Config",
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
    "allowSyntheticDefaultImports": true,
    "noEmit": true
  },
  "exclude": ["node_modules", "dist", "build", ".turbo", "coverage"]
}
```

### .gitignore

```gitignore
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
test-results/

# Environment
.env
.env.local
.env.*.local
!.env.example

# IDE
.vscode/
!.vscode/settings.json
!.vscode/extensions.json
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
lerna-debug.log*

# Generated files
**/generated/
*.gen.ts

# Specs cache
specs/cache/*.json
specs/cache/*.yaml
!specs/cache/.gitkeep

# OS
Thumbs.db
.AppleDouble
.LSOverride

# Temporary
tmp/
temp/
*.tmp
```

---

## Package Configurations

### packages/tsconfig/base.json

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Base TypeScript Configuration",
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
    "strictNullChecks": true,
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022"],
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "incremental": true,
    "noUncheckedIndexedAccess": true
  },
  "exclude": ["node_modules", "dist", "build", "**/*.test.ts", "**/*.spec.ts"]
}
```

### packages/tsconfig/library.json

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Library TypeScript Configuration",
  "extends": "./base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "composite": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "build", "**/*.test.ts", "**/*.spec.ts"]
}
```

### packages/runtime/package.json

```json
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
  "files": ["dist", "README.md", "LICENSE"],
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "clean": "rm -rf dist *.tsbuildinfo",
    "typecheck": "tsc --noEmit",
    "lint": "biome check src",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "keywords": [
    "http",
    "request",
    "builder",
    "zero-dependencies",
    "typescript",
    "api"
  ],
  "license": "MIT",
  "dependencies": {},
  "devDependencies": {
    "@flethy/tsconfig": "workspace:*",
    "@biomejs/biome": "^1.9.0",
    "typescript": "^5.6.0",
    "vitest": "^2.1.0"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

### packages/connectors/package.json

```json
{
  "name": "@flethy/connectors",
  "version": "0.1.0",
  "description": "Type-safe HTTP request builders for 300+ APIs (zero dependencies)",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./github": {
      "types": "./dist/generated/configs/github.d.ts",
      "import": "./dist/generated/configs/github.js"
    },
    "./stripe": {
      "types": "./dist/generated/configs/stripe.d.ts",
      "import": "./dist/generated/configs/stripe.js"
    }
  },
  "files": ["dist", "README.md", "LICENSE"],
  "keywords": [
    "api",
    "http",
    "rest",
    "openapi",
    "typescript",
    "zero-dependencies",
    "request-builder"
  ],
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "clean": "rm -rf dist src/generated *.tsbuildinfo",
    "typecheck": "tsc --noEmit",
    "lint": "biome check src",
    "generate": "tsx ../../tools/generators/src/index.ts",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "license": "MIT",
  "dependencies": {
    "@flethy/runtime": "workspace:*"
  },
  "devDependencies": {
    "@flethy/tsconfig": "workspace:*",
    "@biomejs/biome": "^1.9.0",
    "typescript": "^5.6.0",
    "tsx": "^4.19.0",
    "vitest": "^2.1.0"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

### tools/generators/package.json

```json
{
  "name": "@flethy/generators",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "tsc",
    "dev": "tsx watch src/index.ts",
    "generate": "tsx src/index.ts",
    "clean": "rm -rf dist *.tsbuildinfo",
    "typecheck": "tsc --noEmit",
    "lint": "biome check src"
  },
  "dependencies": {
    "@apidevtools/swagger-parser": "^10.1.0",
    "openapi-typescript": "^7.4.0",
    "zod": "^3.23.0"
  },
  "devDependencies": {
    "@flethy/tsconfig": "workspace:*",
    "@biomejs/biome": "^1.9.0",
    "@types/node": "^22.0.0",
    "tsx": "^4.19.0",
    "typescript": "^5.6.0"
  }
}
```

---

## CI/CD Configuration

### .github/workflows/ci.yml

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  lint-format:
    name: Lint & Format
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 8

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Format check
        run: pnpm format:check

      - name: Lint
        run: pnpm check

  typecheck:
    name: Type Check
    runs-on: ubuntu-latest
    needs: lint-format
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 8

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Type check
        run: pnpm typecheck

  build:
    name: Build
    runs-on: ubuntu-latest
    needs: typecheck
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 8

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build packages
        run: pnpm build

      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: packages/*/dist
          retention-days: 1

  test:
    name: Test
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 8

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run tests
        run: pnpm test

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        if: always()
        with:
          directory: ./coverage
```

---

## VSCode Configuration (Optional)

### .vscode/settings.json

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "biomejs.biome",
  "editor.codeActionsOnSave": {
    "quickfix.biome": "explicit",
    "source.organizeImports.biome": "explicit"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "[typescript]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[javascript]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[json]": {
    "editor.defaultFormatter": "biomejs.biome"
  }
}
```

### .vscode/extensions.json

```json
{
  "recommendations": [
    "biomejs.biome",
    "editorconfig.editorconfig"
  ]
}
```

---

## Usage Examples

### Building

```bash
# Build all packages
pnpm build

# Build specific package
pnpm --filter @flethy/runtime build

# Build with turbo cache cleared
turbo run build --force
```

### Development

```bash
# Watch mode for all packages
pnpm dev

# Watch specific package
pnpm --filter @flethy/connectors dev
```

### Linting & Formatting

```bash
# Format all files
pnpm format

# Check formatting
pnpm format:check

# Lint and fix
pnpm check:fix

# Lint only
pnpm check
```

### Testing

```bash
# Run all tests
pnpm test

# Watch mode
pnpm test:watch

# Test specific package
pnpm --filter @flethy/runtime test
```

---

This configuration provides a solid foundation for the new monorepo with modern tooling and best practices.
