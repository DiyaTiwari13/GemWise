import { useState } from 'react'

function GemstoneCard({ gemstone, reason, isAlternative, showAddToCompare, onAddToCompare }) {
  const [activeImage, setActiveImage] = useState('main')
  
  if (!gemstone) return null

  // Collect all available images dynamically
  const imageCategories = [
    { key: 'image', label: '💎 Gemstone', default: gemstone.image },
    { key: 'image1', label: '💎 Gemstone 2', default: gemstone.image1 },
    { key: 'image2', label: '💎 Gemstone 3', default: gemstone.image2 },
    { key: 'ringImage', label: '💍 Ring', default: gemstone.ringImage },
    { key: 'ringImage2', label: '💍 Ring 2', default: gemstone.ringImage2 },
    { key: 'necklaceImage', label: '📿 Necklace', default: gemstone.necklaceImage },
    { key: 'necklaceImage1', label: '📿 Necklace 2', default: gemstone.necklaceImage1 },
    { key: 'braceletImage', label: '📿 Bracelet', default: gemstone.braceletImage },
    { key: 'braceletImage1', label: '📿 Bracelet 2', default: gemstone.braceletImage1 }
  ]

  // Filter only images that exist
  const availableImages = imageCategories.filter(cat => cat.default)

  return (
    <div className="gemstone-card-split">
      {/* Left Side - All Images */}
      <div className="gemstone-images-left">
        {availableImages.map((cat, idx) => (
          <div 
            key={idx} 
            className={`image-container ${activeImage === cat.key ? 'active' : ''}`}
            onClick={() => setActiveImage(cat.key)}
          >
            <img 
              src={cat.default} 
              alt={`${gemstone.name} ${cat.label}`} 
              className="gemstone-img" 
            />
            <span className="image-label">{cat.label}</span>
          </div>
        ))}
      </div>

      {/* Right Side - Details */}
      <div className="gemstone-details-right">
        <h2 className="gemstone-name">💎 {gemstone.name}</h2>
        {isAlternative && <p className="alternative-badge">⭐ Alternative Choice</p>}
        
        <p className="gemstone-description">{gemstone.description}</p>
        
        <div className="details-grid">
          <div className="detail-row">
            <span className="detail-label">✨ Benefits:</span>
            <span className="detail-value">{gemstone.benefits}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">🪐 Planet:</span>
            <span className="detail-value">{gemstone.planet}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">🎨 Color:</span>
            <span className="detail-value">{gemstone.color}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">📿 Wearing Method:</span>
            <span className="detail-value">{gemstone.wearingMethod}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">♈ Zodiac Signs:</span>
            <span className="detail-value">{gemstone.zodiac}</span>
          </div>
        </div>
        
        {reason && (
          <div className="reason-box">
            <strong>🔮 Why this gemstone?</strong>
            <p>{reason}</p>
          </div>
        )}
        
        {showAddToCompare && (
          <button onClick={() => onAddToCompare(gemstone)} className="add-to-compare-btn">
            + Add to Compare
          </button>
        )}
      </div>
    </div>
  )
}

export default GemstoneCard