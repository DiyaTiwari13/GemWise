import Hero from '../components/Hero'

function HomePage({ setCurrentView }) {
  return (
    <div className="home-page">
      <Hero onGetStarted={() => setCurrentView('recommend')} />
      
      <div className="features-section">
        <h2>Why Choose GemWise?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>Personalized</h3>
            <p>Get recommendations based on your zodiac sign and life goals</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Detailed Info</h3>
            <p>Complete details about each gemstone's properties and benefits</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Compare</h3>
            <p>Compare different gemstones side by side</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📜</div>
            <h3>History</h3>
            <p>Track all your past recommendations</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Search</h3>
            <p>Find any gemstone instantly</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🌙</div>
            <h3>Dark Mode</h3>
            <p>Comfortable viewing experience</p>
          </div>
        </div>
      </div>
      
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-number">12+</div>
          <div className="stat-label">Zodiac Signs</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">8</div>
          <div className="stat-label">Gemstones</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">5</div>
          <div className="stat-label">Life Goals</div>
        </div>
      </div>
    </div>
  )
}

export default HomePage