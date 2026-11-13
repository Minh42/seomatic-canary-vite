import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { Helmet } from 'react-helmet-async'
import { getPosts, getTools, type Post, type Tool } from './data'

function useRows<T>(load: () => Promise<T[]>) {
  const [rows, setRows] = useState<T[] | null>(null)
  useEffect(() => { load().then(setRows) }, [load])
  return rows
}

export function Home() {
  const tools = useRows<Tool>(getTools)
  return (
    <section>
      <Helmet>
        <title>Toolshelf</title>
        <meta name="description" content="Find tools." />
      </Helmet>
      <h1>Discover software tools</h1>
      <ul>
        {tools?.map(t => <li key={t.slug}><Link to={`/alternatives/${t.slug}`}>{t.name} alternatives</Link></li>)}
      </ul>
    </section>
  )
}

export function Pricing() {
  return (
    <section>
      <Helmet><title>Pricing</title></Helmet>
      <h1>Pricing</h1>
      <p>Listing a tool is free. A featured spot costs $49 per week.</p>
    </section>
  )
}

export function Best() {
  const tools = useRows<Tool>(getTools)
  return (
    <section>
      <h1>Best tools this month</h1>
      <p>Our picks across analytics and content management.</p>
      <ol>{tools?.map(t => <li key={t.slug}>{t.name}: {t.tagline}</li>)}</ol>
    </section>
  )
}

export function Alternatives() {
  const { slug } = useParams()
  const tools = useRows<Tool>(getTools)
  if (!tools) return null
  const tool = tools.find(t => t.slug === slug)
  if (!tool) return <h1>Tool not found</h1>
  const others = tools.filter(t => t.category === tool.category && t.slug !== tool.slug)
  return (
    <article>
      <Helmet><title>{`${tool.name} alternatives`}</title></Helmet>
      <h1>{tool.name} alternatives</h1>
      <p>{tool.body}</p>
      <ul>{others.map(o => <li key={o.slug}>{o.name}: {o.tagline}</li>)}</ul>
    </article>
  )
}

export function Blog() {
  const posts = useRows<Post>(getPosts)
  return (
    <section>
      <Helmet>
        <title>Blog</title>
        <meta name="description" content="Guides and comparisons from Toolshelf." />
      </Helmet>
      <h1>Blog</h1>
      <ul>{posts?.map(p => <li key={p.slug}><Link to={`/blog/${p.slug}`}>{p.title}</Link></li>)}</ul>
    </section>
  )
}

export function BlogPost() {
  const { slug } = useParams()
  const posts = useRows<Post>(getPosts)
  if (!posts) return null
  const post = posts.find(p => p.slug === slug)
  if (!post) return <h1>Post not found</h1>
  return (
    <article>
      <Helmet><title>{post.title}</title></Helmet>
      <h1>{post.title}</h1>
      <time dateTime={post.date}>{post.date}</time>
      <p>{post.body}</p>
    </article>
  )
}
