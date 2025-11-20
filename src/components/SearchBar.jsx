import { useState } from 'react'
import { Search } from 'lucide-react'

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch?.(query.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex-1 max-w-xl">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search recipes, lessons, or videos..."
        className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
    </form>
  )
}
