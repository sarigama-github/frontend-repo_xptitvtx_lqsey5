import { useState } from 'react'

export default function RecipeForm({ onCreated }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [steps, setSteps] = useState('')
  const [tags, setTags] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const backend = import.meta.env.VITE_BACKEND_URL

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      const payload = {
        title,
        description,
        ingredients: ingredients.split('\n').map(s => s.trim()).filter(Boolean),
        steps: steps.split('\n').map(s => s.trim()).filter(Boolean),
        tags: tags.split(',').map(s => s.trim()).filter(Boolean),
        image_url: imageUrl || null,
        video_url: videoUrl || null
      }
      const res = await fetch(`${backend}/api/recipes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed to create recipe')
      setMessage('Recipe added successfully!')
      setTitle(''); setDescription(''); setIngredients(''); setSteps(''); setTags(''); setImageUrl(''); setVideoUrl('')
      onCreated?.()
    } catch (err) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 space-y-4">
      <h3 className="text-lg font-semibold text-white">Add Recipe</h3>
      <form onSubmit={submit} className="grid grid-cols-1 gap-4">
        <input className="input" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} required />
        <textarea className="input min-h-[80px]" placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} />
        <textarea className="input min-h-[100px]" placeholder="Ingredients (one per line)" value={ingredients} onChange={(e)=>setIngredients(e.target.value)} />
        <textarea className="input min-h-[120px]" placeholder="Steps (one per line)" value={steps} onChange={(e)=>setSteps(e.target.value)} />
        <input className="input" placeholder="Tags (comma separated)" value={tags} onChange={(e)=>setTags(e.target.value)} />
        <input className="input" placeholder="Image URL (optional)" value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)} />
        <input className="input" placeholder="Video URL (optional)" value={videoUrl} onChange={(e)=>setVideoUrl(e.target.value)} />
        <button disabled={loading} className="btn-primary">{loading ? 'Saving...' : 'Save Recipe'}</button>
        {message && <p className="text-sm text-blue-300">{message}</p>}
      </form>
    </div>
  )
}
