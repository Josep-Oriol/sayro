import Nav from "../components/Nav";
import { useState, useEffect } from "react";
import Post from "../components/CardPost";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/posts/recent")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Nav />
      <h1>Home</h1>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Post recientes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
