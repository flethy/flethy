# Getting Started: New Monorepo Setup

**Quick guide to bootstrap your new flethy-connectors monorepo**

---

## 🎯 Your Goal

Set up a new standalone monorepo with:
- ✅ pnpm workspaces
- ✅ Turborepo
- ✅ Biome (format, lint, check)
- ✅ TypeScript
- ✅ ESM-only

---

## 🚀 Two Paths to Success

### Path A: Automated (Recommended - 10 minutes)

**Best for:** Quick setup, getting started fast

1. **Save the bootstrap script:**
```bash
# Copy content from BOOTSTRAP_SCRIPT.md
# Save as bootstrap.sh
```

2. **Run it:**
```bash
chmod +x bootstrap.sh
./bootstrap.sh
```

3. **Verify:**
```bash
cd flethy-connectors
pnpm build
```

**Done!** ✅ You have a complete monorepo ready to go.

---

### Path B: Manual (Educational - 60 minutes)

**Best for:** Understanding every step, customizing setup

1. **Follow BOOTSTRAP_NEW_REPO.md step-by-step:**
   - Step 1: Create directory structure
   - Step 2: Configure pnpm workspace
   - Step 3: Configure root package.json
   - ... (12 steps total)

2. **Customize as needed:**
   - Adjust package names
   - Add/remove packages
   - Modify configurations

3. **Verify setup:**
```bash
pnpm build
pnpm format
pnpm check
pnpm typecheck
```

**Done!** ✅ You have a customized monorepo.

---

## 📚 Documentation Quick Reference

| Document | Purpose | Time | When to Use |
|----------|---------|------|-------------|
| **BOOTSTRAP_SCRIPT.md** | Automated setup | 5min | Quick start |
| **BOOTSTRAP_NEW_REPO.md** | Manual guide | 60min | Learning/customization |
| **CONFIG_REFERENCE.md** | Config details | ref | Troubleshooting |
| **POC_IMPLEMENTATION_GUIDE.md** | Build POC | 1 week | After setup |
| **CONNECTORS_REBUILD_PROPOSAL.md** | Full architecture | 30min | Deep dive |

---

## ✅ What You'll Have After Bootstrap

```
flethy-connectors/
├── packages/
│   ├── connectors/          # Main package
│   ├── runtime/             # Zero-dep runtime
│   └── tsconfig/            # Shared configs
├── tools/
│   └── generators/          # Code generation
├── apps/
│   ├── docs/               # Documentation
│   └── playground/         # Examples
├── .github/workflows/       # CI/CD
├── turbo.json              # Build orchestration
├── biome.json              # Format/lint config
├── pnpm-workspace.yaml     # Workspace definition
└── package.json            # Root package
```

**All dependencies installed**  
**All tools configured**  
**CI/CD ready**  
**Git initialized**

---

## 🎓 Next Steps After Bootstrap

### Week 1: Implement Core Runtime

1. **Build request builder:**
```bash
cd packages/runtime/src
# Edit request-builder.ts
# Edit auth-handlers.ts
# Edit types.ts
```

See: POC_IMPLEMENTATION_GUIDE.md Day 1

### Week 1-2: Implement Generators

2. **Build code generators:**
```bash
cd tools/generators/src
# Edit fetch-specs.ts
# Edit generate-types.ts
# Edit generate-configs.ts
```

See: POC_IMPLEMENTATION_GUIDE.md Days 2-3

### Week 2: Generate First Connectors

3. **Generate pilot services:**
```bash
pnpm generate:specs      # Fetch OpenAPI specs
pnpm generate:types      # Generate TypeScript types
pnpm generate:configs    # Generate configs
```

Services: GitHub, Stripe, OpenAI

See: POC_IMPLEMENTATION_GUIDE.md Days 4-5

---

## 🔧 Troubleshooting

### Issue: Script fails

```bash
# Check prerequisites
node --version   # Should be >= 18
pnpm --version   # Should be >= 8

# Try manual setup instead
# Follow BOOTSTRAP_NEW_REPO.md
```

### Issue: Build errors

```bash
# Clear and reinstall
pnpm clean
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

### Issue: Biome errors

```bash
# Check biome config
cat biome.json

# Format all files
pnpm format

# Fix linting issues
pnpm check:fix
```

---

## 💬 Need Help?

1. **Check CONFIG_REFERENCE.md** - All configs explained
2. **Check BOOTSTRAP_NEW_REPO.md** - Troubleshooting section
3. **Open an issue** - If you're stuck

---

## 🎯 Success Criteria

After bootstrap, you should be able to:

```bash
✅ pnpm install          # Works without errors
✅ pnpm build           # Builds all packages
✅ pnpm format          # Formats code
✅ pnpm check           # Lints without errors
✅ pnpm typecheck       # Type checks pass
✅ pnpm test            # Tests pass (once added)
```

---

## 📊 Project Structure Philosophy

### Packages (Published to npm)
- `@flethy/connectors` - Main package with all connectors
- `@flethy/runtime` - Zero-dependency runtime

### Tools (Internal)
- `@flethy/generators` - Code generation from OpenAPI
- `@flethy/validators` - Validation utilities

### Apps (For development)
- `docs` - Documentation site
- `playground` - Interactive examples

---

## 🚀 From Bootstrap to POC

**Timeline:**
1. Bootstrap (10 minutes) ← **You are here**
2. Implement runtime (2-3 days)
3. Implement generators (3-4 days)
4. Generate pilot services (1-2 days)
5. Validate POC (1 day)

**Total: 1 week to working POC**

---

## 📖 Recommended Reading Order

1. ✅ **This file** - Getting started
2. 📄 **BOOTSTRAP_SCRIPT.md** or **BOOTSTRAP_NEW_REPO.md** - Setup
3. 📄 **CONFIG_REFERENCE.md** - Understand configs
4. 📄 **POC_IMPLEMENTATION_GUIDE.md** - Build POC
5. 📄 **CONNECTORS_REBUILD_PROPOSAL.md** - Full architecture

---

**Ready to start?**

```bash
# Copy bootstrap script from BOOTSTRAP_SCRIPT.md
# Or follow manual guide in BOOTSTRAP_NEW_REPO.md

# Then proceed with POC implementation!
```

Good luck! 🎉
