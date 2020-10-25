import { action, makeObservable, observable } from 'mobx'
import { IMovie, IMovieCreated } from './interfaces'

const generateId = () => Math.random().toString(36).substr(2, 5)

const createMovie = ({ title, year }: IMovie): IMovieCreated => {
  return {
    id: generateId(),
    title,
    year
  }
}

const createMovies = (movies: IMovie[]): IMovieCreated[] => movies.map(movie => createMovie(movie))

const moviesBootstrap = createMovies([
  { title: 'Pulp Fiction', year: '1994' },
  { title: 'Youth', year: '2015' },
  { title: 'True Detective', year: '2014' },
  { title: 'American Beauty', year: '1999' },
  { title: 'La Belle Noiseuse', year: '1991' },
])

class MoviesStore {
  movies: IMovieCreated[] = moviesBootstrap

  constructor() {
    makeObservable(this, {
      movies: observable.deep,
      addMovie: action,
      updateMovie: action,
      deleteMovie: action
    })
  }

  get moviesList () {
    return this.movies
  }

  getMovieById = (id: string) => {
    return this.movies.find(movie => movie.id === id)
  }

  addMovie = (movieData: IMovie): IMovieCreated => {
    const movie = createMovie(movieData)
    this.movies = [movie, ...this.movies]
    return movie
  }

  updateMovie = (id: string, movie: IMovie) => {
    this.movies = this.movies.map(m => {
      if (m.id !== id) {
        return m
      }
      return {
        ...movie,
        id
      }
    })
  }

  deleteMovie = (id: string) => {
    this.movies = this.movies.filter(movie => movie.id !== id)
  }
}

export default MoviesStore
