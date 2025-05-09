function CardComment({ comment }) {
  return (
    <div className="bg-dark-surface p-4 rounded-lg shadow-md">
      <p className="text-dark-light font-bold mb-2">
        {comment.author.username}
      </p>
      <p className="text-dark-light">{comment.content}</p>
    </div>
  );
}

export default CardComment;
