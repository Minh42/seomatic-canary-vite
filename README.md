# SEOmatic canary: Vite + React SPA

A small Vite + React (TypeScript) single-page directory site, built like Lovable sites, used to test SEOmatic on client-rendered SPAs. Titles are set with react-helmet-async; routes with react-router. Rows come from Supabase when `VITE_SUPABASE_URL` is set, otherwise from `data/*.json`. `public/sitemap.xml` and `public/robots.txt` are static files. GitHub Pages has no rewrites, so `spa-routes.mjs` copies `index.html` to every sitemap route (deep links return 200) and to `404.html` for anything else.

Planted gaps for SEOmatic to find: weak home description, `/pricing` (title only) and `/best` (no Helmet at all) without a meta description, template pages (`/alternatives/:slug`, `/blog/:slug`) without descriptions, no structured data. Every route is client-rendered, so the raw HTML only carries the `index.html` title.
