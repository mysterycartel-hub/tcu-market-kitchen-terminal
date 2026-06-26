'use client'

import { useState, useRef } from 'react'

type AnalysisResult = {
  todaysMenu: string
  louieLiquidity: string
  pantryShelf: string
  nanaValue: string
  grandmaMarket: string
  candleKidReport: string
  recipeA: string
  recipeB: string
  noTradeWarning: string | null
  studentLesson: string
}

export function ChartUploadAnalyzer() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFile(f: File) {
    setFile(f)
    setAnalysis(null)
    setError(null)
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target?.result as string)
    reader.readAsDataURL(f)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const f = e.dataTransfer.files[0]
    if (f && f.type.startsWith('image/')) handleFile(f)
  }

  async function handleAnalyze() {
    if (!file) return
    setLoading(true)
    setError(null)
    try {
      const formData = new FormData()
      formData.append('image', file)
      const res = await fetch('/api/analyze-chart', { method: 'POST', body: formData })
      if (!res.ok) throw new Error('Analysis failed')
      const data = await res.json()
      setAnalysis(data)
    } catch {
      setError('Chart analysis is not available. Please ensure the AI service is configured.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>
          Chart Upload Analyzer
        </h1>
        <p className="text-[#f5f0e8]/50 mt-1">Upload a chart screenshot and get a TCU analysis.</p>
      </div>

      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center cursor-pointer hover:border-[#c9a84c]/30 transition-colors"
      >
        {preview ? (
          <img src={preview} alt="Chart" className="max-h-64 mx-auto rounded-lg" />
        ) : (
          <div className="space-y-2">
            <span className="text-4xl">📊</span>
            <p className="text-[#f5f0e8]/50">Drop a chart screenshot here or click to upload</p>
            <p className="text-xs text-[#f5f0e8]/30">PNG, JPG, WebP supported</p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
      </div>

      {file && (
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full py-3 bg-[#c9a84c] text-[#060608] font-semibold rounded-lg hover:bg-[#c9a84c]/90 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Analyzing...' : 'Analyze This Chart'}
        </button>
      )}

      {error && (
        <div className="bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-lg p-4 text-sm text-[#EF4444]">
          {error}
        </div>
      )}

      {/* Analysis Result */}
      {analysis && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#c9a84c]">TCU Analysis</h2>
          {[
            { label: "Today's Menu (Bias)", value: analysis.todaysMenu, emoji: '📋' },
            { label: 'Louie Liquidity', value: analysis.louieLiquidity, emoji: '💧' },
            { label: 'Pantry Shelf (AOI)', value: analysis.pantryShelf, emoji: '📦' },
            { label: 'Nana Value (VWAP)', value: analysis.nanaValue, emoji: '👴' },
            { label: 'Grandma Market (200 SMA)', value: analysis.grandmaMarket, emoji: '👵' },
            { label: 'Candle Kid Report', value: analysis.candleKidReport, emoji: '🕯️' },
            { label: 'Recipe A', value: analysis.recipeA, emoji: '🅰️' },
            { label: 'Recipe B', value: analysis.recipeB, emoji: '🅱️' },
            { label: 'No-Trade Warning', value: analysis.noTradeWarning || 'None', emoji: '⚠️' },
            { label: 'Student Lesson', value: analysis.studentLesson, emoji: '📚' },
          ].map(item => (
            <div key={item.label} className="bg-[#0d0d10] border border-white/5 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span>{item.emoji}</span>
                <h3 className="text-sm font-semibold text-[#c9a84c]">{item.label}</h3>
              </div>
              <p className="text-sm text-[#f5f0e8]/70">{item.value}</p>
            </div>
          ))}
          <p className="text-center text-sm italic text-[#c9a84c]/70 pt-4">
            Chef&apos;s Golden Rule: No setup, no serve.
          </p>
        </div>
      )}
    </div>
  )
}
