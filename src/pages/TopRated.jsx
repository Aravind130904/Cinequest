import {useEffect, useState} from 'react'
import {getTopRatedMovies} from '../api'
import MovieGrid from '../components/MovieGrid'
import Pagination from '../components/Pagination'
import Loader from '../components/Loader'

const TopRated = () => {
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
        const data = await getTopRatedMovies(page)
        setMovies(data.results)
        setTotalPages(data.total_pages)
      } catch {
        setError('Unable to load top-rated movies.')
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
          <p className="eyebrow">Highest Rated</p>
          <h1>Top Rated Movies</h1>
          <p>Movies loved and highly rated by audiences.</p>
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

export default TopRated