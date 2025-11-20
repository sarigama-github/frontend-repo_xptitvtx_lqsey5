import { useEffect, useState } from 'react'

export default function ContactForm() {
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const backend = import.meta.env.VITE_BACKEND_URL

  useEffect(()=>{
    // load existing contact
    const load = async () => {
      try {
        const res = await fetch(`${backend}/api/contact`)
        if (res.ok) {
          const data = await res.json()
          if (data) {
            setPhone(data.phone || '')
            setEmail(data.email || '')
            setAddress(data.address || '')
          }
        }
      } catch {}
    }
    load()
  }, [backend])

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      const payload = { phone, email, address }
      const res = await fetch(`${backend}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed to save contact')
      setMessage('Contact info saved!')
    } catch (err) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 space-y-4">
      <h3 className="text-lg font-semibold text-white">Contact Information</h3>
      <form onSubmit={submit} className="grid grid-cols-1 gap-4">
        <input className="input" placeholder="Phone" value={phone} onChange={(e)=>setPhone(e.target.value)} required />
        <input className="input" type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <textarea className="input min-h-[80px]" placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)} required />
        <button disabled={loading} className="btn-primary">{loading ? 'Saving...' : 'Save Contact'}</button>
        {message && <p className="text-sm text-blue-300">{message}</p>}
      </form>
    </div>
  )
}
