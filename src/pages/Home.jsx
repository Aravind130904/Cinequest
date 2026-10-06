import {useEffect, useState} from 'react'
import {getPopularMovies} from '../api'
import MovieGrid from '../components/MovieGrid'
import Pagination from '../components/Pagination'
import Loader from '../components/Loader'

const Home = () => {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)
        setError('')
        const data = await getPopularMovies(page)
        setMovies(data.results)
        setTotalPages(data.total_pages)
      } catch {
        setError('Unable to load popular movies.')
      } finally {
        setLoading(false)
      }
    }
    fetchMovies()
  }, [page])

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Discover</p>
          <h1>Popular Movies</h1>
          <p>Explore the most popular movies right now.</p>
        </div>
      </div>
      {loading && <Loader />}
      {error && <div className="error-message">{error}</div>}
      {!loading && !error && (
        <>
          <MovieGrid movies={movies} />
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </section>
  )
}

export default Home