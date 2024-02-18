import { useEffect, useState } from "react";
import Nav from "./Nav";
import Main from "./Main";
import Box from "./Box";
import Search from "./Search";
import NumberResults from "./NumberResults";
import MovieList from "./MovieList";
import WatchedMovieList from "./WatchedMovieList";
import WatchedSummary from "./WatchedSummary";
import Loader from "./Loader";
import MovieDetails from "./MovieDetails";
import ErrorMsg from "./ErrorMsg";
import WelcomeMessage from "./WelcomeMessage";

export const KEY = "1bdd65a";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useState(function () {
    const watchedMovies = JSON.parse(localStorage.getItem("watched")) || [];
    return watchedMovies;
  });

  function handleSelectedMovie(id) {
    setSelectedId((curID) => (curID === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((curr) => [...curr, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) =>
      watched.filter((watchedMovie) => watchedMovie.imdbID !== id)
    );
  }

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const response = await fetch(
          `https://www.omdbapi.com/?s=${query}&apikey=${KEY}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const data = await response.json();

        if (data.Response === "False")
          throw new Error("Movie not found, try again");

        setMovies(data.Search);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    handleCloseMovie();
    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <Nav>
        <Search query={query} setQuery={setQuery} />
        <NumberResults movies={movies} />
      </Nav>
      <Main>
        <Box>
          {movies.length === 0 && !isLoading && !error && (
            <WelcomeMessage message={"Start by searching for a movie 🎬"} />
          )}
          {error && <ErrorMsg msg={error} />}
          {isLoading && <Loader />}
          {!error && !isLoading && (
            <MovieList onSelectedMovie={handleSelectedMovie} movies={movies} />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              onCloseMovie={handleCloseMovie}
              selectedId={selectedId}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                onDeleteWatched={handleDeleteWatched}
                watched={watched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
export default App;
