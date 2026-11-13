import { createClient } from '@supabase/supabase-js'
import tools from '../data/tools.json'
import posts from '../data/posts.json'

export type Tool = (typeof tools)[number]
export type Post = (typeof posts)[number]

// Rows come from Supabase when VITE_SUPABASE_URL is set (like a Lovable site),
// otherwise from the seed files so the static canary builds without secrets.
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = url && key ? createClient(url, key) : null

async function rows<T>(table: 'tools' | 'posts', seed: T[]): Promise<T[]> {
  if (!supabase) return seed
  const { data, error } = await supabase.from(table).select('*')
  if (error) throw error
  return data as T[]
}

export const getTools = () => rows('tools', tools)
export const getPosts = () => rows('posts', posts)
