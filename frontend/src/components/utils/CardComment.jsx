function CardComment({ comment }) {
  return (
    <div className="bg-[#1E1E1E] p-4 rounded-lg shadow-md">
      <p className="text-[#F5F5F5] font-bold mb-2">{comment.author.username}</p>
      <p className="text-[#A0A0A0]">{comment.content}</p>
    </div>
  );
}

export default CardComment;
