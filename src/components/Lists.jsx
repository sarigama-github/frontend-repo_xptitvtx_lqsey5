import { useEffect, useState } from 'react'

export function RecipesList({ query }) {
  const [items, setItems] = useState([])
  const backend = import.meta.env.VITE_BACKEND_URL

  useEffect(()=>{
    const load = async () => {
      const url = new URL(`${backend}/api/recipes`)
      if (query) url.searchParams.set('q', query)
      const res = await fetch(url)
      const data = await res.json()
      setItems(data.items || [])
    }
    load()
  }, [backend, query])

  return (
    <div className="space-y-3">
      {items.map(r => (
        <div key={r.id} className="p-4 rounded-lg bg-slate-800/60 border border-slate-700">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="text-white font-semibold">{r.title}</h4>
              {r.description && <p className="text-slate-300 text-sm">{r.description}</p>}
              {r.tags?.length > 0 && (
                <p className="text-xs text-blue-300 mt-1">{r.tags.join(', ')}</p>
              )}
            </div>
            {r.image_url && <img src={r.image_url} alt="" className="w-24 h-16 object-cover rounded" />}
          </div>
        </div>
      ))}
      {items.length === 0 && <p className="text-slate-400 text-sm">No recipes yet.</p>}
    </div>
  )
}

export function LessonsList({ query }) {
  const [items, setItems] = useState([])
  const backend = import.meta.env.VITE_BACKEND_URL

  useEffect(()=>{
    const load = async () => {
      const url = new URL(`${backend}/api/lessons`)
      if (query) url.searchParams.set('q', query)
      const res = await fetch(url)
      const data = await res.json()
      setItems(data.items || [])
    }
    load()
  }, [backend, query])

  return (
    <div className="space-y-3">
      {items.map(r => (
        <div key={r.id} className="p-4 rounded-lg bg-slate-800/60 border border-slate-700">
          <h4 className="text-white font-semibold">{r.title}</h4>
          {r.level && <p className="text-xs text-blue-300">{r.level}</p>}
          <p className="text-slate-300 text-sm mt-1 line-clamp-2">{r.content}</p>
        </div>
      ))}
      {items.length === 0 && <p className="text-slate-400 text-sm">No lessons yet.</p>}
    </div>
  )
}

export function AdsList() {
  const [items, setItems] = useState([])
  const backend = import.meta.env.VITE_BACKEND_URL

  useEffect(()=>{
    const load = async () => {
      const res = await fetch(`${backend}/api/ads`)
      const data = await res.json()
      setItems(data.items || [])
    }
    load()
  }, [backend])

  return (
    <div className="space-y-3">
      {items.map(r => (
        <a key={r.id} href={r.link_url || '#'} target="_blank" className="block p-4 rounded-lg bg-slate-800/60 border border-slate-700 hover:border-blue-500/50 transition-colors">
          <h4 className="text-white font-semibold">{r.title}</h4>
          {r.body && <p className="text-slate-300 text-sm">{r.body}</p>}
        </a>
      ))}
      {items.length === 0 && <p className="text-slate-400 text-sm">No ads yet.</p>}
    </div>
  )
}

export function VideosList({ query }) {
  const [items, setItems] = useState([])
  const backend = import.meta.env.VITE_BACKEND_URL

  useEffect(()=>{
    const load = async () => {
      const url = new URL(`${backend}/api/videos`)
      if (query) url.searchParams.set('q', query)
      const res = await fetch(url)
      const data = await res.json()
      setItems(data.items || [])
    }
    load()
  }, [backend, query])

  return (
    <div className="space-y-3">
      {items.map(v => (
        <div key={v.id} className="p-4 rounded-lg bg-slate-800/60 border border-slate-700">
          <h4 className="text-white font-semibold">{v.title}</h4>
          {v.description && <p className="text-slate-300 text-sm">{v.description}</p>}
          {v.video_url && (
            <a href={v.video_url} target="_blank" className="text-blue-300 text-sm underline">Watch</a>
          )}
        </div>
      ))}
      {items.length === 0 && <p className="text-slate-400 text-sm">No videos yet.</p>}
    </div>
  )
}
