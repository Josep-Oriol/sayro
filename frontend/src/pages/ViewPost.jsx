import Nav from "../components/Nav.jsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ViewPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.error(err));

    console.log(post);
  }, [id]);

  return (
    <>
      <Nav />
      <div className="container mx-auto py-8">
        <div className="bg-dark-surface p-4">
          <img src={post?.thumbnail} alt={post?.title} />
          <h1 className="text-2xl font-bold mb-2">{post?.title}</h1>
          <p className="text-dark-light">{post?.description}</p>
          <p className="text-dark-light">{post?.author.username}</p>
          <p className="text-dark-light">{post?.likes} likes</p>
        </div>
      </div>
    </>
  );
}
export default ViewPost;
