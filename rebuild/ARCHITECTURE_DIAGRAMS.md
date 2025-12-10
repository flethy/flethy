# Architecture Diagrams

## Current Architecture (Manual Implementation)

```
┌─────────────────────────────────────────────────────────┐
│                     Developer                           │
│  • Reads API documentation                              │
│  • Manually writes TypeScript interfaces                │
│  • Manually writes config objects                       │
│  • Manually updates when API changes                    │
└────────────────────┬────────────────────────────────────┘
                     │ Manual typing (2-4 hours per service)
                     ▼
┌─────────────────────────────────────────────────────────┐
│           packages/connectors/src/configs/              │
│                                                         │
│  github.config.ts       (150 lines manual code)        │
│  stripe.config.ts       (120 lines manual code)        │
│  openai.config.ts       (95 lines manual code)         │
│  ... 310+ files ...                                     │
│                                                         │
│  Total: ~34,000 lines of manual code                   │
└────────────────────┬────────────────────────────────────┘
                     │ TypeScript compilation
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   dist/index.js                         │
│                                                         │
│  • 1.7MB bundle size                                    │
│  • No tree-shaking                                      │
│  • All services bundled together                        │
│  • 1-5 endpoints per service                            │
└────────────────────┬────────────────────────────────────┘
                     │ npm install
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  User Application                       │
│                                                         │
│  import { nao, GitHub } from '@flethy/connectors'      │
│  const req = nao<GitHub.ListIssues>({                  │
│    kind: 'github.issues.list',                         │
│    'param:owner': 'flethy', ...                        │
│  })                                                     │
└─────────────────────────────────────────────────────────┘

Problems:
❌ High manual effort (2-4 hours per service)
❌ Limited coverage (1-5 endpoints vs 50-200+ available)
❌ Maintenance burden (manual updates for API changes)
❌ No validation (can't verify against specs)
❌ Large bundles (no tree-shaking)
```

## Proposed Architecture (OpenAPI-Driven)

```
┌─────────────────────────────────────────────────────────┐
│              OpenAPI Specifications                     │
│                                                         │
│  • https://api.github.com/openapi.json                 │
│  • https://stripe.com/openapi/spec3.json               │
│  • https://openai.com/openapi.yaml                     │
│  • 310+ official specifications                        │
└────────────────────┬────────────────────────────────────┘
                     │ Automated fetch/cache
                     ▼
┌─────────────────────────────────────────────────────────┐
│            specs/ (cached locally)                      │
│                                                         │
│  github.json       (GitHub's official spec)            │
│  stripe.json       (Stripe's official spec)            │
│  openai.yaml       (OpenAI's official spec)            │
└────────────────────┬────────────────────────────────────┘
                     │ Build-time generation
                     ▼
┌─────────────────────────────────────────────────────────┐
│           Code Generation Pipeline                      │
│         (scripts/ - dev dependencies only)              │
│                                                         │
│  ┌──────────────────────────────────────┐              │
│  │  1. Parse OpenAPI Spec               │              │
│  │     • Validate schema                │              │
│  │     • Extract endpoints              │              │
│  │     • Extract types                  │              │
│  └──────────────┬───────────────────────┘              │
│                 │                                       │
│                 ▼                                       │
│  ┌──────────────────────────────────────┐              │
│  │  2. Generate TypeScript Types        │              │
│  │     • openapi-typescript             │              │
│  │     • 100% accurate types            │              │
│  │     • Full IntelliSense support      │              │
│  └──────────────┬───────────────────────┘              │
│                 │                                       │
│                 ▼                                       │
│  ┌──────────────────────────────────────┐              │
│  │  3. Generate Config Objects          │              │
│  │     • Custom templates               │              │
│  │     • Metadata from spec             │              │
│  │     • Helper methods                 │              │
│  └──────────────┬───────────────────────┘              │
│                 │                                       │
│                 ▼                                       │
│  ┌──────────────────────────────────────┐              │
│  │  4. Validate & Test                  │              │
│  │     • Schema validation              │              │
│  │     • Build tests                    │              │
│  │     • Bundle size check              │              │
│  └──────────────────────────────────────┘              │
└────────────────────┬────────────────────────────────────┘
                     │ Generated code (20 lines per service)
                     ▼
┌─────────────────────────────────────────────────────────┐
│         src/generated/ (auto-generated)                 │
│                                                         │
│  types/                                                 │
│    github.types.ts    (auto-generated from spec)       │
│    stripe.types.ts    (auto-generated from spec)       │
│                                                         │
│  configs/                                               │
│    github.config.ts   (20 lines - auto-generated)      │
│    stripe.config.ts   (15 lines - auto-generated)      │
│                                                         │
│  Total: ~6,000 lines (87% reduction)                   │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────┴────────────────────────────────────┐
│         src/runtime/ (zero dependencies!)               │
│                                                         │
│  request-builder.ts  - Core request building logic     │
│  auth-handlers.ts    - Authentication formatting       │
│  types.ts            - Base types                       │
│                                                         │
│  • Pure TypeScript                                      │
│  • No external dependencies                             │
│  • Tree-shakeable                                       │
└────────────────────┬────────────────────────────────────┘
                     │ TypeScript compilation + bundling
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   dist/ (ESM)                           │
│                                                         │
│  • <1MB total bundle size                               │
│  • <5KB per service (tree-shaken)                       │
│  • 50-200+ endpoints per service                        │
│  • Full type safety                                     │
└────────────────────┬────────────────────────────────────┘
                     │ npm install
                     ▼
┌─────────────────────────────────────────────────────────┐
│              User Application                           │
│                                                         │
│  // Modern API                                          │
│  import { GitHub } from '@flethy/connectors'           │
│  const req = GitHub.issues.list({                      │
│    owner: 'flethy',                                     │
│    repo: 'flethy',                                      │
│    state: 'open',                                       │
│    auth: token                                          │
│  })                                                     │
│                                                         │
│  // Tree-shaking: Only GitHub code included            │
│  // Bundle: ~3-5KB                                      │
│  // Full autocomplete and type safety                   │
└─────────────────────────────────────────────────────────┘

Benefits:
✅ 95% less manual effort (30 min → 5 min per service)
✅ Full coverage (200+ endpoints per service)
✅ Automated updates (regenerate from spec)
✅ Validation (guaranteed match to spec)
✅ Small bundles (tree-shakeable, <5KB per service)
✅ Zero runtime dependencies (maintained!)
```

## Data Flow Comparison

### Current (Manual) Flow
```
API Docs → Developer → Manual Code → Compile → Bundle → User
  (slow)   (error-prone)  (34K lines)  (1.7MB)
```

### Proposed (Generated) Flow
```
OpenAPI Spec → Generator → Generated Code → Compile → Bundle → User
  (official)   (automated)   (6K lines)    (<5KB)
  ↓
  Validation, Testing, Documentation
  (automatic, guaranteed accuracy)
```

## Bundle Size Comparison

### Current (No Tree-Shaking)
```
User imports GitHub:
┌─────────────────────────────────┐
│  @flethy/connectors             │
│                                 │
│  GitHub   ███                   │
│  Stripe   ███                   │
│  OpenAI   ███                   │
│  ... 307 more services ...      │
│                                 │
│  Total: 1.7MB                   │
└─────────────────────────────────┘
```

### Proposed (Tree-Shakeable)
```
User imports GitHub:
┌─────────────────────────────────┐
│  @flethy/connectors             │
│                                 │
│  GitHub   ███  (3-5KB)         │
│                                 │
│  (everything else removed)      │
│                                 │
│  Total: 3-5KB                   │
└─────────────────────────────────┘
```

## Code Volume Comparison

```
Manual Approach (310 services):
├── github.config.ts        150 lines  ████████████
├── stripe.config.ts        120 lines  ██████████
├── openai.config.ts        95 lines   ████████
├── ... 307 more ...        ~100 lines each
│
└── Total: ~34,000 lines    100% manual effort

Generated Approach (310 services):
├── connectors.config.json  20 lines   █
├── github.config.ts        20 lines   █ (auto-generated)
├── stripe.config.ts        15 lines   █ (auto-generated)
├── openai.config.ts        12 lines   █ (auto-generated)
├── ... 307 more ...        ~15 lines each (auto-generated)
│
└── Total: ~6,000 lines     87% reduction, 5% manual effort
```

## Maintenance Workflow Comparison

### Current (Manual Updates)
```
API Changes
    ↓
Developer notices (maybe)
    ↓
Read new documentation
    ↓
Update TypeScript types manually
    ↓
Update config objects manually
    ↓
Test manually
    ↓
Deploy
    ↓
Time: 1-2 hours per change
Risk: High (human error)
```

### Proposed (Automated Updates)
```
API Changes
    ↓
New OpenAPI spec published
    ↓
Run: pnpm generate
    ↓
Code auto-generated
    ↓
Tests auto-run
    ↓
Deploy
    ↓
Time: 5 minutes
Risk: Low (automated, validated)
```

## Developer Experience Comparison

### Current
```typescript
// Manual type definition
export interface ListRepositoryIssues extends RequestParams {
  kind: 'github.issues.listrepository'
  'param:owner': string
  'param:repo': string
  'query:state'?: 'open' | 'closed' | 'all'
  'query:labels'?: string
  'query:sort'?: 'created' | 'updated' | 'comments'
  // ... 15+ more parameters
}

// Usage (verbose)
const request = nao<GitHub.ListRepositoryIssues>({
  kind: 'github.issues.listrepository',
  'param:owner': 'flethy',
  'param:repo': 'flethy',
  'query:state': 'open',
  'auth:Authorization': token
})

// Problems:
// ❌ Verbose parameter names ('param:', 'query:')
// ❌ String-based 'kind' (typo-prone)
// ❌ Only 4 endpoints available (vs 200+)
// ❌ No inline documentation
```

### Proposed
```typescript
// Auto-generated from OpenAPI spec
import { GitHub } from '@flethy/connectors'

// Usage (clean)
const request = GitHub.issues.list({
  owner: 'flethy',
  repo: 'flethy',
  state: 'open',
  auth: token
})

// Benefits:
// ✅ Clean parameter names
// ✅ Type-safe method calls
// ✅ 200+ endpoints available
// ✅ Inline documentation from spec
// ✅ Full IntelliSense autocomplete
// ✅ <5KB bundle with tree-shaking
```

---

**Summary:** Transform manual, error-prone, high-effort process into automated, validated, low-effort workflow while maintaining zero runtime dependencies.
