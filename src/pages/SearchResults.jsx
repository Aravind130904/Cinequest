import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {searchMovies} from '../api'
import MovieGrid from '../components/MovieGrid'
import Pagination from '../components/Pagination'
import Loader from '../components/Loader'

const SearchResults = () => {
  const {query} = useParams()
  const decodedQuery = decodeURIComponent(query)
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => setPage(1), [query])

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true)
        setError('')
        const data = await searchMovies(decodedQuery, page)
        setMovies(data.results)
        setTotalPages(data.total_pages)
      } catch {
        setError('Unable to search movies.')
      } finally {
        setLoading(false)
      }
    }
    if (decodedQuery) fetchSearchResults()
  }, [decodedQuery, page])

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Search Results</p>
          <h1>Results for "{decodedQuery}"</h1>
          <p>Movies matching your search.</p>
        </div>
      </div>
      {loading && <Loader />}
      {error && <div className="error-message">{error}</div>}
      {!loading && !error && (
        <>
          <MovieGrid movies={movies} />
          {movies.length > 0 && (
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          )}
        </>
      )}
    </section>
  )
}

export default SearchResults