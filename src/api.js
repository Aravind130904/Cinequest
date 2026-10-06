const API_KEY = '0dd9b7b4f8acbff3e8e62d3c4f85f6c9'
const BASE_URL = 'https://api.themoviedb.org/3'

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'
export const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original'

const request = async url => {
  const response = await fetch(url)
  if (!response.ok) throw new Error('Failed to fetch movie data')
  return response.json()
}

export const getPopularMovies = page =>
  request(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`)

export const getTopRatedMovies = page =>
  request(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`)

export const getUpcomingMovies = page =>
  request(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`)

export const getMovieDetails = movieId =>
  request(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`)

export const getMovieCredits = movieId =>
  request(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`)

export const searchMovies = (query, page) =>
  request(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`)
