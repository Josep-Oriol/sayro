import "./app.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Páginas generales
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import ViewPost from "./pages/ViewPost";
import EditProfile from "./pages/EditProfile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ViewProfile from "./pages/ViewProfile";
import Unauthorized from "./pages/Unauthorized";

// Páginas de admin
import ViewUsers from "./pages/admin/ViewUsers";
import ViewPosts from "./pages/admin/ViewPosts";
import ViewComments from "./pages/admin/ViewComments";
import ViewTags from "./pages/admin/ViewTags";

// Ruta protegida
import ProtectedRoutes from "./pages/admin/ProtectedRoutes";

function App() {
  return (
    <>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/edit-post/:id" element={<EditPost />} />
        <Route path="/view-post/:id" element={<ViewPost />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/view-profile/:username" element={<ViewProfile />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Rutas protegidas SOLO para admin */}
        <Route element={<ProtectedRoutes requiredRole="admin" />}>
          <Route path="/users" element={<ViewUsers />} />
          <Route path="/posts" element={<ViewPosts />} />
          <Route path="/comments" element={<ViewComments />} />
          <Route path="/tags" element={<ViewTags />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        draggable
        theme="dark"
      />
    </>
  );
}

export default App;
