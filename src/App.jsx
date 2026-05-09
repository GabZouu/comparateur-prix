import { useState } from 'react'

const sites = [
  { name: 'Amazon', color: '#FF9900', url: (q) => `https://www.amazon.fr/s?k=${encodeURIComponent(q)}&tag=gabriel0bce-21`
  { name: 'Fnac', color: '#E1251B', url: (q) => `https://www.fnac.com/SearchResult/ResultList.aspx?Search=${encodeURIComponent(q)}` },
  { name: 'Cdiscount', color: '#E4002B', url: (q) => `https://www.cdiscount.com/search/10/${encodeURIComponent(q)}.html` },
  { name: 'Darty', color: '#E2001A', url: (q) => `https://www.darty.com/nav/recherche?text=${encodeURIComponent(q)}` },
  { name: 'Boulanger', color: '#0057A8', url: (q) => `https://www.boulanger.com/recherche/${encodeURIComponent(q)}` },
]

export default function App() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState('')

  const handleSearch = () => {
    if (!query.trim()) return
    setLoading(true)
    setResults([])
    setSearched(query)
    setTimeout(() => {
      const raw = sites.map((site) => ({
        ...site,
        price: parseFloat((Math.random() * 100 + 20).toFixed(2)),
      }))
      setResults([...raw].sort((a, b) => a.price - b.price))
      setLoading(false)
    }, 1200)
  }

  const best = results[0]

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', fontFamily: "'Segoe UI', sans-serif", padding: '0 0 60px' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <div style={{ textAlign: 'center', padding: '60px 20px 40px' }}>
        <h1 style={{ color: 'white', fontSize: '48px', fontWeight: '800', margin: '0 0 12px', letterSpacing: '-1px' }}>
          Prix<span style={{ color: '#a78bfa' }}>Radar</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', margin: 0 }}>Compare les prix sur tous les grands sites en un instant</p>
      </div>

      <div style={{ maxWidth: '620px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', gap: '10px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '16px', padding: '8px' }}>
          <input
            type="text"
            placeholder="Ex: iPhone 15, Nike Air Max, PS5..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'white', fontSize: '16px', padding: '8px 12px' }}
          />
          <button
            onClick={handleSearch}
            style={{ background: 'linear-gradient(135deg, #a78bfa, #7c3aed)', border: 'none', borderRadius: '10px', padding: '12px 28px', color: 'white', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}
          >
            Comparer
          </button>
        </div>
      </div>{loading && (
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid rgba(167,139,250,0.3)', borderTopColor: '#a78bfa', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto' }} />
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginTop: '16px' }}>Comparaison en cours...</p>
        </div>
      )}

      {results.length > 0 && (
        <div style={{ maxWidth: '700px', margin: '40px auto 0', padding: '0 20px' }}>
          <div style={{ background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.3)', borderRadius: '16px', padding: '20px 24px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ background: '#a78bfa', color: 'white', fontSize: '11px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', padding: '3px 10px', borderRadius: '50px' }}>Meilleur prix</span>
              <p style={{ color: 'white', fontSize: '22px', fontWeight: '700', margin: '8px 0 2px' }}>{best.name}</p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', margin: 0 }}>pour « {searched} »</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ color: '#a78bfa', fontSize: '36px', fontWeight: '800', margin: '0 0 8px' }}>{best.price.toFixed(2)}€</p>
              <a href={best.url(searched)} target="_blank" rel="noreferrer" style={{ background: '#a78bfa', color: 'white', padding: '8px 20px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>
                Voir l'offre →
              </a>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {results.map((r, i) => (
              <div key={r.name} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span style={{ fontSize: '18px', color: 'rgba(255,255,255,0.3)', fontWeight: '700', width: '24px' }}>#{i + 1}</span>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: r.color }} />
                  <span style={{ color: 'white', fontSize: '16px', fontWeight: '600' }}>{r.name}</span>
                  {i === 0 && <span style={{ background: 'rgba(167,139,250,0.15)', color: '#a78bfa', fontSize: '12px', padding: '2px 8px', borderRadius: '50px' }}>✓ Meilleur</span>}
                  {i > 0 && <span style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', fontSize: '12px', padding: '2px 8px', borderRadius: '50px' }}>+{(r.price - best.price).toFixed(2)}€</span>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ color: 'white', fontSize: '20px', fontWeight: '700' }}>{r.price.toFixed(2)}€</span>
                  <a href={r.url(searched)} target="_blank" rel="noreferrer" style={{ color: '#a78bfa', fontSize: '13px', textDecoration: 'none', border: '1px solid rgba(167,139,250,0.3)', padding: '6px 14px', borderRadius: '8px' }}>
                    Voir →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
