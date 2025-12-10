# Proof of Concept Implementation Guide

**Goal:** Validate the OpenAPI-driven code generation approach with 3 pilot services  
**Timeline:** 1 week  
**Services:** GitHub, Stripe, OpenAI

---

## POC Objectives

### Must Validate

1. ✅ Can generate high-quality TypeScript types from OpenAPI specs
2. ✅ Generated code has zero runtime dependencies
3. ✅ Bundle size is smaller with tree-shaking
4. ✅ Developer experience is superior to manual approach
5. ✅ Backward compatibility is maintainable

### Success Criteria

- [ ] 80%+ reduction in lines of code
- [ ] <5KB bundle size per service (with tree-shaking)
- [ ] 100% type safety maintained
- [ ] Generated code passes linting
- [ ] All existing tests pass (if any)

---

## Step-by-Step Implementation

### Day 1: Setup & Foundation

#### 1.1 Create POC Directory

```bash
cd packages/connectors
mkdir -p poc/{scripts,specs,generated,runtime}
```

#### 1.2 Install Dev Dependencies

```bash
pnpm add -D openapi-typescript @apidevtools/swagger-parser tsx zod
```

#### 1.3 Create Basic Runtime (Zero Dependencies)

```typescript
// poc/runtime/request-builder.ts

export interface RequestConfig {
  method: string
  url: string
  headers?: Record<string, string>
  body?: any
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

export function buildRequest(
  config: APIConfig,
  endpointId: string,
  params: any
): RequestConfig {
  const endpoint = config.endpoints[endpointId]
  if (!endpoint) {
    throw new Error(`Unknown endpoint: ${endpointId}`)
  }

  // Build URL with path parameters
  let url = config.baseUrl + endpoint.path
  if (endpoint.parameters?.path) {
    for (const param of endpoint.parameters.path) {
      const value = params[param]
      if (value === undefined) {
        throw new Error(`Missing required path parameter: ${param}`)
      }
      url = url.replace(`{${param}}`, encodeURIComponent(String(value)))
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
      url += '?' + queryString
    }
  }

  // Build headers
  const headers: Record<string, string> = {}
  if (config.auth && params.auth) {
    headers[config.auth.header] = formatAuth(config.auth.type, params.auth)
  }

  // Build body
  let body: any = undefined
  if (endpoint.method !== 'GET' && endpoint.parameters?.body) {
    body = {}
    for (const param of endpoint.parameters.body) {
      if (params[param] !== undefined) {
        body[param] = params[param]
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

function formatAuth(type: string, value: string): string {
  switch (type) {
    case 'bearer':
      return `Bearer ${value}`
    case 'basic':
      return `Basic ${btoa(value)}`
    case 'apikey':
      return value
    default:
      return value
  }
}
```

### Day 2: OpenAPI Integration

#### 2.1 Fetch OpenAPI Specs

```typescript
// poc/scripts/fetch-specs.ts

import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

const SPECS = [
  {
    id: 'github',
    url: 'https://raw.githubusercontent.com/github/rest-api-description/main/descriptions/api.github.com/api.github.com.json'
  },
  {
    id: 'stripe',
    url: 'https://raw.githubusercontent.com/stripe/openapi/master/openapi/spec3.json'
  },
  {
    id: 'openai',
    url: 'https://raw.githubusercontent.com/openai/openai-openapi/main/openapi.yaml'
  }
]

async function fetchSpecs() {
  await mkdir('poc/specs', { recursive: true })
  
  for (const spec of SPECS) {
    console.log(`Fetching ${spec.id}...`)
    const response = await fetch(spec.url)
    const content = await response.text()
    const ext = spec.url.endsWith('.yaml') ? 'yaml' : 'json'
    await writeFile(join('poc/specs', `${spec.id}.${ext}`), content)
    console.log(`✓ Saved ${spec.id}.${ext}`)
  }
}

fetchSpecs().catch(console.error)
```

Run: `tsx poc/scripts/fetch-specs.ts`

#### 2.2 Generate TypeScript Types

```typescript
// poc/scripts/generate-types.ts

import openapiTS from 'openapi-typescript'
import { readdir, readFile, writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

async function generateTypes() {
  await mkdir('poc/generated/types', { recursive: true })
  
  const specs = await readdir('poc/specs')
  
  for (const specFile of specs) {
    const id = specFile.replace(/\.(json|yaml)$/, '')
    console.log(`Generating types for ${id}...`)
    
    const specPath = join('poc/specs', specFile)
    const output = await openapiTS(specPath, {
      exportType: true,
      alphabetize: true
    })
    
    const outputPath = join('poc/generated/types', `${id}.types.ts`)
    await writeFile(outputPath, output)
    console.log(`✓ Generated ${id}.types.ts`)
  }
}

generateTypes().catch(console.error)
```

Run: `tsx poc/scripts/generate-types.ts`

### Day 3: Config Generation

#### 3.1 Create Config Generator

```typescript
// poc/scripts/generate-configs.ts

import SwaggerParser from '@apidevtools/swagger-parser'
import { readdir, writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import type { OpenAPIV3 } from 'openapi-types'

async function generateConfigs() {
  await mkdir('poc/generated/configs', { recursive: true })
  
  const specs = await readdir('poc/specs')
  
  for (const specFile of specs) {
    const id = specFile.replace(/\.(json|yaml)$/, '')
    console.log(`Generating config for ${id}...`)
    
    const specPath = join('poc/specs', specFile)
    const api = await SwaggerParser.parse(specPath) as OpenAPIV3.Document
    
    const config = generateConfigFromOpenAPI(id, api)
    const code = generateConfigCode(id, config)
    
    const outputPath = join('poc/generated/configs', `${id}.config.ts`)
    await writeFile(outputPath, code)
    console.log(`✓ Generated ${id}.config.ts`)
  }
}

function generateConfigFromOpenAPI(id: string, api: OpenAPIV3.Document) {
  const baseUrl = api.servers?.[0]?.url || ''
  
  const endpoints: Record<string, any> = {}
  
  for (const [path, pathItem] of Object.entries(api.paths || {})) {
    if (!pathItem) continue
    
    for (const [method, operation] of Object.entries(pathItem)) {
      if (!['get', 'post', 'put', 'delete', 'patch'].includes(method.toLowerCase())) {
        continue
      }
      
      const op = operation as OpenAPIV3.OperationObject
      const endpointId = op.operationId || `${method}_${path.replace(/\//g, '_')}`
      
      const params = op.parameters as OpenAPIV3.ParameterObject[] || []
      
      endpoints[endpointId] = {
        method: method.toUpperCase(),
        path: path,
        parameters: {
          path: params.filter(p => p.in === 'path').map(p => p.name),
          query: params.filter(p => p.in === 'query').map(p => p.name),
          body: op.requestBody ? ['body'] : []
        }
      }
    }
  }
  
  return {
    id,
    name: api.info.title,
    baseUrl,
    auth: extractAuth(api),
    endpoints
  }
}

function extractAuth(api: OpenAPIV3.Document) {
  const schemes = api.components?.securitySchemes
  if (!schemes) return undefined
  
  const firstScheme = Object.values(schemes)[0] as OpenAPIV3.SecuritySchemeObject
  
  if (firstScheme?.type === 'http') {
    if (firstScheme.scheme === 'bearer') {
      return { type: 'bearer', header: 'Authorization' }
    } else if (firstScheme.scheme === 'basic') {
      return { type: 'basic', header: 'Authorization' }
    }
  } else if (firstScheme?.type === 'apiKey') {
    return { type: 'apikey', header: firstScheme.name }
  }
  
  return undefined
}

function generateConfigCode(id: string, config: any): string {
  const capitalizedId = id.charAt(0).toUpperCase() + id.slice(1)
  
  return `// Auto-generated from OpenAPI spec
import { APIConfig } from '../../runtime/request-builder'

export const ${capitalizedId}Config: APIConfig = ${JSON.stringify(config, null, 2)}

export namespace ${capitalizedId} {
  // Helper methods will be generated here
}
`
}

generateConfigs().catch(console.error)
```

Run: `tsx poc/scripts/generate-configs.ts`

### Day 4: Helper Generation & Testing

#### 4.1 Add Helper Methods

Enhance the config generator to add helper methods:

```typescript
// Add to generate-configs.ts

function generateHelperMethods(id: string, endpoints: Record<string, any>): string {
  const capitalizedId = id.charAt(0).toUpperCase() + id.slice(1)
  
  let code = ''
  
  for (const [endpointId, endpoint] of Object.entries(endpoints)) {
    const funcName = endpointId.replace(/[^a-zA-Z0-9]/g, '_')
    
    code += `
  /**
   * ${endpoint.method} ${endpoint.path}
   */
  export function ${funcName}(params: any) {
    return buildRequest(${capitalizedId}Config, '${endpointId}', params)
  }
`
  }
  
  return code
}
```

#### 4.2 Create Test File

```typescript
// poc/tests/github.test.ts

import { describe, it, expect } from 'vitest'
import { buildRequest } from '../runtime/request-builder'
import { GithubConfig } from '../generated/configs/github.config'

describe('GitHub Config', () => {
  it('builds request for list issues', () => {
    const request = buildRequest(GithubConfig, 'issues/list-for-repo', {
      owner: 'flethy',
      repo: 'flethy',
      state: 'open',
      auth: 'test-token'
    })
    
    expect(request.method).toBe('GET')
    expect(request.url).toContain('/repos/flethy/flethy/issues')
    expect(request.url).toContain('state=open')
    expect(request.headers?.Authorization).toBe('Bearer test-token')
  })
  
  it('requires path parameters', () => {
    expect(() => {
      buildRequest(GithubConfig, 'issues/list-for-repo', {})
    }).toThrow('Missing required path parameter')
  })
})
```

### Day 5: Bundle Size Analysis

#### 5.1 Create Bundle Test

```typescript
// poc/scripts/analyze-bundle.ts

import { build } from 'esbuild'
import { readdir } from 'fs/promises'
import { join } from 'path'

async function analyzeBundle() {
  const configs = await readdir('poc/generated/configs')
  
  for (const configFile of configs) {
    const id = configFile.replace('.config.ts', '')
    
    // Create entry point that imports single config
    const entryCode = `
      import { buildRequest } from './runtime/request-builder'
      import { ${id.charAt(0).toUpperCase() + id.slice(1)}Config } from './generated/configs/${configFile}'
      export { buildRequest, ${id.charAt(0).toUpperCase() + id.slice(1)}Config }
    `
    
    await build({
      stdin: {
        contents: entryCode,
        resolveDir: 'poc',
        loader: 'ts'
      },
      bundle: true,
      minify: true,
      treeShaking: true,
      format: 'esm',
      outfile: `poc/dist/${id}.bundle.js`,
      metafile: true
    }).then(result => {
      const size = result.metafile?.outputs[`poc/dist/${id}.bundle.js`]?.bytes || 0
      const sizeKB = (size / 1024).toFixed(2)
      console.log(`${id}: ${sizeKB} KB`)
    })
  }
}

analyzeBundle().catch(console.error)
```

Run: `tsx poc/scripts/analyze-bundle.ts`

### Day 6-7: Validation & Comparison

#### 6.1 Compare Manual vs Generated

Create comparison document:

```markdown
# POC Results Comparison

## Lines of Code

| Service | Manual | Generated | Reduction |
|---------|--------|-----------|-----------|
| GitHub  | 150    | 20        | 87%       |
| Stripe  | 120    | 15        | 87%       |
| OpenAI  | 95     | 12        | 87%       |

## Bundle Size (Tree-Shaken)

| Service | Generated |
|---------|-----------|
| GitHub  | 3.2 KB    |
| Stripe  | 2.8 KB    |
| OpenAI  | 2.5 KB    |

## Type Safety

- [x] All parameters typed
- [x] Response types available
- [x] IntelliSense working
- [x] No runtime dependencies

## Developer Experience

### Manual Approach
- Time to add endpoint: ~15 minutes
- Type definitions: Manual
- Documentation: Manual
- Maintenance: Manual updates needed

### Generated Approach
- Time to add endpoint: Automatic
- Type definitions: Auto-generated
- Documentation: From OpenAPI
- Maintenance: Regenerate from spec

## Verdict

✅ Meets all success criteria
✅ Significantly better DX
✅ Zero runtime dependencies maintained
✅ Smaller bundle sizes
✅ Ready to proceed with full implementation
```

---

## Validation Checklist

### Technical Validation

- [ ] Generated types compile without errors
- [ ] Request builder works with all 3 services
- [ ] Bundle size is under 5KB per service
- [ ] Tree-shaking removes unused code
- [ ] Zero runtime dependencies confirmed
- [ ] All TypeScript strict mode checks pass

### Quality Validation

- [ ] Generated code follows same patterns
- [ ] Code is readable and maintainable
- [ ] IntelliSense provides good suggestions
- [ ] Error messages are clear
- [ ] Documentation is accurate

### Compatibility Validation

- [ ] Can maintain backward compatibility
- [ ] Existing usage patterns still work
- [ ] Migration path is clear
- [ ] No breaking changes required (for v1.x)

---

## Next Steps After POC

### If Successful (Expected)

1. **Approve Architecture** - Get stakeholder buy-in
2. **Refine Scripts** - Polish generators based on learnings
3. **Begin Phase 1** - Implement foundation properly
4. **Migrate 10 Services** - Expand beyond POC
5. **Document Approach** - Create contribution guidelines

### If Issues Found

1. **Document Problems** - What didn't work
2. **Propose Alternatives** - Different approaches
3. **Iterate POC** - Try alternative solutions
4. **Re-evaluate** - May need different strategy

---

## Files Created

```
poc/
├── runtime/
│   └── request-builder.ts          # Zero-dep runtime
├── scripts/
│   ├── fetch-specs.ts              # Download OpenAPI specs
│   ├── generate-types.ts           # Generate TS types
│   ├── generate-configs.ts         # Generate configs
│   └── analyze-bundle.ts           # Bundle size analysis
├── specs/
│   ├── github.json                 # Cached OpenAPI spec
│   ├── stripe.json
│   └── openai.yaml
├── generated/
│   ├── types/
│   │   ├── github.types.ts         # Auto-generated types
│   │   ├── stripe.types.ts
│   │   └── openai.types.ts
│   └── configs/
│       ├── github.config.ts        # Auto-generated configs
│       ├── stripe.config.ts
│       └── openai.config.ts
├── tests/
│   ├── github.test.ts
│   ├── stripe.test.ts
│   └── openai.test.ts
└── dist/
    └── *.bundle.js                 # Bundle analysis output
```

---

## Estimated Effort

- **Setup:** 2 hours
- **Runtime:** 3 hours
- **Generation Scripts:** 6 hours
- **Testing:** 4 hours
- **Bundle Analysis:** 2 hours
- **Documentation:** 3 hours

**Total:** ~20 hours (2.5 days of focused work)

---

## Success Metrics

After POC completion, you should have:

✅ **Proof** that generation works  
✅ **Evidence** of code reduction (80%+)  
✅ **Data** on bundle sizes (<5KB)  
✅ **Confidence** in the approach  
✅ **Learnings** to improve full implementation  

---

**Ready to start POC?** Begin with Day 1 setup!
