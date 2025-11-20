import { UtensilsCrossed } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-slate-900/80 backdrop-blur border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
          <UtensilsCrossed size={24} />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-white">Culinary Academy</h1>
          <p className="text-xs text-blue-200/70">Teach. Cook. Share.</p>
        </div>
      </div>
    </header>
  )
}
