import { useState } from "react";
import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "./../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import toast, { Toaster } from "react-hot-toast";
import { delay } from "../../utils/delay";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setMovies([]);
    setIsLoading(true);
    setError(false);

    try {
      const results = await fetchMovies(query);

      if (import.meta.env.DEV) {
        await delay(2000);
      } //чтобы было удобнее видеть лоадер - переделал, чтобы в продакшене не срабатывало

      if (results.length === 0) toast("No movies found for your request.");

      setMovies(results);
    } catch (error) {
      setError(true);
      toast.error("Ошибка загрузки фильмов");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseMovieModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader duration={2000} />}
      {!isLoading && error && <ErrorMessage />}
      {!isLoading && !error && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseMovieModal} />
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
