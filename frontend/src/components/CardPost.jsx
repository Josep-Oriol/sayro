import { Link } from "react-router-dom";

function Post({ post }) {
  return (
    <Link to={`http://localhost:3000/api/posts/${post._id}`}>
      <div className="bg-dark-surface p-4 rounded-lg shadow-md">
        <img src={post.image} alt={post.title} />
        <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
        <p className="text-dark-light">{post.description}</p>
        <div className="flex justify-between items-center">
          <p className="text-dark-light">{post.author}</p>
          <p className="text-dark-light">{post.likes} likes</p>
        </div>
      </div>
    </Link>
  );
}

export default Post;
