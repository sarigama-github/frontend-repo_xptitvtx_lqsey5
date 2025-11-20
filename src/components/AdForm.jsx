import { useState } from 'react'

export default function AdForm({ onCreated }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [active, setActive] = useState(true)
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
        body: body || null,
        image_url: imageUrl || null,
        link_url: linkUrl || null,
        active
      }
      const res = await fetch(`${backend}/api/ads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed to create ad')
      setMessage('Ad added!')
      setTitle(''); setBody(''); setImageUrl(''); setLinkUrl(''); setActive(true)
      onCreated?.()
    } catch (err) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 space-y-4">
      <h3 className="text-lg font-semibold text-white">Add Ad</h3>
      <form onSubmit={submit} className="grid grid-cols-1 gap-4">
        <input className="input" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} required />
        <textarea className="input min-h-[100px]" placeholder="Body (optional)" value={body} onChange={(e)=>setBody(e.target.value)} />
        <input className="input" placeholder="Image URL (optional)" value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)} />
        <input className="input" placeholder="Link URL (optional)" value={linkUrl} onChange={(e)=>setLinkUrl(e.target.value)} />
        <label className="flex items-center gap-2 text-slate-200">
          <input type="checkbox" checked={active} onChange={(e)=>setActive(e.target.checked)} /> Active
        </label>
        <button disabled={loading} className="btn-primary">{loading ? 'Saving...' : 'Save Ad'}</button>
        {message && <p className="text-sm text-blue-300">{message}</p>}
      </form>
    </div>
  )
}
