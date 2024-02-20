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
import { useMovies } from "./useMovies";

export const KEY = "1bdd65a";

function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useState(function () {
    const watchedMovies = JSON.parse(localStorage.getItem("watched")) || [];
    return watchedMovies;
  });

  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

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
