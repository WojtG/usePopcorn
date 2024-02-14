function ErrorMsg({ msg }) {
  return (
    <p className="error">
      {msg}
      <span>🛑</span>
    </p>
  );
}
export default ErrorMsg;
