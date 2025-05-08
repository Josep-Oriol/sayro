function Message({ message, type, onClose }) {
  return (
    <div className="bg-dark-surface text-dark-light p-4 rounded-lg shadow-md">
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default Message;
