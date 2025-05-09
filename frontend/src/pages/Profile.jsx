import Nav from "../components/Nav";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, email } = useAuth();
  return (
    <>
      <Nav />
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p className="text-dark-light">Username: {user?.username}</p>
        <p className="text-dark-light">Email: {email?.email}</p>
      </div>
    </>
  );
}
export default Profile;
