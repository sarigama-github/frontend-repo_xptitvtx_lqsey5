import { useState } from 'react'

export default function LessonForm({ onCreated }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [level, setLevel] = useState('')
  const [tags, setTags] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
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
        content,
        level: level || null,
        tags: tags.split(',').map(s=>s.trim()).filter(Boolean),
        video_url: videoUrl || null
      }
      const res = await fetch(`${backend}/api/lessons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed to create lesson')
      setMessage('Lesson added!')
      setTitle(''); setContent(''); setLevel(''); setTags(''); setVideoUrl('')
      onCreated?.()
    } catch (err) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 space-y-4">
      <h3 className="text-lg font-semibold text-white">Add Lesson</h3>
      <form onSubmit={submit} className="grid grid-cols-1 gap-4">
        <input className="input" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} required />
        <textarea className="input min-h-[120px]" placeholder="Content / Summary" value={content} onChange={(e)=>setContent(e.target.value)} />
        <input className="input" placeholder="Level (Beginner/Intermediate/Advanced)" value={level} onChange={(e)=>setLevel(e.target.value)} />
        <input className="input" placeholder="Tags (comma separated)" value={tags} onChange={(e)=>setTags(e.target.value)} />
        <input className="input" placeholder="Video URL (optional)" value={videoUrl} onChange={(e)=>setVideoUrl(e.target.value)} />
        <button disabled={loading} className="btn-primary">{loading ? 'Saving...' : 'Save Lesson'}</button>
        {message && <p className="text-sm text-blue-300">{message}</p>}
      </form>
    </div>
  )
}
