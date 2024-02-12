function MovieDetails({ selectedId, onCloseMovie }) {
  return (
    <div className="details">
      <button className="btn-back" onClick={onCloseMovie}>
        &larr; {selectedId}
      </button>
    </div>
  );
}

export default MovieDetails;
