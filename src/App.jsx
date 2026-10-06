import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import TopRated from './pages/TopRated'
import Upcoming from './pages/Upcoming'
import MovieDetails from './pages/MovieDetails'
import SearchResults from './pages/SearchResults'

const App = () => (
  <>
    <Navbar />
    <main className="main-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/movie/:movieId" element={<MovieDetails />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="*" element={<div className="not-found"><h1>404</h1><p>Page not found</p></div>} />
      </Routes>
    </main>
  </>
)

export default App