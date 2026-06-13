import GemstoneCard from './GemstoneCard'

function CompareGemstones({ compareList, onRemove, onAdd, gemstones }) {
  return (
    <div>
      <h2>Compare Gemstones</h2>
      <p>Select up to 2 gemstones to compare their properties</p>
      
      {compareList.length < 2 && (
        <div className="search-bar">
          <h3>Add another gemstone to compare:</h3>
          <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '20px'}}>
            {gemstones.map(gem => (
              !compareList.find(c => c.id === gem.id) && (
                <button
                  key={gem.id}
                  onClick={() => onAdd(gem)}
                  className="add-btn"
                >
                  + {gem.name}
                </button>
              )
            ))}
          </div>
        </div>
      )}
      
      <div className="compare-container">
        {compareList.map(gemstone => (
          <div key={gemstone.id} className="compare-card">
            <button onClick={() => onRemove(gemstone.id)} className="remove-btn">
              Remove
            </button>
            <GemstoneCard gemstone={gemstone} />
          </div>
        ))}
      </div>
      
      {compareList.length === 0 && (
        <p style={{textAlign: 'center', marginTop: '50px'}}>
          No gemstones selected. Click "Add to Compare" on any gemstone to start comparing.
        </p>
      )}
    </div>
  )
}

export default CompareGemstones