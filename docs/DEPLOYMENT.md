# PRIVATECRAFT Deployment Guide

## Prerequisites
- Node.js 18+ installed
- Supabase Project URL and Public Anon Key

## Environment Setup
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Configure environment variables in `.env`:
   ```env
   VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-anon-key
   ```

## Local Development
```bash
npm install
npm run dev
```

## Production Build
```bash
npm run build
npm run preview
```
The compiled SPA output will be located in the `dist/` directory, ready to deploy to Netlify, Vercel, Cloudflare Pages, or AWS S3 + CloudFront.
