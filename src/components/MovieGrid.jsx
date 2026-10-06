import MovieCard from './MovieCard'

const MovieGrid = ({movies}) => {
  if (!movies?.length) {
    return <div className="no-results"><h2>No movies found</h2></div>
  }

  return (
    <div className="movie-grid">
      {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
    </div>
  )
}

export default MovieGrid