import { Link } from "react-router-dom";
import { Heart, ThumbsUp } from "lucide-react";
import { useState } from "react";

function Post({ post }) {
  const [isLoved, setIsLoved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleLoved = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsLoved(!isLoved);
  };

  const handleLiked = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsLiked(!isLiked);
  };
  return (
    <Link to={`/view-post/${post._id}`}>
      <div className="bg-dark-surface p-4 rounded-lg shadow-md">
        <img src={post.image} alt={post.title} />
        <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
        <p className="text-dark-light">{post.description}</p>
        <p className="text-dark-light">{post.author.username}</p>
        <div className="flex">
          <p className="text-dark-light">
            {post.likes}
            {isLiked ? (
              <ThumbsUp
                className="text-dark-light"
                fill="blue"
                stroke="blue"
                onClick={handleLiked}
              />
            ) : (
              <ThumbsUp className="text-dark-light" onClick={handleLiked} />
            )}
          </p>
          {isLoved ? (
            <Heart
              className="text-dark-light"
              onClick={handleLoved}
              fill="red"
              stroke="red"
            />
          ) : (
            <Heart className="text-dark-light" onClick={handleLoved} />
          )}
        </div>
      </div>
    </Link>
  );
}

export default Post;
