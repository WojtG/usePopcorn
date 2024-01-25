import WatchedMovieListItem from "./WatchedMovieListItem";

function WatchedMovieList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovieListItem movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

export default WatchedMovieList;
