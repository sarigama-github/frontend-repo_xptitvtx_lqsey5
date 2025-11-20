import { useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import RecipeForm from './components/RecipeForm'
import LessonForm from './components/LessonForm'
import AdForm from './components/AdForm'
import VideoForm from './components/VideoForm'
import ContactForm from './components/ContactForm'
import { RecipesList, LessonsList, AdsList, VideosList } from './components/Lists'

function App() {
  const [query, setQuery] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-200">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <SearchBar onSearch={setQuery} />
          <a href="/test" className="text-xs px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 hover:border-blue-500/50">System Test</a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-3">Recipes</h2>
              <RecipesList query={query} />
            </div>
            <RecipeForm onCreated={() => setQuery(q => q)} />

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">Lessons</h2>
              <LessonsList query={query} />
            </div>
            <LessonForm onCreated={() => setQuery(q => q)} />

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">Videos</h2>
              <VideosList query={query} />
            </div>
            <VideoForm onCreated={() => setQuery(q => q)} />
          </section>

          <aside className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-3">Ads</h2>
              <AdsList />
            </div>
            <AdForm onCreated={() => setQuery(q => q)} />

            <ContactForm />
          </aside>
        </div>
      </main>

      <style>
        {`
        .input{background:rgba(15,23,42,.6);border:1px solid rgba(71,85,105,.7);color:#e2e8f0;border-radius:.75rem;padding:.625rem .875rem;outline:none}
        .input:focus{border-color:rgba(59,130,246,.6);box-shadow:0 0 0 2px rgba(59,130,246,.25)}
        .btn-primary{background:#3b82f6;color:white;border-radius:.75rem;padding:.625rem .875rem;border:1px solid rgba(59,130,246,.6)}
        .btn-primary:hover{filter:brightness(1.05)}
        `}
      </style>
    </div>
  )
}

export default App
