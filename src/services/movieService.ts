import axios from "axios";
import type { Movie } from "../types/movie";

interface MoviesResponse {
  results: Movie[];
}

const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchMovies(query: string): Promise<Movie[]> {
  const response = await axios.get<MoviesResponse>(`${BASE_URL}/search/movie`, {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  });

  return response.data.results;
}
