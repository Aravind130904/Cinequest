import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {getMovieCredits, getMovieDetails, IMAGE_BASE_URL, BACKDROP_BASE_URL} from '../api'
import CastCard from '../components/CastCard'
import Loader from '../components/Loader'

const MovieDetails = () => {
  const {movieId} = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true)
        setError('')
        const [movieData, creditsData] = await Promise.all([
          getMovieDetails(movieId),
          getMovieCredits(movieId),
        ])
        setMovie(movieData)
        setCast(creditsData.cast.slice(0, 12))
      } catch {
        setError('Unable to load movie details.')
      } finally {
        setLoading(false)
      }
    }
    fetchMovie()
  }, [movieId])

  if (loading) return <Loader />
  if (error) return <div className="error-message">{error}</div>
  if (!movie) return null

  const poster = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image'

  const backdrop = movie.backdrop_path
    ? `${BACKDROP_BASE_URL}${movie.backdrop_path}`
    : poster

  const releaseYear = movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'
  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : 'N/A'

  return (
    <section className="details-page">
      <div
        className="movie-hero"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(5,8,18,.98), rgba(5,8,18,.78), rgba(5,8,18,.45)), url(${backdrop})`,
        }}
      >
        <div className="hero-content">
          <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
          <div className="detail-layout">
            <img src={poster} alt={movie.title} className="detail-poster" />
            <div className="movie-information">
              <p className="eyebrow">Movie Details</p>
              <h1>{movie.title}</h1>
              {movie.tagline && <p className="tagline">"{movie.tagline}"</p>}
              <div className="movie-meta">
                <span>⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
                <span>📅 {releaseYear}</span>
                <span>⏱️ {runtime}</span>
              </div>
              <div className="genres">
                {movie.genres?.map(genre => <span key={genre.id}>{genre.name}</span>)}
              </div>
              <h2>Overview</h2>
              <p className="overview">{movie.overview || 'No overview available.'}</p>
            </div>
          </div>
        </div>
      </div>
      <section className="cast-section">
        <div className="section-title">
          <div>
            <p className="eyebrow">Meet the actors</p>
            <h2>Cast</h2>
          </div>
        </div>
        <div className="cast-grid">
          {cast.map(person => <CastCard key={person.credit_id} person={person} />)}
        </div>
      </section>
    </section>
  )
}

export default MovieDetails