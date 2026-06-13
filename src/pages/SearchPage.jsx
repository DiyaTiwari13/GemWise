import { useState } from 'react'
import gemstonesData from '../data/gemstones.json'

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGemstone, setSelectedGemstone] = useState(null)
  const gemstones = gemstonesData.gemstones

  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : gemstones.filter(gemstone =>
        gemstone.name.toLowerCase().includes(searchQuery.toLowerCase())
      )

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    setSelectedGemstone(null)
  }

  const handleGemstoneClick = (gemstone) => {
    setSelectedGemstone(gemstone)
    setSearchQuery(gemstone.name)
  }

  // Get ALL images - Simplified version
  const getAllImages = (gemstone) => {
    const images = []
    
    // Check each possible image field
    if (gemstone.image) images.push({ url: gemstone.image, label: '💎 Gemstone' })
    if (gemstone.image1) images.push({ url: gemstone.image1, label: '💎 Gemstone 2' })
    if (gemstone.image2) images.push({ url: gemstone.image2, label: '💎 Gemstone 3' })
    if (gemstone.ringImage) images.push({ url: gemstone.ringImage, label: '💍 Ring' })
    if (gemstone.ringImage2) images.push({ url: gemstone.ringImage2, label: '💍 Ring 2' })
    if (gemstone.necklaceImage) images.push({ url: gemstone.necklaceImage, label: '📿 Necklace' })
    if (gemstone.necklaceImage1) images.push({ url: gemstone.necklaceImage1, label: '📿 Necklace 2' })
    if (gemstone.braceletImage) images.push({ url: gemstone.braceletImage, label: '📿 Bracelet' })
    if (gemstone.braceletImage1) images.push({ url: gemstone.braceletImage1, label: '📿 Bracelet 2' })
    
    console.log(`${gemstone.name} has ${images.length} images:`, images)
    return images
  }

  return (
    <div className="search-page">
      <div className="page-header">
        <h1>🔎 Search Gemstones</h1>
        <p>Search by name to find your perfect gemstone</p>
      </div>

      <div className="search-input-container">
        <input
          type="text"
          placeholder="🔍 Type Ruby, Emerald, Diamond, or any gemstone name..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input-large"
          autoComplete="off"
          autoFocus
        />
      </div>

      {searchQuery && searchResults.length > 0 && (
        <div className="search-results-count">
          Found {searchResults.length} gemstone(s) matching "{searchQuery}"
        </div>
      )}

      {/* Search Results - Horizontal Scroll */}
      {searchQuery && searchResults.length > 0 && (
        <div className="search-results-horizontal">
          {searchResults.map(gemstone => (
            <div 
              key={gemstone.id} 
              className="search-result-horizontal-card"
              onClick={() => handleGemstoneClick(gemstone)}
            >
              <img 
                src={gemstone.image} 
                alt={gemstone.name} 
                className="search-result-horizontal-img"
              />
              <div className="search-result-horizontal-name">{gemstone.name}</div>
            </div>
          ))}
        </div>
      )}

      {/* Selected Gemstone - Show ALL Images */}
      {selectedGemstone && (
        <div className="selected-gemstone-section">
          <h2 className="selected-gemstone-title">💎 {selectedGemstone.name}</h2>
          
          {getAllImages(selectedGemstone).length > 0 ? (
            <div className="all-images-horizontal-scroll">
              {getAllImages(selectedGemstone).map((img, idx) => (
                <div key={idx} className="all-image-card">
                  <img src={img.url} alt={img.label} className="all-image-img" />
                  <span className="all-image-label">{img.label}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-images-message">
              <p>⚠️ No additional images found</p>
            </div>
          )}
          
          <div className="selected-gemstone-details">
            <div className="detail-row">
              <span className="detail-label">✨ Benefits:</span>
              <span className="detail-value">{selectedGemstone.benefits}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">🪐 Planet:</span>
              <span className="detail-value">{selectedGemstone.planet}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">🎨 Color:</span>
              <span className="detail-value">{selectedGemstone.color}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">📿 Wearing Method:</span>
              <span className="detail-value">{selectedGemstone.wearingMethod}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">♈ Zodiac Signs:</span>
              <span className="detail-value">{selectedGemstone.zodiac}</span>
            </div>
          </div>
        </div>
      )}

      {/* Popular Gemstones */}
      {!searchQuery && !selectedGemstone && (
        <div className="popular-searches">
          <h3>✨ Popular Gemstones</h3>
          <div className="popular-horizontal-scroll">
            {gemstones.slice(0, 6).map(gemstone => (
              <div 
                key={gemstone.id} 
                className="popular-horizontal-card" 
                onClick={() => handleGemstoneClick(gemstone)}
              >
                <img 
                  src={gemstone.image} 
                  alt={gemstone.name} 
                  className="popular-horizontal-img"
                />
                <h4>{gemstone.name}</h4>
              </div>
            ))}
          </div>
        </div>
      )}

      {searchQuery && searchResults.length === 0 && (
        <div className="no-results">
          <p>😔 No gemstones found matching "{searchQuery}"</p>
        </div>
      )}
    </div>
  )
}

export default SearchPage