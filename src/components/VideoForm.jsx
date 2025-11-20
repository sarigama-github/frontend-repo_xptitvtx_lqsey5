import { useState } from 'react'

export default function VideoForm({ onCreated }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [tags, setTags] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const backend = import.meta.env.VITE_BACKEND_URL

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      const payload = {
        title,
        description: description || null,
        video_url: videoUrl,
        tags: tags.split(',').map(s=>s.trim()).filter(Boolean)
      }
      const res = await fetch(`${backend}/api/videos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed to add video')
      setMessage('Video added!')
      setTitle(''); setDescription(''); setVideoUrl(''); setTags('')
      onCreated?.()
    } catch (err) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 space-y-4">
      <h3 className="text-lg font-semibold text-white">Post Video</h3>
      <form onSubmit={submit} className="grid grid-cols-1 gap-4">
        <input className="input" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} required />
        <textarea className="input min-h-[100px]" placeholder="Description (optional)" value={description} onChange={(e)=>setDescription(e.target.value)} />
        <input className="input" placeholder="Video URL (YouTube/Vimeo)" value={videoUrl} onChange={(e)=>setVideoUrl(e.target.value)} required />
        <input className="input" placeholder="Tags (comma separated)" value={tags} onChange={(e)=>setTags(e.target.value)} />
        <button disabled={loading} className="btn-primary">{loading ? 'Saving...' : 'Save Video'}</button>
        {message && <p className="text-sm text-blue-300">{message}</p>}
      </form>
    </div>
  )
}
