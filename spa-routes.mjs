// GitHub Pages has no rewrites: give every sitemap route its own copy of index.html so
// deep links return 200 (404.html still catches unknown paths for the SPA).
import { readFileSync, mkdirSync, copyFileSync } from 'node:fs'

const sitemap = readFileSync('public/sitemap.xml', 'utf8')
const html = 'dist/index.html'
for (const [, loc] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const path = new URL(loc).pathname.split('/').slice(2).join('/') // drop the /<repo>/ prefix
  if (!path) continue
  mkdirSync(`dist/${path}`, { recursive: true })
  copyFileSync(html, `dist/${path}/index.html`)
}
copyFileSync(html, 'dist/404.html')
