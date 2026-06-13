import { Sun, Moon } from 'lucide-react'

function Navbar({ darkMode, setDarkMode, setCurrentView, currentView }) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'recommend', label: 'Get Recommendation' },
    { id: 'search', label: 'Search' },
    { id: 'compare', label: 'Compare' },
    { id: 'history', label: 'History' }
  ]

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => setCurrentView('home')}>
        ✨ GemWise
      </div>
      <div className="nav-links">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            style={{
              background: currentView === item.id ? 'rgba(102, 126, 234, 0.2)' : 'none',
              fontWeight: currentView === item.id ? 'bold' : 'normal'
            }}
          >
            {item.label}
          </button>
        ))}
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  )
}

export default Navbar