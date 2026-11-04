# Duck Project

## Deployment

This repo auto-deploys to Vercel via GitHub integration.

- **Production URL**: https://duck-coral.vercel.app
- **How it works**: Push to `main` → Vercel auto-builds and deploys
- **Config**: `vercel.json` at repo root handles build command and output directory

### Workflow

1. Build the app locally to verify it works
2. Commit and push to `main` (or merge PR to `main`)
3. Share the link: https://duck-coral.vercel.app

No need to use the Vercel CLI. No manual deploy steps. Just push and share.
