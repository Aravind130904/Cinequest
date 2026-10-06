import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

const Navbar = () => {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSubmit = event => {
    event.preventDefault()
    const value = search.trim()
    if (value) {
      navigate(`/search/${encodeURIComponent(value)}`)
      setSearch('')
    }
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo">Cine<span>Quest</span></Link>
        <nav className="nav-links">
          <Link to="/">Popular</Link>
          <Link to="/top-rated">Top Rated</Link>
          <Link to="/upcoming">Upcoming</Link>
        </nav>
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Search movies..."
            value={search}
            onChange={event => setSearch(event.target.value)}
          />
          <button type="submit" aria-label="Search"></button>
        </form>
      </div>
    </header>
  )
}

export default Navbar