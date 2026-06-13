import { useState, useEffect } from 'react'
import './App.css'
import { Sun, Moon } from 'lucide-react'
import RecommendationForm from './components/RecommendationForm'
import GemstoneCard from './components/GemstoneCard'
import SearchPage from './pages/SearchPage'  // ← Import the external SearchPage
import gemstonesData from './data/gemstones.json'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')
  const [recommendation, setRecommendation] = useState(null)
  const [history, setHistory] = useState([])
  const [compareList, setCompareList] = useState([])

  const gemstones = gemstonesData.gemstones

  // Load saved data
  useEffect(() => {
    const savedHistory = localStorage.getItem('gemwise_history')
    if (savedHistory) setHistory(JSON.parse(savedHistory))
    const savedDarkMode = localStorage.getItem('gemwise_darkmode')
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode))
  }, [])

  // Save history
  useEffect(() => {
    localStorage.setItem('gemwise_history', JSON.stringify(history))
  }, [history])

  // Save dark mode
  useEffect(() => {
    localStorage.setItem('gemwise_darkmode', JSON.stringify(darkMode))
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])

  // Gemstone recommendation logic
  const getRecommendation = (zodiac, goal) => {
    const mapping = {
      'Aries': 'Ruby',
      'Taurus': 'Emerald',
      'Gemini': 'Emerald',
      'Cancer': 'Pearl',
      'Leo': 'Ruby',
      'Virgo': 'Emerald',
      'Libra': 'Diamond',
      'Scorpio': 'Red Coral',
      'Sagittarius': 'Yellow Sapphire',
      'Capricorn': 'Blue Sapphire',
      'Aquarius': 'Amethyst',
      'Pisces': 'Yellow Sapphire'
    }

    const mainGemstoneName = mapping[zodiac]
    const mainGemstone = gemstones.find(g => g.name === mainGemstoneName)

    const goalMessages = {
      'Career': 'This stone enhances leadership and professional growth.',
      'Wealth': 'This stone attracts prosperity and financial abundance.',
      'Health': 'This stone promotes physical and emotional well-being.',
      'Education': 'This stone improves focus and academic performance.',
      'Marriage': 'This stone brings harmony and love in relationships.'
    }

    return {
      mainGemstone,
      alternative: gemstones.find(g => g.name === mainGemstone?.alternative),
      reason: `${mainGemstoneName} is recommended for ${zodiac}. ${goalMessages[goal]}`
    }
  }

  const handleRecommendation = (formData) => {
    const rec = getRecommendation(formData.zodiac, formData.goal)
    setRecommendation(rec)

    const historyItem = {
      id: Date.now(),
      name: formData.name,
      age: formData.age,
      zodiac: formData.zodiac,
      goal: formData.goal,
      gemstone: rec.mainGemstone?.name,
      date: new Date().toLocaleString()
    }
    setHistory([historyItem, ...history])
    setCurrentPage('result')
  }

  const addToCompare = (gemstone) => {
    if (compareList.length < 2 && !compareList.find(g => g.id === gemstone.id)) {
      setCompareList([...compareList, gemstone])
    } else if (compareList.find(g => g.id === gemstone.id)) {
      alert('Gemstone already in compare list')
    } else {
      alert('You can only compare 2 gemstones at a time')
    }
  }

  const removeFromCompare = (id) => {
    setCompareList(compareList.filter(g => g.id !== id))
  }

  // Home Page Component
  const HomePage = () => (
    <div className="home-page">
      <div className="hero">
        <h1>✨ Discover Your Perfect Gemstone ✨</h1>
        <p>Ancient wisdom meets modern technology. Find the perfect gemstone that aligns with your zodiac sign and life goals.</p>
        <button className="cta-button" onClick={() => setCurrentPage('form')}>
          Get Started
        </button>
      </div>

      <div className="features-section">
        <h2>Why Choose GemWise?</h2>
        <div className="features-grid">
          <div className="feature-card">✨ <h3>Personalized</h3><p>Based on your zodiac and goals</p></div>
          <div className="feature-card">📚 <h3>Detailed Info</h3><p>Complete gemstone properties</p></div>
          <div className="feature-card">🔄 <h3>Compare</h3><p>Side by side comparison</p></div>
          <div className="feature-card">📜 <h3>History</h3><p>Track recommendations</p></div>
        </div>
      </div>
    </div>
  )

  // Form Page Component
  const FormPage = () => (
    <RecommendationForm onSubmit={handleRecommendation} />
  )

  // Result Page Component
  const ResultPage = () => (
    <div className="result-page">
      <button className="back-btn" onClick={() => { setCurrentPage('form'); setRecommendation(null); }}>
        ← New Recommendation
      </button>
      {recommendation?.mainGemstone && (
        <GemstoneCard gemstone={recommendation.mainGemstone} reason={recommendation.reason} />
      )}
      {recommendation?.alternative && (
        <div className="alternative-section">
          <h3>Alternative Gemstone</h3>
          <GemstoneCard gemstone={recommendation.alternative} isAlternative />
        </div>
      )}
    </div>
  )

  // Compare Page Component
  // Compare Page Component - Updated with better remove button
  const ComparePage = () => (
    <div className="compare-page">
      <h2>⚖️ Compare Gemstones</h2>
      <p className="compare-subtitle">Select up to 2 gemstones to compare their properties</p>

      {compareList.length < 2 && (
        <div className="compare-selector">
          <h3>📿 Select Gemstone {compareList.length + 1} of 2</h3>
          <div className="compare-gemstone-buttons">
            {gemstones.filter(g => !compareList.find(c => c.id === g.id)).map(g => (
              <button
                key={g.id}
                className="compare-gemstone-btn"
                onClick={() => addToCompare(g)}
              >
                <span className="gemstone-icon">💎</span>
                {g.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="compare-list">
        {compareList.map(g => (
          <div key={g.id} className="compare-item-card">
            <button
              className="remove-compare-btn"
              onClick={() => removeFromCompare(g.id)}
              title="Remove from comparison"
            >
              ✖
            </button>
            <div className="compare-gemstone-header">
              <h3 className="compare-gemstone-name">💎 {g.name}</h3>
            </div>
            <div className="compare-gemstone-details">
              <p><strong className="detail-label">✨ Benefits:</strong> {g.benefits}</p>
              <p><strong className="detail-label">🪐 Planet:</strong> {g.planet}</p>
              <p><strong className="detail-label">🎨 Color:</strong> {g.color}</p>
              <p><strong className="detail-label">📿 Wearing Method:</strong> {g.wearingMethod}</p>
              <p><strong className="detail-label">♈ Zodiac Signs:</strong> {g.zodiac}</p>
            </div>
          </div>
        ))}
      </div>

      {compareList.length === 2 && (
        <div className="comparison-table-wrapper">
          <h3>📊 Comparison Table</h3>
          <div className="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>Attribute</th>
                  <th>{compareList[0].name}</th>
                  <th>{compareList[1].name}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="attribute-name">🎨 Color</td>
                  <td>{compareList[0].color}</td>
                  <td>{compareList[1].color}</td>
                </tr>
                <tr>
                  <td className="attribute-name">🪐 Planet</td>
                  <td>{compareList[0].planet}</td>
                  <td>{compareList[1].planet}</td>
                </tr>
                <tr>
                  <td className="attribute-name">♈ Zodiac Signs</td>
                  <td>{compareList[0].zodiac}</td>
                  <td>{compareList[1].zodiac}</td>
                </tr>
                <tr>
                  <td className="attribute-name">📿 Wearing Method</td>
                  <td>{compareList[0].wearingMethod}</td>
                  <td>{compareList[1].wearingMethod}</td>
                </tr>
                <tr>
                  <td className="attribute-name">✨ Benefits</td>
                  <td>{compareList[0].benefits.substring(0, 100)}...</td>
                  <td>{compareList[1].benefits.substring(0, 100)}...</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {compareList.length === 0 && (
        <div className="empty-compare">
          <p>✨ No gemstones selected for comparison</p>
          <p>Click on any gemstone button above to start comparing</p>
        </div>
      )}
    </div>
  )

  // History Page Component
  const HistoryPage = () => (
    <div className="history-page">
      <h2>Recommendation History</h2>
      {history.length === 0 ? (
        <p className="empty-history">No recommendations yet. Get your first recommendation!</p>
      ) : (
        <div className="history-list">
          {history.map(item => (
            <div key={item.id} className="history-item">
              <strong>{item.name}</strong> ({item.age} yrs) - {item.zodiac}<br />
              Goal: {item.goal}<br />
              Recommended: <strong>💎 {item.gemstone}</strong><br />
              <small>{item.date}</small>
            </div>
          ))}
        </div>
      )}
      {history.length > 0 && (
        <button className="clear-history-btn" onClick={() => { if (window.confirm('Clear all history?')) setHistory([]) }}>
          Clear History
        </button>
      )}
    </div>
  )

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <nav className="navbar">
        <div className="logo" onClick={() => setCurrentPage('home')}>✨ GemWise</div>
        <div className="nav-links">
          <button onClick={() => setCurrentPage('home')}>Home</button>
          <button onClick={() => setCurrentPage('form')}>Recommend</button>
          <button onClick={() => setCurrentPage('search')}>Search</button>
          <button onClick={() => setCurrentPage('compare')}>Compare</button>
          <button onClick={() => setCurrentPage('history')}>History</button>
          <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>

      <main className="container">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'form' && <FormPage />}
        {currentPage === 'result' && <ResultPage />}
        {currentPage === 'search' && <SearchPage />}  {/* ← Using imported SearchPage */}
        {currentPage === 'compare' && <ComparePage />}
        {currentPage === 'history' && <HistoryPage />}
      </main>
    </div>
  )
}

export default App