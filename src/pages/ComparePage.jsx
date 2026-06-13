import { useState } from 'react'
import GemstoneCard from '../components/GemstoneCard'
import gemstonesData from '../data/gemstones.json'

function ComparePage() {
  const [selectedGemstones, setSelectedGemstones] = useState([])
  const gemstones = gemstonesData.gemstones

  const addGemstone = (gemstone) => {
    if (selectedGemstones.length < 2 && !selectedGemstones.find(g => g.id === gemstone.id)) {
      setSelectedGemstones([...selectedGemstones, gemstone])
    } else if (selectedGemstones.find(g => g.id === gemstone.id)) {
      alert('This gemstone is already selected for comparison!')
    } else {
      alert('You can only compare up to 2 gemstones at a time!')
    }
  }

  const removeGemstone = (id) => {
    setSelectedGemstones(selectedGemstones.filter(g => g.id !== id))
  }

  const clearComparison = () => {
    setSelectedGemstones([])
  }

  // Comparison table view when 2 gemstones are selected
  const renderComparisonTable = () => {
    if (selectedGemstones.length !== 2) return null

    const [gem1, gem2] = selectedGemstones

    return (
      <div className="comparison-table-container">
        <h3>Detailed Comparison</h3>
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Attribute</th>
              <th>{gem1.name}</th>
              <th>{gem2.name}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="attribute">Color</td>
              <td>{gem1.color}</td>
              <td>{gem2.color}</td>
            </tr>
            <tr>
              <td className="attribute">Planet</td>
              <td>{gem1.planet}</td>
              <td>{gem2.planet}</td>
            </tr>
            <tr>
              <td className="attribute">Zodiac Signs</td>
              <td>{gem1.zodiac}</td>
              <td>{gem2.zodiac}</td>
            </tr>
            <tr>
              <td className="attribute">Wearing Method</td>
              <td>{gem1.wearingMethod}</td>
              <td>{gem2.wearingMethod}</td>
            </tr>
            <tr>
              <td className="attribute">Benefits</td>
              <td>{gem1.benefits}</td>
              <td>{gem2.benefits}</td>
            </tr>
            <tr>
              <td className="attribute">Description</td>
              <td>{gem1.description.substring(0, 100)}...</td>
              <td>{gem2.description.substring(0, 100)}...</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="compare-page">
      <div className="page-header">
        <h1>🔍 Compare Gemstones</h1>
        <p>Select up to 2 gemstones to compare their properties, benefits, and wearing methods</p>
      </div>

      {selectedGemstones.length < 2 && (
        <div className="gemstone-selector">
          <h3>Select Gemstone {selectedGemstones.length + 1} of 2</h3>
          <div className="gemstone-grid">
            {gemstones
              .filter(g => !selectedGemstones.find(selected => selected.id === g.id))
              .map(gemstone => (
                <div key={gemstone.id} className="gemstone-select-card" onClick={() => addGemstone(gemstone)}>
                  <img src={gemstone.image} alt={gemstone.name} />
                  <h4>{gemstone.name}</h4>
                  <small>{gemstone.planet}</small>
                </div>
              ))}
          </div>
        </div>
      )}

      {selectedGemstones.length === 2 && (
        <div className="comparison-view">
          <div className="comparison-actions">
            <button onClick={clearComparison} className="clear-btn">
              Clear Both
            </button>
          </div>
          
          <div className="selected-gemstones">
            {selectedGemstones.map(gemstone => (
              <div key={gemstone.id} className="selected-gemstone-card">
                <button onClick={() => removeGemstone(gemstone.id)} className="remove-gemstone-btn">
                  ✕ Remove
                </button>
                <GemstoneCard gemstone={gemstone} />
              </div>
            ))}
          </div>
          
          {renderComparisonTable()}
          
          <div className="recommendation-note">
            <h4>💡 Which one to choose?</h4>
            <p>
              Consider your primary goal and zodiac sign when choosing between these gemstones.
              Both have unique properties - pick the one that resonates more with your needs.
            </p>
          </div>
        </div>
      )}

      {selectedGemstones.length === 0 && (
        <div className="empty-comparison">
          <p>✨ No gemstones selected for comparison</p>
          <p>Click on any gemstone above to start comparing</p>
        </div>
      )}
    </div>
  )
}

export default ComparePage