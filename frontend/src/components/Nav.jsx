import { Link } from "react-router-dom";

function Nav() {
  return (
    <>
      <nav className="bg-gray-500 flex gap-4">
        <Link to={{ pathname: "/" }}>Home</Link>
        <Link to={{ pathname: "/blog" }}>Blog</Link>
        <Link to={{ pathname: "/about" }}>About</Link>
        <Link to={{ pathname: "/login" }}>Login</Link>
      </nav>
    </>
  );
}

export default Nav;
