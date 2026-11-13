import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Link, Route, Routes } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import { Alternatives, Best, Blog, BlogPost, Home, Pricing } from './pages'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <nav>
          <Link to="/">Toolshelf</Link> · <Link to="/best">Best</Link> · <Link to="/pricing">Pricing</Link> · <Link to="/blog">Blog</Link>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/best" element={<Best />} />
            <Route path="/alternatives/:slug" element={<Alternatives />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<h1>Page not found</h1>} />
          </Routes>
        </main>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
