import Nav from "../components/Nav";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, email } = useAuth();
  return (
    <>
      <Nav />
      <h1>Profile</h1>
      <p>Username: {user?.username}</p>
      <p>Email: {email?.email}</p>
    </>
  );
}
export default Profile;
