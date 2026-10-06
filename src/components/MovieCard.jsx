import {Link} from 'react-router-dom'
import {IMAGE_BASE_URL} from '../api'

const MovieCard = ({movie}) => {
  const imageUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image'

  const title = movie.title || movie.name
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <div className="poster-container">
        <img src={imageUrl} alt={title} className="movie-poster" />
        <div className="rating">⭐ {rating}</div>
      </div>
      <div className="movie-card-content">
        <h3>{title}</h3>
        <p>{movie.release_date ? movie.release_date.slice(0, 4) : 'Unknown'}</p>
      </div>
    </Link>
  )
}

export default MovieCard