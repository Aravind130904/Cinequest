import {useEffect, useState} from 'react'
import {getUpcomingMovies} from '../api'
import MovieGrid from '../components/MovieGrid'
import Pagination from '../components/Pagination'
import Loader from '../components/Loader'

const Upcoming = () => {
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
        const data = await getUpcomingMovies(page)
        setMovies(data.results)
        setTotalPages(data.total_pages)
      } catch {
        setError('Unable to load upcoming movies.')
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
          <p className="eyebrow">Coming Soon</p>
          <h1>Upcoming Movies</h1>
          <p>Keep track of movies coming to theaters soon.</p>
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

export default Upcoming