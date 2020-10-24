import { action, makeObservable, observable } from 'mobx'
import { IMovie, IMovieCreated } from './interfaces'

const generateId = () => Math.random().toString(36).substr(2, 5)

const createMovie = ({ title, author, year }: IMovie): IMovieCreated => {
  return {
    id: generateId(),
    title,
    author,
    year
  }
}

const createMovies = (movies: IMovie[]): IMovieCreated[] => movies.map(movie => createMovie(movie))

const moviesBootstrap = createMovies([
  { title: 'Pulp Fiction', author: 'Quentin Tarantino', year: '1994' },
  { title: 'Youth', author: 'Paolo Sorrentino', year: '2015' },
  { title: 'True Detective', author: 'Nic Pizzolatto', year: '2014' },
  { title: 'American Beauty', author: 'Sam Mendes', year: '1999' },
  { title: 'La Belle Noiseuse', author: 'Jacques Rivette', year: '1991' },
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

  addMovie = (movieData: IMovie) => {
    const movie = createMovie(movieData)
    this.movies = [movie, ...this.movies]
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
