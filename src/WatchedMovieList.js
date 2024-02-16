import WatchedMovieListItem from "./WatchedMovieListItem";

function WatchedMovieList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovieListItem
          onDeleteWatched={onDeleteWatched}
          movie={movie}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
}

export default WatchedMovieList;
