import { useState } from "react";
import MovieListItem from "./MovieListItem";

function MovieList({ movies, onSelectedMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MovieListItem
          onSelectedMovie={onSelectedMovie}
          movie={movie}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
}

export default MovieList;
