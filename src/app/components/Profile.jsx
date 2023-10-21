import "./Profile.css";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import Cookies from "universal-cookie";

function logout() {
  const cookies = new Cookies();
  cookies.remove("email");
  cookies.remove("password");
  window.location.reload();
}

function Profile({ userStatus }) {
  return (
    <div className="profile-container-outer">
      <div className="profile-container">
        <Avatar className="item">{userStatus.charAt(0)}</Avatar>
        <div className="item">Logged in as a {userStatus}</div>
        <Link className="item" href="/articles">
          <button>View all articles</button>
        </Link>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
export default Profile;
