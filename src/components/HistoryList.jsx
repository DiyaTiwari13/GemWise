function HistoryList({ history }) {
  if (history.length === 0) {
    return (
      <div>
        <h2>Recommendation History</h2>
        <p style={{textAlign: 'center', marginTop: '50px'}}>
          No recommendations yet. Get your first recommendation to see it here!
        </p>
      </div>
    )
  }

  return (
    <div>
      <h2>Your Recommendation History</h2>
      <div className="history-list">
        {history.map(item => (
          <div key={item.id} className="history-item">
            <strong>{item.name}</strong> ({item.age} years) - {item.zodiac}<br />
            Goal: {item.goal}<br />
            Recommended Gemstone: <strong>💎 {item.gemstone}</strong><br />
            <small>{item.date}</small>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HistoryList