import { useState } from 'react'

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleSearch = (e) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value)
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="🔍 Search gemstones by name (Ruby, Emerald, Diamond...)"
        value={query}
        onChange={handleSearch}
        className="search-input"
      />
    </div>
  )
}

export default SearchBar